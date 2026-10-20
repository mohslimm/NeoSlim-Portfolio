import { useEffect, useRef } from 'react';

/**
 * Screen-space Quiet Luxury mouse spotlight aura
 * Gently illuminates dark glassmorphism surfaces and borders with a warm gold sheen
 */
export function SpotlightAura() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -1000, y: -1000 });
  const target = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      target.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const updatePosition = () => {
      // Smooth lerp (0.08)
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${pos.current.x - 300}px, ${pos.current.y - 300}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-30 transition-opacity duration-500 opacity-60 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(197, 160, 89, 0.07) 0%, rgba(197, 160, 89, 0.02) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
