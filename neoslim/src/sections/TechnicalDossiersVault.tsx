import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { allProjects } from '../data/projectsData';
import { useI18n } from '../contexts/I18nContext';

export function TechnicalDossiersVault() {
  const { language } = useI18n();
  const [filter, setFilter] = useState<'all' | 'flagships' | 'niches'>('all');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'flagships') return allProjects.filter(p => !p.isNichePack);
    if (filter === 'niches') return allProjects.filter(p => p.isNichePack);
    return allProjects;
  }, [filter]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
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
            <p className="mt-4 text-[#f0ede8]/60 text-base md:text-lg max-w-2xl font-light">
              {language === 'fr'
                ? 'Rapports modulaires détaillés générés en format Word (.docx) pour chacun des 30 projets : 6 sous-systèmes techniques, schémas de flux réseau, 4 procédures SOP et KPIs en direct.'
                : 'Exhaustive modular Word (.docx) technical specifications for all 30 projects: 6 engineering modules, ASCII network flows, SOP procedures 1-4 and live telemetry.'}
            </p>
          </div>

          {/* Quick Actions / Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-full bg-[#0f0f20] p-1 border border-white/[0.08]">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  filter === 'all' ? 'bg-[#c5a059] text-[#060610] font-bold shadow-md' : 'text-[#f0ede8]/70 hover:text-white'
                }`}
              >
                Tous (30)
              </button>
              <button
                onClick={() => setFilter('flagships')}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  filter === 'flagships' ? 'bg-[#c5a059] text-[#060610] font-bold shadow-md' : 'text-[#f0ede8]/70 hover:text-white'
                }`}
              >
                Flagships SaaS (17)
              </button>
              <button
                onClick={() => setFilter('niches')}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  filter === 'niches' ? 'bg-[#c5a059] text-[#060610] font-bold shadow-md' : 'text-[#f0ede8]/70 hover:text-white'
                }`}
              >
                Niches Luxe (13)
              </button>
            </div>

            <a
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c5a059]/15 hover:bg-[#c5a059]/25 text-[#e8c77a] border border-[#c5a059]/40 text-xs font-mono font-medium transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Cockpit Admin</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Dossiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const cleanSlug = project.id.replace(/[^a-zA-Z0-9_]/g, '_').toUpperCase();
            const filename = `${String(idx + 1).padStart(2, '0')}_${cleanSlug}_RAPPORT_TECHNIQUE.docx`;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="group relative rounded-2xl bg-[#0b0b18] border border-white/[0.08] hover:border-[#c5a059]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Header card */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#c5a059] font-bold tracking-wider">
                      DOC #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/[0.05] border border-white/[0.1] text-[#f0ede8]/70">
                      <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
                      6 Modules Validés
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#f0ede8] group-hover:text-[#e8c77a] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#f0ede8]/55 line-clamp-2 leading-relaxed mb-4">
                    {language === 'fr' ? project.descriptionFr : project.descriptionEn}
                  </p>

                  {/* Modules tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-[#e8c77a]/80 border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.02] text-[#f0ede8]/40">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer card */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="text-[11px] font-mono text-[#f0ede8]/40 truncate max-w-[170px]">
                    {filename}
                  </div>

                  <button
                    onClick={() => handleDownload(project.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#e8c77a] hover:text-[#060610] text-xs font-mono font-medium transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Dossier Word</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Catalog Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#0b0b18] via-[#121226] to-[#0b0b18] border border-[#c5a059]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif text-2xl text-[#f0ede8] font-normal">
                {language === 'fr' ? 'Archive Complète des 30 Dossiers Techniques' : 'Complete 30 Engineering Dossiers Archive'}
              </h4>
              <p className="text-sm text-[#f0ede8]/60 mt-1 font-light">
                {language === 'fr'
                  ? 'Téléchargez le pack intégral (.zip) contenant les 31 documents Word rédigés et signés par Mohamed Slimani.'
                  : 'Download the master archive (.zip) containing all 31 Word engineering dossiers signed by Mohamed Slimani.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload('Pack Intégral des 30 Projets')}
            className="px-6 py-3.5 rounded-full bg-[#c5a059] hover:bg-[#e8c77a] text-[#060610] font-semibold text-sm font-mono flex items-center gap-2.5 shrink-0 transition-transform hover:scale-[1.02] shadow-[0_0_30px_rgba(197,160,89,0.3)]"
          >
            <Download className="w-4 h-4 text-[#060610]" />
            <span>{language === 'fr' ? 'Télécharger le Pack ZIP (1.3 Mo)' : 'Download Master Pack (1.3 MB)'}</span>
          </button>
        </div>
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
