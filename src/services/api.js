/**
 * Centralized API Service for Frontend Public Website
 * Interacts with Backend REST API (http://localhost:5000/api)
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  'http://localhost:5000/api';

async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[API Client] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  getProfile: () => fetchJson('/profile'),
  getProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/projects${query ? `?${query}` : ''}`);
  },
  getProject: (identifier) => fetchJson(`/projects/${identifier}`),
  getSkills: () => fetchJson('/skills'),
  getExperience: () => fetchJson('/experience'),
  getHackathons: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/hackathons${query ? `?${query}` : ''}`);
  },
  getHackathon: (identifier) => fetchJson(`/hackathons/${identifier}`),
  getCertifications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/certifications${query ? `?${query}` : ''}`);
  },
  getEducation: () => fetchJson('/education'),
  getAchievements: () => fetchJson('/achievements'),
  getServices: () => fetchJson('/services'),
  getBlogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/blogs${query ? `?${query}` : ''}`);
  },
  getBlog: (identifier) => fetchJson(`/blogs/${identifier}`),
  getStats: () => fetchJson('/stats'),
  search: (query) => fetchJson(`/search?q=${encodeURIComponent(query)}`),
  sendContactMessage: (data) =>
    fetchJson('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default api;
