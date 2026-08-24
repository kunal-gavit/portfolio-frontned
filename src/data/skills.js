export const skillCategories = [
  {
    domain: 'Programming',
    description: 'Core computer science fundamentals, algorithmic problem solving, and modern languages.',
    skills: [
      {
        name: 'JavaScript (ES6+)',
        level: 'Core',
        icon: 'FileCode',
        description: 'Asynchronous event loop, promises, closures, modern ES modules, and DOM APIs.',
        projectsUsing: ['BinaryBotz', 'BookSphere', 'Sahayog', 'Portfolio']
      },
      {
        name: 'C / C++',
        level: 'Advanced',
        icon: 'Code2',
        description: 'Embedded firmware, low-level memory management, pointers, and Arduino/ESP32 code.',
        projectsUsing: ['AgriPulse IoT', 'Robotics Firmwares']
      },
      {
        name: 'Python',
        level: 'Advanced',
        icon: 'Terminal',
        description: 'AI scripting, data pipelines, FastAPI backends, automation scripts, and OpenCV.',
        projectsUsing: ['Sahayog', 'AI Experiments', 'Computer Vision']
      },
      {
        name: 'Java',
        level: 'Proficient',
        icon: 'Coffee',
        description: 'Object-oriented programming, data structures, algorithms, and design patterns.',
        projectsUsing: ['Academic Projects', 'DSA Problem Solving']
      }
    ]
  },
  {
    domain: 'Web Development',
    description: 'Modern full-stack web architecture, responsive interfaces, state management, and SPAs.',
    skills: [
      {
        name: 'React.js',
        level: 'Core',
        icon: 'Atom',
        description: 'Hook architecture, Context API, custom hooks, performant rendering, and JSX components.',
        projectsUsing: ['CircuitBotz', 'BinaryBotz', 'Imagify AI', 'BookSphere']
      },
      {
        name: 'Tailwind CSS',
        level: 'Core',
        icon: 'Palette',
        description: 'Utility-first modern styling, responsive layouts, dark-mode theming, and animations.',
        projectsUsing: ['All Web Projects', 'Portfolio UI']
      },
      {
        name: 'HTML5 & CSS3',
        level: 'Core',
        icon: 'Layout',
        description: 'Semantic markup, accessibility (a11y), flexbox/grid layouts, and CSS transitions.',
        projectsUsing: ['Universal Foundation']
      },
      {
        name: 'Framer Motion',
        level: 'Advanced',
        icon: 'Sparkles',
        description: 'Spring physics animations, layout transitions, gesture controls, and scroll reveals.',
        projectsUsing: ['Portfolio UI', 'CircuitBotz']
      }
    ]
  },
  {
    domain: 'Backend',
    description: 'Server architectures, microservices, REST APIs, authentication, and background jobs.',
    skills: [
      {
        name: 'Node.js',
        level: 'Core',
        icon: 'Server',
        description: 'Scalable event-driven backends, asynchronous I/O, file streaming, and npm ecosystems.',
        projectsUsing: ['BinaryBotz', 'CircuitBotz', 'BookSphere']
      },
      {
        name: 'Express.js',
        level: 'Core',
        icon: 'Network',
        description: 'RESTful API routing, middleware chaining, JWT security, and payment integrations.',
        projectsUsing: ['CircuitBotz API', 'BinaryBotz Server']
      },
      {
        name: 'FastAPI',
        level: 'Advanced',
        icon: 'Zap',
        description: 'High-performance asynchronous Python REST APIs for AI model serving and ML inference.',
        projectsUsing: ['Sahayog Voice Assistant']
      },
      {
        name: 'REST APIs & Webhooks',
        level: 'Core',
        icon: 'Workflow',
        description: 'API design, idempotent webhook handlers, rate-limiting, and error handling.',
        projectsUsing: ['BinaryBotz', 'DevPulse Mobile']
      }
    ]
  },
  {
    domain: 'Database',
    description: 'Relational schemas, NoSQL document stores, transactional integrity, and real-time syncing.',
    skills: [
      {
        name: 'MongoDB',
        level: 'Advanced',
        icon: 'Database',
        description: 'Document modeling, aggregation pipelines, Mongoose schemas, and indexing.',
        projectsUsing: ['CircuitBotz', 'BinaryBotz']
      },
      {
        name: 'MySQL',
        level: 'Proficient',
        icon: 'TableProperties',
        description: 'Relational schema design, 3NF normalization, stored procedures, and ACID compliance.',
        projectsUsing: ['BookSphere MITAOE']
      },
      {
        name: 'Firebase Firestore',
        level: 'Advanced',
        icon: 'Flame',
        description: 'Real-time document listeners, security rules, offline persistence, and cloud sync.',
        projectsUsing: ['AgriPulse IoT', 'Mobile Prototypes']
      }
    ]
  },
  {
    domain: 'AI / ML',
    description: 'Generative AI integration, multimodal prompt engineering, and intelligent system workflows.',
    skills: [
      {
        name: 'Generative AI & LLMs',
        level: 'Core',
        icon: 'Sparkles',
        description: 'Structuring system prompts, JSON grounding, and function calling workflows.',
        projectsUsing: ['CircuitBotz Assistant', 'Sahayog', 'Imagify AI']
      },
      {
        name: 'AI APIs (Gemini, OpenAI)',
        level: 'Advanced',
        icon: 'Cpu',
        description: 'Streaming completions, rate limiting, multimodal vision/audio processing, and SDKs.',
        projectsUsing: ['CircuitBotz', 'Imagify AI']
      },
      {
        name: 'Prompt Engineering',
        level: 'Advanced',
        icon: 'MessageSquareCode',
        description: 'Chain-of-thought prompting, role-framing, hallucination guardrails, and deterministic outputs.',
        projectsUsing: ['Imagify AI', 'CircuitBotz']
      },
      {
        name: 'Computer Vision Basics',
        level: 'Proficient',
        icon: 'Eye',
        description: 'OpenCV image processing, edge detection, and object tracking pipelines.',
        projectsUsing: ['Robotics Vision', 'Academic Labs']
      }
    ]
  },
  {
    domain: 'Cloud',
    description: 'Cloud hosting, serverless execution, object storage, and edge deployments.',
    skills: [
      {
        name: 'Vercel / Netlify',
        level: 'Advanced',
        icon: 'CloudUpload',
        description: 'Instant preview deployments, custom domains, environment variables, and edge functions.',
        projectsUsing: ['Web Deployments']
      },
      {
        name: 'AWS Basics',
        level: 'Exploring',
        icon: 'Cloud',
        description: 'EC2 instances, S3 object storage buckets, IAM roles, and basic serverless functions.',
        projectsUsing: ['Cloud Labs', 'Media Storage']
      },
      {
        name: 'Cloudinary CDN',
        level: 'Advanced',
        icon: 'Image',
        description: 'Optimized media asset transformations, responsive image delivery, and cloud uploads.',
        projectsUsing: ['BinaryBotz', 'CircuitBotz']
      }
    ]
  },
  {
    domain: 'Tools',
    description: 'DevOps workflows, version control, API testing suites, and build toolchains.',
    skills: [
      {
        name: 'Git & GitHub',
        level: 'Core',
        icon: 'GitBranch',
        description: 'Branching strategies, pull requests, merge conflict resolution, and GitHub Actions.',
        projectsUsing: ['All Repositories', 'Team Hackathons']
      },
      {
        name: 'Vite & Build Tools',
        level: 'Core',
        icon: 'Zap',
        description: 'Fast HMR, bundle optimization, tree shaking, and modern ESM bundling.',
        projectsUsing: ['Portfolio UI', 'Web Apps']
      },
      {
        name: 'Postman',
        level: 'Advanced',
        icon: 'Send',
        description: 'Endpoint testing, automated test collections, environment variables, and mock servers.',
        projectsUsing: ['Backend Verification']
      },
      {
        name: 'VS Code & CLI',
        level: 'Core',
        icon: 'Terminal',
        description: 'Custom extensions, debugging toolchains, Unix shell commands, and automation scripts.',
        projectsUsing: ['Everyday Development']
      }
    ]
  },
  {
    domain: 'Electronics / IoT',
    description: 'Microcontroller firmware, sensor networks, wireless protocols, and hardware prototyping.',
    skills: [
      {
        name: 'ESP32 & ESP8266',
        level: 'Core',
        icon: 'Radio',
        description: 'Wi-Fi/BLE communication, FreeRTOS multitasking, deep sleep optimization, and web servers.',
        projectsUsing: ['AgriPulse IoT', 'Smart Home Prototypes']
      },
      {
        name: 'Arduino Framework',
        level: 'Core',
        icon: 'Cpu',
        description: 'Hardware interrupts, PWM control, I2C/SPI sensor interfaces, ADC conversions.',
        projectsUsing: ['Robotics Projects', 'Circuit Prototyping']
      },
      {
        name: 'Raspberry Pi',
        level: 'Advanced',
        icon: 'HardDrive',
        description: 'Linux headless setup, GPIO Python scripting, MQTT broker hosting, and camera module processing.',
        projectsUsing: ['IoT Gateway', 'Computer Vision Labs']
      },
      {
        name: 'Sensors & Actuators',
        level: 'Core',
        icon: 'Activity',
        description: 'DHT22, ultrasonic sensors, capacitive moisture, relays, servo/stepper motors, and OLEDs.',
        projectsUsing: ['AgriPulse', 'Robotics Systems']
      },
      {
        name: 'Hardware Prototyping',
        level: 'Advanced',
        icon: 'Wrench',
        description: 'Schematic analysis, breadboard prototyping, circuit debugging with multimeters, power rails.',
        projectsUsing: ['CircuitBotz', 'Hardware Sprints']
      }
    ]
  }
];

export const skillsData = skillCategories;
export const skills = skillCategories;
