'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Home, FolderCode, ArrowLeft, Terminal, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full text-center space-y-8 bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl"
      >
        {/* Error Code */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>ERROR 404 • ROUTE UNRESOLVED</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-black font-heading tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Page not found
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist, was moved, or had its URL altered. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>

          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-sm transition cursor-pointer"
          >
            <FolderCode className="w-4 h-4" />
            <span>View Projects</span>
          </Link>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
          <Link href="/about" className="hover:text-cyan-400 transition">About</Link>
          <span>•</span>
          <Link href="/skills" className="hover:text-cyan-400 transition">Skills</Link>
          <span>•</span>
          <Link href="/hackathons" className="hover:text-cyan-400 transition">Hackathons</Link>
          <span>•</span>
          <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
        </div>
      </motion.div>
    </div>
  );
}
