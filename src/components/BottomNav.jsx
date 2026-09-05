import React from 'react';
import { FolderGit2, User, Shield, Sun, Moon } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, isDark, toggleTheme }) {
  const navItems = [
    { id: 'projects', label: 'Projetos', icon: FolderGit2 },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'admin', label: 'Admin', icon: Shield },
  ];

  return (
    <nav className="sm:hidden fixed bottom-4 left-4 right-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-full p-1.5 flex items-center justify-between shadow-2xl z-50">
      <div className="flex items-center gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Botão de alternância de Tema */}
      <button
        onClick={toggleTheme}
        className="p-2.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ml-1"
        aria-label="Alternar tema"
      >
        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
      </button>
    </nav>
  );
}
