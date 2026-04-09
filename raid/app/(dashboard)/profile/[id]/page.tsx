"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowUpRight, Github, Globe, Instagram, Linkedin, Mail, MapPin, Phone, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PostCard } from "@/components/post-card"
import { currentUser, posts, users } from "@/lib/mock-data"
import { loadCurrentUserProfile, mergeUserWithEditableProfile } from "@/lib/profile-store"

export default function PublicProfilePage() {
  const params = useParams<{ id: string }>()
  const user = users.find((candidate) => candidate.id === params.id)

  if (!user) notFound()

  const displayUser =
    user.id === currentUser.id
      ? mergeUserWithEditableProfile(user, loadCurrentUserProfile(user))
      : user

  const userPosts = posts.filter((post) => post.author.id === user.id)
  const initials = displayUser.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <div className="space-y-6">
      <Card className="border border-[#E8ECEF]">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
              <AvatarFallback className="bg-primary text-xl text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">{displayUser.name}</h1>
                <p className="text-sm text-muted-foreground">{displayUser.bio || "No bio yet."}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{displayUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{displayUser.phone ?? "No phone"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{displayUser.city ?? "No city"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{displayUser.studyYear ?? "Study year not set"}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(displayUser.skills ?? []).map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {[
                  { key: "linkedin", label: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, href: displayUser.socialLinks?.linkedin },
                  { key: "github", label: "GitHub", icon: <Github className="h-4 w-4" />, href: displayUser.socialLinks?.github },
                  { key: "instagram", label: "Instagram", icon: <Instagram className="h-4 w-4" />, href: displayUser.socialLinks?.instagram },
                  { key: "x", label: "X", icon: <span className="font-semibold">𝕏</span>, href: displayUser.socialLinks?.x },
                ]
                  .filter((item) => item.href)
                  .map((item) => {
                    const username = item.href?.split("/").filter(Boolean).pop()
                    return (
                      <Link
                        key={item.key}
                        href={item.href!}
                        className="group inline-flex items-center gap-2 rounded-full border border-[#E8ECEF] px-3 py-1.5 text-[#6C63FF] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EEF2FF]"
                      >
                        {item.icon}
                        <span>@{username}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    )
                  })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Posts by {displayUser.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
