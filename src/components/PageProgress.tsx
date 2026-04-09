import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export function PageProgress() {
  const location = useLocation();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any pending timers
    if (timerRef.current) clearTimeout(timerRef.current);

    // Start progress
    setVisible(true);
    setWidth(0);

    // Animate to 85% quickly
    const t1 = setTimeout(() => setWidth(85), 10);
    // Jump to 100%
    const t2 = setTimeout(() => setWidth(100), 300);
    // Fade out
    const t3 = setTimeout(() => setVisible(false), 520);
    // Reset width after fade
    const t4 = setTimeout(() => setWidth(0), 720);

    timerRef.current = t4;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [location.pathname]);

  if (!visible && width === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        height: 3,
        width: `${width}%`,
        background: "linear-gradient(90deg, #6C63FF, #4ECDC4)",
        borderRadius: "0 999px 999px 0",
        transition: width === 85
          ? "width 0.3s ease"
          : width === 100
            ? "width 0.15s ease"
            : "none",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
