import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  "Free for all ESTIN students",
  "No email spam",
  "Verified student community",
];

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Rich gradient background — blue → violet */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, hsl(217 91% 46%) 0%, hsl(235 75% 52%) 45%, hsl(260 55% 58%) 100%)",
        }}
      />

      {/* Noise layer */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-[0.08]" />

      {/* Top glow */}
      <div
        className="absolute top-0 inset-x-0 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 100% at 50% 0%, hsl(0 0% 100% / 0.22) 0%, hsl(260 80% 85% / 0.08) 45%, transparent 72%)",
        }}
      />

      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.1) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(228 83% 40% / 0.3), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Join the beta — Free for students
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.06] drop-shadow-[0_2px_28px_hsl(0_0%_0%_/_0.15)]">
            Start using ESTIN
            <br />
            Student Hub today
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-10 font-normal max-w-2xl mx-auto">
            Join hundreds of ESTIN students already organizing their campus life
            in one platform. Sign up in under a minute — no credit card needed.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-5 mb-12">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-white/70" />
                {perk}
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="h-16 px-12 text-lg font-bold rounded-2xl bg-white border-0 transition-all duration-300 group hover:brightness-110"
              style={{
                color: "hsl(217 91% 48%)",
                boxShadow:
                  "0 12px 40px -8px hsl(260 60% 30% / 0.45), 0 0 48px -12px hsl(0 0% 100% / 0.35), inset 0 2px 0 hsl(0 0% 100% / 0.25)",
              }}
              onClick={() => navigate("/signup")}
            >
              Get Started Free
              <ArrowRight className="ml-2.5 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>

          {/* Trust note */}
          <p className="mt-6 text-white/50 text-sm">
            No spam. No credit card. Just a student email.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
