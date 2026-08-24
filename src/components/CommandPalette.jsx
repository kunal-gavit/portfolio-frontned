'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Home,
  User,
  Cpu,
  FolderCode,
  Briefcase,
  Trophy,
  Award,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  FileText,
  Sun,
  Moon,
  Terminal,
  BookOpen,
  Layers,
  Sparkles,
  Printer,
  Compass
} from 'lucide-react';
import { analytics } from '../lib/analytics';
import { getProfile, getSocialLinks, searchPortfolio } from '../lib/data.js';

export const CommandPalette = ({
  isOpen,
  onClose,
  onToggleTheme,
  isDark,
  onOpenEasterEgg,
  onOpenResumeModal
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const profile = getProfile();
  const socials = getSocialLinks();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const baseCommands = [
    {
      id: 'home',
      name: 'Home',
      category: 'Navigation',
      icon: Home,
      action: () => router.push('/')
    },
    {
      id: 'about',
      name: 'About Me & Engineering Journey',
      category: 'Navigation',
      icon: User,
      action: () => router.push('/about')
    },
    {
      id: 'skills',
      name: 'Skills & Tech Stack Discovery',
      category: 'Navigation',
      icon: Cpu,
      action: () => router.push('/skills')
    },
    {
      id: 'projects',
      name: 'Projects & Case Studies',
      category: 'Navigation',
      icon: FolderCode,
      action: () => router.push('/projects')
    },
    {
      id: 'experience',
      name: 'Experience & Career Timeline',
      category: 'Navigation',
      icon: Briefcase,
      action: () => router.push('/experience')
    },
    {
      id: 'hackathons',
      name: 'Hackathons & Sprint Pitches',
      category: 'Navigation',
      icon: Trophy,
      action: () => router.push('/hackathons')
    },
    {
      id: 'certifications',
      name: 'Certifications & Credentials',
      category: 'Navigation',
      icon: Award,
      action: () => router.push('/certifications')
    },
    {
      id: 'achievements',
      name: 'Achievements & Milestones',
      category: 'Navigation',
      icon: Award,
      action: () => router.push('/achievements')
    },
    {
      id: 'education',
      name: 'Education & Academics',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => router.push('/education')
    },
    {
      id: 'services',
      name: 'Services & What I Build',
      category: 'Navigation',
      icon: Layers,
      action: () => router.push('/services')
    },
    {
      id: 'blog',
      name: 'Technical Articles & Blog',
      category: 'Navigation',
      icon: BookOpen,
      action: () => router.push('/blog')
    },
    {
      id: 'contact',
      name: 'Contact & Hire Kunal',
      category: 'Navigation',
      icon: Mail,
      action: () => router.push('/contact')
    },
    {
      id: 'resume-page',
      name: 'Open Resume Viewer',
      category: 'Resume',
      icon: FileText,
      action: () => router.push('/resume')
    },
    {
      id: 'resume-download',
      name: `Download Resume PDF (${profile.resumeFilename || 'Kunal_Gavit_Resume.pdf'})`,
      category: 'Resume',
      icon: FileText,
      action: () => {
        analytics.trackResumeDownload('command_palette');
        const link = document.createElement('a');
        link.href = profile.resume || '/resume/Kunal_Gavit_Resume.pdf';
        link.download = profile.resumeFilename || 'Kunal_Gavit_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    {
      id: 'print-resume',
      name: 'Print Resume (A4 Print Layout)',
      category: 'Resume',
      icon: Printer,
      action: () => {
        window.print();
      }
    },
    {
      id: 'theme',
      name: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
      category: 'Preferences',
      icon: isDark ? Sun : Moon,
      action: () => onToggleTheme && onToggleTheme()
    },
    {
      id: 'github-ext',
      name: `Open GitHub Profile (${socials.github ? socials.github.replace('https://github.com/', '@') : '@kunalgavit'})`,
      category: 'Socials',
      icon: Github,
      action: () => window.open(socials.github || 'https://github.com/kunalgavit', '_blank')
    },
    {
      id: 'linkedin-ext',
      name: 'Open LinkedIn Profile',
      category: 'Socials',
      icon: Linkedin,
      action: () => window.open(socials.linkedin || 'https://linkedin.com/in/kunalgavit', '_blank')
    },
    {
      id: 'easter-egg',
      name: 'Developer Terminal (sudo kunal)',
      category: 'System',
      icon: Terminal,
      action: () => onOpenEasterEgg && onOpenEasterEgg()
    }
  ];

  // Dynamic portfolio search results
  const searchResults = query.trim() ? searchPortfolio(query) : [];
  const dynamicCommands = searchResults.map((res) => {
    let icon = Search;
    if (res.type === 'Project') icon = FolderCode;
    else if (res.type === 'Skill') icon = Cpu;
    else if (res.type === 'Hackathon') icon = Trophy;
    else if (res.type === 'Certification') icon = Award;
    else if (res.type === 'Experience') icon = Briefcase;
    else if (res.type === 'Blog') icon = BookOpen;
    else if (res.type === 'Education') icon = GraduationCap;

    return {
      id: `search-${res.type}-${res.id}`,
      name: `${res.title} (${res.subtitle || res.type})`,
      category: res.type,
      icon,
      action: () => {
        if (res.link.startsWith('/')) {
          router.push(res.link);
        } else {
          router.push(`/${res.link.replace('#', '')}`);
        }
      }
    };
  });

  const matchingBase = baseCommands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const allFiltered = [...dynamicCommands, ...matchingBase];

  const executeCommand = (cmd) => {
    analytics.trackCommandPalette(cmd.name);
    cmd.action();
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (allFiltered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allFiltered.length) % (allFiltered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allFiltered[selectedIndex]) {
        executeCommand(allFiltered[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="command-palette-container"
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm print:hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden text-zinc-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-zinc-950/60">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search projects, hackathons, skills, articles, or commands..."
              autoFocus
              className="w-full bg-transparent border-none outline-none text-sm text-zinc-100 placeholder:text-zinc-500 font-sans"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
              ESC
            </kbd>
          </div>

          {/* List of Results */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {allFiltered.length === 0 ? (
              <div className="py-8 text-center text-sm text-zinc-500">
                No matching results found for "<span className="text-zinc-300">{query}</span>"
              </div>
            ) : (
              allFiltered.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-zinc-300 hover:bg-zinc-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{cmd.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                      {cmd.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-950/80 border-t border-zinc-800 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-[10px] font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-[10px] font-mono">↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1 ml-2">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-[10px] font-mono">↵</kbd> to select
              </span>
            </div>
            <span className="font-mono text-cyan-400/80">{profile.name} Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
