import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Mail, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Multi-layer background */}
      <div className="absolute inset-0 hero-gradient" />
      <div
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          background:
            "linear-gradient(135deg, hsl(217 91% 55% / 0.06) 0%, transparent 42%, hsl(260 55% 65% / 0.07) 100%)",
        }}
      />
      <div className="absolute inset-0 dot-pattern opacity-[0.28]" />

      {/* Top glow — blue → soft violet */}
      <div
        className="absolute top-0 inset-x-0 h-[min(80vh,720px)] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% -15%, hsl(217 91% 55% / 0.16) 0%, hsl(260 50% 70% / 0.06) 45%, transparent 72%)",
        }}
      />

      {/* Floating blurred “UI” shapes (depth) */}
      <motion.div
        aria-hidden
        className="absolute top-[22%] right-[8%] w-44 h-32 rounded-3xl pointer-events-none opacity-40 hidden lg:block"
        style={{
          background: "linear-gradient(145deg, hsl(217 91% 55% / 0.25), hsl(260 60% 75% / 0.15))",
          filter: "blur(2px)",
          boxShadow: "0 24px 80px -20px hsl(217 91% 55% / 0.35)",
        }}
        animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[28%] left-[6%] w-36 h-28 rounded-2xl pointer-events-none opacity-35 hidden lg:block"
        style={{
          background: "linear-gradient(135deg, hsl(228 83% 65% / 0.2), hsl(217 91% 55% / 0.12))",
          filter: "blur(1px)",
        }}
        animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-[15%] -left-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(217 91% 60% / 0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] -right-48 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(260 55% 68% / 0.12) 0%, hsl(228 83% 65% / 0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(hsl(217 91% 30%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 30%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-28 lg:py-36">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-7"
          >
            <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary-light/60 text-primary text-xs font-semibold tracking-wide backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <Sparkles className="w-3 h-3" />
              ESTIN Student Hub · Beta
              <span className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(ellipse at center, hsl(217 91% 55% / 0.06) 0%, transparent 70%)" }}
              />
            </div>
          </motion.div>

          {/* Headline + glow */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="relative mb-7">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,680px)] h-[140%] pointer-events-none -z-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(217 91% 55% / 0.14) 0%, hsl(260 55% 72% / 0.08) 40%, transparent 68%)",
                filter: "blur(28px)",
              }}
            />
            <h1 className="relative z-10 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-foreground">
              Organize Student Life{" "}
              <br className="hidden sm:block" />
              at{" "}
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ESTIN
                </span>
                <span
                  className="absolute -inset-4 blur-3xl opacity-50 z-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(217 91% 55% / 0.5), hsl(260 60% 70% / 0.35))",
                  }}
                />
              </span>
              {" "}in One Platform
            </h1>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6 font-normal"
          >
            Tired of cluttered university email chains? ESTIN Student Hub replaces
            endless threads with a structured space for{" "}
            <span className="text-foreground font-medium">services, marketplace, transport,</span> and{" "}
            <span className="text-foreground font-medium">lost &amp; found</span>.
          </motion.p>

          {/* Problem pill */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border/50 bg-card/70 text-sm text-muted-foreground backdrop-blur-md shadow-[var(--shadow-md)]">
              <Mail className="w-4 h-4 text-destructive/70" />
              <span>No more email spam</span>
              <span className="w-px h-4 bg-border" />
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Structured student interactions</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <Button
                size="lg"
                className="btn-primary h-13 px-9 text-base font-semibold rounded-xl bg-gradient-primary text-primary-foreground border-0 shadow-blue-lg group relative overflow-hidden hover:brightness-110"
                style={{
                  height: "52px",
                  boxShadow: "0 8px 28px -4px hsl(217 91% 55% / 0.45), 0 0 0 1px hsl(0 0% 100% / 0.12) inset",
                }}
                onClick={() => navigate("/signup")}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <Zap className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-200 relative" />
                <span className="relative">Get Started Free</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 relative" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 24 }}>
              <Button
                variant="outline"
                size="lg"
                className="h-13 px-9 text-base font-semibold rounded-xl border border-border/60 bg-background/80 backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:bg-primary/[0.04] hover:shadow-[var(--shadow-md)] hover:text-foreground"
                style={{ height: "52px" }}
                onClick={() => navigate("/login")}
              >
                Explore Platform
              </Button>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {["AB", "SM", "KL", "FD"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-primary-foreground"
                    style={{
                      background: `hsl(${217 + i * 10} 91% ${55 + i * 5}%)`,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="ml-1"><strong className="text-foreground font-semibold">200+</strong> students joined</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <span>Free forever for ESTIN students</span>
          </motion.div>
        </div>

        {/* Dashboard Preview Card */}
        <motion.div
          style={{ y: dashboardY }}
          initial={{ opacity: 0, y: 72, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Multi-layer glow behind card */}
            <div
              className="absolute -inset-px rounded-3xl"
              style={{
                background: "var(--gradient-primary)",
                filter: "blur(32px)",
                opacity: 0.18,
              }}
            />
            <div
              className="absolute -inset-8 rounded-3xl"
              style={{
                background: "var(--gradient-primary)",
                filter: "blur(80px)",
                opacity: 0.08,
              }}
            />

            {/* Card border glow */}
            <div
              className="relative rounded-2xl p-px"
              style={{
                background: "linear-gradient(135deg, hsl(217 91% 55% / 0.3), hsl(0 0% 100% / 0.1), hsl(228 83% 65% / 0.2))",
              }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-border/25 bg-background/98 backdrop-blur-sm shadow-[var(--shadow-premium)]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3.5 bg-surface-1 border-b border-border/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400 opacity-90" />
                    <div className="w-3 h-3 rounded-full bg-amber-400 opacity-90" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400 opacity-90" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="mx-auto max-w-xs h-6 rounded-lg bg-surface-2 flex items-center px-3 gap-2 border border-border/40">
                      <div className="w-2 h-2 rounded-full bg-primary/50" />
                      <span className="text-[10px] text-muted-foreground/60 font-medium">estinhub.dz</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-md bg-surface-2 flex items-center justify-center border border-border/40">
                      <div className="w-3 h-2 rounded-sm bg-muted-foreground/30" />
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6 bg-background">
                  {/* Top stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Services",    count: "48",  change: "+12%", color: "text-primary",      bg: "bg-primary/8",      icon: "🔧" },
                      { label: "Marketplace", count: "124", change: "+8%",  color: "text-emerald-600",  bg: "bg-emerald-50",     icon: "🛍️" },
                      { label: "Transport",   count: "31",  change: "+5%",  color: "text-amber-600",    bg: "bg-amber-50",       icon: "🚗" },
                      { label: "Lost & Found",count: "27",  change: "+3%",  color: "text-rose-600",     bg: "bg-rose-50",        icon: "🔍" },
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.03, y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="rounded-xl border border-border/60 p-3.5 flex flex-col gap-1 bg-card/95 shadow-sm hover:shadow-[var(--shadow-lg)] transition-shadow duration-300 group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-semibold ${item.color}`}>{item.label}</span>
                          <span className="text-base">{item.icon}</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground leading-none">{item.count}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-emerald-600 font-medium">{item.change}</span>
                          <span className="text-[10px] text-muted-foreground">this week</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent posts */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-foreground">Recent Posts</span>
                      <span className="text-[10px] text-primary font-medium cursor-pointer hover:underline">View all →</span>
                    </div>
                    {[
                      { badge: "Service",     title: "Math tutoring — Algebra & Calculus",  user: "Ahmed B.",  time: "2h ago",  color: "bg-primary/10 text-primary",            dot: "bg-primary" },
                      { badge: "Marketplace", title: "HP laptop 15\" — 35,000 DA",          user: "Sara M.",   time: "4h ago",  color: "bg-emerald-100 text-emerald-700",        dot: "bg-emerald-500" },
                      { badge: "Transport",   title: "Daily ride: ESTIN → Amizour",          user: "Karim L.",  time: "1d ago",  color: "bg-amber-100 text-amber-700",            dot: "bg-amber-500" },
                    ].map((post, i) => (
                      <motion.div
                        key={post.title}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/60 hover:bg-surface-1 hover:border-border transition-all duration-200 cursor-default group"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${post.dot}`} />
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${post.color}`}>
                          {post.badge}
                        </span>
                        <span className="text-sm font-medium text-foreground flex-1 truncate group-hover:text-primary transition-colors">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:block">{post.user}</span>
                        <span className="text-xs text-muted-foreground/60 flex-shrink-0">{post.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
