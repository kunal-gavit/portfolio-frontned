'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Download,
  Sparkles,
  Cpu,
  Copy,
  Check,
  Code2,
  Terminal,
  Layers,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Twitter,
  FileText,
  UserCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { smoothScrollTo } from '../lib/utils';
import { analytics } from '../lib/analytics';

const socialIconMap = {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Twitter
};

const floatingTech = [
  { name: 'JavaScript', color: 'text-amber-400 border-amber-400/30 bg-amber-500/10' },
  { name: 'React / Next.js', color: 'text-cyan-400 border-cyan-400/30 bg-cyan-500/10' },
  { name: 'Node.js', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-500/10' },
  { name: 'ESP32 / IoT', color: 'text-blue-400 border-blue-400/30 bg-blue-500/10' },
  { name: 'Generative AI', color: 'text-purple-400 border-purple-400/30 bg-purple-500/10' }
];

export const Hero = ({ onOpenResumeModal, onOpenEasterEgg }) => {
  const { profile, socialLinksList: socialLinks, siteConfig } = usePortfolio();

  const [copiedCode, setCopiedCode] = useState(false);
  const [imgSrc, setImgSrc] = useState(profile.profileImage || profile.image);

  useEffect(() => {
    if (profile.profileImage || profile.image) {
      setImgSrc(profile.profileImage || profile.image);
    }
  }, [profile.profileImage, profile.image]);

  const codeSnippet = `const developer = {
  name: "${profile.name}",
  role: "${profile.role || profile.title}",
  focus: ["Generative AI", "Full Stack Web", "IoT Hardware", "Hackathons"],
  stack: ["JavaScript", "React", "Next.js", "Node.js", "C++", "ESP32"],
  education: "B.Tech @ MITAOE Pune",
  status: "🟢 ${profile.availabilityStatus || 'Available for opportunities'}",
  featuredSprint: "MIT India Hackathon 2026 Finalist"
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadResume = () => {
    analytics.trackResumeDownload('hero_button');
    const resumeUrl = profile.resume || profile.resumeDownloadUrl || '/resume/Kunal_Gavit_Resume.pdf';
    const resumeFilename = profile.resumeFilename || 'Kunal_Gavit_Resume.pdf';

    if (resumeUrl.startsWith('http')) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    } else {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = resumeFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Floating subtle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/40"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + (i * 17) % 80}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-zinc-300">
                {profile.availabilityStatus || 'Available for opportunities'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.15]"
            >
              Building ideas into <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                real-world digital experiences.
              </span>
            </motion.h1>

            {/* Subtitle / Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
            >
              Hi, I'm <strong className="text-zinc-100 font-semibold">{profile.name}</strong>. {profile.tagline || profile.description}
            </motion.p>

            {/* Floating Tech Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap gap-2 pt-1 justify-center lg:justify-start"
            >
              {floatingTech.map((tech) => (
                <span
                  key={tech.name}
                  className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${tech.color} transition-transform hover:scale-105`}
                >
                  {tech.name}
                </span>
              ))}
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2 justify-center lg:justify-start"
            >
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer group"
              >
                <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </button>

              <Link
                href="/resume"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 text-sm hover:text-white transition cursor-pointer"
                title="Open Interactive Resume Center"
              >
                <FileText className="w-4 h-4 text-zinc-400" />
                <span className="hidden sm:inline">Resume</span>
              </Link>
            </motion.div>

            {/* Dynamic Social Links List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-3 pt-4 justify-center lg:justify-start"
            >
              {socialLinks.map((item) => {
                const IconComponent = socialIconMap[item.icon] || Github;
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110 shadow-sm"
                    title={item.name}
                    aria-label={item.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Dynamic Profile Card & Interactive Code Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="lg:col-span-5 space-y-5 relative"
          >
            {/* Prominent Real Profile Photo Card */}
            <div className="relative rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-cyan-500/30 p-5 sm:p-6 shadow-2xl overflow-hidden hover:border-cyan-400/60 transition-all duration-500 group">
              {/* Outer subtle glow line */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
                {/* Profile Image Frame with Glowing Ring */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <div className="w-full h-full rounded-[14px] overflow-hidden bg-zinc-950 relative">
                    <img
                      src={imgSrc}
                      alt={profile.name}
                      onError={() => setImgSrc('/images/default-avatar.svg')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                  </div>
                  {/* Status ping indicator attached to photo */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-zinc-900"></span>
                  </span>
                </motion.div>

                {/* Profile Info Details */}
                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-mono text-[10px] border border-cyan-500/30">
                    <UserCheck className="w-3 h-3" />
                    <span>Verified Developer</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-zinc-100">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {profile.role || profile.title}
                  </p>
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold pt-0.5 flex items-center justify-center sm:justify-start gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{profile.availabilityStatus || 'Available for opportunities'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Card */}
            <div className="relative rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 ml-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    kunal.config.js
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCode}
                    className="p-1 rounded text-zinc-400 hover:text-cyan-400 transition cursor-pointer"
                    title="Copy code snippet"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={onOpenEasterEgg}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition cursor-pointer"
                    title="Run Easter Egg interactive terminal"
                  >
                    RUN
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 bg-zinc-950/80 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto selection:bg-cyan-500/30">
                <pre className="text-zinc-400">
                  <span className="text-purple-400">const</span> <span className="text-blue-300">developer</span> = &#123;{'\n'}
                  {'  '}<span className="text-zinc-500">name:</span> <span className="text-emerald-300">"{profile.name}"</span>,{'\n'}
                  {'  '}<span className="text-zinc-500">role:</span> <span className="text-emerald-300">"{profile.role || profile.title}"</span>,{'\n'}
                  {'  '}<span className="text-zinc-500">focus:</span> [<span className="text-cyan-300">"Generative AI"</span>, <span className="text-cyan-300">"Full Stack Web"</span>, <span className="text-cyan-300">"IoT Hardware"</span>],{'\n'}
                  {'  '}<span className="text-zinc-500">stack:</span> [<span className="text-amber-300">"JavaScript"</span>, <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"ESP32"</span>],{'\n'}
                  {'  '}<span className="text-zinc-500">education:</span> <span className="text-emerald-300">"B.Tech @ MITAOE Pune"</span>,{'\n'}
                  {'  '}<span className="text-zinc-500">status:</span> <span className="text-emerald-400">"🟢 {profile.availabilityStatus || 'Available'}"</span>{'\n'}
                  &#125;;
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={() => smoothScrollTo('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="p-2 text-zinc-500 hover:text-cyan-400 transition cursor-pointer"
          aria-label="Scroll down to About section"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};
