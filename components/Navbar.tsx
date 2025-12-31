import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastY(latest);
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100; // Navbar height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center py-6 px-6 pointer-events-none"
      >
        <div className="glass-nav rounded-full px-8 py-4 flex items-center justify-between gap-12 max-w-5xl w-full shadow-2xl shadow-black/10 dark:shadow-black/50 pointer-events-auto transition-all duration-300">
          <a 
            href="#" 
            className="font-display font-bold text-xl tracking-tighter text-slate-900 dark:text-white hover:text-primary dark:hover:text-accent transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            FAAHEM<span className="text-primary dark:text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                  onClick={(e) => handleScroll(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
             {/* Theme Toggle Desktop */}
             <button
               onClick={toggleTheme}
               className="hidden md:flex relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 items-center px-1 transition-colors"
               aria-label="Toggle Theme"
             >
               <motion.div
                 layout
                 className="w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-700 dark:text-yellow-400"
                 animate={{ x: theme === 'dark' ? 26 : 0 }}
                 transition={{ type: "spring", stiffness: 500, damping: 30 }}
               >
                 {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
               </motion.div>
             </button>

            {/* Contact Button Desktop */}
            <div className="hidden md:block">
              <a 
                href="#contact" 
                className="text-xs font-bold font-display bg-slate-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full hover:bg-primary dark:hover:bg-accent transition-colors"
                onClick={(e) => handleScroll(e, '#contact')}
              >
                LET'S TALK
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-900 dark:text-white hover:text-primary dark:hover:text-accent transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 dark:bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <button 
            className="absolute top-8 right-8 text-slate-900 dark:text-white p-2 hover:text-primary dark:hover:text-accent transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>
          
          <ul className="space-y-8 text-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500 hover:to-primary dark:hover:to-accent transition-all"
                  onClick={(e) => handleScroll(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex justify-center pt-8">
               <button
                 onClick={toggleTheme}
                 className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800"
               >
                 {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                 {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
               </button>
            </li>
            <li>
              <a 
                href="#contact" 
                className="text-5xl font-display font-black text-primary dark:text-accent hover:text-slate-900 dark:hover:text-white transition-colors"
                onClick={(e) => handleScroll(e, '#contact')}
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
};