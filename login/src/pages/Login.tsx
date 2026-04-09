import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck, Lock as LockSmall } from "lucide-react";
import BrandPanel from "../components/auth/BrandPanel";
import MobileHeader from "../components/auth/MobileHeader";
import DarkModeToggle from "../components/auth/DarkModeToggle";

const schema = z.object({
  email: z.string().trim().regex(/^[^\s@]+@estin\.dz$/, "Please use your @estin.dz university email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type FormData = z.infer<typeof schema>;
const AUTH_USER_KEY = "estin_auth_user";
const AUTH_TOKEN_KEY = "estin_auth_token";
const AUTH_STATE_KEY = "estin_auth_state";

const Login = () => {
  const [dark, setDark] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    setLoading(true);
    try {
      const raidBaseUrl = import.meta.env.VITE_RAID_BASE_URL ?? "http://localhost:3000";
      const fullName =
        data.email.split("@")[0].replace(/[._-]/g, " ").trim() || "ESTIN Student";
      const token = `mock_token_${Date.now()}`;
      /* جلسة Vite (اختياري)؛ المهم: الجلسة تُكتب على نطاق RAID عبر auth-bridge */
      localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({ email: data.email, fullName }),
      );
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_STATE_KEY, "true");

      const q = new URLSearchParams({
        token,
        email: data.email.trim().toLowerCase(),
        fullName,
      });
      window.location.href = `${raidBaseUrl.replace(/\/$/, "")}/auth-bridge?${q.toString()}`;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Login failed. Please try again.");
      setLoading(false);
    }
  };

  const toggleDark = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex min-h-screen">
      <BrandPanel />
      <div className="relative flex flex-1 flex-col bg-background">
        <DarkModeToggle dark={dark} toggle={toggleDark} />
        <MobileHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 md:px-10 md:py-12 animate-fade-in-up">
          <div className="w-full max-w-[420px]">
            <h2 className="text-[32px] font-bold text-foreground mb-2">Welcome back</h2>
            <p className="text-[15px] text-muted-foreground mb-10">Sign in with your university email to continue</p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Email */}
              <div>
                <label className="auth-label mb-1.5 block">University Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input {...register("email")} placeholder="yourname@estin.dz"
                    className={`auth-input ${errors.email ? "auth-input-error" : ""}`} />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="auth-label">Password</label>
                  <button type="button" className="text-[13px] text-primary hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input {...register("password")} type={showPw ? "text" : "password"} placeholder="••••••••"
                    className={`auth-input !pr-11 ${errors.password ? "auth-input-error" : ""}`} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={loading} className="auth-btn mt-3 flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign In →"}
              </button>
              {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            </form>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
              <LockSmall size={12} /> Secured & only for ESTIN students
            </p>

            <div className="my-6 h-px w-full bg-border" />

            <p className="flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
              <ShieldCheck size={16} className="text-primary" /> Only ESTIN university emails are accepted
            </p>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
