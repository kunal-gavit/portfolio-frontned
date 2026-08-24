'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Layers,
  Layout,
  Sparkles,
  Cpu,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Send,
  Wrench
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getServices } from '../../lib/data.js';

const iconMap = {
  Layout,
  Sparkles,
  Cpu,
  Trophy,
  Layers,
  Wrench
};

export default function ServicesPage() {
  const servicesList = getServices();

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Services & Capabilities', href: '/services' }]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>SOLUTIONS & OFFERINGS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            What I Can Build & Engineer
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            From zero-to-one web applications and generative AI pipelines to physical IoT sensor nodes and rapid hackathon prototypes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesList.map((srv, idx) => {
            const IconComponent = iconMap[srv.icon] || Layers;
            return (
              <motion.div
                key={srv.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-cyan-500/40 shadow-xl space-y-6 flex flex-col justify-between transition group backdrop-blur-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 uppercase">
                      {srv.category}
                    </span>
                  </div>

                  <h2 className="font-heading font-extrabold text-2xl text-zinc-100 group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h2>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Bullet features */}
                  {srv.features && (
                    <div className="space-y-2 pt-2">
                      {srv.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ideal For */}
                  {srv.idealFor && (
                    <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400">
                      <span className="font-mono font-semibold text-zinc-300 block mb-1">
                        Ideal for:
                      </span>
                      {srv.idealFor}
                    </div>
                  )}

                  {/* Technologies */}
                  {srv.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {srv.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition cursor-pointer"
                  >
                    <span>Let's Work Together</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-950 border border-cyan-500/30 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
            Have a custom requirement or project in mind?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Let's discuss how we can turn your architectural ideas into production-ready software and working hardware systems.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Initiate Project Discussion</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
