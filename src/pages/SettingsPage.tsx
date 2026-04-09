import { useCallback, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Check, Eye, EyeOff, Lock, X } from "lucide-react";
import { SuccessToast } from "@/components/SuccessToast";
import {
  getAccountPassword,
  loadStoredUser,
  saveStoredUser,
  setAccountPassword,
} from "@/lib/user-storage";

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "#EF4444" };
  if (score === 2) return { level: 2, label: "Fair", color: "#F97316" };
  if (score === 3) return { level: 3, label: "Good", color: "#EAB308" };
  return { level: 4, label: "Strong", color: "#22C55E" };
}

const formCard =
  "rounded-2xl border border-[#E8ECEF] bg-white p-8 shadow-sm dark:border-[#2A2A2A] dark:bg-[#101010]";

const inputClass =
  "h-12 w-full rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white px-4 pl-11 text-[15px] text-[#374151] transition-all outline-none focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] dark:border-[#2A2A2A] dark:bg-[#101010] dark:text-[#E5E7EB]";

const gradientBtn =
  "rounded-[10px] bg-gradient-to-br from-[#6C63FF] to-[#4338CA] px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-45";

const gradientBtnWide =
  "rounded-[10px] bg-gradient-to-br from-[#6C63FF] to-[#4338CA] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-45";

export default function SettingsPage() {
  const stored = loadStoredUser();
  const [tab, setTab] = useState<"edit" | "security">("edit");

  const [fullName, setFullName] = useState(stored?.name ?? "");
  const [bio, setBio] = useState(stored?.bio ?? "");

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [pwSubmitError, setPwSubmitError] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastOpen(true);
  }, []);

  const closeToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  if (!stored) {
    return <Navigate to="/login" replace />;
  }

  const strength = useMemo(() => getStrength(newPw), [newPw]);
  const newPwValid = strength.level >= 3;
  const confirmMatch = confirmPw.length > 0 && newPw === confirmPw;
  const confirmMismatch = confirmPw.length > 0 && newPw !== confirmPw;
  const currentOk = currentPw.length > 0;
  const canUpdatePassword =
    currentOk && newPwValid && confirmMatch && !confirmMismatch;

  const handleSaveProfile = () => {
    saveStoredUser({ name: fullName.trim() || stored.name, email: stored.email, bio: bio.trim() });
    showToast("Profile updated successfully ✓");
  };

  const handleUpdatePassword = () => {
    setPwSubmitError("");
    if (!currentOk) return;
    if (!newPwValid) {
      setPwSubmitError("Password is too weak. Add uppercase, numbers and symbols.");
      return;
    }
    if (!confirmMatch) return;
    const saved = getAccountPassword();
    if (saved !== null && currentPw !== saved) {
      setPwSubmitError("Current password is incorrect.");
      return;
    }
    if (saved === null && currentPw.length < 1) return;
    setAccountPassword(newPw);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    showToast("Password updated successfully ✓");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Settings</h1>

      <div className="flex gap-8 border-b border-[#E8ECEF] dark:border-[#2A2A2A]">
        {(
          [
            { id: "edit" as const, label: "Edit Profile" },
            { id: "security" as const, label: "Security" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`border-b-2 pb-3 text-sm transition-[color,border-color] duration-200 ease-out ${
              tab === t.id
                ? "border-[#6C63FF] font-semibold text-[#6C63FF]"
                : "border-transparent font-medium text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "edit" && (
        <div className={formCard}>
          <div className="mx-auto max-w-xl space-y-5">
            <div>
              <label className="auth-label mb-1.5 block">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`${inputClass} pl-4`}
              />
            </div>
            <div>
              <label className="auth-label mb-1.5 block">Email Address</label>
              <input
                readOnly
                value={stored.email}
                className="h-12 w-full cursor-not-allowed rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-[#F1F5F9] px-4 text-[15px] text-[#64748B] dark:border-[#2A2A2A] dark:bg-[#1a1a1a]"
              />
              <p className="mt-1.5 text-xs text-[#94A3B8]">Email cannot be changed</p>
            </div>
            <div>
              <label className="auth-label mb-1.5 block">University</label>
              <input
                readOnly
                value="ESTIN University"
                className="h-12 w-full cursor-not-allowed rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-[#F1F5F9] px-4 text-[15px] text-[#64748B] dark:border-[#2A2A2A] dark:bg-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="auth-label mb-1.5 block">Bio (optional)</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell other students about yourself..."
                className="min-h-[96px] w-full resize-y rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white px-4 py-3 text-[15px] text-[#374151] outline-none focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] dark:border-[#2A2A2A] dark:bg-[#101010] dark:text-[#E5E7EB]"
              />
            </div>
            <button type="button" onClick={handleSaveProfile} className={`${gradientBtn} mt-2`}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className={formCard}>
          <div className="mx-auto max-w-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Change Password</h2>
              <p className="mt-1 text-sm text-[#64748B]">Choose a strong password to keep your account secure</p>
            </div>

            <div>
              <label className="auth-label mb-1.5 block">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type={showCur ? "text" : "password"}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  onClick={() => setShowCur((s) => !s)}
                  aria-label={showCur ? "Hide password" : "Show password"}
                >
                  {showCur ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="auth-label mb-1.5 block">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type={showNew ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => {
                    setNewPw(e.target.value);
                    setPwSubmitError("");
                  }}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  onClick={() => setShowNew((s) => !s)}
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {newPw.length > 0 && (
                <>
                  <div className="mt-3 flex w-full gap-1">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className="h-[4px] flex-1 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor: seg <= strength.level ? strength.color : "#E2E8F0",
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-right text-xs font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                  <p className="mt-1 text-right text-[12px] text-[#94A3B8]">
                    Must contain: uppercase letter, number, and special character (!@#$%)
                  </p>
                </>
              )}
              {pwSubmitError && (
                <p className="mt-2 text-[13px] text-[#EF4444]">{pwSubmitError}</p>
              )}
            </div>

            <div>
              <label className="auth-label mb-1.5 block">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type={showConf ? "text" : "password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  className={`${inputClass} pr-11`}
                />
                {confirmMatch && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[#22C55E]" aria-hidden>
                    <Check className="h-4 w-4" />
                  </span>
                )}
                {confirmMismatch && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[#EF4444]" aria-hidden>
                    <X className="h-4 w-4" />
                  </span>
                )}
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  onClick={() => setShowConf((s) => !s)}
                  aria-label={showConf ? "Hide password" : "Show password"}
                >
                  {showConf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmMismatch && (
                <p className="mt-1.5 text-[13px] text-[#EF4444]">Passwords do not match</p>
              )}
            </div>

            <button
              type="button"
              disabled={!canUpdatePassword}
              onClick={handleUpdatePassword}
              className={`${gradientBtnWide} w-full`}
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      <SuccessToast message={toastMessage} open={toastOpen} onClose={closeToast} />
    </div>
  );
}
