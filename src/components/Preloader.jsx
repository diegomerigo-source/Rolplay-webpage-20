'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline logo — intentionally duplicated from Navigation so the Preloader
// has zero extra imports and can be evaluated in total isolation.
const Logo = () => (
  <svg
    viewBox="0 0 220 60"
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="55"
    aria-label="RolPlay"
  >
    {/* Neural-network edges */}
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
    <circle cx="10" cy="22" r="5.2" fill="#C0392B" />
    <circle cx="20" cy="10" r="3.2" fill="#C0392B" />
    <circle cx="32" cy="8"  r="2.6" fill="#C0392B" />
    <circle cx="42" cy="16" r="2.8" fill="#C0392B" />
    <circle cx="34" cy="20" r="2.4" fill="#C0392B" />
    <circle cx="44" cy="30" r="2.2" fill="#C0392B" />
    <circle cx="24" cy="28" r="3.0" fill="#C0392B" />
    <circle cx="8"  cy="34" r="2.0" fill="#C0392B" />
    <circle cx="18" cy="40" r="2.4" fill="#C0392B" />
    <circle cx="32" cy="42" r="2.8" fill="#C0392B" />
    {/* Logotype */}
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
);

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismiss = () => setVisible(false);

    // Wait for all resources (scripts, images, stylesheets) AND fonts.
    // If the page is already fully loaded (e.g. instant cache hit), both
    // promises resolve synchronously and the preloader hides immediately.
    const pageReady = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([pageReady, fontsReady]).then(dismiss);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0E]"
          aria-hidden="true"
          data-testid="preloader"
        >
          {/* Fade-in entrance, then slow red-glow breathe */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0  6px rgba(192,57,43,0.25))',
                  'drop-shadow(0 0 18px rgba(192,57,43,0.70))',
                  'drop-shadow(0 0  6px rgba(192,57,43,0.25))',
                ],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Logo />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
