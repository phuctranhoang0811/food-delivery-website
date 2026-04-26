import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import bcrypt from "bcryptjs";
// -------------------------------------------------------------
// 1. READ (ĐỌC) - Lấy thông tin của 1 user dựa vào ID
// Phương thức: GET
// -------------------------------------------------------------
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // <--- Thêm chữ Promise vào đây
) {
  try {
    await connectDB(); // luôn phải kết nối database
    const resolvedParams = await params;
    const userId = resolvedParams.id;
    // Tìm user trong DB theo id truyền trên url
    // select("-password") nghĩa là :  Trả về mọi thứ trừ cột password
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: " Không tìm thấy người dùng" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Lấy thông tin thành công", user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi sever khi lấy thông tin" },
      { status: 500 },
    );
  }
}

// -------------------------------------------------------------
// 2. UPDATE (CẬP NHẬT) - Sửa thông tin user (VD: đổi tên)
// Phương thức: PUT (hoặc PATCH)
// -------------------------------------------------------------
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    //1  Kết nối DB và lấy ID từ URL (Vẫn phải mở khóa Promise)
    await connectDB();
    const resolvedParams = await params;
    const userId = resolvedParams.id;
    // 2 Lấy dữ liệu người dùng muốn cập nhật từ body Json
    const body = await req.json();
    const { name, email, password } = body;
    // 3 Tìm người dùng trong DB
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng" },
        { status: 404 },
      );
    }
    //  4 Nếu người dùng có gửi tên email hoặc email mới cập nhật
    if (name) user.name = name;
    if (email) user.email = email;
    // 5. BẢO MẬT: Nhận biết nếu có Password mới thì Băm (Hash) nó trước khi ghi vào
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    // 6. Lưu toàn bộ thay đổi vừa gán xuống Database
    await user.save();
    // 7. Trả về thông báo thành công (Nhớ Không trả về password)
    return NextResponse.json(
      {
        message: "Cập nhật thông tin",
        user: { id: user._id, name: user.name, email: user.email },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Lỗi cập nhật người dùng: ", error);
    return NextResponse.json(
      { message: "Lỗi sever khi cập nhật thông tin" },
      {
        status: 500,
      },
    );
  }
}

// -------------------------------------------------------------
// 3. DELETE (XÓA) - Xóa người dùng khỏi Database
// Phương thức: DELETE
// -------------------------------------------------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: String }> },
) {
  try {
    // 1. Kết nối DB và lấy ID từ URL
    await connectDB();
    const resolvedParams = await params;
    const userId = resolvedParams.id;
    // 2. Tim va xoa nguoi dung theo id
    const deletedUser = await User.findByIdAndDelete(userId);
    // 3. Kiểm tra xem người dùng có thực sự tồn tại để xóa không
    if (!deletedUser) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng để xóa" },
        { status: 404 },
      );
    }

    // 4. Trả về kết quả thành công
    return NextResponse.json(
      { message: "Xóa người dùng thành công" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi xóa người dùng: ", error);
    return NextResponse.json(
      { message: "Lỗi sever khi xóa tài khoản" },
      { status: 500 },
    );
  }
}
