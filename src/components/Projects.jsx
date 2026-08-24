'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderCode, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from './ProjectCard';
import { CaseStudyModal } from './CaseStudyModal';
import { analytics } from '../lib/analytics';

export const Projects = () => {
  const { projects: allProjectsFromContext } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = (allProjectsFromContext || []).filter((p) => p.status !== 'Draft' && p.publishStatus !== 'Draft');

  // Dynamically compute category filters
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    const cat = project.category?.toLowerCase();
    const active = activeCategory.toLowerCase();
    const tags = (project.tags || []).map((t) => t.toLowerCase());
    return cat === active || tags.includes(active);
  });

  const handleOpenCaseStudy = (project) => {
    setSelectedProject(project);
    analytics.trackProjectView(project.id, project.title);
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <FolderCode className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Engineered projects & deep-dive case studies.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Real products, full-stack applications, and hardware IoT firmware built with clean architecture and problem-solving focus.
          </p>
        </div>

        {/* Dynamic Filter Pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <FolderCode className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No projects found</h3>
            <p className="text-xs text-zinc-500">No projects currently match the selected "{activeCategory}" filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id || project.slug || idx}
                project={project}
                index={idx}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            ))}
          </div>
        )}

        {/* Deep-Dive Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <CaseStudyModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
