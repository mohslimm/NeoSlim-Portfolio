import { memo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Award, Sparkles, Terminal, Database } from 'lucide-react';

interface MarqueeItem {
  icon: typeof ShieldCheck;
  label: string;
  metric: string;
}

const ITEMS: MarqueeItem[] = [
  { icon: ShieldCheck, label: 'FIDO2 / OWASP Security Hardened', metric: 'GRADE A+' },
  { icon: Zap, label: 'Lighthouse Web Core Vitals', metric: '99.8 / 100' },
  { icon: Terminal, label: 'MERN & React 19 Full-Stack', metric: 'HIGH LOAD' },
  { icon: Database, label: 'PostgreSQL / Prisma / Redis', metric: '<12ms LATENCY' },
  { icon: Award, label: 'Stepping Stones Luxury Pack', metric: '13 ECOSYSTEMS' },
  { icon: Sparkles, label: 'Zero Cumulative Layout Shift', metric: 'CLS < 0.01' },
];

export const ClientMarquee = memo(function ClientMarquee() {
  return (
    <div className="relative w-full py-8 overflow-hidden border-y border-white/[0.06] bg-[#060610]/80 backdrop-blur-md">
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#060610] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#060610] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex select-none">
        <motion.div
          className="flex shrink-0 items-center gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3.5 group cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059]/40 transition-colors">
                  <Icon className="w-4 h-4 text-[#e8c77a]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-sm tracking-wide text-[#f0ede8]/90 font-medium">
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] text-[#c5a059] font-bold bg-[#c5a059]/10 border border-[#c5a059]/20 px-2 py-0.5 rounded-full">
                    {item.metric}
                  </span>
                </div>
                <span className="text-[#c5a059]/40 text-xs ml-4">✦</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
});

ClientMarquee.displayName = 'ClientMarquee';
