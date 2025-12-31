import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-slate-50 dark:bg-dark transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary dark:text-accent font-mono text-sm">What's Next?</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-slate-900 dark:text-white">Let's Build Something Amazing</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="mailto:cafeofprogrammer@gmail.com" className="flex flex-col items-center text-center gap-4 group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-accent transition-all hover:-translate-y-1 shadow-lg shadow-slate-200/50 dark:shadow-none">
              <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={32} />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Email Me</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm group-hover:text-primary dark:group-hover:text-accent transition-colors break-all">cafeofprogrammer@gmail.com</p>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/muhammad-faahem-760199219/" target="_blank" rel="noreferrer" className="flex flex-col items-center text-center gap-4 group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all hover:-translate-y-1 shadow-lg shadow-slate-200/50 dark:shadow-none">
              <div className="p-4 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Linkedin size={32} />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">LinkedIn</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm group-hover:text-blue-500 transition-colors">Connect professionally</p>
              </div>
            </a>

            <a href="https://github.com/human-12/" target="_blank" rel="noreferrer" className="flex flex-col items-center text-center gap-4 group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-white transition-all hover:-translate-y-1 shadow-lg shadow-slate-200/50 dark:shadow-none">
              <div className="p-4 rounded-xl bg-slate-900/10 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                <Github size={32} />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">GitHub</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Check out my code</p>
              </div>
            </a>
        </div>
      </div>
    </section>
  );
};