'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  FileText,
  Sun,
  Moon,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  GraduationCap,
  Layers,
  BookOpen,
  FolderCode
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = ({
  theme,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenResumeModal
}) => {
  const pathname = usePathname() || '/';
  const { profile, siteConfig } = usePortfolio();
  const navLinks = siteConfig?.navigation || [];
  const moreLinks = siteConfig?.moreNavigation || [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  const isLinkActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isMoreActive = moreLinks.some((link) => isLinkActive(link.href));
  const isDark = theme === 'dark';

  const getMoreIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'achievements':
        return Award;
      case 'education':
        return GraduationCap;
      case 'services':
        return Layers;
      case 'blog':
        return BookOpen;
      case 'resume':
        return FileText;
      default:
        return Sparkles;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/60 py-3 shadow-lg shadow-black/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group text-left flex items-center gap-2.5 focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-zinc-950 font-bold text-base shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:scale-105 transition">
              {profile.name ? profile.name.charAt(0) : 'K'}
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-zinc-100 tracking-tight block group-hover:text-cyan-300 transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase block -mt-1">
                {profile.role ? profile.role.split('•')[0].trim() : 'Engineer & Builder'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
            <Link
              href="/"
              className={`px-3 py-1 text-xs font-medium rounded-full transition relative cursor-pointer ${
                pathname === '/'
                  ? 'text-cyan-400 bg-cyan-500/10 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              Home
              {pathname === '/' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 rounded-full border border-cyan-500/30"
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                />
              )}
            </Link>

            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition relative cursor-pointer ${
                    active
                      ? 'text-cyan-400 bg-cyan-500/10 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full border border-cyan-500/30"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full transition cursor-pointer ${
                  isMoreActive
                    ? 'text-cyan-400 bg-cyan-500/10 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl py-2 z-50 backdrop-blur-xl"
                  >
                    {moreLinks.map((subLink) => {
                      const SubIcon = getMoreIcon(subLink.label);
                      const subActive = isLinkActive(subLink.href);
                      return (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`flex items-center gap-2.5 px-4 py-2 text-xs transition ${
                            subActive
                              ? 'text-cyan-400 bg-cyan-500/10 font-semibold'
                              : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{subLink.label}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Icons & Resume */}
          <div className="flex items-center gap-2">
            {/* Global Search / Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 text-xs transition cursor-pointer"
              title="Search Portfolio & Commands (Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="hidden sm:inline-block font-mono text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Resume Button */}
            <Link
              href="/resume"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-semibold text-xs transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 p-6 lg:hidden shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium transition cursor-pointer ${
                  pathname === '/'
                    ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </Link>

              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium transition cursor-pointer ${
                      active
                        ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30'
                        : 'text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  </Link>
                );
              })}

              <div className="pt-2 pb-1 text-[11px] font-mono text-zinc-500 uppercase px-4">
                More Pages
              </div>

              {moreLinks.map((subLink) => {
                const subActive = isLinkActive(subLink.href);
                return (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium transition cursor-pointer ${
                      subActive
                        ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30'
                        : 'text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <span>{subLink.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
                <Link
                  href="/resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-sm shadow-md transition cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Interactive Resume Center</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
