'use client';

import React, { useState, useEffect } from 'react';
import {
  Printer,
  Download,
  ExternalLink,
  ArrowLeft,
  FileText,
  AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { analytics, trackEvent } from '../lib/analytics';

export const ResumePage = ({ onBack }) => {
  const {
    profile,
    experience: experienceData,
    education: educationData,
    skills: skillCategories,
    hackathons: hackathonsData,
    certifications: certificationsData,
    projects: projectsData,
    socialLinks,
  } = usePortfolio();

  const resumeUrl = profile.resumeDownloadUrl || profile.directResumeUrl || profile.resume || 'http://localhost:5000/api/profile/resume';
  const resumeFilename = profile.resumeFilename || 'Kunal_Gavit_Resume.pdf';

  const [pdfAvailable, setPdfAvailable] = useState(Boolean(resumeUrl));
  const [isCheckingPdf, setIsCheckingPdf] = useState(false);

  useEffect(() => {
    if (!resumeUrl) {
      setPdfAvailable(false);
      return;
    }
    // Remote URLs (e.g. Cloudinary) are trusted and active
    if (resumeUrl.startsWith('http')) {
      setPdfAvailable(true);
      setIsCheckingPdf(false);
      return;
    }
    // Check local fallback files
    setIsCheckingPdf(true);
    fetch(resumeUrl, { method: 'HEAD' })
      .then((res) => {
        setPdfAvailable(res.ok);
      })
      .catch(() => {
        setPdfAvailable(false);
      })
      .finally(() => {
        setIsCheckingPdf(false);
      });
  }, [resumeUrl]);

  const handleDownload = () => {
    if (!pdfAvailable) return;
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

  const handleViewPdf = () => {
    if (!pdfAvailable) return;
    analytics.trackResumeView('resume_page_view_button');
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    trackEvent('resume_print', { source: 'resume_page' });
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 print:hidden">
          <div className="flex items-center gap-3">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio</span>
              </button>
            ) : (
              <a
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </a>
            )}
            <span className="text-xs font-mono text-cyan-400">
              {profile.name} — Full Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print A4</span>
            </button>

            <button
              onClick={handleViewPdf}
              disabled={!pdfAvailable}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                pdfAvailable
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-cyan-400 border border-cyan-500/30'
                  : 'bg-zinc-800/40 text-zinc-600 cursor-not-allowed'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>View PDF</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!pdfAvailable}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md cursor-pointer ${
                pdfAvailable
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-cyan-500/20'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed shadow-none'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Fallback Notice */}
        {!pdfAvailable && !isCheckingPdf && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3 print:hidden">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
            <div>
              <strong>Resume PDF Not Detected:</strong> PDF file can be placed at{' '}
              <code className="bg-amber-500/20 px-1.5 py-0.5 rounded font-mono">
                public/resume/Kunal_Gavit_Resume.pdf
              </code>
              . The interactive live resume rendered below is fully printable.
            </div>
          </div>
        )}

        {/* Renderable Resume Sheet */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-12 space-y-8 text-xs leading-relaxed print:bg-white print:text-black print:p-0 print:border-none print:rounded-none">
          {/* Header / Identity */}
          <div className="border-b border-zinc-800 print:border-zinc-300 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-3xl font-extrabold font-heading text-white print:text-black tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-cyan-400 print:text-zinc-700 font-mono text-sm font-semibold mt-0.5">
                  {profile.title || profile.role}
                </p>
              </div>
              <div className="text-right text-zinc-400 print:text-zinc-600 font-mono space-y-0.5 text-[11px]">
                <div>{profile.location}</div>
                <div>{profile.email}</div>
                {profile.phone && <div>{profile.phone}</div>}
                {socialLinks.github && <div>{socialLinks.github.replace('https://', '')}</div>}
                {socialLinks.linkedin && <div>{socialLinks.linkedin.replace('https://', '')}</div>}
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-zinc-800 print:border-zinc-300 pb-1">
              Executive Profile
            </h2>
            <p className="text-zinc-300 print:text-zinc-800">
              {profile.tagline || profile.description} Active hackathon builder with a demonstrated record of translating concepts into production-grade prototypes under tight constraints.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-zinc-800 print:border-zinc-300 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-zinc-300 print:text-zinc-800">
              {skillCategories.map((cat, idx) => {
                const items = (cat.skills || cat.items || []).map((s) => s.name || s).join(', ');
                return (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                    <strong className="text-zinc-100 print:text-black font-semibold">
                      {cat.domain || cat.category}:
                    </strong>
                    <span className="sm:col-span-3 text-zinc-400 print:text-zinc-700">
                      {items}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-zinc-800 print:border-zinc-300 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-100 print:text-black text-sm">
                      {edu.institution}
                    </h3>
                    <span className="font-mono text-zinc-400 print:text-zinc-600 text-[11px]">
                      {edu.period}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-300 print:text-zinc-700 italic">
                    <span>{edu.degree} — {edu.field}</span>
                    <span className="text-emerald-400 print:text-zinc-700 font-medium font-mono not-italic">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          {experienceData.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-zinc-800 print:border-zinc-300 pb-1">
                Experience & Roles
              </h2>
              <div className="space-y-4">
                {experienceData.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-zinc-100 print:text-black text-sm">
                        {exp.role} — <span className="text-cyan-400 print:text-zinc-700">{exp.organization || exp.company}</span>
                      </h3>
                      <span className="font-mono text-zinc-400 print:text-zinc-600 text-[11px]">
                        {exp.period}
                      </span>
                    </div>
                    {exp.responsibilities && (
                      <ul className="list-disc list-inside space-y-1 text-zinc-300 print:text-zinc-800 pl-1">
                        {exp.responsibilities.slice(0, 3).map((resp, rIdx) => (
                          <li key={rIdx}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-zinc-800 print:border-zinc-300 pb-1">
              Featured Engineering Projects
            </h2>
            <div className="space-y-3.5">
              {projectsData.slice(0, 3).map((proj, idx) => {
                const tech = (proj.technologies || proj.techStack || []).join(', ');
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-zinc-100 print:text-black text-sm">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-cyan-400 print:text-zinc-600 text-[11px]">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-zinc-300 print:text-zinc-800">
                      {proj.description}
                    </p>
                    {tech && (
                      <div className="text-[11px] font-mono text-zinc-400 print:text-zinc-600">
                        <strong>Tech:</strong> {tech}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hackathons & Honors */}
          {hackathonsData.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-black font-bold border-b border-zinc-800 print:border-zinc-300 pb-1">
                Hackathons & Honors
              </h2>
              <div className="space-y-2 text-zinc-300 print:text-zinc-800">
                {hackathonsData.map((h, idx) => (
                  <div key={idx} className="flex justify-between items-baseline">
                    <span>
                      <strong className="text-zinc-100 print:text-black">{h.name}:</strong> {h.result || h.solutionSummary}
                    </span>
                    <span className="font-mono text-zinc-400 print:text-zinc-600 text-[11px] shrink-0 ml-2">
                      {h.date || h.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
