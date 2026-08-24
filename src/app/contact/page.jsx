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
  MessageSquareCode,
  Globe
} from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { sendContactMessage } from '../../lib/contactApi';
import { analytics } from '../../lib/analytics';
import { getProfile, getSocialLinks, getSocialLinksList } from '../../lib/data.js';

export default function ContactPage() {
  const profile = getProfile();
  const socials = getSocialLinks();
  const socialList = getSocialLinksList();

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
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await sendContactMessage(formData);
      if (response && response.success) {
        setSubmitStatus('success');
        analytics.trackContactSubmit('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(response?.message || 'Failed to send message. Please try again.');
        setSubmitStatus('error');
        analytics.trackContactSubmit('error');
      }
    } catch (err) {
      setErrorMessage('A network error occurred. Please reach out directly via email.');
      setSubmitStatus('error');
      analytics.trackContactSubmit('network_error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Get in Touch with Kunal
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Have a project, startup role, or hackathon collaboration in mind? Send a message directly or connect across developer platforms.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 space-y-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {profile.availabilityStatus || 'Available for opportunities'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-100">
                Let's discuss technology, architecture, and products.
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                I typically respond to inquiries within 24 hours. Feel free to copy my direct email address or submit the contact form.
              </p>

              {/* Copy Email Box */}
              <div className="pt-2">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-mono truncate">{emailAddress}</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer shrink-0 ml-2"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Location & Quick Details */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="font-semibold text-zinc-200 text-sm">
                    {profile.location || 'Pune, Maharashtra, India'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Timezone
                  </span>
                  <span className="font-semibold text-zinc-200 text-sm">
                    IST (UTC +5:30)
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Social Channels */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                Direct Channels & Socials
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-cyan-400 text-xs font-medium transition"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-cyan-400 text-xs font-medium transition"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-cyan-400 text-xs font-medium transition"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-2xl space-y-6 backdrop-blur-xl">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-zinc-100">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill in your details and message below to initiate contact.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Thank you! Your message has been received. I will reply shortly.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Sharma"
                      required
                      className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      required
                      className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack / AI Collaboration Inquiry"
                    className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your project, timeline, or idea in detail..."
                    required
                    className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
