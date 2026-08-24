'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FolderCode, Trophy, Cpu, Award, GitPullRequest, Activity } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  FolderCode,
  Trophy,
  Cpu,
  Award,
  GitPullRequest,
  Activity
};

const Counter = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || start === end) {
      setCount(value);
      return;
    }

    const duration = 1500;
    const incrementTime = 30;
    const steps = duration / incrementTime;
    const stepIncrement = Math.ceil((end - start) / steps);

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-extrabold tracking-tight font-mono text-zinc-100">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const { projects, hackathons, certifications, skills } = usePortfolio();

  let totalSkillsCount = 0;
  (skills || []).forEach((cat) => {
    totalSkillsCount += (cat.skills || cat.items || []).length;
  });

  const quickStatsData = [
    { id: 'projects', label: 'Projects Built', value: (projects || []).filter((p) => p.status !== 'Draft').length, suffix: '+', icon: 'FolderCode', description: 'Web apps, IoT devices & AI platforms' },
    { id: 'hackathons', label: 'Hackathon Sprints', value: (hackathons || []).filter((h) => h.status !== 'Draft').length, suffix: '', icon: 'Trophy', description: 'National finalist & prize builds' },
    { id: 'skills', label: 'Technical Skills', value: totalSkillsCount || 45, suffix: '+', icon: 'Cpu', description: 'Tools, frameworks & architectures' },
    { id: 'certifications', label: 'Certifications', value: (certifications || []).length, suffix: '', icon: 'Award', description: 'Industry-verified technical credentials' },
    { id: 'github', label: 'Open Source Repos', value: 30, suffix: '+', icon: 'GitPullRequest', description: 'Public repositories & code templates' }
  ];

  if (!quickStatsData || quickStatsData.length === 0) return null;

  return (
    <section id="stats" className="py-12 border-y border-zinc-800/80 bg-zinc-950/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {quickStatsData.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Activity;
            return (
              <motion.div
                key={stat.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/70 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {`0${index + 1}`}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>

                <div className="text-xs font-semibold text-zinc-300">
                  {stat.label}
                </div>

                {stat.description && (
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                    {stat.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
