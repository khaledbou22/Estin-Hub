import { randomUUID } from "crypto"

export const AUTH_COOKIE_NAME = "estin_session"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export type SessionPayload = {
  sid: string
  email: string
  fullName?: string
  createdAt: number
}

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
}

export function createSessionPayload(email: string, fullName?: string): SessionPayload {
  return {
    sid: randomUUID(),
    email,
    fullName,
    createdAt: Date.now(),
  }
}

export function encodeSession(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
}

export function decodeSession(value?: string): SessionPayload | null {
  if (!value) return null

  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8")
    const payload = JSON.parse(decoded) as SessionPayload
    if (!payload.email || !payload.sid) return null
    return payload
  } catch {
    return null
  }
}
