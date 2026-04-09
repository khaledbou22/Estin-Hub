"use client"

const THEME_KEY = "estin:theme"

export type ThemeMode = "light" | "dark"

export function getTheme(): ThemeMode {
  if (typeof window === "undefined") return "light"
  const saved = window.localStorage.getItem(THEME_KEY)
  if (saved === "dark" || saved === "light") return saved
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof document === "undefined") return
  document.documentElement.classList.toggle("dark", theme === "dark")
  window.localStorage.setItem(THEME_KEY, theme)
}

export function initTheme(): void {
  applyTheme(getTheme())
}
