import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/supabase';
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  category: 'design' | 'development' | 'productivity';
  antigravity_score: number;
  year: string;
}

const initialFormData: ProjectFormData = {
  title: '',
  description: '',
  image: '',
  category: 'development',
  antigravity_score: 95,
  year: new Date().getFullYear().toString(),
};

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'projects' | 'stats'>('projects');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Use mock data if Supabase is not configured
      setProjects([
        {
          id: '1',
          title: 'Nebula Dashboard',
          description: 'Tableau de bord analytics',
          image: '/projects/nebula.jpg',
          category: 'development',
          antigravity_score: 98,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingProject.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([
          {
            ...formData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
      }

      setShowModal(false);
      setEditingProject(null);
      setFormData(initialFormData);
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Erreur lors de la sauvegarde. Vérifiez votre configuration Supabase.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      antigravity_score: project.antigravity_score,
      year: new Date(project.created_at).getFullYear().toString(),
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-2 border-[#C5864E] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <header className="border-b border-[#C5864E]/10 bg-[#0A0A0B]/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-10 h-10 rounded-xl bg-[#C5864E]/10 flex items-center justify-center"
              whileHover={{ rotate: 10 }}
            >
              <LayoutDashboard className="w-5 h-5 text-[#C5864E]" />
            </motion.div>
            <div>
              <h1 className="font-serif text-xl font-semibold text-[#F2F2F2]">
                {t('admin.title') as string}
              </h1>
              <p className="text-xs text-[#A1A1AA]">{user?.email}</p>
            </div>
          </div>

          <motion.button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg text-[#A1A1AA] hover:text-[#F2F2F2] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">{t('admin.logout') as string}</span>
          </motion.button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              <motion.button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'projects'
                    ? 'bg-[#C5864E]/10 text-[#C5864E]'
                    : 'text-[#A1A1AA] hover:text-[#F2F2F2] hover:bg-[#1a1a1a]'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <FolderOpen className="w-5 h-5" />
                <span>{t('admin.projects') as string}</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </motion.button>

              <motion.button
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'stats'
                    ? 'bg-[#C5864E]/10 text-[#C5864E]'
                    : 'text-[#A1A1AA] hover:text-[#F2F2F2] hover:bg-[#1a1a1a]'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="w-5 h-5" />
                <span>{t('admin.stats') as string}</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </motion.button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeAntigravity }}
              >
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-[#F2F2F2]">
                    {t('admin.projects') as string}
                  </h2>
                  <motion.button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 bg-[#C5864E] text-[#0A0A0B] rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('admin.addProject') as string}</span>
                  </motion.button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="glass-card rounded-xl p-4 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-[#A1A1AA]" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#F2F2F2] truncate">{project.title}</h3>
                          <p className="text-sm text-[#A1A1AA] line-clamp-2 mt-1">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-mono text-[#C5864E]">
                              Score: {project.antigravity_score}
                            </span>
                            <span className="text-xs text-[#A1A1AA]">•</span>
                            <span className="text-xs text-[#A1A1AA] capitalize">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => openEditModal(project)}
                            className="p-2 rounded-lg hover:bg-[#C5864E]/10 text-[#A1A1AA] hover:text-[#C5864E] transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-[#A1A1AA] hover:text-red-500 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeAntigravity }}
              >
                <h2 className="font-serif text-2xl text-[#F2F2F2] mb-6">
                  {t('admin.stats') as string}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Projets', value: projects.length },
                    { label: 'Score Moyen', value: '97.5' },
                    { label: 'Clients', value: '30+' },
                    { label: 'Années', value: '5+' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="glass-card rounded-xl p-6 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <p className="font-mono text-3xl font-bold text-[#C5864E]">{stat.value}</p>
                      <p className="text-sm text-[#A1A1AA] mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: easeAntigravity }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-[#F2F2F2]">
                  {editingProject
                    ? (t('admin.editProject') as string)
                    : (t('admin.addProject') as string)}
                </h3>
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#A1A1AA]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A1A1AA] mb-2">Titre</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#A1A1AA]/20 rounded-lg text-[#F2F2F2] focus:border-[#C5864E] focus:outline-none transition-colors"
                    placeholder="Nom du projet"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#A1A1AA] mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#A1A1AA]/20 rounded-lg text-[#F2F2F2] focus:border-[#C5864E] focus:outline-none transition-colors resize-none"
                    rows={3}
                    placeholder="Description du projet"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#A1A1AA] mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#A1A1AA]/20 rounded-lg text-[#F2F2F2] focus:border-[#C5864E] focus:outline-none transition-colors"
                    placeholder="/projects/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#A1A1AA] mb-2">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as 'design' | 'development' | 'productivity' })
                      }
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#A1A1AA]/20 rounded-lg text-[#F2F2F2] focus:border-[#C5864E] focus:outline-none transition-colors"
                    >
                      <option value="design">Design</option>
                      <option value="development">Développement</option>
                      <option value="productivity">Productivité</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#A1A1AA] mb-2">Antigravity Score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.antigravity_score}
                      onChange={(e) =>
                        setFormData({ ...formData, antigravity_score: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#A1A1AA]/20 rounded-lg text-[#F2F2F2] focus:border-[#C5864E] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#C5864E] text-[#0A0A0B] rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-4 h-4" />
                    <span>{t('admin.save') as string}</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 glass-card rounded-lg text-[#A1A1AA] hover:text-[#F2F2F2]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('admin.cancel') as string}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
