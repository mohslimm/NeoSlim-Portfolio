import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Filter, ArrowUpRight, X, Globe } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { allProjects, type ProjectCategory } from '../data/projectsData';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface UnifiedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  antigravityScore: number;
  year: string;
  tags: string[];
  fullDescription: string;
  githubUrl?: string;
  demoUrl?: string;
  gallery?: string[];
  tagline?: string;
  keyAchievement?: string;
  isNichePack?: boolean;
  nicheSector?: string;
  location?: string;
}

export function ProjectsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { t, language, toggleLanguage } = useI18n();
  
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
  }, []);

  const unifiedProjects: UnifiedProject[] = allProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: language === 'fr' ? p.descriptionFr : p.descriptionEn,
    image: p.image,
    category: p.category,
    antigravityScore: p.antigravityScore,
    year: p.year,
    tags: p.tags,
    fullDescription: language === 'fr' ? p.fullDescriptionFr : p.fullDescriptionEn,
    githubUrl: p.githubUrl,
    demoUrl: p.demoUrl,
    gallery: p.gallery,
    tagline: language === 'fr' ? p.taglineFr : p.taglineEn,
    keyAchievement: language === 'fr' ? p.keyAchievementFr : p.keyAchievementEn,
    isNichePack: p.isNichePack,
    nicheSector: p.nicheSector,
    location: p.location,
  }));

  const filteredProjects = activeFilter === 'all'
    ? unifiedProjects
    : unifiedProjects.filter((p) => p.category === activeFilter);

  const activeProject = unifiedProjects.find((p) => {
    if (p.id === id) return true;
    if (id === '7' && p.id === 'stonelink') return true;
    if (id === '8' && p.id === 'nexus-horizon') return true;
    if (id === '9' && p.id === 'tropicalboat') return true;
    if (id === '1' && p.id === 'anis-phone') return true;
    if (id === '2' && p.id === 'kachef') return true;
    if (id === '3' && p.id === 'resortos') return true;
    if (id === '4' && p.id === 'commercia') return true;
    if (id === '5' && p.id === 'autoshine-pro') return true;
    if (id === '6' && p.id === 'parfait-voyage') return true;
    return false;
  });

  const modalDisplayImage = selectedGalleryImg || activeProject?.image || '';

  const filters: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: language === 'fr' ? `Tous (${unifiedProjects.length})` : `All (${unifiedProjects.length})` },
    { key: 'development', label: language === 'fr' ? 'Développement SaaS' : 'SaaS Development' },
    { key: 'productivity', label: language === 'fr' ? 'Systèmes ERP' : 'ERP Systems' },
    { key: 'design', label: language === 'fr' ? 'Design & Audits' : 'Design & Audits' },
    { key: 'niches', label: language === 'fr' ? 'Pack Niches Stepping Stones (13)' : 'Stepping Stones Niche Pack (13)' },
  ];

  // Close modal callback
  const handleCloseModal = useCallback(() => {
    setSelectedGalleryImg(null);
    navigate('/projects');
  }, [navigate]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && id) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, handleCloseModal]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (id) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F2F2F2] py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 134, 78, 0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 134, 78, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation / Header */}
        <header className="flex items-center justify-between mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121214] border border-[#F2F2F2]/5 text-sm text-[#A1A1AA] hover:text-[#F2F2F2] hover:border-[#C5864E]/40 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t('portfolio.backToHome') as string}</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <motion.img
                src="./logo.png"
                alt="NeoSlim Logo"
                className="h-16 w-auto object-contain"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </Link>

            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F2F2F2] hover:bg-[#1a1a1a] transition-colors border border-[#F2F2F2]/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="font-mono">{language.toUpperCase()}</span>
            </motion.button>
          </div>
        </header>

        {/* Title area */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block font-mono text-sm text-[#C5864E] tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {language === 'fr' ? 'Portfolio Complet' : 'Complete Portfolio'}
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            {t('portfolio.allProjects') as string}{' '}
            <span className="italic gradient-text">Collection</span>
          </motion.h1>
          <motion.p
            className="text-[#A1A1AA] text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {language === 'fr'
              ? 'Une immersion dans mes réalisations numériques. Chaque projet représente un défi relevé entre design interactif et perfection technique.'
              : 'A deep dive into my digital creations. Each project represents a challenge solved between interactive design and technical perfection.'}
          </motion.p>
        </div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-3 mb-16 border-b border-[#F2F2F2]/5 pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Filter className="w-5 h-5 text-[#A1A1AA] mr-2" />
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border relative ${
                activeFilter === filter.key
                  ? 'border-[#C5864E] text-[#C5864E] bg-[#C5864E]/5'
                  : 'border-[#A1A1AA]/10 text-[#A1A1AA] hover:border-[#C5864E]/30 hover:text-[#F2F2F2]'
              }`}
            >
              {filter.label}
              {activeFilter === filter.key && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 rounded-full border border-[#C5864E] pointer-events-none"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full py-20 text-center text-[#A1A1AA] font-mono">
                  {t('portfolio.noProjects') as string}
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{
                      duration: 0.6,
                      ease: easeAntigravity,
                      delay: index * 0.05,
                    }}
                    className="group relative"
                  >
                    <Link to={`/projects/${project.id}`} className="block h-full">
                      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:border-[#C5864E]/40 hover:shadow-2xl hover:shadow-[#C5864E]/5 transition-all duration-500 border border-[#F2F2F2]/5">
                        {/* Image aspect-4/3 */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent z-10" />
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: easeAntigravity }}
                          />

                          {/* Top Badges */}
                          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#0A0A0B]/60 backdrop-blur-md border border-white/5">
                            <span className="font-mono text-xs text-[#A1A1AA]">{project.year}</span>
                          </div>

                          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-[#C5864E]/10 border border-[#C5864E]/30 backdrop-blur-md">
                            <Star className="w-3 h-3 text-[#C5864E] fill-[#C5864E]" />
                            <span className="font-mono text-xs font-bold text-[#C5864E]">
                              {project.antigravityScore}
                            </span>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-xs text-[#C5864E] uppercase tracking-wider">
                                {project.category}
                              </span>
                              {project.location && (
                                <span className="text-[10px] text-[#A1A1AA] font-mono truncate max-w-[130px]">
                                  {project.location}
                                </span>
                              )}
                            </div>
                            {project.isNichePack && (
                              <div className="mb-2">
                                <span className="inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#C5864E] bg-[#C5864E]/10 border border-[#C5864E]/30 rounded-full">
                                  Stepping Stone Niche
                                </span>
                              </div>
                            )}
                            <h3 className="font-serif text-2xl font-semibold text-[#F2F2F2] mb-3 group-hover:text-[#C5864E] transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6 line-clamp-2">
                              {project.description}
                            </p>
                          </div>

                          <div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-[10px] font-mono text-[#A1A1AA] bg-[#161618] border border-white/5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="px-2 py-1 text-[10px] font-mono text-[#C5864E] bg-[#C5864E]/5 border border-[#C5864E]/10 rounded">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>

                            {/* Hover link */}
                            <div className="inline-flex items-center gap-2 text-xs text-[#C5864E] font-semibold border-b border-[#C5864E]/0 group-hover:border-[#C5864E]/40 pb-0.5 transition-all">
                              <span>{t('portfolio.viewProject') as string}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))
              )}
            </AnimatePresence>
          </motion.div>
      </div>

      {/* Dynamic Project Details Modal Overlay */}
      <AnimatePresence>
        {id && activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            {/* Modal Container */}
            <motion.div
              className="glass-card rounded-3xl w-full max-w-5xl border border-white/10 overflow-hidden relative shadow-2xl my-8"
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeAntigravity }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button overlay */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-30 p-2.5 rounded-full bg-black/60 border border-white/10 hover:bg-black hover:border-[#C5864E]/40 text-[#A1A1AA] hover:text-[#F2F2F2] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual Section - 5cols */}
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[500px] overflow-hidden bg-[#161618]">
                  <img
                    src={modalDisplayImage}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

                  {/* Left Bottom Badges */}
                  <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-[#A1A1AA] backdrop-blur-md">
                      {activeProject.year}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-[#A1A1AA] backdrop-blur-md uppercase">
                      {activeProject.category}
                    </span>
                  </div>

                  {/* Gallery Thumbnails Strip */}
                  {activeProject.gallery && activeProject.gallery.length > 1 && (
                    <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2 max-w-[80%]">
                      {activeProject.gallery.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedGalleryImg(img)}
                          className={`w-11 h-11 rounded-lg overflow-hidden border transition-all ${
                            modalDisplayImage === img
                              ? 'border-[#C5864E] ring-2 ring-[#C5864E]/40 scale-105 shadow-lg'
                              : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section - 7cols */}
                <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between max-h-[85vh] md:max-h-none overflow-y-auto">
                  <div>
                    {/* Header score */}
                    <div className="flex items-center justify-between mb-4 pr-12 md:pr-16">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[#C5864E] uppercase tracking-wider block">
                          {activeProject.category}
                        </span>
                        {activeProject.isNichePack && (
                          <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#C5864E] bg-[#C5864E]/10 border border-[#C5864E]/30 rounded-full">
                            Stepping Stones Niche Pack
                          </span>
                        )}
                        {activeProject.location && (
                          <span className="text-xs text-[#A1A1AA] font-mono">
                            • {activeProject.location}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5864E]/10 border border-[#C5864E]/30 shrink-0">
                        <Star className="w-3.5 h-3.5 text-[#C5864E] fill-[#C5864E]" />
                        <span className="font-mono text-xs font-bold text-[#C5864E]">
                          {t('portfolio.antigravityScore') as string} : {activeProject.antigravityScore}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2F2F2] mb-3 pr-12 md:pr-16">
                      {activeProject.title}
                    </h2>

                    {activeProject.tagline && (
                      <p className="text-[#C5864E] text-sm md:text-base font-serif italic mb-6 leading-relaxed">
                        {activeProject.tagline}
                      </p>
                    )}

                    <div className="space-y-6 mb-8">
                      <div>
                        <h4 className="text-xs uppercase font-mono text-[#A1A1AA] tracking-wider mb-2">Description</h4>
                        <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
                          {activeProject.fullDescription}
                        </p>
                      </div>

                      {activeProject.keyAchievement && (
                        <div className="p-4 rounded-xl bg-[#C5864E]/5 border border-[#C5864E]/20 flex items-start gap-3">
                          <Star className="w-4 h-4 text-[#C5864E] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-[10px] uppercase font-mono text-[#C5864E] tracking-wider mb-1">
                              {language === 'fr' ? 'Réalisation Clé' : 'Key Achievement'}
                            </h5>
                            <p className="text-[#F2F2F2] text-xs font-semibold">
                              {activeProject.keyAchievement}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Technical details / Stack */}
                      <div>
                        <h4 className="text-xs uppercase font-mono text-[#A1A1AA] tracking-wider mb-3">
                          {t('portfolio.techDetails') as string}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-xs font-mono text-[#F2F2F2] bg-[#161618] border border-white/5 rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  {(activeProject.demoUrl || activeProject.githubUrl) && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {activeProject.demoUrl && (
                        <a
                          href={activeProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#C5864E] hover:bg-[#d4974e] text-[#0A0A0B] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                          {language === 'fr' ? 'Voir le projet live' : 'View Live Project'}
                        </a>
                      )}
                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[#F2F2F2]/10 text-[#A1A1AA] hover:text-[#F2F2F2] hover:border-[#C5864E]/40 transition-all duration-200"
                        >
                          <Globe className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
