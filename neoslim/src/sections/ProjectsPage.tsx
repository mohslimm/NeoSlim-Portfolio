import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Filter, ArrowUpRight, X, Globe, Search, ShieldCheck, Zap } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useProjectStore } from '../stores/useProjectStore';
import type { ProjectCategory } from '../data/projectsData';
import { playClick, playChime, playSubtleThud } from '../lib/soundFx';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
  }, []);

  const projects = useProjectStore((s) => s.projects);

  const unifiedProjects: UnifiedProject[] = useMemo(() => projects.map((p) => ({
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
  })), [language]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return unifiedProjects.filter((p) => {
      const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.nicheSector && p.nicheSector.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [unifiedProjects, activeFilter, searchQuery]);

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
    playClick();
    setSelectedGalleryImg(null);
    navigate('/projects');
  }, [navigate]);

  // Sound effect on modal open
  useEffect(() => {
    if (id && activeProject) {
      playSubtleThud();
    }
  }, [id, activeProject]);

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
    <div className="min-h-screen bg-[#060610] text-[#f0ede8] py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation / Header */}
        <header className="flex items-center justify-between mb-16">
          <Link
            to="/"
            onClick={playClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#f0ede8]/70 hover:text-[#f0ede8] hover:border-[#c5a059]/50 transition-all group backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#c5a059]" />
            <span>{t('portfolio.backToHome') as string}</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/" onClick={playClick} className="flex items-center group">
              <motion.img
                src="./logo.png"
                alt="NeoSlim Logo"
                className="h-12 w-auto object-contain transition-transform group-hover:rotate-12 duration-500"
              />
            </Link>

            <motion.button
              onClick={() => {
                playClick();
                toggleLanguage();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 hover:border-[#c5a059]/50 text-[#f0ede8] hover:text-[#e8c77a] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="font-semibold tracking-wider">{language.toUpperCase()}</span>
            </motion.button>
          </div>
        </header>

        {/* Title area */}
        <div className="text-center mb-12">
          <motion.span
            className="inline-block badge-luxury mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {language === 'fr' ? 'CATALOGUE DES SYSTÈMES PRO // 26 RÉALISATIONS' : 'PRODUCTION ARCHITECTURES // 26 SYSTEMS'}
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold text-[#f0ede8] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            {t('portfolio.allProjects') as string}{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#f0ede8] via-[#e8c77a] to-[#c5a059]">
              Collection
            </span>
          </motion.h1>
          <motion.p
            className="text-[#f0ede8]/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {language === 'fr'
              ? 'Une immersion dans mes réalisations d\'ingénierie et plateformes de niche. Chaque système respecte les standards Quiet Luxury et la résilience OWASP.'
              : 'A deep dive into my software engineering architectures and niche web ecosystems. Built to enterprise resilience and Quiet Luxury standards.'}
          </motion.p>
        </div>

        {/* Real-time Search Input Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="w-4 h-4 text-[#c5a059] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'fr' ? 'Rechercher un projet, une techno ou un secteur...' : 'Search project, tech, or sector...'}
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#c5a059]/40 focus:border-[#c5a059] text-xs font-mono text-[#f0ede8] placeholder:text-[#f0ede8]/30 focus:outline-none transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#f0ede8]/50 hover:text-[#f0ede8] transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2.5 mb-14 border-b border-white/[0.06] pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Filter className="w-4 h-4 text-[#c5a059] mr-1" />
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                playClick();
                setActiveFilter(filter.key);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border relative ${
                activeFilter === filter.key
                  ? 'border-[#c5a059] text-[#e8c77a] bg-[#c5a059]/15 shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                  : 'border-white/10 text-[#f0ede8]/70 hover:border-[#c5a059]/40 hover:text-[#f0ede8]'
              }`}
            >
              {filter.label}
              {activeFilter === filter.key && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 rounded-full border border-[#c5a059] pointer-events-none"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full py-20 text-center text-[#f0ede8]/50 font-mono text-sm">
                  {t('portfolio.noProjects') as string}
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -20 }}
                    transition={{
                      duration: 0.55,
                      ease: easeAntigravity,
                      delay: index * 0.04,
                    }}
                    className="group relative"
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      onClick={playClick}
                      className="block h-full"
                    >
                      <div className="luxury-card rounded-2xl overflow-hidden h-full flex flex-col bg-[#0a0a14]/80 border border-white/[0.08] hover:border-[#c5a059]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,160,89,0.15)] transition-all duration-500">
                        {/* Image aspect-16/10 */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#14142a]">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060610] via-black/20 to-transparent z-10" />
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />

                          {/* Top Badges */}
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

                          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-[#060610]/80 border border-[#c5a059]/40 backdrop-blur-md">
                            <Star className="w-3 h-3 text-[#e8c77a] fill-[#e8c77a]" />
                            <span className="font-mono text-xs font-bold text-[#e8c77a]">
                              {project.antigravityScore}
                            </span>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-widest">
                                {project.category}
                              </span>
                              {project.location && (
                                <span className="text-[10px] text-[#f0ede8]/50 font-mono truncate max-w-[130px]">
                                  {project.location}
                                </span>
                              )}
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-[#f0ede8] mb-2 group-hover:text-[#c5a059] transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-[#f0ede8]/70 text-xs leading-relaxed mb-5 line-clamp-2">
                              {project.description}
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

                            {/* View Project link */}
                            <div className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-medium text-[#f0ede8] bg-white/[0.03] group-hover:bg-[#c5a059] group-hover:text-[#060610] border border-white/10 group-hover:border-[#c5a059] transition-all duration-300">
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
            className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 pt-8 md:pt-14 pb-16 bg-black/90 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            {/* Modal Container */}
            <motion.div
              className="rounded-3xl w-full max-w-5xl bg-[#060610] border border-[#c5a059]/35 overflow-hidden relative shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.15)] my-auto shrink-0"
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeAntigravity }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button overlay */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 md:top-7 md:right-7 z-30 p-2.5 rounded-full bg-[#060610]/80 border border-white/10 hover:border-[#c5a059] text-[#f0ede8]/70 hover:text-[#f0ede8] transition-all"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual Section - 5cols */}
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[520px] overflow-hidden bg-[#0a0a16] flex items-center justify-center p-4">
                  <img
                    src={modalDisplayImage}
                    alt={activeProject.title}
                    className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#060610] via-black/30 to-transparent z-10 pointer-events-none" />

                  {/* Left Bottom Badges */}
                  <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 font-mono text-xs text-[#f0ede8]/80 backdrop-blur-md">
                      {activeProject.year}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 font-mono text-xs text-[#c5a059] backdrop-blur-md uppercase">
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
                          onClick={() => {
                            playClick();
                            setSelectedGalleryImg(img);
                          }}
                          className={`w-11 h-11 rounded-lg overflow-hidden border transition-all ${
                            modalDisplayImage === img
                              ? 'border-[#c5a059] ring-2 ring-[#c5a059]/50 scale-105 shadow-lg'
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
                <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between max-h-[85vh] md:max-h-none overflow-y-auto bg-[#0a0a14]/60">
                  <div>
                    {/* Header score */}
                    <div className="flex items-center justify-between mb-4 pr-12 md:pr-16">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[#c5a059] uppercase tracking-wider block">
                          {activeProject.category}
                        </span>
                        {activeProject.isNichePack && (
                          <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#c5a059] bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full">
                            Stepping Stones Niche Pack
                          </span>
                        )}
                        {activeProject.location && (
                          <span className="text-xs text-[#f0ede8]/50 font-mono">
                            • {activeProject.location}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060610] border border-[#c5a059]/40 shrink-0">
                        <Star className="w-3.5 h-3.5 text-[#e8c77a] fill-[#e8c77a]" />
                        <span className="font-mono text-xs font-bold text-[#e8c77a]">
                          {t('portfolio.antigravityScore') as string} : {activeProject.antigravityScore}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#f0ede8] mb-3 pr-12 md:pr-16">
                      {activeProject.title}
                    </h2>

                    {activeProject.tagline && (
                      <p className="text-[#e8c77a] text-sm md:text-base font-serif italic mb-6 leading-relaxed">
                        {activeProject.tagline}
                      </p>
                    )}

                    <div className="space-y-6 mb-8">
                      <div>
                        <h4 className="text-xs uppercase font-mono text-[#c5a059] tracking-wider mb-2">Description</h4>
                        <p className="text-[#f0ede8]/80 text-sm md:text-base leading-relaxed font-light">
                          {activeProject.fullDescription}
                        </p>
                      </div>

                      {activeProject.keyAchievement && (
                        <div className="p-4 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/25 flex items-start gap-3">
                          <Star className="w-4 h-4 text-[#e8c77a] shrink-0 mt-0.5 fill-[#e8c77a]" />
                          <div>
                            <h5 className="text-[10px] uppercase font-mono text-[#c5a059] tracking-wider mb-1">
                              {language === 'fr' ? 'Réalisation Clé' : 'Key Achievement'}
                            </h5>
                            <p className="text-[#f0ede8] text-xs font-semibold">
                              {activeProject.keyAchievement}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Technical Architecture Specs */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-[#c5a059]/25 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#c5a059]">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                            <span>OWASP Hardened // Zero-Trust</span>
                          </span>
                          <span className="flex items-center gap-1 text-[#22c55e]">
                            <Zap className="w-3 h-3" />
                            <span>Grade A+ Performance</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 font-mono text-[10px]">
                          <div>
                            <span className="text-[#f0ede8]/40 block text-[9px]">LATENCY</span>
                            <span className="text-[#f0ede8] font-bold">&lt; 15ms</span>
                          </div>
                          <div>
                            <span className="text-[#f0ede8]/40 block text-[9px]">UPTIME SLA</span>
                            <span className="text-[#22c55e] font-bold">99.99%</span>
                          </div>
                          <div>
                            <span className="text-[#f0ede8]/40 block text-[9px]">LIGHTHOUSE</span>
                            <span className="text-[#e8c77a] font-bold">99 / 100</span>
                          </div>
                        </div>
                      </div>

                      {/* Technical details / Stack */}
                      <div>
                        <h4 className="text-xs uppercase font-mono text-[#c5a059] tracking-wider mb-3">
                          {t('portfolio.techDetails') as string}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-xs font-mono text-[#f0ede8] bg-white/[0.03] border border-white/10 rounded-lg"
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
                          onClick={playChime}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-[0_2px_12px_rgba(197,160,89,0.3)]"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                          <span>{language === 'fr' ? 'Voir le projet live' : 'View Live Project'}</span>
                        </a>
                      )}
                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono border border-white/10 text-[#f0ede8]/80 hover:text-[#f0ede8] hover:border-[#c5a059]/50 transition-all duration-200 bg-white/[0.03]"
                        >
                          <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>GitHub</span>
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

ProjectsPage.displayName = 'ProjectsPage';
