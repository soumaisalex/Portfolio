import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProjectCard from './components/ProjectCard';
import { Layers, Terminal, Palette, Globe, Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Atualiza classe no HTML para o Tailwind Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Busca lista de projetos da API/Banco de Dados
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = [
    { name: 'Todos', icon: Layers },
    { name: 'Sistemas', icon: Terminal },
    { name: 'Sites', icon: Globe },
    { name: 'Artes', icon: Palette },
  ];

  const filteredProjects = selectedCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-24 sm:pb-12 transition-colors">
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {activeTab === 'projects' && (
          <>
            {/* Hero Section */}
            <section className="mb-8 sm:mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Disponível para novos projetos
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                Criando soluções digitais <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
                  com código e arte.
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Abaixo estão reunidos meus principais sistemas web, sites institucionais e criações visuais desenvolvidos com foco em performance e experiência do usuário.
              </p>
            </section>

            {/* Filtros por Categoria (Carrossel Horizontal no Mobile) */}
            <section className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                          : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800/80'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Grid de Projetos */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Buscando projetos no Neon Database...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Nenhum projeto encontrado nesta categoria.
                </p>
              </div>
            )}
          </>
        )}

        {/* Tab Sobre */}
        {activeTab === 'about' && (
          <section className="max-w-2xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Sobre mim</h2>
            <div className="prose dark:prose-invert text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed space-y-4">
              <p>
                Olá! Sou o <strong>Alex Passos</strong>, desenvolvedor e criador visual com experiência no desenvolvimento de sistemas web completos, páginas dinâmicas e artes digitais.
              </p>
              <p>
                Minha busca constante é por construir interfaces fluidas e limpas no frontend, unidas a arquiteturas sólidas e eficientes no backend.
              </p>
            </div>
          </section>
        )}

        {/* Tab Admin (Placeholder temporário até o desenvolvimento do formulário do CRUD) */}
        {activeTab === 'admin' && (
          <section className="max-w-xl mx-auto py-12 text-center">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Painel Administrativo</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              O gerenciador CRUD será carregado aqui no próximo passo.
            </p>
          </section>
        )}
      </main>

      {/* Navegação Mobile Inferior */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />
    </div>
  );
}
