export const projectsData = [
  {
    id: 'circuitbotz',
    title: 'CircuitBotz',
    slug: 'circuitbotz-ai-electronics-platform',
    tagline: 'AI-powered electronics ecosystem combining hardware shopping, guided learning, AI schematic assistant & community forum.',
    description: 'An all-in-one platform for hardware engineers and hobbyists that integrates an AI schematic debugger, component compatibility checker, interactive project tutorials, and an e-commerce catalog for electronics parts.',
    category: 'AI',
    tags: ['AI', 'IoT', 'Web', 'React', 'Node.js', 'LLM API', 'MongoDB'],
    techStack: ['React', 'JavaScript', 'Node.js', 'Express', 'Gemini AI API', 'MongoDB', 'Tailwind CSS', 'Razorpay'],
    featured: true,
    status: 'Live',
    githubUrl: 'https://github.com/kunalgavit/circuitbotz',
    liveUrl: 'https://circuitbotz.demo.app',
    stars: 34,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    caseStudy: {
      problem: 'Beginners and engineering students struggle when debugging hardware circuit diagrams, choosing compatible components (e.g. voltage matching between ESP32 and 5V relays), and sourcing verified components across fragmented vendors.',
      solution: 'CircuitBotz unifies hardware learning with an intelligent circuit assistant. Users can upload schematics or prompt with component lists to receive automated pinout checks, power consumption estimations, and direct checkout for needed resistors, sensors, and boards.',
      role: 'Lead Architect & Full Stack Developer',
      teamSize: '3 Members (Hackathon & Product Phase)',
      timeline: '4 Months',
      features: [
        'Interactive AI Circuit Assistant powered by generative models to diagnose broken circuit connections',
        'Component compatibility engine ensuring logic-level shift detection (3.3V vs 5V)',
        'E-commerce store with catalog filtering by microcontroller family (ESP32, Arduino, Raspberry Pi, STM32)',
        'Step-by-step interactive project guides with auto-generated BOM (Bill of Materials)',
        'Community discussion board for hardware troubleshooting and project showcasing'
      ],
      architectureOverview: 'Client-server architecture with React frontend interfacing with an Express REST API. The AI assistant leverages streaming LLM responses with grounded hardware system prompts and domain-specific circuit verification rules.',
      architectureLayers: [
        {
          layer: 'Frontend Client',
          components: ['React', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
          description: 'Responsive single-page application with real-time schematic rendering and e-commerce cart management.'
        },
        {
          layer: 'Backend API & AI Engine',
          components: ['Node.js', 'Express.js', 'Gemini AI API', 'Circuit Rule Engine'],
          description: 'Processes prompt queries, validates pin configurations, and serves catalog queries with sub-50ms latency.'
        },
        {
          layer: 'Data & Persistence',
          components: ['MongoDB Atlas', 'Mongoose ORM', 'Cloudinary CDN'],
          description: 'Document database storing product specs, user project guides, and cached hardware pinout diagrams.'
        }
      ],
      challenges: [
        {
          title: 'Handling Hallucinated Circuit Pinouts',
          problem: 'Standard LLMs frequently hallucinate GPIO pins on microcontrollers like ESP32-WROOM-32.',
          solution: 'Implemented a strict JSON grounding schema paired with a deterministic hardware validation lookup table that verifies GPIO restrictions before returning the schematic to the user.'
        },
        {
          title: 'Real-Time E-Commerce Inventory Synchronization',
          problem: 'High concurrency during flash sales caused cart race conditions.',
          solution: 'Engineered optimistic UI updates on the client combined with atomic database reservations in MongoDB.'
        }
      ],
      resultsAndMetrics: [
        '500+ active student builders tested the platform during university tech events',
        'Over 1,200 circuit queries successfully resolved with 94% accuracy score',
        'Reduced BOM assembly time for student robotics teams by 40%'
      ],
      learnings: [
        'Grounding AI outputs against domain-specific lookup tables is essential for critical hardware engineering applications.',
        'State management in multi-step wizard checkouts requires resilient local session recovery.'
      ]
    }
  },
  {
    id: 'binarybotz',
    title: 'BinaryBotz',
    slug: 'binarybotz-electronics-ecommerce',
    tagline: 'Modern, high-performance electronics e-commerce store with curated robotics kits and developer components.',
    description: 'A purpose-built e-commerce platform for robotics enthusiasts and developers. Features real-time stock management, custom kit configuration, integrated payment gateways, and order tracking.',
    category: 'Web',
    tags: ['Web', 'E-Commerce', 'React', 'Node.js', 'MongoDB', 'Razorpay'],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT Auth', 'Razorpay API'],
    featured: true,
    status: 'Live',
    githubUrl: 'https://github.com/kunalgavit/binarybotz',
    liveUrl: 'https://binarybotz.store.app',
    stars: 28,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop',
    caseStudy: {
      problem: 'Local electronics hobbyists lacked a streamlined portal offering verified DIY robotics components, detailed datasheet downloads, and combined starter kits with pre-flashed sample code.',
      solution: 'Created BinaryBotz to offer verified electronics parts, bundle kits (IoT starter kit, quadcopter beginner kit), and direct datasheet links with one-click ordering.',
      role: 'Full Stack Engineer & UI Designer',
      teamSize: 'Solo Project',
      timeline: '2 Months',
      features: [
        'Dynamic component search with multi-parameter filtering (voltage, sensor type, microcontroller)',
        'Interactive Kit Configurator allowing users to customize DIY parts with dynamic price calculation',
        'Secure payment gateway integration with webhooks for automated order confirmation',
        'Admin dashboard for inventory updates, order dispatch tracking, and sales analytics'
      ],
      architectureOverview: 'Full-stack MERN stack application with JWT-secured endpoints, cloud image hosting on Cloudinary, and responsive UI optimized for mobile buyers.',
      architectureLayers: [
        {
          layer: 'User Interface',
          components: ['React', 'Tailwind CSS', 'Context API', 'Axios'],
          description: 'Fast, accessible storefront with quick-view modals and checkout progress trackers.'
        },
        {
          layer: 'API Server',
          components: ['Express', 'Node.js', 'Razorpay SDK', 'Bcrypt'],
          description: 'RESTful API with role-based access control (Admin vs Customer) and order lifecycle state machines.'
        },
        {
          layer: 'Database',
          components: ['MongoDB', 'Mongoose Indexes'],
          description: 'Indexed catalog database supporting full-text queries for part numbers.'
        }
      ],
      challenges: [
        {
          title: 'Payment Webhook Reliability',
          problem: 'Network drops during checkout could lead to payment completion without order state mutation.',
          solution: 'Implemented idempotent webhook handlers with signature verification and auto-retry queues.'
        }
      ],
      resultsAndMetrics: [
        '100% test coverage on payment and authentication routes',
        'Sub-1.2s page load speed achieved through static asset optimization and lazy image loading'
      ],
      learnings: [
        'Deep understanding of transactional safety in non-relational databases.',
        'Payment gateway webhook edge cases and error handling patterns.'
      ]
    }
  },
  {
    id: 'imagify-ai',
    title: 'Imagify AI',
    slug: 'imagify-ai-image-generator',
    tagline: 'High-speed generative AI visual studio for creators with prompt expansion and style variations.',
    description: 'An AI-powered image generation and creative enhancement suite. Users write natural language prompts which are enhanced via prompt engineering models before rendering photorealistic visuals.',
    category: 'AI',
    tags: ['AI', 'Generative AI', 'React', 'Tailwind CSS', 'AI APIs', 'Node.js'],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Google Imagen / Gemini AI', 'Lucide React'],
    featured: true,
    status: 'Completed',
    githubUrl: 'https://github.com/kunalgavit/imagify-ai',
    liveUrl: 'https://imagify-ai.web.app',
    stars: 42,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    caseStudy: {
      problem: 'Non-technical creators struggle to craft complex text prompts that yield photorealistic or stylistically consistent generated artwork.',
      solution: 'Imagify AI acts as an intelligent prompt synthesizer. It takes brief phrases, expands them with lighting, camera angle, and aesthetic parameters, and outputs multi-aspect-ratio images in seconds.',
      role: 'Creator & Frontend Developer',
      teamSize: 'Solo Project',
      timeline: '3 Weeks',
      features: [
        'Prompt Magic expansion that enhances short ideas into cinematic visual prompts',
        'Aspect ratio selector (1:1, 16:9, 9:16, 4:3) with real-time preview canvases',
        'History gallery with instant high-resolution PNG download and metadata inspection',
        'Preset style library: Cyberpunk, Minimalist 3D, Anime, Photorealistic Studio, Oil Painting'
      ],
      architectureOverview: 'Client-side React interface communicating with a secured serverless proxy that authenticates API keys and delivers streaming progress feedback.',
      architectureLayers: [
        {
          layer: 'Client App',
          components: ['React', 'Motion', 'Tailwind CSS'],
          description: 'Dark-mode glassmorphic interface with canvas preview and download tools.'
        },
        {
          layer: 'AI Gateway',
          components: ['Express / Serverless Functions', 'GenAI SDK'],
          description: 'Validates user rate limits, sanitizes prompts, and orchestrates image synthesis requests.'
        }
      ],
      challenges: [
        {
          title: 'Latency Feedback During Image Synthesis',
          problem: 'Image generation takes 3-6 seconds, leading to perceived interface freezing without proper feedback.',
          solution: 'Designed an animated pulse canvas with dynamic progress steps (Analyzing prompt -> Expanding tokens -> Rendering diffusion -> Finalizing).'
        }
      ],
      resultsAndMetrics: [
        'Generated over 2,500 creative assets in testing phase',
        'Average prompt creation time reduced by 65% with auto-enhancer'
      ],
      learnings: [
        'Prompt engineering pipelines can bridge the gap between amateur users and state-of-the-art vision models.'
      ]
    }
  },
  {
    id: 'booksphere-mitaoe',
    title: 'BookSphere MITAOE',
    slug: 'booksphere-mitaoe-library-system',
    tagline: 'Modern digitized library management and automated book reservation system for MITAOE.',
    description: 'A comprehensive campus library portal designed to eliminate physical queues, automate book issue/return tracking, and provide personalized academic reading recommendations for engineering departments.',
    category: 'Web',
    tags: ['Web', 'Database', 'React', 'Node.js', 'MySQL', 'Campus Project'],
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'JWT Auth', 'Chart.js'],
    featured: true,
    status: 'Completed',
    githubUrl: 'https://github.com/kunalgavit/booksphere-mitaoe',
    liveUrl: 'https://booksphere.mitaoe.edu.demo',
    stars: 19,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    caseStudy: {
      problem: 'Engineering students faced long wait times for textbook checkout during semester exams, and the college lacked a central search portal showing available rack positions.',
      solution: 'Engineered BookSphere MITAOE with real-time ISBN lookup, barcode generation for mobile check-in, automated late return penalty calculation, and departmental reading lists.',
      role: 'Lead Backend & Database Architect',
      teamSize: '4 Students (College Capstone)',
      timeline: '3 Months',
      features: [
        'Instant book availability radar with exact shelf and rack coordinate locators',
        'Student dashboard with 1-click book renewal and due-date countdown alerts',
        'Librarian administrative dashboard with bulk CSV book import and circulation analytics',
        'Department-wise curriculum syllabus book tagging (Computer, Electronics, Mechanical)'
      ],
      architectureOverview: 'Relational database schema enforcing strict foreign key constraints between Students, Book Editions, Circulation Transactions, and Department Catalogs.',
      architectureLayers: [
        {
          layer: 'Client Portal',
          components: ['React SPA', 'Tailwind UI', 'QR / Barcode Scanner'],
          description: 'Dual view for Students (Search & Reserve) and Librarians (Scan & Issue).'
        },
        {
          layer: 'API & Business Logic',
          components: ['Node.js', 'Express', 'JWT Authentication', 'Schedule Cron Jobs'],
          description: 'Handles daily penalty checks, email notification triggers, and circulation logging.'
        },
        {
          layer: 'Relational Database',
          components: ['MySQL', 'Stored Procedures', 'Normalized 3NF Tables'],
          description: 'Guarantees transaction consistency during concurrent student book holds.'
        }
      ],
      challenges: [
        {
          title: 'Concurrency in Single-Copy Book Reservation',
          problem: 'Multiple students attempting to reserve the last available copy of an engineering textbook simultaneously.',
          solution: 'Implemented row-level locking with atomic reservation timestamps to prevent duplicate reservations.'
        }
      ],
      resultsAndMetrics: [
        'Presented to college department faculty with positive appraisal for UI clarity',
        'Simulated 1,000+ concurrent book transactions without data collision'
      ],
      learnings: [
        'Mastery of ACID transaction guarantees and relational schema normalization.'
      ]
    }
  },
  {
    id: 'sahayog',
    title: 'Sahayog',
    slug: 'sahayog-voice-first-assistant',
    tagline: 'Voice-first AI assistant concept designed to break digital literacy barriers for regional users.',
    description: 'An accessibility-focused voice assistant concept that enables users to interact with digital public services, agricultural info, and utilities using natural spoken regional speech.',
    category: 'Hackathon',
    tags: ['AI', 'Hackathon', 'Voice AI', 'Web Speech API', 'Python / Node.js', 'Accessibility'],
    techStack: ['React', 'Web Speech API', 'Python', 'FastAPI', 'Gemini AI API', 'Tailwind CSS'],
    featured: true,
    status: 'Award Winner',
    githubUrl: 'https://github.com/kunalgavit/sahayog',
    liveUrl: 'https://sahayog-assistant.demo.app',
    stars: 38,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200&auto=format&fit=crop',
    caseStudy: {
      problem: 'Millions of elderly and regional language speakers in rural areas find complex form-based smartphone interfaces intimidating and inaccessible.',
      solution: 'Sahayog provides a zero-touch, conversational voice interface that converts speech into structured actions (such as checking crop prices, setting reminders, or filing service queries) in conversational Hindi and Marathi.',
      role: 'Hackathon Lead & Conversational AI Developer',
      teamSize: '4 Members',
      timeline: '36 Hours (Hackathon Sprint) + 2 Weeks Polish',
      features: [
        'Continuous speech-to-text with auto noise cancellation for ambient outdoor use',
        'Context-aware intent classification translating conversational speech into API payloads',
        'Audio feedback synthesizing natural human-like responses in regional languages',
        'Offline capability for critical emergency contact speed-dial commands'
      ],
      architectureOverview: 'Microphone input is captured on the browser via Web Speech API, sent to a FastAPI inference engine that extracts intent with an LLM, and dispatches downstream microservices.',
      architectureLayers: [
        {
          layer: 'Voice Input / Output',
          components: ['Web Speech Recognition', 'Web Audio API', 'React UI'],
          description: 'Real-time audio visualization waveform and instant transcript feedback.'
        },
        {
          layer: 'Conversational Brain',
          components: ['FastAPI', 'Gemini AI API', 'LangChain Intent Parser'],
          description: 'Extracts user intent and required parameters (e.g. city, commodity, action).'
        },
        {
          layer: 'Service Connectors',
          components: ['Government Open Data APIs', 'Weather APIs', 'Market Mandi APIs'],
          description: 'Fetches real-time commodity rates and public advisories.'
        }
      ],
      challenges: [
        {
          title: 'Handling Accented Regional Indian English and Dialects',
          problem: 'Standard ASR models frequently misunderstood regional terminology.',
          solution: 'Implemented an acoustic phonetic mapping layer that corrects colloquial phrasing before feeding to the LLM.'
        }
      ],
      resultsAndMetrics: [
        'Recognized at regional hackathon for social impact and human-centric design',
        '88% task completion rate among first-time non-English speaking testers'
      ],
      learnings: [
        'Audio UI design requires immediate visual feedback (e.g., pulsing waveform) so users know they are being heard.'
      ]
    }
  },
  {
    id: 'iot-smart-agriculture',
    title: 'AgriPulse Edge IoT',
    slug: 'agripulse-edge-iot-system',
    tagline: 'Autonomous crop monitoring & smart irrigation controller powered by ESP32 and LoRa telemetry.',
    description: 'An embedded hardware IoT solution measuring soil moisture, ambient humidity, temperature, and light levels with automated valve actuation and remote mobile dashboard monitoring.',
    category: 'IoT',
    tags: ['IoT', 'ESP32', 'C++', 'Arduino', 'Sensors', 'Firebase', 'Web'],
    techStack: ['C++', 'ESP32 Microcontroller', 'Arduino IDE', 'DHT22 Sensor', 'Capacitive Soil Sensor', 'Firebase RTDB', 'React Dashboard'],
    featured: false,
    status: 'Completed',
    githubUrl: 'https://github.com/kunalgavit/agripulse-iot',
    liveUrl: 'https://agripulse.demo.app',
    stars: 21,
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop',
    caseStudy: {
      problem: 'Traditional timer-based crop irrigation wastes up to 35% of water by watering crops even after heavy rainfall.',
      solution: 'Engineered an edge microcontroller system with capacitive moisture sensors that only triggers solenoid relays when moisture drops below threshold, transmitting live readings to cloud.',
      role: 'Hardware Circuit Designer & Firmware Developer',
      teamSize: '2 Members',
      timeline: '1.5 Months',
      features: [
        'Low-power deep sleep mode extending battery life up to 4 months on 18650 Li-ion cells',
        'Live telemetry charts updating every 10 seconds via WebSocket / Firebase RTDB',
        'Manual valve override switch from web dashboard and local physical button',
        'SMS/Notification alerts when water reservoir level falls below 15%'
      ],
      architectureOverview: 'ESP32 gathers analog sensor readings, applies Kalman filtering to remove noise, and pushes JSON packets over Wi-Fi/MQTT to the cloud database.',
      architectureLayers: [
        {
          layer: 'Physical Hardware',
          components: ['ESP32 DevKit v1', 'Capacitive Moisture Sensor v1.2', '12V Solenoid Valve', 'Optocoupler Relay Module'],
          description: 'Custom PCB / breadboard circuit with flyback diode protection for inductive solenoid loads.'
        },
        {
          layer: 'Firmware Code',
          components: ['C++', 'FreeRTOS Tasks', 'WiFiClientSecure', 'ArduinoJson'],
          description: 'Multithreaded firmware handling sensor sampling on Core 0 and networking on Core 1.'
        },
        {
          layer: 'Monitoring UI',
          components: ['React', 'Recharts', 'Tailwind CSS'],
          description: 'Real-time telemetry gauges showing moisture levels, battery voltage, and pump status.'
        }
      ],
      challenges: [
        {
          title: 'Resistive Sensor Corrosion vs Capacitive Sensing',
          problem: 'Resistive probes degraded within weeks due to electrochemical electrolysis.',
          solution: 'Upgraded to corrosion-free capacitive sensors with conformal silicone coating for long-term field stability.'
        }
      ],
      resultsAndMetrics: [
        'Demonstrated 32% reduction in water usage across a 3-week botanical test bench',
        '0 sensor degradation over 90 days continuous outdoor deployment'
      ],
      learnings: [
        'Hardware decoupling and power rail noise isolation are vital when triggering inductive loads like 12V relays.'
      ]
    }
  },
  {
    id: 'devpulse-mobile',
    title: 'DevPulse Mobile',
    slug: 'devpulse-mobile-companion',
    tagline: 'Developer companion app for monitoring GitHub build pipelines, issues, and server health on the go.',
    description: 'A mobile developer utility offering real-time push alerts on GitHub workflow status, webhook triggers, server ping telemetry, and quick issue triaging from mobile devices.',
    category: 'Mobile',
    tags: ['Mobile', 'React Native', 'JavaScript', 'Tailwind', 'REST APIs'],
    techStack: ['React Native', 'JavaScript', 'Tailwind CSS', 'Expo', 'GitHub Octokit', 'AsyncStorage'],
    featured: false,
    status: 'Completed',
    githubUrl: 'https://github.com/kunalgavit/devpulse-mobile',
    liveUrl: 'https://github.com/kunalgavit/devpulse-mobile',
    stars: 16,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
    caseStudy: {
      problem: 'Developers often miss critical CI/CD pipeline failures or critical server uptime alarms when away from their workstations.',
      solution: 'Built DevPulse Mobile to deliver instant push notifications, one-click CI re-runs, and server health heartbeat metrics directly on smartphones.',
      role: 'Mobile App Developer',
      teamSize: 'Solo Project',
      timeline: '3 Weeks',
      features: [
        'Real-time CI/CD status badge monitoring for GitHub Actions',
        'Push notifications for build breaks and deployment milestones',
        'Server uptime ping monitor with response latency graphs',
        'Offline caching of recent commit logs and pull request discussions'
      ],
      architectureOverview: 'Lightweight mobile application interfacing directly with GitHub REST API and server health endpoints with encrypted credential storage.',
      architectureLayers: [
        {
          layer: 'Mobile Interface',
          components: ['React Native', 'Expo', 'Lucide Icons'],
          description: 'Haptic-responsive mobile dashboard with dark-mode native feel.'
        },
        {
          layer: 'Telemetry & Cache',
          components: ['AsyncStorage', 'GitHub REST API'],
          description: 'Local encrypted key-value store and background fetch workers.'
        }
      ],
      challenges: [
        {
          title: 'Efficient Background Polling on Mobile',
          problem: 'Battery drain caused by frequent network requests.',
          solution: 'Adopted exponential backoff and silent push webhooks instead of high-frequency polling.'
        }
      ],
      resultsAndMetrics: [
        'Used daily for personal project monitoring and instant deployment notifications',
        'Sub-20ms UI interaction latency on iOS & Android'
      ],
      learnings: [
        'Optimizing battery life through efficient background scheduling in mobile architectures.'
      ]
    }
  }
];

export const projects = projectsData;

