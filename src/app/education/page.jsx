'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getAcademicMilestones } from '../../lib/data.js';
import { usePortfolio } from '../../context/PortfolioContext';

export default function EducationPage() {
  const { education: liveEducation } = usePortfolio();
  const educationList = liveEducation || [];
  const milestones = getAcademicMilestones();

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Education & Academics', href: '/education' }]} />

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATIONS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Education & Academic Timeline
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Formal engineering degree, core theoretical foundations in Computer Science and Electronics, laboratory coursework, and leadership activities.
          </p>
        </div>

        {/* Degrees List */}
        <div className="space-y-10 mb-16">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold text-zinc-100">
                      {edu.degree}
                    </h2>
                    {edu.current && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-mono border border-cyan-500/30 font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-cyan-400">
                    {edu.field}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-zinc-400 font-mono space-y-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {edu.location}
                  </span>
                </div>
              </div>

              {/* Institution */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-sm text-zinc-300">
                <div className="flex items-center gap-2 font-medium">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{edu.institution}</span>
                </div>
                {edu.score && (
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    {edu.score}
                  </span>
                )}
              </div>

              {/* Relevant Coursework */}
              {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    Key Academic Coursework
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {edu.relevantCoursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1 rounded-xl text-xs bg-zinc-950/80 text-zinc-300 border border-zinc-800"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities & Leadership */}
              {edu.activities && edu.activities.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Campus Activities & Technical Leadership
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {edu.activities.map((act, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Academic Milestones Roadmap */}
        {milestones.length > 0 && (
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">
                  Academic Milestones
                </h3>
                <p className="text-xs text-zinc-400">
                  Progression and key learning inflection points.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-zinc-200 text-sm block">
                      {m.title}
                    </span>
                    <span className="text-cyan-400 font-mono text-[11px] block">
                      {m.institution}
                    </span>
                    <p className="text-zinc-400 mt-1">{m.detail}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 shrink-0">
                    {m.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
