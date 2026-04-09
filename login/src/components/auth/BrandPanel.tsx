import { Briefcase, Car, Search } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Briefcase, text: "Find services & sell products" },
  { icon: Car, text: "Share rides across campus" },
  { icon: Search, text: "Recover lost items instantly" },
];

const avatars = [
  { letter: "A", bg: "#F97316" },
  { letter: "B", bg: "#22C55E" },
  { letter: "C", bg: "#3B82F6" },
  { letter: "D", bg: "#EAB308" },
];

const BrandPanel = () => (
  <div className="relative hidden md:flex w-[45%] min-h-screen flex-col justify-between overflow-hidden p-12"
    style={{ background: "linear-gradient(135deg, #5B4FE8 0%, #6C63FF 50%, #3730A3 100%)" }}>
    
    {/* Dot grid */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
    
    {/* Orbs - subtle and blurred */}
    <div className="absolute pointer-events-none rounded-full animate-float-1"
      style={{ width: 400, height: 400, top: -100, right: -100, background: "rgba(255,255,255,0.07)", filter: "blur(40px)" }} />
    <div className="absolute pointer-events-none rounded-full animate-float-2"
      style={{ width: 300, height: 300, bottom: 50, left: -80, background: "rgba(255,255,255,0.07)", filter: "blur(40px)" }} />
    <div className="absolute pointer-events-none rounded-full animate-float-3"
      style={{ width: 200, height: 200, top: "40%", right: "20%", background: "rgba(255,255,255,0.07)", filter: "blur(40px)" }} />

    {/* Top */}
    <Link to="/" className="relative z-10 flex items-center gap-2 no-underline hover:opacity-95">
      <span className="text-xl">🎓</span>
      <span className="text-xl font-bold text-white">ESTIN Hub</span>
    </Link>

    {/* Middle */}
    <div className="relative z-10">
      <span className="inline-block mb-6 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[13px] text-white/90">
        ✦ ESTIN University Platform
      </span>
      <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-4">
        Your campus,<br />organized.
      </h1>
      <p className="text-base text-white/75 leading-relaxed mb-10 max-w-sm">
        Services, marketplace, transport & lost items — all in one place built for ESTIN students.
      </p>
      <div className="flex flex-col gap-4">
        {features.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <Icon size={18} className="text-white" />
            </div>
            <span className="text-[15px] font-medium text-white">{text}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom */}
    <div className="relative z-10 flex items-center gap-3">
      <div className="flex">
        {avatars.map(({ letter, bg }, i) => (
          <div key={letter} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
            style={{ backgroundColor: bg, marginLeft: i > 0 ? "-10px" : 0 }}>
            {letter}
          </div>
        ))}
      </div>
      <span className="text-sm text-white/85">Join 200+ ESTIN students already using the platform</span>
    </div>
  </div>
);

export default BrandPanel;
