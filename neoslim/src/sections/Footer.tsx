import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from 'lucide-react';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

const socialLinks = [
  { icon: Github, href: 'https://github.com/mohslimm', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohamed-slimani-', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/mohsliimm', label: 'Twitter' },
  { icon: Mail, href: 'mailto:neoslim.dev@gmail.com', label: 'Email' },
];

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer id="contact" className="relative bg-[#0A0A0B] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(197, 134, 78, 0.1) 0%, transparent 60%)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 py-28">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeAntigravity }}
          >
            <motion.span
              className="inline-block badge-luxury mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              STEPPING STONES AGENCY • COLLABORATIONS SÉLECTIVES
            </motion.span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#f0ede8] mb-6 tracking-tight">
              Bâtissons votre{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f0ede8] via-[#e8c77a] to-[#c5a059]">
                architecture
              </span>
            </h2>
            <p className="text-[#f0ede8]/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Architectures logicielles critiques, plateformes web haute conversion ou refontes Quiet Luxury. Échangeons sur votre vision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:neoslim.dev@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base btn-gold-cta group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>neoslim.dev@gmail.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/mohamed-slimani-"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sm text-[#f0ede8] luxury-card hover:border-[#c5a059]/40 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Linkedin className="w-4 h-4 text-[#c5a059]" />
                <span>LinkedIn Profile</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Main Footer */}
        <div className="border-t border-white/[0.08] bg-[#060610]/90">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src="./logo.png" alt="NeoSlim Logo" className="h-12 w-auto object-contain" />
                  <div>
                    <span className="font-serif text-lg font-bold text-[#f0ede8] block">MOHAMED SLIMANI</span>
                    <span className="font-mono text-[9px] text-[#c5a059] tracking-widest uppercase">Stepping Stones Agency</span>
                  </div>
                </div>
                <p className="text-[#f0ede8]/60 text-xs leading-relaxed mb-6 font-light max-w-sm">
                  Senior Full-Stack Architect & Founder de Stepping Stones Agency. Spécialisé en systèmes critiques MERN / Next.js, sécurité défensive et design Quiet Luxury.
                </p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#f0ede8]/70 hover:text-[#e8c77a] hover:border-[#c5a059]/40 hover:bg-[#c5a059]/10 transition-all"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        aria-label={social.label}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <h4 className="font-mono text-sm text-[#C5864E] tracking-widest uppercase mb-6">
                  {t('footer.navigation') as string}
                </h4>
                <ul className="space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-[#A1A1AA] hover:text-[#F2F2F2] transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 h-[1px] bg-[#C5864E] group-hover:w-4 transition-all" />
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h4 className="font-mono text-sm text-[#C5864E] tracking-widest uppercase mb-6">
                  {t('footer.contact') as string}
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#A1A1AA] mb-1">Email</p>
                    <a
                      href="mailto:neoslim.dev@gmail.com"
                      className="text-[#F2F2F2] hover:text-[#C5864E] transition-colors"
                    >
                      neoslim.dev@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-[#A1A1AA] mb-1">Localisation</p>
                    <p className="text-[#F2F2F2]">Montréal, Québec</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#A1A1AA] mb-1">Disponibilité</p>
                    <div className="flex items-center gap-2">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-[#F2F2F2]">Ouvert aux projets</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#C5864E]/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#A1A1AA] flex items-center gap-1">
                © {new Date().getFullYear()} Mohamed Slimani. {t('footer.rights') as string}
              </p>
              <p className="text-sm text-[#A1A1AA] flex items-center gap-1">
                Fait avec <Heart className="w-4 h-4 text-[#C5864E] fill-[#C5864E]" /> à Montréal
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
