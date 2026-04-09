import { SquareSpinner } from "@/components/square-spinner"

export default function AppLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <SquareSpinner />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  )
}
