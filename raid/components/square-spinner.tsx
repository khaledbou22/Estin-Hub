export function SquareSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="h-2.5 w-2.5 animate-[pulse_0.8s_ease-in-out_infinite] rounded-sm bg-primary" />
      <span className="h-2.5 w-2.5 animate-[pulse_0.8s_ease-in-out_0.12s_infinite] rounded-sm bg-primary/80" />
      <span className="h-2.5 w-2.5 animate-[pulse_0.8s_ease-in-out_0.24s_infinite] rounded-sm bg-primary/60" />
      <span className="h-2.5 w-2.5 animate-[pulse_0.8s_ease-in-out_0.36s_infinite] rounded-sm bg-primary/40" />
    </div>
  )
}
