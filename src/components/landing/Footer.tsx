import { motion } from "framer-motion";
import { Mail, Github } from "lucide-react";

const links = {
  Platform: [
    { label: "Features",     href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Preview",      href: "#preview" },
  ],
  Community: [
    { label: "About ESTIN", href: "#" },
    { label: "Student Guide", href: "#" },
    { label: "Contact",     href: "#" },
  ],
  Legal: [
    { label: "Privacy",  href: "#" },
    { label: "Terms",    href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary shadow-blue flex items-center justify-center">
                <span className="text-xs font-black text-primary-foreground">ES</span>
              </div>
              <span className="text-base font-bold">ESTIN Hub</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Organizing student life at ESTIN. No more email spam — just structured,
              meaningful connections.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4 text-background/70" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Github className="w-4 h-4 text-background/70" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-background/40">
          <p>© {new Date().getFullYear()} ESTIN Student Hub. All rights reserved.</p>
          <p>Built for ESTIN students · Bejaia, Algeria</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
