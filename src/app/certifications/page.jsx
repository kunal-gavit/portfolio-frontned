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
  FileCheck,
  Sparkles
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getCertifications, getCertificationCategories } from '../../lib/data.js';

export default function CertificationsPage() {
  const certifications = getCertifications();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  const filters = getCertificationCategories();

  const filteredCerts = certifications.filter((cert) => {
    const matchesFilter = activeFilter === 'All' || cert.category === activeFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      cert.title?.toLowerCase().includes(query) ||
      (cert.issuer || cert.organization)?.toLowerCase().includes(query) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(query)));
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Certifications & Credentials', href: '/certifications' }]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ACCREDITATIONS ({certifications.length} CREDENTIALS)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Verified Certifications & Credentials
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Industry-recognized accreditations in Generative AI, Cloud infrastructure, Full-Stack engineering, and Embedded Systems.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 mb-12 space-y-6 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="w-full md:max-w-md relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search credentials by title, issuer, or skills..."
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-2xl py-2.5 pl-11 pr-4 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        {filteredCerts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-3">
            <Award className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No certifications found</h3>
            <p className="text-xs text-zinc-500">Try adjusting your search criteria or resetting filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-3xl bg-zinc-900/70 border border-zinc-800/80 hover:border-cyan-500/40 p-6 flex flex-col justify-between space-y-5 shadow-xl transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {cert.category || 'Certification'}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.date || cert.issueDate}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-zinc-100 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-semibold text-zinc-400">
                    Issuer: <span className="text-zinc-200">{cert.issuer || cert.organization}</span>
                  </p>

                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-zinc-500 truncate">
                      ID: {cert.credentialId}
                    </p>
                  )}

                  {/* Skills badges */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Certificate</span>
                  </button>

                  {(cert.verifyUrl || cert.url) && (
                    <a
                      href={cert.verifyUrl || cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificate Preview Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-zinc-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      {selectedCert.category}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-100">
                      {selectedCert.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Certificate Image or Mockup */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center relative">
                  {selectedCert.image ? (
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-8 space-y-2">
                      <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto" />
                      <p className="font-bold text-zinc-200">{selectedCert.title}</p>
                      <p className="text-xs text-zinc-500 font-mono">Issued by {selectedCert.issuer || selectedCert.organization}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-zinc-400 font-mono">
                    Date: <span className="text-zinc-200">{selectedCert.date || selectedCert.issueDate}</span>
                  </div>

                  {(selectedCert.verifyUrl || selectedCert.url) && (
                    <a
                      href={selectedCert.verifyUrl || selectedCert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Official Verification Link</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
