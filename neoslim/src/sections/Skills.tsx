import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { 
  Code2, 
  Server, 
  Terminal, 
  ShieldCheck,
} from 'lucide-react';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

const skillCategories = [
  {
    id: 'frontend',
    icon: Code2,
    skills: [
      { name: 'React / Next.js', level: 96 },
      { name: 'TypeScript', level: 94 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Figma (Design System)', level: 92 },
      { name: 'Framer Motion', level: 90 },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    skills: [
      { name: 'Node.js / Express', level: 92 },
      { name: 'MongoDB & PostgreSQL', level: 88 },
      { name: 'APIs REST & GraphQL', level: 94 },
      { name: 'Clean Architecture', level: 88 },
      { name: 'Redis / Caching', level: 85 },
    ],
  },
  {
    id: 'ai',
    icon: Terminal,
    skills: [
      { name: 'Docker / Containerization', level: 90 },
      { name: 'CI/CD (GitHub Actions)', level: 88 },
      { name: 'Scripting (Bash / Python)', level: 85 },
      { name: 'Automatisation (n8n, Make)', level: 92 },
      { name: 'Cloud (AWS)', level: 80 },
    ],
  },
  {
    id: 'devops',
    icon: ShieldCheck,
    skills: [
      { name: 'Web Performance (Lighthouse 100%)', level: 98 },
      { name: 'Sécurité OWASP & Audits', level: 88 },
      { name: 'Audit Technique', level: 90 },
      { name: 'SEO Technique', level: 92 },
      { name: 'Accessibilité WCAG', level: 88 },
    ],
  },
];

export function Skills() {
  const { t } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: easeAntigravity,
      },
    },
  };

  return (
    <section id="skills" className="relative py-32 bg-[#0A0A0B] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(197, 134, 78, 0.08) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
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
            {t('skills.subtitle') as string}
          </motion.span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6">
            {t('skills.title') as string}{' '}
            <span className="italic gradient-text">Tech</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            {t('skills.description') as string}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const categoryTitle = (t(`skills.categories.${category.id}`) as string) || category.id;

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="luxury-card rounded-2xl p-7 sm:p-8 relative overflow-hidden group bg-[#0a0a14]/70 border border-white/[0.08] hover:border-[#c5a059]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(197,160,89,0.1)] transition-all duration-500"
                whileHover={{ y: -6, transition: { duration: 0.35, ease: easeAntigravity } }}
              >
                {/* Subtle Radial Glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
                  }}
                />

                {/* Category Header */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-13 h-13 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/25 flex items-center justify-center p-3 text-[#c5a059]"
                      whileHover={{ rotate: 8, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-[#e8c77a]" />
                    </motion.div>
                    <div>
                      <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-widest block mb-0.5">
                        Domain 0{skillCategories.indexOf(category) + 1}
                      </span>
                      <h3 className="font-serif text-2xl font-semibold text-[#f0ede8]">
                        {categoryTitle}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#f0ede8]/40 border border-white/5 px-2.5 py-1 rounded-full bg-white/[0.02]">
                    5 Modules
                  </span>
                </div>

                {/* Skills List */}
                <div className="relative z-10 space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#f0ede8]/90 font-medium tracking-wide">{skill.name}</span>
                        <span className="font-mono text-xs font-semibold text-[#e8c77a]">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          className="h-full rounded-full relative"
                          style={{
                            background: 'linear-gradient(90deg, #c5a059 0%, #e8c77a 100%)',
                            width: `${skill.level}%`,
                          }}
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + skillIndex * 0.08, duration: 0.9, ease: easeAntigravity }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtle Decorative Hairline */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
                  <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c5a059]" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1, ease: easeAntigravity }}
        >
          {[
            { value: '15+', label: 'Technologies' },
            { value: '98%', label: 'Code Quality' },
            { value: '100%', label: 'Lighthouse' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl border border-[#C5864E]/10 hover:border-[#C5864E]/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
              whileHover={{ y: -4 }}
            >
              <p className="font-mono text-3xl font-bold text-[#C5864E] mb-1">{stat.value}</p>
              <p className="text-sm text-[#A1A1AA]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
