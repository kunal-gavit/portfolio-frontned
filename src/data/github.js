export const fallbackGithubStats = {
  username: 'kunalgavit',
  publicRepos: 18,
  totalStars: 142,
  followers: 48,
  contributionsThisYear: 784,
  pullRequests: 32,
  topLanguages: [
    { name: 'JavaScript', percentage: 46, color: '#f7df1e' },
    { name: 'C++', percentage: 22, color: '#f34b7d' },
    { name: 'Python', percentage: 18, color: '#3572A5' },
    { name: 'HTML/CSS', percentage: 14, color: '#e34c26' }
  ]
};

export const fallbackTopRepositories = [
  {
    name: 'circuitbotz-ai-assistant',
    description: 'AI-assisted hardware schematic debugger and component recommendation platform with Gemini AI.',
    stars: 46,
    forks: 14,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    url: 'https://github.com/kunalgavit/circuitbotz',
    updatedAt: '2 days ago'
  },
  {
    name: 'binarybotz-ecommerce',
    description: 'E-commerce platform for robotics kits, microcontrollers, and verified DIY electronics parts.',
    stars: 32,
    forks: 9,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    url: 'https://github.com/kunalgavit/binarybotz',
    updatedAt: '1 week ago'
  },
  {
    name: 'sahayog-voice-ai',
    description: 'Voice-first multilingual assistant tailored for accessibility in public utilities and regional information.',
    stars: 41,
    forks: 11,
    language: 'Python',
    languageColor: '#3572A5',
    url: 'https://github.com/kunalgavit/sahayog',
    updatedAt: '3 weeks ago'
  },
  {
    name: 'agripulse-esp32-telemetry',
    description: 'ESP32 firmware and React real-time telemetry dashboard for precision soil moisture & valve automation.',
    stars: 23,
    forks: 6,
    language: 'C++',
    languageColor: '#f34b7d',
    url: 'https://github.com/kunalgavit/agripulse-iot',
    updatedAt: '1 month ago'
  }
];

// Generates a deterministic contribution heatmap for 52 weeks x 7 days
export function generateContributionGrid() {
  const weeks = [];
  const now = new Date();
  
  for (let w = 51; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      
      const seed = (w * 13 + d * 7 + (w % 4) * 5) % 17;
      let count = 0;
      let level = 0;
      
      if (w % 6 === 0 || (w > 2 && w < 8)) {
        count = Math.floor((seed / 17) * 9) + 2;
      } else if (seed > 6) {
        count = Math.floor((seed / 17) * 5) + 1;
      }

      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 8) level = 3;
      else level = 4;

      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    weeks.push(days);
  }
  return weeks;
}
