import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-dark border-t border-slate-900 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Muhammad Faahem. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Designed & Built with React + Tailwind</span>
          <span>•</span>
          <span className="text-slate-600 font-mono">v2.0.0</span>
        </div>
      </div>
    </footer>
  );
};