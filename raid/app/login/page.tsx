"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AUTH_STATE_KEY, AUTH_TOKEN_KEY, AUTH_USER_KEY, setAuthenticatedState } from "@/lib/auth/storage"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const authState = localStorage.getItem(AUTH_STATE_KEY)
    /* إذا كان المستخدم مسجلاً فعلاً ننتقل للوحة التحكم فقط */
    if (token !== null && authState === "true") {
      router.replace("/dashboard")
    }
  }, [router])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)
    if (!email.trim()) {
      setFormError("أدخل البريد الإلكتروني")
      return
    }
    if (password.length < 8) {
      setFormError("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      return
    }

    const fullName = email.split("@")[0].replace(/[._-]/g, " ").trim() || "ESTIN Student"
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify({ email: email.trim().toLowerCase(), fullName }))
    localStorage.setItem(AUTH_TOKEN_KEY, `mock_token_${Date.now()}`)
    setAuthenticatedState(true)
    /* تحميل كامل يضمن أن AuthGuard يرى القيم فوراً */
    window.location.href = "/dashboard"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2 text-xl font-bold">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        </div>
        <span>ESTIN Student Hub</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@estin.dz"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            {formError && (
              <p className="text-center text-sm text-destructive">{formError}</p>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
