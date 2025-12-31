import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Github, Linkedin, Mail, FileText, ArrowRight, Terminal } from 'lucide-react';
import { HeroScene } from './3d/HeroScene';

export const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -0.5 to 0.5
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Smooth spring for the parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Content moves slightly opposite to mouse for depth perception
  const contentX = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const contentY = useTransform(springY, [-0.5, 0.5], [15, -15]);
  
  // Title moves more for a layered effect
  const titleX = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const titleY = useTransform(springY, [-0.5, 0.5], [25, -25]);

  return (
    <section 
      className="relative min-h-screen w-full flex items-center justify-center pt-40 md:pt-52 overflow-hidden bg-slate-50 dark:bg-dark transition-colors duration-300"
      onMouseMove={handleMouseMove}
    >
      <HeroScene />
      
      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-dark dark:via-dark/80 dark:to-transparent z-0 pointer-events-none transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: contentX, y: contentY }}
        >
          {/* Status Indicator */}
          <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-accent"></span>
            </span>
            <span className="text-xs font-mono tracking-widest uppercase text-slate-600 dark:text-slate-300">Open to work</span>
          </div>
          
          {/* Main Title - Syne Font */}
          <motion.h1 
            className="text-6xl md:text-9xl font-display font-extrabold tracking-tight mb-4 leading-[0.9]"
            style={{ x: titleX, y: titleY }}
          >
            <span className="block text-slate-900 dark:text-white dark:mix-blend-difference transition-colors duration-300">FAAHEM</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-700 opacity-50">DEV.</span>
          </motion.h1>

          {/* Typing Effect */}
          <div className="h-8 md:h-12 text-lg md:text-2xl font-mono text-primary dark:text-accent mb-12 flex items-center justify-center gap-3">
            <Terminal size={20} className="text-slate-500 dark:text-slate-600 hidden md:block" />
            <span className="text-slate-500 dark:text-slate-600 select-none hidden md:inline">~</span>
            <TypeAnimation
              sequence={[
                'git commit -m "Build Future"',
                1000,
                'React . Next.js . TypeScript',
                2000,
                'Python . PyTorch . LangChain',
                2000,
                'Docker . Kubernetes . AWS',
                2000,
                'System.initialize(AI_Agent)',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="tracking-wider font-bold"
              cursor={true}
            />
          </div>

          <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-400 mb-12 text-base md:text-lg leading-relaxed font-light transition-colors duration-300">
             Merging technical precision with creative chaos. 
             Building scalable systems and intelligent agents for the next web.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <a 
               href="#projects" 
               onClick={scrollToProjects}
               className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-display font-bold tracking-wide rounded-full overflow-hidden transition-transform hover:scale-105 shadow-lg shadow-primary/25 dark:shadow-none"
             >
               <span className="relative z-10 flex items-center gap-2">
                 VIEW PROJECTS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-primary dark:bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
             </a>
             
             <a 
               href="/Muhammad_Faahem_CV.pdf" 
               download="Muhammad_Faahem_CV.pdf"
               className="group px-8 py-4 rounded-full border border-slate-300 dark:border-white/20 hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white font-display font-bold tracking-wide transition-colors flex items-center gap-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm"
             >
               <FileText size={16} />
               <span>DOWNLOAD RESUME</span>
             </a>
          </div>

          {/* Social Icons */}
          <div className="mt-16 flex justify-center gap-8">
            <a href="https://github.com/human-12/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors hover:scale-110 duration-300">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/muhammad-faahem-760199219/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors hover:scale-110 duration-300">
              <Linkedin size={22} />
            </a>
            <a href="mailto:cafeofprogrammer@gmail.com" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors hover:scale-110 duration-300">
              <Mail size={22} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-400 dark:via-slate-500 to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-mono">Scroll</span>
      </motion.div>
    </section>
  );
};