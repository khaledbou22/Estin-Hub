import { motion } from "framer-motion";
import { Wrench, ShoppingBag, Car, Search, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Wrench,
    title: "Services",
    description:
      "Find or offer tutoring, repairs, design work, and more. Connect with skilled students who can help — or need help.",
    gradientFrom: "hsl(217 91% 55%)",
    gradientTo: "hsl(228 83% 65%)",
    lightBg: "hsl(213 100% 97%)",
    iconColor: "hsl(217 91% 55%)",
    tag: "Most popular",
    tagColor: "bg-primary/10 text-primary",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    description:
      "Buy and sell second-hand items — books, electronics, equipment. Safe student-to-student transactions.",
    gradientFrom: "hsl(158 64% 42%)",
    gradientTo: "hsl(168 74% 50%)",
    lightBg: "hsl(152 60% 95%)",
    iconColor: "hsl(158 64% 38%)",
    tag: null,
    tagColor: "",
  },
  {
    icon: Car,
    title: "Transport",
    description:
      "Share rides or find carpools to and from campus. Save money and reduce your commute stress together.",
    gradientFrom: "hsl(38 92% 50%)",
    gradientTo: "hsl(48 96% 56%)",
    lightBg: "hsl(45 100% 95%)",
    iconColor: "hsl(38 92% 45%)",
    tag: null,
    tagColor: "",
  },
  {
    icon: Search,
    title: "Lost & Found",
    description:
      "Lost something on campus? Post it here. Found an item? Help reunite it with its owner quickly.",
    gradientFrom: "hsl(346 84% 55%)",
    gradientTo: "hsl(356 90% 62%)",
    lightBg: "hsl(350 100% 96%)",
    iconColor: "hsl(346 84% 50%)",
    tag: null,
    tagColor: "",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FeaturesSection = () => {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden page-section-muted">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />

      {/* Background decorations */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "var(--gradient-primary)", filter: "blur(100px)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-label mb-5 inline-flex">Features</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.08]">
            Everything a student needs,
            <br className="hidden sm:block" />
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}in one place
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            Four structured categories that replace cluttered email threads. Find exactly
            what you need — or offer what others are looking for.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="group relative rounded-2xl border border-border/50 bg-card/95 backdrop-blur-[2px] p-8 cursor-default overflow-hidden card-premium"
                style={{
                  boxShadow: "var(--shadow-md), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
                }}
              >
                {/* Card background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${feature.lightBg} 0%, transparent 70%)`,
                  }}
                />

                {/* Top border accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${feature.gradientFrom}, ${feature.gradientTo})` }}
                />

                {/* Icon */}
                <div className="relative mb-7">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${feature.gradientFrom}, ${feature.gradientTo})`,
                      boxShadow: `0 12px 28px -6px ${feature.gradientFrom}55`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.65} />
                  </div>
                </div>

                {/* Tag */}
                {feature.tag && (
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${feature.tagColor}`}>
                    {feature.tag}
                  </span>
                )}

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {feature.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  style={{ color: feature.iconColor }}
                >
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
