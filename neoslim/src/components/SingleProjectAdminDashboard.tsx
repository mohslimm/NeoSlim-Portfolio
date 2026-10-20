import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../data/projectsData';
import { getProjectAdminConfig, type ProjectLead } from '../data/projectAdminConfigs';
import {
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Github,
  Phone,
  Mail,
  Zap,
  Activity,
  Sparkles,
  Sliders,
  X,
  Search,
} from 'lucide-react';

interface SingleProjectAdminDashboardProps {
  currentProject: ProjectItem;
  allProjects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
  onEditProject?: (project: ProjectItem) => void;
  onClose?: () => void;
}

export const SingleProjectAdminDashboard = memo(({
  currentProject,
  allProjects,
  onSelectProject,
  onEditProject,
  onClose,
}: SingleProjectAdminDashboardProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [localLeads, setLocalLeads] = useState<ProjectLead[]>([]);

  // Get project config
  const config = useMemo(() => {
    return getProjectAdminConfig(currentProject);
  }, [currentProject]);

  // Synchronize initial leads when project changes
  useMemo(() => {
    setLocalLeads(config.recentLeads);
  }, [config]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLeadStatusChange = (index: number, newStatus: ProjectLead['status']) => {
    setLocalLeads((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], status: newStatus };
      }
      return updated;
    });
    showToast(`Statut prospect mis à jour: ${newStatus.toUpperCase()}`);
  };

  const filteredProjectsList = useMemo(() => {
    if (!searchFilter.trim()) return allProjects;
    const q = searchFilter.toLowerCase().trim();
    return allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [allProjects, searchFilter]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl bg-[#0f0f20] border border-[#c5a059] shadow-[0_0_35px_rgba(197,160,89,0.25)] text-[#f0ede8] backdrop-blur-xl"
          >
            <Sparkles className="w-5 h-5 text-[#c5a059] animate-pulse" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Project Selector & Brand Bar */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0d0d1e] via-[#090916] to-[#060610] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient Gold Halo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left: Project Selector Dropdown Trigger */}
          <div className="relative">
            <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase block mb-1">
              STEPPING STONES &bull; COCKPIT PROJET DÉDIÉ
            </span>

            <button
              onClick={() => setSelectorOpen(!selectorOpen)}
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl border border-[#c5a059]/40 bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] font-bold text-lg font-serif shadow-inner group-hover:border-[#c5a059] transition-all">
                {currentProject.title.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-[#f0ede8] group-hover:text-[#e8c77a] transition-colors flex items-center gap-2">
                    {currentProject.title}
                    <ChevronDown className={`w-5 h-5 text-[#c5a059] transition-transform ${selectorOpen ? 'rotate-180' : ''}`} />
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-white/50 font-sans flex items-center gap-2 mt-0.5">
                  <span>{config.operatorRole}</span>
                  <span className="text-[#c5a059]">&bull;</span>
                  <span className="font-mono text-[#c5a059]">Score {currentProject.antigravityScore}/100</span>
                </p>
              </div>
            </button>

            {/* Selector Dropdown Modal / Popover */}
            <AnimatePresence>
              {selectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute left-0 top-full mt-3 w-80 md:w-96 rounded-2xl bg-[#0f0f24] border border-[#c5a059]/40 shadow-2xl z-50 p-4 backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-xs font-mono uppercase text-white/70">Sélectionner un Projet ({allProjects.length})</span>
                    <button onClick={() => setSelectorOpen(false)} className="text-white/40 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative mb-3">
                    <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Filtrer les projets..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {filteredProjectsList.map((p) => {
                      const isSelected = p.id === currentProject.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            onSelectProject(p.id);
                            setSelectorOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                            isSelected
                              ? 'bg-[#c5a059]/20 text-[#e8c77a] border border-[#c5a059]/40 font-semibold'
                              : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate pr-2">{p.title}</span>
                          <span className="font-mono text-[10px] text-white/40 shrink-0">{p.year}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Actions Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {currentProject.demoUrl && (
              <a
                href={currentProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/90 hover:text-white transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Live Demo</span>
              </a>
            )}

            {currentProject.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/90 hover:text-white transition-all flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>GitHub Source</span>
              </a>
            )}

            {onEditProject && (
              <button
                onClick={() => onEditProject(currentProject)}
                className="px-4 py-2 rounded-xl bg-[#c5a059]/20 hover:bg-[#c5a059]/30 border border-[#c5a059]/50 text-xs font-mono text-[#e8c77a] transition-all flex items-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Modifier Projet</span>
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/60 hover:text-white transition-all"
              >
                Fermer
              </button>
            )}
          </div>
        </div>

        {/* Operational Notice Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-start gap-3">
          <div className="p-1 rounded-full bg-[#c5a059]/20 text-[#c5a059] mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            <strong className="text-[#e8c77a] font-medium font-mono uppercase tracking-wider mr-2">Notice Opérationnelle :</strong>
            {config.notice}
          </p>
        </div>
      </div>

      {/* 4 KPIs Grid (Stepping Stones Standard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {config.stats.map((st, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-[#0f0f20]/90 border border-white/10 hover:border-[#c5a059]/40 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono tracking-wider uppercase text-white/50">
                {st.label}
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${st.bg} ${st.color} font-bold`}>
                {st.change}
              </span>
            </div>

            <div>
              <div className={`text-2xl md:text-3xl font-mono font-bold tracking-tight ${st.color} mb-1`}>
                {st.value}
              </div>
              <p className="text-xs text-white/40 font-sans">{st.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Split: Leads / Inquiries + Quick Actions Control */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Recent Inquiries & Leads Table (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0f0f20]/90 border border-white/10 shadow-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#f0ede8]">Dossiers & Prospects Dédiés</h3>
                <p className="text-xs text-white/40">Inbound inquiries et demandes de consultation pour {currentProject.title}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-[#c5a059] px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20">
              {localLeads.length} Dossiers Actifs
            </span>
          </div>

          <div className="divide-y divide-white/5 overflow-x-auto">
            {localLeads.map((lead, idx) => (
              <div
                key={idx}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a059]/20 to-[#060610] border border-[#c5a059]/30 flex items-center justify-center text-sm font-bold text-[#c5a059] font-serif shrink-0">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f0ede8] flex items-center gap-2">
                      {lead.name}
                      <span className="text-xs font-mono text-[#c5a059] font-normal">({lead.value})</span>
                    </h4>
                    <p className="text-xs text-white/50 mt-0.5">
                      {lead.companyOrLocation} &bull; <span className="text-white/70">{lead.type}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-xs font-mono text-white/30 hidden md:inline">{lead.date}</span>

                  {/* Status Dropdown / Pill */}
                  <select
                    value={lead.status}
                    onChange={(e) => handleLeadStatusChange(idx, e.target.value as ProjectLead['status'])}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#060610] border border-white/10 text-white focus:outline-none focus:border-[#c5a059] cursor-pointer"
                  >
                    <option value="new">NOUVEAU</option>
                    <option value="contacted">CONTACTÉ</option>
                    <option value="proposal">PROPOSITION</option>
                    <option value="won">GAGNÉ ✓</option>
                  </select>

                  {/* Action Directes */}
                  {lead.phone && (
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(lead.name)},%20concernant%20votre%20dossier%20${encodeURIComponent(currentProject.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Contacter sur WhatsApp"
                      className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}?subject=Stepping%20Stones%20-%20${encodeURIComponent(currentProject.title)}`}
                      title="Envoyer un Email"
                      className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-black/20 border-t border-white/5 text-center">
            <span className="text-xs font-mono text-white/40">
              Synchronisé avec le CRM Stepping Stones Agency &bull; Confidentialité 100% Garantie
            </span>
          </div>
        </div>

        {/* Right: Quick Actions Control & System Telemetry (1 Col) */}
        <div className="space-y-6">
          
          {/* Quick Actions Card */}
          <div className="p-6 rounded-2xl bg-[#0f0f20]/90 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#f0ede8]">Commandes Opérationnelles</h3>
            </div>

            <div className="space-y-3">
              {config.quickActions.map((qa) => (
                <button
                  key={qa.id}
                  onClick={() => showToast(qa.actionToast)}
                  className="w-full text-left p-3.5 rounded-xl bg-white/[0.03] hover:bg-[#c5a059]/10 border border-white/10 hover:border-[#c5a059]/40 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-[#c5a059] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-white/80 group-hover:text-white">
                      {qa.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#c5a059] px-2 py-0.5 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 uppercase shrink-0">
                    {qa.actionText}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Technical Telemetry Card */}
          <div className="p-6 rounded-2xl bg-[#0f0f20]/90 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#f0ede8]">Télémétrie d'Ingénierie</h3>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/40">IDENTIFIANT</span>
                <span className="text-[#e8c77a]">{currentProject.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/40">CATÉGORIE</span>
                <span className="text-white/80 uppercase">{currentProject.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/40">SCORE EXCELLENCE</span>
                <span className="text-emerald-400">{currentProject.antigravityScore} / 100</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/40">TAGS MAÎTRES</span>
                <span className="text-white/60 truncate max-w-[140px] text-right">
                  {currentProject.tags.slice(0, 3).join(', ')}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/40">ENVIRONNEMENT</span>
                <span className="text-emerald-400">PRODUCTION ACTIVE ✓</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
});

SingleProjectAdminDashboard.displayName = 'SingleProjectAdminDashboard';
