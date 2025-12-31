import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<string[]>(['Welcome to FaahemOS v1.0.0', 'Type "help" for available commands.']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    switch (trimmed) {
      case 'help':
        response = 'Available commands: about, skills, contact, clear, exit, sudo';
        break;
      case 'about':
        response = 'Muhammad Faahem: Full Stack Engineer & AI Specialist. Obsessed with clean code and neural networks.';
        break;
      case 'skills':
        response = 'React, Next.js, Node.js, Python, TensorFlow, AWS, Docker... (too many to list)';
        break;
      case 'contact':
        response = 'Email: cafeofprogrammer@gmail.com | GitHub: @human-12';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case 'sudo':
        response = 'Nice try. Permission denied.';
        break;
      case '':
        return;
      default:
        response = `Command not found: ${trimmed}`;
    }

    setHistory([...history, `> ${cmd}`, response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-lg shadow-2xl border border-slate-700 overflow-hidden font-mono text-sm">
            {/* Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-slate-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-slate-400">faahem@portfolio:~</div>
              <div className="w-4" /> {/* Spacer */}
            </div>

            {/* Content */}
            <div 
              ref={scrollRef}
              className="p-4 h-80 overflow-y-auto text-green-400 space-y-1"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              <div className="flex items-center">
                <span className="mr-2 text-blue-400">~</span>
                <span className="mr-2 text-white">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-slate-200"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};