import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    // Tự động tạo Admin mặc định nếu database chưa có Admin nào
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log("🛠 Không tìm thấy Admin. Đang khởi tạo Admin mặc định...");
      const hashedDefaultPassword = crypto
        .createHash("md5")
        .update("123456")
        .digest("hex");
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
        {
          message: "Email hoặc mật khẩu không chính xác (Admin không tồn tại)",
        },
        { status: 401 },
      );
    }

    const isPasswordValid =
      crypto.createHash("md5").update(password).digest("hex") ===
      admin.password;
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu sai" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Đăng nhập khoản quản trị thành công!", adminId: admin._id },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi Server", error: String(error) },
      { status: 500 },
    );
  }
}
