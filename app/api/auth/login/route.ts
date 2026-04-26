import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import crypto from "crypto";
export async function POST(req: NextRequest) {
  try {
    // 1. Phân tích dữ liệu Frontend gửi lên (Chỉ cần email và password)
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ email và mật khẩu" },
        { status: 400 },
      );
    }

    // 2. Kết nối Database
    await connectDB();

    // 3. TÌM TÀI KHOẢN: Xem email này có tồn tại trong DB không
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Tài khoản không tồn tại. Vui lòng đăng ký!" },
        { status: 404 }, // 404 Not Found
      );
    }

    // 4. KIỂM TRA MẬT KHẨU (Bảo mật)
    // bcrypt.compare sẽ tự động băm cái "password" gõ tay và so khớp với cục "user.password" trong DB
    const md5Password = crypto.createHash("md5").update(password).digest("hex");

    const isMatch = md5Password === user.password;
    if (!isMatch) {
      return NextResponse.json(
        { message: "Mật khẩu không chính xác!" },
        { status: 400 }, // 400 Bad Request
      );
    }

    // 5. ĐĂNG NHẬP THÀNH CÔNG
    // Trả về thông tin để Frontend lưu vào LocalStorage hoặc State
    return NextResponse.json(
      {
        message: "Đăng nhập thành công!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }, // 200 OK
    );
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi trên server" },
      { status: 500 },
    );
  }
}
