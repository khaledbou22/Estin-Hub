import { NextResponse } from "next/server"
import { AUTH_COOKIE_NAME, authCookieOptions, createSessionPayload, encodeSession } from "@/lib/auth/session"

type LoginBody = {
  email?: string
  password?: string
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as LoginBody
  const email = body.email?.trim().toLowerCase()
  const password = body.password ?? ""

  if (!email || !/^[^\s@]+@estin\.dz$/.test(email)) {
    return NextResponse.json({ message: "Please use your @estin.dz email." }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 })
  }

  const session = createSessionPayload(email)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(AUTH_COOKIE_NAME, encodeSession(session), authCookieOptions)
  return response
}
