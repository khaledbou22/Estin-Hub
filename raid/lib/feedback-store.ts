"use client"

export interface FeedbackItem {
  id: string
  createdAt: string
  rating: number
  category: "bug" | "feature" | "ui" | "general"
  message: string
  contact?: string
}

const KEY = "estin:feedback"
const EVENT = "estin:feedback-updated"

export function getFeedback(): FeedbackItem[] {
  if (typeof window === "undefined") return []
  const raw = window.localStorage.getItem(KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function addFeedback(item: Omit<FeedbackItem, "id" | "createdAt">) {
  const next: FeedbackItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const all = [next, ...getFeedback()]
  window.localStorage.setItem(KEY, JSON.stringify(all))
  window.dispatchEvent(new Event(EVENT))
}

export function subscribeFeedback(callback: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) callback()
  }
  window.addEventListener("storage", onStorage)
  window.addEventListener(EVENT, callback)
  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener(EVENT, callback)
  }
}
