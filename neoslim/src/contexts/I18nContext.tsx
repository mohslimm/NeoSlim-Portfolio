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
      greeting: 'Bonjour, je suis',
      role: 'Développeur Créatif & UI/UX Designer',
      subtitle: 'Je crée des expériences digitales qui défient la gravité',
      ctaPrimary: 'Voir mes projets',
      ctaSecondary: 'Me contacter',
      badge: 'Disponible pour projets',
      scroll: 'Défiler',
    },
    // Skills
    skills: {
      title: 'Antigravity',
      subtitle: 'Tech Stack',
      description: 'Une expertise technique qui défie les lois du développement conventionnel',
      categories: {
        frontend: 'Web & Frontend',
        backend: 'Backend & API',
        ai: 'AI & Automation',
        devops: 'DevOps & Design',
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
    // Portfolio
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Sélection',
      description: 'Découvrez mes projets les plus ambitieux',
      filters: {
        all: 'Tous',
        design: 'Design',
        development: 'Développement',
        productivity: 'Productivité',
      },
      antigravityScore: 'Score Antigravity',
      viewProject: 'Voir le projet',
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
      greeting: 'Hello, I am',
      role: 'Creative Developer & UI/UX Designer',
      subtitle: 'I create digital experiences that defy gravity',
      ctaPrimary: 'View my projects',
      ctaSecondary: 'Contact me',
      badge: 'Available for projects',
      scroll: 'Scroll',
    },
    // Skills
    skills: {
      title: 'Antigravity',
      subtitle: 'Tech Stack',
      description: 'Technical expertise that defies the laws of conventional development',
      categories: {
        frontend: 'Web & Frontend',
        backend: 'Backend & API',
        ai: 'AI & Automation',
        devops: 'DevOps & Design',
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
    // Portfolio
    portfolio: {
      title: 'Featured',
      subtitle: 'Works',
      description: 'Discover my most ambitious projects',
      filters: {
        all: 'All',
        design: 'Design',
        development: 'Development',
        productivity: 'Productivity',
      },
      antigravityScore: 'Antigravity Score',
      viewProject: 'View project',
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
