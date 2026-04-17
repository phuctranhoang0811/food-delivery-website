import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    // KIỂM TRA PHÍA NGƯỜI DÙNG THƯỜNG (USER)
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ message: "Email hoặc mật khẩu sai" }, { status: 401 });
      }
      
      const token = await signToken({ userId: user._id.toString(), role: "user" });
      const res = NextResponse.json(
        { message: "Đăng nhập người dùng thành công!", userId: user._id, role: "user" },
        { status: 200 }
      );
      res.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });
      return res;
    }

    // NẾU KHÔNG LÀ USER -> KIỂM TRA LUỒNG ADMIN VÀ KHỞI TẠO NẾU CẦN
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedDefaultPassword = await bcrypt.hash("123456", 10);
      await Admin.create({
        name: "Super Admin",
        email: "admin@odd-er.dev",
        password: hashedDefaultPassword,
        role: "admin",
      });
      console.log("✅ Đã tạo tài khoản mặc định: admin@odd-er.dev / 123456");
    }

    const admin = await Admin.findOne({ email });
    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return NextResponse.json({ message: "Email hoặc mật khẩu sai" }, { status: 401 });
      }

      const token = await signToken({ userId: admin._id.toString(), role: "admin" });
      const res = NextResponse.json(
        { message: "Đăng nhập Admin thành công!", userId: admin._id, role: "admin" },
        { status: 200 }
      );
      res.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });
      return res;
    }

    // NẾU KHÔNG TÌM THẤY Ở ĐÂU QUÉT
    return NextResponse.json(
      { message: "Email hoặc mật khẩu sai" },
      { status: 401 }
    );
    
  } catch (error) {
    console.error("Lỗi Login:", error);
    return NextResponse.json(
      { message: "Lỗi Server" },
      { status: 500 }
    );
  }
}