import { motion } from "framer-motion";
import { UserPlus, LayoutGrid, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign up with your university email",
    description:
      "Create your account using your ESTIN student email. Instant verification ensures a trusted, verified community of students only.",
    gradientFrom: "hsl(217 91% 55%)",
    gradientTo: "hsl(228 83% 65%)",
    lightBg: "hsl(213 100% 96%)",
  },
  {
    icon: LayoutGrid,
    number: "02",
    title: "Post or explore listings",
    description:
      "Browse the four categories or post your own service, item, ride, or lost/found report. It takes less than a minute.",
    gradientFrom: "hsl(158 64% 42%)",
    gradientTo: "hsl(168 74% 50%)",
    lightBg: "hsl(152 60% 95%)",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Connect with other students",
    description:
      "Reach out directly through the platform. No more forwarding emails or searching old threads — everything is organized.",
    gradientFrom: "hsl(38 92% 50%)",
    gradientTo: "hsl(48 96% 56%)",
    lightBg: "hsl(45 100% 95%)",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden border-y border-border/30">
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(217 91% 30%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 30%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 55% / 0.04) 0%, transparent 70%)", filter: "blur(40px)" }}
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
          <span className="section-label mb-5 inline-flex">How it works</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.08]">
            Up and running{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in 3 steps
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-normal">
            Getting started takes under two minutes. No credit card required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[calc(16.67%+3rem)] right-[calc(16.67%+3rem)] z-0">
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, hsl(217 91% 55% / 0.3), hsl(228 83% 65% / 0.3))" }}
            />
            <div className="absolute left-1/3 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
            <div className="absolute left-2/3 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center group rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md p-8 pt-10 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-shadow duration-300"
                >
                  {/* Icon container */}
                  <div className="relative mb-8">
                    {/* Outer ring */}
                    <div
                      className="absolute inset-0 -m-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle, ${step.lightBg} 0%, transparent 70%)`,
                        filter: "blur(8px)",
                      }}
                    />

                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
                        boxShadow: `0 12px 32px -6px ${step.gradientFrom}55`,
                      }}
                    >
                      <Icon className="w-11 h-11 text-white" strokeWidth={1.5} />
                    </motion.div>

                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[11px] font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})` }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Step label */}
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Step {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight max-w-xs">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
