import { memo } from 'react';

interface SovereignBrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const SovereignBrandMark = memo(({ 
  size = 'md', 
  showText = true,
  className = '' 
}: SovereignBrandMarkProps) => {
  // Balanced dimensions to ensure zero visual clutter
  const dimensions = {
    sm: { icon: 30, textTitle: 'text-[12px]', textSub: 'text-[7.5px]', gap: 'gap-2.5' },
    md: { icon: 34, textTitle: 'text-[13px]', textSub: 'text-[8px]', gap: 'gap-2.5' },
    lg: { icon: 42, textTitle: 'text-[15px]', textSub: 'text-[9px]', gap: 'gap-3' },
  }[size];

  return (
    <div className={`flex items-center ${dimensions.gap} group select-none ${className}`}>
      {/* Monolithic Stepping Stone Geometric Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 ease-out group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Subtle Outer Glow Filter */}
          <defs>
            <linearGradient id="sovereignGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8c77a" />
              <stop offset="50%" stopColor="#c5a059" />
              <stop offset="100%" stopColor="#9a7b38" />
            </linearGradient>
            <radialGradient id="sovereignVoidAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(197, 160, 89, 0.22)" />
              <stop offset="100%" stopColor="rgba(6, 6, 16, 0)" />
            </radialGradient>
          </defs>

          {/* Ambient core glow */}
          <circle cx="20" cy="20" r="16" fill="url(#sovereignVoidAura)" />

          {/* Precision Octagonal Frame */}
          <polygon
            points="12,4 28,4 36,12 36,28 28,36 12,36 4,28 4,12"
            fill="#090a16"
            stroke="url(#sovereignGoldGrad)"
            strokeWidth="1.2"
            className="transition-all duration-300 group-hover:stroke-[#e8c77a]"
          />

          {/* Inner Inset Geometric Hairline */}
          <polygon
            points="13.5,7 26.5,7 33,13.5 33,26.5 26.5,33 13.5,33 7,26.5 7,13.5"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {/* Stepped Monolith Apex (Stepping Stones Motif) */}
          <path
            d="M13 27L20 23L27 27"
            stroke="url(#sovereignGoldGrad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 21L20 17.5L25 21"
            stroke="#f0ede8"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:stroke-[#e8c77a]"
          />
          <path
            d="M17.5 15L20 12.5L22.5 15"
            stroke="url(#sovereignGoldGrad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Keystone Monogram Pivot */}
          <circle cx="20" cy="20" r="1.2" fill="#c5a059" />
        </svg>

        {/* Ambient Hover Halo Ring */}
        <div className="absolute -inset-0.5 rounded-full border border-[#c5a059]/0 group-hover:border-[#c5a059]/35 group-hover:shadow-[0_0_15px_rgba(197,160,89,0.25)] transition-all duration-300 pointer-events-none" />
      </div>

      {/* Brand Typography Lockup */}
      {showText && (
        <div className="flex flex-col text-left justify-center">
          <span className={`font-serif ${dimensions.textTitle} font-semibold tracking-[0.12em] text-[#f0ede8] group-hover:text-[#e8c77a] transition-colors leading-tight whitespace-nowrap`}>
            MOHAMED SLIMANI
          </span>
          <span className={`font-mono ${dimensions.textSub} text-[#c5a059] tracking-[0.22em] uppercase font-light leading-none mt-1 whitespace-nowrap opacity-90`}>
            Stepping Stones
          </span>
        </div>
      )}
    </div>
  );
});

SovereignBrandMark.displayName = 'SovereignBrandMark';
