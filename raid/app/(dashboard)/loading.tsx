import { SquareSpinner } from "@/components/square-spinner"

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <SquareSpinner />
      <p className="text-sm text-muted-foreground">Loading dashboard...</p>
    </div>
  )
}
