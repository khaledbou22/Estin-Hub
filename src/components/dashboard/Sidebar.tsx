import { NavLink, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Car,
  Home,
  LogOut,
  MessageSquareText,
  PlusCircle,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const mainNavItems = [
  { href: "/dashboard", label: "Home", icon: Home, end: true },
  { href: "/dashboard/services", label: "Services", icon: Briefcase, end: false },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag, end: false },
  { href: "/dashboard/transport", label: "Transport", icon: Car, end: false },
  { href: "/dashboard/lost-found", label: "Lost & Found", icon: Search, end: false },
];

const userNavItems = [
  { href: "/dashboard/create-post", label: "Create Post", icon: PlusCircle, end: false },
  { href: "/profile", label: "Profile", icon: User, end: false },
  { href: "/dashboard/feedback", label: "Feedback", icon: MessageSquareText, end: false },
];

export function Sidebar() {
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    localStorage.clear();
    navigate("/login");
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "sidebar-active-indicator flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium",
      isActive
        ? "border-l-[3px] border-[#6C63FF] bg-[#EEF2FF] font-semibold text-[#6C63FF] dark:bg-[#171717]"
        : "text-[#374151] hover:bg-[#F5F3FF] hover:text-[#6C63FF] dark:text-[#CBD5E1] dark:hover:bg-[#141414]"
    );

  return (
    <aside className="hidden w-[220px] flex-col border-r border-[#E8ECEF] bg-white dark:border-[#232323] dark:bg-[#090909] lg:flex">
      <div className="border-b border-[#E8ECEF] px-4 py-6 dark:border-[#232323]">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Estin Hub" className="h-9 w-9 rounded-full object-contain" />
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
          {mainNavItems.map((item) => (
            <NavLink key={item.href} to={item.href} end={item.end} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0", isActive ? "text-[#6C63FF]" : "text-[#94A3B8]")} />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="space-y-2">
          <p className="mb-2 ml-3 mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8]">
            My Account
          </p>
          {userNavItems.map((item) => (
            <NavLink key={item.href} to={item.href} end={item.end} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0", isActive ? "text-[#6C63FF]" : "text-[#94A3B8]")} />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-[#E8ECEF] px-4 py-4 dark:border-[#232323]">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#F5F3FF] hover:text-[#6C63FF] dark:text-[#CBD5E1] dark:hover:bg-[#141414]"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0 text-[#94A3B8]" />
          <span className="truncate">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
