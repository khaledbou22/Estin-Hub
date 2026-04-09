"use client"

import { useState } from "react"
import { MessageSquareText, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { addFeedback } from "@/lib/feedback-store"

export default function FeedbackPage() {
  const [category, setCategory] = useState<"bug" | "feature" | "ui" | "general">("general")
  const [rating, setRating] = useState(5)
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState("")

  const submit = () => {
    if (!message.trim()) return
    addFeedback({ category, rating, contact: contact.trim() || undefined, message: message.trim() })
    setMessage("")
    setContact("")
    setRating(5)
    setCategory("general")
    setSuccess("Thank you! Your feedback has been sent to the founders.")
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#E8ECEF]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MessageSquareText className="h-5 w-5 text-primary" />
            Send Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="general">General</option>
                <option value="ui">UI/UX</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Math.min(5, Math.max(1, Number(e.target.value) || 1)))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Contact (optional)</Label>
            <Input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or phone for follow-up"
            />
          </div>
          <div className="space-y-2">
            <Label>Your feedback</Label>
            <Textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your ideas, suggestions, or report an issue..."
            />
          </div>
          {success && <p className="text-sm text-green-600">{success}</p>}
          <Button onClick={submit} className="gap-2">
            <Send className="h-4 w-4" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
