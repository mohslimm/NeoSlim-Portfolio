import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { Star, ArrowUpRight, FolderGit2, MapPin, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { allProjects, type ProjectItem } from '../data/projectsData';
import { preloadProjectsPage } from '../lib/preload';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

type NicheSectorFilter = 'all' | 'wealth' | 'realestate' | 'medical' | 'luxury';

export function NichePackShowcase() {
  const { t, language } = useI18n();
  const [activeSector, setActiveSector] = useState<NicheSectorFilter>('all');

  const nicheProjects: ProjectItem[] = allProjects.filter((p) => p.isNichePack);

  const filteredNiches = nicheProjects.filter((project) => {
    if (activeSector === 'all') return true;
    if (activeSector === 'wealth') {
      return (
        project.id === 'niche-swiss-wealth' ||
        project.id === 'niche-family-office-london' ||
        project.id === 'niche-manhattan-law'
      );
    }
    if (activeSector === 'realestate') {
      return (
        project.id === 'niche-hamptons-realty' ||
        project.id === 'niche-marbella-estates' ||
        project.id === 'niche-aspen-chalets' ||
        project.id === 'niche-sol-y-mar'
      );
    }
    if (activeSector === 'medical') {
      return (
        project.id === 'niche-scottsdale-plastics' ||
        project.id === 'niche-london-derma' ||
        project.id === 'niche-miami-medspa'
      );
    }
    if (activeSector === 'luxury') {
      return (
        project.id === 'niche-monaco-rentals' ||
        project.id === 'niche-dubai-supercars' ||
        project.id === 'niche-hamptons-interior'
      );
    }
    return true;
  });

  const sectorFilters: { key: NicheSectorFilter; label: string; count: number }[] = [
    {
      key: 'all',
      label: language === 'fr' ? 'Toutes les Niches' : 'All Niches',
      count: nicheProjects.length,
    },
    {
      key: 'wealth',
      label: language === 'fr' ? 'Banque Privée & Droit' : 'Private Wealth & Law',
      count: 3,
    },
    {
      key: 'realestate',
      label: language === 'fr' ? 'Immobilier de Prestige' : 'Prestigious Estates',
      count: 4,
    },
    {
      key: 'medical',
      label: language === 'fr' ? 'Chirurgie & Esthétique' : 'Aesthetic Medicine',
      count: 3,
    },
    {
      key: 'luxury',
      label: language === 'fr' ? 'Supercars & Lifestyle' : 'Supercars & Lifestyle',
      count: 3,
    },
  ];

  return (
    <section id="niches" className="relative py-28 bg-[#060610] overflow-hidden border-t border-white/5">
      {/* Background glow ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: easeAntigravity }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="font-mono text-xs font-semibold text-[#c5a059] tracking-wider uppercase">
              {t('nichePack.badge') as string}
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#f0ede8] mb-6 tracking-tight">
            {t('nichePack.title') as string}{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#e8c77a] via-[#c5a059] to-[#8d6f30]">
              {t('nichePack.highlight') as string}
            </span>
          </h2>

          <p className="text-[#f0ede8]/70 text-base md:text-lg leading-relaxed font-light mb-8">
            {t('nichePack.description') as string}
          </p>

          {/* Local Folder Source Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#f0ede8]/80 shadow-inner">
            <FolderGit2 className="w-4 h-4 text-[#c5a059]" />
            <span>C:\dev\Stepping Stone</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse ml-1" />
            <span className="text-[10px] text-[#22c55e] uppercase tracking-wider font-semibold">13 Sites Actifs</span>
          </div>
        </motion.div>

        {/* Agency Metrics Banner */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
            <Layers className="w-5 h-5 text-[#c5a059] mx-auto mb-2" />
            <div className="font-serif text-2xl font-bold text-[#f0ede8]">{t('nichePack.stats.count') as string}</div>
            <div className="text-xs text-[#f0ede8]/50 font-mono mt-1">{t('nichePack.stats.countSub') as string}</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
            <Zap className="w-5 h-5 text-[#c5a059] mx-auto mb-2" />
            <div className="font-serif text-2xl font-bold text-[#f0ede8]">{t('nichePack.stats.conversion') as string}</div>
            <div className="text-xs text-[#f0ede8]/50 font-mono mt-1">{t('nichePack.stats.conversionSub') as string}</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
            <ShieldCheck className="w-5 h-5 text-[#c5a059] mx-auto mb-2" />
            <div className="font-serif text-2xl font-bold text-[#f0ede8]">{t('nichePack.stats.leadGen') as string}</div>
            <div className="text-xs text-[#f0ede8]/50 font-mono mt-1">{t('nichePack.stats.leadGenSub') as string}</div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
            <Star className="w-5 h-5 text-[#c5a059] mx-auto mb-2 fill-[#c5a059]" />
            <div className="font-serif text-2xl font-bold text-[#f0ede8]">{t('nichePack.stats.quietLuxury') as string}</div>
            <div className="text-xs text-[#f0ede8]/50 font-mono mt-1">{t('nichePack.stats.quietLuxurySub') as string}</div>
          </div>
        </motion.div>

        {/* Sector Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {sectorFilters.map((sector) => {
            const isActive = activeSector === sector.key;
            return (
              <button
                key={sector.key}
                type="button"
                onClick={() => setActiveSector(sector.key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e8c77a] shadow-lg shadow-[#c5a059]/10'
                    : 'bg-white/[0.02] border-white/10 text-[#f0ede8]/70 hover:border-[#c5a059]/40 hover:text-[#f0ede8]'
                }`}
              >
                <span>{sector.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-[#c5a059] text-[#060610] font-bold' : 'bg-white/10 text-[#f0ede8]/60'
                  }`}
                >
                  {sector.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Niche Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredNiches.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{
                  duration: 0.5,
                  ease: easeAntigravity,
                  delay: index * 0.04,
                }}
                className="group relative"
              >
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-[#c5a059]/40 hover:shadow-2xl hover:shadow-[#c5a059]/10 transition-all duration-500 bg-[#0a0a14]/60 backdrop-blur-md">
                  {/* Image Presentation */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#14142a]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060610] via-transparent to-black/30 pointer-events-none" />

                    {/* Location Badge */}
                    {project.location && (
                      <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                        <MapPin className="w-3 h-3 text-[#c5a059]" />
                        <span className="font-mono text-[10px] text-[#f0ede8]/90 font-medium">
                          {project.location}
                        </span>
                      </div>
                    )}

                    {/* Antigravity Score */}
                    <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c5a059]/20 backdrop-blur-md border border-[#c5a059]/40">
                      <Star className="w-3 h-3 text-[#e8c77a] fill-[#e8c77a]" />
                      <span className="font-mono text-xs font-bold text-[#e8c77a]">
                        {project.antigravityScore}
                      </span>
                    </div>

                    {/* Sector Tag overlay */}
                    {project.nicheSector && (
                      <div className="absolute bottom-3 left-3.5 z-10">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#060610]/80 border border-white/10 text-[10px] font-mono text-[#c5a059] uppercase tracking-wider">
                          {project.nicheSector}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#f0ede8] mb-2 group-hover:text-[#c5a059] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#c5a059]/90 font-serif italic mb-3">
                        {language === 'fr' ? project.taglineFr : project.taglineEn}
                      </p>
                      <p className="text-[#f0ede8]/70 text-xs leading-relaxed line-clamp-3 mb-5">
                        {language === 'fr' ? project.descriptionFr : project.descriptionEn}
                      </p>
                    </div>

                    <div>
                      {/* Key Achievement Badge */}
                      <div className="mb-4 p-2.5 rounded-xl bg-[#c5a059]/5 border border-[#c5a059]/15 flex items-start gap-2">
                        <Star className="w-3 h-3 text-[#c5a059] shrink-0 mt-0.5" />
                        <span className="text-[11px] text-[#f0ede8]/90 font-medium line-clamp-1">
                          {language === 'fr' ? project.keyAchievementFr : project.keyAchievementEn}
                        </span>
                      </div>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-mono text-[#f0ede8]/60 bg-white/[0.04] border border-white/5 rounded"
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

                      {/* Action Link to Full Project Modal */}
                      <Link
                        to={`/projects/${project.id}`}
                        onMouseEnter={preloadProjectsPage}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-medium text-[#f0ede8] bg-white/[0.03] hover:bg-[#c5a059] hover:text-[#060610] border border-white/10 hover:border-[#c5a059] transition-all duration-300 group/btn"
                      >
                        <span>{t('nichePack.ctaDetails') as string}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to view all in Projects Page */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/projects"
            onMouseEnter={preloadProjectsPage}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] shadow-xl shadow-[#c5a059]/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>{language === 'fr' ? 'Explorer les 26 Réalisations Complètes' : 'Explore All 26 Complete Projects'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

NichePackShowcase.displayName = 'NichePackShowcase';
