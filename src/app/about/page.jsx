'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Download,
  FileText,
  ArrowRight,
  Mail
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getAbout, getAcademicMilestones } from '../../lib/data.js';
import { usePortfolio } from '../../context/PortfolioContext';
import { analytics } from '../../lib/analytics';

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

export default function AboutPage() {
  const { profile: liveProfile, education: liveEducation } = usePortfolio();
  const about = getAbout();
  const profile = liveProfile || {};
  const academicMilestones = getAcademicMilestones();
  const educationList = liveEducation || [];

  const [imgSrc, setImgSrc] = useState(profile.profileImage || profile.image);
  const focusCards = about.highlights || [];

  const handleDownloadResume = () => {
    analytics.trackResumeDownload('about_page');
    const link = document.createElement('a');
    link.href = profile.resume || '/resume/Kunal_Gavit_Resume.pdf';
    link.download = profile.resumeFilename || 'Kunal_Gavit_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'About Me', href: '/about' }]} />

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT & ENGINEERING JOURNEY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            {about.subheading || profile.title || 'Engineering Student • Developer • AI & IoT Specialist'}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {about.tagline || profile.tagline}
          </p>
        </div>

        {/* Featured Visual Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-10 shadow-2xl mb-16 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Profile Avatar Column */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl p-1.5 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-zinc-950">
                  <img
                    src={imgSrc}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgSrc('/images/kunal-gavit-profile.jpg')}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-2xl text-zinc-100">
                  {profile.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  {profile.location || 'Pune, Maharashtra, India'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume PDF</span>
                </button>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            {/* Narrative Bio Column */}
            <div className="lg:col-span-8 space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed border-t lg:border-t-0 lg:border-l border-zinc-800/80 pt-6 lg:pt-0 lg:pl-8">
              <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Engineering Philosophy & Background</span>
              </h2>

              {about.bio && Array.isArray(about.bio) ? (
                about.bio.map((paragraph, idx) => (
                  <p key={idx} className="text-zinc-300">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-zinc-300">{about.description}</p>
              )}

              {/* Status and Focus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Academic Home
                  </span>
                  <span className="font-semibold text-zinc-200 text-sm">
                    MIT Academy of Engineering (MITAOE), Pune
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Current Focus
                  </span>
                  <span className="font-semibold text-zinc-200 text-sm">
                    Generative AI, Full-Stack Architecture, ESP32 IoT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interests & Currently Exploring Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Interests Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Core Interests & Passions
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(about.interests || []).map((interest, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Currently Exploring */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Currently Exploring & R&D
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(about.currentlyExploring || []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Focus Highlights */}
        {focusCards.length > 0 && (
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>AREAS OF MASTERY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                Technical Focus & Disciplines
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusCards.map((card, idx) => {
                const IconComponent = iconMap[card.icon] || Code2;
                return (
                  <motion.div
                    key={card.title || idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 transition-all space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${card.color || 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-zinc-100">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Academic Journey / Education Summary */}
        {educationList.length > 0 && (
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">
                    Academic Background
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Formal engineering studies, foundational coursework, and practical labs.
                  </p>
                </div>
              </div>

              <Link
                href="/education"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
              >
                <span>View Full Academic Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {educationList.slice(0, 2).map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2"
                >
                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 bg-cyan-500/10 rounded">
                    {edu.duration || edu.year}
                  </span>
                  <h4 className="font-bold text-base text-zinc-200">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-zinc-400">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
