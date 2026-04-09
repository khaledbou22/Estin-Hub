import { useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, FileX, Github, Globe, Instagram, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCard } from "@/components/dashboard/PostCard";
import { users, posts } from "@/lib/mock-data";

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const user = users.find((u) => u.id === id);

  if (!user) return <Navigate to="/dashboard" replace />;

  const userPosts = posts.filter((p) => p.author.id === user.id);

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const socialItems = [
    {
      label: "LinkedIn",
      url: user.socialLinks?.linkedin,
      username: user.socialLinks?.linkedin?.split("/").filter(Boolean).pop(),
      icon: <Linkedin className="h-4 w-4" style={{ color: "#0A66C2" }} />,
      hoverBg: "rgba(10,102,194,0.08)",
    },
    {
      label: "GitHub",
      url: user.socialLinks?.github,
      username: user.socialLinks?.github?.split("/").filter(Boolean).pop(),
      icon: <Github className="h-4 w-4 text-[#24292E] dark:text-white" />,
      hoverBg: "rgba(36,41,46,0.08)",
    },
    {
      label: "Instagram",
      url: user.socialLinks?.instagram,
      username: user.socialLinks?.instagram?.split("/").filter(Boolean).pop(),
      icon: <Instagram className="h-4 w-4" style={{ color: "#E1306C" }} />,
      hoverBg: "rgba(225,48,108,0.08)",
    },
    {
      label: "X",
      url: user.socialLinks?.x,
      username: user.socialLinks?.x?.split("/").filter(Boolean).pop(),
      icon: <span className="text-[14px] font-bold leading-none text-[#000] dark:text-white">𝕏</span>,
      hoverBg: "rgba(0,0,0,0.06)",
    },
  ].filter((s) => s.url && s.username);

  return (
    <div className="mx-auto max-w-[1100px] space-y-7">
      {/* Top card */}
      <div
        className="rounded-2xl border border-[#E8ECEF] bg-white px-8 py-7 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Avatar */}
          <Avatar className="h-20 w-20 shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback className="bg-[#6C63FF] text-2xl font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-[24px] font-bold leading-tight text-[#0F172A] dark:text-[#F8FAFC]">
                {user.name}
              </h1>
              {user.bio && (
                <p className="mt-1 line-clamp-2 text-[14px] italic text-[#64748B] dark:text-[#9CA3AF]">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Info row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {user.email}
              </span>
              {user.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {user.phone}
                </span>
              )}
              {user.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {user.city}
                </span>
              )}
              {user.studyYear && (
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 shrink-0" />
                  {user.studyYear}
                </span>
              )}
            </div>

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#EEF2FF] px-3 py-[3px] text-[12px] font-medium text-[#6C63FF]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Social links */}
            {socialItems.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {socialItems.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => window.open(s.url, "_blank")}
                    className="group/social flex items-center gap-1.5 rounded-lg px-[10px] py-1 text-[13px] font-medium text-[#374151] transition-all duration-200 hover:shadow-sm dark:text-[#CBD5E1]"
                    style={{ "--hover-bg": s.hoverBg } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = s.hoverBg;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }}
                  >
                    {s.icon}
                    <span>@{s.username}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover/social:opacity-100" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Posts section */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-[16px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          <Globe className="h-4 w-4 text-[#6C63FF]" />
          Posts by {user.name}
        </h2>

        {userPosts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-2xl border border-[#E8ECEF] bg-white py-16 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]"
          >
            <FileX className="h-12 w-12 text-[#CBD5E1]" />
            <p className="mt-4 text-[15px] text-[#94A3B8]">No posts yet</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
