import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Loader2, Star, Upload } from "lucide-react";

const TYPES = [
  { id: "suggestion", emoji: "💡", label: "Suggestion" },
  { id: "bug", emoji: "🐛", label: "Bug Report" },
  { id: "compliment", emoji: "⭐", label: "Compliment" },
  { id: "question", emoji: "❓", label: "Question" },
] as const;

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent! 🎉",
};

export default function FeedbackPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeRating = hoverRating || rating;
  const canSubmit = type !== "" && rating > 0 && message.trim().length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center px-10 py-16 text-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#22C55E] bg-[#F0FDF4]"
            style={{ animation: "scale-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
          >
            <Check className="h-10 w-10 text-[#22C55E]" strokeWidth={2.5} />
          </div>
          <h2 className="mt-5 text-[24px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Thank you for your feedback! 🎉
          </h2>
          <p className="mt-2 max-w-sm text-[14px] text-[#64748B]">
            Your message has been received. We'll review it and use it to improve ESTIN Hub.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-[10px] border-[1.5px] border-[#6C63FF] px-7 py-2.5 text-sm font-semibold text-[#6C63FF] transition-all duration-200 hover:bg-[#EEF2FF]"
          >
            Back to Dashboard
          </button>
        </div>
        <style>{`
          @keyframes scale-in {
            from { transform: scale(0); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[680px]">
      {/* Header */}
      <div className="mb-10 pt-6 text-center">
        <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-4 py-1.5 text-[12px] font-semibold text-[#6C63FF]">
          ✦ We value your opinion
        </span>
        <h1 className="text-[32px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
          Share Your Feedback
        </h1>
        <p className="mt-2 text-[15px] text-[#64748B]">
          Help us improve ESTIN Hub for every student on campus.
        </p>
      </div>

      {/* Type selector */}
      <div className="mb-5 grid grid-cols-4 gap-3">
        {TYPES.map((t) => {
          const active = type === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className="flex flex-col items-center rounded-[14px] border-2 px-4 py-5 text-center transition-all duration-200"
              style={{
                borderColor: active ? "#6C63FF" : "#E8ECEF",
                background: active ? "#EEF2FF" : "white",
                cursor: "pointer",
              }}
            >
              <span
                className="mb-2 text-[28px] leading-none transition-transform duration-200"
                style={{ transform: active ? "scale(1.2)" : "scale(1)" }}
              >
                {t.emoji}
              </span>
              <span
                className="text-[13px] font-semibold"
                style={{ color: active ? "#6C63FF" : "#374151" }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rating */}
      <div className="mb-5 rounded-2xl border border-[#E8ECEF] bg-white p-7 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]">
        <p className="mb-4 text-[15px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
          How would you rate your experience?
        </p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= activeRating;
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform duration-100"
                style={{ transform: star === activeRating ? "scale(1.15)" : "scale(1)" }}
                aria-label={`Rate ${star} star`}
              >
                <Star
                  className="h-9 w-9"
                  style={{
                    color: filled ? "#F59E0B" : "#CBD5E1",
                    fill: filled ? "#F59E0B" : "none",
                    transition: "color 0.1s, fill 0.1s",
                  }}
                />
              </button>
            );
          })}
        </div>
        {activeRating > 0 && (
          <p className="mt-2 text-[13px] text-[#64748B]">{RATING_LABELS[activeRating]}</p>
        )}
      </div>

      {/* Form */}
      <div className="mb-5 rounded-2xl border border-[#E8ECEF] bg-white p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]">
        {/* Subject */}
        <div className="mb-5">
          <label className="mb-1.5 block text-[14px] font-medium text-[#374151]">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of your feedback..."
            className="h-12 w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-background px-4 text-[14px] text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] dark:border-[#2A2A2A] dark:bg-[#101010] dark:text-[#F8FAFC]"
          />
        </div>

        {/* Message */}
        <div className="mb-5">
          <label className="mb-1.5 block text-[14px] font-medium text-[#374151]">Your Message</label>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              placeholder="Tell us what's on your mind. Be as detailed as you'd like..."
              rows={5}
              className="w-full resize-y rounded-xl border-[1.5px] border-[#E2E8F0] bg-background px-4 py-3.5 text-[14px] text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] dark:border-[#2A2A2A] dark:bg-[#101010] dark:text-[#F8FAFC]"
              style={{ minHeight: 140 }}
            />
            <span
              className="absolute bottom-3 right-3 text-[12px]"
              style={{ color: message.length >= 500 ? "#EF4444" : "#94A3B8" }}
            >
              {message.length} / 500
            </span>
          </div>
        </div>

        {/* Attachment */}
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#374151]">
            Attach Screenshot (optional)
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="group w-full rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8F9FC] px-6 py-6 text-center transition-all duration-200 hover:border-[#6C63FF] hover:bg-[#EEF2FF] dark:border-[#2A2A2A] dark:bg-[#151515]"
          >
            <Upload className="mx-auto mb-2 h-8 w-8 text-[#94A3B8] transition-colors group-hover:text-[#6C63FF]" />
            <p className="text-[13px] text-[#94A3B8] group-hover:text-[#6C63FF]">
              {fileName || "Drag & drop or click to upload"}
            </p>
            {!fileName && (
              <p className="mt-1 text-[11px] text-[#CBD5E1]">PNG, JPG up to 5MB</p>
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="button"
        disabled={!canSubmit || loading}
        onClick={handleSubmit}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl text-[16px] font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #6C63FF, #4338CA)",
          boxShadow: canSubmit && !loading ? "0 4px 14px rgba(108,99,255,0.3)" : "none",
        }}
        onMouseEnter={(e) => {
          if (canSubmit && !loading)
            (e.currentTarget as HTMLElement).style.cssText +=
              ";transform:translateY(-1px);box-shadow:0 8px 25px rgba(108,99,255,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = canSubmit
            ? "0 4px 14px rgba(108,99,255,0.3)"
            : "none";
        }}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Feedback →"
        )}
      </button>
    </div>
  );
}
