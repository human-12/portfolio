import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-slate-50 dark:bg-dark-lighter/20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            <span className="text-primary">04.</span> Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-primary dark:bg-accent rounded-full border-4 border-slate-50 dark:border-dark z-10 shadow-[0_0_10px_rgba(124,58,237,0.5)] dark:shadow-[0_0_10px_#06b6d4]" />

                {/* Content */}
                <div className="flex-1 ml-6 md:ml-0">
                  <div className={`p-6 glass-card rounded-xl border border-slate-200 dark:border-slate-800/50 hover:border-primary/30 transition-colors bg-white/60 dark:bg-transparent ${
                     idx % 2 === 0 ? 'md:text-left' : 'md:text-right'
                  }`}>
                    <span className="text-primary dark:text-accent font-mono text-sm mb-1 block">{exp.period}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <h4 className="text-lg text-slate-500 dark:text-slate-400 mb-4">{exp.company}</h4>
                    
                    <ul className={`space-y-2 mb-4 text-slate-600 dark:text-slate-400 text-sm ${
                       idx % 2 === 0 ? 'items-start' : 'md:items-end items-start'
                    } flex flex-col`}>
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <div className={`flex flex-wrap gap-2 ${
                       idx % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'
                    }`}>
                      {exp.tech.map(t => (
                        <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 text-primary dark:text-primary/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Spacer for the other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};