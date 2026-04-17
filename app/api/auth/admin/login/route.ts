import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    // Tự động tạo Admin mặc định nếu database chưa có Admin nào
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log("🛠 Không tìm thấy Admin. Đang khởi tạo Admin mặc định...");
      const hashedDefaultPassword = await bcrypt.hash("123456", 10);
      await Admin.create({
        name: "Super Admin",
        email: "admin@odd-er.dev",
        password: hashedDefaultPassword,
        role: "admin",
      });
      console.log("✅ Đã tạo tài khoản mặc định: admin@odd-er.dev / 123456");
    }

    // Tìm trong file Admin Models
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không chính xác (Admin không tồn tại)" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu sai" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Đăng nhập khoản quản trị thành công!", adminId: admin._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi Server", error: String(error) },
      { status: 500 }
    );
  }
}
