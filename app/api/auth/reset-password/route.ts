import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

// GET /api/auth/reset-password?email=...&otp=... — validate OTP
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    if (!email || !otp) {
      return NextResponse.json({ message: "Thiếu thông tin" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({
      email,
      resetToken: otp,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Mã OTP không đúng hoặc đã hết hạn" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}

// POST /api/auth/reset-password — reset password with OTP
export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ message: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({
      email,
      resetToken: otp,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Mã OTP không đúng hoặc đã hết hạn" },
        { status: 400 }
      );
    }

    // Hash và lưu mật khẩu mới, xóa OTP
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return NextResponse.json(
      { message: "Mật khẩu đã được đặt lại thành công!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
