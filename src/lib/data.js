import { profile } from '../data/profile.js';
import { socialLinks, socialLinksList } from '../data/socialLinks.js';
import { siteConfig } from '../data/siteConfig.js';
import { about } from '../data/about.js';
import { skills } from '../data/skills.js';
import { projects } from '../data/projects.js';
import { experience } from '../data/experience.js';
import { hackathons } from '../data/hackathons.js';
import { achievements } from '../data/achievements.js';
import { certifications } from '../data/certifications.js';
import { education, academicMilestones } from '../data/education.js';
import { services } from '../data/services.js';
import { currentlyBuilding } from '../data/currentlyBuilding.js';
import { blogs } from '../data/blogs.js';
import { testimonials } from '../data/testimonials.js';
import { learning } from '../data/learning.js';
import { getDynamicStats } from '../data/stats.js';


// Profile
export function getProfile() {
  return profile;
}

// Social Links
export function getSocialLinks() {
  return socialLinks;
}

export function getSocialLinksList() {
  return socialLinksList || [];
}

// Site Config & Navigation
export function getSiteConfig() {
  return siteConfig;
}

export function getNavigation() {
  return siteConfig?.navigation || [];
}

export function getMoreNavigation() {
  return siteConfig?.moreNavigation || [];
}

// About
export function getAbout() {
  return about;
}

// Skills
export function getSkills() {
  return skills || [];
}

export function getSkillCategories() {
  return skills || [];
}

// Projects
export function getProjects() {
  return projects || [];
}

export function getFeaturedProjects() {
  return (projects || []).filter((p) => p.featured || p.isFeatured);
}

export function getProjectById(idOrSlug) {
  if (!idOrSlug) return null;
  const list = projects || [];
  const normalized = String(idOrSlug).toLowerCase().trim();
  return (
    list.find((p) => p.slug === idOrSlug || p.id === idOrSlug) ||
    list.find((p) => p.slug?.toLowerCase() === normalized || p.id?.toLowerCase() === normalized) ||
    null
  );
}

export function getAdjacentProjects(currentSlugOrId) {
  const list = projects || [];
  if (!list.length) return { prev: null, next: null };
  const currentIndex = list.findIndex(
    (p) =>
      p.slug === currentSlugOrId ||
      p.id === currentSlugOrId ||
      p.slug?.toLowerCase() === String(currentSlugOrId).toLowerCase() ||
      p.id?.toLowerCase() === String(currentSlugOrId).toLowerCase()
  );
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? list[currentIndex - 1] : list[list.length - 1];
  const next = currentIndex < list.length - 1 ? list[currentIndex + 1] : list[0];
  return { prev, next };
}

export function getProjectCategories() {
  const categories = new Set();
  (projects || []).forEach((p) => {
    if (p.category) categories.add(p.category);
  });
  return ['All', ...Array.from(categories)];
}

// Experience
export function getExperience() {
  return experience || [];
}

// Hackathons
export function getHackathons() {
  return hackathons || [];
}

export function getFeaturedHackathons() {
  return (hackathons || []).filter((h) => h.featured || h.isFeatured);
}

export function getHackathonById(idOrSlug) {
  if (!idOrSlug) return null;
  const list = hackathons || [];
  const normalized = String(idOrSlug).toLowerCase().trim();
  return (
    list.find((h) => h.id === idOrSlug || h.projectSlug === idOrSlug || h.slug === idOrSlug) ||
    list.find(
      (h) =>
        h.id?.toLowerCase() === normalized ||
        h.projectSlug?.toLowerCase() === normalized ||
        h.slug?.toLowerCase() === normalized
    ) ||
    null
  );
}

export function getAdjacentHackathons(currentSlugOrId) {
  const list = hackathons || [];
  if (!list.length) return { prev: null, next: null };
  const currentIndex = list.findIndex(
    (h) =>
      h.id === currentSlugOrId ||
      h.projectSlug === currentSlugOrId ||
      h.slug === currentSlugOrId ||
      h.id?.toLowerCase() === String(currentSlugOrId).toLowerCase() ||
      h.projectSlug?.toLowerCase() === String(currentSlugOrId).toLowerCase()
  );
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? list[currentIndex - 1] : list[list.length - 1];
  const next = currentIndex < list.length - 1 ? list[currentIndex + 1] : list[0];
  return { prev, next };
}

// Achievements
export function getAchievements() {
  return achievements || [];
}

// Certifications
export function getCertifications() {
  return certifications || [];
}

export function getCertificationCategories() {
  const categories = new Set();
  (certifications || []).forEach((c) => {
    if (c.category) categories.add(c.category);
  });
  return ['All', ...Array.from(categories)];
}

// Education & Milestones
export function getEducation() {
  return education || [];
}

export function getAcademicMilestones() {
  return academicMilestones || [];
}

// Services
export function getServices() {
  return services || [];
}

// Currently Building
export function getCurrentlyBuilding() {
  return currentlyBuilding || [];
}

// Blogs
export function getBlogs() {
  return (blogs || []).filter((b) => b.published !== false);
}

export function getFeaturedBlogs() {
  return (blogs || []).filter((b) => b.featured && b.published !== false);
}

export function getBlogBySlug(slug) {
  if (!slug) return null;
  const list = blogs || [];
  const normalized = String(slug).toLowerCase().trim();
  return (
    list.find((b) => b.slug === slug || b.id === slug) ||
    list.find((b) => b.slug?.toLowerCase() === normalized || b.id?.toLowerCase() === normalized) ||
    null
  );
}

export function getAdjacentBlogs(currentSlugOrId) {
  const list = getBlogs();
  if (!list.length) return { prev: null, next: null };
  const currentIndex = list.findIndex(
    (b) =>
      b.slug === currentSlugOrId ||
      b.id === currentSlugOrId ||
      b.slug?.toLowerCase() === String(currentSlugOrId).toLowerCase() ||
      b.id?.toLowerCase() === String(currentSlugOrId).toLowerCase()
  );
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? list[currentIndex - 1] : list[list.length - 1];
  const next = currentIndex < list.length - 1 ? list[currentIndex + 1] : list[0];
  return { prev, next };
}

export function getRelatedBlogs(currentBlog, limit = 3) {
  if (!currentBlog) return [];
  const all = getBlogs().filter(
    (b) => b.slug !== currentBlog.slug && b.id !== currentBlog.id
  );
  const currentTags = currentBlog.tags || [];
  const currentCategory = currentBlog.category;

  const scored = all.map((b) => {
    let score = 0;
    if (b.category && b.category === currentCategory) score += 3;
    if (b.tags && Array.isArray(b.tags)) {
      const matchCount = b.tags.filter((t) => currentTags.includes(t)).length;
      score += matchCount * 2;
    }
    return { blog: b, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.blog);
}

// Testimonials
export function getTestimonials() {
  return testimonials || [];
}

// Learning
export function getLearning() {
  return learning || [];
}

// Stats
export function getStats() {
  return getDynamicStats();
}

// Global Multi-Entity Search
export function searchPortfolio(query) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return [];
  }
  const q = query.toLowerCase().trim();
  const results = [];

  // Search Projects
  (projects || []).forEach((p) => {
    const matched =
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(q))) ||
      (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(q)));
    if (matched) {
      results.push({
        type: 'Project',
        title: p.title,
        subtitle: p.category || 'Project',
        id: p.id,
        link: `/projects/${p.slug || p.id}`
      });
    }
  });

  // Search Skills
  (skills || []).forEach((cat) => {
    const list = cat.skills || cat.items || [];
    list.forEach((s) => {
      if (s.name?.toLowerCase().includes(q) || cat.domain?.toLowerCase().includes(q)) {
        results.push({
          type: 'Skill',
          title: s.name,
          subtitle: cat.domain || cat.category || 'Skill',
          id: s.name,
          link: `/skills`
        });
      }
    });
  });

  // Search Hackathons
  (hackathons || []).forEach((h) => {
    if (
      h.name?.toLowerCase().includes(q) ||
      h.problemStatement?.toLowerCase().includes(q) ||
      h.result?.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'Hackathon',
        title: h.name,
        subtitle: h.edition || h.date || h.year || 'Hackathon',
        id: h.id,
        link: `/hackathons/${h.slug || h.id}`
      });
    }
  });

  // Search Certifications
  (certifications || []).forEach((c) => {
    if (
      c.title?.toLowerCase().includes(q) ||
      c.issuer?.toLowerCase().includes(q) ||
      c.organization?.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'Certification',
        title: c.title,
        subtitle: c.issuer || c.organization || 'Certification',
        id: c.id,
        link: `/certifications`
      });
    }
  });

  // Search Experience
  (experience || []).forEach((e) => {
    if (
      e.role?.toLowerCase().includes(q) ||
      e.organization?.toLowerCase().includes(q) ||
      e.company?.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'Experience',
        title: e.role,
        subtitle: e.organization || e.company || 'Experience',
        id: e.id,
        link: `/experience`
      });
    }
  });

  // Search Blogs
  (blogs || []).forEach((b) => {
    if (
      b.title?.toLowerCase().includes(q) ||
      b.summary?.toLowerCase().includes(q) ||
      b.description?.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'Blog',
        title: b.title,
        subtitle: b.date || 'Article',
        id: b.slug || b.id,
        link: `/blog/${b.slug || b.id}`
      });
    }
  });

  // Search Education
  (education || []).forEach((edu) => {
    if (
      edu.degree?.toLowerCase().includes(q) ||
      edu.institution?.toLowerCase().includes(q) ||
      edu.field?.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'Education',
        title: edu.degree || edu.institution,
        subtitle: edu.institution,
        id: edu.id || edu.degree,
        link: `/education`
      });
    }
  });

  return results;
}
