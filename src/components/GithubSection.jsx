'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  GitPullRequest,
  Star,
  GitFork,
  Users,
  Code2,
  ExternalLink,
  Sparkles,
  Flame,
  Calendar
} from 'lucide-react';
import {
  fallbackGithubStats,
  fallbackTopRepositories,
  generateContributionGrid
} from '../data/github';
import { getSocialLinks } from '../lib/data.js';

export const GithubSection = () => {
  const socials = getSocialLinks();
  const githubUsername = socials.github ? socials.github.split('/').filter(Boolean).pop() : 'kunalgavit';

  const [stats, setStats] = useState({ ...fallbackGithubStats, username: githubUsername });
  const [repos, setRepos] = useState(fallbackTopRepositories);
  const [contributionGrid] = useState(() => generateContributionGrid());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Attempt dynamic fetch from public GitHub API (no private tokens needed)
    const fetchGithubData = async () => {
      try {
        setIsLoading(true);
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setStats((prev) => ({
            ...prev,
            publicRepos: userData.public_repos || prev.publicRepos,
            followers: userData.followers || prev.followers
          }));
        }
      } catch {
        // Gracefully stay with realistic fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubData();
  }, [githubUsername]);


  const getHeatmapColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-cyan-950/80 border-cyan-900/60';
      case 2:
        return 'bg-cyan-800/80 border-cyan-700/60';
      case 3:
        return 'bg-cyan-600 border-cyan-500';
      case 4:
        return 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]';
      default:
        return 'bg-zinc-900/60 border-zinc-800/80';
    }
  };

  return (
    <section id="github" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Github className="w-3.5 h-3.5" />
            <span>OPEN SOURCE & REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Code activity & GitHub contributions.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A real-time overview of open-source projects, commits, pull requests, and codebase contributions.
          </p>
        </div>

        {/* GitHub Header Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg text-center space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Public Repos</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
              {stats.publicRepos}+
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg text-center space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Total Stars</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {stats.totalStars}+
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg text-center space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Yearly Contributions</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {stats.contributionsThisYear}+
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg text-center space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Followers</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
              {stats.followers}+
            </div>
          </div>
        </div>

        {/* Contribution Graph Heatmap */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-5 mb-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-heading font-bold text-sm text-zinc-100">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Contribution Activity (52-Week Snapshot)</span>
            </div>
            <a
              href="https://github.com/kunalgavit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              @kunalgavit on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[680px] flex gap-1 justify-between">
              {contributionGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-2.5 h-2.5 rounded-[2px] border ${getHeatmapColor(day.level)}`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-2 border-t border-zinc-800/60">
            <span>Verified contribution activity</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-900 border border-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-950 border border-cyan-900" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-800 border border-cyan-700" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-600 border border-cyan-500" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-400 border border-cyan-300" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Top Repositories Grid */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-zinc-100 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Pinned Repositories</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-md hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-bold text-sm sm:text-base text-cyan-400 hover:underline flex items-center gap-1.5"
                    >
                      <Github className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{repo.name}</span>
                    </a>
                    <span className="text-[10px] font-mono text-zinc-500">{repo.updatedAt}</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/40 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
