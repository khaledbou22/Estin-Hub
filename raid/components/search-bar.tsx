"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  inputId?: string
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className,
  inputId,
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
      <Input
        id={inputId}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-10 rounded-[10px] border border-[#E2E8F0] bg-[#F1F5F9] pl-10 pr-4 text-sm text-[#374151] placeholder:text-[#94A3B8] transition-all duration-150 focus:bg-white focus:border-[#6C63FF] focus-visible:ring-4 focus-visible:ring-[#6C63FF]/10 dark:border-[#2A2A2A] dark:bg-[#151515] dark:text-[#E5E7EB] dark:placeholder:text-[#71717A] dark:focus:bg-[#101010]"
      />
    </div>
  )
}
