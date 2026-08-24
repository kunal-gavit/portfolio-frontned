'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  X,
  FileCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Certifications = () => {
  const { certifications } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  if (!certifications || certifications.length === 0) return null;

  const categoriesSet = new Set();
  (certifications || []).forEach((c) => {
    if (c.category) categoriesSet.add(c.category);
  });
  const filters = ['All', ...Array.from(categoriesSet)];

  const filteredCerts = certifications.filter((cert) => {
    const matchesFilter = activeFilter === 'All' || cert.category === activeFilter;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      cert.title?.toLowerCase().includes(query) ||
      (cert.issuer || cert.organization)?.toLowerCase().includes(query) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(query)));
    return matchesFilter && matchesQuery;
  });

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CREDENTIALS & SPECIALIZATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Verified technical certifications.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Industry-recognized accreditations in Generative AI, Cloud computing, Full-Stack development, and Embedded Systems.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {filters.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certifications, skills..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Certifications Grid */}
        {filteredCerts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800">
            <p className="text-sm text-zinc-400">No certifications match your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 overflow-hidden shadow-xl hover:shadow-cyan-500/10 transition-all flex flex-col justify-between group"
              >
                {/* Cert Image Cover */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={cert.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {cert.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-zinc-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                        {cert.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span>{cert.issuer || cert.organization}</span>
                      <span className="text-zinc-500">{cert.issueDate || cert.year}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-zinc-100 group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>

                    {cert.description && (
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Verification action */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>View Credential</span>
                    </button>

                    {(cert.verificationUrl || cert.credentialUrl) && (
                      <a
                        href={cert.verificationUrl || cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200"
                      >
                        <span>Verify ID</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="max-w-lg w-full bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl p-6 space-y-5 text-zinc-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Credential Details</span>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400">
                    {selectedCert.issuer || selectedCert.organization}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl">
                    {selectedCert.title}
                  </h3>
                  {selectedCert.credentialId && (
                    <p className="text-xs font-mono text-zinc-400">
                      ID: <span className="text-zinc-200">{selectedCert.credentialId}</span>
                    </p>
                  )}
                  {selectedCert.issueDate && (
                    <p className="text-xs font-mono text-zinc-400">
                      Issued: <span className="text-zinc-200">{selectedCert.issueDate}</span>
                    </p>
                  )}
                </div>

                {selectedCert.description && (
                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                    {selectedCert.description}
                  </p>
                )}

                {selectedCert.skills && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-zinc-400">Skills Validated:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCert.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                  {(selectedCert.verificationUrl || selectedCert.credentialUrl) && (
                    <a
                      href={selectedCert.verificationUrl || selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition"
                    >
                      <span>Open Issuer Verification</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
