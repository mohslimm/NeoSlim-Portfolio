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
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeAntigravity }}
          >
            <motion.span
              className="inline-block font-mono text-sm text-[#C5864E] tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('footer.contact') as string}
            </motion.span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#F2F2F2] mb-8">
              Travaillons{' '}
              <span className="italic gradient-text">ensemble</span>
            </h2>
            <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto mb-10">
              Vous avez un projet en tête ? Discutons de la façon dont je peux vous aider à le réaliser.
            </p>
            <motion.a
              href="mailto:neoslim.dev@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5864E] text-[#0A0A0B] rounded-full font-medium text-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>neoslim.dev@gmail.com</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* Main Footer */}
        <div className="border-t border-[#C5864E]/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                  Neo<span className="text-[#C5864E]">Slim</span>
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
                  Développeur Créatif & UI/UX Designer spécialisé dans la création d'expériences digitales qui défient la gravité.
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#A1A1AA] hover:text-[#C5864E] hover:bg-[#C5864E]/10 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Icon className="w-5 h-5" />
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
                © {new Date().getFullYear()} NeoSlim Agency. {t('footer.rights') as string}
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
