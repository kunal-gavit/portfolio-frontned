'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ExternalLink,
  Github,
  Award,
  CheckCircle2,
  Image as ImageIcon,
  MessageSquare,
  X
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hackathons = () => {
  const { hackathons: rawHackathons } = usePortfolio();
  const hackathons = (rawHackathons || []).filter((h) => h.status !== 'Draft');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (hackathons.length === 0) return null;

  const featuredHackathon = hackathons.find((h) => h.isFeatured || h.featured) || hackathons[0];
  const otherHackathons = hackathons.filter((h) => h.id !== featuredHackathon?.id);

  return (
    <section id="hackathons" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>HACKATHON SPRINTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            High-intensity builds & national pitches.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            From 36-hour sleepless coding marathons to pitching live before industry juries — where ideas turn into working code under pressure.
          </p>
        </div>

        {/* Featured Hackathon Spotlight */}
        {featuredHackathon && (
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-cyan-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8">
                {/* Header Badges & Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-500 text-zinc-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/25">
                        {featuredHackathon.badge || 'Featured Hackathon'}
                      </span>
                      {featuredHackathon.edition && (
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-cyan-400 text-xs font-mono border border-zinc-700">
                          {featuredHackathon.edition}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-100">
                      {featuredHackathon.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {featuredHackathon.date || featuredHackathon.year}
                    </span>
                    {featuredHackathon.location && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        {featuredHackathon.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Team & Result Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(featuredHackathon.teamName || featuredHackathon.teamRole || featuredHackathon.team) && (
                    <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Team & Role
                      </span>
                      <div className="font-bold text-sm text-zinc-200 flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span>
                          {featuredHackathon.teamName || featuredHackathon.team}
                          {(featuredHackathon.teamRole || featuredHackathon.role) && ` — ${featuredHackathon.teamRole || featuredHackathon.role}`}
                        </span>
                      </div>
                    </div>
                  )}

                  {featuredHackathon.result && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 space-y-1">
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                        Official Result
                      </span>
                      <div className="font-bold text-sm text-amber-300 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>{featuredHackathon.result}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Problem Statement & Solution */}
                <div className="space-y-4">
                  {featuredHackathon.problemStatement && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        Problem Statement
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/60">
                        {featuredHackathon.problemStatement}
                      </p>
                    </div>
                  )}

                  {(featuredHackathon.solutionSummary || featuredHackathon.solution) && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        Engineered Solution
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20">
                        {featuredHackathon.solutionSummary || featuredHackathon.solution}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Outcomes & Learnings */}
                {featuredHackathon.keyOutcomes && featuredHackathon.keyOutcomes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                      Key Outcomes & Demo Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {featuredHackathon.keyOutcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800 text-xs text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Jury Feedback */}
                {featuredHackathon.juryFeedback && (
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Jury Feedback</span>
                    </div>
                    <blockquote className="text-xs sm:text-sm italic text-zinc-300">
                      {featuredHackathon.juryFeedback}
                    </blockquote>
                  </div>
                )}

                {/* Technologies used */}
                {featuredHackathon.technologies && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
                    {featuredHackathon.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Photo Gallery If Available */}
                {featuredHackathon.photoGallery && featuredHackathon.photoGallery.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Hackathon Gallery</span>
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {featuredHackathon.photoGallery.map((photo, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => setSelectedPhoto(photo)}
                          className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group cursor-pointer"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption || 'Hackathon photo'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-[10px] text-zinc-100">
                            {photo.caption}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Other Hackathons Grid */}
        {otherHackathons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherHackathons.map((hackathon, idx) => (
              <motion.div
                key={hackathon.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/30 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[10px] border border-cyan-500/20">
                      {hackathon.edition || hackathon.date || hackathon.year}
                    </span>
                    {hackathon.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] border border-amber-500/30">
                        {hackathon.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-bold text-lg text-zinc-100">
                    {hackathon.name}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {hackathon.solutionSummary || hackathon.description}
                  </p>

                  {hackathon.result && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-semibold flex items-center gap-2 border border-amber-500/20">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>{hackathon.result}</span>
                    </div>
                  )}
                </div>

                {hackathon.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80">
                    {hackathon.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Photo Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <div
                className="max-w-3xl w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || 'Hackathon detail'}
                  className="w-full max-h-[70vh] object-contain bg-zinc-950"
                />
                {selectedPhoto.caption && (
                  <div className="p-4 bg-zinc-900 text-sm text-zinc-200">
                    {selectedPhoto.caption}
                  </div>
                )}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-zinc-950/80 text-zinc-300 hover:text-white border border-zinc-700 cursor-pointer"
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
