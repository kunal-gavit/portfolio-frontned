'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Cpu,
  TrendingUp,
  BookOpen,
  Code2
} from 'lucide-react';

export const CaseStudyModal = ({ project, onClose }) => {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl overflow-y-auto text-zinc-100 flex flex-col my-auto"
        >
          {/* Header Banner */}
          <div className="relative h-48 sm:h-64 w-full bg-zinc-950 overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 transition cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Tagline in Header */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono">
                  Status: {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title} — Engineering Case Study
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">{project.tagline}</p>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-10">
            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs">
              <div>
                <span className="text-zinc-500 block">My Role</span>
                <span className="text-zinc-200 font-semibold">{caseStudy.role}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Team Size</span>
                <span className="text-zinc-200 font-semibold">{caseStudy.teamSize || 'Engineering Lead'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Timeline</span>
                <span className="text-zinc-200 font-semibold">{caseStudy.timeline || 'Sprint / Launch'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Live Code & Links</span>
                <div className="flex items-center gap-3 mt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <Github className="w-3.5 h-3.5" /> Repo
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Problem & Solution 2-Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-red-950/15 border border-red-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <h3>The Problem</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{caseStudy.problem}</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/15 border border-emerald-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3>The Solution</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{caseStudy.solution}</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-base font-heading font-bold text-zinc-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Key Engineered Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Diagram & Visual Breakdown */}
            <div className="space-y-4">
              <h3 className="text-base font-heading font-bold text-zinc-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                System Architecture & Data Flow
              </h3>
              <p className="text-xs text-zinc-400">{caseStudy.architectureOverview}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {caseStudy.architectureLayers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 relative overflow-hidden"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      Layer 0{idx + 1}
                    </div>
                    <div className="font-semibold text-sm text-zinc-200">{layer.layer}</div>
                    <div className="flex flex-wrap gap-1 py-1">
                      {layer.components.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400">{layer.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="space-y-4">
              <h3 className="text-base font-heading font-bold text-zinc-100 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                Technical Hurdles & How I Solved Them
              </h3>
              <div className="space-y-3">
                {caseStudy.challenges.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2 text-xs"
                  >
                    <div className="font-semibold text-zinc-200 text-sm flex items-center gap-2">
                      <span className="text-amber-400 font-mono">#{idx + 1}</span>
                      {ch.title}
                    </div>
                    <div className="text-zinc-400">
                      <strong className="text-zinc-300">Challenge: </strong>
                      {ch.problem}
                    </div>
                    <div className="text-cyan-300/90 pt-1">
                      <strong className="text-cyan-400">Resolution: </strong>
                      {ch.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results & Metrics */}
            <div className="space-y-4">
              <h3 className="text-base font-heading font-bold text-zinc-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Results, Impact & Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.resultsAndMetrics.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-emerald-950/10 border border-emerald-500/20 text-xs text-zinc-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learnings */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300 font-semibold text-sm">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <h3>Key Engineering Takeaways</h3>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-zinc-400">
                {caseStudy.learnings.map((l, idx) => (
                  <li key={idx}>{l}</li>
                ))}
              </ul>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[11px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Application
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
