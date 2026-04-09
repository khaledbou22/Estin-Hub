import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC] dark:bg-[#050505]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          <div className="mx-auto max-w-[1200px] bg-[#F8F9FC] px-8 py-7 dark:bg-[#050505]">
            <Outlet />
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
