import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Box, Briefcase, Car, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from "@/components/dashboard/PostCard";
import { posts, currentUser } from "@/lib/mock-data";
import ServicesPage from "./ServicesPage";
import MarketplacePage from "./MarketplacePage";
import TransportPage from "./TransportPage";
import LostFoundPage from "./LostFoundPage";
import DashboardProfilePage from "./DashboardProfilePage";
import CreatePostPage from "./CreatePostPage";
import FeedbackPage from "./FeedbackPage";

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return { count, start };
}

// ── Stats card with count-up ───────────────────────────────────────────────────
function StatCard({
  card,
  index,
}: {
  card: (typeof statsCards)[number];
  index: number;
}) {
  const { count, start } = useCountUp(card.count, card.count > 200 ? 1200 : 800);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      onViewportEnter={start}
      viewport={{ once: true }}
    >
      <Link to={card.href}>
        <Card className="flex h-full flex-col gap-0 rounded-[14px] border border-[#E8ECEF] bg-white p-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(108,99,255,0.12)] dark:border-[#2A2A2A] dark:bg-[#101010]">
          <CardHeader className="px-6 pb-0 pt-5">
            <div className="mb-3 flex items-center justify-between">
              <CardTitle className="text-[13px] font-medium text-[#64748B] dark:text-[#A1A1AA]">
                {card.title}
              </CardTitle>
              <div className={`flex h-9 w-9 items-center justify-center rounded-[8px] ${card.iconBg}`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-4 pt-0">
            <p className="mb-2 text-[32px] font-extrabold leading-none text-[#0F172A] dark:text-[#F8FAFC]">
              {count}
            </p>
            <CardDescription className="flex items-center gap-1 text-[12px] font-medium text-[#22C55E]">
              <TrendingUp className="h-3 w-3" />
              {card.growth}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

const statsCards = [
  {
    title: "Active Services",
    icon: TrendingUp,
    href: "/dashboard/services",
    count: 248,
    growth: "+12% from last week",
    iconColor: "text-[#6C63FF]",
    iconBg: "bg-[#EEF2FF]",
  },
  {
    title: "Marketplace Items",
    icon: Box,
    href: "/dashboard/marketplace",
    count: 532,
    growth: "+8% from last week",
    iconColor: "text-[#16A34A]",
    iconBg: "bg-[#F0FDF4]",
  },
  {
    title: "Active Rides",
    icon: Users,
    href: "/dashboard/transport",
    count: 89,
    growth: "+23% from last week",
    iconColor: "text-[#EA580C]",
    iconBg: "bg-[#FFF7ED]",
  },
];

// ── Section header with "View all →" arrow animation ──────────────────────────
function SectionHeader({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      className="mb-4 flex items-center justify-between pb-0"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h3 className="flex items-center gap-2 text-[17px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
        {icon}
        {title}
      </h3>
      <Link
        to={href}
        className="group/viewall cursor-pointer text-[13px] font-medium text-[#6C63FF] transition-colors duration-150 hover:underline"
      >
        View all{" "}
        <span
          className="inline-block transition-transform duration-200 group-hover/viewall:translate-x-[3px]"
        >
          <ArrowRight className="ml-0.5 inline h-3.5 w-3.5" />
        </span>
      </Link>
    </motion.div>
  );
}

// ── Animated post card wrapper ─────────────────────────────────────────────────
function AnimatedPostCard({ post, index }: { post: (typeof posts)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: 0.2 + index * 0.07, ease: "easeOut" }}
    >
      <PostCard post={post} />
    </motion.div>
  );
}

// ── Dashboard home ─────────────────────────────────────────────────────────────
function DashboardHome() {
  const servicePosts = posts.filter((p) => p.category === "services").slice(0, 3);
  const marketplacePosts = posts.filter((p) => p.category === "marketplace").slice(0, 3);
  const transportPosts = posts.filter((p) => p.category === "transport").slice(0, 3);

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("estin_user") || "{}") as { name?: string };
    } catch {
      return {};
    }
  })();
  const displayName = storedUser.name || currentUser.name;
  const getFirstName = (name: string) => name.split(" ")[0];

  return (
    <div>
      {/* Welcome text */}
      <motion.div
        className="mb-9 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-[32px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
          Welcome back, {getFirstName(displayName)}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] font-normal text-[#64748B] dark:text-[#9CA3AF]">
          Explore student posts, buy and sell items, coordinate transport, and find lost or found
          items all in one place.
        </p>
      </motion.div>

      {/* Stats cards */}
      <div className="mb-9">
        <motion.h2
          className="mb-5 text-[20px] font-bold text-[#0F172A] dark:text-[#F8FAFC]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        >
          Browse Categories
        </motion.h2>
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {statsCards.map((card, i) => (
            <StatCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Sections */}
      <div>
        <motion.section
          className="mb-9"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SectionHeader
            title="Services"
            href="/dashboard/services"
            icon={<Briefcase className="h-4 w-4 text-[#6C63FF]" />}
          />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {servicePosts.map((post, i) => (
              <AnimatedPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-9"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SectionHeader
            title="Marketplace"
            href="/dashboard/marketplace"
            icon={<ShoppingBag className="h-4 w-4 text-[#16A34A]" />}
          />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {marketplacePosts.map((post, i) => (
              <AnimatedPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-9"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SectionHeader
            title="Transport"
            href="/dashboard/transport"
            icon={<Car className="h-4 w-4 text-[#EA580C]" />}
          />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {transportPosts.map((post, i) => (
              <AnimatedPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="marketplace" element={<MarketplacePage />} />
      <Route path="transport" element={<TransportPage />} />
      <Route path="lost-found" element={<LostFoundPage />} />
      <Route path="profile" element={<DashboardProfilePage />} />
      <Route path="create-post" element={<CreatePostPage />} />
      <Route path="feedback" element={<FeedbackPage />} />
    </Routes>
  );
}
