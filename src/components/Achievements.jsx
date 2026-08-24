'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Users, Award, GitPullRequest } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Trophy,
  Medal,
  Users,
  Award,
  GitPullRequest
};

export const Achievements = () => {
  const { achievements } = usePortfolio();

  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>HONORS & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Key milestones & verified recognitions.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A testament to consistency in engineering, hackathon competition performance, and academic contributions.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => {
            const Icon = iconMap[item.icon] || Trophy;
            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    {item.category && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-base text-zinc-100">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-cyan-400">
                    {item.organization} {item.date && `• ${item.date}`}
                  </div>

                  {item.description && (
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.metric && (
                  <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500">Metric Impact:</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {item.metric}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
