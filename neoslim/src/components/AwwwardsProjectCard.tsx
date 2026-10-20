import { useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '../data/projectsData';
import { playChime, playClick } from '../lib/soundFx';
import { preloadProjectsPage } from '../lib/preload';

interface AwwwardsProjectCardProps {
  project: ProjectItem;
  index: number;
  language: string;
  viewProjectLabel: string;
}

const easeAntigravity: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const AwwwardsProjectCard = memo(
  ({ project, index, language, viewProjectLabel }: AwwwardsProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse coordinates relative to card (0 to 1)
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // 3D Tilt Spring transforms
    const springConfig = { stiffness: 260, damping: 24, mass: 0.6 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), springConfig);

    // Specular Glare position
    const glareX = useTransform(mouseX, [0, 1], ['10%', '90%']);
    const glareY = useTransform(mouseY, [0, 1], ['10%', '90%']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      playChime();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    return (
      <motion.article
        layout
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -20 }}
        transition={{
          duration: 0.5,
          ease: easeAntigravity,
          delay: Math.min(index * 0.05, 0.4),
        }}
        className="relative perspective-[1200px]"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-[#090a18]/90 border border-white/[0.08] hover:border-[#c5a059]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(197,160,89,0.18)] transition-all duration-300 group"
        >
          {/* Specular Radial Gold Glare Overlay */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle 350px at ${gx} ${gy}, rgba(232, 199, 122, 0.16) 0%, rgba(197, 160, 89, 0.04) 40%, transparent 80%)`
              ),
            }}
          />

          {/* Top Image Media Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#070712] select-none">
            {/* Dark Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a18] via-transparent to-black/30 z-10 pointer-events-none" />

            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/projects/aegis-alpha-mt5-cover.svg';
              }}
            />

            {/* Antigravity Score Badge */}
            <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060610]/85 border border-[#c5a059]/40 backdrop-blur-md shadow-lg">
              <Star className="w-3 h-3 text-[#e8c77a] fill-[#e8c77a]" />
              <span className="font-mono text-xs font-bold text-[#e8c77a]">
                {project.antigravityScore}%
              </span>
            </div>

            {/* Year & Category Badge */}
            <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#f0ede8]/90 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                {project.year}
              </span>
              {project.isFlagship && (
                <span className="font-mono text-[9px] font-bold text-black px-2 py-0.5 rounded-full bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#e8c77a] uppercase tracking-wider shadow">
                  Flagship
                </span>
              )}
            </div>
          </div>

          {/* Card Body Information */}
          <div className="p-6 flex-1 flex flex-col justify-between relative z-20">
            <div>
              {/* Category Pill */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-[0.2em]">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-white/30">
                  #{project.id}
                </span>
              </div>

              {/* Title with Editorial Serif Display */}
              <h3 className="font-display text-2xl font-light text-[#f0ede8] mb-2.5 group-hover:text-[#e8c77a] transition-colors leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                {language === 'fr' ? project.descriptionFr : project.descriptionEn}
              </p>
            </div>

            <div>
              {/* Technical Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono text-white/70 bg-white/[0.03] border border-white/[0.08] rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#c5a059] bg-[#c5a059]/10 rounded-md">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Magnetic Luxury CTA Button */}
              <Link
                to={`/projects/${project.id}`}
                onClick={playClick}
                onMouseEnter={preloadProjectsPage}
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-mono text-[#f0ede8] bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#B8924A] hover:via-[#c5a059] hover:to-[#D4B57A] hover:text-[#120d02] hover:font-semibold border border-white/10 hover:border-[#c5a059] transition-all duration-300 shadow-sm group/btn"
              >
                <span>{viewProjectLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.article>
    );
  }
);

AwwwardsProjectCard.displayName = 'AwwwardsProjectCard';
