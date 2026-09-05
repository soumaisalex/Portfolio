import React from 'react';
import { Sun, Moon, Code2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isDark, toggleTheme }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand/Logo */}
        <div 
          onClick={() => setActiveTab('projects')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-100 leading-none">
              Alex Passos
            </h1>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Sistemas & Artes
            </span>
          </div>
        </div>

        {/* Menu Desktop & Toggle de Tema */}
        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Projetos
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Admin
            </button>
          </nav>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          <button
            onClick={toggleTheme}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
