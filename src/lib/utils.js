/**
 * Utility functions for class names, styling, and general helpers
 */

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateString) {
  return dateString;
}

export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function smoothScrollTo(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    const yOffset = -80; // Account for fixed navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
