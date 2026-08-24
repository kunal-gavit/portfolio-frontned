import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  ExternalLink,
  Github,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Layers,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { PaginationNav } from '../../../components/PaginationNav';
import { getHackathonById, getAdjacentHackathons, getHackathons } from '../../../lib/data.js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchLiveHackathon(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/hackathons/${slug}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (err) {
    // fallback
  }
  return getHackathonById(slug);
}

export async function generateStaticParams() {
  const hackathons = getHackathons();
  const params = [];
  hackathons.forEach((h) => {
    if (h.slug) params.push({ slug: h.slug });
    if (h.id && h.id !== h.slug) params.push({ slug: h.id });
    if (h.projectSlug && h.projectSlug !== h.slug && h.projectSlug !== h.id) {
      params.push({ slug: h.projectSlug });
    }
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hackathon = await fetchLiveHackathon(slug);
  if (!hackathon) {
    return { title: 'Hackathon Not Found | Kunal Gavit' };
  }
  return {
    title: `${hackathon.name} — Hackathon Story | Kunal Gavit`,
    description: hackathon.problemStatement || hackathon.solutionSummary,
    openGraph: {
      title: `${hackathon.name} | ${hackathon.result}`,
      description: hackathon.solutionSummary || hackathon.problemStatement
    }
  };
}

export default async function HackathonDetailPage({ params }) {
  const { slug } = await params;
  const hackathon = await fetchLiveHackathon(slug);

  if (!hackathon) {
    notFound();
  }

  const { prev, next } = getAdjacentHackathons(slug);

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: 'Hackathons', href: '/hackathons' },
            { label: hackathon.name, href: `/hackathons/${hackathon.slug || hackathon.id}` }
          ]}
        />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/hackathons"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL HACKATHONS</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              {hackathon.edition || hackathon.date}
            </span>
            {hackathon.isFeatured && (
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Competition
              </span>
            )}
            <span className="px-3 py-1 rounded-lg text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              {hackathon.location}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-zinc-100 tracking-tight leading-tight">
            {hackathon.name}
          </h1>

          {/* Result Badge */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Official Result & Distinction
              </span>
              <span className="text-base sm:text-lg font-bold text-zinc-100">
                {hackathon.result}
              </span>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {hackathon.projectSlug && (
              <Link
                href={`/projects/${hackathon.projectSlug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <span>View Full Project Case Study</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}

            {hackathon.githubUrl && (
              <a
                href={hackathon.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-xs transition"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
              </a>
            )}

            {hackathon.liveUrl && (
              <a
                href={hackathon.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-xs transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Prototype</span>
              </a>
            )}
          </div>
        </div>

        {/* Overview Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              Organizer
            </span>
            <span className="font-bold text-zinc-200 text-sm">
              {hackathon.organizer || 'National Tech Consortium'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              Team Structure
            </span>
            <span className="font-bold text-zinc-200 text-sm">
              {hackathon.teamName ? `${hackathon.teamName}` : 'Collaborative Squad'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              My Role
            </span>
            <span className="font-bold text-zinc-200 text-sm">
              {hackathon.teamRole || 'Lead Architect & Full Stack'}
            </span>
          </div>
        </div>

        {/* Problem Statement & Solution */}
        <div className="space-y-6 mb-12">
          {hackathon.problemStatement && (
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                The Hackathon Problem Statement
              </span>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {hackathon.problemStatement}
              </p>
            </div>
          )}

          {hackathon.solutionSummary && (
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-amber-500/30 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                The Working Prototype Solution
              </span>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {hackathon.solutionSummary}
              </p>
            </div>
          )}
        </div>

        {/* Technologies Used */}
        {hackathon.technologies && hackathon.technologies.length > 0 && (
          <div className="space-y-4 mb-12 p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Technologies Deployed in Sprint</span>
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {hackathon.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Outcomes */}
        {hackathon.keyOutcomes && hackathon.keyOutcomes.length > 0 && (
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-extrabold text-zinc-100">
              Key Outcomes & Sprint Highlights
            </h2>
            <div className="space-y-3">
              {hackathon.keyOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jury Feedback */}
        {hackathon.juryFeedback && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/20 to-zinc-900 border border-amber-500/30 space-y-3 mb-12">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Jury & Mentor Feedback</span>
            </div>
            <p className="text-sm sm:text-base italic text-zinc-200 leading-relaxed font-sans">
              {hackathon.juryFeedback}
            </p>
          </div>
        )}

        {/* Networking Learnings */}
        {hackathon.networkingLearnings && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3 mb-12">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Engineering & Team Takeaways
            </span>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {hackathon.networkingLearnings}
            </p>
          </div>
        )}

        {/* Photo Gallery if Available */}
        {hackathon.photoGallery && hackathon.photoGallery.length > 0 && (
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-extrabold text-zinc-100 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span>Sprint Photos & Live Stage Moments</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hackathon.photoGallery.map((photo, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl space-y-3"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full aspect-video object-cover"
                  />
                  {photo.caption && (
                    <p className="px-4 pb-4 text-xs text-zinc-400 font-mono">
                      {photo.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Previous / Next Hackathon Navigation */}
        <PaginationNav
          prevItem={prev}
          nextItem={next}
          basePath="/hackathons"
          typeLabel="Hackathon"
        />
      </div>
    </div>
  );
}
