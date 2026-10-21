import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { playClick } from '../lib/soundFx';
import { ArrowUpRight } from 'lucide-react';
import { preloadProjectsPage } from '../lib/preload';
import { AwwwardsProjectCard } from '../components/AwwwardsProjectCard';
import { useProjectStore } from '../stores/useProjectStore';

const MotionLink = motion(Link);
const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

type FilterMode = 'elite' | 'all' | 'development' | 'productivity' | 'niches';

const filters: { key: FilterMode; labelFr: string; labelEn: string }[] = [
  { key: 'elite', labelFr: 'Sélection d\'Élite', labelEn: 'Elite Selection' },
  { key: 'all', labelFr: 'Tous les 30 Systèmes', labelEn: 'All 30 Systems' },
  { key: 'development', labelFr: 'SaaS & IA', labelEn: 'SaaS & AI' },
  { key: 'productivity', labelFr: 'ERP & Métier', labelEn: 'ERP & Ops' },
  { key: 'niches', labelFr: 'Packs Niches', labelEn: 'Niche Packs' },
];

export function Portfolio() {
  const { t, language } = useI18n();
  const [activeFilter, setActiveFilter] = useState<FilterMode>('elite');
  const projects = useProjectStore((s) => s.projects);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'elite') {
      // Top 6 flagship systems
      const flagshipIds = [
        'el-mouhami-pro',
        'aegis-alpha-terminal',
        'gestia-concierge',
        'kachef-os',
        'stonelink-sandbox',
        'anis-phone-atlas',
      ];
      const selected = projects.filter((p) => flagshipIds.includes(p.id));
      return selected.length > 0 ? selected : projects.slice(0, 6);
    }
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  const getFilterCount = (key: FilterMode) => {
    if (key === 'elite') return 6;
    if (key === 'all') return projects.length;
    return projects.filter((p) => p.category === key).length;
  };

  const getFilterLabel = (filter: typeof filters[number]) => {
    const base = language === 'fr' ? filter.labelFr : filter.labelEn;
    return `${base} (${getFilterCount(filter.key)})`;
  };

  return (
    <section id="portfolio" className="relative py-32 bg-[#060610] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: easeAntigravity }}
        >
          <motion.span
            className="inline-block badge-luxury mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('portfolio.subtitle') as string}
          </motion.span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#f0ede8] mb-6">
            {t('portfolio.title') as string}{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#f0ede8] via-[#e8c77a] to-[#c5a059]">
              Sélection
            </span>
          </h2>
          <p className="text-[#f0ede8]/70 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {t('portfolio.description') as string}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => {
                playClick();
                setActiveFilter(filter.key);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border ${
                activeFilter === filter.key
                  ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e8c77a] shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                  : 'border-white/10 bg-white/[0.02] text-[#f0ede8]/70 hover:border-[#c5a059]/40 hover:text-[#f0ede8]'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {getFilterLabel(filter)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <AwwwardsProjectCard
                key={project.id}
                project={project}
                index={index}
                language={language}
                viewProjectLabel={(t('portfolio.viewProject') as string) || 'Explorer le Système'}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <MotionLink
            to="/projects"
            onClick={playClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-mono font-semibold tracking-wider bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] shadow-[0_4px_25px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={preloadProjectsPage}
          >
            <span>{language === 'fr' ? 'Explorer les 26 Réalisations' : 'Explore All 26 Architectures'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}

Portfolio.displayName = 'Portfolio';

