import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Conversation from "@/lib/models/Conversation";
import Message from "@/lib/models/Message";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { senderId, text, isAdmin, conversationId: reqConversationId } = body;

    if (!senderId || !text) {
      return NextResponse.json({ error: "Thiếu dữ liệu: senderId hoặc text" }, { status: 400 });
    }

    let conversation;
    
    // Nếu client truyền lên sẵn conversationId (ví dụ Admin reply)
    if (reqConversationId) {
      conversation = await Conversation.findById(reqConversationId);
    } 
    // Nếu không có, tìm hoặc tạo mới dựa vào customerId (Customer gửi tin đầu)
    else {
      const customerId = isAdmin ? body.customerId : senderId;
      if (!customerId) return NextResponse.json({ error: "Thiếu customerId" }, { status: 400 });
      
      conversation = await Conversation.findOne({ customerId });
      if (!conversation) {
        conversation = await Conversation.create({ customerId, lastMessage: text, unreadCount: 1 });
      }
    }

    if (!conversation) {
      return NextResponse.json({ error: "Không tìm thấy hội thoại" }, { status: 404 });
    }


    // Create the message
    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId,
      isAdmin: isAdmin || false,
      text,
    });

    // Update the conversation's last message
    conversation.lastMessage = text;
    conversation.lastMessageAt = new Date();
    if (isAdmin) {
       // if admin sent it, we don't increase unread count for admin dashboard, but maybe for user.
       // for simplicity, we just keep unreadCount logic basic here.
    } else {
       conversation.unreadCount += 1;
    }
    
    await conversation.save();

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error("Lỗi gửi tin nhắn:", error);
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    // Fetch all conversations, populate customer details (for Admin view)
    const conversations = await Conversation.find()
      .populate("customerId", "name email")
      .sort({ lastMessageAt: -1 });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi lấy danh sách hội thoại:", error);
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}
