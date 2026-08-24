'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Layout,
  Cpu,
  Trophy,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { smoothScrollTo } from '../lib/utils';

const iconMap = {
  Layout,
  Sparkles,
  Cpu,
  Trophy
};

export const Services = () => {
  const { services: servicesList } = usePortfolio();

  if (servicesList.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SERVICES & CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            How I can help build your next vision.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            From modern responsive web applications and AI agent integrations to hardware electronics prototypes and hackathon sprints.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, idx) => {
            const Icon = iconMap[service.icon] || Layout;
            const techList = service.technologies || service.skills || [];
            return (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      {`Service 0${idx + 1}`}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-xl text-zinc-100">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                        Key Deliverables & Features
                      </span>
                      <div className="space-y-1.5">
                        {service.features.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="text-xs text-zinc-300 flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Bar: Tech chips & CTA */}
                <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                  {techList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {techList.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 text-[11px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => smoothScrollTo('contact')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-cyan-500 hover:text-zinc-950 text-zinc-200 text-xs font-semibold transition cursor-pointer"
                  >
                    <span>Discuss This Requirement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
