import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/lib/models/Message";
import Conversation from "@/lib/models/Conversation";

export async function GET(req: Request, { params }: { params: Promise<{ customerId: string }> }) {
  try {
    await connectDB();
    const { customerId } = await params;

    const conversation = await Conversation.findOne({ customerId });
    if (!conversation) {
      return NextResponse.json([], { status: 200 }); // Chưa có tin nhắn nào
    }

    const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 });
    
    // Đánh dấu là đã đọc (đối với user)
    // await Conversation.findByIdAndUpdate(conversation._id, { unreadCount: 0 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi lấy lịch sử chat:", error);
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}
