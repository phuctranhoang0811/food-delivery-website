import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    console.log("📝 Dữ liệu nhận được:", { name, email, password: "***" });

    await connectDB();
    console.log("✅ Kết nối MongoDB thành công");

    const existingUser = await User.findOne({ email });
    console.log("🔍 Kiểm tra email tồn tại:", existingUser ? "Có" : "Không");
    
    if (existingUser) {
      return NextResponse.json(
        { message: "Email này đã được đăng ký." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Mã hóa mật khẩu thành công");
    
    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log("✅ User tạo thành công:", newUser._id);

    return NextResponse.json(
      { message: "Đăng ký thành công!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Lỗi đăng ký:", error);
    return NextResponse.json(
      { 
        message: "Lỗi Server",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}