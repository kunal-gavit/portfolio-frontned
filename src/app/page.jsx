'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  FolderCode,
  Trophy,
  Cpu,
  BookOpen,
  ArrowRight,
  Sparkles,
  Send,
  Mail,
  Layers,
  ChevronRight,
  Star,
  ExternalLink,
  Github
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { ProjectCard } from '../components/ProjectCard';
import { CurrentlyBuilding } from '../components/CurrentlyBuilding';
import { usePortfolio } from '../context/PortfolioContext';

export default function HomePage() {
  const { profile, projects, hackathons, skills, blogs } = usePortfolio();

  const featuredProjects = (projects || [])
    .filter((p) => (p.featured || p.isFeatured) && p.status !== 'Draft')
    .slice(0, 6);
  const featuredHackathons = (hackathons || [])
    .filter((h) => (h.featured || h.isFeatured) && h.status !== 'Draft');
  const skillCategories = (skills || []).slice(0, 4);
  const latestBlogs = (blogs || [])
    .filter((b) => b.status !== 'Draft' && b.published !== false)
    .slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. High Impact Hero */}
      <Hero />

      {/* 2. Dynamic Quick Stats */}
      <Stats />

      {/* 3. Featured Projects Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
              <FolderCode className="w-3.5 h-3.5" />
              <span>CURATED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Selected production systems, full-stack applications, and embedded hardware architectures.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/40 text-cyan-400 text-xs font-bold transition group shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id || project.slug || idx}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* 4. Featured Hackathons Sprint */}
      {featuredHackathons.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono">
                <Trophy className="w-3.5 h-3.5" />
                <span>COMPETITIONS & SPRINTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                Featured Hackathons
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                Rapid product prototyping and stage pitching under high pressure.
              </p>
            </div>

            <Link
              href="/hackathons"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-amber-400 text-xs font-bold transition group shrink-0"
            >
              <span>View All Hackathons</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredHackathons.map((h, idx) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold">
                      {h.edition || h.date}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {h.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {h.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-mono mt-1">
                      🏆 {h.result}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {h.problemStatement || h.solutionSummary}
                  </p>

                  {/* Tech stack */}
                  {h.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {h.technologies.slice(0, 5).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <Link
                    href={`/hackathons/${h.slug || h.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                  >
                    <span>Read Hackathon Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  {h.projectSlug && (
                    <Link
                      href={`/projects/${h.projectSlug}`}
                      className="text-xs text-zinc-400 hover:text-zinc-200 transition font-mono underline underline-offset-4"
                    >
                      View Project
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Skills Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Skills & Core Technologies
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              From web engineering and backend APIs to AI agents and embedded electronics.
            </p>
          </div>

          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/40 text-cyan-400 text-xs font-bold transition group shrink-0"
          >
            <span>Explore All Skills</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.domain || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 transition-all space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-zinc-100">
                  {cat.domain}
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  {(cat.skills || []).length} items
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(cat.skills || []).slice(0, 4).map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Currently Building */}
      <CurrentlyBuilding />

      {/* 7. Latest Blog Articles */}
      {latestBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono">
                <BookOpen className="w-3.5 h-3.5" />
                <span>THOUGHTS & ENGINEERING</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                Latest Articles
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                Engineering deep-dives, hackathon post-mortems, and technical architecture guides.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 text-purple-400 text-xs font-bold transition group shrink-0"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id || blog.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-purple-500/40 overflow-hidden shadow-xl hover:shadow-purple-500/10 transition-all flex flex-col group"
              >
                <Link
                  href={`/blog/${blog.slug || blog.id}`}
                  className="aspect-video w-full overflow-hidden bg-zinc-950 block relative"
                >
                  <img
                    src={blog.image || blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-zinc-900/90 text-purple-400 border border-purple-500/30 backdrop-blur-md">
                      {blog.category || 'Article'}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readingTime || blog.readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${blog.slug || blog.id}`}
                      className="block group-hover:text-purple-300 transition-colors"
                    >
                      <h3 className="font-bold text-lg text-zinc-100 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {blog.description || blog.summary}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${blog.slug || blog.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 8. High Impact Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-950 border-2 border-cyan-500/30 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight max-w-2xl mx-auto">
            Let's build something together.
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Whether you have a breakthrough startup idea, need full-stack or IoT engineering expertise, or want to collaborate on a hackathon.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:scale-[1.02] transition cursor-pointer"
            >
              <FolderCode className="w-4 h-4 text-zinc-400" />
              <span>Explore Portfolio</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
