"use client"

import { useLayoutEffect, useState } from "react"
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, setAuthenticatedState } from "@/lib/auth/storage"

export default function AuthBridgePage() {
  const [hint, setHint] = useState("Signing you in...")
  const [isError, setIsError] = useState(false)

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    const emailParam = params.get("email")?.trim().toLowerCase()
    const fullNameParam = params.get("fullName")?.trim()

    if (!token) {
      setHint("No token found — redirecting to login")
      setIsError(true)
      setTimeout(() => {
        window.location.replace("/login")
      }, 1500)
      return
    }

    const email =
      emailParam && emailParam.length > 0 ? emailParam : "mock@estin.dz"

    const name =
      fullNameParam && fullNameParam.length > 0
        ? fullNameParam
        : email.split("@")[0].replace(/[._-]/g, " ").trim() || "ESTIN Student"

    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
      localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({ email, fullName: name })
      )
      setAuthenticatedState(true)

      window.location.replace("/dashboard")
    } catch {
      setHint("Something went wrong. Redirecting...")
      setIsError(true)

      setTimeout(() => {
        window.location.replace("/login")
      }, 1500)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background transition-all duration-300">
      {!isError && (
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <p
          className={`text-sm font-medium ${
            isError ? "text-red-500" : "text-foreground"
          }`}
        >
          {hint}
        </p>

        {!isError && (
          <p className="text-xs text-muted-foreground">
            Please wait a moment
          </p>
        )}
      </div>
    </div>
  )
}