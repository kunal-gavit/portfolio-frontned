'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Github, ExternalLink, BookOpen, Star, Sparkles, ArrowRight } from 'lucide-react';

export const ProjectCard = ({ project, onOpenCaseStudy, index = 0 }) => {
  if (!project) return null;

  const techList = project.technologies || project.techStack || [];
  const githubLink = project.github || project.githubUrl;
  const demoLink = project.liveDemo || project.liveUrl;
  const projectHref = `/projects/${project.slug || project.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-cyan-500/40 overflow-hidden shadow-xl hover:shadow-cyan-500/10 transition-all flex flex-col group"
    >
      {/* Project Cover Image */}
      <Link href={projectHref} className="relative aspect-video w-full overflow-hidden bg-zinc-950 block">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.category && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-zinc-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              {project.category}
            </span>
          )}
          {project.featured && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </span>
          )}
        </div>

        {project.stars && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-950/80 text-amber-300 border border-zinc-800 text-[10px] font-mono backdrop-blur-md">
            <Star className="w-3 h-3 fill-amber-300" />
            <span>{project.stars}</span>
          </div>
        )}
      </Link>

      {/* Project Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link href={projectHref} className="block group-hover:text-cyan-300 transition-colors">
            <h3 className="font-heading font-extrabold text-xl text-zinc-100 group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
            {project.description || project.tagline}
          </p>
        </div>

        {/* Tech Stack Chips */}
        {techList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {techList.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
              >
                {tech}
              </span>
            ))}
            {techList.length > 5 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-zinc-800/40 text-zinc-500">
                +{techList.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          <Link
            href={projectHref}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-1.5">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
                title="View Source on GitHub"
                aria-label="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
                title="Open Live Prototype / Demo"
                aria-label="Open Live Prototype / Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
