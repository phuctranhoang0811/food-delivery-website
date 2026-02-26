import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu sai" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu sai" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Đăng nhập thành công!", userId: user._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi Server" },
      { status: 500 }
    );
  }
}