/**
 * Client-side session keys for the mock auth flow.
 * estin_account_password is used only so Settings → Security can verify "current password".
 */

export const AUTH_KEY = "estin_auth";
export const USER_KEY = "estin_user";
export const ACCOUNT_PASSWORD_KEY = "estin_account_password";
export const USER_UPDATED_EVENT = "estin-user-updated";

export type StoredUser = {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  memberSince?: string;
};

export function loadStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredUser;
    if (!parsed?.name || !parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(USER_UPDATED_EVENT));
}

export function saveStoredUser(updates: Partial<StoredUser> & { name?: string; email?: string }): void {
  const prev = loadStoredUser();
  const next: StoredUser = {
    name: updates.name ?? prev?.name ?? "",
    email: updates.email ?? prev?.email ?? "",
    avatar: updates.avatar ?? prev?.avatar,
    bio: updates.bio !== undefined ? updates.bio : prev?.bio,
    memberSince: updates.memberSince ?? prev?.memberSince,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(USER_UPDATED_EVENT));
}

export function getAccountPassword(): string | null {
  return localStorage.getItem(ACCOUNT_PASSWORD_KEY);
}

export function setAccountPassword(password: string): void {
  localStorage.setItem(ACCOUNT_PASSWORD_KEY, password);
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCOUNT_PASSWORD_KEY);
}
