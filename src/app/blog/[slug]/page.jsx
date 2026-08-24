import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Tag,
  Sparkles,
  Share2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { PaginationNav } from '../../../components/PaginationNav';
import { getBlogBySlug, getAdjacentBlogs, getRelatedBlogs, getBlogs } from '../../../lib/data.js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchLiveBlog(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/blogs/${slug}`, {
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
  return getBlogBySlug(slug);
}

export async function generateStaticParams() {
  const blogs = getBlogs();
  const params = [];
  blogs.forEach((b) => {
    if (b.slug) params.push({ slug: b.slug });
    if (b.id && b.id !== b.slug) params.push({ slug: b.id });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchLiveBlog(slug);
  if (!blog) {
    return { title: 'Article Not Found | Kunal Gavit' };
  }
  return {
    title: `${blog.title} | Kunal Gavit Blog`,
    description: blog.description || blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.description || blog.summary,
      images: [blog.image?.secureUrl || blog.image || blog.coverImage || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop']
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await fetchLiveBlog(slug);

  if (!blog) {
    notFound();
  }

  const { prev, next } = getAdjacentBlogs(slug);
  const relatedPosts = getRelatedBlogs(blog, 2);

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: blog.title, href: `/blog/${blog.slug || blog.id}` }
          ]}
        />

        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-purple-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL ARTICLES</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
              {blog.category || 'Engineering'}
            </span>
            {blog.featured && (
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Post
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-zinc-100 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Author and Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-2 border-y border-zinc-800/80 py-4">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <User className="w-3.5 h-3.5 text-purple-400" />
              {blog.author || 'Kunal Gavit'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {blog.readingTime || blog.readTime || '5 min read'}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {(blog.image || blog.coverImage) && (
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl mb-12 relative">
            <img
              src={blog.image || blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Summary Quote */}
        {blog.description && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border-l-4 border-purple-500 text-base sm:text-lg italic text-zinc-300 mb-12">
            "{blog.description}"
          </div>
        )}

        {/* Main Article Content */}
        <article className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
          {blog.content ? (
            <div className="whitespace-pre-line space-y-4 font-sans">
              {blog.content}
            </div>
          ) : (
            <p>{blog.summary}</p>
          )}
        </article>

        {/* Tags Footer */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-8 mt-12 border-t border-zinc-800/80 space-y-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
              Article Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  href="/blog"
                  className="px-3 py-1 rounded-xl text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-purple-300 hover:border-purple-500/40 transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 mt-12 border-t border-zinc-800 space-y-6">
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Related Articles & Deep Dives</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel, idx) => (
                <Link
                  key={rel.id || idx}
                  href={`/blog/${rel.slug || rel.id}`}
                  className="group p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/40 transition space-y-2"
                >
                  <span className="text-[10px] font-mono text-purple-400 uppercase">
                    {rel.category || 'Article'}
                  </span>
                  <h3 className="font-bold text-base text-zinc-200 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {rel.description || rel.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Previous / Next Blog Navigation */}
        <PaginationNav
          prevItem={prev}
          nextItem={next}
          basePath="/blog"
          typeLabel="Post"
        />
      </div>
    </div>
  );
}
