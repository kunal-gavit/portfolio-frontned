'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Trophy,
  Search,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ExternalLink,
  Github,
  ChevronRight,
  Award,
  Filter
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { usePortfolio } from '../../context/PortfolioContext';

export default function HackathonsPage() {
  const { hackathons: allHackathonsFromContext } = usePortfolio();
  const allHackathons = (allHackathonsFromContext || []).filter((h) => h.status !== 'Draft' && h.publishStatus !== 'Draft');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // Extract unique years
  const availableYears = useMemo(() => {
    const years = new Set();
    allHackathons.forEach((h) => {
      const match = (h.date || h.edition || '').match(/\b(20\d\d)\b/);
      if (match) years.add(match[1]);
    });
    return ['All', ...Array.from(years).sort().reverse()];
  }, [allHackathons]);

  const filteredHackathons = useMemo(() => {
    return allHackathons.filter((h) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = h.name?.toLowerCase().includes(q);
        const matchProb = h.problemStatement?.toLowerCase().includes(q);
        const matchSol = h.solutionSummary?.toLowerCase().includes(q);
        const matchRes = h.result?.toLowerCase().includes(q);
        const matchTech = (h.technologies || []).some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchProb && !matchSol && !matchRes && !matchTech) return false;
      }

      // Year filter
      if (selectedYear !== 'All') {
        const dateStr = `${h.date || ''} ${h.edition || ''}`;
        if (!dateStr.includes(selectedYear)) return false;
      }

      // Featured filter
      if (onlyFeatured && !h.featured && !h.isFeatured) {
        return false;
      }

      return true;
    });
  }, [allHackathons, searchQuery, selectedYear, onlyFeatured]);

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Hackathons & Sprints', href: '/hackathons' }]} />

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>RAPID INNOVATION ({allHackathons.length} COMPETITIONS)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Hackathons & Sprint Pitches
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            High-intensity 24–48 hour sprints, stage pitching before senior tech juries, and rapid prototyping of hardware + AI systems under pressure.
          </p>
        </div>

        {/* Discovery Filters */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 mb-12 space-y-6 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 relative">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hackathons by name, technologies, or achievements..."
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-amber-500 rounded-2xl py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition"
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

            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-amber-500 rounded-2xl py-3 px-4 text-sm text-zinc-200 outline-none transition cursor-pointer"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year === 'All' ? 'All Editions' : `${year} Edition`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 flex-wrap gap-3">
            <span className="text-xs font-mono text-zinc-400">
              Showing {filteredHackathons.length} competitions
            </span>

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

        {/* Hackathon Cards Grid */}
        {filteredHackathons.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <Trophy className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No hackathons found</h3>
            <p className="text-xs text-zinc-500">Try adjusting your search criteria or resetting filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredHackathons.map((h, idx) => (
              <motion.div
                key={h.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
              >
                <div className="space-y-4">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold">
                      {h.edition || h.date}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {h.location}
                    </span>
                  </div>

                  <div>
                    <Link
                      href={`/hackathons/${h.slug || h.id}`}
                      className="group-hover:text-amber-300 transition-colors"
                    >
                      <h2 className="text-2xl font-extrabold text-zinc-100 group-hover:text-amber-300 transition-colors">
                        {h.name}
                      </h2>
                    </Link>
                    <p className="text-xs text-amber-400 font-mono mt-1 font-semibold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span>{h.result}</span>
                    </p>
                  </div>

                  {/* Team & Role */}
                  {(h.teamRole || h.teamName) && (
                    <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>
                        {h.teamRole} {h.teamName ? `(${h.teamName})` : ''}
                      </span>
                    </div>
                  )}

                  {/* Problem & Solution Snippet */}
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                    {h.problemStatement || h.solutionSummary}
                  </p>

                  {/* Technologies */}
                  {h.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {h.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-3">
                  <Link
                    href={`/hackathons/${h.slug || h.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition cursor-pointer"
                  >
                    <span>Full Breakdown & Story</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {h.projectSlug && (
                      <Link
                        href={`/projects/${h.projectSlug}`}
                        className="text-xs text-zinc-400 hover:text-zinc-200 transition font-mono underline underline-offset-4"
                      >
                        Project Details
                      </Link>
                    )}
                    {h.githubUrl && (
                      <a
                        href={h.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
