import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/lib/models/Message";
import Conversation from "@/lib/models/Conversation";

export async function GET(req: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    await connectDB();
    const { conversationId } = await params;

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 }); // Sort oldest to newest
    
    // Mark messages as read when fetched (Optional, can be modified based on need)
    await Conversation.findByIdAndUpdate(conversationId, { unreadCount: 0 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi lấy chi tiết tin nhắn:", error);
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}
