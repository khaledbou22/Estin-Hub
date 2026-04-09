import { motion } from "framer-motion";
import { Mail, Inbox, LayoutGrid } from "lucide-react";
import { EASE } from "@/lib/landing-variants";

const WhySection = () => {
  return (
    <section
      id="why"
      className="relative py-24 lg:py-28 overflow-hidden border-y border-border/40"
      style={{
        background:
          "linear-gradient(180deg, hsl(220 25% 99%) 0%, hsl(217 35% 97%) 50%, hsl(220 25% 99%) 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] h-[320px] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse, hsl(217 91% 55% / 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-3xl mx-auto text-center mb-14 lg:mb-16"
        >
          <span className="section-label mb-5 inline-flex">Why this platform?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.1]">
            Email wasn&apos;t built for{" "}
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
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Mass university mail turns into noise. ESTIN Hub gives every need a clear place — so
            you find rides, books, and help without digging through endless threads.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Inbox,
              title: "The problem",
              body: "Broadcast emails and reply-all chains bury what matters. Urgent rides and sales get lost in spam.",
              overlay: "linear-gradient(180deg, hsl(346 84% 55% / 0.12) 0%, transparent 65%)",
              iconWrap: "bg-rose-500/10 text-rose-600",
            },
            {
              icon: LayoutGrid,
              title: "The fix",
              body: "Four categories — services, marketplace, transport, lost & found — each with its own feed.",
              overlay: "linear-gradient(180deg, hsl(217 91% 55% / 0.12) 0%, transparent 65%)",
              iconWrap: "bg-primary/10 text-primary",
            },
            {
              icon: Mail,
              title: "The outcome",
              body: "Structured posts, student-only access, and less inbox stress. One hub instead of chaos.",
              overlay: "linear-gradient(180deg, hsl(158 64% 42% / 0.12) 0%, transparent 65%)",
              iconWrap: "bg-emerald-500/10 text-emerald-600",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-7 text-left shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-shadow duration-300"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-70 pointer-events-none"
                  style={{ background: item.overlay }}
                />
                <div
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.iconWrap}`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="relative text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
