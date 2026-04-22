import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { I18nProvider } from './contexts/I18nContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { DataViz } from './sections/DataViz';
import { Portfolio } from './sections/Portfolio';
import { Footer } from './sections/Footer';
import { AdminLogin } from './sections/AdminLogin';
import { AdminDashboard } from './sections/AdminDashboard';
import './App.css';

// Grain Overlay Component
function GrainOverlay() {
  return <div className="grain-overlay" />;
}

// Scroll Progress Indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-[#C5864E] z-[60]"
      style={{ width: `${progress}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// Custom Cursor (Desktop only)
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseover', handleMouseOver, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[#C5864E]" />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-[99]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        <div className="w-10 h-10 rounded-full border border-[#C5864E]/30" />
      </motion.div>
    </>
  );
}

// Main Page Component
function MainPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#0A0A0B]">
      <Navigation />
      <Hero />
      <Skills />
      <DataViz />
      <Portfolio />
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
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-2 border-[#C5864E] border-t-transparent rounded-full"
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Main App
function App() {
  useEffect(() => {
    // Set document title and meta
    document.title = 'NeoSlim Agency | Mohamed Slimani - Développeur Créatif & UI/UX Designer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Portfolio de Mohamed Slimani - Développeur Créatif & UI/UX Designer spécialisé dans les expériences digitales qui défient la gravité.'
      );
    }
  }, []);

  return (
    <I18nProvider>
      <AuthProvider>
        <GrainOverlay />
        <ScrollProgress />
        <CustomCursor />
        <AppContent />
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
