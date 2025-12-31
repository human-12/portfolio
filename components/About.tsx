import React from 'react';
import { motion } from 'framer-motion';
import { STATS, PROFESSIONAL_SUMMARY, EDUCATION } from '../constants';
import { GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-slate-50 dark:bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row items-baseline gap-4"
        >
          <span className="text-primary dark:text-accent font-mono text-sm tracking-widest uppercase">01. / About</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white transition-colors">
             The Architect
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* Bio Card - Large */}
          <motion.div 
            className="col-span-1 md:col-span-2 row-span-2 glass-card rounded-xl p-10 flex flex-col justify-between relative overflow-hidden group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
             <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors" />
             
             <div>
                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6 transition-colors">Engineering with <span className="text-primary dark:text-accent">Intelligence</span>.</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6 font-light transition-colors">
                  {PROFESSIONAL_SUMMARY}
                </p>
             </div>
             
             {/* Education Section */}
             <div className="mt-8 border-t border-slate-200 dark:border-white/10 pt-6">
                <div className="flex items-center gap-2 mb-4 text-primary dark:text-accent font-bold uppercase tracking-wider text-sm">
                   <GraduationCap size={18} /> Education
                </div>
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="mb-4 last:mb-0">
                     <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                     <p className="text-slate-600 dark:text-slate-400 font-medium">{edu.school}</p>
                     <div className="flex justify-between mt-1 text-sm font-mono text-slate-500">
                        <span>{edu.period}</span>
                        <span className="text-primary dark:text-accent">GPA: {edu.gpa}</span>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>

          {/* Photo/Profile Card */}
          <motion.div 
            className="col-span-1 row-span-2 glass-card rounded-xl p-2 relative flex items-center justify-center overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-slate-100 dark:bg-dark z-0 transition-colors" />
            <img 
              src="/faahem.png" 
              alt="Muhammad Faahem" 
              className="w-full h-full object-cover rounded-lg z-10 opacity-80 dark:opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 scale-100 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <span className="bg-primary dark:bg-accent text-white dark:text-black text-xs font-bold px-2 py-1 uppercase tracking-widest">Profile_01</span>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              className="col-span-1 md:col-span-1 row-span-1 glass-card rounded-xl p-8 flex flex-col justify-between hover:bg-white/50 dark:hover:bg-white/5 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start">
                <stat.icon className="text-slate-400 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-accent transition-colors" size={28} />
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">STAT_{idx + 1}</span>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:translate-x-2 transition-transform">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};