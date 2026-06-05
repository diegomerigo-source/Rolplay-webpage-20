"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Facebook, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Logo = () => (
  <div className="flex items-center group" data-testid="brand-logo">
    {/* Inline SVG — transparent bg, no white box, hover glow via filter */}
    <svg
      viewBox="0 0 220 60"
      xmlns="http://www.w3.org/2000/svg"
      className="h-9 w-auto transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_0_10px_rgba(192,57,43,0.7))]"
      aria-label="RolPlay logo"
    >
      {/* ── Brain / neural-network icon ── */}
      {/* Edges (drawn first, behind nodes) */}
      <g stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round">
        <line x1="10" y1="22" x2="20" y2="10" />
        <line x1="10" y1="22" x2="8"  y2="34" />
        <line x1="10" y1="22" x2="24" y2="28" />
        <line x1="20" y1="10" x2="32" y2="8"  />
        <line x1="20" y1="10" x2="34" y2="20" />
        <line x1="32" y1="8"  x2="42" y2="16" />
        <line x1="34" y1="20" x2="42" y2="16" />
        <line x1="34" y1="20" x2="44" y2="30" />
        <line x1="24" y1="28" x2="34" y2="20" />
        <line x1="24" y1="28" x2="18" y2="40" />
        <line x1="24" y1="28" x2="32" y2="42" />
        <line x1="8"  y1="34" x2="18" y2="40" />
        <line x1="44" y1="30" x2="32" y2="42" />
      </g>
      {/* Nodes */}
      <circle cx="10" cy="22" r="5.2" fill="#C0392B" /> {/* dominant left node */}
      <circle cx="20" cy="10" r="3.2" fill="#C0392B" />
      <circle cx="32" cy="8"  r="2.6" fill="#C0392B" />
      <circle cx="42" cy="16" r="2.8" fill="#C0392B" />
      <circle cx="34" cy="20" r="2.4" fill="#C0392B" />
      <circle cx="44" cy="30" r="2.2" fill="#C0392B" />
      <circle cx="24" cy="28" r="3.0" fill="#C0392B" />
      <circle cx="8"  cy="34" r="2.0" fill="#C0392B" />
      <circle cx="18" cy="40" r="2.4" fill="#C0392B" />
      <circle cx="32" cy="42" r="2.8" fill="#C0392B" />

      {/* ── Logotype ── */}
      <text
        x="58" y="43"
        fontFamily="'Cabinet Grotesk', 'Inter', sans-serif"
        fontWeight="800"
        fontSize="36"
        letterSpacing="-0.5"
      >
        <tspan fill="#C0392B">Rol</tspan><tspan fill="#ffffff">Play</tspan>
      </text>
    </svg>
  </div>
);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { i18n, t } = useTranslation();

  const lang = i18n.language?.startsWith('es') ? 'ES' : 'EN';

  const links = [
    { to: "/", label: t('nav.home') },
    { to: "/about", label: t('nav.about') },
    { to: "/benefits", label: t('nav.benefits') },
    { to: "/achievements", label: t('nav.achievements') },
    { to: "/success-stories", label: t('nav.successStories') },
    { to: "/contact", label: t('nav.contact') },
    { to: "/faqs", label: t('nav.faqs') },
    { to: "/blog", label: t('nav.blog') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

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
        <Link href="/" data-testid="nav-logo-link">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                data-testid={`nav-link-${l.to.replace(/\//g, "").replace(/-/g, "-") || "home"}`}
                className={`relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                } group`}
              >
                {l.label}
                <span
                  className={`absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-[#C0392B] origin-left transition-transform duration-500 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center glass rounded-full p-0.5 text-[11px] font-mono tracking-widest" data-testid="lang-toggle">
            <button
              onClick={() => i18n.changeLanguage('en')}
              data-testid="lang-en"
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "EN" ? "bg-[#C0392B] text-white" : "text-zinc-400"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => i18n.changeLanguage('es')}
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
              {links.map((l) => {
                const isActive = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    data-testid={`mobile-nav-link-${l.to.replace(/\//g, "").replace(/-/g, "-") || "home"}`}
                    className={`px-3 py-3 text-base rounded-md ${
                      isActive ? "text-white bg-white/5" : "text-zinc-400"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
