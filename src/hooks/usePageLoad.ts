import { useEffect, useState } from "react";

/** Simulates a brief page-load delay so skeleton cards are visible on navigation. */
export function usePageLoad(ms = 600) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}
