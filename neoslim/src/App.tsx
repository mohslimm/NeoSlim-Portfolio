import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { I18nProvider } from './contexts/I18nContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useLenis } from './hooks/useLenis';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Portfolio } from './sections/Portfolio';
import { TechnicalDossiersVault } from './sections/TechnicalDossiersVault';
import { Footer } from './sections/Footer';
import { ClientMarquee } from './components/ClientMarquee';
import { SpotlightAura } from './components/SpotlightAura';
import { ArchitectureConsole } from './components/ArchitectureConsole';
import { SovereignLoader } from './components/SovereignLoader';
import './App.css';

// Lazy load heavy page views to optimize initial bundle size & load speed
const ProjectsPage = lazy(() => import('./sections/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const AdminLogin = lazy(() => import('./sections/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./sections/AdminDashboard').then(module => ({ default: module.AdminDashboard })));

// Grain Overlay Component
function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}

// Scroll Progress Indicator (Quiet Luxury Gold)
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#c5a059] to-[#e8c77a] z-[60]"
      style={{ width: `${progress}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    />
  );
}

// Custom Cursor Follower (Augments native cursor, desktop only)
function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-cursor')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 2.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 32,
          mass: 0.4,
        }}
        aria-hidden="true"
      >
        <div className="w-2 h-2 rounded-full bg-[#c5a059]" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        animate={{
          x: position.x - 18,
          y: position.y - 18,
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? '#e8c77a' : 'rgba(197, 160, 89, 0.3)',
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 18,
          mass: 0.6,
        }}
        aria-hidden="true"
      >
        <div className="w-9 h-9 rounded-full border border-[#c5a059]/30" />
      </motion.div>
    </>
  );
}

// Main Page Component — Streamlined Sovereign Architecture
function MainPage() {
  return (
    <main id="main" tabIndex={-1} className="relative w-full overflow-x-hidden bg-[#060610] focus:outline-none">
      <Navigation />
      <Hero />
      <ClientMarquee />
      <Portfolio />
      <TechnicalDossiersVault />
      <Skills />
      <Footer />
    </main>
  );
}

// Protected Admin Route
function ProtectedAdminRoute() {
  const { user, isLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060610] flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-2 border-[#c5a059] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!user && !isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}

// App Content with Router
function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<ProtectedAdminRoute />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ArchitectureConsole />
    </Router>
  );
}

// Main App
export function App() {
  useLenis(); // Connects Lenis smooth scroll to master GSAP ticker!
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Mohamed Slimani | Lead Architect & AI Systems Engineer — Stepping Stones Agency';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Mohamed Slimani — Lead Architect & Founder of Stepping Stones Agency. High-frequency algo trading, 58 Wilayas fraud radar, multi-LLM gateways and Quiet Luxury digital systems.'
      );
    }
  }, []);

  return (
    <I18nProvider>
      <AuthProvider>
        {/* Accessibility Skip Link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-2.5 focus:bg-[#c5a059] focus:text-[#060610] focus:font-mono focus:text-xs focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-none"
        >
          Passer au contenu principal
        </a>

        {/* Ambient Overlays */}
        <SpotlightAura />
        <GrainOverlay />
        <ScrollProgress />
        <CustomCursor />

        {/* Sovereign Loader */}
        {!hasLoaded && (
          <SovereignLoader onComplete={() => setHasLoaded(true)} />
        )}

        {/* Core Application View */}
        <Suspense fallback={
          <div className="min-h-screen bg-[#060610] flex items-center justify-center">
            <div className="w-10 h-10 border border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin" />
          </div>
        }>
          <AppContent />
        </Suspense>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
