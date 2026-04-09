export const AUTH_USER_KEY = "estin_auth_user"
export const AUTH_TOKEN_KEY = "estin_auth_token"
export const AUTH_STATE_KEY = "estin_auth_state"
export const AUTH_EVENT_NAME = "estin-auth-change"

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  const state = localStorage.getItem(AUTH_STATE_KEY)
  return Boolean(token) && state === "true"
}

export function setAuthenticatedState(value: boolean) {
  localStorage.setItem(AUTH_STATE_KEY, String(value))
  window.dispatchEvent(new Event(AUTH_EVENT_NAME))
}
