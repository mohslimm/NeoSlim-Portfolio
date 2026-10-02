import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { allProjects, type ProjectItem } from '../data/projectsData';
import { ScrambleText } from '../components/ScrambleText';
import { preloadProjectsPage } from '../lib/preload';
import {
  ExternalLink,
  ArrowUpRight,
  Rotate3d,
  Cpu,
  ShieldCheck,
  Play,
  Pause,
} from 'lucide-react';

const CUBE_FACES = [
  { key: 'front', label: 'Front', rx: 0, ry: 0, index: 0 },
  { key: 'right', label: 'Right', rx: 0, ry: -90, index: 1 },
  { key: 'back', label: 'Back', rx: 0, ry: -180, index: 2 },
  { key: 'left', label: 'Left', rx: 0, ry: 90, index: 3 },
  { key: 'top', label: 'Top', rx: -90, ry: 0, index: 4 },
  { key: 'bottom', label: 'Bottom', rx: 90, ry: 0, index: 5 },
] as const;

export const ProjectCubeShowcase = memo(function ProjectCubeShowcase() {
  const { language } = useI18n();

  // Top 6 flagship projects mapped to the 6 faces
  const cubeProjects: ProjectItem[] = [
    allProjects.find((p) => p.id === 'anis-phone') || allProjects[0],
    allProjects.find((p) => p.id === 'stonelink') || allProjects[1],
    allProjects.find((p) => p.id === 'nexus-horizon') || allProjects[2],
    allProjects.find((p) => p.id === 'kachef') || allProjects[3],
    allProjects.find((p) => p.id === 'tropicalboat') || allProjects[4],
    allProjects.find((p) => p.id === 'resortos') || allProjects[5],
  ];

  const [activeFaceIdx, setActiveFaceIdx] = useState<number>(0);
  const [rotX, setRotX] = useState<number>(-12);
  const [rotY, setRotY] = useState<number>(-24);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStartRef = useRef({ x: 0, y: 0, rx: -12, ry: -24 });
  const autoOrbitRef = useRef<number | null>(null);

  const activeProject = cubeProjects[activeFaceIdx] || cubeProjects[0];

  // Rotate cube to target face
  const snapToFace = useCallback((faceIdx: number) => {
    setActiveFaceIdx(faceIdx);
    setIsAutoOrbit(false);
    const target = CUBE_FACES[faceIdx];
    if (target) {
      setRotX(target.rx);
      setRotY(target.ry);
    }
  }, []);

  // Auto-orbit loop
  useEffect(() => {
    if (!isAutoOrbit || isDragging) {
      if (autoOrbitRef.current) cancelAnimationFrame(autoOrbitRef.current);
      return;
    }

    let lastTime = performance.now();
    const orbitSpeed = 16; // degrees per second

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setRotY((prev) => (prev + delta * orbitSpeed) % 360);
      setRotX(-12 + Math.sin(now * 0.0008) * 8);

      autoOrbitRef.current = requestAnimationFrame(loop);
    };

    autoOrbitRef.current = requestAnimationFrame(loop);

    return () => {
      if (autoOrbitRef.current) cancelAnimationFrame(autoOrbitRef.current);
    };
  }, [isAutoOrbit, isDragging]);

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoOrbit(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rx: rotX,
      ry: rotY,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const newRy = dragStartRef.current.ry + dx * 0.45;
    const newRx = Math.max(-85, Math.min(85, dragStartRef.current.rx - dy * 0.45));

    setRotX(newRx);
    setRotY(newRy);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored
    }

    // Determine closest face to snap active readout
    const normalizedY = ((rotY % 360) + 360) % 360;
    if (rotX < -45) {
      setActiveFaceIdx(4); // top
    } else if (rotX > 45) {
      setActiveFaceIdx(5); // bottom
    } else if (normalizedY >= 315 || normalizedY < 45) {
      setActiveFaceIdx(0); // front
    } else if (normalizedY >= 45 && normalizedY < 135) {
      setActiveFaceIdx(3); // left (viewed from right)
    } else if (normalizedY >= 135 && normalizedY < 225) {
      setActiveFaceIdx(2); // back
    } else {
      setActiveFaceIdx(1); // right
    }
  };

  return (
    <section
      id="showcase3d"
      className="relative py-28 md:py-36 bg-[#060610] text-[#f0ede8] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.08)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(197,160,89,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#e8c77a] font-mono text-xs uppercase tracking-widest mb-4">
            <Rotate3d className="w-3.5 h-3.5 text-[#c5a059] animate-spin" style={{ animationDuration: '8s' }} />
            <span>3D Interactive Engineering</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-5">
            Flagship Matrix <span className="italic gradient-text">3D</span>
          </h2>

          <p className="text-sm md:text-base text-[#f0ede8]/60 font-light max-w-xl mx-auto leading-relaxed">
            {language === 'fr'
              ? 'Explorez mes architectures phares en 3D spatiale. Manipulez le cube à la souris ou au touch pour inspecter chaque composante technique.'
              : 'Explore my flagship architectures in interactive 3D space. Drag the cube to inspect each engineering face.'}
          </p>
        </div>

        {/* Face Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {cubeProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => snapToFace(idx)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 border ${
                activeFaceIdx === idx
                  ? 'bg-[#c5a059] text-[#060610] font-semibold border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                  : 'bg-white/[0.03] text-[#f0ede8]/70 border-white/[0.08] hover:border-[#c5a059]/40 hover:text-[#f0ede8]'
              }`}
            >
              0{idx + 1} // {p.title.split(' ')[0]}
            </button>
          ))}

          <button
            onClick={() => setIsAutoOrbit(!isAutoOrbit)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs border border-white/[0.08] bg-white/[0.02] text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors ml-2"
            title={isAutoOrbit ? 'Pause Orbit' : 'Play Auto-Orbit'}
          >
            {isAutoOrbit ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoOrbit ? 'ORBIT' : 'MANUAL'}</span>
          </button>
        </div>

        {/* 3D Scene + Active Face Telemetry Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Stage (Columns 7) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[390px] md:h-[390px] cursor-grab active:cursor-grabbing select-none"
              style={{
                perspective: '1100px',
                touchAction: 'none',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Ground Shadow Ring */}
              <div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[320px] h-[80px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(197,160,89,0.2) 0%, rgba(0,0,0,0.8) 50%, transparent 75%)',
                  transform: 'rotateX(80deg)',
                  filter: 'blur(10px)',
                }}
              />

              {/* 3D Cube Container */}
              <div
                className="w-full h-full relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* 6 Faces */}
                {cubeProjects.map((p, idx) => {
                  const faceConfig = CUBE_FACES[idx];
                  const isActive = activeFaceIdx === idx;

                  // CSS 3D Face Transforms based on cube half-size
                  const faceStyleMap: Record<string, string> = {
                    front: 'translateZ(clamp(140px, 20vw, 195px))',
                    back: 'rotateY(180deg) translateZ(clamp(140px, 20vw, 195px))',
                    right: 'rotateY(90deg) translateZ(clamp(140px, 20vw, 195px))',
                    left: 'rotateY(-90deg) translateZ(clamp(140px, 20vw, 195px))',
                    top: 'rotateX(90deg) translateZ(clamp(140px, 20vw, 195px))',
                    bottom: 'rotateX(-90deg) translateZ(clamp(140px, 20vw, 195px))',
                  };

                  return (
                    <div
                      key={p.id}
                      onClick={() => snapToFace(idx)}
                      className={`absolute inset-0 rounded-2xl overflow-hidden border transition-all duration-300 ${
                        isActive
                          ? 'border-[#c5a059] shadow-[0_0_35px_rgba(197,160,89,0.35)]'
                          : 'border-white/10 hover:border-[#c5a059]/60'
                      }`}
                      style={{
                        transform: faceStyleMap[faceConfig.key],
                        backfaceVisibility: 'hidden',
                        background: '#0a0a14',
                      }}
                    >
                      {/* Face Image */}
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />

                      {/* Scrim Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060610] via-[#060610]/40 to-transparent" />

                      {/* Face HUD Overlays */}
                      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between pointer-events-none">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[#c5a059] border border-[#c5a059]/30">
                            FACE 0{idx + 1} // {faceConfig.label.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#e8c77a] px-2 py-0.5 rounded-full bg-black/60 border border-[#c5a059]/40">
                            ★ {p.antigravityScore}
                          </span>
                        </div>

                        <div>
                          <div className="font-serif text-lg sm:text-xl font-bold text-[#f0ede8] mb-1 drop-shadow-md">
                            {p.title}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#c5a059]">
                            <span>{p.tags[0]}</span>
                            <span>•</span>
                            <span>{p.tags[1]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Corner Tech Accents */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#c5a059]/50 pointer-events-none" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#c5a059]/50 pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Micro Interaction Hint */}
            <p className="mt-8 font-mono text-[11px] text-[#f0ede8]/40 tracking-widest uppercase flex items-center gap-2">
              <Rotate3d className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>DRAG TO ROTATE 3D • CLICK ANY FACE TO INSPECT</span>
            </p>
          </div>

          {/* Active Project Telemetry Readout (Columns 5) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-[#0c0c1a]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Gold Top Light Bar */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />

                {/* Header Strip */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
                    <span className="font-mono text-xs text-[#c5a059] tracking-widest uppercase">
                      FLAGSHIP SPEC // 0{activeFaceIdx + 1}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#f0ede8]/50 px-2.5 py-1 rounded bg-white/[0.04]">
                    {activeProject.year}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f0ede8] mb-2">
                  <ScrambleText text={activeProject.title} duration={0.6} />
                </h3>

                {/* Tagline */}
                <p className="text-sm font-light text-[#c5a059] mb-4 italic">
                  {language === 'fr' ? activeProject.taglineFr : activeProject.taglineEn}
                </p>

                {/* Description */}
                <p className="text-sm text-[#f0ede8]/70 leading-relaxed mb-6 font-light">
                  {language === 'fr'
                    ? activeProject.descriptionFr
                    : activeProject.descriptionEn}
                </p>

                {/* Key Innovation Card */}
                <div className="rounded-xl p-3.5 mb-6 border border-[#c5a059]/20 bg-[#c5a059]/[0.04]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                    <span className="font-mono text-[11px] font-semibold text-[#e8c77a] uppercase tracking-wider">
                      {language === 'fr' ? 'Innovation Clé' : 'Key Innovation'}
                    </span>
                  </div>
                  <p className="text-xs text-[#f0ede8]/80 font-mono">
                    {language === 'fr'
                      ? activeProject.keyAchievementFr
                      : activeProject.keyAchievementEn}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#f0ede8]/50 uppercase tracking-widest mb-2.5">
                    <Cpu className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Tech Architecture</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] text-[#f0ede8]/80 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to={`/projects/${activeProject.id}`}
                    onMouseEnter={preloadProjectsPage}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-[#060610] bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:brightness-110 transition-all font-sans"
                  >
                    <span>{language === 'fr' ? 'Explorer le Projet' : 'Explore Project'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  {activeProject.demoUrl && (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[#f0ede8] hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

ProjectCubeShowcase.displayName = 'ProjectCubeShowcase';
