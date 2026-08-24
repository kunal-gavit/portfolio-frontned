import { projects } from './projects.js';
import { hackathons } from './hackathons.js';
import { certifications } from './certifications.js';
import { skills } from './skills.js';

export function getDynamicStats() {
  const totalProjects = Array.isArray(projects) ? projects.length : 15;
  const totalHackathons = Array.isArray(hackathons) ? hackathons.length : 6;
  const totalCertifications = Array.isArray(certifications) ? certifications.length : 10;
  
  // Calculate total distinct skills across categories
  let totalSkillsCount = 0;
  if (Array.isArray(skills)) {
    skills.forEach(cat => {
      if (Array.isArray(cat.skills)) {
        totalSkillsCount += cat.skills.length;
      } else if (Array.isArray(cat.items)) {
        totalSkillsCount += cat.items.length;
      }
    });
  }
  if (totalSkillsCount === 0) totalSkillsCount = 24;

  return [
    {
      id: 'projects',
      label: 'Projects Built',
      value: totalProjects,
      suffix: '+',
      description: 'Web apps, AI tools & IoT prototypes',
      icon: 'FolderCode'
    },
    {
      id: 'hackathons',
      label: 'Hackathons Participated',
      value: totalHackathons,
      suffix: '+',
      description: 'National & regional innovation sprints',
      icon: 'Trophy'
    },
    {
      id: 'technologies',
      label: 'Technologies & Tools',
      value: totalSkillsCount,
      suffix: '+',
      description: 'Languages, frameworks & hardware chips',
      icon: 'Cpu'
    },
    {
      id: 'certifications',
      label: 'Certifications Earned',
      value: totalCertifications,
      suffix: '+',
      description: 'AI, Cloud, Full Stack & Computer Science',
      icon: 'Award'
    },
    {
      id: 'contributions',
      label: 'GitHub Contributions',
      value: 750,
      suffix: '+',
      description: 'Commits, pull requests & OSS activity',
      icon: 'GitPullRequest'
    }
  ];
}

export const stats = getDynamicStats();
