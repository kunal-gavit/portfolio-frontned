'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MessageSquareCode
} from 'lucide-react';
import { sendContactMessage } from '../lib/contactApi';
import { analytics } from '../lib/analytics';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact = () => {
  const { profile: liveProfile, socialLinks: liveSocials } = usePortfolio();
  const profile = liveProfile || {};
  const socials = liveSocials || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const emailAddress = profile.email || 'kunalgavit285@gmail.com';


  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      setSubmitStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setSubmitStatus('error');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      const res = await sendContactMessage(formData);
      if (res.success) {
        setSubmitStatus('success');
        analytics.trackContactSubmit('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(res.message || 'Could not send message. Please try again.');
        setSubmitStatus('error');
        analytics.trackContactSubmit('error');
      }
    } catch (err) {
      const msg = err?.message || 'An unexpected error occurred.';
      setErrorMessage(msg);
      setSubmitStatus('error');
      analytics.trackContactSubmit('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Let's build something remarkable together.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Have an internship opportunity, project idea, or hackathon collaboration? My inbox is always open.
          </p>
        </div>

        {/* 2-Column Grid: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Availability */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Direct Email Communication
              </span>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-mono text-zinc-200 font-semibold truncate">
                    {emailAddress}
                  </span>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-cyan-500 hover:text-zinc-950 text-zinc-300 text-xs transition flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-mono font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>Pune, Maharashtra, India (IST / UTC+5:30)</span>
              </div>
            </motion.div>

            {/* Availability Radar Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-7 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>Active Availability Status</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Currently open for <strong>Software Development Internships (Summer & Fall 2026/2027)</strong>, freelance engineering contracts, and hackathon team invitations.
              </p>

              <div className="space-y-1.5 pt-2 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Response Time: Within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Available for Remote / Hybrid Pune Roles</span>
                </div>
              </div>
            </motion.div>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={socials.github || 'https://github.com/kunalgavit'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 text-center space-y-1 group transition"
              >
                <Github className="w-5 h-5 mx-auto text-zinc-400 group-hover:text-cyan-400 transition" />
                <span className="text-[11px] font-mono text-zinc-300 block">
                  GitHub
                </span>
              </a>

              <a
                href={socials.linkedin || 'https://linkedin.com/in/kunalgavit'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 text-center space-y-1 group transition"
              >
                <Linkedin className="w-5 h-5 mx-auto text-zinc-400 group-hover:text-cyan-400 transition" />
                <span className="text-[11px] font-mono text-zinc-300 block">
                  LinkedIn
                </span>
              </a>

              <a
                href={socials.instagram || 'https://instagram.com/kunalgavit'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 text-center space-y-1 group transition"
              >
                <Instagram className="w-5 h-5 mx-auto text-zinc-400 group-hover:text-cyan-400 transition" />
                <span className="text-[11px] font-mono text-zinc-300 block">
                  Instagram
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl"
          >
            {submitStatus === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-zinc-100">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Thank you for reaching out, Kunal will review your message and reply back shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold font-mono transition cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-zinc-300">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Sharma"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-cyan-500/70"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-zinc-300">
                      Your Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-cyan-500/70"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-zinc-300">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Internship Inquiry / IoT Project Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-cyan-500/70"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-zinc-300">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or what you'd like to collaborate on..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-cyan-500/70 resize-y"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-zinc-950 font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
