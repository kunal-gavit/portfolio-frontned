'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { getTestimonials } from '../lib/data.js';

export const Testimonials = () => {
  const testimonials = getTestimonials();

  // If testimonials array is empty, gracefully hide the section
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Quote className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS & PEER FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Peer feedback & project collaborations.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Insights from hackathon teammates, tech club peers, and academic collaborators.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Quote className="w-4 h-4" />
                  </div>
                  {item.isPlaceholder && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      Peer Review Template
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{item.content || item.testimonial || item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-zinc-100">
                    {item.name || item.author}
                  </h4>
                  <p className="text-xs text-cyan-400">
                    {item.role || item.title}
                  </p>
                  {item.organization && (
                    <p className="text-[11px] text-zinc-500">
                      {item.organization || item.company}
                    </p>
                  )}
                </div>
                {item.relationship && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 max-w-[120px] text-right truncate">
                    {item.relationship}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
