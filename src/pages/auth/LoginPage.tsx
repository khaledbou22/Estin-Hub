import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, Lock, Lock as LockSmall, Mail, ShieldCheck } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import MobileHeader from "@/components/auth/MobileHeader";
import DarkModeToggle from "@/components/auth/DarkModeToggle";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

type FormData = { email: string; password: string };

const LoginPage = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [dark, setDark] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    const email = data.email.trim().toLowerCase();

    if (!email.endsWith("@estin.dz")) {
      setError("email", { type: "validate", message: "Please use your @estin.dz university email" });
      return;
    }

    if (!data.password || data.password.length < 6) {
      setError("password", { type: "validate", message: "Invalid password" });
      return;
    }

    setIsLoading(true);

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password: data.password,
    });

    setIsLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setSubmitError("Please verify your email first. Check your inbox for the verification link.");
      } else if (error.message.toLowerCase().includes("invalid login credentials")) {
        setSubmitError("Invalid email or password.");
      } else {
        setSubmitError(error.message);
      }
      return;
    }

    // Save user info to localStorage for display in dashboard
    if (authData.user) {
      const meta = authData.user.user_metadata as { full_name?: string; display_name?: string };
      const displayName = meta?.display_name || meta?.full_name || email.split("@")[0];
      localStorage.setItem("estin_user", JSON.stringify({
        name: displayName,
        email: authData.user.email,
      }));
    }

    navigate("/dashboard");
  };

  const toggleDark = () => { setDark((d) => !d); document.documentElement.classList.toggle("dark"); };

  // Already authenticated → go straight to dashboard
  if (!loading && session) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen">
      <BrandPanel />
      <div className="relative flex flex-1 flex-col bg-background">
        <DarkModeToggle dark={dark} toggle={toggleDark} />
        <MobileHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 md:px-10 md:py-12 animate-fade-in-up">
          <div className="w-full max-w-[420px]">
            <h2 className="text-[32px] font-bold text-foreground mb-2">Welcome back</h2>
            <p className="text-[15px] text-muted-foreground mb-10">
              Sign in with your university email to continue
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div>
                <label className="auth-label mb-1.5 block">University Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register("email")}
                    placeholder="yourname@estin.dz"
                    className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="auth-label">Password</label>
                  <Link to="/forgot-password" className="text-[13px] text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register("password")}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    className={`auth-input !pr-11 ${errors.password ? "auth-input-error" : ""}`}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={isLoading} className="auth-btn mt-3 flex items-center justify-center gap-2">
                {isLoading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign In →"}
              </button>

              {submitError && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">
                  {submitError}
                </div>
              )}
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

export default LoginPage;
