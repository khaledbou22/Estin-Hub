import type { User } from "@/lib/mock-data";

const PROFILE_STORAGE_KEY = "estin:current-user-profile";
const PROFILE_UPDATED_EVENT = "estin:profile-updated";

export interface EditableProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bio: string;
  city: string;
  studyYear: string;
  skills: string;
  contactPreference: "email" | "phone" | "both";
  linkedin: string;
  github: string;
  instagram: string;
  x: string;
}

export function toEditableProfile(user: User): EditableProfile {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    avatar: user.avatar,
    bio: user.bio ?? "",
    city: user.city ?? "",
    studyYear: user.studyYear ?? "",
    skills: (user.skills ?? []).join(", "),
    contactPreference: user.contactPreference ?? "both",
    linkedin: user.socialLinks?.linkedin ?? "",
    github: user.socialLinks?.github ?? "",
    instagram: user.socialLinks?.instagram ?? "",
    x: user.socialLinks?.x ?? "",
  };
}

export function loadCurrentUserProfile(baseUser: User): EditableProfile {
  if (typeof window === "undefined") return toEditableProfile(baseUser);
  const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!raw) return toEditableProfile(baseUser);
  try {
    const parsed = JSON.parse(raw) as Partial<EditableProfile>;
    return { ...toEditableProfile(baseUser), ...parsed };
  } catch {
    return toEditableProfile(baseUser);
  }
}

export function saveCurrentUserProfile(profile: EditableProfile): void {
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
}

export function mergeUserWithEditableProfile(user: User, profile: EditableProfile): User {
  return {
    ...user,
    name: profile.name,
    email: profile.email,
    phone: profile.phone || undefined,
    avatar: profile.avatar,
    bio: profile.bio,
    city: profile.city,
    studyYear: profile.studyYear || undefined,
    skills: profile.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    contactPreference: profile.contactPreference,
    socialLinks: {
      linkedin: profile.linkedin || undefined,
      github: profile.github || undefined,
      instagram: profile.instagram || undefined,
      x: profile.x || undefined,
    },
  };
}

export function subscribeProfileUpdates(callback: () => void): () => void {
  const storageHandler = (event: StorageEvent) => {
    if (event.key === PROFILE_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", storageHandler);
  window.addEventListener(PROFILE_UPDATED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", storageHandler);
    window.removeEventListener(PROFILE_UPDATED_EVENT, callback);
  };
}
