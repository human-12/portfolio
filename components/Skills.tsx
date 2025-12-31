import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../constants';
import { Skill } from '../types';

const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'DevOps'];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 bg-slate-100 dark:bg-dark-lighter/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            <span className="text-primary">02.</span> Tech Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Tools and technologies I use to build the extraordinary.</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:border-primary/50 dark:hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-xl group hover:border-primary/50 transition-colors bg-white/50 dark:bg-transparent"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">{skill.category}</span>
                </div>
                
                <div className="relative h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute h-full bg-gradient-to-r from-primary to-primary-light dark:to-accent"
                  />
                </div>
                <div className="mt-2 text-right text-xs font-mono text-primary dark:text-accent">
                  {skill.level}%
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};