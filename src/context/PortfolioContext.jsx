'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import {
  getProfile as getFallbackProfile,
  getProjects as getFallbackProjects,
  getSkills as getFallbackSkills,
  getHackathons as getFallbackHackathons,
  getCertifications as getFallbackCertifications,
  getExperience as getFallbackExperience,
  getEducation as getFallbackEducation,
  getAchievements as getFallbackAchievements,
  getServices as getFallbackServices,
  getBlogs as getFallbackBlogs,
  getSiteConfig,
  getSocialLinksList,
  getSocialLinks,
} from '../lib/data.js';

const PortfolioContext = createContext({
  profile: getFallbackProfile(),
  projects: getFallbackProjects(),
  skills: getFallbackSkills(),
  hackathons: getFallbackHackathons(),
  certifications: getFallbackCertifications(),
  experience: getFallbackExperience(),
  education: getFallbackEducation(),
  achievements: getFallbackAchievements(),
  services: getFallbackServices(),
  blogs: getFallbackBlogs(),
  stats: [],
  siteConfig: getSiteConfig(),
  socialLinks: getSocialLinks(),
  socialLinksList: getSocialLinksList(),
  loading: false,
  refreshData: () => {},
  refreshSection: () => {},
});

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(getFallbackProfile());
  const [projects, setProjects] = useState(getFallbackProjects());
  const [skills, setSkills] = useState(getFallbackSkills());
  const [hackathons, setHackathons] = useState(getFallbackHackathons());
  const [certifications, setCertifications] = useState(getFallbackCertifications());
  const [experience, setExperience] = useState(getFallbackExperience());
  const [education, setEducation] = useState(getFallbackEducation());
  const [achievements, setAchievements] = useState(getFallbackAchievements());
  const [services, setServices] = useState(getFallbackServices());
  const [blogs, setBlogs] = useState(getFallbackBlogs());
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLivePortfolioData = useCallback(async () => {
    try {
      setLoading(true);

      const [
        profileRes,
        projectsRes,
        skillsRes,
        hackathonsRes,
        certsRes,
        expRes,
        eduRes,
        achRes,
        svcRes,
        blogRes,
        statsRes,
      ] = await Promise.allSettled([
        api.getProfile(),
        api.getProjects(),
        api.getSkills(),
        api.getHackathons(),
        api.getCertifications(),
        api.getExperience(),
        api.getEducation(),
        api.getAchievements(),
        api.getServices(),
        api.getBlogs(),
        api.getStats(),
      ]);

      if (profileRes.status === 'fulfilled' && profileRes.value?.success && profileRes.value.data) {
        setProfile((prev) => ({ ...prev, ...profileRes.value.data }));
      }
      if (projectsRes.status === 'fulfilled' && projectsRes.value?.success && Array.isArray(projectsRes.value.data)) {
        setProjects(projectsRes.value.data.length > 0 ? projectsRes.value.data : getFallbackProjects());
      }
      if (skillsRes.status === 'fulfilled' && skillsRes.value?.success && Array.isArray(skillsRes.value.data)) {
        setSkills(skillsRes.value.data.length > 0 ? skillsRes.value.data : getFallbackSkills());
      }
      if (hackathonsRes.status === 'fulfilled' && hackathonsRes.value?.success && Array.isArray(hackathonsRes.value.data)) {
        setHackathons(hackathonsRes.value.data.length > 0 ? hackathonsRes.value.data : getFallbackHackathons());
      }
      if (certsRes.status === 'fulfilled' && certsRes.value?.success && Array.isArray(certsRes.value.data)) {
        setCertifications(certsRes.value.data.length > 0 ? certsRes.value.data : getFallbackCertifications());
      }
      if (expRes.status === 'fulfilled' && expRes.value?.success && Array.isArray(expRes.value.data)) {
        setExperience(expRes.value.data.length > 0 ? expRes.value.data : getFallbackExperience());
      }
      if (eduRes.status === 'fulfilled' && eduRes.value?.success && Array.isArray(eduRes.value.data)) {
        setEducation(eduRes.value.data.length > 0 ? eduRes.value.data : getFallbackEducation());
      }
      if (achRes.status === 'fulfilled' && achRes.value?.success && Array.isArray(achRes.value.data)) {
        setAchievements(achRes.value.data.length > 0 ? achRes.value.data : getFallbackAchievements());
      }
      if (svcRes.status === 'fulfilled' && svcRes.value?.success && Array.isArray(svcRes.value.data)) {
        setServices(svcRes.value.data.length > 0 ? svcRes.value.data : getFallbackServices());
      }
      if (blogRes.status === 'fulfilled' && blogRes.value?.success && Array.isArray(blogRes.value.data)) {
        setBlogs(blogRes.value.data.length > 0 ? blogRes.value.data : getFallbackBlogs());
      }
      if (statsRes.status === 'fulfilled' && statsRes.value?.success && Array.isArray(statsRes.value.data)) {
        setStats(statsRes.value.data);
      }
    } catch (err) {
      console.warn('[Live Sync] Fallback data active:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSection = useCallback(
    async (sectionName) => {
      try {
        switch (sectionName) {
          case 'profile': {
            const res = await api.getProfile();
            if (res?.success && res.data) {
              setProfile((prev) => ({ ...prev, ...res.data }));
            }
            break;
          }
          case 'projects': {
            const res = await api.getProjects();
            if (res?.success && Array.isArray(res.data)) {
              setProjects(res.data.length > 0 ? res.data : getFallbackProjects());
            }
            break;
          }
          case 'skills': {
            const res = await api.getSkills();
            if (res?.success && Array.isArray(res.data)) {
              setSkills(res.data.length > 0 ? res.data : getFallbackSkills());
            }
            break;
          }
          case 'hackathons': {
            const res = await api.getHackathons();
            if (res?.success && Array.isArray(res.data)) {
              setHackathons(res.data.length > 0 ? res.data : getFallbackHackathons());
            }
            break;
          }
          case 'certifications': {
            const res = await api.getCertifications();
            if (res?.success && Array.isArray(res.data)) {
              setCertifications(res.data.length > 0 ? res.data : getFallbackCertifications());
            }
            break;
          }
          case 'experience': {
            const res = await api.getExperience();
            if (res?.success && Array.isArray(res.data)) {
              setExperience(res.data.length > 0 ? res.data : getFallbackExperience());
            }
            break;
          }
          case 'education': {
            const res = await api.getEducation();
            if (res?.success && Array.isArray(res.data)) {
              setEducation(res.data.length > 0 ? res.data : getFallbackEducation());
            }
            break;
          }
          case 'achievements': {
            const res = await api.getAchievements();
            if (res?.success && Array.isArray(res.data)) {
              setAchievements(res.data.length > 0 ? res.data : getFallbackAchievements());
            }
            break;
          }
          case 'services': {
            const res = await api.getServices();
            if (res?.success && Array.isArray(res.data)) {
              setServices(res.data.length > 0 ? res.data : getFallbackServices());
            }
            break;
          }
          case 'blogs': {
            const res = await api.getBlogs();
            if (res?.success && Array.isArray(res.data)) {
              setBlogs(res.data.length > 0 ? res.data : getFallbackBlogs());
            }
            break;
          }
          case 'stats': {
            const res = await api.getStats();
            if (res?.success && Array.isArray(res.data)) {
              setStats(res.data);
            }
            break;
          }
          default:
            await fetchLivePortfolioData();
        }
      } catch (err) {
        console.warn(`[refreshSection] Failed to refresh ${sectionName}:`, err.message);
      }
    },
    [fetchLivePortfolioData]
  );

  useEffect(() => {
    fetchLivePortfolioData();

    // Revalidate on window focus when admin returns from Admin Panel tab
    const handleFocus = () => {
      fetchLivePortfolioData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchLivePortfolioData]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        skills,
        hackathons,
        certifications,
        experience,
        education,
        achievements,
        services,
        blogs,
        stats,
        siteConfig: getSiteConfig(),
        socialLinks: getSocialLinks(),
        socialLinksList: getSocialLinksList(),
        loading,
        refreshData: fetchLivePortfolioData,
        refreshSection,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
