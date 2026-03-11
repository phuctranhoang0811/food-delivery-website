import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email là bắt buộc" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email });

    // Không tiết lộ email có tồn tại hay không (bảo mật)
    if (!user) {
      return NextResponse.json(
        { message: "Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu." },
        { status: 200 }
      );
    }

    // Tạo mã OTP 6 chữ số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

    user.resetToken = otp;
    user.resetTokenExpiry = expiry;
    await user.save();

    const emailFrom = process.env.EMAIL_FROM;
    const emailPass = process.env.EMAIL_PASSWORD;
    const isDev = !emailFrom || emailFrom === "your-email@gmail.com";

    if (!isDev) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: emailFrom, pass: emailPass },
        });

        await transporter.sendMail({
          from: `"Order.uk" <${emailFrom}>`,
          to: email,
          subject: "Mã xác nhận đặt lại mật khẩu - Order.uk",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #FC8A06; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Order<span style="color: #fff0d0;">.uk</span></h1>
              </div>
              <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #1f2937; margin-top: 0;">Mã xác nhận của bạn</h2>
                <p style="color: #4b5563;">Dùng mã dưới đây để đặt lại mật khẩu. Mã có hiệu lực trong <strong>15 phút</strong>.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <div style="display: inline-block; background: #fff7ed; border: 2px dashed #FC8A06; border-radius: 16px; padding: 20px 40px;">
                    <span style="font-size: 42px; font-weight: 900; letter-spacing: 12px; color: #FC8A06;">${otp}</span>
                  </div>
                </div>
                <p style="color: #9ca3af; font-size: 12px; text-align: center;">Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                <p style="color: #9ca3af; font-size: 11px; text-align: center;">© 2024 Order.uk. All rights reserved.</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    } else {
      console.log("\n========== [DEV MODE] OTP Code ==========");
      console.log("Email:", email, "| OTP:", otp);
      console.log("==========================================\n");
    }

    return NextResponse.json(
      {
        message: "Mã xác nhận đã được gửi tới email của bạn.",
        ...(isDev && { devOtp: otp }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Lỗi server, vui lòng thử lại." }, { status: 500 });
  }
}
