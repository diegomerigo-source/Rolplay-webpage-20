'use client';
import { useEffect } from 'react';

// Keyframe injected once as a <style> tag — keeps the component fully
// self-contained and avoids touching globals.css.
const STYLE = `
  @keyframes rolplay-ripple {
    0%   { transform: translate(-50%, -50%) scale(1);  opacity: 0.45; }
    100% { transform: translate(-50%, -50%) scale(22); opacity: 0;    }
  }
`;

export default function ClickRipple() {
  useEffect(() => {
    const handler = (e) => {
      const el = document.createElement('span');

      // position: fixed keeps the element out of the layout flow entirely.
      // pointer-events: none ensures it never intercepts subsequent clicks.
      // Animation via transform+opacity — compositor-only, no layout/paint.
      el.style.cssText = [
        `position:fixed`,
        `left:${e.clientX}px`,
        `top:${e.clientY}px`,
        `width:6px`,
        `height:6px`,
        `border-radius:50%`,
        `background:rgba(192,57,43,0.45)`,
        `pointer-events:none`,
        `z-index:99998`,
        `animation:rolplay-ripple 500ms cubic-bezier(0,0.55,0.45,1) forwards`,
      ].join(';');

      document.body.appendChild(el);

      // Self-removing: the DOM node is cleaned up the moment the animation
      // ends, with no timers or external bookkeeping needed.
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Render only the keyframe definition — no visible DOM element at rest.
  return <style>{STYLE}</style>;
}
