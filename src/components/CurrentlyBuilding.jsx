'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Hammer, Sparkles, Cpu, Layers, ExternalLink, Calendar, CheckCircle2, Circle } from 'lucide-react';
import { getCurrentlyBuilding } from '../lib/data.js';

export const CurrentlyBuilding = () => {
  const buildingList = getCurrentlyBuilding();

  if (buildingList.length === 0) return null;

  return (
    <section id="building" className="py-24 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Hammer className="w-3.5 h-3.5" />
            <span>ACTIVE SPRINTS & LABS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            What I'm currently building.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A transparent look into active development sprints, experimental prototypes, and next-generation architectural builds.
          </p>
        </div>

        {/* Building Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buildingList.map((project, idx) => {
            const progress = project.progressPercent ?? project.progress ?? 50;
            const techList = project.technologies || project.techStack || [];
            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-7 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-mono border border-cyan-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      {project.status || 'Active'}
                    </span>
                    {project.lastUpdated && (
                      <span className="text-xs font-mono text-zinc-500">{project.lastUpdated}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-lg text-zinc-100">
                      {project.name || project.title}
                    </h3>
                    {project.tagline && (
                      <p className="text-xs text-cyan-400 font-mono">
                        {project.tagline}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights / Milestones */}
                  {project.milestones && project.milestones.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                        Milestones
                      </span>
                      <div className="space-y-1">
                        {project.milestones.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="text-xs text-zinc-300 flex items-start gap-2"
                          >
                            {m.done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                            )}
                            <span className={m.done ? 'text-zinc-300' : 'text-zinc-500'}>{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar & Tech */}
                <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">Sprint Progress</span>
                      <span className="text-cyan-400 font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {techList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {techList.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
