import { useEffect, useState } from "react";

type SuccessToastProps = {
  message: string;
  open: boolean;
  onClose: () => void;
  durationMs?: number;
};

export function SuccessToast({ message, open, onClose, durationMs = 3000 }: SuccessToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const t = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(onClose, 200);
    }, durationMs);
    return () => window.clearTimeout(t);
  }, [open, durationMs, onClose]);

  if (!open && !visible) return null;

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-[200] rounded-xl border border-[#BBF7D0] border-l-4 border-l-[#22C55E] bg-[#F0FDF4] py-3.5 pl-5 pr-5 text-sm font-medium text-[#15803D] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-opacity duration-200 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
