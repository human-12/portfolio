import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | 'AI/ML' | 'Open Source' | 'Mobile';
  description: string;
  visual: string; // CSS class string for background
  tech: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon?: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'DevOps' | 'Tools';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  gpa: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}