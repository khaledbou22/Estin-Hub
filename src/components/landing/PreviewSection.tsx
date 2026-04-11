import { motion, useScroll, useTransform } from "framer-motion";
import { Wrench, ShoppingBag, Car, Search, Plus, Bell, ChevronRight, CheckCircle2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const categories = [
  { label: "Services",     icon: Wrench,      gradientFrom: "hsl(217 91% 55%)", gradientTo: "hsl(228 83% 65%)", count: 48  },
  { label: "Marketplace",  icon: ShoppingBag, gradientFrom: "hsl(158 64% 42%)", gradientTo: "hsl(168 74% 50%)", count: 124 },
  { label: "Transport",    icon: Car,         gradientFrom: "hsl(38 92% 50%)",  gradientTo: "hsl(48 96% 56%)",  count: 31  },
  { label: "Lost & Found", icon: Search,      gradientFrom: "hsl(346 84% 55%)", gradientTo: "hsl(356 90% 62%)", count: 27  },
];

const samplePosts = [
  { category: "Service",     title: "Advanced Maths tutoring", desc: "Algebra, calculus — 500DA/h", user: "AB", gradientFrom: "hsl(217 91% 55%)", gradientTo: "hsl(228 83% 65%)", badgeBg: "hsl(213 100% 95%)", badgeColor: "hsl(217 91% 42%)" },
  { category: "Marketplace", title: "HP ProBook 450 G8",       desc: "35,000DA — great condition",   user: "SM", gradientFrom: "hsl(158 64% 42%)", gradientTo: "hsl(168 74% 50%)", badgeBg: "hsl(152 60% 94%)", badgeColor: "hsl(158 64% 35%)" },
  { category: "Transport",   title: "Daily ride to ESTIN",      desc: "Bejaia center → 7:30AM",       user: "KL", gradientFrom: "hsl(38 92% 50%)",  gradientTo: "hsl(48 96% 56%)",  badgeBg: "hsl(45 100% 94%)", badgeColor: "hsl(38 92% 38%)" },
];

const PreviewSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const mockY = useTransform(scrollYProgress, [0, 1], [24, -28]);
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setHighlightIdx((i) => (i + 1) % samplePosts.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 relative overflow-hidden page-section-muted border-y border-border/30">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label mb-6 inline-flex">Product Preview</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.08]">
              A clean dashboard
              <br />
              for your{" "}
              <span
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                campus life
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-normal">
              Navigate between categories effortlessly. Post, browse, or respond — the
              interface is designed to be fast and intuitive so you can focus on connecting
              with people, not fighting with the UI.
            </p>

            {/* Feature bullets */}
            <div className="space-y-4 mb-10">
              {[
                "Browse posts by category in seconds",
                "Post a listing in under 60 seconds",
                "Contact students directly, no email needed",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Category pills */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.label}
                    whileHover={{ x: 4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm cursor-pointer group shadow-sm hover:shadow-[var(--shadow-lg)]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})` }}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">{cat.count} active posts</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: mock UI with parallax */}
          <motion.div
            style={{ y: mockY }}
            initial={{ opacity: 0, x: 36, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow layers */}
              <div
                className="absolute -inset-2 rounded-3xl"
                style={{ background: "var(--gradient-primary)", filter: "blur(40px)", opacity: 0.12 }}
              />
              <div
                className="absolute -inset-8 rounded-3xl"
                style={{ background: "var(--gradient-primary)", filter: "blur(80px)", opacity: 0.06 }}
              />

              {/* Gradient border */}
              <div
                className="relative rounded-2xl p-px"
                style={{ background: "linear-gradient(135deg, hsl(217 91% 55% / 0.35), hsl(0 0% 100% / 0.1), hsl(228 83% 65% / 0.25))" }}
              >
                <div
                  className="relative rounded-2xl border border-border/25 overflow-hidden bg-card/95 backdrop-blur-[2px]"
                  style={{ boxShadow: "var(--shadow-premium)" }}
                >
                  {/* App header */}
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/60 bg-surface-1">
                    <div className="flex items-center gap-2.5">
                      <img src="/logo.png" alt="Estin Hub" className="w-8 h-8 rounded-xl object-contain" />
                      <span className="text-sm font-bold text-foreground">ESTIN Hub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full bg-surface-2 border border-border/40 flex items-center justify-center">
                        <Bell className="w-3.5 h-3.5 text-muted-foreground" />
                        <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-primary border border-background" />
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: "var(--gradient-primary)" }}
                      >
                        AK
                      </div>
                    </div>
                  </div>

                  {/* Category tabs */}
                  <div className="flex gap-1.5 px-4 pt-3.5 pb-2.5 overflow-x-auto border-b border-border/40">
                    {categories.map((cat, i) => {
                      const Icon = cat.icon;
                      return (
                        <div
                          key={cat.label}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors cursor-pointer ${
                            i === 0 ? "text-white" : "bg-surface-2 text-muted-foreground hover:bg-muted"
                          }`}
                          style={i === 0 ? { background: `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})` } : {}}
                        >
                          <Icon size={11} />
                          {cat.label}
                          {i === 0 && (
                            <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-[9px] font-bold">{cat.count}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Post cards — rotating highlight */}
                  <div className="px-4 pt-3 pb-4 space-y-2.5">
                    {samplePosts.map((post, i) => (
                      <motion.div
                        key={post.title}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        animate={
                          highlightIdx === i
                            ? { scale: 1.01 }
                            : { scale: 1 }
                        }
                        className={`rounded-xl border p-3.5 transition-all duration-500 cursor-pointer group ${
                          highlightIdx === i
                            ? "border-primary/35 bg-primary/[0.04] shadow-[var(--shadow-md)] ring-1 ring-primary/20"
                            : "border-border/60 hover:bg-surface-1 hover:border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})` }}
                          >
                            {post.user}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span
                                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                                style={{ background: post.badgeBg, color: post.badgeColor }}
                              >
                                {post.category}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{post.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{post.desc}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* FAB */}
                  <div className="px-4 pb-4 flex justify-end">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
                      style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-blue)" }}
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
