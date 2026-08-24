'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getSkills } from '../../lib/data.js';

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

export default function SkillsPage() {
  const skillCategories = getSkills();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically derive unique category list
  const categoryNames = ['All', ...skillCategories.map((c) => c.domain)];

  // Filter skills based on category and search query
  const filteredCategories = skillCategories
    .filter((cat) => activeCategory === 'All' || cat.domain === activeCategory)
    .map((cat) => {
      const matchingSkills = (cat.skills || cat.items || []).filter((s) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          s.name?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          (s.projectsUsing && s.projectsUsing.some((p) => p.toLowerCase().includes(q)))
        );
      });
      return { ...cat, skills: matchingSkills };
    })
    .filter((cat) => cat.skills.length > 0);

  const totalSkillsCount = skillCategories.reduce(
    (acc, cat) => acc + (cat.skills || cat.items || []).length,
    0
  );

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Skills & Tech Stack', href: '/skills' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCIES ({totalSkillsCount} TECHNOLOGIES)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Skills & Engineering Arsenal
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            A comprehensive, data-driven index of languages, frameworks, AI toolchains, embedded hardware platforms, and cloud services I build with.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 mb-16">
          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill name, description, or project (e.g. React, ESP32, Gemini)..."
              className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-cyan-500 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition shadow-inner"
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

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categoryNames.map((catName) => (
              <button
                key={catName}
                onClick={() => setActiveCategory(catName)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeCategory === catName
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Display by Category */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <Cpu className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No matching skills found</h3>
            <p className="text-xs text-zinc-500">Try adjusting your search query or switching to "All" categories.</p>
          </div>
        ) : (
          <div className="space-y-14">
            {filteredCategories.map((category, catIdx) => (
              <div key={category.domain || catIdx} className="space-y-6">
                {/* Category Title */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                      <span>{category.domain}</span>
                    </h2>
                    {category.description && (
                      <p className="text-xs text-zinc-400 mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    {category.skills.length} skills
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, sIdx) => {
                    const IconComponent = iconMap[skill.icon] || Cpu;
                    return (
                      <motion.div
                        key={skill.name || sIdx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: sIdx * 0.04 }}
                        className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700/60 text-cyan-400 group-hover:scale-110 transition-transform">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <h3 className="font-bold text-base text-zinc-100 group-hover:text-cyan-300 transition-colors">
                                {skill.name}
                              </h3>
                            </div>

                            {skill.level && (
                              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                                {skill.level}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-zinc-400 leading-relaxed">
                            {skill.description}
                          </p>
                        </div>

                        {/* Projects using this skill */}
                        {skill.projectsUsing && skill.projectsUsing.length > 0 && (
                          <div className="pt-3 border-t border-zinc-800/80 space-y-1.5">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                              Used in
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {skill.projectsUsing.map((proj, pIdx) => (
                                <Link
                                  key={pIdx}
                                  href="/projects"
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:bg-cyan-500/20 hover:text-cyan-300 border border-zinc-700/50 transition"
                                >
                                  {proj}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
