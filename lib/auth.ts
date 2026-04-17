import { SignJWT, jwtVerify } from "jose";

// Dùng một chuỗi bí mật, trong thực tế nên lưu ở file .env
const SECRET_KEY = process.env.JWT_SECRET || "super-secret-odd-er-key-123456";
const key = new TextEncoder().encode(SECRET_KEY);

export async function signToken(payload: { userId: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token có giá trị 1 ngày
    .sign(key);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload; // { userId, role, iat, exp }
  } catch (error) {
    return null; // Trả về null nếu token sai hoặc hết hạn
  }
}
