import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, Users, MessageCircle, Eye, Bookmark, Mail, Phone } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "@/components/category-badge"
import { UserAvatar } from "@/components/user-avatar"
import type { Post } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { isPostSaved, toggleSavedPost } from "@/lib/saved-posts"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [saved, setSaved] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    setSaved(isPostSaved(post.id))
  }, [post.id])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatPrice = (price?: number) => {
    if (!price) return null
    return `${price.toLocaleString()} DZD`
  }

  const conditionDot: Record<string, string> = {
    new: "bg-[#22C55E]",
    "like-new": "bg-[#22C55E]",
    good: "bg-[#F59E0B]",
    fair: "bg-[#94A3B8]",
  }

  const conditionLabel = (condition?: string) => {
    if (!condition) return "N/A"
    return condition.charAt(0).toUpperCase() + condition.slice(1)
  }

  const cardHoverClass =
    post.category === "services"
      ? "hover:shadow-[0_6px_20px_rgba(108,99,255,0.12)]"
      : post.category === "marketplace"
        ? "hover:shadow-[0_6px_20px_rgba(22,163,74,0.1)]"
        : "hover:shadow-[0_6px_20px_rgba(234,88,12,0.1)]"

  const priceClass =
    post.category === "services"
      ? "text-[#6C63FF]"
      : post.category === "marketplace"
        ? "text-[#16A34A]"
        : "text-[#EA580C]"

  const secondaryActionLabel = post.category === "transport" ? "Reserve" : "Contact"
  const secondaryActionClass =
    post.category === "transport"
      ? "bg-[#EA580C] hover:bg-[#C2410C] text-white"
      : post.category === "marketplace"
        ? "bg-[#16A34A] hover:opacity-90 text-white"
        : "bg-[#6C63FF] hover:opacity-90 text-white"

  return (
    <Card
      className={`group flex h-full flex-col gap-0 rounded-[14px] border border-[#E8ECEF] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 dark:border-[#2A2A2A] dark:bg-[#101010] ${cardHoverClass}`}
    >
      <CardHeader className="px-5 pb-0 pt-[18px]">
        <div className="mb-[10px] flex items-center justify-between">
          <CategoryBadge category={post.category} />
          <div className="flex items-center gap-2">
            {post.price !== undefined && (
              <span className={`text-[15px] font-bold tabular-nums ${priceClass}`}>
                {formatPrice(post.price)}
              </span>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSaved(toggleSavedPost(post.id))}
              className={`h-7 rounded-[7px] px-2.5 text-[11px] font-semibold ${
                saved ? "border-[#6C63FF] text-[#6C63FF] bg-[#EEF2FF]" : "border-[#E2E8F0] text-[#64748B] bg-white"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
              Save
            </Button>
          </div>
        </div>
        <CardTitle className="mb-[6px] text-[15px] font-semibold leading-[1.3] text-[#0F172A] line-clamp-2 dark:text-[#F8FAFC]">
          {post.title}
        </CardTitle>
        <CardDescription className="mb-[8px] text-[13px] font-normal leading-[1.5] text-[#64748B] line-clamp-2 dark:text-[#A1A1AA]">
          {post.description}
        </CardDescription>
        {post.category === "marketplace" && post.images?.[0] && (
          <div className="mb-2 overflow-hidden rounded-lg border border-[#E8ECEF] dark:border-[#2A2A2A]">
            <img
              src={post.images[0]}
              alt={post.title}
              className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
        {post.category === "marketplace" && !post.images?.[0] && (
          <div className="mb-2 flex h-36 items-center justify-center rounded-lg border border-dashed border-[#E8ECEF] bg-[#F8F9FC] text-xs text-[#94A3B8] dark:border-[#2A2A2A] dark:bg-[#151515]">
            No image available
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 px-5 pb-0 pt-0">
        <div className="mb-[12px] text-[12px] text-[#94A3B8]">
          {post.category === "transport" && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#374151]">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#EA580C]" />
                <span className="truncate font-medium">
                  {post.fromCity} → {post.toCity}
                </span>
              </div>
              {post.date && (
                <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
                  <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>
                    {formatDate(post.date)}
                    {post.time ? ` at ${post.time}` : ""}
                  </span>
                </div>
              )}
              {post.seatsAvailable !== undefined && (
                <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
                  <Users className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{post.seatsAvailable} seats</span>
                </div>
              )}
            </div>
          )}
          {post.category === "marketplace" && post.condition && (
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${conditionDot[post.condition]}`} />
              <p>
                Condition: {conditionLabel(post.condition)}
              </p>
            </div>
          )}
          {post.category === "services" && (
            <p>
              Type: {post.serviceType ?? "Service"}
            </p>
          )}
          {post.category === "lost-found" && (
            <p className="text-lg text-foreground">
              Type: {post.lostFoundType === "lost" ? "Lost Item" : "Found Item"}
            </p>
          )}
        </div>
      </CardContent>

      <div className="mx-5 my-[12px] h-px bg-[#F1F5F9] dark:bg-[#2A2A2A]" />

      <div className="px-5 pb-[18px]">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <Link href={`/profile/${post.author.id}`} className="flex min-w-0 items-center gap-[6px] hover:opacity-90">
            <UserAvatar user={post.author} className="h-[30px] w-[30px]" />
            <span className="truncate text-[13px] font-medium text-[#374151] dark:text-[#E5E7EB]">{post.author.name}</span>
          </Link>
          <span className="shrink-0 text-[11px] text-[#94A3B8]">{formatDate(post.createdAt)}</span>
        </div>
        <div className="grid grid-cols-2 gap-[6px]">
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-[7px] border-[1.5px] border-[#E2E8F0] bg-white px-3 text-[12px] text-[#374151] transition-all duration-150 hover:border-[#6C63FF] hover:text-[#6C63FF] dark:border-[#3A3A3A] dark:bg-[#171717] dark:text-[#E5E7EB]"
            asChild
          >
            <Link href={`/post/${post.id}`}>
              <Eye className="mr-1 h-3 w-3" />
              View
            </Link>
          </Button>
          <Button
            size="sm"
            type="button"
            onClick={() => setContactOpen(true)}
            className={`h-7 rounded-[7px] px-3 text-[12px] transition-all duration-150 ${secondaryActionClass}`}
          >
            <MessageCircle className="mr-1 h-3 w-3" />
            {secondaryActionLabel}
          </Button>
        </div>
      </div>
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="border-[#E8ECEF] sm:max-w-md dark:border-[#2A2A2A] dark:bg-[#101010]">
          <DialogHeader>
            <DialogTitle className="text-[#0F172A] dark:text-[#F8FAFC]">Contact Information</DialogTitle>
            <DialogDescription>
              Reach out to {post.author.name} about this post.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 rounded-lg border border-[#E8ECEF] bg-[#F8F9FC] p-4 dark:border-[#2A2A2A] dark:bg-[#151515]">
            <div className="flex items-center gap-3">
              <UserAvatar user={post.author} className="h-10 w-10" />
              <div>
                <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{post.author.name}</p>
                <p className="text-xs text-[#64748B]">Post owner</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#374151]">
              <Mail className="h-4 w-4 text-[#6C63FF]" />
              <span>{post.author.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#374151]">
              <Phone className="h-4 w-4 text-[#6C63FF]" />
              <span>{post.author.phone ?? "Phone not available"}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
