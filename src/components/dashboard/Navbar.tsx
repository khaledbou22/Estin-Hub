import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { UserAvatar } from "@/components/dashboard/UserAvatar";
import { currentUser } from "@/lib/mock-data";
import { clearSession, loadStoredUser, USER_UPDATED_EVENT } from "@/lib/user-storage";

export function Navbar() {
  const navigate = useNavigate();
  const [navbarUser, setNavbarUser] = useState(currentUser);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const searchInput = document.getElementById("global-search-input") as HTMLInputElement | null;
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const sync = () => {
      const parsed = loadStoredUser();
      if (parsed?.name) {
        setNavbarUser({
          ...currentUser,
          name: parsed.name,
          email: parsed.email ?? currentUser.email,
          // support both avatar and photoURL fields
          avatar: (parsed as { photoURL?: string }).photoURL || parsed.avatar,
        });
      }
    };
    sync();
    window.addEventListener(USER_UPDATED_EVENT, sync);
    // also listen for the generic 'userUpdated' event dispatched from profile/settings
    window.addEventListener("userUpdated", sync);
    return () => {
      window.removeEventListener(USER_UPDATED_EVENT, sync);
      window.removeEventListener("userUpdated", sync);
    };
  }, []);

  function handleSignOut() {
    clearSession();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8ECEF] bg-white/90 backdrop-blur-md dark:border-[#232323] dark:bg-[#090909]/90">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center gap-4 px-4 lg:px-10">
        {/* Logo - visible on mobile only */}
        <Link
          to="/dashboard"
          className="mr-2 flex items-center gap-2 flex-shrink-0 lg:hidden"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6C63FF]">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full p-0 hover:bg-[#EEF2FF] dark:hover:bg-[#1a1a1a]"
              >
                <UserAvatar user={navbarUser} className="h-9 w-9" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="py-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-semibold">{navbarUser.name}</p>
                  <p className="text-xs text-muted-foreground">{navbarUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 text-destructive cursor-pointer"
                  onClick={handleSignOut}
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
  );
}
