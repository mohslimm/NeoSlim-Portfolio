import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { ArrowDown, Sparkles, Globe, ChevronRight } from 'lucide-react';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const { t, toggleLanguage, language } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: easeAntigravity,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 134, 78, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 134, 78, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(197, 134, 78, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197, 134, 78, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Language Toggle */}
      <motion.button
        onClick={toggleLanguage}
        className="absolute top-8 right-8 z-20 flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm font-mono text-[#A1A1AA] hover:text-[#C5864E] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: easeAntigravity }}
      >
        <Globe className="w-4 h-4" />
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
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full antigravity-score"
            variants={floatingVariants}
            animate="animate"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#C5864E]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-[#C5864E]">
              {t('hero.badge') as string}
            </span>
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-[#A1A1AA] font-mono text-sm tracking-widest uppercase mb-4"
        >
          {t('hero.greeting') as string}
        </motion.p>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-[#F2F2F2] mb-6 tracking-tight"
        >
          Mohamed{' '}
          <span className="gradient-text italic">Slimani</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-[#A1A1AA] mb-4 font-light"
        >
          {t('hero.role') as string}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-[#A1A1AA]/70 text-base md:text-lg max-w-2xl mx-auto mb-12"
        >
          {t('hero.subtitle') as string}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#portfolio"
            className="group relative px-8 py-4 bg-[#C5864E] text-[#0A0A0B] rounded-full font-medium flex items-center gap-2 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <Sparkles className="w-5 h-5" />
            <span>{t('hero.ctaPrimary') as string}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#contact"
            className="px-8 py-4 glass-card text-[#F2F2F2] rounded-full font-medium flex items-center gap-2 hover:border-[#C5864E]/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t('hero.ctaSecondary') as string}</span>
          </motion.a>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute -left-20 top-1/2 w-20 h-20 rounded-full border border-[#C5864E]/20"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -right-16 top-1/3 w-12 h-12 rounded-full bg-[#C5864E]/10"
          animate={{
            y: [20, -20, 20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-1/4 -bottom-20 w-8 h-8 rounded-sm border border-[#C5864E]/30"
          style={{ rotate: 45 }}
          animate={{
            rotate: [45, 135, 45],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs font-mono text-[#A1A1AA]">{t('hero.scroll') as string}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-[#C5864E]" />
        </motion.div>
      </motion.div>

      {/* Side Stats */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: easeAntigravity }}
      >
        {[
          { value: '5+', label: 'Years Exp' },
          { value: '50+', label: 'Projects' },
          { value: '30+', label: 'Clients' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-right"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + index * 0.1, duration: 0.8 }}
          >
            <p className="font-mono text-2xl font-bold text-[#C5864E]">{stat.value}</p>
            <p className="font-mono text-xs text-[#A1A1AA]">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
