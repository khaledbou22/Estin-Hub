import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#F8F9FC] dark:bg-[#050505]">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
            <div className="mx-auto max-w-[1200px] bg-[#F8F9FC] px-8 py-7 dark:bg-[#050505]">{children}</div>
          </main>
          <MobileNav />
        </div>
      </div>
    </AuthGuard>
  )
}
