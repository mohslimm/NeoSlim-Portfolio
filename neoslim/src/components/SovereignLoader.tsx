import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SovereignLoaderProps {
  onComplete: () => void;
}

export function SovereignLoader({ onComplete }: SovereignLoaderProps) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Under reduced motion: instant complete
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const duration = 1400; // 1.4s total - snappy, award-caliber, never boring
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out quartic for rapid ascent then precise deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(ease * 100);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 650);
        }, 120);
      }
    };

    const handle = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(handle);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loader"
          role="status"
          aria-label="Chargement de l'architecture"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-8 md:p-14 bg-[#060610] text-[#f0ede8] select-none"
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Top telemetry bar */}
          <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest text-[#c5a059]/70 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
              Stepping Stones Agency
            </span>
            <span className="hidden sm:inline">36.7538° N, 3.0588° E</span>
            <span>Series B Tier</span>
          </div>

          {/* Central Monogram & Counter */}
          <div className="flex flex-col items-center text-center my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mb-6 rounded-2xl border border-[#c5a059]/30 bg-[#0a0a14] flex items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.15)]"
            >
              <span className="font-serif italic text-2xl font-bold text-[#c5a059]">MS</span>
            </motion.div>

            <div className="font-mono text-6xl md:text-8xl font-light tracking-tighter text-[#f0ede8] tabular-nums mb-3">
              {String(count).padStart(3, '0')}
              <span className="text-xl md:text-2xl text-[#c5a059] ml-1 font-serif">%</span>
            </div>

            <p className="font-serif italic text-sm md:text-base text-[#c5a059] tracking-wider max-w-sm">
              Sovereign Systems & Monolithic Engineering
            </p>
          </div>

          {/* Bottom Hairline Progress Conduit */}
          <div className="w-full max-w-md">
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#c5a059]"
                style={{ width: `${count}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-[#f0ede8]/40 tracking-widest uppercase">
              <span>Algiers • Dubai • Paris</span>
              <span>Mohamed Slimani</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
