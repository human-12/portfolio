import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ExternalLink, Github, X, ArrowUpRight, Lock, ArrowRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'AI/ML', 'Mobile', 'Open Source'];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-32 px-6 relative bg-white dark:bg-dark-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <span className="text-primary dark:text-accent font-mono text-sm tracking-widest uppercase mb-2 block">03. / Work</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
              Selected Projects
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 font-medium ${
                  filter === cat 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white' 
                    : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={project.id}
                className="group relative h-[400px] rounded-xl overflow-hidden bg-slate-100 dark:bg-dark-lighter cursor-pointer border border-slate-200 dark:border-white/5 hover:border-primary/50 dark:hover:border-accent/50 transition-colors duration-500 shadow-md hover:shadow-xl dark:shadow-none"
                onClick={() => setSelectedProject(project)}
              >
                {/* CSS Generated Background */}
                <div className={`absolute inset-0 z-0 ${project.visual} transition-transform duration-700 ease-out group-hover:scale-110`}>
                   {/* Grid Pattern Overlay */}
                   <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] [background-size:24px_24px]"></div>
                   
                   {/* Radial Glow Overlay */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"></div>
                   
                   {/* Dark Gradient from bottom for text readability */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-2 py-1 rounded text-white border border-white/20">
                      {project.category}
                    </span>
                    <div className="bg-white text-black p-2 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-slate-300 dark:text-slate-400 text-sm line-clamp-2 mb-4 group-hover:text-white dark:group-hover:text-slate-200 transition-colors">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity mb-4">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-slate-300">
                          {t} •
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                       <span className="border-b-2 border-primary dark:border-accent pb-0.5">View Project</span>
                       <ArrowRight size={16} className="text-primary dark:text-accent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal - Adjusted for new theme */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 dark:bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-dark border border-slate-200 dark:border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl relative shadow-2xl shadow-primary/10 dark:shadow-accent/10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                 <div className={`h-[300px] md:h-auto w-full relative overflow-hidden ${selectedProject.visual}`}>
                    {/* Pattern Overlay in Modal */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] [background-size:24px_24px]"></div>
                    <div className="absolute inset-0 bg-primary/10 dark:bg-accent/10 mix-blend-overlay"></div>
                 </div>

                 <div className="p-10 flex flex-col h-full overflow-y-auto">
                    <div className="mb-8">
                       <span className="text-primary dark:text-accent font-mono text-xs uppercase tracking-widest mb-2 block">{selectedProject.category}</span>
                       <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">{selectedProject.title}</h3>
                       <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
                         {selectedProject.description}
                       </p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-white/10 pb-2">Key Highlights</h4>
                      <ul className="space-y-3">
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary dark:bg-accent flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-200 dark:border-white/10">
                       <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.tech.map(t => (
                            <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-transparent">
                              {t}
                            </span>
                          ))}
                       </div>
                       
                       <div className="flex gap-4">
                          {selectedProject.demoUrl ? (
                            <a 
                              href={selectedProject.demoUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-black text-center font-bold tracking-wide hover:bg-primary dark:hover:bg-accent transition-colors rounded-lg shadow-lg flex items-center justify-center gap-2"
                            >
                              <ExternalLink size={18} /> LIVE DEMO
                            </a>
                          ) : (
                            <div className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 text-center font-bold tracking-wide rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 cursor-not-allowed opacity-70">
                               <Lock size={16} /> LIVE DEMO
                            </div>
                          )}
                          
                          {selectedProject.githubUrl && (
                            <a 
                              href={selectedProject.githubUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex-1 py-4 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white text-center font-bold tracking-wide hover:bg-slate-100 dark:hover:bg-white/10 transition-colors rounded-lg flex items-center justify-center gap-2"
                            >
                              <Github size={18} /> GITHUB
                            </a>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};