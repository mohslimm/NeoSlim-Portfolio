import { useEffect, useRef, useState, useCallback, memo, type ElementType } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@*+=/<>[]{}';

interface ScrambleTextProps {
  text: string;
  duration?: number;
  as?: ElementType;
  className?: string;
  triggerOnHover?: boolean;
}

export const ScrambleText = memo(function ScrambleText({
  text,
  duration = 0.8,
  as: Component = 'span',
  className = '',
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const containerRef = useRef<HTMLElement>(null);

  const scramble = useCallback(() => {
    if (isScramblingRef.current || !text) return;
    isScramblingRef.current = true;

    const start = performance.now();
    const durationMs = duration * 1000;

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(1, elapsed / durationMs);

      if (progress >= 1) {
        setDisplayText(text);
        isScramblingRef.current = false;
        return;
      }

      const resolvedCount = Math.floor(text.length * progress);
      let result = text.slice(0, resolvedCount);

      for (let i = resolvedCount; i < text.length; i++) {
        const char = text[i];
        if (char === ' ' || char === '\n' || char === '\t') {
          result += char;
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    // Initial scramble on mount
    scramble();
  }, [scramble]);

  return (
    <Component
      ref={containerRef}
      className={className}
      onMouseEnter={triggerOnHover ? scramble : undefined}
    >
      {displayText}
    </Component>
  );
});

ScrambleText.displayName = 'ScrambleText';
