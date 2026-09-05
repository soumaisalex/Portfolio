import React from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <article className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Container da Imagem */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {project.is_featured && (
            <span className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-zinc-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 fill-zinc-950" /> Destaque
            </span>
          )}
        </div>

        {/* Conteúdo do Card */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {project.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Rodapé do Card com Links */}
      <div className="p-5 pt-0 flex items-center gap-3">
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-zinc-950 transition-colors"
          >
            <span>Acessar Projeto</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver código no GitHub"
            className="p-2.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </article>
  );
}
