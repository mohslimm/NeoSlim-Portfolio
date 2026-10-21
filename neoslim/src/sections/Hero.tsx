import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { ArrowDown, Sparkles, Globe, ChevronRight, Rotate3d, FileText } from 'lucide-react';
import { FluidAmbience } from '../components/FluidAmbience';
import { ScrambleText } from '../components/ScrambleText';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const { t, toggleLanguage, language } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: easeAntigravity,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-6, 6, -6],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060610] text-[#f0ede8] pt-20 pb-16">
      {/* Dynamic Fluid Ambience Shader (Quiet Luxury) */}
      <FluidAmbience opacity={0.35} speed={0.8} />

      {/* Volumetric Radial Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Precision Grid Hairlines */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(197, 160, 89, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197, 160, 89, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Language Toggle */}
      <motion.button
        onClick={toggleLanguage}
        className="absolute top-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f0f20]/80 border border-[#c5a059]/30 text-xs font-mono text-[#f0ede8]/80 hover:text-[#c5a059] transition-all hover:border-[#c5a059] shadow-lg backdrop-blur-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: easeAntigravity }}
        aria-label="Changer de langue"
      >
        <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
        <span>{language.toUpperCase()}</span>
      </motion.button>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a0a14] border border-[#c5a059]/40 shadow-[0_0_20px_rgba(197,160,89,0.12)]"
            variants={floatingVariants}
            animate="animate"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span className="font-mono text-xs tracking-wider text-[#e8c77a]">
              {t('hero.badge') as string}
            </span>
          </motion.div>
        </motion.div>

        {/* Agency Hook */}
        <motion.p
          variants={itemVariants}
          className="text-[#c5a059] font-mono text-xs md:text-sm tracking-[0.28em] uppercase mb-4"
        >
          {t('hero.greeting') as string}
        </motion.p>

        {/* Main Title — Editorial Awwwards Standard */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-[#f0ede8] mb-6 tracking-tight drop-shadow-2xl leading-[1.05]"
        >
          Mohamed{' '}
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f0ede8] via-[#e8c77a] to-[#c5a059]">
            Slimani
          </span>
        </motion.h1>

        {/* Role Scramble */}
        <motion.div
          variants={itemVariants}
          className="text-base sm:text-xl md:text-2xl text-[#e8c77a] mb-5 font-light font-mono tracking-wide"
        >
          <ScrambleText text={t('hero.role') as string} duration={0.8} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-[#f0ede8]/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          {t('hero.subtitle') as string}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#showcase3d"
            className="group relative px-6 py-3.5 rounded-full font-semibold flex items-center gap-2.5 overflow-hidden bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] shadow-[0_0_30px_rgba(197,160,89,0.35)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Rotate3d className="w-4 h-4 text-[#1A1200]" />
            <span className="text-sm font-mono tracking-wider">
              {language === 'fr' ? 'Matrice 3D' : '3D Matrix'}
            </span>
            <ChevronRight className="w-4 h-4 text-[#1A1200] group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#portfolio"
            className="px-6 py-3.5 rounded-full bg-[#0a0a14] border border-[#c5a059]/40 hover:border-[#c5a059] text-[#f0ede8] text-sm font-mono tracking-wider flex items-center gap-2 transition-all hover:bg-[#c5a059]/10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>{t('hero.ctaPrimary') as string}</span>
          </motion.a>

          <motion.a
            href="#dossiers"
            className="px-6 py-3.5 rounded-full bg-[#0f0f20] border border-white/[0.08] hover:border-[#c5a059]/50 text-[#e8c77a] text-sm font-mono tracking-wider flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText className="w-4 h-4 text-[#c5a059]" />
            <span>{language === 'fr' ? '30 Dossiers Word' : '30 Word Dossiers'}</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Side Stats HUD (Left) */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 p-4 rounded-2xl bg-[#0a0a14]/60 border border-white/[0.06] backdrop-blur-md"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.9, ease: easeAntigravity }}
        aria-hidden="true"
      >
        {[
          { value: '30', label: language === 'fr' ? 'Systèmes Déployés' : 'Deployed Systems' },
          { value: '0.74ms', label: 'MT5 IPC Bridge' },
          { value: '58', label: 'Wilayas COD Radar' },
          { value: '99/100', label: 'Antigravity Score' },
        ].map((stat, index) => (
          <div key={index} className="text-left font-mono">
            <p className="text-xl font-bold text-[#c5a059] tabular-nums tracking-tight">{stat.value}</p>
            <p className="text-[10px] text-[#f0ede8]/50 uppercase tracking-widest mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#f0ede8]/40">
          {t('hero.scroll') as string}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#c5a059]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
