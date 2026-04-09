import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

export function AppLoader({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 800);
    const t2 = setTimeout(() => onDone(), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#050505]"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6C63FF]">
          <GraduationCap className="h-6 w-6" />
        </div>
        <span className="text-[24px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
          ESTIN Hub
        </span>
      </div>
      <div
        className="h-[3px] w-[200px] overflow-hidden rounded-full bg-[#E8ECEF]"
      >
        <div
          style={{
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #E8ECEF 0%, #6C63FF 50%, #E8ECEF 100%)",
            backgroundSize: "200% 100%",
            animation: "app-shimmer 1.5s infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes app-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  );
}
