import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck, Lock as LockSmall, User } from "lucide-react";
import BrandPanel from "../components/auth/BrandPanel";
import MobileHeader from "../components/auth/MobileHeader";
import DarkModeToggle from "../components/auth/DarkModeToggle";
import PasswordStrength from "../components/auth/PasswordStrength";

const AUTH_USER_KEY = "estin_auth_user";
const AUTH_TOKEN_KEY = "estin_auth_token";
const AUTH_STATE_KEY = "estin_auth_state";

const Signup = () => {
  const [dark, setDark] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    setLoading(true);

    /* مؤقت: بدون أي تحقق — مباشرة localStorage ثم redirect */
    localStorage.setItem(AUTH_TOKEN_KEY, "dummy_token");
    localStorage.setItem(AUTH_STATE_KEY, "true");
    localStorage.setItem(
      AUTH_USER_KEY,
      JSON.stringify({
        email: email.trim() || "user@estin.dz",
        fullName: fullName.trim() || "User",
      }),
    );

    const raidBase =
      import.meta.env.VITE_RAID_BASE_URL ?? "http://localhost:3000";
    const url = `${String(raidBase).replace(/\/$/, "")}/auth-bridge?token=dummy_token`;
    window.location.replace(url);
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
            <h2 className="text-[32px] font-bold text-foreground mb-2">Create your account</h2>
            <p className="text-[15px] text-muted-foreground mb-10">Join your ESTIN campus community today</p>

            <div className="flex flex-col gap-5">
              <div>
                <label className="auth-label mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmed Benali"
                    className="auth-input"
                  />
                </div>
              </div>

              <div>
                <label className="auth-label mb-1.5 block">University Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@estin.dz"
                    className="auth-input"
                  />
                </div>
              </div>

              <div>
                <label className="auth-label mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="auth-input !pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              <div>
                <label className="auth-label mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="auth-input !pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 h-[18px] w-[18px] rounded border-[1.5px] border-input accent-primary"
                />
                <span className="text-sm text-muted-foreground leading-snug">
                  I agree to the <a href="#" className="text-primary">Terms of Service</a> and{" "}
                  <a href="#" className="text-primary">Privacy Policy</a>
                </span>
              </label>

              <button
                type="button"
                disabled={loading}
                onClick={handleSignup}
                className="auth-btn mt-1 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Creating account...
                  </>
                ) : (
                  "Create Account →"
                )}
              </button>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
              <LockSmall size={12} /> Secured & only for ESTIN students
            </p>

            <div className="my-6 h-px w-full bg-border" />

            <p className="flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
              <ShieldCheck size={16} className="text-primary" /> Only ESTIN university emails are accepted
            </p>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
