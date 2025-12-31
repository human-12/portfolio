import { 
  Code2, 
  Brain, 
  Terminal, 
  Cpu, 
  Globe, 
  Database,
  Layers,
  Layout,
  Server,
  GitBranch,
  Container,
  Smartphone,
  GraduationCap
} from 'lucide-react';
import { Project, Skill, Experience, NavItem, Stat, Education } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about', icon: Code2 },
  { label: 'Skills', href: '#skills', icon: Cpu },
  { label: 'Projects', href: '#projects', icon: Layers },
  { label: 'Experience', href: '#experience', icon: Server },
  { label: 'Contact', href: '#contact', icon: Terminal },
];

export const HERO_TAGS = [
  "Full Stack AI Engineer",
  "Machine Learning",
  "Deep Learning",
  "Modern Web Development"
];

export const PROFESSIONAL_SUMMARY = "Passionate Full Stack AI Engineer with proven expertise in machine learning, deep learning, and modern web development. Currently pursuing undergraduate studies in Computer Science while building production-grade AI solutions. Demonstrated proficiency in developing end-to-end AI systems—from model training and fine-tuning to deployment at scale. Strong foundation in computer science fundamentals, algorithms, and software engineering best practices. Self-employed with hands-on experience delivering practical AI applications across computer vision, NLP, and financial analytics domains.";

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University',
    period: 'Expected Graduation: 2030',
    gpa: '3.8/4.0'
  }
];

export const STATS: Stat[] = [
  { label: 'Years Experience', value: '2+', icon: Globe },
  { label: 'Projects Shipped', value: '25+', icon: Layers },
  { label: 'GPA', value: '3.8', icon: GraduationCap },
  { label: 'Coffee Consumed', value: '∞', icon: Cpu },
];

export const SKILLS: Skill[] = [
  // AI/ML
  { name: 'TensorFlow / PyTorch', level: 90, category: 'AI/ML' },
  { name: 'NLP & LLMs', level: 92, category: 'AI/ML' },
  { name: 'Computer Vision', level: 88, category: 'AI/ML' },
  { name: 'LangChain / RAG', level: 95, category: 'AI/ML' },
  { name: 'Scikit-learn', level: 85, category: 'AI/ML' },
  { name: 'Hugging Face', level: 88, category: 'AI/ML' },

  // Full Stack - Frontend
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 92, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 98, category: 'Frontend' },
  
  // Full Stack - Backend
  { name: 'Node.js / Express', level: 90, category: 'Backend' },
  { name: 'FastAPI / Flask', level: 92, category: 'Backend' },
  { name: 'Django', level: 85, category: 'Backend' },
  { name: 'PostgreSQL / SQL', level: 88, category: 'Backend' },
  { name: 'Vector DBs (Pinecone)', level: 90, category: 'Backend' },
  
  // DevOps
  { name: 'Docker / Kubernetes', level: 85, category: 'DevOps' },
  { name: 'AWS / GCP / Azure', level: 82, category: 'DevOps' },
  { name: 'CI/CD (GitHub Actions)', level: 85, category: 'DevOps' },
  { name: 'Git / Version Control', level: 95, category: 'DevOps' },
];

export const PROJECTS: Project[] = [
  {
    id: 'visionguard',
    title: 'VisionGuard',
    category: 'AI/ML',
    description: 'AI-Powered Computer Vision Security System engineered for real-time object detection, facial recognition, and anomaly detection.',
    visual: 'bg-gradient-to-br from-orange-600 via-red-900 to-slate-900',
    tech: ['Python', 'YOLO', 'ResNet', 'FastAPI', 'Redis', 'PyTorch'],
    features: [
      'Engineered intelligent surveillance with state-of-the-art CV models',
      'Implemented deep learning architectures (YOLO, ResNet) for multi-object tracking',
      'Architected scalable backend with FastAPI & Redis for high-throughput',
      'Achieved 94% accuracy with sub-second latency on 30+ feeds'
    ],
    githubUrl: 'https://github.com/human-12/visionguard',
    featured: true,
  },
  {
    id: 'documind',
    title: 'DocuMind',
    category: 'AI/ML',
    description: 'Intelligent Document Analysis & RAG System enabling semantic search and question-answering across large document bases.',
    visual: 'bg-gradient-to-bl from-indigo-600 via-violet-900 to-slate-900',
    tech: ['Next.js', 'LangChain', 'GPT-4', 'Pinecone', 'Docker', 'AWS'],
    features: [
      'Production-ready platform using advanced NLP & RAG techniques',
      'Integrated LLMs (GPT-4, Claude) with Vector DBs for semantic search',
      'Real-time document chat interface with streaming responses',
      'Deployed on AWS with Docker, reducing retrieval time by 85%'
    ],
    githubUrl: 'https://github.com/human-12/documind',
    featured: true,
  },
  {
    id: 'neurofinance',
    title: 'NeuroFinance',
    category: 'Full Stack',
    description: 'Deep Learning Financial Analytics Platform for market analysis and algorithmic trading strategies.',
    visual: 'bg-gradient-to-tr from-emerald-500 via-teal-900 to-slate-900',
    tech: ['React', 'TensorFlow', 'LSTM', 'Django', 'PostgreSQL', 'D3.js'],
    features: [
      'Neural network-based predictive models for algorithmic trading',
      'Utilized LSTM and Transformers for time-series stock forecasting',
      'Interactive dashboard for portfolio performance & risk assessment',
      'Backtested algorithms achieving 23% avg annual return (Sharpe 1.8)'
    ],
    githubUrl: 'https://github.com/human-12/neurofinance',
    featured: true,
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'Self-Employed',
    role: 'AI Engineer & Full Stack Developer',
    period: '2022 - Present | Remote',
    description: [
      'Architected and deployed multiple end-to-end AI applications spanning computer vision, NLP, and financial analytics domains.',
      'Built and fine-tuned custom machine learning models, improving baseline performance by 15-30% across various tasks.',
      'Implemented CI/CD pipelines using GitHub Actions and Docker for automated testing and deployment of ML models.',
      'Collaborated with cross-functional stakeholders to translate business requirements into technical specifications and deliverables.',
      'Maintained comprehensive technical documentation and version control practices for all projects using Git and GitHub.'
    ],
    tech: ['Python', 'Next.js', 'Docker', 'AWS', 'TensorFlow', 'PyTorch']
  }
];