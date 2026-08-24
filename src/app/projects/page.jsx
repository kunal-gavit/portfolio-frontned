'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { FolderCode, Search, Sparkles, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProjectCard } from '../../components/ProjectCard';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ProjectsPage() {
  const { projects: allProjectsFromContext } = usePortfolio();
  const allProjects = (allProjectsFromContext || []).filter((p) => p.status !== 'Draft' && p.publishStatus !== 'Draft');

  const categories = useMemo(() => {
    const set = new Set();
    allProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [allProjects]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [selectedTech, setSelectedTech] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Extract all unique technologies from projects
  const allTechs = useMemo(() => {
    const set = new Set();
    allProjects.forEach((p) => {
      const list = p.technologies || p.techStack || [];
      list.forEach((t) => set.add(t));
    });
    return ['All', ...Array.from(set).sort()];
  }, [allProjects]);

  // Filter and sort logic
  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((project) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = project.title?.toLowerCase().includes(q);
          const matchDesc = project.description?.toLowerCase().includes(q) || project.tagline?.toLowerCase().includes(q);
          const matchCat = project.category?.toLowerCase().includes(q);
          const matchTech = (project.technologies || project.techStack || []).some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCat && !matchTech) return false;
        }

        // Category filter
        if (selectedCategory !== 'All') {
          const cat = project.category?.toLowerCase();
          const target = selectedCategory.toLowerCase();
          const tags = (project.tags || []).map((t) => t.toLowerCase());
          if (cat !== target && !tags.includes(target)) return false;
        }

        // Featured only
        if (onlyFeatured && !project.featured && !project.isFeatured) {
          return false;
        }

        // Tech stack filter
        if (selectedTech !== 'All') {
          const list = (project.technologies || project.techStack || []).map((t) => t.toLowerCase());
          if (!list.includes(selectedTech.toLowerCase())) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.stars || 0) - (a.stars || 0);
        }
        if (sortBy === 'stars') {
          return (b.stars || 0) - (a.stars || 0);
        }
        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
      });
  }, [allProjects, searchQuery, selectedCategory, onlyFeatured, selectedTech, sortBy]);

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Projects & Case Studies', href: '/projects' }]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <FolderCode className="w-3.5 h-3.5" />
            <span>PORTFOLIO DIRECTORY ({allProjects.length} PROJECTS)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Engineered Projects & Case Studies
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Explore web apps, generative AI systems, IoT firmware, and hackathon prototypes built with production architecture and first-principles rigor.
          </p>
        </div>

        {/* Discovery Filter Controls */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 mb-12 space-y-6 shadow-xl backdrop-blur-xl">
          {/* Top Row: Search & Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 relative">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, keywords, or tech stack (e.g. CircuitBotz, React, ESP32)..."
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-2xl py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-800 px-2 py-1 rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="sm:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-2xl py-3 px-4 text-sm text-zinc-200 outline-none transition cursor-pointer"
              >
                <option value="featured">Sort by: Featured First</option>
                <option value="stars">Sort by: Most Stars</option>
                <option value="title">Sort by: Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills & Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800/60">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                onlyFeatured
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                  : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Only</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <FolderCode className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No matching projects found</h3>
            <p className="text-xs text-zinc-500">
              Try adjusting your search criteria or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setOnlyFeatured(false);
                setSelectedTech('All');
              }}
              className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id || project.slug || idx}
                project={project}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
