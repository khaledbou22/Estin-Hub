import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Lock as LockSmall,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import { AUTH_KEY, setAccountPassword, setStoredUser } from "@/lib/user-storage";
import MobileHeader from "@/components/auth/MobileHeader";
import DarkModeToggle from "@/components/auth/DarkModeToggle";
import PasswordStrength from "@/components/auth/PasswordStrength";

type FormErrors = Partial<
  Record<
    "fullName" | "email" | "password" | "confirmPassword" | "terms",
    string
  >
>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const avatar = useMemo(
    () => (fullName.trim() ? fullName.trim().slice(0, 2).toUpperCase() : ""),
    [fullName],
  );

  const setError = (field: keyof FormErrors, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  async function handleSignUp(formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
  }) {
    setErrors({});

    if (!formData.fullName || formData.fullName.length < 2) {
      setError("fullName", "Name must be at least 2 characters");
      return;
    }

    if (!formData.email.endsWith("@estin.dz")) {
      setError("email", "Please use your @estin.dz university email");
      return;
    }

    if (formData.password.length < 8) {
      setError("password", "Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", "Passwords do not match");
      return;
    }

    if (!formData.agreedToTerms) {
      setError("terms", "You must agree to the Terms of Service");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStoredUser({
      name: formData.fullName,
      email: formData.email,
      avatar: formData.fullName.slice(0, 2).toUpperCase(),
      memberSince: new Date().toISOString(),
    });
    localStorage.setItem(AUTH_KEY, "true");
    setAccountPassword(formData.password);

    setIsLoading(false);
    navigate("/dashboard");
  }

  const onSubmit = () => {
    void handleSignUp({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      confirmPassword,
      agreedToTerms,
    });
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
            <h2 className="text-[32px] font-bold text-foreground mb-2">
              Create your account
            </h2>
            <p className="text-[15px] text-muted-foreground mb-10">
              Join your ESTIN campus community today
            </p>

            <div className="flex flex-col gap-5">
              <div>
                <label className="auth-label mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmed Benali"
                    className={`auth-input ${errors.fullName ? "auth-input-error" : ""}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="auth-label mb-1.5 block">University Email</label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@estin.dz"
                    className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="auth-label mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`auth-input !pr-11 ${
                      errors.password ? "auth-input-error" : ""
                    }`}
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
                {errors.password && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="auth-label mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`auth-input !pr-11 ${
                      errors.confirmPassword ? "auth-input-error" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 h-[18px] w-[18px] rounded border-[1.5px] border-input accent-primary"
                />
                <span className="text-sm text-muted-foreground leading-snug">
                  I agree to the{" "}
                  <a href="#" className="text-primary">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="-mt-2 text-xs text-destructive">{errors.terms}</p>
              )}

              <button
                type="button"
                disabled={isLoading}
                onClick={onSubmit}
                className="auth-btn mt-1 flex items-center justify-center gap-2"
              >
                {isLoading ? (
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
              <ShieldCheck size={16} className="text-primary" /> Only ESTIN
              university emails are accepted
            </p>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
            {avatar ? (
              <span className="sr-only" aria-hidden="true">
                {avatar}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

