"use client";

// Pre-computed deterministic particle data — avoids SSR/client Math.random() hydration mismatch
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  left: ((i * 37.3 + 13.7) % 100).toFixed(4),
  duration: 7 + (i * 1.3) % 5,
  delay: (i * 0.71) % 5,
}));

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Award, Sparkles, Play, Brain, Target, Users, Zap, ShieldCheck, Globe, BarChart3, Mail, Linkedin } from "lucide-react";
import PageShell from "@/components/PageShell";
import NeuralNetwork from "@/components/NeuralNetwork";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlassCard from "@/components/GlassCard";
import { PrimaryCTA, GhostCTA } from "@/components/CTAButton";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const productIcons = [Brain, Target, Users];
const featureIcons = [Zap, ShieldCheck, Globe, BarChart3];

function TypewriterQuote({ text, start }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [text, start]);
  return <span>{out}<span className="cursor-blink" /></span>;
}

export default function Home({ latestPosts = [] }) {
  const [quoteStart, setQuoteStart] = useState(false);
  const { t } = useTranslation();

  const headlineWords = t('home.heroWords', { returnObjects: true });

  const products = [
    {
      name: t('home.product1Name'),
      tag: t('home.product1Tag'),
      desc: t('home.product1Desc'),
      bullets: [t('home.product1B1'), t('home.product1B2'), t('home.product1B3')],
      label: t('home.product1Label'),
      icon: Brain,
    },
    {
      name: t('home.product2Name'),
      tag: t('home.product2Tag'),
      desc: t('home.product2Desc'),
      bullets: [t('home.product2B1'), t('home.product2B2'), t('home.product2B3')],
      label: t('home.product2Label'),
      icon: Target,
    },
    {
      name: t('home.product3Name'),
      tag: t('home.product3Tag'),
      desc: t('home.product3Desc'),
      bullets: [t('home.product3B1'), t('home.product3B2'), t('home.product3B3')],
      label: t('home.product3Label'),
      icon: Users,
    },
  ];

  const features = [
    { icon: Zap, title: t('home.feature1Title'), body: t('home.feature1Body') },
    { icon: ShieldCheck, title: t('home.feature2Title'), body: t('home.feature2Body') },
    { icon: Globe, title: t('home.feature3Title'), body: t('home.feature3Body') },
    { icon: BarChart3, title: t('home.feature4Title'), body: t('home.feature4Body') },
  ];

  return (
    <PageShell testid="home-page">
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden" data-testid="hero-section">
        <NeuralNetwork className="opacity-60" />
        <div className="absolute inset-0 grid-overlay opacity-[0.35] pointer-events-none" />
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, rgba(192,57,43,0.7), transparent 60%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgba(192,57,43,0.6), transparent 60%)" }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-32 pb-12 flex flex-col justify-between min-h-[100svh]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-mono text-[11px] tracking-[0.3em] text-[#C0392B] uppercase mb-7 flex items-center gap-3"
            data-testid="hero-overline"
          >
            <span className="w-10 h-px bg-[#C0392B]" />
            {t('home.heroOverline')}
          </motion.div>

          <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-display text-[clamp(2.2rem,6.5vw,6.5rem)] leading-[0.92] tracking-tighter max-w-6xl" data-testid="hero-headline">
            {Array.isArray(headlineWords) && headlineWords.map((w, i) => {
              const isRed = w === "Sales" || w === "Force" || w === "Fuerza" || w === "Ventas";
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block mr-[0.22em] ${isRed ? "text-[#C0392B] text-glow-red" : "text-white"}`}
                >
                  {w}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-8 max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed"
          >
            {t('home.heroSubheading')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <PrimaryCTA href="https://calendly.com/viridiana-flores-audioweb/30min" external testid="hero-contact-cta">
              {t('home.heroCta')}
            </PrimaryCTA>
            <GhostCTA href="https://rolplayadmin.com/rolplayca-demo/access.php?lang=en_US" external testid="hero-demo-cta">
              {t('home.heroDemo')}
            </GhostCTA>
          </motion.div>
          </div>

          {/* Bottom strip: stats + badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-20 pt-10 border-t border-white/5 flex flex-wrap items-end justify-between gap-6"
          >
            <div className="flex flex-wrap items-end gap-10">
              <div data-testid="hero-stat-clients">
                <AnimatedCounter value={100} suffix="+" className="font-display text-5xl md:text-6xl text-white" />
                <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mt-1">{t('home.statClients')}</div>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div data-testid="hero-stat-users">
                <AnimatedCounter value={100000} suffix="+" className="font-display text-5xl md:text-6xl text-white" />
                <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mt-1">{t('home.statUsers')}</div>
              </div>
            </div>
            <div className="glass rounded-full pl-2 pr-5 py-2 flex items-center gap-3 group hover:border-[#C0392B]/40 transition-all" data-testid="hero-award-badge">
              <span className="w-9 h-9 rounded-full grid place-items-center bg-[#C0392B] text-white">
                <Award size={16} />
              </span>
              <div>
                <div className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase leading-tight">{t('home.statBadge')}</div>
                <div className="text-white text-sm font-semibold leading-tight">{t('home.statBadgeLabel')}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* scan line */}
        <div className="absolute inset-x-0 top-0 h-px overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C0392B] to-transparent" style={{ animation: "scan-line 6s ease-in-out infinite" }} />
        </div>
      </section>

      {/* MEET ROLPLAY */}
      <section className="relative py-32 overflow-hidden" data-testid="meet-rolplay-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              overline={t('home.meetOverline')}
              title={t('home.meetTitle')}
              redWord="Rol"
              body={t('home.meetBody')}
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryCTA href="/about" testid="meet-about-cta">{t('home.meetCta')}</PrimaryCTA>
              <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">{t('home.meetMeta')}</div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <GlassCard className="aspect-video flex items-center justify-center group cursor-pointer" data-testid="meet-video-card">
              <NeuralNetwork className="opacity-25" intensity={0.6} />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0A0A0E]/80" />
              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-[#C0392B] grid place-items-center shadow-[0_0_40px_rgba(192,57,43,0.6)]"
                >
                  <Play size={26} fill="white" className="ml-1" />
                </motion.div>
                <div className="font-display text-2xl md:text-3xl mt-5">{t('home.meetVideoCard')}</div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mt-2">{t('home.meetVideoMeta')}</div>
              </div>
            </GlassCard>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 hidden md:flex items-center gap-3"
            >
              <Sparkles size={18} className="text-[#C0392B]" />
              <div>
                <div className="text-xs font-medium text-white">{t('home.meetAchievement')}</div>
                <div className="text-[10px] text-zinc-500 font-mono tracking-widest">{t('home.meetAchievementLabel')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY TAGLINE */}
      <section className="relative py-24 border-y border-white/5 overflow-hidden" data-testid="technology-section">
        <NeuralNetwork className="opacity-30" density={0.00007} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <div className="font-mono text-[11px] tracking-[0.3em] text-[#C0392B] uppercase mb-4">{t('home.techOverline')}</div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] max-w-5xl mx-auto">
            {t('home.techHeading')}
          </h2>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="relative py-32" data-testid="products-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionHeader
            overline={t('home.productsOverline')}
            title={t('home.productsTitle')}
            redWord="one mission"
            body={t('home.productsBody')}
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`product-card-${i}`}
                >
                  <GlassCard className="p-6 group cursor-pointer h-full">
                    <div className="aspect-[4/3] rounded-xl relative overflow-hidden mb-6 grid-overlay border border-white/5">
                      <NeuralNetwork className="opacity-40" density={0.0002} />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0E]/40 via-transparent to-[#0A0A0E]/80" />
                      <div className="absolute inset-0 grid place-items-center">
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className="w-14 h-14 rounded-full bg-[#C0392B]/90 grid place-items-center shadow-[0_0_30px_rgba(192,57,43,0.6)]"
                        >
                          <Play size={18} fill="white" className="ml-0.5" />
                        </motion.div>
                      </div>
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
                        <Icon size={11} className="text-[#C0392B]" />
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white/80">{p.tag}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                        {p.bullets.map((b) => (
                          <span key={b} className="glass rounded-full px-2 py-0.5 font-mono text-[9px] tracking-widest text-white/70">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">{p.label}</div>
                    <h3 className="font-display text-3xl md:text-4xl mt-1 leading-none">
                      <span className="relative">
                        {p.name}
                        <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#C0392B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </span>
                    </h3>
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{p.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TRAIN WITH AI */}
      <section className="relative py-32 overflow-hidden" data-testid="why-section">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(192,57,43,0.4), transparent 50%)" }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              overline={t('home.whyOverline')}
              title={t('home.whyTitle')}
              redWord="AI simulators?"
              body={t('home.whyBody')}
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryCTA href="https://calendly.com/viridiana-flores-audioweb/30min" external testid="why-contact-cta">
                {t('home.whyCta')}
              </PrimaryCTA>
              <div className="flex items-center gap-2 text-zinc-500">
                <a href="https://www.linkedin.com/company/rolplaymx/posts/?feedView=all" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass grid place-items-center hover:text-[#C0392B] hover:border-[#C0392B]/40 transition-all">
                  <Linkedin size={14} />
                </a>
                <a href="mailto:info@rolplay.ai"
                  className="w-9 h-9 rounded-full glass grid place-items-center hover:text-[#C0392B] hover:border-[#C0392B]/40 transition-all">
                  <Mail size={14} />
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`glass rounded-2xl p-5 hover:border-[#C0392B]/30 transition-all duration-500 ${i % 2 === 1 ? "translate-y-6" : ""}`}
                  data-testid={`why-feature-${i}`}
                >
                  <Icon size={20} className="text-[#C0392B] mb-4" />
                  <div className="font-display text-lg leading-tight mb-2">{f.title}</div>
                  <div className="text-xs text-zinc-500 leading-relaxed">{f.body}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STAT CALLOUT */}
      <section className="relative py-24 overflow-hidden" data-testid="stat-callout">
        <NeuralNetwork className="opacity-25" density={0.00006} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <GlassCard tilt={false} className="p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="font-display text-7xl md:text-9xl text-[#C0392B] text-glow-red leading-none" data-testid="callout-stat">
                <AnimatedCounter value={5} suffix="%" />
              </div>
            </div>
            <div className="flex-1 max-w-xl">
              <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-3">{t('home.edgeLabel')}</div>
              <h3 className="font-display text-3xl md:text-4xl leading-tight">
                {t('home.edgeHeading')}
              </h3>
              <p className="text-zinc-400 mt-4 text-sm md:text-base">
                {t('home.edgeBody')}
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section
        className="relative py-32 overflow-hidden border-y border-[#C0392B]/20"
        data-testid="testimonial-section"
      >
        <motion.div
          onViewportEnter={() => setQuoteStart(true)}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(192,57,43,0.25), transparent 60%), #050508",
            }}
          />
          <NeuralNetwork className="opacity-30" intensity={1.2} />
          {/* Falling red particles */}
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: "100vh", opacity: [0, 0.8, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
              className="absolute w-[2px] h-[2px] rounded-full"
              style={{
                left: `${p.left}%`,
                background: "rgba(192, 57, 43, 0.9)",
                boxShadow: "0 0 6px rgba(192,57,43,0.9)",
              }}
            />
          ))}
        </motion.div>

        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateZ: -12 }}
            whileInView={{ opacity: 0.25, scale: 1, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => setQuoteStart(true)}
            className="font-display text-[14rem] leading-none text-[#C0392B] -mb-12 select-none"
            aria-hidden
          >
            "
          </motion.div>
          <blockquote className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto" data-testid="testimonial-quote">
            <TypewriterQuote
              text={t('home.testimonialQuote')}
              start={quoteStart}
            />
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-10 h-px bg-[#C0392B]" />
            <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">{t('home.testimonialLabel')}</div>
            <div className="w-10 h-px bg-[#C0392B]" />
          </div>
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      {latestPosts.length > 0 && (
        <section className="relative py-32 border-t border-white/5" data-testid="home-blog-section">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <SectionHeader
                overline={t('blog.latestOverline')}
                title={t('blog.latestTitle')}
                body={t('blog.latestBody')}
              />
              <div className="shrink-0">
                <PrimaryCTA href="/blog" icon={true}>{t('blog.latestCta')}</PrimaryCTA>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post._id} blog={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="relative py-32" id="contact" data-testid="home-contact-section">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <SectionHeader
            overline={t('home.contactOverline')}
            title={t('home.contactTitle')}
            redWord="Contact"
            body={t('home.contactBody')}
            align="center"
          />
          <div className="mt-12 flex justify-center">
            <ContactForm variant="compact" />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <a href="mailto:info@rolplay.ai" className="text-zinc-300 hover:text-[#C0392B] transition" data-testid="home-contact-email">info@rolplay.ai</a>
            <span className="text-zinc-700">·</span>
            <a href="tel:+525550937376" className="text-zinc-300 hover:text-[#C0392B] transition" data-testid="home-contact-phone">+52 (55) 5093 7376</a>
            <span className="text-zinc-700">·</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#C0392B] uppercase">{t('home.contactLocations')}</span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
