"use client"

import { useState } from "react"
import { KeyRound, MoonStar, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getCurrentPassword, setCurrentPassword } from "@/lib/profile-store"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleUpdate = () => {
    setError("")
    setMessage("")
    if (oldPassword !== getCurrentPassword()) return setError("Current password is incorrect.")
    if (newPassword.length < 6) return setError("New password must be at least 6 characters.")
    if (newPassword !== confirmPassword) return setError("Confirmation does not match.")
    setCurrentPassword(newPassword)
    setMessage("Password updated successfully.")
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>

      <Card className="border-[#E8ECEF]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MoonStar className="h-4 w-4" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card className="border-[#E8ECEF]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current Password</Label>
            <Input id="oldPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <Button onClick={handleUpdate} className="gap-2">
            <KeyRound className="h-4 w-4" />
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
