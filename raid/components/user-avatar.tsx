import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { User } from "@/lib/mock-data"

interface UserAvatarProps {
  user: User
  className?: string
  showName?: boolean
}

export function UserAvatar({ user, className, showName = false }: UserAvatarProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-2">
      <Avatar className={cn("h-8 w-8", className)}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-gradient-to-br from-[#6C63FF] to-[#4338CA] text-white text-[13px] font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-[13px] font-medium text-[#374151]">{user.name}</span>
      )}
    </div>
  )
}
