const SAVED_POSTS_KEY = "estin:saved-posts";
const SAVED_POSTS_UPDATED_EVENT = "saved-posts-updated";

export function getSavedPostIds(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SAVED_POSTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function isPostSaved(postId: string): boolean {
  return getSavedPostIds().includes(postId);
}

export function toggleSavedPost(postId: string): boolean {
  const ids = getSavedPostIds();
  const next = ids.includes(postId)
    ? ids.filter((id) => id !== postId)
    : [...ids, postId];
  window.localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(SAVED_POSTS_UPDATED_EVENT));
  return next.includes(postId);
}


export function onSavedPostsUpdated(callback: () => void): () => void {
  const storageHandler = (event: StorageEvent) => {
    if (event.key === SAVED_POSTS_KEY) callback();
  };
  window.addEventListener("storage", storageHandler);
  window.addEventListener(SAVED_POSTS_UPDATED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", storageHandler);
    window.removeEventListener(SAVED_POSTS_UPDATED_EVENT, callback);
  };
}
