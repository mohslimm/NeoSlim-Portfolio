import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { Menu, X, Globe } from 'lucide-react';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

const navLinks = [
  { label: 'nav.home', href: '#hero' },
  { label: 'nav.showcase3d', href: '#showcase3d' },
  { label: 'nav.skills', href: '#skills' },
  { label: 'nav.portfolio', href: '#portfolio' },
  { label: 'nav.niches', href: '#niches' },
  { label: 'nav.contact', href: '#contact' },
];

export function Navigation() {
  const { t, toggleLanguage, language } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeAntigravity }}
      >
        <div className={`max-w-6xl mx-auto rounded-full transition-all duration-500 px-5 md:px-7 py-3 ${
          isScrolled
            ? 'bg-[#060610]/85 backdrop-blur-2xl border border-[#c5a059]/25 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
            : 'bg-[#060610]/50 backdrop-blur-xl border border-white/10 shadow-lg'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative">
                <img
                  src="./logo.png"
                  alt="NeoSlim Logo"
                  className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-serif text-sm font-bold tracking-wider text-[#f0ede8] group-hover:text-[#c5a059] transition-colors">
                  MOHAMED SLIMANI
                </span>
                <span className="font-mono text-[9px] text-[#c5a059] tracking-widest uppercase">
                  Stepping Stones
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-xs font-mono tracking-wider text-[#f0ede8]/70 hover:text-[#f0ede8] transition-colors py-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.5 }}
                >
                  {t(link.label) as string}
                </motion.a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle Pill */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 hover:border-[#c5a059]/50 text-[#f0ede8] hover:text-[#e8c77a] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Switch Language (FR / EN)"
              >
                <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="font-semibold tracking-wider">{language.toUpperCase()}</span>
              </motion.button>

              {/* Contact Direct CTA Button */}
              <motion.a
                href="#contact"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] hover:scale-105 active:scale-95 transition-all shadow-[0_2px_12px_rgba(197,160,89,0.3)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{language === 'fr' ? 'Me Contacter' : 'Get in Touch'}</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-[#f0ede8] bg-white/[0.05] border border-white/10 hover:border-[#c5a059]/40 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 text-[#c5a059]" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: easeAntigravity }}
            >
              <ul className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg text-[#F2F2F2] hover:text-[#C5864E] transition-colors border-b border-[#A1A1AA]/10"
                    >
                      {t(link.label) as string}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
