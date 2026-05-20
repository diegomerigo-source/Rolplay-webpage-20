"use client";
import { motion } from "framer-motion";
import { MapPin, Building2, Globe, Play } from "lucide-react";
import PageShell from "@/components/PageShell";
import NeuralNetwork from "@/components/NeuralNetwork";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import { PrimaryCTA } from "@/components/CTAButton";
import { useTranslation } from "react-i18next";
import GlobeLoader from "@/components/GlobeLoader";

export default function About() {
  const { t } = useTranslation();

  const locations = [
    { city: t('about.toronto'),   country: t('about.canada'), lat: 43.65,  lng: -79.38  },
    { city: t('about.monterrey'), country: t('about.mexico'), lat: 25.67,  lng: -100.31 },
    { city: t('about.cdmx'),      country: t('about.mexico'), lat: 19.43,  lng: -99.13  },
  ];

  return (
    <PageShell testid="about-page">
      {/* HERO */}
      <section className="relative min-h-[60vh] overflow-hidden flex items-center" data-testid="about-hero">
        <NeuralNetwork className="opacity-40" density={0.00009} />
        <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(192,57,43,0.18), transparent 60%)" }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-20 pb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="font-mono text-[11px] tracking-[0.3em] text-[#C0392B] uppercase mb-5 flex items-center gap-3">
              <span className="w-10 h-px bg-[#C0392B]" />
              {t('about.heroOverline')}
            </div>
            <h1 className="font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.9] tracking-tighter" data-testid="about-headline">
              {t('about.heroTitle')}
            </h1>
            <p className="mt-8 text-zinc-300 text-lg md:text-xl max-w-3xl leading-relaxed">
              {t('about.heroBody')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="relative py-24" data-testid="about-info-cards">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard className="p-10 h-full">
              <Globe size={28} className="text-[#C0392B] mb-6" />
              <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-3">{t('about.card1Label')}</div>
              <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4">
                {t('about.card1Heading')}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {t('about.card1Body')}
              </p>
            </GlassCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <GlassCard className="p-10 h-full">
              <Building2 size={28} className="text-[#C0392B] mb-6" />
              <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-3">{t('about.card2Label')}</div>
              <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4">
                {t('about.card2Heading')}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {t('about.card2Body')}
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative py-32 border-t border-white/5 overflow-hidden" data-testid="about-mission">
        <NeuralNetwork className="opacity-20" density={0.00006} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              overline={t('about.missionOverline')}
              title={t('about.missionTitle')}
              redWord="Mission"
              body={t('about.missionBody')}
            />
            <div className="mt-8">
              <PrimaryCTA href="/contact" testid="about-mission-cta">{t('about.missionCta')}</PrimaryCTA>
            </div>
          </div>
          <div className="lg:col-span-6">
            <GlassCard className="aspect-video flex items-center justify-center group cursor-pointer" data-testid="about-mission-video">
              <NeuralNetwork className="opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0A0A0E]/80" />
              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.div whileHover={{ scale: 1.1 }} className="w-20 h-20 rounded-full bg-[#C0392B] grid place-items-center shadow-[0_0_40px_rgba(192,57,43,0.6)]">
                  <Play size={26} fill="white" className="ml-1" />
                </motion.div>
                <div className="font-display text-2xl md:text-3xl mt-5">{t('about.missionVideoTitle')}</div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mt-2">{t('about.missionVideoMeta')}</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* GLOBE */}
      <section className="relative py-32 border-t border-white/5 overflow-hidden" data-testid="about-globe-section">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ background: "radial-gradient(ellipse at center, rgba(192,57,43,0.15), transparent 60%)" }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              overline={t('about.globeOverline')}
              title={t('about.globeTitle')}
              redWord="One vision."
              body={t('about.globeBody')}
            />
            <div className="mt-8 space-y-3">
              {locations.map((l) => (
                <div key={l.city} className="flex items-center gap-4 glass rounded-2xl px-5 py-4">
                  <MapPin size={18} className="text-[#C0392B]" />
                  <div>
                    <div className="font-display text-xl">{l.city}</div>
                    <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">{l.country}</div>
                  </div>
                  <div className="ml-auto font-mono text-[10px] tracking-widest text-zinc-600">
                    {l.lat.toFixed(2)}° / {l.lng.toFixed(2)}°
                  </div>
                </div>
              ))}
            </div>
          </div>
          <GlobeLoader />
        </div>
      </section>
    </PageShell>
  );
}
