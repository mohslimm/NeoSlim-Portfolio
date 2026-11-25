import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { Check, Sparkles, Cpu, Zap, ShieldCheck, ArrowUpRight, Bot, Clock } from 'lucide-react';
import { playClick } from '../lib/soundFx';

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function MonetizedOffers() {
  const { language } = useI18n();
  const [selectedOffer, setSelectedOffer] = useState<'all' | 'flagship' | 'n8n' | 'retainer'>('all');

  const isFr = language === 'fr';

  return (
    <section id="offres" className="relative py-28 md:py-36 bg-[#060610] text-[#f0ede8] overflow-hidden border-t border-white/[0.06]">
      {/* Background Volumetric Gold Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeAntigravity }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f0f20] border border-[#c5a059]/30 text-xs font-mono text-[#c5a059]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFr ? 'SOLUTIONS CLÉ EN MAIN // RÉSULTAT GARANTI' : 'PRODUCTIZED HIGH-TICKET SUITE'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeAntigravity }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#f0ede8] tracking-tight leading-tight"
          >
            {isFr ? 'Deux Formules d’Élite.' : 'Two Bespoke Packages.'}{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f0ede8] via-[#e8c77a] to-[#c5a059]">
              {isFr ? 'Zéro Incertitude.' : 'Zero Guesswork.'}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeAntigravity }}
            className="text-[#f0ede8]/70 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            {isFr
              ? 'Fini la facturation horaire nébuleuse. Vous investissez dans une architecture propriétaire d’exception, livrée clé en main sous 10 à 21 jours avec des garanties mesurables (Lighthouse 98+, -30% délais de cycle).'
              : 'Predictable high-end delivery. Invest in sovereign, proprietary digital architectures engineered under 10 to 21 days with verifiable ROI.'}
          </motion.p>
        </div>

        {/* The 2 Core Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-14">
          
          {/* OFFRE 1: LE FLAGSHIP DIGITAL QUIET LUXURY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeAntigravity }}
            className="p-8 sm:p-10 rounded-3xl bg-[#0a0a14]/90 border border-white/[0.08] hover:border-[#c5a059]/40 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-[0_15px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#c5a059]/15 text-[#e8c77a] border border-[#c5a059]/30">
                  {isFr ? 'VITRINE SOUVERAINE & CONVERSION' : 'HIGH-CONVERSION FLAGSHIP'}
                </span>
                <span className="text-xs font-mono text-[#f0ede8]/50 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#c5a059]" />
                  <span>{isFr ? 'Délai : 14 à 21 jours' : 'Timeline: 14-21 days'}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f0ede8]">
                  {isFr ? 'Le Flagship Digital Quiet Luxury' : 'The Quiet Luxury Flagship'}
                </h3>
                <p className="text-xs sm:text-sm text-[#f0ede8]/65 mt-2 leading-relaxed">
                  {isFr
                    ? 'Conçu sur-mesure pour l’hôtellerie boutique, les domaines viticoles, l’immobilier de prestige, le yachting et les marques à fort panier moyen exigeant une distinction esthétique absolue.'
                    : 'Bespoke high-end web platforms for boutique hospitality, prestigious real estate, yachting charters, and luxury private offices.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060610]/80 border border-white/[0.06] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#e8c77a] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isFr ? 'Inclus dans votre déploiement :' : 'Key Architectural Deliverables:'}</span>
                </div>
                <ul className="text-xs space-y-2.5 text-[#f0ede8]/85">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span><strong>Next.js 15 / React 19</strong> (SSR/SSG, zéro template générique WordPress).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span><strong>Score Google Lighthouse 98+ garanti</strong> (SEO technique d’élite et affichage sous la seconde).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span><strong>Animations 60 FPS & Direction Artistique</strong> (Framer Motion / GSAP, typographies d’exception).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span><strong>Bouclier Cloudflare Edge & WAF</strong> (Protection DDoS, conformité OWASP & cache Edge global).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#f0ede8]/50 block">{isFr ? 'Tarif Forfaitaire Garanti :' : 'Flat Investment:'}</span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#e8c77a]">3 500 $ – 7 500 $</span>
                <span className="text-xs font-mono text-[#f0ede8]/50 ml-1.5">CAD / EUR</span>
              </div>
              <a
                href="mailto:mohamed.slimani.contact@gmail.com?subject=Brief%20Projet%20Flagship%20Digital%20Quiet%20Luxury&body=Bonjour%20Mohamed,%20je%20souhaite%20r%C3%A9server%20un%20d%C3%A9ploiement%20Flagship%20Quiet%20Luxury..."
                onClick={playClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-center text-xs font-bold tracking-wide text-[#1a1200] bg-gradient-to-r from-[#b8924a] via-[#c5a059] to-[#d4b57a] hover:from-[#c5a059] hover:to-[#e8c77a] transition-all shadow-lg hover:shadow-[0_0_25px_rgba(197,160,89,0.3)]"
              >
                {isFr ? 'Réserver ce Flagship →' : 'Book this Flagship →'}
              </a>
            </div>
          </motion.div>

          {/* OFFRE 2: SYSTÈME D'ACQUISITION & OPÉRATIONS IA (n8n) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeAntigravity }}
            className="p-8 sm:p-10 rounded-3xl bg-[#0a0a14]/90 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group shadow-[0_15px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {isFr ? 'IA OPÉRATIONNELLE & n8n ENTERPRISE' : 'AI OPS & WORKFLOW ORCHESTRATION'}
                </span>
                <span className="text-xs font-mono text-[#f0ede8]/50 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{isFr ? 'Délai : 7 à 14 jours' : 'Timeline: 7-14 days'}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f0ede8]">
                  {isFr ? 'Système Opérationnel IA & n8n' : 'Enterprise AI & n8n System'}
                </h3>
                <p className="text-xs sm:text-sm text-[#f0ede8]/65 mt-2 leading-relaxed">
                  {isFr
                    ? 'Automatisez 100% de la qualification client et supprimez 30% des coûts opérationnels. Conçu pour PME en scale, cabinets de conseil, courtiers et e-commerçants.'
                    : 'Eliminate manual operational bottlenecks and automate 100% of lead qualification via secured private n8n pipelines and multi-model LLMs.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060610]/80 border border-white/[0.06] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5" />
                  <span>{isFr ? 'Inclus dans votre architecture :' : 'System Architecture Included:'}</span>
                </div>
                <ul className="text-xs space-y-2.5 text-[#f0ede8]/85">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Serveur Docker n8n Enterprise dédié</strong> (hébergement souverain, 0 fuite de données vers des tiers).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Scoring & Qualification de leads par LLM</strong> (OpenAI, Claude, Gemini) en temps réel.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Synchronisation CRM & Données bidirectionnelle</strong> (HubSpot, Notion, Airtable, Slack, WhatsApp).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Monitoring de pannes & alertes immédiates</strong> avec gestion d’erreurs tolérante aux pannes.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#f0ede8]/50 block">{isFr ? 'Tarif Forfaitaire Garanti :' : 'Flat Investment:'}</span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">2 500 $ – 5 000 $</span>
                <span className="text-xs font-mono text-[#f0ede8]/50 ml-1.5">CAD / EUR</span>
              </div>
              <a
                href="mailto:mohamed.slimani.contact@gmail.com?subject=Brief%20Syst%C3%A8me%20Op%C3%A9rationnel%20IA%20n8n&body=Bonjour%20Mohamed,%20je%20souhaite%20d%C3%A9ployer%20un%20pipeline%20n8n%20d'automatisation..."
                onClick={playClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-center text-xs font-bold tracking-wide text-[#060610] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(52,211,153,0.3)]"
              >
                {isFr ? 'Déployer le Système IA →' : 'Deploy AI Pipeline →'}
              </a>
            </div>
          </motion.div>

        </div>

        {/* Retainers & SLA Section (MRR) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeAntigravity }}
          className="p-8 rounded-3xl bg-gradient-to-br from-[#0f0f20]/90 via-[#0a0a14] to-[#0f0f20]/90 border border-[#c5a059]/25 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#e8c77a]">
              {isFr ? 'SÉRÉNITÉ & PERFECTIONNEMENT CONTINU' : 'CONTINUOUS RELIABILITY & GROWTH'}
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#f0ede8]">
              {isFr ? 'Contrats de Retainer & Maintenance Récurrente (MRR)' : 'Monthly Engineering Retainers (MRR)'}
            </h4>
            <p className="text-xs sm:text-sm text-[#f0ede8]/70 max-w-2xl leading-relaxed">
              {isFr
                ? 'Sécurisez la souveraineté de vos actifs : Pack Edge Shield Cloudflare (350 $/mois) ou AI Ops Retainer complet avec maintenance de vos scénarios n8n et optimisations mensuelles (750 $/mois).'
                : 'Secure your assets with managed hosting, Cloudflare Edge monitoring ($350/mo), or a dedicated AI Ops & n8n retainer ($750/mo).'}
            </p>
          </div>

          <a
            href="#simulator"
            onClick={playClick}
            className="px-6 py-3.5 rounded-xl border border-[#c5a059] text-[#e8c77a] hover:bg-[#c5a059]/15 text-xs font-mono font-bold tracking-wider whitespace-nowrap transition-colors"
          >
            {isFr ? 'Simuler mon Projet →' : 'Simulate Scope →'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
