'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, HeartHandshake, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience = () => {
  const { experience: experienceList } = usePortfolio();

  if (experienceList.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-zinc-950/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>EXPERIENCE & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Technical leadership & collaborative milestones.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A chronological timeline of project leadership, national hackathon volunteering, and open-source software engineering.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {experienceList.map((item, index) => {
            const isVolunteering = item.type === 'Volunteering & Leadership';

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Marker Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 transition-all shadow-[0_0_10px_rgba(6,182,212,0.6)] ${
                    isVolunteering
                      ? 'border-amber-400 group-hover:bg-amber-400 group-hover:scale-125'
                      : 'border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125'
                  }`}
                />

                {/* Experience Card */}
                <div
                  className={`p-6 sm:p-7 rounded-3xl border shadow-xl space-y-5 transition-all ${
                    isVolunteering
                      ? 'bg-zinc-900/80 border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-cyan-500/30'
                  }`}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading font-bold text-lg text-zinc-100">
                          {item.role}
                        </h3>
                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-mono border border-amber-500/30 font-bold uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                        {item.current && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                            Present
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-sm font-semibold flex items-center gap-1.5 ${
                          isVolunteering ? 'text-amber-400' : 'text-cyan-400'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>{item.organization || item.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {item.period || `${item.startDate || ''} - ${item.endDate || 'Present'}`}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {/* Personal Highlight Quote */}
                  {item.highlight && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-xs text-zinc-200 italic leading-relaxed">
                      "{item.highlight}"
                    </div>
                  )}

                  {/* Key Learnings Badges */}
                  {item.learnings && item.learnings.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                        <Award className={`w-3.5 h-3.5 ${isVolunteering ? 'text-amber-400' : 'text-cyan-400'}`} />
                        Key Competencies & Learnings
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.learnings.map((l, lIdx) => (
                          <span
                            key={lIdx}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                              isVolunteering
                                ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                                : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-200'
                            }`}
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities list */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {item.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isVolunteering ? 'text-amber-400' : 'text-cyan-400'
                            }`}
                          />
                          <span className="leading-relaxed">{resp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Achievements / Key Highlights */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                        <Award className="w-3.5 h-3.5" />
                        <span>Key Highlights & Impact</span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies / Skills */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                      {item.technologies.map((tech, tIdx) => (
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
