'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  Tag,
  ChevronRight
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getBlogs } from '../../lib/data.js';

export default function BlogListingPage() {
  const allBlogs = getBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract unique categories & tags
  const categories = useMemo(() => {
    const set = new Set();
    allBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ['All', ...Array.from(set)];
  }, [allBlogs]);

  const allTags = useMemo(() => {
    const set = new Set();
    allBlogs.forEach((b) => {
      (b.tags || []).forEach((t) => set.add(t));
    });
    return ['All', ...Array.from(set)];
  }, [allBlogs]);

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = blog.title?.toLowerCase().includes(q);
        const matchDesc =
          blog.description?.toLowerCase().includes(q) ||
          blog.summary?.toLowerCase().includes(q) ||
          blog.content?.toLowerCase().includes(q);
        const matchCat = blog.category?.toLowerCase().includes(q);
        const matchTags = (blog.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && blog.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'All' && !(blog.tags || []).includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [allBlogs, searchQuery, selectedCategory, selectedTag]);

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Blog & Articles', href: '/blog' }]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ARTICLES & WRITING ({allBlogs.length} POSTS)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Technical Articles & Engineering Logs
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            In-depth breakdowns of hackathon sprints, embedded ESP32 architecture, multimodal AI systems, and lessons from shipping software.
          </p>
        </div>

        {/* Discovery Filter Controls */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 mb-12 space-y-6 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 relative">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or keywords..."
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-purple-500 rounded-2xl py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-800 px-2 py-1 rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-purple-500 rounded-2xl py-3 px-4 text-sm text-zinc-200 outline-none transition cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags cloud */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Tags:
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50 font-bold'
                      : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <BookOpen className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No blog posts found</h3>
            <p className="text-xs text-zinc-500">Try adjusting your search query or selected tag.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id || blog.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-purple-500/40 overflow-hidden shadow-xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-zinc-900/90 text-purple-400 border border-purple-500/30 backdrop-blur-md">
                        {blog.category || 'Engineering'}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blog.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readingTime || blog.readTime}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${blog.slug || blog.id}`}
                      className="block group-hover:text-purple-300 transition-colors"
                    >
                      <h2 className="font-heading font-bold text-xl text-zinc-100 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {blog.description || blog.summary}
                    </p>

                    {/* Tags */}
                    {blog.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {blog.tags.slice(0, 4).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${blog.slug || blog.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
