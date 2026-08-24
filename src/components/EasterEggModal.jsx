'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Sparkles, Trophy, Cpu, Code2, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getProfile } from '../lib/data.js';

export const EasterEggModal = ({ isOpen, onClose }) => {
  const profile = getProfile();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b']
      });
    }
  }, [isOpen]);

  const copySecret = () => {
    navigator.clipboard.writeText(profile.email || 'kunalgavit285@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-2xl bg-zinc-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden text-zinc-100"
        >
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 ml-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                root@kunal-gavit-engine:~# sudo kunal
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-6 space-y-5 font-mono text-sm">
            <div className="space-y-1">
              <p className="text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" /> Access Granted: Root Engineer Level 100
              </p>
              <p className="text-zinc-400 text-xs">
                [SYSTEM] Initializing secret developer telemetry for Kunal Gavit...
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 text-xs">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block">Favorite Chipset</span>
                  <span className="text-zinc-200 font-semibold">ESP32-S3 Dual-Core Xtensa</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block">Stack & Tech</span>
                  <span className="text-zinc-200 font-semibold">JavaScript, React, Node.js, C++</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block">Hackathon Sprint</span>
                  <span className="text-zinc-200 font-semibold">MIT India Hackathon 2026</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-zinc-500 block">Engineering Mantra</span>
                  <span className="text-zinc-200 font-semibold">"If it can be built, build it right."</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl space-y-2">
              <p className="text-cyan-300 font-sans text-xs sm:text-sm">
                Hey there, fellow developer! Since you discovered this easter egg, you clearly have an eye for detail. Let's talk about cool projects or internship opportunities directly.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-zinc-300 text-xs font-mono">{profile.email || 'kunalgavit285@gmail.com'}</span>
                <button
                  onClick={copySecret}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-lg text-xs font-sans font-semibold transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Direct Email'}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-sans font-medium transition cursor-pointer"
              >
                Close Terminal
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
