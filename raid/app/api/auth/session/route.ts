import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth/session"

export async function GET() {
  const cookieStore = await cookies()
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value)

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      fullName: session.fullName ?? null,
    },
  })
}
