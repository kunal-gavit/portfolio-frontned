'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const PaginationNav = ({
  prevItem,
  nextItem,
  basePath,
  typeLabel = 'Item'
}) => {
  if (!prevItem && !nextItem) return null;

  return (
    <div className="pt-12 mt-16 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prevItem ? (
        <Link
          href={`${basePath}/${prevItem.slug || prevItem.id}`}
          className="group flex flex-col p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 transition-all text-left space-y-1.5 shadow-lg"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>PREVIOUS {typeLabel.toUpperCase()}</span>
          </div>
          <span className="font-bold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
            {prevItem.title || prevItem.name}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextItem && (
        <Link
          href={`${basePath}/${nextItem.slug || nextItem.id}`}
          className="group flex flex-col p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 transition-all text-right space-y-1.5 shadow-lg sm:col-start-2"
        >
          <div className="flex items-center justify-end gap-2 text-xs font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
            <span>NEXT {typeLabel.toUpperCase()}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="font-bold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
            {nextItem.title || nextItem.name}
          </span>
        </Link>
      )}
    </div>
  );
};
