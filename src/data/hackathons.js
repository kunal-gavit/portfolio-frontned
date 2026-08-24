export const hackathonsData = [
  {
    id: 'mit-india-hackathon-2026',
    name: 'MIT India Hackathon',
    edition: '2026 Edition',
    date: 'February 2026',
    location: 'Pune / National Track',
    organizer: 'MIT Group of Institutions / National Tech Consortium',
    teamName: 'Team NexaCircuit',
    teamRole: 'Team Lead & Lead Full Stack / IoT Architect',
    problemStatement: 'Bridging the physical-to-digital gap in engineering education through AI-assisted hardware prototyping, intelligent diagnostic assistance, and accessible IoT tooling.',
    solutionSummary: 'Engineered an end-to-end prototype of CircuitBotz with an integrated hardware verification engine that analyzes circuit schematics, detects logic level mismatches, and suggests real-time wiring solutions using multimodal generative AI.',
    result: 'Finalist & Special Jury Commendation for Hardware-Software Integration',
    isFeatured: true,
    badge: 'Featured Hackathon 2026',
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'Gemini AI API', 'ESP32 Hardware', 'Tailwind CSS', 'MongoDB'],
    keyOutcomes: [
      'Successfully pitched working prototype live in front of senior industry leaders and university faculty jury.',
      'Demonstrated sub-second AI diagnosis of real breadboard wiring errors using camera image capture.',
      'Received actionable feedback from startup incubators on productization and component sourcing logistics.',
      'Networked with 200+ top engineering teams, AI researchers, and founder mentors across India.'
    ],
    juryFeedback: '"Exceptional blend of practical hardware knowledge and modern generative AI integration. The live demo showed genuine technical depth beyond standard web apps."',
    networkingLearnings: 'Learned the importance of high-intensity pitching under tight time constraints, structuring clear API boundaries during 36-hour team sprints, and designing failover states for live hardware demonstrations.',
    projectSlug: 'circuitbotz-ai-electronics-platform',
    githubUrl: 'https://github.com/kunalgavit/circuitbotz',
    liveUrl: 'https://circuitbotz.demo.app',
    certificateUrl: '#',
    photoGallery: [
      {
        caption: 'Team NexaCircuit live pitching at MIT India Hackathon 2026 stage',
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop'
      },
      {
        caption: 'Late night rapid prototyping and hardware circuit breadboard debugging',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'sahyadri-innovation-sprint',
    name: 'State-Level AI & Accessibility Sprint',
    edition: '2025 Edition',
    date: 'October 2025',
    location: 'Maharashtra',
    organizer: 'State Innovation Council',
    teamName: 'Team Sahayog',
    teamRole: 'Conversational AI Lead',
    problemStatement: 'Digital exclusion among rural and semi-urban populations due to complex text-heavy smartphone applications.',
    solutionSummary: 'Developed Sahayog, a zero-friction voice assistant that enables regional language speakers to interact with public schemes and agricultural market rates via voice.',
    result: '2nd Place (Runners-Up) & Best Social Impact Award',
    isFeatured: false,
    badge: 'Award Winner',
    technologies: ['FastAPI', 'Python', 'Web Speech API', 'React', 'Gemini AI API'],
    keyOutcomes: [
      'Built a fully functional multilingual voice parsing pipeline in under 30 hours.',
      'Achieved 88% intent recognition accuracy on colloquial speech samples.',
      'Awarded cash prize and certificate of technical excellence.'
    ],
    juryFeedback: '"High societal value with an intuitive user experience tailored for digital literacy gaps."',
    networkingLearnings: 'Gained profound insight into voice-first UX design principles and latency reduction strategies in real-time conversational systems.',
    projectSlug: 'sahayog-voice-first-assistant',
    githubUrl: 'https://github.com/kunalgavit/sahayog'
  },
  {
    id: 'smart-campus-hackathon',
    name: 'Smart Campus IoT & Sustainability Challenge',
    edition: '2024 Edition',
    date: 'April 2024',
    location: 'MITAOE, Pune',
    organizer: 'Department of Electronics & Computer Engineering',
    teamName: 'EcoTech Innovations',
    teamRole: 'Embedded Firmware & Cloud Integrator',
    problemStatement: 'Unregulated campus power consumption and water wastage across laboratory facilities.',
    solutionSummary: 'Deployed battery-backed ESP32 edge nodes with light & flow telemetry streaming live data to a centralized energy monitoring dashboard.',
    result: 'Top 5 Finalist & Best IoT Prototype Award',
    isFeatured: false,
    technologies: ['ESP32', 'C++', 'MQTT', 'Node.js', 'Chart.js', 'Firebase'],
    keyOutcomes: [
      'Constructed working hardware node with solar harvesting circuit.',
      'Integrated real-time threshold alert notifications via Telegram bots.'
    ],
    networkingLearnings: 'Deepened understanding of low-power firmware architecture and RF telemetry range in concrete campus environments.'
  }
];

export const hackathons = hackathonsData;

