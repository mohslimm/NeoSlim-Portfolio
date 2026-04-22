import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { 
  Code2, 
  Server, 
  Brain, 
  Palette,
} from 'lucide-react';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

const skillCategories = [
  {
    id: 'frontend',
    icon: Code2,
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Framer Motion', level: 90 },
      { name: 'Three.js', level: 85 },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'GraphQL', level: 80 },
      { name: 'REST APIs', level: 92 },
    ],
  },
  {
    id: 'ai',
    icon: Brain,
    skills: [
      { name: 'OpenAI API', level: 90 },
      { name: 'LangChain', level: 85 },
      { name: 'Machine Learning', level: 78 },
      { name: 'NLP', level: 82 },
      { name: 'AutoGPT', level: 88 },
    ],
  },
  {
    id: 'devops',
    icon: Palette,
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD', level: 88 },
      { name: 'Git', level: 92 },
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
                className="skill-card glass-card rounded-2xl p-8 relative overflow-hidden group"
                whileHover={{ y: -8, transition: { duration: 0.4, ease: easeAntigravity } }}
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(197, 134, 78, 0.15) 0%, transparent 60%)',
                  }}
                />

                {/* Category Header */}
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[#C5864E]/10 flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-[#C5864E]" />
                  </motion.div>
                  <h3 className="font-serif text-2xl font-semibold text-[#F2F2F2]">
                    {categoryTitle}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="relative z-10 space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#F2F2F2] text-sm font-medium">{skill.name}</span>
                        <span className="font-mono text-sm text-[#C5864E]">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full relative"
                          style={{
                            background: 'linear-gradient(90deg, #C5864E 0%, #E5A76E 100%)',
                            width: `${skill.level}%`,
                          }}
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + skillIndex * 0.1, duration: 1, ease: easeAntigravity }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                              delay: skillIndex * 0.2,
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#C5864E]" />
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
