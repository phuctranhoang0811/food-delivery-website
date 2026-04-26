import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import crypto from "crypto"; // Import crypto để dùng MD5

export async function POST(req: NextRequest) {
  try {
    // Phân tích dũ liệu từ frontend
    const body = await req.json();
    const { name, email, password } = body;

    console.log("==> Dữ liệu người dùng gửi lên:", { name, email, password });

    //2 @ Kiểm tra dữ liệu bị thiếu
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 },
      );
    }
    // Kết nối database
    await connectDB();

    // KIỂM TRA TRÙNG EMAIL TRƯỚC KHI TẠO (Rất quan trọng để tránh lỗi 500)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email này đã được sử dụng" },
        { status: 400 },
      );
    }
    // 4. BẢO MẬT: Băm mật khẩu (Mã hóa MD5)
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");
    //5 Tạo mới account
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // 6 Tra ve ket qua thanh cong cho Frontend
    return NextResponse.json(
      {
        message: "Tạo tài khoản thành công",
        user: {
          id: newUser.id,
          name: newUser.name,
        },
      },
      { status: 201 }, // Status 201 Created: Dành cho khi tạo thành công tài nguyên mới
    );
  } catch (error) {
    console.error("Lỗi đăng ký", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi trên sever" },
      { status: 500 },
    );
  }
}
