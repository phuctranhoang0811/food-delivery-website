import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Tạm thời tắt file auth cũ vì chúng ta đang code lại từ đầu
// import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // Cho phép tất cả request đi qua để test tính năng Create API
  return NextResponse.next();
}

// Cấu hình Middleware chỉ chạy trên các api hoặc page cụ thể
export const config = {
  matcher: ["/admin/:path*"],
};
