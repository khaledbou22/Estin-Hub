import { AUTH_TOKEN_KEY, AUTH_USER_KEY, setAuthenticatedState } from "@/lib/auth/storage"

export function logout() {
  localStorage.removeItem(AUTH_USER_KEY)
  localStorage.removeItem(AUTH_TOKEN_KEY)
  setAuthenticatedState(false)
}
