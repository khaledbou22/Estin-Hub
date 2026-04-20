import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2, Eye, EyeOff, Loader2, Lock,
  Lock as LockSmall, Mail, ShieldCheck, User, XCircle,
} from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import MobileHeader from "@/components/auth/MobileHeader";
import DarkModeToggle from "@/components/auth/DarkModeToggle";
import { supabase } from "@/utils/supabase";

type FormErrors = Partial<Record<"fullName" | "email" | "password" | "confirmPassword" | "terms", string>>;

function validatePassword(pw: string) {
  const minLength = pw.length >= 8;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  return {
    minLength, hasUpper, hasLower, hasNumber, hasSpecial,
    get isValid() { return this.minLength && this.hasUpper && this.hasLower && this.hasNumber && this.hasSpecial; },
  };
}

function getStrength(pw: string) {
  const v = validatePassword(pw);
  let s = 0;
  if (v.minLength) s++; if (v.hasUpper) s++; if (v.hasNumber) s++; if (v.hasSpecial) s++;
  if (s <= 1) return { level: 1, label: "Weak",   color: "#EF4444" };
  if (s === 2) return { level: 2, label: "Fair",   color: "#F97316" };
  if (s === 3) return { level: 3, label: "Good",   color: "#EAB308" };
  return          { level: 4, label: "Strong", color: "#22C55E" };
}

const SignUpPage = () => {
  const [dark, setDark] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();
  const avatar = useMemo(() => (fullName.trim() ? fullName.trim().slice(0, 2).toUpperCase() : ""), [fullName]);
  const setError = (f: keyof FormErrors, m: string) => setErrors((p) => ({ ...p, [f]: m }));

  async function handleSignUp() {
    setErrors({}); setSubmitError(null);
    if (!fullName.trim() || fullName.trim().length < 2) { setError("fullName", "Name must be at least 2 characters"); return; }
    if (!email.trim().toLowerCase().endsWith("@estin.dz")) { setError("email", "Only @estin.dz university emails are allowed."); return; }
    if (!validatePassword(password).isValid) { setError("password", "Password must meet all requirements"); return; }
    if (password !== confirmPassword) { setError("confirmPassword", "Passwords do not match"); return; }
    if (!agreedToTerms) { setError("terms", "You must agree to the Terms of Service"); return; }

    setIsLoading(true);
    const trimmedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName.trim(),
          display_name: fullName.trim().split(" ")[0],
        },
      },
    });

    if (data?.user && data.user.identities?.length === 0) {
      setError("email", "This email is already registered. Please sign in instead.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    if (error) { setSubmitError(error.message); return; }

    navigate("/check-email", { state: { email: trimmedEmail } });
  }

  const toggleDark = () => { setDark((d) => !d); document.documentElement.classList.toggle("dark"); };
  const pwValid = validatePassword(password).isValid;

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

            {/* Form */}
            <div className="flex flex-col gap-5">
                {/* Full Name */}
                <div>
                  <label className="auth-label mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ahmed Benali" className={`auth-input ${errors.fullName ? "auth-input-error" : ""}`} />
                  </div>
                  {errors.fullName && <p className="mt-1.5 text-xs text-destructive">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="auth-label mb-1.5 block">University Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@estin.dz" className={`auth-input ${errors.email ? "auth-input-error" : ""}`} />
                  </div>
                  {errors.email && (
                    errors.email === "This email is already registered. Please sign in instead." ? (
                      <p className="mt-1.5" style={{ fontSize: 13, color: "#EF4444" }}>
                        This account already exists. Please sign in instead. {" "}
                        <span
                          role="button"
                          tabIndex={0}
                          style={{ color: "#6C63FF", fontWeight: 600, cursor: "pointer" }}
                          onClick={() => navigate("/login")}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") navigate("/login");
                          }}
                        >
                          → Sign in
                        </span>
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                    )
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="auth-label mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPw ? "text" : "password"} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                      autoComplete="new-password" placeholder="••••••••"
                      className={`auth-input !pr-11 ${errors.password ? "auth-input-error" : ""}`}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>}
                  {password ? (() => {
                    const s = getStrength(password);
                    return (
                      <div className="mt-2">
                        <div className="flex gap-1">
                          {[1,2,3,4].map((seg) => (
                            <div key={seg} className="h-[4px] flex-1 rounded-full" style={{ backgroundColor: seg <= s.level ? s.color : "#E2E8F0", transition: "background-color 0.3s ease" }} />
                          ))}
                        </div>
                        <p className="mt-1.5 text-right text-[12px] font-medium" style={{ color: s.color }}>{s.label}</p>
                      </div>
                    );
                  })() : null}
                  {password ? (() => {
                    const v = validatePassword(password);
                    const items: [boolean, string][] = [
                      [v.minLength, "At least 8 characters"],
                      [v.hasUpper,  "One uppercase letter (A-Z)"],
                      [v.hasLower,  "One lowercase letter (a-z)"],
                      [v.hasNumber, "One number (0-9)"],
                      [v.hasSpecial,"One special character (!@#$%...)"],
                    ];
                    return (
                      <div style={{ background:"#F8F9FC", border:"1px solid #E8ECEF", borderRadius:10, padding:"12px 16px", marginTop:8, display:"flex", flexDirection:"column", gap:7 }}>
                        {items.map(([met, label]) => (
                          <div key={label} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13 }}>
                            <span style={{ display:"inline-flex", transform: met ? "scale(1)" : "scale(0.8)", transition:"transform 0.2s ease" }}>
                              {met ? <CheckCircle2 size={15} style={{ color:"#22C55E" }} /> : <XCircle size={15} style={{ color:"#EF4444" }} />}
                            </span>
                            <span style={{ color: met ? "#22C55E" : "#94A3B8", fontWeight: met ? 500 : 400, transition:"color 0.2s ease" }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })() : null}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="auth-label mb-1.5 block">Confirm Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showConfirm ? "text" : "password"} value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onCopy={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                      autoComplete="new-password" placeholder="••••••••"
                      className={`auth-input !pr-11 ${errors.confirmPassword ? "auth-input-error" : ""}`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1.5 text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] rounded border-[1.5px] border-input accent-primary" />
                  <span className="text-sm text-muted-foreground leading-snug">
                    I agree to the <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <p className="-mt-2 text-xs text-destructive">{errors.terms}</p>}

                {submitError && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">{submitError}</div>
                )}

                <button
                  type="button"
                  disabled={isLoading || !pwValid}
                  onClick={() => void handleSignUp()}
                  className="mt-1 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl text-base font-semibold text-white"
                  style={{
                    background: pwValid ? "linear-gradient(135deg, #6C63FF, #4338CA)" : "#94A3B8",
                    opacity: pwValid ? 1 : 0.5,
                    cursor: pwValid ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isLoading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : "Create Account →"}
                </button>
              </div>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
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
            {avatar ? <span className="sr-only" aria-hidden="true">{avatar}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
