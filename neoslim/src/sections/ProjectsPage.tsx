import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Filter, ArrowUpRight, X, Globe } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { supabase } from '../lib/supabase';
import { Skeleton } from '../components/ui/skeleton';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'design' | 'development' | 'productivity';
  antigravity_score: number;
  created_at?: string;
  updated_at?: string;
}

interface UnifiedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'design' | 'development' | 'productivity';
  antigravityScore: number;
  year: string;
  tags: string[];
  fullDescription: string;
  githubUrl?: string;
  demoUrl?: string;
  gallery?: string[];
}

const projectsMetadata: Record<string, {
  year: string;
  tags: string[];
  fullDescription: { fr: string; en: string };
  githubUrl?: string;
  demoUrl?: string;
  gallery?: string[];
}> = {
  '1': {
    year: '2024',
    tags: ['React', 'D3.js', 'Python', 'FastAPI', 'Tailwind'],
    fullDescription: {
      fr: "Nebula Dashboard est une plateforme analytique d'entreprise révolutionnaire qui intègre l'intelligence artificielle pour prédire les tendances futures du marché. Conçue pour les équipes de données et les décideurs, elle permet de traiter des millions de points de données en temps réel avec des visualisations interactives hautement personnalisables.",
      en: "Nebula Dashboard is a revolutionary enterprise analytics platform that integrates artificial intelligence to predict future market trends. Designed for data teams and decision makers, it processes millions of data points in real time with highly customizable interactive visualizations."
    },
    githubUrl: 'https://github.com/mohslimm/nebula-dashboard',
    demoUrl: 'https://nebula.neoslim.dev',
    gallery: ['/projects/nebula.jpg']
  },
  '2': {
    year: '2024',
    tags: ['Figma', 'Storybook', 'Tokens', 'React', 'Tailwind'],
    fullDescription: {
      fr: "Un système de design complet et modulaire conçu pour unifier l'expérience utilisateur sur l'ensemble des produits. Construit avec React et Tailwind CSS, il comprend plus de 200 composants interactifs testés pour l'accessibilité (WCAG), une documentation Figma synchronisée et des jetons de design automatisés.",
      en: "A comprehensive, modular design system built to unify user experience across all products. Built with React and Tailwind CSS, it features over 200 interactive components tested for accessibility (WCAG), synchronized Figma documentation, and automated design tokens."
    },
    githubUrl: 'https://github.com/mohslimm/aurora-design-system',
    demoUrl: 'https://aurora.neoslim.dev',
    gallery: ['/projects/aurora.jpg']
  },
  '3': {
    year: '2024',
    tags: ['Next.js', 'OpenAI', 'Prisma', 'PostgreSQL', 'Tailwind'],
    fullDescription: {
      fr: "Quantum Flow redéfinit la productivité d'équipe en automatisant les tâches répétitives via des modèles de langage avancés. L'application s'intègre à vos outils existants (Slack, GitHub, Jira) pour coordonner les tâches, générer des rapports de progression et suggérer des optimisations de workflow intelligentes.",
      en: "Quantum Flow redefines team productivity by automating repetitive tasks using advanced language models. The application integrates with your existing tools (Slack, GitHub, Jira) to coordinate tasks, generate progress reports, and suggest intelligent workflow optimizations."
    },
    githubUrl: 'https://github.com/mohslimm/quantum-flow',
    demoUrl: 'https://quantum.neoslim.dev',
    gallery: ['/projects/quantum.jpg']
  },
  '4': {
    year: '2023',
    tags: ['Next.js', 'Three.js', 'Stripe', 'Tailwind', 'Sanity.io'],
    fullDescription: {
      fr: "Une vitrine e-commerce de nouvelle génération offrant une immersion en 3D grâce à Three.js. Les utilisateurs peuvent manipuler les produits à 360°, personnaliser les textures en temps réel, et passer à la caisse de manière ultra-sécurisée et rapide grâce à une architecture Headless connectée à Stripe.",
      en: "A next-generation e-commerce storefront offering a 3D immersion thanks to Three.js. Users can manipulate products in 360°, customize textures in real time, and checkout securely and fast using a Headless architecture powered by Stripe."
    },
    githubUrl: 'https://github.com/mohslimm/stellar-ecommerce',
    demoUrl: 'https://stellar.neoslim.dev',
    gallery: ['/projects/stellar.jpg']
  },
  '5': {
    year: '2023',
    tags: ['Branding', 'Figma', 'Illustrator', 'After Effects', 'Webflow'],
    fullDescription: {
      fr: "Création de l'identité de marque complète pour Zenith, une fintech qui simplifie l'investissement durable. Le projet comprend la conception du logo, la charte graphique, les animations de marque, ainsi qu'un site vitrine haut de gamme reflétant les valeurs de transparence et d'innovation.",
      en: "Brand identity design for Zenith, a fintech simplifying sustainable investment. The project includes logo design, color guidelines, motion brand assets, and a high-end marketing website reflecting transparency and innovation."
    },
    githubUrl: 'https://github.com/mohslimm/zenith-branding',
    demoUrl: 'https://zenith.neoslim.dev',
    gallery: ['/projects/zenith.jpg']
  },
  '6': {
    year: '2023',
    tags: ['Vue.js', 'Node.js', 'GPT-4', 'Express', 'MongoDB'],
    fullDescription: {
      fr: "Orbit CRM est une solution de gestion de relation client assistée par intelligence artificielle. Elle analyse automatiquement les interactions par e-mail et appel pour qualifier les prospects, prédire les intentions d'achat et suggérer des actions de suivi personnalisées pour vos équipes commerciales.",
      en: "Orbit CRM is an AI-assisted customer relationship management solution. It automatically analyzes email and call interactions to qualify leads, predict purchase intent, and suggest personalized follow-up actions for your sales teams."
    },
    githubUrl: 'https://github.com/mohslimm/orbit-crm',
    demoUrl: 'https://orbit.neoslim.dev',
    gallery: ['/projects/orbit.jpg']
  }
};

const fallbackProjects: ProjectData[] = [
  {
    id: '1',
    title: 'Nebula Dashboard',
    description: 'Tableau de bord analytics avec visualisation de données temps réel et IA prédictive.',
    image: '/projects/nebula.jpg',
    category: 'development',
    antigravity_score: 98,
  },
  {
    id: '2',
    title: 'Aurora Design System',
    description: 'Système de design complet avec 200+ composants et documentation interactive.',
    image: '/projects/aurora.jpg',
    category: 'design',
    antigravity_score: 99,
  },
  {
    id: '3',
    title: 'Quantum Flow',
    description: 'Application de productivité avec automatisation intelligente des workflows.',
    image: '/projects/quantum.jpg',
    category: 'productivity',
    antigravity_score: 97,
  },
  {
    id: '4',
    title: 'Stellar E-commerce',
    description: 'Plateforme e-commerce headless avec expérience 3D immersive.',
    image: '/projects/stellar.jpg',
    category: 'development',
    antigravity_score: 96,
  },
  {
    id: '5',
    title: 'Zenith Branding',
    description: 'Identité visuelle complète pour une startup fintech innovante.',
    image: '/projects/zenith.jpg',
    category: 'design',
    antigravity_score: 98,
  },
  {
    id: '6',
    title: 'Orbit CRM',
    description: 'CRM intelligent avec intégration IA pour la gestion client.',
    image: '/projects/orbit.jpg',
    category: 'productivity',
    antigravity_score: 95,
  },
];

export function ProjectsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { t, language, toggleLanguage } = useI18n();
  
  const [rawProjects, setRawProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'development' | 'productivity'>('all');

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    
    // 2.5 second timeout to prevent getting stuck in skeleton loading state
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase request timed out')), 2500)
    );

    try {
      const fetchPromise = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      const response = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]) as { data: any[] | null; error: any };

      if (response.error) throw response.error;
      if (response.data && response.data.length > 0) {
        setRawProjects(response.data);
      } else {
        setRawProjects(fallbackProjects);
      }
    } catch (error) {
      console.error('Error loading projects or connection timed out:', error);
      setRawProjects(fallbackProjects);
    } finally {
      setIsLoading(false);
    }
  };

  const getUnifiedProjects = (): UnifiedProject[] => {
    return rawProjects.map((p) => {
      const meta = projectsMetadata[p.id] || {
        year: p.created_at ? new Date(p.created_at).getFullYear().toString() : new Date().getFullYear().toString(),
        tags: [p.category.toUpperCase()],
        fullDescription: {
          fr: p.description,
          en: p.description,
        },
        githubUrl: undefined,
        demoUrl: undefined,
        gallery: [p.image],
      };

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        image: p.image,
        category: p.category,
        antigravityScore: p.antigravity_score,
        year: meta.year,
        tags: meta.tags,
        fullDescription: language === 'fr' ? meta.fullDescription.fr : meta.fullDescription.en,
        githubUrl: meta.githubUrl,
        demoUrl: meta.demoUrl,
        gallery: meta.gallery,
      };
    });
  };

  const unifiedProjects = getUnifiedProjects();

  const filteredProjects = activeFilter === 'all'
    ? unifiedProjects
    : unifiedProjects.filter((p) => p.category === activeFilter);

  const activeProject = unifiedProjects.find((p) => p.id === id);

  const filters: { key: typeof activeFilter; label: string }[] = [
    { key: 'all', label: language === 'fr' ? 'Tous' : 'All' },
    { key: 'design', label: language === 'fr' ? 'Design' : 'Design' },
    { key: 'development', label: language === 'fr' ? 'Développement' : 'Development' },
    { key: 'productivity', label: language === 'fr' ? 'Productivité' : 'Productivity' },
  ];

  // Close modal callback
  const handleCloseModal = () => {
    navigate('/projects');
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && id) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id]);

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
            <Link to="/" className="font-serif text-2xl font-bold text-[#F2F2F2] hover:opacity-80 transition-opacity">
              Neo<span className="text-[#C5864E]">Slim</span>
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

        {/* Projects Grid / Loading skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="glass-card rounded-2xl overflow-hidden p-4 border border-[#F2F2F2]/5 space-y-4">
                <Skeleton className="w-full aspect-[4/3] rounded-xl bg-white/5" />
                <Skeleton className="w-2/3 h-6 bg-white/5" />
                <Skeleton className="w-full h-12 bg-white/5" />
                <div className="flex gap-2">
                  <Skeleton className="w-12 h-5 bg-white/5" />
                  <Skeleton className="w-16 h-5 bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                            <span className="font-mono text-xs text-[#C5864E] uppercase tracking-wider block mb-2">
                              {project.category}
                            </span>
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
        )}
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
              className="glass-card rounded-3xl w-full max-w-4xl border border-white/10 overflow-hidden relative shadow-2xl my-8"
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeAntigravity }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button overlay */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-black/60 border border-white/10 hover:bg-black hover:border-[#C5864E]/40 text-[#A1A1AA] hover:text-[#F2F2F2] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual Section - 5cols */}
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[500px] overflow-hidden bg-[#161618]">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />

                  {/* Left Bottom Badges */}
                  <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-[#A1A1AA] backdrop-blur-md">
                      {activeProject.year}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-[#A1A1AA] backdrop-blur-md uppercase">
                      {activeProject.category}
                    </span>
                  </div>
                </div>

                {/* Content Section - 7cols */}
                <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between max-h-[85vh] md:max-h-none overflow-y-auto">
                  <div>
                    {/* Header score */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#C5864E] uppercase tracking-wider block">
                        {activeProject.category}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5864E]/10 border border-[#C5864E]/30">
                        <Star className="w-3.5 h-3.5 text-[#C5864E] fill-[#C5864E]" />
                        <span className="font-mono text-xs font-bold text-[#C5864E]">
                          {t('portfolio.antigravityScore') as string} : {activeProject.antigravityScore}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2F2F2] mb-6">
                      {activeProject.title}
                    </h2>

                    <div className="space-y-6 mb-8">
                      <div>
                        <h4 className="text-xs uppercase font-mono text-[#A1A1AA] tracking-wider mb-2">Description</h4>
                        <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed">
                          {activeProject.fullDescription}
                        </p>
                      </div>

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

                  {/* Actions / CTA Links */}
                  <div className="border-t border-[#F2F2F2]/5 pt-6 flex flex-wrap gap-4 items-center justify-end">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-xs text-[#A1A1AA] hover:text-[#F2F2F2] hover:underline transition-all font-mono"
                    >
                      {language === 'fr' ? '← Fermer la vue' : '← Close view'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
