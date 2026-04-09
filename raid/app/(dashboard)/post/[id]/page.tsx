import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Mail,
  MapPin,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CategoryBadge } from "@/components/category-badge"
import { UserAvatar } from "@/components/user-avatar"
import { posts } from "@/lib/mock-data"

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params
  const post = posts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatPrice = (price?: number) => {
    if (!price) return null
    return `${price.toLocaleString()} DZD`
  }

  const postEmailHref = `mailto:${post.author.email}?subject=${encodeURIComponent(`Regarding: ${post.title}`)}`

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
        <Link href={`/${post.category}`}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>

      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div>
              <CategoryBadge category={post.category} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#0F172A]">
              {post.title}
            </h1>
          </div>
          {post.price !== undefined && (
            <div className="text-right flex-shrink-0">
              <p className="text-3xl font-bold text-[#0F172A]">
                {formatPrice(post.price)}
              </p>
              {post.category === "transport" && (
                <p className="text-sm text-muted-foreground mt-1">per seat</p>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{formatDate(post.createdAt)}</span>
          <span className="text-border">/</span>
          <span>Posted by {post.author.name}</span>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="border border-[#E8ECEF] bg-white shadow-sm">
        <CardContent className="space-y-7 pt-7">
          {post.category === "marketplace" && post.images && post.images.length > 0 && (
            <div className="space-y-3">
              <img
                src={post.images[0]}
                alt={`${post.title} main`}
                className="h-72 w-full rounded-xl border border-[#E8ECEF] object-cover"
              />
              {post.images.length > 1 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {post.images.slice(1).map((image, idx) => (
                    <img
                      key={image + idx}
                      src={image}
                      alt={`${post.title} ${idx + 2}`}
                      className="h-28 w-full rounded-lg border border-[#E8ECEF] object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Description
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {post.description}
            </p>
          </div>

          <Separator className="bg-[#E8ECEF]" />

          {/* Details Section */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              Details
            </h2>
            
            <div className="space-y-4">
              {post.category === "services" && post.serviceType && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground min-w-32">Service Type</span>
                  <span className="text-foreground font-medium">{post.serviceType}</span>
                </div>
              )}

              {post.category === "marketplace" && post.condition && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground min-w-32">Condition</span>
                  <span className="text-foreground font-medium capitalize">{post.condition}</span>
                </div>
              )}

              {post.category === "transport" && (
                <>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{post.fromCity} → {post.toCity}</span>
                  </div>
                  {post.date && (
                    <div className="flex items-center gap-4">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{formatDate(post.date)}</span>
                    </div>
                  )}
                  {post.time && (
                    <div className="flex items-center gap-4">
                      <Clock3 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{post.time}</span>
                    </div>
                  )}
                  {post.seatsAvailable !== undefined && (
                    <div className="flex items-center gap-4">
                      <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{post.seatsAvailable} seats available</span>
                    </div>
                  )}
                </>
              )}

              {post.category === "lost-found" && (
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground min-w-32">Status</span>
                    <span className={`font-semibold ${
                      post.lostFoundType === "lost"
                        ? "text-destructive"
                        : "text-accent"
                    }`}>
                      {post.lostFoundType === "lost" ? "LOST" : "FOUND"}
                    </span>
                  </div>
                  {post.location && (
                    <div className="flex items-center gap-4">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{post.location}</span>
                    </div>
                  )}
                  {post.date && (
                    <div className="flex items-center gap-4">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{formatDate(post.date)}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <Separator className="bg-[#E8ECEF]" />

          {/* Author Section */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              Posted by
            </h2>
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
              <Link href={`/profile/${post.author.id}`} className="flex items-center gap-4 hover:opacity-90">
                <UserAvatar user={post.author} className="h-12 w-12" />
                <div>
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.author.email}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <Separator className="bg-[#E8ECEF]" />

          {/* Actions */}
          <div className="pt-2">
            <Button asChild className="h-11 w-full gap-2 bg-[#6C63FF] text-white hover:bg-[#4338CA]">
              <Link href={postEmailHref}>
                <Mail className="h-4 w-4" />
                Send Email
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
