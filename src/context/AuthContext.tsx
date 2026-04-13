import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen FIRST — catches SIGNED_IN and PASSWORD_RECOVERY from URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);

      if (newSession) {
        localStorage.setItem("estin_auth", "true");
      } else {
        localStorage.removeItem("estin_auth");
      }

      // Route based on event type
      if (event === "PASSWORD_RECOVERY") {
        // Forgot password link clicked → go to reset password page
        window.location.replace("/reset-password");
      } else if (event === "SIGNED_IN") {
        // Email verification link clicked → go to dashboard
        // Only redirect if we're on the callback page (not on a normal login)
        const path = window.location.pathname;
        if (path === "/auth/callback") {
          window.location.replace("/dashboard");
        }
      }
    });

    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
