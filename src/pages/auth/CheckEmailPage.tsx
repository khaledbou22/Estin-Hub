import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

const COOLDOWN = 60;

export default function CheckEmailPage() {
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? "";

  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleResend() {
    if (cooldown > 0 || !email) return;
    setResending(true);
    setResendMsg(null);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setResending(false);
    if (error) {
      setResendMsg(error.message);
    } else {
      setResendMsg("Verification email resent! Check your inbox.");
      setCooldown(COOLDOWN);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FC] px-4 dark:bg-[#050505]">
      <div className="w-full max-w-[440px] rounded-2xl border border-[#E8ECEF] bg-white px-8 py-10 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]">

        {/* Animated mail icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
              animation: "mail-bounce 2s ease-in-out infinite",
            }}
          >
            <Mail size={40} style={{ color: "#6C63FF" }} />
          </div>
        </div>

        <h1 className="mb-2 text-center text-[26px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          Check your inbox!
        </h1>

        <p className="mb-1 text-center text-[15px] text-[#374151] dark:text-[#CBD5E1]">
          We sent a verification link to
        </p>
        {email && (
          <p className="mb-4 text-center text-[15px] font-semibold text-[#6C63FF]">{email}</p>
        )}

        <p className="mb-6 text-center text-[14px] leading-relaxed text-[#64748B] dark:text-[#9CA3AF]">
          Click the link in the email to access your dashboard.
        </p>

        <p className="mb-8 text-center text-[12px] text-[#94A3B8]">
          The email may take a few minutes to arrive. Check your spam folder if you don't see it.
        </p>

        {/* Resend button */}
        <button
          type="button"
          disabled={cooldown > 0 || resending || !email}
          onClick={handleResend}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#6C63FF] text-[15px] font-semibold text-[#6C63FF] transition-all duration-200 hover:bg-[#EEF2FF] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#1a1a2e]"
        >
          {resending ? (
            <><Loader2 size={16} className="animate-spin" /> Sending...</>
          ) : cooldown > 0 ? (
            `Resend email (${cooldown}s)`
          ) : (
            "Resend email"
          )}
        </button>

        {resendMsg && (
          <p className={`mt-3 text-center text-[13px] ${resendMsg.startsWith("Verification") ? "text-[#22C55E]" : "text-destructive"}`}>
            {resendMsg}
          </p>
        )}

        {/* Back link */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/signup"
            className="flex items-center gap-1.5 text-[13px] text-[#64748B] hover:text-[#6C63FF] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Sign Up
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes mail-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
