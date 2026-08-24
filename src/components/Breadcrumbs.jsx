'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-zinc-400 mb-8 overflow-x-auto py-1">
      <Link
        href="/"
        className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors shrink-0 font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-zinc-200 font-semibold truncate max-w-[200px] sm:max-w-[320px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-cyan-400 transition-colors truncate max-w-[150px] sm:max-w-[220px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
