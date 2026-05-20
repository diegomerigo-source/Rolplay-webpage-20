"use client";
import Link from "next/link";
import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  const { t } = useTranslation();

  const locations = [
    { city: t('about.toronto'), country: t('about.canada') },
    { city: t('about.monterrey'), country: t('about.mexico') },
    { city: t('about.cdmx'), country: t('about.mexico') },
  ];

  return (
    <footer className="relative noise-overlay border-t border-white/5 bg-[#050508] overflow-hidden" data-testid="site-footer">
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgba(192,57,43,0.6), transparent 60%)" }}
      />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">

        {/* NEWSLETTER STRIP */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14 pb-14 border-b border-white/5">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#C0392B] uppercase mb-1">
              {t('newsletter.overline')}
            </div>
            <p className="text-white font-display text-xl md:text-2xl leading-snug">
              {t('newsletter.footerLabel')}
            </p>
            <p className="text-zinc-500 text-xs mt-1">{t('newsletter.footerCaption')}</p>
          </div>
          <NewsletterForm source="footer" className="md:w-[420px] shrink-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <div className="font-display text-4xl md:text-5xl mb-4">
              <span className="text-[#C0392B]">Rol</span>Play
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61582917112897" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full grid place-items-center glass hover:border-[#C0392B]/50 hover:text-[#C0392B] transition-all duration-300"
                data-testid="footer-facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.linkedin.com/company/rolplaymx/posts/?feedView=all" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full grid place-items-center glass hover:border-[#C0392B]/50 hover:text-[#C0392B] transition-all duration-300"
                data-testid="footer-linkedin">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#C0392B] uppercase mb-5">{t('footer.locations')}</div>
            <ul className="space-y-3">
              {locations.map((l) => (
                <motion.li
                  key={l.city}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-2 text-sm"
                  data-testid={`footer-location-${l.city.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <MapPin size={14} className="text-[#C0392B] mt-1" />
                  <span>
                    <span className="text-[#C0392B] font-medium">{l.city}</span>
                    <span className="text-zinc-500">, {l.country}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#C0392B] uppercase mb-5">{t('footer.contact')}</div>
            <div className="space-y-3">
              <a href="mailto:info@rolplay.ai" className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white group" data-testid="footer-email">
                <Mail size={14} className="text-[#C0392B]" />
                <span className="group-hover:text-glow-red transition">info@rolplay.ai</span>
              </a>
              <a href="tel:+525550937376" className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white" data-testid="footer-phone">
                <Phone size={14} className="text-[#C0392B]" />
                <span>+52 (55) 5093 7376</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <Link href="/" className="text-zinc-500 hover:text-white">{t('footer.links.home')}</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/about" className="text-zinc-500 hover:text-white">{t('footer.links.about')}</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/benefits" className="text-zinc-500 hover:text-white">{t('footer.links.benefits')}</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/contact" className="text-zinc-500 hover:text-white">{t('footer.links.contact')}</Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-600 font-mono tracking-widest">{t('footer.copyright')}</p>
          <p className="text-xs text-zinc-600 font-mono tracking-widest">{t('footer.badge')}</p>
        </div>
      </div>
    </footer>
  );
}
