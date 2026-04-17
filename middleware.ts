import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // Lấy giá trị Cookie
  const token = request.cookies.get("auth_token")?.value;

  // Nếu truy cập vào khu vực /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyToken(token);
    
    // Yêu cầu token hợp lệ và phải có role là admin
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Cho phép tiếp tục nếu không thuộc diện cấm hoặc đã thỏa mãn điều kiện
  return NextResponse.next();
}

// Cấu hình Middleware chỉ chạy trên các api hoặc page cụ thể
export const config = {
  matcher: ["/admin/:path*"],
};
