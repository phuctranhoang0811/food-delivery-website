"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, X, Send, Minus, 
  Smile, ImageIcon, Store, Headset, User
} from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Message {
  _id?: string;
  id?: string;
  senderId?: string;
  isAdmin?: boolean;
  sender?: "admin" | "user"; 
  text: string;
}

const generateObjectId = () => [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

let socket: Socket;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", isAdmin: true, text: "Welcome to customer support. How can we help you today?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [customerId, setCustomerId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockReplies = [
    "Where is my order?",
    "Change delivery address",
    "Missing item",
  ];

  // 1. Khởi tạo Socket.IO và đọc ID Khách Hàng
  useEffect(() => {
    // Kết nối Socket
    socket = io();

    // Lắng nghe tin nhắn mới từ Admin gửi tới qua Socket
    socket.on("receive_message", (newMsg: Message) => {
      setMessages((prev) => {
        // Chống lặp tin nhắn nếu đã thêm ảo trước đó
        if (prev.find(m => m.id === newMsg.id || m._id === newMsg._id)) return prev;
        return [...prev, newMsg];
      });
    });

    let storedId = localStorage.getItem("userId"); 
    // Fix: Xóa sạch cache lỗi nếu ID bị dính chữ "undefined" hoặc độ dài sai không đúng chuẩn Mongoose (24 hex)
    if (!storedId || storedId === "undefined" || storedId === "null" || storedId.length !== 24) {
      storedId = localStorage.getItem("chat_customer_id");
      if (!storedId || storedId === "undefined" || storedId === "null" || storedId.length !== 24) {
        storedId = generateObjectId();
        localStorage.setItem("chat_customer_id", storedId);
      }
    }
    setCustomerId(storedId);

    return () => {
      socket.disconnect();
    };
  }, []);

  // 2. Tải lịch sử tin nhắn lần đầu mở & Join Room mạng
  useEffect(() => {
    if (isOpen && customerId) {
      fetchMessages(customerId);
      // Tham gia phòng chat riêng biệt dựa trên ID khách hàng
      socket.emit("join_conversation", customerId);
    }
  }, [isOpen, customerId]);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // HÀM 1: LẤY LỊCH SỬ TIN NHẮN
  const fetchMessages = async (userId: string) => {
    try {
      const res = await fetch(`/api/chat/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data);
        }
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  // HÀM 2: GỬI TIN NHẮN REAL-TIME
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Hiển thị ngay lên màn hình (Optimistic UI)
    const tempId = Date.now().toString();
    const newUserMsg: Message = {
      id: tempId,
      isAdmin: false,
      text: text,
      senderId: customerId
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");

    // 2. Gửi cục data xuống Database
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: customerId,
          customerId: customerId, // Thêm dòng này để Backend biết phòng của ai mà tạo mới Conversation
          text: text,
          isAdmin: false
        })
      });
      
      if (response.ok) {
         const savedMessage = await response.json();
         // 3. Kích hoạt tính năng Phóng tia chớp (Broadcast) qua Socket.IO tới Admin
         // Định tuyến bằng customerId thay vì conversationId để dễ quản lý phòng
         socket.emit("send_message", { ...savedMessage, conversationId: customerId });
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.06)] mb-4 w-[340px] sm:w-[380px] flex flex-col h-[500px] max-h-[85vh] transition-all animate-in fade-in slide-in-from-bottom-5 border border-green-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-3 flex justify-between items-center z-10 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden border border-white/30">
                   <Headset className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-green-600 rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[16px] leading-tight">Customer Support</span>
                <span className="text-[12px] text-green-100 font-medium tracking-wide">We reply very fast!</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close user chat"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#F8FAFC]">
            
            <div className="text-center text-xs text-gray-400 font-medium my-1">
              Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>

            {messages.map((msg, index) => {
              const isSuperAdmin = msg.isAdmin || msg.sender === "admin";
              return (
                <div key={msg.id || msg._id || index} className="flex flex-col w-full">
                  <div className={`flex items-end gap-2 max-w-[85%] ${isSuperAdmin ? "self-start" : "self-end"}`}>
                    
                    {/* Admin Avatar on left */}
                    {isSuperAdmin && (
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden mb-0.5 shadow-sm border border-orange-200">
                        <Store className="w-4 h-4 text-orange-600" />
                      </div>
                    )}

                    {/* Chat Bubble */}
                    <div 
                      className={`px-4 py-2.5 text-[15px] leading-[1.4] shadow-sm ${
                        isSuperAdmin 
                          ? "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100" 
                          : "bg-green-600 text-white rounded-2xl rounded-br-sm"
                      }`}
                      style={{ wordBreak: 'break-word' }}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Quick Replies */}
                  {index === 0 && (
                    <div className="flex flex-wrap items-start gap-2 mt-3 ml-10">
                      {mockReplies.map((reply, i) => (
                        <button
                          key={`reply-${i}`}
                          onClick={() => handleSendMessage(reply)}
                          className="bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 hover:border-orange-300 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors mb-1 shadow-sm"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Input Area */}
          <div className="bg-white p-3 flex items-center gap-2 border-t border-gray-100">
            <button className="text-gray-400 hover:text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors shrink-0">
              <ImageIcon className="w-5 h-5" />
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-green-300 focus-within:bg-white transition-all shadow-inner"
            >
              <input
                type="text"
                placeholder="Type your question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent border-none focus:outline-none text-[14px] text-gray-800 placeholder-gray-500"
              />
              <button type="button" className="text-gray-400 hover:text-orange-500 ml-2 shrink-0 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </form>

            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-full transition-colors shrink-0 flex items-center justify-center w-10 h-10 shadow-sm ${
                inputText.trim() 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5 ml-[2px]" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 hover:bg-orange-600 text-white w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.5)] transition-transform hover:scale-105 border-2 border-white"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
}
