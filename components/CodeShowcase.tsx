import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Code2, Cpu, Database, Layers } from 'lucide-react';

// Simplified syntax highlighting for demo purposes
const highlightCode = (code: string, language: string) => {
  // ... (keeping implementation the same, just changing container styles below)
  
  const parts = code.split(/(\s+|[(){}[\]<>,.;:"'`]|\/\/.*)/g);
    
  return code.split('\n').map((line, i) => {
    const parts = line.split(/(\s+|[(){}[\]<>,.;:"'`]|\/\/.*)/g);
    
    return (
      <div key={i} className="table-row">
        <span className="table-cell text-right pr-4 select-none text-slate-700 text-xs w-8">{i + 1}</span>
        <span className="table-cell whitespace-pre font-mono text-sm text-slate-300">
          {parts.map((part, index) => {
             if (!part) return null;
             
             // Comments
             if (part.startsWith('//')) return <span key={index} className="text-slate-500 italic">{part}</span>;
             
             // Strings (basic check)
             if (part.match(/^['"`].*['"`]$/)) return <span key={index} className="text-accent">{part}</span>;
             
             // Keywords
             if (['import', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'async', 'await', 'from', 'interface', 'type', 'class'].includes(part)) {
               return <span key={index} className="text-primary font-medium">{part}</span>;
             }
             
             // React/Built-ins
             if (['useState', 'useEffect', 'useCallback', 'console', 'fetch', 'React'].includes(part)) {
               return <span key={index} className="text-yellow-300">{part}</span>;
             }
             
             // Types (Capitalized words roughly)
             if (part.match(/^[A-Z][a-zA-Z0-9]*$/) && part !== 'React') {
               return <span key={index} className="text-emerald-400">{part}</span>;
             }
             
             // Numbers
             if (part.match(/^[0-9]+$/)) {
               return <span key={index} className="text-orange-400">{part}</span>;
             }

             return <span key={index}>{part}</span>;
          })}
        </span>
      </div>
    );
  });
};

const SNIPPETS = [
  {
    id: 'rag',
    title: 'rag_engine.py',
    language: 'python',
    icon: Database,
    code: `import openai
from pinecone import Pinecone
from langchain.chains import RetrievalQA

class RAGEngine:
    def __init__(self, api_key: str):
        self.pc = Pinecone(api_key=api_key)
        self.index = self.pc.Index("knowledge-base")
        
    async def query(self, prompt: str) -> str:
        # Generate embedding for the user query
        embedding = await openai.Embedding.create(
            input=prompt,
            model="text-embedding-3-small"
        )
        
        # Semantic search in vector DB
        matches = self.index.query(
            vector=embedding.data[0].embedding,
            top_k=5,
            include_metadata=True
        )
        
        context = "\\n".join([m.metadata['text'] for m in matches])
        
        # Generate augmented response
        return await openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": f"Context: {context}"},
                {"role": "user", "content": prompt}
            ]
        )`
  },
  {
    id: 'hook',
    title: 'useAIStream.ts',
    language: 'typescript',
    icon: Code2,
    code: `import { useState, useCallback } from 'react';

export const useAIStream = () => {
  const [data, setData] = useState<string>('');
  const [isThinking, setIsThinking] = useState(false);

  const streamResponse = useCallback(async (prompt: string) => {
    setIsThinking(true);
    setData('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Optimistic UI update for smooth typing
        const chunk = decoder.decode(value);
        setData(prev => prev + chunk);
      }
    } catch (err) {
      console.error('Stream failed', err);
    } finally {
      setIsThinking(false);
    }
  }, []);

  return { data, isThinking, streamResponse };
};`
  },
  {
    id: 'arch',
    title: 'SystemArchitecture.tsx',
    language: 'typescript',
    icon: Layers,
    code: `// Microservices Orchestration Layer
interface ServiceConfig {
  endpoint: string;
  retries: number;
  timeout: number;
}

class ServiceMesh {
  private services: Map<string, ServiceConfig>;

  constructor() {
    this.services = new Map();
    this.initializeHealthChecks();
  }

  register(name: string, config: ServiceConfig) {
    this.services.set(name, config);
    console.log(\`Service \${name} registered\`);
  }

  async routeRequest(serviceName: string, payload: any) {
    const config = this.services.get(serviceName);
    if (!config) throw new Error('Service not found');

    // Load balancing logic (Round Robin)
    return this.loadBalancer.dispatch(
      config.endpoint, 
      payload
    );
  }
}`
  }
];

export const CodeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[activeTab].code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 bg-slate-100 dark:bg-dark relative transition-colors duration-300">
       {/* Background Glow */}
       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
         
         {/* Text Side */}
         <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary dark:text-accent font-mono text-sm tracking-widest uppercase mb-2 block">02.5 / Source</span>
              <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Under the Hood
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Clean, efficient, and scalable code is my hallmark. Whether it's complex 
                <span className="text-primary dark:text-white font-medium"> AI integration</span> logic or optimized 
                <span className="text-primary dark:text-white font-medium"> frontend hooks</span>, I write software that is built to last.
              </p>
              
              <div className="space-y-4">
                {SNIPPETS.map((snippet, index) => (
                  <button
                    key={snippet.id}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group ${
                      activeTab === index 
                        ? 'bg-white dark:bg-white/5 border-primary shadow-lg shadow-primary/10 dark:shadow-[0_0_20px_rgba(124,58,237,0.1)]' 
                        : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-white/5 hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${activeTab === index ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                      <snippet.icon size={20} />
                    </div>
                    <div>
                      <h4 className={`font-mono text-sm font-bold ${activeTab === index ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                        {snippet.title}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {snippet.language}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
         </div>

         {/* Code Window - Always Dark for IDE feel */}
         <div className="lg:w-2/3 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-[#0d1117] border border-slate-800 shadow-2xl relative"
            >
              {/* Window Header */}
              <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                   <Code2 size={12} />
                   {SNIPPETS[activeTab].title}
                </div>
                <button 
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy Code"
                >
                  {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <code className="block font-mono text-sm leading-relaxed">
                      {highlightCode(SNIPPETS[activeTab].code, SNIPPETS[activeTab].language)}
                    </code>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Status Bar */}
              <div className="bg-[#161b22] px-4 py-1 flex justify-end gap-4 text-[10px] font-mono text-slate-500 border-t border-slate-800">
                 <span>Ln {SNIPPETS[activeTab].code.split('\n').length}, Col 1</span>
                 <span>UTF-8</span>
                 <span className="uppercase">{SNIPPETS[activeTab].language}</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div> Ready</span>
              </div>
            </motion.div>
         </div>
       </div>
    </section>
  );
};