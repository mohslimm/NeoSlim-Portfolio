import { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { Calculator, Check, ArrowUpRight, Cpu, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { playClick, playChime } from '../lib/soundFx';

interface ProjectTypeOption {
  id: string;
  nameFr: string;
  nameEn: string;
  descFr: string;
  descEn: string;
  baseWeeks: number;
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'saas',
    nameFr: 'Plateforme SaaS & Architecture MERN',
    nameEn: 'SaaS Platform & MERN Architecture',
    descFr: 'Application cloud haute cadence avec bases de données relationnelles ou NoSQL et API REST/GraphQL.',
    descEn: 'High-throughput cloud application with relational/NoSQL databases and REST/GraphQL APIs.',
    baseWeeks: 4,
  },
  {
    id: 'niche',
    nameFr: 'Web App de Niche Ultra-Luxury',
    nameEn: 'Ultra-Luxury Niche Web App',
    descFr: 'Expérience sur-mesure pour marchés privés (Banque Privée, Immobilier d\'Exception, Clinique ou Supercars).',
    descEn: 'Bespoke high-ticket experience for private markets (Private Banking, Estates, Surgery or Supercars).',
    baseWeeks: 3,
  },
  {
    id: 'erp',
    nameFr: 'ERP d\'Entreprise & Système de Gestion',
    nameEn: 'Enterprise ERP & Backoffice System',
    descFr: 'Système complet de pilotage d\'atelier, suivi de stocks, gestion locative ou facturation sécurisée.',
    descEn: 'Complete operational cockpit: workshop repair tracking, inventory, lease management or invoicing.',
    baseWeeks: 5,
  },
  {
    id: 'audit',
    nameFr: 'Audit de Performance & Cyber-Hardening',
    nameEn: 'Performance Audit & Cyber-Hardening',
    descFr: 'Optimisation drastique Core Web Vitals 100%, refonte de sécurité OWASP et implémentation Passkeys.',
    descEn: 'Drastic Core Web Vitals 100% boost, OWASP security remediation and Passkey integration.',
    baseWeeks: 2,
  },
];

interface AddonOption {
  id: string;
  nameFr: string;
  nameEn: string;
  tag: string;
}

const ADDONS: AddonOption[] = [
  { id: '3d', nameFr: 'Ambiance 3D WebGL & Shaders Canvas', nameEn: '3D WebGL & Canvas Shaders Ambiance', tag: 'Three.js / FBM' },
  { id: 'auth', nameFr: 'Authentification FIDO2 Passkeys & 2FA', nameEn: 'FIDO2 Passkeys & 2FA Strong Auth', tag: 'Zero-Trust' },
  { id: 'stripe', nameFr: 'Tunnel de Paiement Stripe & Facturation', nameEn: 'Stripe Payments & Billing Funnel', tag: 'FinTech' },
  { id: 'i18n', nameFr: 'Localisation Trilingue & Typographie RTL', nameEn: 'Trilingual Localisation & RTL Support', tag: 'Global' },
  { id: 'crm', nameFr: 'Pipeline CRM & Boîte de Réception Leads', nameEn: 'CRM Pipeline & Lead Qualification Box', tag: 'Automation' },
  { id: 'ai', nameFr: 'Routage IA Multi-Modèles (OmniRoute)', nameEn: 'Multi-Model AI Routing (OmniRoute)', tag: 'AI Engine' },
];

export const ArchitectureSimulator = memo(function ArchitectureSimulator() {
  const { language } = useI18n();

  const [selectedType, setSelectedType] = useState<string>('niche');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['3d', 'auth', 'crm']);
  const [urgency, setUrgency] = useState<'standard' | 'sprint'>('standard');

  const toggleAddon = (id: string) => {
    playClick();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentType = useMemo(
    () => PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0],
    [selectedType]
  );

  const estimatedWeeks = useMemo(() => {
    const base = currentType.baseWeeks + Math.round(selectedAddons.length * 0.5);
    return urgency === 'sprint' ? Math.max(2, Math.round(base * 0.65)) : base;
  }, [currentType, selectedAddons, urgency]);

  const mailtoUrl = useMemo(() => {
    const typeLabel = language === 'fr' ? currentType.nameFr : currentType.nameEn;
    const addonsList = selectedAddons.join(', ');
    const subject = encodeURIComponent(`[Brief Projet] ${typeLabel} - Stepping Stones Agency`);
    const body = encodeURIComponent(
      `Bonjour Mohamed,\n\nJe souhaite échanger sur la conception d'une architecture technique :\n\n- Type : ${typeLabel}\n- Options sélectionnées : ${addonsList}\n- Délai souhaité : ${urgency === 'sprint' ? 'Sprint Prioritaire' : 'Standard Studio'}\n\nMerci de me recontacter pour planifier un échange confidentiel.`
    );
    return `mailto:neoslim.dev@gmail.com?subject=${subject}&body=${body}`;
  }, [currentType, selectedAddons, urgency, language]);

  return (
    <section id="simulator" className="relative py-28 bg-[#060610] overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 badge-luxury mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>CONFIDENTIAL ESTIMATION // STEPPING STONES</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#f0ede8] mb-5 tracking-tight">
            {language === 'fr' ? 'Simulateur d\'Architecture' : 'Architecture Scope Estimator'}{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#f0ede8] via-[#e8c77a] to-[#c5a059]">
              {language === 'fr' ? 'Sur-Mesure' : 'Bespoke'}
            </span>
          </h2>

          <p className="text-[#f0ede8]/70 text-base md:text-lg font-light leading-relaxed">
            {language === 'fr'
              ? 'Calibrez votre périmètre technique et vos impératifs d\'ingénierie pour projeter le calendrier de déploiement et la stack recommandée.'
              : 'Calibrate your engineering scope and technical standards to project delivery timelines and optimal stack architecture.'}
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: System Type */}
            <div className="luxury-card p-6 sm:p-7 bg-[#0a0a14]/75 border border-white/[0.08]">
              <span className="font-mono text-xs text-[#c5a059] uppercase tracking-wider block mb-4">
                01 // {language === 'fr' ? 'Nature de l\'Architecture' : 'Core Architecture Type'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        playClick();
                        setSelectedType(type.id);
                      }}
                      className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#c5a059]/15 border-[#c5a059] text-[#f0ede8] shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                          : 'bg-white/[0.02] border-white/[0.08] text-[#f0ede8]/70 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-serif text-base font-semibold text-[#f0ede8]">
                            {language === 'fr' ? type.nameFr : type.nameEn}
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-[#c5a059] shrink-0" />}
                        </div>
                        <p className="text-xs text-[#f0ede8]/60 line-clamp-2 leading-relaxed">
                          {language === 'fr' ? type.descFr : type.descEn}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Specific Engineering Addons */}
            <div className="luxury-card p-6 sm:p-7 bg-[#0a0a14]/75 border border-white/[0.08]">
              <span className="font-mono text-xs text-[#c5a059] uppercase tracking-wider block mb-4">
                02 // {language === 'fr' ? 'Exigences & Composants d\'Élite' : 'High-Ticket Engineering Modules'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#c5a059]/12 border-[#c5a059]/60 text-[#f0ede8]'
                          : 'bg-white/[0.02] border-white/[0.07] text-[#f0ede8]/70 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#c5a059] border-[#c5a059] text-[#060610]'
                              : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">
                          {language === 'fr' ? addon.nameFr : addon.nameEn}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded-full shrink-0">
                        {addon.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline & Cadence */}
            <div className="luxury-card p-6 bg-[#0a0a14]/75 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#c5a059] uppercase tracking-wider block mb-1">
                  03 // {language === 'fr' ? 'Cadence de Déploiement' : 'Delivery Cadence'}
                </span>
                <p className="text-xs text-[#f0ede8]/60">
                  {language === 'fr'
                    ? 'Choisissez entre le rythme standard studio ou un sprint dédié accéléré.'
                    : 'Select between standard studio pace or an accelerated priority sprint.'}
                </p>
              </div>

              <div className="flex items-center gap-2 p-1 rounded-full bg-white/[0.04] border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setUrgency('standard');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                    urgency === 'standard'
                      ? 'bg-[#c5a059] text-[#060610] font-bold shadow'
                      : 'text-[#f0ede8]/70 hover:text-[#f0ede8]'
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setUrgency('sprint');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                    urgency === 'sprint'
                      ? 'bg-[#c5a059] text-[#060610] font-bold shadow'
                      : 'text-[#f0ede8]/70 hover:text-[#f0ede8]'
                  }`}
                >
                  ⚡ Sprint VIP
                </button>
              </div>
            </div>
          </div>

          {/* Synthesis Card Column (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="luxury-card p-7 sm:p-8 bg-[#0c0c1c]/90 border border-[#c5a059]/35 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,160,89,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />

              <div className="flex items-center justify-between mb-6">
                <span className="badge-luxury text-[10px]">
                  {language === 'fr' ? 'SYNTHÈSE DU PÉRIMÈTRE' : 'ARCHITECTURE BRIEF'}
                </span>
                <span className="font-mono text-xs text-[#22c55e] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  SLA Garanti
                </span>
              </div>

              {/* Delivery Window */}
              <div className="mb-6 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#f0ede8]/60 uppercase mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{language === 'fr' ? 'Délai d\'Itération Estimé' : 'Estimated Delivery Window'}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#f0ede8]">
                    {estimatedWeeks}
                  </span>
                  <span className="font-serif text-xl text-[#c5a059] italic">
                    {language === 'fr' ? 'Semaines de travail' : 'Weeks of Engineering'}
                  </span>
                </div>
              </div>

              {/* Architecture Blueprint Specifications */}
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#c5a059] uppercase tracking-wider mb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Stack Recommandée</span>
                  </div>
                  <p className="text-xs text-[#f0ede8]/80 font-mono bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                    React 19 + TypeScript + Node/Express + PostgreSQL + Tailwind v4 + Framer Motion
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#c5a059] uppercase tracking-wider mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Garanties Stepping Stones</span>
                  </div>
                  <ul className="text-xs text-[#f0ede8]/70 space-y-1 font-light">
                    <li>• Performance Lighthouse 98+ & CLS &lt; 0.01</li>
                    <li>• Code TypeScript Strict (zéro any, zéro Dette)</li>
                    <li>• Design System Quiet Luxury exclusif</li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <motion.a
                href={mailtoUrl}
                onClick={playChime}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-semibold text-sm btn-gold-cta group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4 text-[#1A1200]" />
                <span>
                  {language === 'fr' ? 'Transmettre le Dossier d\'Architecture' : 'Submit Architecture Scope'}
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ArchitectureSimulator.displayName = 'ArchitectureSimulator';
