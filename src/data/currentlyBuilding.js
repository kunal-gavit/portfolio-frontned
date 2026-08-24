export const currentlyBuilding = [
  {
    id: 'build-1',
    name: 'CircuitBotz v2 & AI Schematic Validator',
    title: 'CircuitBotz v2 & AI Schematic Validator',
    tagline: 'Upgrading the hardware assistant with vision-based PCB error detection and interactive web breadboards.',
    description: 'Refactoring the core engine to parse user-uploaded circuit photos directly with multimodal AI models, identifying misplaced jumper wires and incorrect resistor color codes in seconds.',
    status: 'In Progress',
    progress: 78,
    progressPercent: 78,
    technologies: ['React', 'JavaScript', 'FastAPI', 'MongoDB', 'Multimodal AI'],
    techStack: ['React', 'JavaScript', 'FastAPI', 'MongoDB', 'Multimodal AI'],
    github: 'https://github.com/kunalgavit/circuitbotz',
    githubUrl: 'https://github.com/kunalgavit/circuitbotz',
    liveDemo: 'https://circuitbotz.demo.app',
    liveUrl: 'https://circuitbotz.demo.app',
    lastUpdated: 'Updated 2 days ago',
    milestones: [
      { label: 'Multimodal schematic image parsing', done: true },
      { label: 'Resistor color band recognition model', done: true },
      { label: 'Interactive WebGL breadboard simulator', done: false },
      { label: 'Public beta release for university cohort', done: false }
    ]
  },
  {
    id: 'build-2',
    name: 'EdgePulse TinyML on ESP32-S3',
    title: 'EdgePulse TinyML on ESP32-S3',
    tagline: 'Running micro neural network inference directly on ESP32 microcontrollers for vibration anomaly detection.',
    description: 'Developing low-power firmware that samples accelerometer data at 100Hz and executes on-device TinyML classification to detect mechanical motor wear without requiring continuous internet connectivity.',
    status: 'In Progress',
    progress: 55,
    progressPercent: 55,
    technologies: ['C++', 'ESP32-S3', 'TinyML', 'Edge Impulse', 'FreeRTOS'],
    techStack: ['C++', 'ESP32-S3', 'TinyML', 'Edge Impulse', 'FreeRTOS'],
    github: 'https://github.com/kunalgavit/edgepulse-tinyml',
    githubUrl: 'https://github.com/kunalgavit/edgepulse-tinyml',
    liveDemo: '',
    liveUrl: '',
    lastUpdated: 'Updated 4 days ago',
    milestones: [
      { label: 'Sensor data collection harness at 100Hz', done: true },
      { label: 'Quantized neural net model training', done: true },
      { label: 'C++ inference loop optimization on FreeRTOS', done: false },
      { label: 'Battery life benchmarking', done: false }
    ]
  },
  {
    id: 'build-3',
    name: 'Agentic DevTools CLI for Microservices',
    title: 'Agentic DevTools CLI for Microservices',
    tagline: 'Terminal-based developer assistant for rapid API scaffolding and OpenAPI contract generation.',
    description: 'An open-source Node.js CLI tool that inspects backend route controllers, auto-generates schema contracts, and provisions Docker compose templates with single commands.',
    status: 'In Progress',
    progress: 35,
    progressPercent: 35,
    technologies: ['Node.js', 'JavaScript', 'Commander.js', 'LLM Tooling'],
    techStack: ['Node.js', 'JavaScript', 'Commander.js', 'LLM Tooling'],
    github: 'https://github.com/kunalgavit/agentic-devtools',
    githubUrl: 'https://github.com/kunalgavit/agentic-devtools',
    liveDemo: '',
    liveUrl: '',
    lastUpdated: 'Updated 1 week ago',
    milestones: [
      { label: 'CLI argument parsing & terminal UI', done: true },
      { label: 'AST JavaScript parser integration', done: false },
      { label: 'Automated test suite generator', done: false }
    ]
  }
];

export const currentlyBuildingData = currentlyBuilding;
