import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { ExternalLink, Star, Filter, ArrowUpRight } from 'lucide-react';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Category = 'all' | 'design' | 'development' | 'productivity';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Exclude<Category, 'all'>;
  antigravityScore: number;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Nebula Dashboard',
    description: 'Tableau de bord analytics avec visualisation de données temps réel et IA prédictive.',
    image: '/projects/nebula.jpg',
    category: 'development',
    antigravityScore: 98,
    year: '2024',
    tags: ['React', 'D3.js', 'Python'],
  },
  {
    id: '2',
    title: 'Aurora Design System',
    description: 'Système de design complet avec 200+ composants et documentation interactive.',
    image: '/projects/aurora.jpg',
    category: 'design',
    antigravityScore: 99,
    year: '2024',
    tags: ['Figma', 'Storybook', 'Tokens'],
  },
  {
    id: '3',
    title: 'Quantum Flow',
    description: 'Application de productivité avec automatisation intelligente des workflows.',
    image: '/projects/quantum.jpg',
    category: 'productivity',
    antigravityScore: 97,
    year: '2024',
    tags: ['Next.js', 'OpenAI', 'Prisma'],
  },
  {
    id: '4',
    title: 'Stellar E-commerce',
    description: 'Plateforme e-commerce headless avec expérience 3D immersive.',
    image: '/projects/stellar.jpg',
    category: 'development',
    antigravityScore: 96,
    year: '2023',
    tags: ['Next.js', 'Three.js', 'Stripe'],
  },
  {
    id: '5',
    title: 'Zenith Branding',
    description: 'Identité visuelle complète pour une startup fintech innovante.',
    image: '/projects/zenith.jpg',
    category: 'design',
    antigravityScore: 98,
    year: '2023',
    tags: ['Branding', 'Motion', 'Web'],
  },
  {
    id: '6',
    title: 'Orbit CRM',
    description: 'CRM intelligent avec intégration IA pour la gestion client.',
    image: '/projects/orbit.jpg',
    category: 'productivity',
    antigravityScore: 95,
    year: '2023',
    tags: ['Vue.js', 'Node.js', 'GPT-4'],
  },
];

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'design', label: 'Design' },
  { key: 'development', label: 'Développement' },
  { key: 'productivity', label: 'Productivité' },
];

export function Portfolio() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const getFilterLabel = (key: Category) => {
    if (key === 'all') return (t('portfolio.filters.all') as string) || 'Tous';
    return (t(`portfolio.filters.${key}`) as string) || key;
  };

  return (
    <section id="portfolio" className="relative py-32 bg-[#0A0A0B] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 134, 78, 0.08) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: easeAntigravity }}
        >
          <motion.span
            className="inline-block font-mono text-sm text-[#C5864E] tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('portfolio.subtitle') as string}
          </motion.span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6">
            {t('portfolio.title') as string}{' '}
            <span className="italic gradient-text">Sélection</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            {t('portfolio.description') as string}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Filter className="w-5 h-5 text-[#A1A1AA] mr-2" />
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === filter.key
                  ? 'bg-[#C5864E]/20 border-[#C5864E] text-[#C5864E]'
                  : 'border-[#A1A1AA]/20 text-[#A1A1AA] hover:border-[#C5864E]/50 hover:text-[#F2F2F2]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getFilterLabel(filter.key)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.6,
                  ease: easeAntigravity,
                  delay: index * 0.1,
                }}
                className="group relative"
              >
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent z-10"
                    />
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: easeAntigravity }}
                    />

                    {/* Antigravity Score Badge */}
                    <motion.div
                      className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full antigravity-score"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <Star className="w-3 h-3 text-[#C5864E] fill-[#C5864E]" />
                      <span className="font-mono text-xs font-bold text-[#C5864E]">
                        {project.antigravityScore}
                      </span>
                    </motion.div>

                    {/* Year Badge */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-[#0A0A0B]/60 backdrop-blur-sm">
                      <span className="font-mono text-xs text-[#A1A1AA]">{project.year}</span>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-[#C5864E]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-2 group-hover:text-[#C5864E] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#A1A1AA] text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono text-[#A1A1AA] bg-[#1a1a1a] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project Link */}
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm text-[#C5864E] font-medium group/link"
                      whileHover={{ x: 4 }}
                    >
                      <span>{t('portfolio.viewProject') as string}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 glass-card rounded-full text-[#F2F2F2] hover:border-[#C5864E]/50 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">Voir tous les projets</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
