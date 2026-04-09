"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GraduationCap, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAvatar } from "@/components/user-avatar"
import { currentUser } from "@/lib/mock-data"
import { loadCurrentUserProfile, mergeUserWithEditableProfile, subscribeProfileUpdates } from "@/lib/profile-store"

export function Navbar() {
  const [navbarUser, setNavbarUser] = useState(currentUser)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        const searchInput = document.getElementById("global-search-input") as HTMLInputElement | null
        searchInput?.focus()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    const syncProfile = () => {
      setNavbarUser(mergeUserWithEditableProfile(currentUser, loadCurrentUserProfile(currentUser)))
    }
    syncProfile()
    return subscribeProfileUpdates(syncProfile)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8ECEF] bg-white/90 backdrop-blur-md dark:border-[#232323] dark:bg-[#090909]/90">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center gap-4 px-4 lg:px-10">
        {/* Logo - visible on mobile */}
        <Link
          href="/dashboard"
          className="mr-2 flex items-center gap-2 flex-shrink-0 lg:hidden"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="font-semibold text-sm">ESTIN</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-[320px]">
          <SearchBar
            placeholder="Search posts..."
            className="h-10"
            inputId="global-search-input"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full p-0 hover:bg-[#EEF2FF] dark:hover:bg-[#1a1a1a] transition-premium"
              >
                <UserAvatar user={navbarUser} className="h-9 w-9" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="py-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-semibold">{navbarUser.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {navbarUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 text-destructive cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("estin_auth_token")
                    localStorage.removeItem("estin_auth_user")
                    localStorage.setItem("estin_auth_state", "false")
                    window.location.href = "/login"
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
