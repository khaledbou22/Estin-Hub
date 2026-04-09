"use client"

import { useEffect, useState } from "react"
import { Briefcase, Car, FileText, MessageSquareText, Search, Settings, ShoppingBag, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable, PostsTable } from "@/components/admin-table"
import { posts, users, stats } from "@/lib/mock-data"
import { getFeedback, subscribeFeedback, type FeedbackItem } from "@/lib/feedback-store"

const statCards = [
  {
    title: "Total Users",
    value: stats.totalUsers,
    icon: Users,
  },
  {
    title: "Total Posts",
    value: stats.totalPosts,
    icon: FileText,
  },
  {
    title: "Services",
    value: stats.postsByCategory.services,
    icon: Briefcase,
  },
  {
    title: "Marketplace",
    value: stats.postsByCategory.marketplace,
    icon: ShoppingBag,
  },
  {
    title: "Transport",
    value: stats.postsByCategory.transport,
    icon: Car,
  },
  {
    title: "Lost & Found",
    value: stats.postsByCategory["lost-found"],
    icon: Search,
  },
]

export default function AdminPage() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])

  useEffect(() => {
    const sync = () => setFeedbackItems(getFeedback())
    sync()
    return subscribeFeedback(sync)
  }, [])

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Settings className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Manage users, moderate content, and monitor platform activity
        </p>
      </div>

      {/* Stats Grid - Minimal Cards */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          Platform Statistics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-border/40 bg-card/50 backdrop-blur hover:bg-card transition-premium">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Management Tabs */}
      <div>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="users" className="gap-2 text-sm">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2 text-sm">
              <MessageSquareText className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-8">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">User Management</CardTitle>
                <CardDescription>
                  Monitor and manage all registered users on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersTable users={users} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="mt-8">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Post Moderation</CardTitle>
                <CardDescription>
                  Review and manage all user-posted content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PostsTable posts={posts} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-8">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">User Feedback</CardTitle>
                <CardDescription>
                  Suggestions and reports submitted by users
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedbackItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No feedback submitted yet.</p>
                ) : (
                  <div className="space-y-3">
                    {feedbackItems.map((item) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full bg-muted px-2 py-1 uppercase">{item.category}</span>
                          <span>Rating: {item.rating}/5</span>
                          <span>{new Date(item.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-sm">{item.message}</p>
                        {item.contact && (
                          <p className="mt-2 text-xs text-muted-foreground">Contact: {item.contact}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
