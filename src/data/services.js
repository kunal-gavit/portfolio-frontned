export const servicesData = [
  {
    id: 'srv-web',
    title: 'Full-Stack Web Applications',
    category: 'Software Engineering',
    description: 'Custom, scalable, and responsive web platforms built with React, JavaScript, Node.js, and modern databases.',
    features: [
      'Responsive, high-performance SPAs and SSR portals',
      'Secure RESTful API design and JWT authentication',
      'Database modeling with MongoDB / MySQL / Firestore',
      'Payment gateway and webhook integrations (Stripe / Razorpay)'
    ],
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS'],
    icon: 'Layout',
    idealFor: 'Startups, campus tools, SaaS products, and digital business portals.'
  },
  {
    id: 'srv-ai',
    title: 'AI Integration & Smart Workflows',
    category: 'Artificial Intelligence',
    description: 'Embedding generative AI, LLM APIs, and intelligent automation into existing or new applications.',
    features: [
      'Prompt engineering with strict JSON output grounding',
      'Multimodal image, audio, and text analysis pipelines',
      'Conversational assistants and automated document processing',
      'API rate limiting, streaming responses, and latency caching'
    ],
    technologies: ['Gemini AI API', 'OpenAI SDK', 'FastAPI / Node.js', 'LangChain Basics'],
    icon: 'Sparkles',
    idealFor: 'Products needing intelligent assistants, auto-summarization, or generative features.'
  },
  {
    id: 'srv-iot',
    title: 'IoT & Embedded Hardware Prototypes',
    category: 'Hardware & Systems',
    description: 'End-to-end microcontroller firmware, sensor telemetry, and cloud dashboard monitoring.',
    features: [
      'ESP32 & Arduino C++ firmware development',
      'Wi-Fi, Bluetooth Low Energy (BLE), and MQTT telemetry',
      'Sensor interfacing (Temperature, Moisture, Ultrasonic, Relays)',
      'Real-time cloud synchronization to web/mobile dashboards'
    ],
    technologies: ['ESP32', 'Arduino', 'C++', 'Firebase RTDB', 'WebSockets', 'Sensors'],
    icon: 'Cpu',
    idealFor: 'Smart home prototypes, agricultural telemetry, robotics and hardware MVPs.'
  },
  {
    id: 'srv-hackathon',
    title: 'Rapid Hackathon MVPs & Prototyping',
    category: 'Product & Prototyping',
    description: 'Fast-paced 24-48 hour proof-of-concept builds that look polished, work reliably, and win pitches.',
    features: [
      'High-velocity UI/UX design and frontend implementation',
      'Full-stack architecture setup ready for judge demos',
      'Integrated live demo fallbacks and mock resilience',
      'Pitch deck alignment with technical architecture'
    ],
    technologies: ['React', 'Tailwind CSS', 'FastAPI / Node', 'Cloud Deployment'],
    icon: 'Trophy',
    idealFor: 'Hackathon teams, startup idea validation, and accelerator sprint demos.'
  }
];

export const services = servicesData;

