"use client"

import { useLayoutEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AUTH_EVENT_NAME, isAuthenticated } from "@/lib/auth/storage"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [allowed, setAllowed] = useState(false)

  useLayoutEffect(() => {
    const verify = () => {
      if (isAuthenticated()) {
        setAllowed(true)
        return
      }
      setAllowed(false)
      window.location.replace("/login")
    }

    verify()
    window.addEventListener("storage", verify)
    window.addEventListener(AUTH_EVENT_NAME, verify)
    return () => {
      window.removeEventListener("storage", verify)
      window.removeEventListener(AUTH_EVENT_NAME, verify)
    }
  }, [pathname])

  if (!allowed) {
    return null
  }

  return <>{children}</>
}
