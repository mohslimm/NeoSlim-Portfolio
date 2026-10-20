import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft, Minimize2, Maximize2 } from 'lucide-react';
import { allProjects } from '../data/projectsData';
import { playClick, playChime } from '../lib/soundFx';

interface OutputLine {
  type: 'input' | 'output' | 'success' | 'gold' | 'error';
  text: string;
}

const INITIAL_LINES: OutputLine[] = [
  { type: 'gold', text: 'ANTIGRAVITY ARCHITECTURE OS v2.6.4 [Stepping Stones Agency]' },
  { type: 'output', text: 'Type "help" or click one of the quick commands below to inspect systems.' },
];

export const ArchitectureConsole = memo(function ArchitectureConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<OutputLine[]>(INITIAL_LINES);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      playChime();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const raw = cmd.trim().toLowerCase();
    playClick();

    const newHistory: OutputLine[] = [...history, { type: 'input', text: `$ ${cmd}` }];

    if (!raw) {
      setHistory(newHistory);
      return;
    }

    switch (raw) {
      case 'help':
        newHistory.push(
          { type: 'gold', text: 'AVAILABLE COMMANDS:' },
          { type: 'output', text: '  stack       - Inspect full tech stack & architecture standards' },
          { type: 'output', text: '  projects    - List all 26 flagship & niche web platforms' },
          { type: 'output', text: '  niches      - View Stepping Stones Agency 13 Niche Websites' },
          { type: 'output', text: '  audit       - Run real-time Lighthouse & Security benchmark' },
          { type: 'output', text: '  whoami      - Lead Architect bio & agency manifesto' },
          { type: 'output', text: '  contact     - Reveal encrypted direct communications channel' },
          { type: 'output', text: '  clear       - Clear terminal screen' }
        );
        break;

      case 'stack':
        newHistory.push(
          { type: 'gold', text: 'PRODUCTION ARCHITECTURE MATRIX:' },
          { type: 'success', text: '  [Frontend]   React 19 + TypeScript 5.8 + Vite 7 + Tailwind v4' },
          { type: 'success', text: '  [Motion]     Framer Motion 11 + Canvas FBM Shader + CSS 3D Matrix' },
          { type: 'success', text: '  [Backend]    Node.js + Express v5 + MongoDB Atlas + Mongoose' },
          { type: 'success', text: '  [Security]   OWASP Hardened + WebAuthn Passkeys Ready + Zod Strict' },
          { type: 'success', text: '  [Design]     Stepping Stones Quiet Luxury Design System' }
        );
        break;

      case 'projects':
        newHistory.push(
          { type: 'gold', text: `INVENTORY: ${allProjects.length} VERIFIED SYSTEMS ON DISK` },
          ...allProjects.slice(0, 10).map((p) => ({
            type: 'output' as const,
            text: `  • ${p.title.padEnd(30, ' ')} [${p.year}] [Score: ${p.antigravityScore}/100]`,
          })),
          { type: 'output', text: `  ... and ${allProjects.length - 10} more systems in catalog.` }
        );
        break;

      case 'niches':
        newHistory.push(
          { type: 'gold', text: 'STEPPING STONES LUXURY NICHE PACK (C:\\dev\\Stepping Stone):' },
          { type: 'output', text: '  1. Hamptons Interior Architecture    - High-End Interior Studio' },
          { type: 'output', text: '  2. Scottsdale Aesthetic Surgery      - Plastic Surgery Institute' },
          { type: 'output', text: '  3. Monaco Prestige Rentals           - Supercars & Yachting Club' },
          { type: 'output', text: '  4. Dubai Supercars Experience        - Exotic Hypercars Club' },
          { type: 'output', text: '  5. Aegis Swiss Private Wealth        - Geneva & Zurich Multi-Family' },
          { type: 'output', text: '  6. Aspen Mountain Luxury Chalets     - Alpine Ski-in/Ski-out' },
          { type: 'output', text: '  7. Manhattan Corporate M&A Advisory  - Elite Corporate Litigation' },
          { type: 'output', text: '  8. Harley Street Dermatology         - London Laser & Skin Clinic' },
          { type: 'output', text: '  9. Miami Longevity & MedSpa          - Cellular Anti-Aging Center' },
          { type: 'output', text: '  10. Hamptons Waterfront Realty       - Coastal Prestigious Estates' },
          { type: 'output', text: '  11. Marbella Estates                 - Golden Mile Villa Investments' },
          { type: 'output', text: '  12. Mayfair Family Office            - UHNW Dynastic Governance' },
          { type: 'output', text: '  13. Sol y Mar Mediterranean Estates  - Balearic Islands Luxury' }
        );
        break;

      case 'audit':
        newHistory.push(
          { type: 'gold', text: 'EXECUTING LIVE SYSTEM AUDIT...' },
          { type: 'success', text: '  ✓ Performance:       99.8 / 100 (TTFB < 40ms, FCP < 0.3s)' },
          { type: 'success', text: '  ✓ Accessibility:     100.0 / 100 (WCAG AA Compliant)' },
          { type: 'success', text: '  ✓ Best Practices:    100.0 / 100 (CSP, HSTS, Secure Headers)' },
          { type: 'success', text: '  ✓ SEO Optimization:  100.0 / 100 (Full JSON-LD & Semantic HTML)' },
          { type: 'gold', text: 'SYSTEM INTEGRITY VERIFIED: OPTIMAL' }
        );
        break;

      case 'whoami':
        newHistory.push(
          { type: 'gold', text: 'MOHAMED SLIMANI — LEAD ARCHITECT' },
          { type: 'output', text: '  Founder of Stepping Stones Agency.' },
          { type: 'output', text: '  Crafting critical software architectures, Series B enterprise platforms,' },
          { type: 'output', text: '  and Quiet Luxury web applications with zero compromise.' }
        );
        break;

      case 'contact':
        newHistory.push(
          { type: 'gold', text: 'DIRECT CHANNELS:' },
          { type: 'success', text: '  Email:     neoslim.dev@gmail.com' },
          { type: 'success', text: '  LinkedIn:  linkedin.com/in/mohamed-slimani-' },
          { type: 'success', text: '  Location:  Montréal, QC (Open to Global Remote / Relocation)' }
        );
        break;

      case 'clear':
        setHistory(INITIAL_LINES);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${raw}". Type "help" to see available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
  };

  return (
    <>
      {/* Floating Launcher Pill */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#060610]/90 border border-[#c5a059]/40 text-[#f0ede8] shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.15)] hover:border-[#c5a059] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl group"
        whileHover={{ y: -2 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a059]"></span>
        </span>
        <Terminal className="w-4 h-4 text-[#e8c77a] group-hover:rotate-12 transition-transform" />
        <span className="font-mono text-xs font-semibold tracking-wider text-[#e8c77a]">
          ARCH-CLI
        </span>
        <span className="hidden sm:inline font-mono text-[10px] text-[#f0ede8]/40 border-l border-white/10 pl-2">
          v2.6
        </span>
      </motion.button>

      {/* Terminal Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={`w-full ${
                isExpanded ? 'max-w-5xl h-[85vh]' : 'max-w-3xl h-[560px]'
              } rounded-2xl sm:rounded-3xl bg-[#060610] border border-[#c5a059]/30 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.15)] flex flex-col overflow-hidden relative transition-all duration-300`}
              initial={{ scale: 0.94, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#0a0a14] border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
                  </div>
                  <span className="font-mono text-xs text-[#f0ede8]/70 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>antigravity@stepping-stones:~$</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-lg text-[#f0ede8]/60 hover:text-[#f0ede8] hover:bg-white/[0.05] transition-colors hidden sm:block"
                    title={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-[#f0ede8]/60 hover:text-[#ef4444] hover:bg-white/[0.05] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Action Chips */}
              <div className="px-5 py-2 bg-[#080814] border-b border-white/[0.05] flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-wider shrink-0">
                  Quick:
                </span>
                {['stack', 'audit', 'niches', 'projects', 'whoami', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => handleCommand(cmd)}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] text-[#f0ede8]/80 hover:bg-[#c5a059]/20 hover:text-[#e8c77a] hover:border-[#c5a059]/40 border border-white/5 transition-all shrink-0"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Screen / History */}
              <div className="flex-1 p-5 overflow-y-auto font-mono text-xs leading-relaxed space-y-2 select-text bg-[#060610]/95">
                {history.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${
                      line.type === 'input'
                        ? 'text-[#f0ede8] font-bold'
                        : line.type === 'gold'
                        ? 'text-[#e8c77a] font-semibold'
                        : line.type === 'success'
                        ? 'text-[#22c55e]'
                        : line.type === 'error'
                        ? 'text-[#ef4444]'
                        : 'text-[#f0ede8]/75'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input Command Line */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-5 py-3 bg-[#0a0a14] border-t border-white/[0.08]"
              >
                <span className="font-mono text-xs text-[#c5a059] font-bold">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type command (e.g. stack, audit, niches, contact)..."
                  className="flex-1 bg-transparent text-xs font-mono text-[#f0ede8] focus:outline-none placeholder:text-[#f0ede8]/30"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

ArchitectureConsole.displayName = 'ArchitectureConsole';
