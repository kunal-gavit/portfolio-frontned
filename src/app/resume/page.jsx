'use client';

import React from 'react';
import Link from 'next/link';
import {
  Printer,
  Download,
  ExternalLink,
  FileText,
  Building2,
  Calendar,
  GraduationCap,
  Award,
  Cpu,
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { usePortfolio } from '../../context/PortfolioContext';
import { analytics } from '../../lib/analytics';

export default function ResumeRoute() {
  const {
    profile,
    experience: experienceData,
    education: educationData,
    skills: skillCategories,
    hackathons: hackathonsData,
    certifications: certificationsData,
    projects: projectsData,
  } = usePortfolio();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const resumeUrl = profile?.resumeDownloadUrl || profile?.directResumeUrl || profile?.resume || `${apiUrl}/profile/resume`;
  const resumeFilename = profile?.resumeFilename || 'Kunal_Gavit_Resume.pdf';

  const handleDownload = () => {
    analytics.trackResumeDownload('resume_page');
    if (resumeUrl.startsWith('http')) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    } else {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = resumeFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="print:hidden">
          <Breadcrumbs items={[{ label: 'Resume Center', href: '/resume' }]} />
        </div>

        {/* Top Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800 print:hidden">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-zinc-100 flex items-center gap-2.5">
              <FileText className="w-7 h-7 text-cyan-400" />
              <span>Interactive Resume Center</span>
            </h1>
            <p className="text-xs text-zinc-400">
              Official curriculum vitae of {profile.name} ({profile.title || profile.role})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-zinc-400" />
              <span>Print</span>
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-semibold transition"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              <span>Direct Link</span>
            </a>
          </div>
        </div>

        {/* Formatted A4-Like Printable Resume Card */}
        <div className="bg-zinc-900/80 print:bg-white print:text-black border border-zinc-800 print:border-none rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 backdrop-blur-xl">
          {/* Header Info */}
          <div className="border-b border-zinc-800 print:border-zinc-300 pb-6 space-y-2">
            <h2 className="text-3xl font-black text-zinc-100 print:text-black tracking-tight">
              {profile.name}
            </h2>
            <p className="text-sm font-semibold text-cyan-400 print:text-zinc-700">
              {profile.title || profile.role}
            </p>
            <p className="text-xs text-zinc-400 print:text-zinc-600">
              {profile.location} • {profile.email}
            </p>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black">
              Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              {profile.tagline || profile.description}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h3>
            <div className="space-y-3">
              {(educationData || []).map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-zinc-200 print:text-black block">
                      {edu.degree} — {edu.field}
                    </span>
                    <span className="text-zinc-400 print:text-zinc-600 block">
                      {edu.institution}, {edu.location}
                    </span>
                  </div>
                  <span className="font-mono text-zinc-500 print:text-zinc-600 text-xs shrink-0">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Technical Arsenal</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(skillCategories || []).map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/60 print:bg-zinc-50 border border-zinc-800/80 print:border-zinc-200">
                  <span className="font-bold text-zinc-200 print:text-black block mb-1">
                    {cat.domain || cat.category}
                  </span>
                  <span className="text-zinc-400 print:text-zinc-700">
                    {(cat.skills || cat.items || []).map((s) => s.name || s).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Featured Engineering Projects</span>
            </h3>
            <div className="space-y-4">
              {(projectsData || []).slice(0, 4).map((p, idx) => (
                <div key={idx} className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-zinc-200 print:text-black">
                      {p.title} ({p.category})
                    </span>
                    <span className="font-mono text-zinc-500 text-xs">{p.status}</span>
                  </div>
                  <p className="text-xs text-zinc-400 print:text-zinc-700">
                    {p.description || p.tagline}
                  </p>
                  <span className="text-[11px] font-mono text-cyan-400/80 print:text-zinc-600 block">
                    Tech: {(p.technologies || p.techStack || []).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Accolades */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-black flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              <span>Competitions & Awards</span>
            </h3>
            <div className="space-y-2">
              {(hackathonsData || []).map((h, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold text-zinc-200 print:text-black">
                      {h.name} — {h.result}
                    </span>
                    <p className="text-zinc-400 print:text-zinc-600 text-[11px]">
                      {h.edition || h.date} • {h.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
