'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Code2,
  FileCode2,
  FileCode,
  Terminal,
  Coffee,
  Atom,
  Layers,
  Server,
  Network,
  Palette,
  Layout,
  Database,
  TableProperties,
  Flame,
  Sparkles,
  Eye,
  MessageSquareCode,
  GitBranch,
  CloudUpload,
  Cloud,
  Send,
  Radio,
  HardDrive,
  Activity,
  Wrench,
  Search,
  Zap,
  Image,
  Workflow,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Code2,
  FileCode2,
  FileCode,
  Terminal,
  Coffee,
  Atom,
  Layers,
  Server,
  Network,
  Palette,
  Layout,
  Database,
  TableProperties,
  Flame,
  Sparkles,
  Cpu,
  Eye,
  MessageSquareCode,
  GitBranch,
  CloudUpload,
  Cloud,
  Send,
  Radio,
  HardDrive,
  Activity,
  Wrench,
  Zap,
  Image,
  Workflow
};

export const Skills = () => {
  const { skills: skillCategories } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically extract domains from data
  const domains = [
    'All',
    ...Array.from(
      new Set(
        skillCategories.map((cat) => cat.domain || cat.category).filter(Boolean)
      )
    )
  ];

  // Filtering
  const filteredCategories = skillCategories
    .filter((cat) => (activeCategory === 'All' ? true : (cat.domain || cat.category) === activeCategory))
    .map((cat) => {
      const list = cat.skills || cat.items || [];
      const filteredSkills = list.filter(
        (skill) =>
          skill.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return { ...cat, skills: filteredSkills };
    })
    .filter((cat) => cat.skills.length > 0);

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'Core':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'Advanced':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Proficient':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Exploring':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <section id="skills" className="py-24 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Tools, technologies & hardware toolchains.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Categorized by practical application — from low-level microcontroller C++ and AI APIs to full-stack reactive web applications.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveCategory(domain)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  activeCategory === domain
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 font-bold shadow-md'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, tools..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Skills Categories Display */}
        <div className="space-y-10">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800">
              <p className="text-sm text-zinc-400">No skills match your search query.</p>
            </div>
          ) : (
            filteredCategories.map((cat, catIdx) => (
              <div key={cat.domain || cat.category || catIdx} className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <h3 className="font-heading font-bold text-lg text-zinc-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {cat.domain || cat.category}
                  </h3>
                  {cat.description && (
                    <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                      {cat.description}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.skills.map((skill, skillIdx) => {
                    const Icon = iconMap[skill.icon] || Code2;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: skillIdx * 0.04 }}
                        className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 space-y-2.5 transition-all hover:-translate-y-1 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-zinc-800 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm text-zinc-100">
                              {skill.name}
                            </span>
                          </div>
                          {skill.level && (
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelBadgeColor(
                                skill.level
                              )}`}
                            >
                              {skill.level}
                            </span>
                          )}
                        </div>

                        {skill.description && (
                          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                            {skill.description}
                          </p>
                        )}

                        {skill.projectsUsing && skill.projectsUsing.length > 0 && (
                          <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap gap-1">
                            {skill.projectsUsing.map((pName, pIdx) => (
                              <span
                                key={pIdx}
                                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/70 text-zinc-400"
                              >
                                {pName}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
