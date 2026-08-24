'use client';

import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { CustomCursor } from '../components/CustomCursor';
import { CommandPalette } from '../components/CommandPalette';
import { EasterEggModal } from '../components/EasterEggModal';
import { ResumeModal } from '../components/ResumeModal';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

import { PortfolioProvider } from '../context/PortfolioContext';

export function Providers({ children }) {
  const { theme, toggleTheme } = useTheme();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-colors duration-300 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      {/* Custom Floating Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Global Interactive Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        isDark={theme === 'dark'}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenEasterEgg={() => setIsEasterEggOpen(true)}
      />

      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Persistent Global Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Page Content with Smooth Transition */}
      <div className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent Global Footer */}
      <Footer
        onOpenEasterEgg={() => setIsEasterEggOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />
    </div>
    </PortfolioProvider>
  );
}
