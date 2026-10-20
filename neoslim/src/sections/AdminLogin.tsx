import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const AdminLogin = memo(({ onLogin }: AdminLoginProps) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Master Passkey check for Mohamed Slimani & Stepping Stones Agency
    const isMasterKey =
      (email.trim().toLowerCase() === 'admin@neoslim.online' ||
       email.trim().toLowerCase() === 'mohslimm' ||
       email.trim().toLowerCase() === 'mohslimm2001@gmail.com') &&
      (password === 'steppingstones2026' || password === 'admin2026' || password === 'neoslim');

    if (isMasterKey) {
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 400);
      return;
    }

    // Otherwise try Supabase Auth
    try {
      const { error: supaError } = await signIn(email, password);
      if (supaError) {
        setError('Identifiants non reconnus. Utilisez votre Passkey Direction ou le compte Administrateur.');
        setIsLoading(false);
      } else {
        onLogin();
      }
    } catch {
      setError('Erreur d\'authentification. Veuillez vérifier votre connexion.');
      setIsLoading(false);
    }
  };

  const handleQuickMasterLogin = () => {
    setEmail('admin@neoslim.online');
    setPassword('steppingstones2026');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#05050e] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Volumetric Gold Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#c5a059]/15 to-transparent blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,14,0.85)_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: easeAntigravity }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a0a16]/95 border border-[#c5a059]/30 rounded-2xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(197,160,89,0.12)] backdrop-blur-xl">
          
          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full border border-[#c5a059] bg-[#c5a059]/10 mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(197,160,89,0.25)]">
              <ShieldCheck className="w-7 h-7 text-[#c5a059]" />
            </div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a059] block mb-1">
              Stepping Stones &bull; Master Console
            </span>
            <h1 className="text-3xl font-display text-white font-light">
              Direction <span className="italic text-[#c5a059]">Portfolio</span>
            </h1>
            <p className="text-xs text-white/50 mt-1 font-light">
              Administration des 28 projets et du pipeline d'affaires.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Identifiant ou Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/70" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@neoslim.online ou mohslimm"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Passkey de Sécurité
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/70" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all font-sans"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#140e02] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ouvrir la Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

          </form>

          {/* Quick Demo Master Access button for Mohamed */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleQuickMasterLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white/70 hover:text-[#e8c77a] text-xs font-mono transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Accès Immédiat (Mohamed Slimani)</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-[11px] text-white/40 hover:text-white/70 font-mono transition-colors"
            >
              &larr; Retour au site public
            </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
});

AdminLogin.displayName = 'AdminLogin';
