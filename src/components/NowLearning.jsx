'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Brain, Cpu, Compass, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { getLearning } from '../lib/data.js';

export const NowLearning = () => {
  const learningData = getLearning();
  if (learningData.length === 0) return null;

  return (
    <section id="now" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>NOW / INTELLECTUAL RADAR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            What I'm reading, exploring & learning.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Inspired by Derek Sivers' /now page concept — a living record of current engineering curiosity and research focus.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {learningData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {item.domain}
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{item.progressPercent}%</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-zinc-100">
                    {item.topic}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.whyLearning}
                  </p>
                </div>

                {/* Key Concepts */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    Core Concepts
                  </span>
                  <div className="space-y-1.5">
                    {item.keyConcepts.map((concept, cIdx) => (
                      <div
                        key={cIdx}
                        className="text-xs text-zinc-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curated Resources */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    Curated Reading / Reference
                  </span>
                  <div className="space-y-1">
                    {item.curatedResources.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between text-xs"
                      >
                        <span className="text-zinc-300 font-medium truncate max-w-[200px]">
                          {res.title}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {res.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Target Goal */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs">
                <span className="text-zinc-500 font-mono block text-[10px] uppercase">Target Milestone:</span>
                <span className="text-zinc-200 font-medium mt-0.5 block">
                  {item.targetGoal}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
