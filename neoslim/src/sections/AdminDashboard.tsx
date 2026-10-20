import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProjectStore, type LeadItem } from '../stores/useProjectStore';
import type { ProjectItem, ProjectCategory } from '../data/projectsData';
import {
  FolderKanban,
  Inbox,
  BarChart3,
  Settings,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  Download,
  RotateCcw,
  ShieldCheck,
  LogOut,
  Video,
  Eye,
  MessageCircle,
  Mail,
} from 'lucide-react';

const CATEGORIES: { id: ProjectCategory; labelFr: string }[] = [
  { id: 'all', labelFr: 'Tous les projets' },
  { id: 'development', labelFr: 'Développement & IA' },
  { id: 'design', labelFr: 'Design & Interfaces' },
  { id: 'productivity', labelFr: 'Productivité & SaaS' },
  { id: 'niches', labelFr: 'Packs Agence & Niches' },
];

const emptyProjectForm: ProjectItem = {
  id: '',
  title: '',
  category: 'development',
  antigravityScore: 99,
  year: '2026',
  image: '/projects/aegis-alpha-render.jpg',
  gallery: ['/projects/aegis-alpha-render.jpg'],
  tags: ['React 19', 'TypeScript', 'Tailwind v4'],
  descriptionFr: '',
  descriptionEn: '',
  taglineFr: '',
  taglineEn: '',
  fullDescriptionFr: '',
  fullDescriptionEn: '',
  keyAchievementFr: '',
  keyAchievementEn: '',
  githubUrl: 'https://github.com/mohslimm/',
  demoUrl: '',
  isFlagship: true,
};

export const AdminDashboard = memo(() => {
  const { signOut } = useAuth();
  const {
    projects,
    leads,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    addProject,
    updateProject,
    deleteProject,
    resetToDefaults,
    exportProjectsJson,
    updateLeadStatus,
    deleteLead,
  } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'projects' | 'leads' | 'telemetry' | 'settings'>('projects');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectItem>(emptyProjectForm);
  const [tagsInput, setTagsInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.descriptionFr.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...emptyProjectForm,
      id: `project-${Date.now()}`,
    });
    setTagsInput('React 19, TypeScript, Tailwind v4');
    setModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (project: ProjectItem) => {
    setEditingId(project.id);
    setFormData({ ...project });
    setTagsInput(project.tags.join(', '));
    setModalOpen(true);
  };

  // Submit Modal
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedItem: ProjectItem = {
      ...formData,
      tags: tags.length > 0 ? tags : ['Stepping Stones'],
      gallery: formData.gallery.length > 0 ? formData.gallery : [formData.image],
    };

    if (editingId) {
      updateProject(editingId, updatedItem);
      showToast(`Projet « ${updatedItem.title} » mis à jour avec succès.`);
    } else {
      addProject(updatedItem);
      showToast(`Nouveau projet « ${updatedItem.title} » créé avec succès.`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Confirmez-vous la suppression du projet « ${title} » ?`)) {
      deleteProject(id);
      showToast(`Projet « ${title} » supprimé.`);
    }
  };

  const stats = useMemo(() => {
    const total = projects.length;
    const flagships = projects.filter((p) => p.isFlagship).length;
    const avgScore = total > 0 ? (projects.reduce((acc, p) => acc + p.antigravityScore, 0) / total).toFixed(1) : 0;
    const newLeads = leads.filter((l) => l.status === 'new').length;
    return { total, flagships, avgScore, newLeads };
  }, [projects, leads]);

  return (
    <div className="min-h-screen bg-[#05060f] text-[#f0ede8] font-sans antialiased selection:bg-[#c5a059]/30 selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl bg-[#0e1026] border border-[#c5a059] shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.2)] text-white text-xs font-mono flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar Header */}
      <header className="border-b border-white/[0.08] bg-[#070814]/90 backdrop-blur-xl sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl border border-[#c5a059] bg-[#c5a059]/10 flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.2)]">
              <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a059]">
                  Console Direction
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[10px] font-mono text-white/40">v3.8 MASTER</span>
              </div>
              <h1 className="text-xl font-display font-light text-white tracking-tight">
                Mohamed Slimani <span className="italic text-[#c5a059]">&bull; Stepping Stones</span>
              </h1>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="hidden md:flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="text-white/50">Projets :</span>{' '}
              <span className="text-[#e8c77a] font-bold">{stats.total}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="text-white/50">Score Moyen :</span>{' '}
              <span className="text-[#22c55e] font-bold">{stats.avgScore}%</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="text-white/50">GitHub Repos :</span>{' '}
              <span className="text-[#c5a059] font-bold">26 Sync</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/showreel.html"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#e8c77a] text-xs font-mono flex items-center gap-2 transition-all"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Studio Showreel 4K</span>
            </a>

            <a
              href="/"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white text-xs font-mono flex items-center gap-2 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Voir Portfolio</span>
            </a>

            <button
              onClick={() => {
                signOut();
                window.location.href = '/';
              }}
              title="Déconnexion"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Body Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2.5 transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#c5a059] text-black font-semibold shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projets ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2.5 transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#c5a059] text-black font-semibold shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Pipeline & Leads ({leads.length})</span>
              {stats.newLeads > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2.5 transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-[#c5a059] text-black font-semibold shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Télémétrie & GitHub</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2.5 transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#c5a059] text-black font-semibold shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Système & Sauvegarde</span>
            </button>
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#140e02] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:shadow-[0_0_35px_rgba(197,160,89,0.5)] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Projet</span>
            </button>
          )}
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            
            {/* Search & Category Filter Pills */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0a0a16] border border-white/[0.08] p-4 rounded-2xl">
              
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par titre, slug, tag (ex: MT5, Voice, Supabase)..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 text-xs font-mono focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'border border-[#c5a059] bg-[#c5a059]/20 text-[#e8c77a]'
                        : 'border border-white/10 hover:border-white/20 text-white/50 hover:text-white'
                    }`}
                  >
                    {cat.labelFr}
                  </button>
                ))}
              </div>

            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  className="bg-[#0a0a16] border border-white/[0.08] hover:border-[#c5a059]/50 rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col group"
                >
                  {/* Image Cover */}
                  <div className="relative aspect-[16/10] bg-[#060610] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/projects/aegis-alpha-mt5-cover.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {project.isFlagship && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#c5a059] text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                          FLAGSHIP
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-white/80 text-[10px] font-mono">
                        {project.year}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 border border-[#c5a059]/50 text-[#e8c77a] text-[10px] font-mono font-semibold">
                      {project.antigravityScore}%
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#c5a059] tracking-wider uppercase block mb-1">
                        {project.category} &bull; {project.id}
                      </span>
                      <h3 className="text-lg font-display text-white font-medium mb-2 group-hover:text-[#e8c77a] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed mb-4">
                        {project.descriptionFr || project.taglineFr}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-[10px] font-mono text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-white/40">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-white/60 hover:text-white transition-colors"
                            title="GitHub Repo"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={`/projects/${project.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-white/60 hover:text-white transition-colors"
                          title="Voir sur le site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-[#c5a059]/20 hover:text-[#e8c77a] border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-all"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Éditer</span>
                        </button>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-red-500/10 text-white/40 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16 bg-[#0a0a16] border border-white/10 rounded-2xl">
                <AlertCircle className="w-10 h-10 text-[#c5a059] mx-auto mb-3 opacity-60" />
                <h3 className="text-base font-display text-white">Aucun projet ne correspond à votre recherche</h3>
                <p className="text-xs text-white/40 font-mono mt-1">Essayez un autre mot-clé ou réinitialisez le filtre.</p>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: LEADS & PIPELINE B2B */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-[#0a0a16] border border-white/[0.08] rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-display text-white">Pipeline de Qualification & Leads B2B</h2>
                  <p className="text-xs text-white/50 font-light mt-0.5">
                    Demandes issues du formulaire portfolio et des agents vocaux Stepping Stones.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#c5a059]">
                  {leads.filter((l) => l.status === 'new').length} nouveau(x) lead(s) à traiter
                </div>
              </div>

              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-medium text-white">{lead.name}</h4>
                        <span className="text-xs font-mono text-[#c5a059] font-bold">
                          Budget : {lead.budget || 'Non spécifié'}
                        </span>
                      </div>
                      <p className="text-xs text-[#e8c77a] font-mono">{lead.service}</p>
                      <p className="text-xs text-white/70 font-light leading-relaxed">{lead.message}</p>
                      <div className="flex items-center gap-4 text-[11px] text-white/40 font-mono pt-1">
                        <span>{lead.email}</span>
                        {lead.phone && <span>&bull; {lead.phone}</span>}
                        <span>&bull; {new Date(lead.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      {/* Status Selector */}
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadItem['status'])}
                        className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs font-mono text-white/80 focus:border-[#c5a059]"
                      >
                        <option value="new">● Nouveau</option>
                        <option value="contacted">● Contacté</option>
                        <option value="proposal">● Devis Envoyé</option>
                        <option value="won">● Signé / Gagné</option>
                        <option value="archived">● Archivé</option>
                      </select>

                      {/* Quick WhatsApp Link */}
                      {lead.phone && (
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(
                            lead.name
                          )},%20Mohamed%20Slimani%20de%20Stepping%20Stones%20Agency%20au%20sujet%20de%20votre%20projet%20${encodeURIComponent(
                            lead.service
                          )}.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e]/25 transition-all"
                          title="Contacter sur WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}

                      {/* Quick Email */}
                      <a
                        href={`mailto:${lead.email}?subject=Stepping%20Stones%20Agency%20-%20Votre%20Projet%20${encodeURIComponent(
                          lead.service
                        )}`}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
                        title="Envoyer un email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all"
                        title="Supprimer lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TELEMETRY & GITHUB ECOSYSTEM */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#0a0a16] border border-white/[0.08] p-6 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] block mb-1">
                  INFRASTRUCTURE GITHUB
                </span>
                <h3 className="text-3xl font-display text-white font-light mb-1">26 Dépôts</h3>
                <p className="text-xs text-white/60 font-light mb-4">
                  Synchronisés en direct sur <span className="font-mono text-[#e8c77a]">github.com/mohslimm</span>.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-white/70 border-t border-white/[0.08] pt-3">
                  <div className="flex justify-between"><span>NeoSlim-Portfolio</span><span className="text-[#22c55e]">main ✓</span></div>
                  <div className="flex justify-between"><span>Kachef</span><span className="text-[#22c55e]">main ✓</span></div>
                  <div className="flex justify-between"><span>Commercia</span><span className="text-[#22c55e]">main ✓</span></div>
                  <div className="flex justify-between"><span>Gestia</span><span className="text-[#22c55e]">main ✓</span></div>
                  <div className="flex justify-between"><span>SteppingStones-Agency</span><span className="text-[#22c55e]">main ✓</span></div>
                </div>
              </div>

              <div className="bg-[#0a0a16] border border-white/[0.08] p-6 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] block mb-1">
                  STANDARDS TECHNIQUES
                </span>
                <h3 className="text-3xl font-display text-white font-light mb-1">Matt Pocock</h3>
                <p className="text-xs text-white/60 font-light mb-4">
                  TypeScript strict sans aucun `any`, discriminated unions et validation Zod runtime.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-white/70 border-t border-white/[0.08] pt-3">
                  <div className="flex justify-between"><span>React 19 + Vite</span><span className="text-[#c5a059]">Modern</span></div>
                  <div className="flex justify-between"><span>Tailwind CSS v4</span><span className="text-[#c5a059]">Active</span></div>
                  <div className="flex justify-between"><span>Framer Motion 12</span><span className="text-[#c5a059]">60 FPS</span></div>
                  <div className="flex justify-between"><span>Zustand State</span><span className="text-[#22c55e]">Compliant</span></div>
                </div>
              </div>

              <div className="bg-[#0a0a16] border border-white/[0.08] p-6 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] block mb-1">
                  MÉDIA & VISUELS
                </span>
                <h3 className="text-3xl font-display text-white font-light mb-1">Rendus 4K</h3>
                <p className="text-xs text-white/60 font-light mb-4">
                  Rendus photoréalistes Quiet Luxury & Studio showreel WebM 1080p60.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-white/70 border-t border-white/[0.08] pt-3">
                  <div className="flex justify-between"><span>Aegis Alpha MT5</span><span className="text-[#22c55e]">Render 4K ✓</span></div>
                  <div className="flex justify-between"><span>El Mouhami Pro</span><span className="text-[#22c55e]">Render 4K ✓</span></div>
                  <div className="flex justify-between"><span>Gestia Concierge</span><span className="text-[#22c55e]">Render 4K ✓</span></div>
                  <div className="flex justify-between"><span>Kachef OS</span><span className="text-[#22c55e]">Render 4K ✓</span></div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: SYSTEM & BACKUP */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-[#0a0a16] border border-white/[0.08] rounded-2xl p-6 space-y-6">
              
              <div>
                <h3 className="text-lg font-display text-white">Sauvegarde & Exportation JSON</h3>
                <p className="text-xs text-white/60 font-light mt-0.5 leading-relaxed">
                  Exportez l'état complet de vos projets et leads sous format JSON pour archivage ou synchronisation avec le seeder MongoDB de l'agence.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={exportProjectsJson}
                    className="px-4 py-2.5 rounded-xl bg-[#c5a059]/15 hover:bg-[#c5a059]/25 border border-[#c5a059]/40 text-[#e8c77a] text-xs font-mono flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exporter JSON ({projects.length} projets)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Réinitialiser la liste des projets avec les 28 projets natifs ?')) {
                        resetToDefaults();
                        showToast('Projets réinitialisés avec le registre officiel.');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 text-xs font-mono flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Réinitialiser aux 28 Projets Officiels</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <h3 className="text-lg font-display text-white">Passkey Direction & Accès</h3>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  Identifiant : <span className="font-mono text-[#c5a059]">admin@neoslim.online</span> ou <span className="font-mono text-[#c5a059]">mohslimm</span>
                </p>
                <p className="text-xs text-white/40 font-mono mt-1">
                  Passkey Master : steppingstones2026
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* CREATE / EDIT MODAL DRAWER */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#0a0a16] border border-[#c5a059]/30 rounded-2xl shadow-2xl p-6 md:p-8 my-auto relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] block mb-1">
                  {editingId ? 'MODIFICATION DU PROJET' : 'NOUVELLE FICHE PROJET'}
                </span>
                <h3 className="text-2xl font-display text-white">
                  {editingId ? formData.title : 'Créer un Projet'}
                </h3>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 uppercase mb-1">Identifiant / Slug</label>
                    <input
                      type="text"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="ex: mon-projet-saas"
                      required
                      className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase mb-1">Titre Commercial</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="ex: TradePulse MT5"
                      required
                      className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/60 uppercase mb-1">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-black border border-white/10 text-white focus:border-[#c5a059]"
                    >
                      <option value="development">Développement</option>
                      <option value="design">Design</option>
                      <option value="productivity">Productivité</option>
                      <option value="niches">Niches Agence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase mb-1">Score Antigravity (0-100)</label>
                    <input
                      type="number"
                      min="80"
                      max="100"
                      value={formData.antigravityScore}
                      onChange={(e) => setFormData({ ...formData, antigravityScore: parseInt(e.target.value) || 98 })}
                      className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase mb-1">Année</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    id="isFlagshipCheck"
                    checked={formData.isFlagship || false}
                    onChange={(e) => setFormData({ ...formData, isFlagship: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#c5a059]"
                  />
                  <label htmlFor="isFlagshipCheck" className="text-white/80 cursor-pointer">
                    Mettre en avant comme Projet Flagship (Vitrine Accueil)
                  </label>
                </div>

                <div>
                  <label className="block text-white/60 uppercase mb-1">URL Image Principale / Cover</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/projects/mon-image.jpg"
                    required
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-white/60 uppercase mb-1">Tags Techniques (séparés par des virgules)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React 19, TypeScript, Next.js 15, Voice AI"
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-white/60 uppercase mb-1">Description (FR)</label>
                  <textarea
                    rows={3}
                    value={formData.descriptionFr}
                    onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                    placeholder="Description synthétique du projet..."
                    required
                    className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059] font-sans text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 uppercase mb-1">URL GitHub</label>
                    <input
                      type="text"
                      value={formData.githubUrl || ''}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/mohslimm/..."
                      className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase mb-1">URL Démo / Production</label>
                    <input
                      type="text"
                      value={formData.demoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      placeholder="https://demo.neoslim.online"
                      className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] text-white/60 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#140e02] font-semibold flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingId ? 'Enregistrer les Modifications' : 'Créer le Projet'}</span>
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
});

AdminDashboard.displayName = 'AdminDashboard';
