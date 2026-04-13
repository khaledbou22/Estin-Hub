import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, XCircle } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import MobileHeader from "@/components/auth/MobileHeader";
import DarkModeToggle from "@/components/auth/DarkModeToggle";
import { supabase } from "@/lib/supabase";

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

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);       // true once PASSWORD_RECOVERY event fires
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const toggleDark = () => { setDark((d) => !d); document.documentElement.classList.toggle("dark"); };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validatePassword(password).isValid) { setError("Password must meet all requirements."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setIsLoading(true);
    const { error: sbError } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (sbError) { setError(sbError.message); return; }

    setSuccess(true);
    setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
  }

  const pwValid = validatePassword(password).isValid;
  const v = validatePassword(password);
  const s = getStrength(password);

  const items: [boolean, string][] = [
    [v.minLength, "At least 8 characters"],
    [v.hasUpper,  "One uppercase letter (A-Z)"],
    [v.hasLower,  "One lowercase letter (a-z)"],
    [v.hasNumber, "One number (0-9)"],
    [v.hasSpecial,"One special character (!@#$%...)"],
  ];

  return (
    <div className="flex min-h-screen">
      <BrandPanel />
      <div className="relative flex flex-1 flex-col bg-background">
        <DarkModeToggle dark={dark} toggle={toggleDark} />
        <MobileHeader />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 md:px-10 md:py-12 animate-fade-in-up">
          <div className="w-full max-w-[420px]">
            <h2 className="text-[32px] font-bold text-foreground mb-2">Set new password</h2>
            <p className="text-[15px] text-muted-foreground mb-10">
              Choose a strong password for your account.
            </p>

            {success ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-800 dark:bg-green-950">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <CheckCircle2 size={36} className="text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-green-800 dark:text-green-200">Password updated!</h3>
                <p className="text-[14px] text-green-700 dark:text-green-300">
                  Redirecting you to the dashboard…
                </p>
              </div>
            ) : !ready ? (
              <div className="rounded-2xl border border-[#E8ECEF] bg-[#F8F9FC] px-6 py-8 text-center dark:border-[#2A2A2A] dark:bg-[#151515]">
                <Loader2 size={32} className="mx-auto mb-4 animate-spin text-primary" />
                <p className="text-[14px] text-muted-foreground">
                  Verifying your reset link…
                </p>
                <p className="mt-2 text-[12px] text-muted-foreground/60">
                  If this takes too long, your link may have expired. Request a new one from the login page.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* New Password */}
                <div>
                  <label className="auth-label mb-1.5 block">New Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      className="auth-input !pr-11"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password ? (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1,2,3,4].map((seg) => (
                          <div key={seg} className="h-[4px] flex-1 rounded-full" style={{ backgroundColor: seg <= s.level ? s.color : "#E2E8F0", transition: "background-color 0.3s ease" }} />
                        ))}
                      </div>
                      <p className="mt-1.5 text-right text-[12px] font-medium" style={{ color: s.color }}>{s.label}</p>
                    </div>
                  ) : null}
                  {/* Checklist */}
                  {password ? (
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
                  ) : null}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="auth-label mb-1.5 block">Confirm New Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      className="auth-input !pr-11"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !pwValid}
                  className="mt-1 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl text-base font-semibold text-white"
                  style={{
                    background: pwValid ? "linear-gradient(135deg, #6C63FF, #4338CA)" : "#94A3B8",
                    opacity: pwValid ? 1 : 0.5,
                    cursor: pwValid ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isLoading ? <><Loader2 size={18} className="animate-spin" /> Updating…</> : "Update Password →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
