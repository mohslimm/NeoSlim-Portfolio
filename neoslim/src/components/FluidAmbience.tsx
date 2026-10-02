import { useEffect, useRef, memo } from 'react';

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

function hash2(ix: number, iy: number): number {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function vnoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

function fbm(x: number, y: number, octaves: number): number {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    v += vnoise(x * freq, y * freq) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return v / norm;
}

function sampleFluid(
  x: number,
  y: number,
  t: number,
  mx: number,
  my: number,
  strength: number
): number {
  const dx = x - mx;
  const dy = y - my;
  const push = strength * Math.exp(-(dx * dx + dy * dy) / 0.022);
  const px = x + dx * push * 1.5;
  const py = y + dy * push * 1.5;
  const q = fbm(px * 2.5 + t * 0.08, py * 2.5 - t * 0.06, 4);
  return fbm(px * 4.2 + q * 2.2 + 5.0 - t * 0.04, py * 4.2 + q * 1.8 + 1.2, 3);
}

function smoothstep(e0: number, e1: number, v: number): number {
  const k = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)));
  return k * k * (3 - 2 * k);
}

function bufferWidth(cssWidth: number): number {
  return Math.round(Math.min(180, Math.max(90, cssWidth / 8)));
}

interface FluidAmbienceProps {
  className?: string;
  speed?: number;
  strength?: number;
  opacity?: number;
}

export const FluidAmbience = memo(function FluidAmbience({
  className = '',
  speed = 0.85,
  strength = 0.65,
  opacity = 0.38,
}: FluidAmbienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Quiet Luxury Palette: Void deep -> Gold 500 -> Gold glow 400
    const palette: [Rgb, Rgb, Rgb] = [
      hexToRgb('#060610'),
      hexToRgb('#c5a059'),
      hexToRgb('#e8c77a'),
    ];

    let raf = 0;
    let last = 0;
    let start = -1;
    let mx = 0.5;
    let my = 0.45;
    let tx = mx;
    let ty = my;
    let bw = 0;
    let bh = 0;
    let img: ImageData | null = null;

    const render = (t: number) => {
      if (!ctx) return;
      const cssW = canvas.clientWidth || 300;
      const cssH = canvas.clientHeight || 200;
      const wantW = bufferWidth(cssW);
      const wantH = Math.max(2, Math.round((wantW * cssH) / cssW));

      if (wantW !== bw || wantH !== bh) {
        bw = wantW;
        bh = wantH;
        canvas.width = bw;
        canvas.height = bh;
        img = ctx.createImageData(bw, bh);
      }
      if (!img) return;

      const data = img.data;
      const aspect = cssW / cssH;
      const [c0, c1, c2] = palette;
      let p = 0;

      for (let iy = 0; iy < bh; iy++) {
        const y = iy / bh;
        for (let ix = 0; ix < bw; ix++) {
          const x = (ix / bw) * aspect;
          const v = sampleFluid(x, y, t, mx * aspect, my, strength);
          const band = 0.88 + 0.12 * Math.sin((v * 6.5 - t * 0.45) * Math.PI * 2);
          const m1 = smoothstep(0.35, 0.88, v);
          const m2 = smoothstep(0.68, 0.98, v) * band;

          data[p] = c0.r + (c1.r - c0.r) * m1 + (c2.r - c1.r) * m2;
          data[p + 1] = c0.g + (c1.g - c0.g) * m1 + (c2.g - c1.g) * m2;
          data[p + 2] = c0.b + (c1.b - c0.b) * m1 + (c2.b - c1.b) * m2;
          data[p + 3] = 255;
          p += 4;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    if (reduced) {
      render(0);
      return;
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (start < 0) start = now;
      if (now - last < 33) return; // ~30 fps cap for max efficiency
      last = now;
      if (document.hidden) return;

      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      render(((now - start) / 1000) * speed);
    };

    raf = requestAnimationFrame(loop);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      tx = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      ty = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [speed, strength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ opacity, filter: 'blur(32px)' }}
      className={`pointer-events-none absolute inset-0 w-full h-full mix-blend-screen scale-110 ${className}`}
    />
  );
});

FluidAmbience.displayName = 'FluidAmbience';
