"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, Lock, Eye, EyeOff, KeyRound } from "lucide-react";

type Step = "email" | "otp" | "password" | "done";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [devOtp, setDevOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Vui long nhap email"); return; }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
      const user = users.find((u: any) => u.email === email);
      
      if (user) {
        const mockOtp = "123456";
        setDevOtp(mockOtp);
        setStep("otp");
      } else {
        setError("Email khong ton tai tren he thong");
      }
    } catch {
      setError("Loi he thong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) { setOtp(pasted.split("")); otpRefs.current[5]?.focus(); }
    e.preventDefault();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length < 6) { setError("Vui long nhap du 6 so"); return; }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (otpValue === devOtp) {
        setStep("password");
      } else {
        setError("Ma OTP khong dung");
      }
    } catch {
      setError("Loi he thong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) { setError("Mat khau phai co it nhat 6 ky tu"); return; }
    if (newPassword !== confirmPassword) { setError("Mat khau xac nhan khong khop"); return; }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
      const userIndex = users.findIndex((u: any) => u.email === email);
      
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("mock_users", JSON.stringify(users));
        setStep("done");
      } else {
        setError("Da xay ra loi khong tim thay nguoi dung");
      }
    } catch {
      setError("Loi he thong");
    } finally {
      setLoading(false);
    }
  };

  const steps = ["Email", "Ma OTP", "Mat khau"];
  const stepIndex = step === "email" ? 0 : step === "otp" ? 1 : step === "password" ? 2 : 3;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {step !== "done" && (
          <div className="flex items-center justify-center mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${
                  i < stepIndex ? "bg-green-500 text-white" :
                  i === stepIndex ? "bg-orange-500 text-white" :
                  "bg-gray-200 text-gray-400"
                }`}>
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span className={`hidden sm:block mx-1 text-xs font-medium ${i === stepIndex ? "text-orange-500" : "text-gray-400"}`}>{s}</span>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${i < stepIndex ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {step === "email" && (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-7 h-7 text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Quen mat khau?</h1>
              <p className="text-gray-500 text-sm mt-1">Nhap email de nhan ma xac nhan OTP</p>
            </div>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dia chi Email</label>
                <input type="email" placeholder="email@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900" />
              </div>
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm">{error}</p></div>}
              <button type="submit" disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Dang gui...</span> : "Gui ma OTP"}
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-7 h-7 text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Nhap ma OTP</h1>
              <p className="text-gray-500 text-sm mt-1">
                Ma 6 so da duoc gui toi <strong className="text-gray-700">{email}</strong>
              </p>
              <p className="text-xs text-gray-400 mt-1">Ma co hieu luc trong 15 phut</p>
            </div>
            {devOtp && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
                <p className="text-xs font-bold text-yellow-700">DEV MODE - Ma OTP:</p>
                <p className="text-3xl font-mono font-black text-yellow-800 tracking-widest mt-1">{devOtp}</p>
              </div>
            )}
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={1} value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
                ))}
              </div>
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm text-center">{error}</p></div>}
              <button type="submit" disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
                {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Dang xac nhan...</span> : "Xac nhan ma OTP"}
              </button>
              <button type="button" onClick={() => { setStep("email"); setOtp(["","","","","",""]); setError(""); }}
                className="w-full text-gray-500 hover:text-gray-700 text-sm py-2">
                Doi email
              </button>
            </form>
          </>
        )}

        {step === "password" && (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7 text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Mat khau moi</h1>
              <p className="text-gray-500 text-sm mt-1">Tao mat khau manh cho tai khoan cua ban</p>
            </div>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mat khau moi</label>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} placeholder="Toi thieu 6 ky tu" value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900" />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xac nhan mat khau</label>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} placeholder="Nhap lai mat khau" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm">{error}</p></div>}
              <button type="submit" disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
                {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Dang cap nhat...</span> : "Dat lai mat khau"}
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <div className="text-center space-y-4 py-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Thanh cong!</h2>
            <p className="text-gray-600 text-sm">Mat khau cua ban da duoc cap nhat thanh cong.</p>
            <Link href="/login"
              className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition text-center">
              Dang nhap ngay
            </Link>
          </div>
        )}

        {step !== "done" && (
          <div className="mt-5 text-center">
            <Link href="/login" className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm">
              <ArrowLeft className="w-4 h-4" />Quay lai dang nhap
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
