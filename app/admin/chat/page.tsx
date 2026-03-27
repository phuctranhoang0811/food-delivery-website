"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, User, Search, Store } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Conversation {
  _id: string;
  customerId: {
    _id: string;
    name?: string;
    email?: string;
  } | string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface Message {
  _id?: string;
  id?: string;
  text: string;
  isAdmin: boolean;
  senderId: string;
  createdAt: string;
}

// Global socket instance
let socket: Socket;

export default function AdminChatDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Khởi tạo Socket.IO
  useEffect(() => {
    socket = io();

    // Admin tham gia phòng chung để nghe ngóng tin tức
    socket.emit("join_admin_dashboard");

    // Lắng nghe có ai đó vừa Chat (cập nhật lại danh sách bên trái)
    socket.on("conversation_updated", (data: any) => {
      fetchConversations();
    });

    // Lắng nghe tin nhắn mới vào phòng đang mở
    socket.on("receive_message", (newMsg: Message) => {
      setMessages((prev) => {
        // Chống trùng lặp nếu tự mình gửi đi
        if (prev.find(m => m.id === newMsg.id || m._id === newMsg._id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch list of active conversations (Lần đầu load trang)
  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/chat");
      const data = await res.json();
      if (Array.isArray(data)) {
        setConversations(data);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Khi chọn một đoạn chat -> Fetch lịch sử và tham gia vào Phòng đó
  useEffect(() => {
    if (selectedChat) {
      const customerIdObj = selectedChat.customerId as any;
      const targetRoomId = customerIdObj?._id || customerIdObj;

      const fetchMessages = async () => {
        try {
          const res = await fetch(`/api/chat/${selectedChat._id}`);
          const data = await res.json();
          if (Array.isArray(data)) {
            setMessages(data);
          }
        } catch (error) {
          console.error("Error loading chat details:", error);
        }
      };
      
      fetchMessages();
      
      // Chuyển kênh Socket sang khách hàng này
      socket.emit("join_conversation", targetRoomId);
    }
  }, [selectedChat]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Admin reply
  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedChat) return;

    const customerIdObj = selectedChat.customerId as any;
    const targetUserId = customerIdObj?._id || customerIdObj;

    // Optimistic UI display
    const tempId = Date.now().toString();
    const tempMsg: Message = {
      id: tempId,
      text: inputText,
      isAdmin: true,
      senderId: "000000000000000000000000",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);
    setInputText("");

    // Lưu vào DB bằng API (Để quản lý giao dịch an toàn)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: "000000000000000000000000", 
          conversationId: selectedChat._id, 
          customerId: targetUserId,
          text: inputText,
          isAdmin: true,   
        }),
      });
      
      if (response.ok) {
        const savedMessage = await response.json();
        
        // Phát tín hiệu Socket.IO để khách nhận ngay lập tức
        socket.emit("send_message", { 
          ...savedMessage, 
          id: tempId, 
          conversationId: targetUserId 
        });

        // Tải lại danh sách bên trái
        fetchConversations();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Sidebar: Chat List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Store className="w-6 h-6 text-[#0084FF]" /> Message Management
            </h1>
            <p className="text-xs text-green-600 font-medium mt-1">Real-time (Socket.IO)</p>
          </div>
          <div className="overflow-y-auto flex-1 p-3 flex flex-col gap-2">
            {conversations.length === 0 && (
              <p className="text-gray-500 text-center mt-5 text-sm">No conversations yet</p>
            )}
            {conversations.map((conv) => {
              const custAny = conv.customerId as any;
              return (
              <button
                key={conv._id}
                onClick={() => setSelectedChat(conv)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  selectedChat?._id === conv._id 
                    ? "bg-[#E6F2FF] border border-[#0084FF]/20 shadow-sm"
                    : "hover:bg-gray-100 border border-transparent"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {custAny?.name || "Guest"}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage || "Attachment..."}</p>
                </div>
              </button>
            )})}
          </div>
        </div>

        {/* Main: Chat View Window */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg leading-tight">
                      {(selectedChat.customerId as any)?.name || "Guest"}
                    </h2>
                    <p className="text-xs text-green-500 font-medium font-sans">Active on Websocket</p>
                  </div>
                </div>
              </div>

              {/* Messages Box */}
              <div className="flex-1 overflow-y-auto p-5 bg-[#F8F9FA] flex flex-col gap-4">
                {messages.map((msg, i) => {
                  const isAdmin = msg.isAdmin === true;
                  return (
                    <div key={msg._id || msg.id || i} className={`max-w-[70%] flex flex-col ${isAdmin ? "self-end items-end" : "self-start items-start"}`}>
                      <div 
                        className={`px-4 py-2.5 rounded-2xl text-[15px] shadow-sm ${
                          isAdmin 
                            ? "bg-[#0084FF] text-white rounded-br-sm"
                            : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
                        }`}
                        style={{ wordBreak: "break-word" }}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[11px] text-gray-400 mt-1 mx-1">
                        {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <div className="p-4 bg-white border-t border-gray-200">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="flex items-center gap-3 bg-gray-100 p-2 rounded-full border border-gray-200 focus-within:border-[#0084FF]/50 focus-within:bg-white transition-colors shadow-inner"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Reply to ${(selectedChat.customerId as any)?.name || "Guest"}...`}
                    className="flex-1 bg-transparent px-4 py-1 focus:outline-none text-gray-800 placeholder-gray-500 text-[15px]"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-[#0084FF] text-white p-2.5 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <Send className="w-5 h-5 ml-[2px] mb-[1px]" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-12 h-12 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-500">No conversation selected</h2>
              <p className="text-sm mt-1">Please select a customer from the left sidebar to reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
