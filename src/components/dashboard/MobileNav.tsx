import { NavLink } from "react-router-dom";
import { Briefcase, Car, Home, PlusCircle, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home, end: true },
  { href: "/dashboard/services", label: "Services", icon: Briefcase, end: false },
  { href: "/dashboard/marketplace", label: "Market", icon: ShoppingBag, end: false },
  { href: "/dashboard/transport", label: "Transport", icon: Car, end: false },
  { href: "/dashboard/lost-found", label: "Lost", icon: Search, end: false },
  { href: "/dashboard/create-post", label: "Post", icon: PlusCircle, end: false },
  { href: "/profile", label: "Profile", icon: User, end: false },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
      <div className="flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-xs",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
