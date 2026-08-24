import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FolderCode,
  Github,
  ExternalLink,
  Star,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowLeft,
  Calendar,
  Users,
  ShieldAlert,
  Lightbulb,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { PaginationNav } from '../../../components/PaginationNav';
import { getProjectById, getAdjacentProjects, getProjects } from '../../../lib/data.js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchLiveProject(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/projects/${slug}`, {
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
  return getProjectById(slug);
}

export async function generateStaticParams() {
  const projects = getProjects();
  const params = [];
  projects.forEach((p) => {
    if (p.slug) params.push({ slug: p.slug });
    if (p.id && p.id !== p.slug) params.push({ slug: p.id });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await fetchLiveProject(slug);
  if (!project) {
    return { title: 'Project Not Found | Kunal Gavit' };
  }
  return {
    title: `${project.title} — Case Study | Kunal Gavit`,
    description: project.description || project.tagline,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.tagline || project.description,
      images: [project.image?.secureUrl || project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop']
    }
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await fetchLiveProject(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);
  const caseStudy = project.caseStudy || {};
  const techList = project.technologies || project.techStack || [];
  const githubLink = project.github || project.githubUrl;
  const demoLink = project.liveDemo || project.liveUrl;

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: 'Projects', href: '/projects' },
            { label: project.title, href: `/projects/${project.slug || project.id}` }
          ]}
        />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>
        </div>

        {/* Project Header & Hero */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {project.category}
              </span>
            )}
            {project.featured && (
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Project
              </span>
            )}
            {project.status && (
              <span className="px-3 py-1 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                Status: {project.status}
              </span>
            )}
            {project.stars && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-amber-300 bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                {project.stars} Stars
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-zinc-100 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-medium leading-relaxed">
            {project.tagline || project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Demo</span>
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-semibold text-xs transition cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Cover Image */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl mb-14 relative">
          <img
            src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overview Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              My Role
            </span>
            <span className="font-bold text-zinc-200 text-sm">
              {caseStudy.role || 'Full Stack Engineer & Hardware Lead'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              Timeline / Duration
            </span>
            <span className="font-bold text-zinc-200 text-sm">
              {caseStudy.timeline || '2 - 4 Months'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              Team Structure
            </span>
            <span className="font-bold text-zinc-200 text-sm">
              {caseStudy.teamSize || 'Solo / Hackathon Lead'}
            </span>
          </div>
        </div>

        {/* Problem & Solution Deep Dive */}
        <div className="space-y-8 mb-14">
          {caseStudy.problem && (
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>THE CORE PROBLEM</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>
          )}

          {caseStudy.solution && (
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>THE ENGINEERED SOLUTION</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          )}
        </div>

        {/* Key Features */}
        {caseStudy.features && caseStudy.features.length > 0 && (
          <div className="space-y-6 mb-14">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRODUCT CAPABILITIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                Key Features & Engineering Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Badges */}
        {techList.length > 0 && (
          <div className="space-y-4 mb-14 p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Technology Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {techList.map((tech, idx) => (
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

        {/* Architecture Section */}
        {(caseStudy.architectureOverview || caseStudy.architectureLayers) && (
          <div className="space-y-6 mb-14">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>SYSTEM DESIGN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                Technical Architecture
              </h2>
            </div>

            {caseStudy.architectureOverview && (
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
                {caseStudy.architectureOverview}
              </p>
            )}

            {caseStudy.architectureLayers && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {caseStudy.architectureLayers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3"
                  >
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      {layer.layer}
                    </span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {layer.description}
                    </p>
                    {layer.components && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {layer.components.map((comp, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Engineering Challenges & Solutions */}
        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <div className="space-y-6 mb-14">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>DEEP DIVE CHALLENGES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                Technical Obstacles & Solutions
              </h2>
            </div>

            <div className="space-y-4">
              {caseStudy.challenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4"
                >
                  <h3 className="text-lg font-bold text-zinc-100">
                    {item.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-zinc-300 space-y-1.5">
                      <span className="font-mono text-rose-400 font-semibold text-xs block">
                        Problem Encountered:
                      </span>
                      <p>{item.problem}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-zinc-300 space-y-1.5">
                      <span className="font-mono text-cyan-400 font-semibold text-xs block">
                        Engineered Resolution:
                      </span>
                      <p>{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results & Metrics */}
        {caseStudy.resultsAndMetrics && caseStudy.resultsAndMetrics.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4 mb-14">
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Measurable Results & Impact</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {caseStudy.resultsAndMetrics.map((result, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-2" />
                  <p>{result}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Previous / Next Project Navigation */}
        <PaginationNav
          prevItem={prev}
          nextItem={next}
          basePath="/projects"
          typeLabel="Project"
        />
      </div>
    </div>
  );
}
