'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Terminal,
  FileText
} from 'lucide-react';
import { getNavigation, getMoreNavigation } from '../lib/data.js';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail
};

export const Footer = ({ onOpenEasterEgg, onOpenResumeModal }) => {
  const { profile, siteConfig, socialLinksList: socialLinks } = usePortfolio();
  const navigation = getNavigation();
  const moreNavigation = getMoreNavigation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/60">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                  {profile.name ? profile.name.charAt(0) : 'K'}
                </div>
              </div>
              <span className="font-heading font-extrabold text-base text-zinc-100 group-hover:text-cyan-300 transition-colors">
                {profile.name}
              </span>
            </Link>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {profile.tagline || profile.description}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenEasterEgg}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-400 hover:border-cyan-500/50 transition cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>sudo kunal</span>
              </button>

              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-cyan-400 transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </Link>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2.5">
              <span className="font-mono font-semibold uppercase tracking-wider text-zinc-500 text-[10px]">
                Main Pages
              </span>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-zinc-400 hover:text-cyan-400 transition">
                    Home
                  </Link>
                </li>
                {navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-cyan-400 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="font-mono font-semibold uppercase tracking-wider text-zinc-500 text-[10px]">
                Explore
              </span>
              <ul className="space-y-2">
                {moreNavigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-cyan-400 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Connect Col */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono font-semibold uppercase tracking-wider text-zinc-500 text-[10px] block">
              Direct Channels
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((item) => {
                const IconComponent = iconMap[item.icon] || Github;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                    title={item.name}
                    aria-label={item.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <p className="text-[11px] text-zinc-400 font-mono">
              Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-200">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-200">K</kbd> to search portfolio.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-zinc-400">
              {profile.location || 'MITAOE • Pune, India'}
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/40 transition flex items-center gap-1 font-mono text-[11px] cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
