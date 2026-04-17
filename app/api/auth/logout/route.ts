import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = NextResponse.json({ message: "Đăng xuất thành công" }, { status: 200 });
    res.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // Expire the cookie immediately
      path: "/",
    });
    return res;
  } catch (error) {
    return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
  }
}
