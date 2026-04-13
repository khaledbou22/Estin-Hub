import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Mail, ShieldCheck } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import MobileHeader from "@/components/auth/MobileHeader";
import DarkModeToggle from "@/components/auth/DarkModeToggle";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const toggleDark = () => { setDark((d) => !d); document.documentElement.classList.toggle("dark"); };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }

    if (!trimmed.endsWith("@estin.dz")) {
      setError("Please use your @estin.dz university email.");
      return;
    }

    setIsLoading(true);

    console.log("[ForgotPassword] Calling supabase.auth.resetPasswordForEmail for:", trimmed);

    const { error: sbError } = await supabase.auth.resetPasswordForEmail(trimmed, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    console.log("[ForgotPassword] Supabase response error:", sbError);

    setIsLoading(false);

    if (sbError) {
      console.error("[ForgotPassword] Error details:", sbError);
      setError(sbError.message);
      return;
    }

    console.log("[ForgotPassword] Reset email sent successfully.");
    setSent(true);
  }

  return (
    <div className="flex min-h-screen">
      <BrandPanel />
      <div className="relative flex flex-1 flex-col bg-background">
        <DarkModeToggle dark={dark} toggle={toggleDark} />
        <MobileHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 md:px-10 md:py-12 animate-fade-in-up">
          <div className="w-full max-w-[420px]">

            <Link to="/login" className="mb-8 flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>

            <h2 className="text-[32px] font-bold text-foreground mb-2">Forgot password?</h2>
            <p className="text-[15px] text-muted-foreground mb-10">
              Enter your university email and we'll send you a reset link.
            </p>

            {sent ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-800 dark:bg-green-950">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Mail size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-green-800 dark:text-green-200">Check your email</h3>
                <p className="text-[14px] leading-relaxed text-green-700 dark:text-green-300">
                  If an account exists for <strong>{email.trim().toLowerCase()}</strong>, a password reset link has been sent. Click the link to set a new password.
                </p>
                <p className="mt-3 text-[12px] text-green-600 dark:text-green-400">
                  Check your spam folder if you don't see it within a few minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="auth-label mb-1.5 block">University Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@estin.dz"
                      required
                      className={`auth-input ${error ? "auth-input-error" : ""}`}
                    />
                  </div>
                  {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
                </div>

                <button type="submit" disabled={isLoading} className="auth-btn flex items-center justify-center gap-2">
                  {isLoading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : "Send Reset Link →"}
                </button>
              </form>
            )}

            <div className="my-6 h-px w-full bg-border" />
            <p className="flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
              <ShieldCheck size={16} className="text-primary" /> Only ESTIN university emails are accepted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
