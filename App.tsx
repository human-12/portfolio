import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Terminal } from './components/Terminal';
import { CodeShowcase } from './components/CodeShowcase';

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal with Ctrl + `
      if (e.ctrlKey && e.key === '`') {
        setShowTerminal(prev => !prev);
      }

      // Konami Logic
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setShowTerminal(true);
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  return (
    <main className="bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-slate-200 selection:bg-primary/30 selection:text-black dark:selection:text-white relative transition-colors duration-300">
      <CustomCursor />
      <Navbar />
      
      <Hero />
      <About />
      <Skills />
      <CodeShowcase />
      <Projects />
      <Experience />
      <Contact />
      <Footer />

      <Terminal isOpen={showTerminal} onClose={() => setShowTerminal(false)} />
      
      {/* Hint for terminal */}
      <div className="fixed bottom-4 left-4 text-[10px] text-slate-400 dark:text-slate-700 font-mono hidden md:block z-50">
        Ctrl + ` for terminal
      </div>
    </main>
  );
}

export default App;