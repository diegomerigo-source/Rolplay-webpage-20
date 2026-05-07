import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Facebook, Linkedin } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About us" },
  { to: "/benefits", label: "Benefits" },
  { to: "/achievements", label: "Achievements" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/contact", label: "Contact Us" },
  { to: "/faqs", label: "FAQs" },
];

const Logo = () => (
  <div className="flex items-center gap-2.5 group" data-testid="brand-logo">
    <div className="relative w-9 h-9">
      <svg viewBox="0 0 40 40" className="w-9 h-9">
        <g stroke="#C0392B" strokeWidth="1" fill="none" opacity="0.95">
          <circle cx="20" cy="6" r="2.4" fill="#C0392B" />
          <circle cx="6" cy="14" r="2" fill="#C0392B" />
          <circle cx="34" cy="14" r="2" fill="#C0392B" />
          <circle cx="10" cy="30" r="2" fill="#fff" />
          <circle cx="30" cy="30" r="2" fill="#fff" />
          <circle cx="20" cy="22" r="2.6" fill="#C0392B" />
          <line x1="20" y1="6" x2="6" y2="14" />
          <line x1="20" y1="6" x2="34" y2="14" />
          <line x1="6" y1="14" x2="20" y2="22" />
          <line x1="34" y1="14" x2="20" y2="22" />
          <line x1="20" y1="22" x2="10" y2="30" />
          <line x1="20" y1="22" x2="30" y2="30" />
          <line x1="10" y1="30" x2="30" y2="30" strokeOpacity="0.3" />
        </g>
      </svg>
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "0 0 22px rgba(192,57,43,0.6)" }} />
    </div>
    <span className="font-display text-2xl tracking-tight">
      <span className="text-[#C0392B]">Rol</span>
      <span className="text-white">Play</span>
    </span>
  </div>
);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong border-b border-white/5"
          : "bg-transparent"
      }`}
      data-testid="main-nav"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" data-testid="nav-logo-link">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                } group`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-[#C0392B] origin-left transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center glass rounded-full p-0.5 text-[11px] font-mono tracking-widest" data-testid="lang-toggle">
            <button
              onClick={() => setLang("EN")}
              data-testid="lang-en"
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "EN" ? "bg-[#C0392B] text-white" : "text-zinc-400"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ES")}
              data-testid="lang-es"
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "ES" ? "bg-[#C0392B] text-white" : "text-zinc-400"
              }`}
            >
              ES
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-zinc-500">
            <a href="https://www.facebook.com/profile.php?id=61582917112897" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full grid place-items-center hover:text-white hover:bg-white/5 transition" data-testid="nav-facebook">
              <Facebook size={15} />
            </a>
            <a href="https://www.linkedin.com/company/rolplaymx/posts/?feedView=all" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full grid place-items-center hover:text-white hover:bg-white/5 transition" data-testid="nav-linkedin">
              <Linkedin size={15} />
            </a>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden w-10 h-10 grid place-items-center text-white"
            data-testid="mobile-menu-toggle"
            aria-label="menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden glass-strong border-t border-white/5"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `px-3 py-3 text-base rounded-md ${
                      isActive ? "text-white bg-white/5" : "text-zinc-400"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
