import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, FileText, Wrench, Star, TrendingUp } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  gradient: string;
  iconBg: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Active Students",
    sublabel: "and growing daily",
    gradient: "linear-gradient(135deg, hsl(217 91% 55%), hsl(228 83% 65%))",
    iconBg: "hsl(213 100% 94%)",
  },
  {
    icon: FileText,
    value: 500,
    suffix: "+",
    label: "Posts Published",
    sublabel: "across all categories",
    gradient: "linear-gradient(135deg, hsl(158 64% 42%), hsl(168 74% 50%))",
    iconBg: "hsl(152 60% 94%)",
  },
  {
    icon: Wrench,
    value: 100,
    suffix: "+",
    label: "Services Listed",
    sublabel: "tutoring, repairs & more",
    gradient: "linear-gradient(135deg, hsl(38 92% 50%), hsl(48 96% 56%))",
    iconBg: "hsl(45 100% 94%)",
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    sublabel: "from student reviews",
    gradient: "linear-gradient(135deg, hsl(346 84% 55%), hsl(356 90% 62%))",
    iconBg: "hsl(350 100% 95%)",
  },
];

function useCounter(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return count;
}

function StatCard({ stat, started, index }: { stat: StatItem; started: boolean; index: number }) {
  const count = useCounter(stat.value, started, 1600 + index * 100);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative rounded-2xl border border-border/50 bg-card/95 backdrop-blur-[2px] p-7 overflow-hidden cursor-default card-premium"
      style={{ boxShadow: "var(--shadow-md), inset 0 1px 0 hsl(0 0% 100% / 0.55)" }}
    >
      {/* Hover background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${stat.iconBg} 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{
          background: stat.gradient,
          boxShadow: "0 6px 16px -4px rgba(0,0,0,0.15)",
        }}
      >
        <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
      </div>

      {/* Number */}
      <div className="relative mb-1">
        <span
          className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-none tabular-nums"
          style={{
            background: stat.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}
          {stat.suffix}
        </span>
      </div>

      <p className="text-base font-bold text-foreground mb-1">{stat.label}</p>
      <p className="text-xs text-muted-foreground">{stat.sublabel}</p>

      {/* Trend indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-1 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <TrendingUp className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold">Growing</span>
      </div>
    </motion.div>
  );
}

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 lg:py-32 relative overflow-hidden bg-background">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, hsl(217 91% 55% / 0.04) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 dot-pattern opacity-[0.25]" />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-label mb-5 inline-flex">By the numbers</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-5">
            Trusted by ESTIN students
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-normal">
            A growing community already replacing email chaos with structured collaboration.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} started={isInView} index={i} />
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div
            className="relative rounded-2xl p-8 text-center overflow-hidden"
            style={{
              background: "hsl(0 0% 100% / 0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid hsl(var(--border) / 0.8)",
              boxShadow: "var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
            }}
          >
            {/* Quote mark */}
            <div
              className="absolute -top-3 left-8 text-6xl font-serif leading-none select-none"
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.3,
              }}
            >
              "
            </div>

            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-foreground font-medium text-base leading-relaxed mb-4 italic">
              "Finally, a platform where I can find a study partner, sell my old textbooks,
              and coordinate a carpool — all without spamming the whole class group."
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                CS
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                2nd year CS student, ESTIN
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
