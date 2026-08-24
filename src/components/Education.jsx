'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { getAcademicMilestones } from '../lib/data.js';
import { usePortfolio } from '../context/PortfolioContext';

export const Education = () => {
  const { education: educationData } = usePortfolio();
  const academicMilestones = getAcademicMilestones();

  if (educationData.length === 0) return null;

  return (
    <section id="education" className="py-24 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Education & engineering coursework.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Rigorous training in computer science theory, electronics, embedded systems, and algorithmic problem solving.
          </p>
        </div>

        {/* Education Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Degree Cards */}
          <div className="lg:col-span-8 space-y-6">
            {educationData.map((edu, idx) => (
              <motion.div
                key={edu.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-7 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-5 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-xl text-zinc-100">
                        {edu.degree}
                      </h3>
                      {edu.current && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-mono border border-cyan-500/30">
                          Active Enrolled
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                      {edu.field}
                    </div>
                    <div className="text-xs text-zinc-300 font-medium">
                      {edu.institution}
                    </div>
                  </div>

                  <div className="text-right text-xs text-zinc-400 font-mono">
                    <div className="flex items-center sm:justify-end gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{edu.period}</span>
                    </div>
                    {edu.location && (
                      <div className="flex items-center sm:justify-end gap-1 text-zinc-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                    {edu.score && (
                      <span className="text-emerald-400 font-semibold block mt-1">
                        {edu.score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Coursework list */}
                {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Relevant Core Coursework:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCoursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg text-xs bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activities & Key Highlights */}
                {edu.keyHighlights && edu.keyHighlights.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <Award className="w-3.5 h-3.5" />
                      <span>Academic Highlights:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {edu.keyHighlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-xs text-zinc-300 p-2.5 rounded-xl bg-zinc-950/50 border border-zinc-800"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Academic Milestones Summary Sidebar */}
          {academicMilestones.length > 0 && (
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-6"
              >
                <div className="flex items-center gap-2 text-zinc-200 font-heading font-bold">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <h4>Academic Milestones</h4>
                </div>

                <div className="space-y-4">
                  {academicMilestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-cyan-400 font-bold">{m.year}</span>
                        <span className="text-zinc-500">{m.institution}</span>
                      </div>
                      <h5 className="font-bold text-xs text-zinc-200">{m.title}</h5>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{m.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
