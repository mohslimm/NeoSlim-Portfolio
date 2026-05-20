import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'fr' | 'en';

interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      skills: 'Compétences',
      portfolio: 'Portfolio',
      contact: 'Contact',
      admin: 'Admin',
    },
    // Hero
    hero: {
      greeting: 'PORTFOLIO PROFESSIONNEL',
      role: 'Senior Full-Stack Developer & Founder of Stepping Stones Agency',
      subtitle: 'Des architectures haute performance optimisées pour une vitesse maximale, une sécurité impénétrable et une esthétique minimaliste "Quiet Luxury".',
      ctaPrimary: 'Découvrir mes architectures',
      ctaSecondary: 'Me contacter',
      badge: 'Disponible pour opportunités',
      scroll: 'Défiler',
    },
    // Skills
    skills: {
      title: 'Expertise',
      subtitle: 'Tech Stack',
      description: 'Une expertise technique d\'élite alignée sur les exigences de performance et de sécurité modernes.',
      categories: {
        frontend: 'Frontend & Design System',
        backend: 'Backend & Architecture',
        ai: 'DevOps & Automations',
        devops: 'Audit & Performance',
      },
    },
    // Data Viz
    dataViz: {
      title: 'Excellence',
      subtitle: 'Calculée',
      description: 'Des métriques qui parlent d\'elles-mêmes',
      chartLabel: 'Optimisation Globale',
      stats: {
        performance: 'Performance',
        accessibility: 'Accessibilité',
        bestPractices: 'Bonnes Pratiques',
        seo: 'SEO',
      },
    },
    portfolio: {
      title: 'Architectures',
      subtitle: 'Sélection',
      description: 'Découvrez mes réalisations techniques majeures, alliant complexité algorithmique et finitions Quiet Luxury.',
      filters: {
        all: 'Tous',
        design: 'Design & Audits',
        development: 'Développement SaaS',
        productivity: 'Systèmes ERP',
      },
      antigravityScore: 'Score Antigravity',
      viewProject: 'Voir le projet',
      backToHome: 'Retour à l’accueil',
      allProjects: 'Tous les projets',
      techDetails: 'Détails techniques',
      visitSite: 'Visiter le site',
      viewCode: 'Voir le code',
      noProjects: 'Aucun projet trouvé',
    },
    // Admin
    admin: {
      title: 'Dashboard Admin',
      login: 'Connexion',
      logout: 'Déconnexion',
      email: 'Email',
      password: 'Mot de passe',
      projects: 'Projets',
      stats: 'Statistiques',
      addProject: 'Ajouter un projet',
      editProject: 'Modifier le projet',
      deleteProject: 'Supprimer',
      save: 'Sauvegarder',
      cancel: 'Annuler',
    },
    // Footer
    footer: {
      contact: 'Contact',
      navigation: 'Navigation',
      social: 'Réseaux',
      rights: 'Tous droits réservés',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      skills: 'Skills',
      portfolio: 'Portfolio',
      contact: 'Contact',
      admin: 'Admin',
    },
    // Hero
    hero: {
      greeting: 'PROFESSIONAL PORTFOLIO',
      role: 'Senior Full-Stack Developer & Founder of Stepping Stones Agency',
      subtitle: 'High-performance architectures optimized for maximum speed, impenetrable security, and a "Quiet Luxury" minimalist aesthetic.',
      ctaPrimary: 'Explore my architectures',
      ctaSecondary: 'Contact me',
      badge: 'Available for Opportunities',
      scroll: 'Scroll',
    },
    // Skills
    skills: {
      title: 'Expertise',
      subtitle: 'Tech Stack',
      description: 'Elite technical expertise aligned with modern performance and security requirements.',
      categories: {
        frontend: 'Frontend & Design System',
        backend: 'Backend & Architecture',
        ai: 'DevOps & Automations',
        devops: 'Audit & Performance',
      },
    },
    // Data Viz
    dataViz: {
      title: 'Calculated',
      subtitle: 'Excellence',
      description: 'Metrics that speak for themselves',
      chartLabel: 'Global Optimization',
      stats: {
        performance: 'Performance',
        accessibility: 'Accessibility',
        bestPractices: 'Best Practices',
        seo: 'SEO',
      },
    },
    portfolio: {
      title: 'Architectures',
      subtitle: 'Featured',
      description: 'Discover my major technical creations, combining algorithmic complexity with Quiet Luxury finishes.',
      filters: {
        all: 'All',
        design: 'Design & Audits',
        development: 'SaaS Development',
        productivity: 'ERP Systems',
      },
      antigravityScore: 'Antigravity Score',
      viewProject: 'View project',
      backToHome: 'Back to Home',
      allProjects: 'All Projects',
      techDetails: 'Technical details',
      visitSite: 'Visit site',
      viewCode: 'View code',
      noProjects: 'No projects found',
    },
    // Admin
    admin: {
      title: 'Admin Dashboard',
      login: 'Login',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      projects: 'Projects',
      stats: 'Statistics',
      addProject: 'Add project',
      editProject: 'Edit project',
      deleteProject: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
    },
    // Footer
    footer: {
      contact: 'Contact',
      navigation: 'Navigation',
      social: 'Social',
      rights: 'All rights reserved',
    },
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string | Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));
  }, []);

  const t = useCallback(
    (key: string): string | Translations => {
      const keys = key.split('.');
      let value: Translations | string = translations[language];
      
      for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
          value = value[k] as Translations | string;
        } else {
          return key;
        }
      }
      
      return value;
    },
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
