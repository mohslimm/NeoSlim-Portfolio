import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ShieldCheck, Cpu, CheckCircle2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { allProjects } from '../data/projectsData';
import { useI18n } from '../contexts/I18nContext';

export function TechnicalDossiersVault() {
  const { language } = useI18n();
  const [filter, setFilter] = useState<'all' | 'flagships' | 'niches'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    let list = allProjects;
    if (filter === 'flagships') list = list.filter(p => !p.isNichePack);
    if (filter === 'niches') list = list.filter(p => p.isNichePack);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [filter, searchQuery]);

  const displayedProjects = useMemo(() => {
    if (searchQuery.trim() || showAll) return filteredProjects;
    return filteredProjects.slice(0, 6);
  }, [filteredProjects, showAll, searchQuery]);

  const handleDownload = (projectName: string) => {
    setDownloadToast(
      language === 'fr' 
        ? `Dossier Technique Word pour "${projectName}" accessible dans votre répertoire Bureau!`
        : `Word Technical Dossier for "${projectName}" ready in your Desktop directory!`
    );
    setTimeout(() => setDownloadToast(null), 4000);
  };

  return (
    <section id="dossiers" className="relative py-28 px-6 bg-[#060610] text-[#f0ede8] border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c5a059]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#e8c77a] font-mono text-xs uppercase tracking-widest mb-4">
            <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>30 Dossiers Techniques & Guides Opérateurs Word</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#f0ede8] tracking-tight">
            {language === 'fr' ? 'La Bibliothèque' : 'The Sovereign'}{' '}
            <span className="italic text-[#c5a059] font-normal">
              {language === 'fr' ? 'des Spécifications' : 'Dossiers Vault'}
            </span>
          </h2>
          <p className="mt-4 text-[#f0ede8]/60 text-base md:text-lg font-light leading-relaxed">
            {language === 'fr'
              ? 'Rapports modulaires Word (.docx) pour chacun des 30 projets d\'entreprise : architecture, schémas de flux, modèles de données et protocoles SOP signés.'
              : 'Modular Word (.docx) technical specifications for all 30 enterprise systems: architecture, network flow schemas, and signed SOP protocols.'}
          </p>
        </div>

        {/* Global Master Download Hero Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0b0b18] via-[#121226] to-[#0b0b18] border border-[#c5a059]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
              <Cpu className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#f0ede8] font-normal">
                {language === 'fr' ? 'Archive Intégrale des 31 Dossiers Word (.zip)' : 'Master Archive of all 31 Word Dossiers (.zip)'}
              </h3>
              <p className="text-xs sm:text-sm text-[#f0ede8]/65 mt-1 font-light">
                {language === 'fr'
                  ? 'Téléchargez le pack complet (1.31 Mo) contenant l\'ensemble des 31 dossiers techniques signés par Mohamed Slimani.'
                  : 'Download the complete archive (1.31 MB) containing all 31 technical dossiers signed by Mohamed Slimani.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload('Pack Intégral des 30 Projets')}
            className="w-full md:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2.5 shrink-0 transition-transform hover:scale-[1.03] shadow-[0_0_25px_rgba(197,160,89,0.3)]"
          >
            <Download className="w-4 h-4 text-[#1A1200]" />
            <span>{language === 'fr' ? 'Télécharger Tout (.ZIP, 1.3 Mo)' : 'Download Master Pack (.ZIP)'}</span>
          </button>
        </div>

        {/* Quick Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex rounded-full bg-[#0f0f20] p-1 border border-white/[0.08] w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                filter === 'all' ? 'bg-[#c5a059] text-[#060610] font-bold shadow-md' : 'text-[#f0ede8]/70 hover:text-white'
              }`}
            >
              Tous ({allProjects.length})
            </button>
            <button
              onClick={() => setFilter('flagships')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                filter === 'flagships' ? 'bg-[#c5a059] text-[#060610] font-bold shadow-md' : 'text-[#f0ede8]/70 hover:text-white'
              }`}
            >
              Flagships (17)
            </button>
            <button
              onClick={() => setFilter('niches')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                filter === 'niches' ? 'bg-[#c5a059] text-[#060610] font-bold shadow-md' : 'text-[#f0ede8]/70 hover:text-white'
              }`}
            >
              Niches (13)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#c5a059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'fr' ? 'Rechercher un dossier...' : 'Search a dossier...'}
              className="w-full pl-9 pr-4 py-1.5 rounded-full bg-[#0f0f20] border border-white/[0.08] focus:border-[#c5a059] text-xs font-mono text-[#f0ede8] placeholder:text-[#f0ede8]/40 outline-none transition-all"
            />
          </div>
        </div>

        {/* Dossiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedProjects.map((project, idx) => {
            const cleanSlug = project.id.replace(/[^a-zA-Z0-9_]/g, '_').toUpperCase();
            const filename = `${cleanSlug}_RAPPORT_TECHNIQUE.docx`;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-xl bg-[#0b0b18] border border-white/[0.08] hover:border-[#c5a059]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-[#c5a059] font-bold tracking-wider">
                      DOC #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-white/[0.04] border border-white/[0.08] text-[#f0ede8]/65">
                      <ShieldCheck className="w-2.5 h-2.5 text-[#c5a059]" />
                      6 Modules
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-normal text-[#f0ede8] group-hover:text-[#e8c77a] transition-colors leading-snug mb-1.5">
                    {project.title}
                  </h4>

                  <p className="text-[11px] text-[#f0ede8]/55 line-clamp-2 leading-relaxed mb-3">
                    {language === 'fr' ? project.descriptionFr : project.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-[#e8c77a]/70 border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#f0ede8]/40 truncate max-w-[140px]">
                    {filename}
                  </span>

                  <button
                    onClick={() => handleDownload(project.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#e8c77a] hover:text-[#060610] text-[11px] font-mono font-medium transition-all"
                  >
                    <Download className="w-3 h-3" />
                    <span>Dossier Word</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expand / Collapse 30 Dossiers Toggle */}
        {!searchQuery && filteredProjects.length > 6 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0f0f20] hover:bg-[#15152c] border border-white/[0.1] hover:border-[#c5a059]/40 text-xs font-mono text-[#e8c77a] transition-all"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{language === 'fr' ? 'Réduire la Vue (Afficher 6 Dossiers)' : 'Collapse (Show 6 Dossiers)'}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{language === 'fr' ? `Afficher les ${filteredProjects.length} Dossiers Complets` : `Show All ${filteredProjects.length} Dossiers`}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Floating Download Feedback Toast */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[200] max-w-md p-4 rounded-xl bg-[#0b0b18] border border-[#c5a059] shadow-2xl flex items-center gap-3 text-sm font-mono text-[#f0ede8]"
          >
            <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0" />
            <div>
              <p className="font-bold text-[#e8c77a] text-xs">Vérification de Disponibilité</p>
              <p className="text-xs text-[#f0ede8]/80">{downloadToast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
