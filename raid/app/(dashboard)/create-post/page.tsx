import { PlusCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CreatePostForm } from "@/components/create-post-form"

export default function CreatePostPage() {
  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <PlusCircle className="h-5 w-5" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Create Post</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-xl">
            Share your service, item, ride, or lost & found report with the student community
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardContent className="pt-8">
            <CreatePostForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
