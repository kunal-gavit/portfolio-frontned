/**
 * Privacy-friendly Analytics and Event Tracking System
 */

export function trackEvent(eventName, metadata) {
  const timestamp = new Date().toISOString();
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app_analytics_event', {
        detail: { eventName, metadata, timestamp }
      })
    );

    const gtag = window.gtag;
    if (typeof gtag === 'function') {
      gtag('event', eventName, metadata);
    }
  }

  console.log(`[Analytics Event: ${eventName}]`, metadata || {});
}

export const analytics = {
  trackResumeDownload: (source = 'hero') => {
    trackEvent('resume_download', { source, format: 'PDF', file: 'Kunal_Gavit_Resume.pdf' });
  },
  trackResumeView: (source = 'navbar') => {
    trackEvent('resume_view', { source });
  },
  trackProjectView: (projectId, projectTitle) => {
    trackEvent('project_case_study_open', { projectId, projectTitle });
  },
  trackContactSubmit: (status) => {
    trackEvent('contact_form_submission', { status });
  },
  trackThemeToggle: (newTheme) => {
    trackEvent('theme_toggle', { newTheme });
  },
  trackCommandPalette: (command) => {
    trackEvent('command_palette_executed', { command });
  }
};
