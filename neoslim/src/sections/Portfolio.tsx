import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { Star, ArrowUpRight } from 'lucide-react';
import { preloadProjectsPage } from '../lib/preload';
import { playClick } from '../lib/soundFx';

const MotionLink = motion(Link);
const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

import { useProjectStore } from '../stores/useProjectStore';
import type { ProjectCategory } from '../data/projectsData';

const filters: { key: ProjectCategory; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'development', label: 'Développement SaaS' },
  { key: 'productivity', label: 'Systèmes ERP' },
  { key: 'design', label: 'Design & Audits' },
  { key: 'niches', label: 'Pack Niches Stepping Stones' },
];

export function Portfolio() {
  const { t, language } = useI18n();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const projects = useProjectStore((s) => s.projects);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const getFilterLabel = (key: ProjectCategory) => {
    if (key === 'all') return (t('portfolio.filters.all') as string) || 'Tous';
    return (t(`portfolio.filters.${key}`) as string) || key;
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
              {getFilterLabel(filter.key)}
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
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                transition={{
                  duration: 0.55,
                  ease: easeAntigravity,
                  delay: index * 0.06,
                }}
                className="group relative"
              >
                <div className="luxury-card rounded-2xl overflow-hidden h-full flex flex-col bg-[#0a0a14]/75 border border-white/[0.08] hover:border-[#c5a059]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,160,89,0.14)] transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#14142a]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060610] via-black/20 to-transparent z-10 pointer-events-none" />
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Antigravity Score Badge */}
                    <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-[#060610]/80 border border-[#c5a059]/40 backdrop-blur-md">
                      <Star className="w-3 h-3 text-[#e8c77a] fill-[#e8c77a]" />
                      <span className="font-mono text-xs font-bold text-[#e8c77a]">
                        {project.antigravityScore}
                      </span>
                    </div>

                    {/* Year & Category Badge */}
                    <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#f0ede8]/80 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                        {project.year}
                      </span>
                      {project.isNichePack && (
                        <span className="font-mono text-[9px] text-[#c5a059] px-2 py-0.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 uppercase">
                          Niche
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-widest block mb-1.5">
                        {project.category}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#f0ede8] mb-2 group-hover:text-[#c5a059] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[#f0ede8]/70 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                        {language === 'fr' ? project.descriptionFr : project.descriptionEn}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-[10px] font-mono text-[#f0ede8]/60 bg-white/[0.03] border border-white/5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#c5a059] bg-[#c5a059]/10 rounded">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* View Project Link */}
                      <Link
                        to={`/projects/${project.id}`}
                        onClick={playClick}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-medium text-[#f0ede8] bg-white/[0.03] hover:bg-[#c5a059] hover:text-[#060610] border border-white/10 hover:border-[#c5a059] transition-all duration-300 group/link"
                        onMouseEnter={preloadProjectsPage}
                      >
                        <span>{t('portfolio.viewProject') as string}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
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

