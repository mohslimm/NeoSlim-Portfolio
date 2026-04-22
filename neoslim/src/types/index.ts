export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'design' | 'development' | 'productivity';
  antigravityScore: number;
  year: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}
