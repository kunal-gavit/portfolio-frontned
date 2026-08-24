'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High performance MotionValues & Springs
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Background spotlight spring (slow, ambient, smooth drift)
  const spotlightX = useSpring(mouseX, { damping: 40, stiffness: 180, mass: 0.8 });
  const spotlightY = useSpring(mouseY, { damping: 40, stiffness: 180, mass: 0.8 });

  // Trailing halo spring (medium trail)
  const haloX = useSpring(mouseX, { damping: 26, stiffness: 320, mass: 0.3 });
  const haloY = useSpring(mouseY, { damping: 26, stiffness: 320, mass: 0.3 });

  // Core cursor ring spring (tight, responsive)
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 500, mass: 0.1 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 500, mass: 0.1 });

  // Core dot spring (instant)
  const dotX = useSpring(mouseX, { damping: 28, stiffness: 750, mass: 0.05 });
  const dotY = useSpring(mouseY, { damping: 28, stiffness: 750, mass: 0.05 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div id="custom-cursor-container" className="pointer-events-none fixed inset-0 z-50 overflow-hidden print:hidden">
      {/* 1. Large Ambient Background Cursor Spotlight Glow */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full blur-3xl opacity-60 mix-blend-screen"
        style={{
          x: spotlightX,
          y: spotlightY,
          width: isHovered ? 520 : 420,
          height: isHovered ? 520 : 420,
          background: isHovered
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.06) 40%, transparent 70%)',
          transition: 'width 0.3s ease-out, height 0.3s ease-out',
        }}
      />

      {/* 2. Secondary Animated Trailing Halo Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full border border-cyan-400/25 bg-gradient-to-tr from-cyan-500/5 via-teal-400/5 to-blue-500/5 backdrop-blur-[0.5px]"
        style={{
          x: haloX,
          y: haloY,
          width: isHovered ? 64 : (isClicking ? 32 : 44),
          height: isHovered ? 64 : (isClicking ? 32 : 44),
          scale: isClicking ? 0.85 : 1,
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.25)',
          boxShadow: isHovered ? '0 0 25px rgba(6, 182, 212, 0.35)' : 'none',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, box-shadow 0.2s',
        }}
      />

      {/* 3. Primary Precision Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full border border-cyan-400 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? 40 : 22,
          height: isHovered ? 40 : 22,
          scale: isClicking ? 1.3 : 1,
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
          borderColor: isHovered ? 'rgba(34, 211, 238, 0.9)' : 'rgba(6, 182, 212, 0.7)',
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)',
          transition: 'width 0.15s cubic-bezier(0.16, 1, 0.3, 1), height 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s',
        }}
      />

      {/* 4. High-Energy Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,1)]"
        style={{
          x: dotX,
          y: dotY,
          scale: isHovered ? 0 : (isClicking ? 1.8 : 1),
          transition: 'scale 0.15s ease-out',
        }}
      />
    </div>
  );
};
