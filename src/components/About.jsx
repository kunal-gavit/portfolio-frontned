'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User,
  GraduationCap,
  Cpu,
  Sparkles,
  Compass,
  Zap,
  MapPin,
  CheckCircle2,
  Rocket,
  Code2,
  Terminal,
  Layers,
  Radio,
  Lightbulb,
  Trophy,
  Briefcase,
  UserCheck,
  Mail
} from 'lucide-react';
import { getAbout, getAcademicMilestones } from '../lib/data.js';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Code2,
  Sparkles,
  Radio,
  Cpu,
  Trophy,
  Rocket,
  Terminal,
  Layers,
  Lightbulb,
  Zap
};

export const About = () => {
  const about = getAbout();
  const { profile } = usePortfolio();
  const academicMilestones = getAcademicMilestones();

  const [imgSrc, setImgSrc] = useState(profile.profileImage || profile.image);

  useEffect(() => {
    if (profile.profileImage || profile.image) {
      setImgSrc(profile.profileImage || profile.image);
    }
  }, [profile.profileImage, profile.image]);

  const focusCards = about.highlights || [];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>{about.heading ? about.heading.toUpperCase() : 'ABOUT ME'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            {about.subheading || profile.title || 'Engineering Student • Developer • AI & IoT Enthusiast'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            {about.tagline || profile.tagline}
          </p>
        </div>

        {/* Featured Visual Profile Card & Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 p-6 sm:p-8 rounded-3xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl group"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            {/* Visual Photo Frame */}
            <div className="relative shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl p-1 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_0_25px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-shadow">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-zinc-950">
                <img
                  src={imgSrc}
                  alt={profile.name}
                  onError={() => setImgSrc('/images/default-avatar.svg')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Visual Profile Info */}
            <div className="text-center md:text-left space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Verified Developer Profile</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-100">
                {profile.name}
              </h3>
              <p className="text-sm font-semibold text-cyan-400 font-mono">
                {profile.role || profile.title}
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                {profile.tagline || profile.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  MITAOE Pune
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {profile.availabilityStatus || 'Available for opportunities'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Focus Cards */}
        {focusCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {focusCards.map((card, idx) => {
              const Icon = iconMap[card.icon] || Code2;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 space-y-3 transition-all hover:scale-[1.02] shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${card.color || 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-zinc-100">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 2-Column Story & Journey Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4"
            >
              <div className="flex items-center gap-3 text-cyan-400 font-heading font-semibold text-lg">
                <div className="p-2 rounded-xl bg-cyan-500/10">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3>{about.philosophyTitle || 'My Engineering Philosophy'}</h3>
              </div>
              <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                {(about.bio || profile.bio || []).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            {/* Currently Exploring Grid */}
            {((about.currentlyExploring || profile.currentlyExploring)?.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Currently Exploring & Refining</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(about.currentlyExploring || profile.currentlyExploring).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-zinc-300 p-2 rounded-lg bg-zinc-950/40 border border-zinc-800/60"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Animated Journey Timeline */}
          {academicMilestones.length > 0 && (
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-zinc-100">
                      Journey & Milestones
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">2021 — Present</span>
                </div>

                {/* Timeline Items */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-purple-500">
                  {academicMilestones.map((milestone, idx) => (
                    <motion.div
                      key={milestone.year || idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="relative space-y-1"
                    >
                      {/* Timeline node */}
                      <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-zinc-950 border-2 border-cyan-400" />
                      <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase tracking-wider">
                        {milestone.year}
                      </span>
                      <h5 className="font-bold text-sm text-zinc-100">
                        {milestone.title}
                      </h5>
                      <div className="text-xs text-zinc-400">
                        {milestone.institution}
                      </div>
                      <p className="text-xs text-zinc-400 pt-0.5 leading-relaxed">
                        {milestone.detail}
                      </p>
                    </motion.div>
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
