'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const GlobeViz = dynamic(() => import('./GlobeViz'), { ssr: false });

export default function GlobeLoader(props) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full aspect-square max-w-[460px] mx-auto" data-testid="about-globe">
      {visible ? (
        <GlobeViz {...props} />
      ) : (
        <div className="w-full h-full rounded-full bg-white/5 animate-pulse" />
      )}
    </div>
  );
}
