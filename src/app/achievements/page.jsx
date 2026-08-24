'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Award,
  Trophy,
  Medal,
  Users,
  GitPullRequest,
  Sparkles,
  Calendar,
  Building2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getAchievements } from '../../lib/data.js';

const iconMap = {
  Trophy,
  Medal,
  Users,
  Award,
  GitPullRequest,
  Sparkles
};

export default function AchievementsPage() {
  const achievements = getAchievements();

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Achievements & Honors', href: '/achievements' }]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & RECOGNITION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Achievements & Milestones
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            National hackathon accolades, university honors, open-source impact, and software milestones achieved throughout my engineering journey.
          </p>
        </div>

        {/* Achievements Grid */}
        {achievements.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <Award className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No achievements recorded yet</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Award;
              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-amber-500/40 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xl transition group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-lg text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h2>

                    <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{item.organization}</span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.metric && (
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        {item.metric}
                      </span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-400 hover:text-amber-300 transition flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
