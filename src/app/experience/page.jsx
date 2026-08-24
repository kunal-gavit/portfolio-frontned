'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
  Sparkles,
  Building2,
  HeartHandshake,
  Users,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Tag,
  ExternalLink,
  Flame
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ExperiencePage() {
  const { experience: liveExperience } = usePortfolio();
  const experienceList = liveExperience || [];
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedId, setExpandedId] = useState('exp-mit-india-pod-volunteer');

  const filteredList = useMemo(() => {
    if (selectedFilter === 'All') return experienceList;
    if (selectedFilter === 'Volunteering & Leadership') {
      return experienceList.filter(
        (e) => e.type === 'Volunteering & Leadership' || e.category?.includes('Volunteering')
      );
    }
    if (selectedFilter === 'Technical Work') {
      return experienceList.filter(
        (e) => e.type !== 'Volunteering & Leadership' && !e.category?.includes('Volunteering')
      );
    }
    return experienceList;
  }, [experienceList, selectedFilter]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Experience & Leadership', href: '/experience' }]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>EXPERIENCE, LEADERSHIP & VOLUNTEERING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Journey, Roles & Contributions
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            A comprehensive record of project engineering, on-ground national hackathon volunteering, team mentorship, and community leadership.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { label: 'All Experience', val: 'All', count: experienceList.length },
            {
              label: 'Leadership & Volunteering',
              val: 'Volunteering & Leadership',
              count: experienceList.filter((e) => e.type === 'Volunteering & Leadership').length
            },
            {
              label: 'Technical Engineering',
              val: 'Technical Work',
              count: experienceList.filter((e) => e.type !== 'Volunteering & Leadership').length
            }
          ].map((tab) => (
            <button
              key={tab.val}
              onClick={() => setSelectedFilter(tab.val)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
                selectedFilter === tab.val
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  selectedFilter === tab.val
                    ? 'bg-zinc-950/30 text-zinc-900'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Experience Timeline */}
        {filteredList.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <Briefcase className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No records found</h3>
            <p className="text-xs text-zinc-500">Try selecting a different filter category.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
            {filteredList.map((item, index) => {
              const isVolunteering = item.type === 'Volunteering & Leadership';
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="relative group"
                >
                  {/* Timeline Marker Dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-zinc-950 border-2 transition-all shadow-[0_0_10px_rgba(6,182,212,0.6)] ${
                      isVolunteering
                        ? 'border-amber-400 group-hover:bg-amber-400 group-hover:scale-125'
                        : 'border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125'
                    }`}
                  />

                  {/* Experience Card Container */}
                  <div
                    className={`rounded-3xl border shadow-xl transition-all backdrop-blur-xl overflow-hidden ${
                      isVolunteering
                        ? 'bg-zinc-900/80 border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5'
                        : 'bg-zinc-900/60 border-zinc-800/80 hover:border-cyan-500/30'
                    }`}
                  >
                    {/* Optional Top Event Banner for Hackathon Volunteering */}
                    {isVolunteering && item.eventVisual && (
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-950 border-b border-amber-500/20">
                        <img
                          src={item.eventVisual}
                          alt={item.organization}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
                        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            {item.category || 'Volunteering / Hackathon Experience'}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-950/80 text-zinc-300 border border-zinc-700/80 backdrop-blur-md">
                            {item.period}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-800/80 pb-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="font-heading font-extrabold text-2xl text-zinc-100">
                              {item.role}
                            </h2>
                            {item.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-mono border border-amber-500/30 font-bold uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                            {item.current && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 font-semibold">
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
                            <span>{item.organization}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-zinc-400 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            {item.period}
                          </span>
                          {item.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                              {item.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Personal Highlight Quote for Volunteering & Leadership */}
                      {item.highlight && (
                        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-xs sm:text-sm text-zinc-200 italic leading-relaxed">
                          "{item.highlight}"
                        </div>
                      )}

                      {/* Key Learnings Badges (Requested visually appealing cards/badges) */}
                      {item.learnings && item.learnings.length > 0 && (
                        <div className="space-y-3">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <Award
                              className={`w-4 h-4 ${
                                isVolunteering ? 'text-amber-400' : 'text-cyan-400'
                              }`}
                            />
                            <span>Key Takeaways & Competencies</span>
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {item.learnings.map((learn, lIdx) => (
                              <div
                                key={lIdx}
                                className={`p-3 rounded-xl border text-center transition flex items-center justify-center text-xs font-semibold ${
                                  isVolunteering
                                    ? 'bg-amber-500/5 border-amber-500/20 text-amber-200 hover:bg-amber-500/10 hover:border-amber-500/40'
                                    : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-500/40'
                                }`}
                              >
                                {learn}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Responsibilities Section */}
                      {item.responsibilities && item.responsibilities.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <ShieldCheck
                              className={`w-4 h-4 ${
                                isVolunteering ? 'text-amber-400' : 'text-cyan-400'
                              }`}
                            />
                            <span>Core Responsibilities & Execution</span>
                          </span>
                          <div className="grid grid-cols-1 gap-2.5">
                            {item.responsibilities.map((resp, rIdx) => (
                              <div
                                key={rIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60"
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                                    isVolunteering ? 'text-amber-400' : 'text-cyan-400'
                                  }`}
                                />
                                <span>{resp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Achievements (for technical roles) */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-2">
                          <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            Key Impact & Deliverables
                          </span>
                          <ul className="space-y-1.5 pl-4 list-disc text-xs text-zinc-300">
                            {item.achievements.map((ach, aIdx) => (
                              <li key={aIdx}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skills / Tech Tags */}
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-mono text-zinc-500 mr-1 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Skills:
                          </span>
                          {item.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
