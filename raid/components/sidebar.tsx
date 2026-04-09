"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  Car,
  FileText,
  GraduationCap,
  Home,
  MessageSquareText,
  PlusCircle,
  Search,
  Settings,
  ShoppingBag,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { currentUser } from "@/lib/mock-data"

const mainNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/transport", label: "Transport", icon: Car },
  { href: "/lost-found", label: "Lost & Found", icon: Search },
]

const userNavItems = [
  { href: "/create-post", label: "Create Post", icon: PlusCircle },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/feedback", label: "Feedback", icon: MessageSquareText },
]

const adminNavItems = [
  { href: "/admin", label: "Admin", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const isAdmin = currentUser.role === "admin"

  return (
    <aside className="hidden w-[220px] flex-col border-r border-[#E8ECEF] bg-white dark:border-[#232323] dark:bg-[#090909] lg:flex">
      <div className="border-b border-[#E8ECEF] px-4 py-6 dark:border-[#232323]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6C63FF]">
          <GraduationCap className="h-5 w-5" />
        </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">ESTIN Hub</span>
            <span className="text-[11px] text-[#94A3B8] dark:text-[#94A3B8]">Campus Ecosystem</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          <p className="mb-2 ml-3 mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8]">
            Browse
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-premium",
                  isActive
                    ? "border-l-[3px] border-[#6C63FF] bg-[#EEF2FF] font-semibold text-[#6C63FF] dark:bg-[#171717]"
                    : "text-[#374151] hover:bg-[#F5F3FF] hover:text-[#6C63FF] dark:text-[#CBD5E1] dark:hover:bg-[#141414]"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0", isActive ? "text-[#6C63FF]" : "text-[#94A3B8] group-hover:text-[#6C63FF]")} />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="space-y-2">
          <p className="mb-2 ml-3 mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8]">
            My Account
          </p>
          {userNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-premium",
                  isActive
                    ? "border-l-[3px] border-[#6C63FF] bg-[#EEF2FF] font-semibold text-[#6C63FF] dark:bg-[#171717]"
                    : "text-[#374151] hover:bg-[#F5F3FF] hover:text-[#6C63FF] dark:text-[#CBD5E1] dark:hover:bg-[#141414]"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0", isActive ? "text-[#6C63FF]" : "text-[#94A3B8]")} />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Admin Navigation (only for admins) */}
        {isAdmin && (
          <div className="space-y-2">
            <p className="mb-2 ml-3 mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8]">
              Administration
            </p>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-premium",
                    isActive
                      ? "border-l-[3px] border-[#6C63FF] bg-[#EEF2FF] font-semibold text-[#6C63FF] dark:bg-[#171717]"
                      : "text-[#374151] hover:bg-[#F5F3FF] hover:text-[#6C63FF] dark:text-[#CBD5E1] dark:hover:bg-[#141414]"
                  )}
                >
                  <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0", isActive ? "text-[#6C63FF]" : "text-[#94A3B8]")} />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#E8ECEF] px-4 py-4 dark:border-[#232323]">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("estin_auth_token")
            localStorage.removeItem("estin_auth_user")
            localStorage.setItem("estin_auth_state", "false")
            window.location.href = "/login"
          }}
          className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-[#374151] transition-premium hover:bg-[#F5F3FF] hover:text-[#6C63FF] dark:text-[#CBD5E1] dark:hover:bg-[#141414]"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0 text-[#94A3B8]" />
          <span className="truncate">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
