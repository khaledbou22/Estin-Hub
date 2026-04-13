import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Supabase redirects here after email verification / magic link.
 * The URL contains a hash fragment with the session tokens.
 * Supabase JS automatically parses it and fires onAuthStateChange.
 * We listen for SIGNED_IN and redirect to /dashboard.
 */
export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase parses the hash automatically on client init.
    // onAuthStateChange fires SIGNED_IN once the session is established.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard", { replace: true });
      }
    });

    // Also check if session already exists (in case the event already fired)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FC] dark:bg-[#050505]">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 size={40} className="animate-spin text-[#6C63FF]" />
        <p className="text-[16px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">
          Verifying your account…
        </p>
        <p className="text-[13px] text-[#64748B]">
          You'll be redirected to the dashboard shortly.
        </p>
      </div>
    </div>
  );
}
