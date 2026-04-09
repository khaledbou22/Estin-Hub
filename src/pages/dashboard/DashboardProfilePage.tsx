import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Edit,
  Github,
  Globe,
  Instagram,
  Key,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/dashboard/PostCard";
import { currentUser, posts } from "@/lib/mock-data";
import { getSavedPostIds, onSavedPostsUpdated } from "@/lib/saved-posts";
import {
  loadCurrentUserProfile,
  mergeUserWithEditableProfile,
  saveCurrentUserProfile,
  type EditableProfile,
} from "@/lib/profile-store";

export default function DashboardProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);
  const [profile, setProfile] = useState<EditableProfile>(() => loadCurrentUserProfile(currentUser));
  const [draftProfile, setDraftProfile] = useState<EditableProfile>(() => loadCurrentUserProfile(currentUser));
  const [isEditing, setIsEditing] = useState(false);

  const displayUser = useMemo(() => mergeUserWithEditableProfile(currentUser, profile), [profile]);
  const userPosts = posts.filter((post) => post.author.id === currentUser.id);
  const savedPosts = posts.filter((post) => savedPostIds.includes(post.id));

  useEffect(() => {
    const syncSaved = () => setSavedPostIds(getSavedPostIds());
    syncSaved();
    return onSavedPostsUpdated(syncSaved);
  }, []);

  const initials = displayUser.name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraftProfile((prev) => ({ ...prev, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setProfile(draftProfile);
    saveCurrentUserProfile(draftProfile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="space-y-3">
              <div className="relative w-fit">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={isEditing ? draftProfile.avatar : displayUser.avatar} alt={displayUser.name} />
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <>
                    <input id="profileAvatar" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    <Label
                      htmlFor="profileAvatar"
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#6C63FF] text-white shadow-md hover:bg-[#4338CA]"
                    >
                      <Camera className="h-4 w-4" />
                    </Label>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold">{displayUser.name}</h1>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>{displayUser.email}</span></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>{displayUser.phone || "No phone"}</span></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{displayUser.city || "No city"}</span></div>
                <div className="flex items-center gap-2"><User className="h-4 w-4" /><span>{displayUser.studyYear || "Study year not set"}</span></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Member since {new Date(displayUser.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" className="gap-2" onClick={() => { setDraftProfile(profile); setIsEditing(true); }}>
                  <Edit className="h-4 w-4" /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => { setDraftProfile(profile); setIsEditing(false); }}>Cancel</Button>
                  <Button className="gap-2" onClick={handleSaveProfile}><Edit className="h-4 w-4" /> Save Profile</Button>
                </>
              )}
            </div>
          </div>

          {!isEditing ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-[#E8ECEF]">
                  <CardHeader className="pb-3"><CardTitle className="text-base">Bio</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{displayUser.bio || "No bio yet."}</p></CardContent>
                </Card>
                <Card className="border-[#E8ECEF]">
                  <CardHeader className="pb-3"><CardTitle className="text-base">Professional Info</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">Skills:</span> {(displayUser.skills ?? []).join(", ") || "Not set"}</p>
                    <p><span className="font-medium text-foreground">Contact preference:</span> {displayUser.contactPreference ?? "Not set"}</p>
                    <p><span className="font-medium text-foreground">Study year:</span> {displayUser.studyYear || "Not set"}</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-[#E8ECEF]">
                <CardHeader className="pb-3"><CardTitle className="text-base">Social Links</CardTitle></CardHeader>
                <CardContent className="grid gap-3 text-sm md:grid-cols-2">
                  {[
                    { label: "LinkedIn", icon: <Linkedin className="h-4 w-4 text-[#0A66C2]" />, value: displayUser.socialLinks?.linkedin },
                    { label: "GitHub", icon: <Github className="h-4 w-4" />, value: displayUser.socialLinks?.github },
                    { label: "Instagram", icon: <Instagram className="h-4 w-4 text-[#E1306C]" />, value: displayUser.socialLinks?.instagram },
                    { label: "X", icon: <span className="font-semibold">𝕏</span>, value: displayUser.socialLinks?.x },
                  ].map((item) => {
                    const username = item.value?.split("/").filter(Boolean).pop() ?? "Not set";
                    return (
                      <div key={item.label} className="group rounded-lg border border-[#E8ECEF] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                        <p className="mb-1 flex items-center gap-2 font-medium text-foreground">{item.icon}{item.label}</p>
                        <p className="truncate text-muted-foreground">{username}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={draftProfile.bio} onChange={(e) => setDraftProfile((p) => ({ ...p, bio: e.target.value }))} rows={4} placeholder="Tell people about yourself..." />
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Input id="skills" value={draftProfile.skills} onChange={(e) => setDraftProfile((p) => ({ ...p, skills: e.target.value }))} placeholder="React, UI/UX, Marketing" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={draftProfile.city} onChange={(e) => setDraftProfile((p) => ({ ...p, city: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studyYear">Study Year</Label>
                      <Input id="studyYear" value={draftProfile.studyYear} onChange={(e) => setDraftProfile((p) => ({ ...p, studyYear: e.target.value }))} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                {(["linkedin", "github", "instagram", "x"] as const).map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    <Input id={field} value={draftProfile[field]} onChange={(e) => setDraftProfile((p) => ({ ...p, [field]: e.target.value }))} />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="posts">My Posts ({userPosts.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedPosts.length})</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          {userPosts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No posts yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">You haven't created any posts yet</p>
                <Button className="mt-4" asChild>
                  <Link to="/dashboard/create-post">Create Your First Post</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userPosts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          {savedPosts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                  <Key className="h-7 w-7 text-[#6C63FF]" />
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#16A34A]" />
                </div>
                <h3 className="text-lg font-semibold">Nothing saved yet</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">Save posts you like and they will appear here for quick access.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedPosts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Account updated</p>
                    <p className="text-sm text-muted-foreground">Your profile information is personalized.</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
