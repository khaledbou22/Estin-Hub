import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // Frontend-only mock auth currently uses localStorage,
  // so route protection is handled client-side in AuthGuard.
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
}
