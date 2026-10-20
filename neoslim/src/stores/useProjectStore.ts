import { create } from 'zustand';
import { allProjects, type ProjectItem, type ProjectCategory } from '../data/projectsData';

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal' | 'won' | 'archived';
  createdAt: string;
}

interface ProjectStoreState {
  projects: ProjectItem[];
  leads: LeadItem[];
  searchQuery: string;
  selectedCategory: ProjectCategory;
  
  // Actions Projects
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: ProjectCategory) => void;
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  resetToDefaults: () => void;
  exportProjectsJson: () => void;
  
  // Actions Leads
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadItem['status']) => void;
  deleteLead: (id: string) => void;
}

const STORAGE_KEY_PROJECTS = 'neoslim_portfolio_projects_v2';
const STORAGE_KEY_LEADS = 'neoslim_portfolio_leads_v2';

const getInitialProjects = (): ProjectItem[] => {
  if (typeof window === 'undefined') return allProjects;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read projects from localStorage:', e);
  }
  return allProjects;
};

const getInitialLeads = (): LeadItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LEADS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not read leads from localStorage:', e);
  }
  return [
    {
      id: 'lead-01',
      name: 'Karim Benali',
      email: 'k.benali@algeria-trade.dz',
      phone: '+213 550 12 34 56',
      service: 'Kachef OS & Automation B2B',
      budget: '3 500 €',
      message: 'Nous souhaitons déployer un radar de prospection pour notre réseau de distribution à Alger et Oran.',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'lead-02',
      name: 'Maître Yacine Bouzid',
      email: 'yacine.bouzid@cabinet-avocats.dz',
      phone: '+213 661 98 76 54',
      service: 'El Mouhami Pro Voice AI',
      budget: '4 800 €',
      message: 'Intéressé par l\'agent d\'accueil vocal bilingue et la pré-qualification des dossiers contentieux.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 'lead-03',
      name: 'Sophia Laurent (Monaco Luxury)',
      email: 'sophia@monaco-concierge.mc',
      phone: '+377 98 06 20 00',
      service: 'Gestia Conciergerie & PropTech OS',
      budget: '12 000 €',
      message: 'Projet de conciergerie automatisée avec Voice AI et baux locatifs biométriques pour 18 résidences.',
      status: 'proposal',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    }
  ];
};

export const useProjectStore = create<ProjectStoreState>((set, get) => ({
  projects: getInitialProjects(),
  leads: getInitialLeads(),
  searchQuery: '',
  selectedCategory: 'all',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  addProject: (newProject) => {
    set((state) => {
      const updated = [newProject, ...state.projects];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
      }
      return { projects: updated };
    });
  },

  updateProject: (id, updates) => {
    set((state) => {
      const updated = state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
      }
      return { projects: updated };
    });
  },

  deleteProject: (id) => {
    set((state) => {
      const updated = state.projects.filter((p) => p.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
      }
      return { projects: updated };
    });
  },

  resetToDefaults: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
    }
    set({ projects: allProjects });
  },

  exportProjectsJson: () => {
    const state = get();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `neoslim_projects_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  addLead: (leadData) => {
    set((state) => {
      const newLead: LeadItem = {
        ...leadData,
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newLead, ...state.leads];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
      }
      return { leads: updated };
    });
  },

  updateLeadStatus: (id, status) => {
    set((state) => {
      const updated = state.leads.map((l) => (l.id === id ? { ...l, status } : l));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
      }
      return { leads: updated };
    });
  },

  deleteLead: (id) => {
    set((state) => {
      const updated = state.leads.filter((l) => l.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
      }
      return { leads: updated };
    });
  },
}));
