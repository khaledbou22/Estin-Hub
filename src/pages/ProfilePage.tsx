import { Navigate, useNavigate } from "react-router-dom";
import { loadStoredUser } from "@/lib/user-storage";

const cardClass =
  "rounded-2xl border border-solid border-[#E8ECEF] bg-white p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]";

export default function ProfilePage() {
  const user = loadStoredUser();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSinceLabel = user.memberSince
    ? new Date(user.memberSince).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "—";

  const inputReadonly =
    "h-12 w-full cursor-not-allowed rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-[#F1F5F9] px-4 text-[15px] text-[#64748B] dark:border-[#2A2A2A] dark:bg-[#1a1a1a]";

  return (
    <div className="space-y-8">
      <div className={cardClass}>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#6C63FF] text-2xl font-bold text-white"
              aria-hidden
            >
              {initials || "?"}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{user.name}</h1>
              <p className="mt-1 text-[15px] text-[#64748B]">{user.email}</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Member since {memberSinceLabel}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="rounded-[10px] bg-gradient-to-br from-[#6C63FF] to-[#4338CA] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={cardClass}>
          <h2 className="mb-6 text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="auth-label mb-1.5 block">Full Name</label>
              <input readOnly value={user.name} className={inputReadonly} />
            </div>
            <div>
              <label className="auth-label mb-1.5 block">Email</label>
              <input readOnly value={user.email} className={inputReadonly} />
            </div>
            <div>
              <label className="auth-label mb-1.5 block">University</label>
              <input readOnly value="ESTIN University" className={inputReadonly} />
            </div>
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="mb-6 text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">Activity Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Posts Created", value: 0 },
              { label: "Services Listed", value: 0 },
              { label: "Items Sold", value: 0 },
              { label: "Rides Shared", value: 0 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#E8ECEF] bg-[#F8F9FC] p-4 dark:border-[#2A2A2A] dark:bg-[#151515]"
              >
                <p className="text-[28px] font-extrabold leading-none text-[#0F172A] dark:text-[#F8FAFC]">{stat.value}</p>
                <p className="mt-2 text-[13px] font-medium text-[#64748B]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
