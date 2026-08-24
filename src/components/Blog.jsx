'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Blog = () => {
  const { blogs: rawBlogs } = usePortfolio();
  const blogsList = (rawBlogs || []).filter((b) => b.status !== 'Draft' && b.published !== false);
  const [selectedPost, setSelectedPost] = useState(null);

  if (blogsList.length === 0) return null;

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>WRITING & ENGINEERING NOTES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Articles, architecture notes & write-ups.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Documenting deep dives into AI engineering, embedded systems firmware, and real-world lessons from hackathon trenches.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsList.map((post, idx) => {
            const cover = post.coverImage || post.image;
            const description = post.summary || post.description;
            const readTime = post.readingTime || post.readTime;
            return (
              <motion.div
                key={post.id || post.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group rounded-3xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                {/* Image Preview */}
                {cover && (
                  <div className="relative h-44 w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={cover}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    {post.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-900/80 text-cyan-400 text-[10px] font-mono border border-zinc-700/60 backdrop-blur-md">
                        {post.category}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
                      {post.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          {post.date}
                        </span>
                      )}
                      {readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-zinc-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {description && (
                      <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {(post.tags || []).slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 font-mono transition cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Read Article Fullscreen Modal */}
        <AnimatePresence>
          {selectedPost && (
            <div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-zinc-900 rounded-3xl border border-zinc-700 shadow-2xl p-6 sm:p-10 space-y-6 text-zinc-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs border border-cyan-500/20">
                      {selectedPost.category || 'Article'}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {selectedPost.date}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-100">
                    {selectedPost.title}
                  </h2>
                  <p className="text-xs font-mono text-cyan-400">
                    Author: {selectedPost.author || 'Kunal Gavit'} • {selectedPost.readingTime || selectedPost.readTime || '5 min read'}
                  </p>
                </div>

                {/* Cover Image if modal */}
                {(selectedPost.coverImage || selectedPost.image) && (
                  <div className="rounded-2xl overflow-hidden aspect-video w-full bg-zinc-950 border border-zinc-800">
                    <img
                      src={selectedPost.coverImage || selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content body */}
                <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4 font-sans whitespace-pre-line border-t border-zinc-800 pt-6">
                  {selectedPost.content || selectedPost.contentMarkdown}
                </div>

                {/* Tags footer */}
                {selectedPost.tags && (
                  <div className="pt-6 border-t border-zinc-800 flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
