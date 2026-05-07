# Rolplay Website Redesign — PRD

## Original Problem Statement
Redesign the website for **Rolplay (rolplay.ai)** — an AI-powered sales training platform that uses simulations and virtual coaching to train commercial teams. 20+ years experience, 91+ corporate clients, 8,750+ active users, recognized in Training Industry's Top 20 AI-Based Coaching & Learning Support Tools 2025. Offices in Toronto (Canada), Monterrey, and Ciudad de México (Mexico).

The current site is functional but aesthetically flat, dated, and lacks visual depth. The redesign must feel cutting-edge, immersive, and worthy of an AI-first technology company competing globally.

## Architecture
- **Stack**: React 19 SPA + React Router v7 + Tailwind CSS + Framer Motion + Lucide React + Sonner (toasts)
- **No backend** — pure frontend redesign per user choice
- **Fonts**: Cabinet Grotesk (display), Manrope (body), JetBrains Mono (overline) via Fontshare CDN
- **Color system**: Dark `#050508` / `#0A0A0E`, accent `#C0392B`, white text, JetBrains Mono red overlines
- **Animations**: Pure CSS keyframes + Canvas neural network (custom) + Framer Motion (page transitions, scroll reveals, 3D card tilt, parallax)
- Bilingual EN/ES toggle implemented as visual placeholder (per user choice)

## User Personas
1. **Enterprise sales VP** — evaluating training platforms for global team rollout
2. **L&D / training director** — needs measurable, fair, scalable coaching tools
3. **C-suite buyer** — values prestige (Top 20 award), enterprise clients, ROI signals
4. **Sales rep / end user** — will use the platform daily for skill practice

## Core Requirements (Static)
- Multi-page structure: 7 pages (Home, About Us, Benefits, Achievements, Success Stories, FAQs, Contact Us)
- Sticky navigation with logo, links, EN/ES toggle, social icons (Facebook, LinkedIn)
- Preserve all original copy & CTAs
- Preserve external links: Calendly demo, rolplayadmin demo, WhatsApp, Facebook, LinkedIn
- Premium dark aesthetic: glassmorphism, glowing red accents, particle effects, neural networks
- Animated stats counters (91+, 8,750+)
- Training Industry Top 20 award badge
- WhatsApp floating green pulsing orb (bottom right)
- Scroll progress bar (thin red line at top)
- Mobile responsive

## Implemented (May 2026)
- ✅ All 7 pages built and routed
- ✅ Reusable components: Navigation, Footer, ScrollProgress, WhatsAppOrb, NeuralNetwork (canvas), AnimatedCounter, GlassCard (3D tilt), ContactForm (compact + full variants), CTAButton, SectionHeader, PageShell
- ✅ Hero: word-by-word animated headline with "Sales Force" in red, dual CTAs, neural network canvas background, mouse parallax, animated counters, Top 20 badge
- ✅ Home: Meet Rolplay, Technology tagline, 3 product cards (Rolplay, Sales Simulator, Virtual Coach), Why train with AI bento, 5% objective stat callout, testimonial with typewriter quote + falling red particles, contact form
- ✅ About: hero, info cards, mission section, SVG globe with Toronto/Monterrey/CDMX pins
- ✅ Benefits: hero "close deals", key message, 3-item interactive accordion (Reduction of Bias, Multilingual Support, Real-Time Insights), golden particle bold statement
- ✅ Achievements: hero, 2 award cards (Top 20 2025 + Watch List 2024), recognition quote, video placeholder
- ✅ Success Stories: hero, 2 stories with massive 3D metallic rank numbers (4th, 2nd), alternating layouts, metric cards
- ✅ FAQs: futuristic hero with red light beams, 8-item accordion with red active indicator, embedded contact form
- ✅ Contact: hero, copy-to-clipboard email/phone, full contact form, 3 office cards
- ✅ Footer: locations, contact, social
- ✅ Animations: scroll-triggered reveals, hover glows, 3D card tilt, typewriter quote, animated counters, scan lines, page transitions
- ✅ Tested via testing_agent_v3: 100% frontend success rate, all 7 routes load, all interactions work

## Tested
- ✅ Frontend e2e (testing_agent_v3 iteration_1) — 100% pass
- All 7 routes ✓ Sticky nav ✓ Logo ✓ Mobile menu ✓ EN/ES toggle ✓ All CTAs ✓ Forms (mocked, client-side only) ✓ Toasts ✓ Accordions (Benefits 3, FAQs 8) ✓ Copy-to-clipboard ✓ Globe SVG ✓ Award cards ✓ Rank typography ✓ WhatsApp orb ✓

## Backlog / Next Tasks (P0 → P2)
- **P1**: Real Spanish translations for EN/ES toggle (currently visual placeholder)
- **P1**: Replace placeholder video tiles with real YouTube embeds (Meet Rolplay, Nuestra Misión, Recognition Highlights) using lite-youtube facade pattern
- **P1**: Backend contact form integration → MongoDB storage + email forwarding to info@rolplay.ai (Resend or SendGrid)
- **P2**: SEO meta tags, OpenGraph, structured data
- **P2**: Three.js upgrade for hero (currently CSS canvas — solid but not WebGL)
- **P2**: Calendly inline embed instead of external link
- **P2**: Real client logo carousel section (currently abstract)
- **P2**: Analytics integration (GA4 / Plausible)
- **P2**: Reduced-motion preference respect for animations
