export const learningData = [
  {
    id: 'learn-1',
    topic: 'Agentic AI Architecture & Tool Calling',
    domain: 'Artificial Intelligence',
    whyLearning: 'Modern AI applications require multi-step reasoning, external tool execution, and dynamic context management rather than simple single-prompt completions.',
    progressPercent: 72,
    keyConcepts: [
      'Function calling and schema enforcement',
      'Memory management and scratchpads',
      'Multi-agent orchestration and consensus',
      'Evaluation metrics for LLM agent reliability'
    ],
    curatedResources: [
      { title: 'Google DeepMind GenAI SDK Documentation', type: 'Docs' },
      { title: 'Building Systems with the ChatGPT & Gemini APIs', type: 'Course' },
      { title: 'LangGraph & Agentic Workflow Patterns', type: 'GitHub Repo' }
    ],
    targetGoal: 'Build autonomous coding and circuit verification agents that run reliably without human intervention.'
  },
  {
    id: 'learn-2',
    topic: 'FreeRTOS & Embedded Multithreading on ESP32',
    domain: 'Embedded Systems & IoT',
    whyLearning: 'To build high-performance firmware where sensor sampling, wireless networking, and display updates run asynchronously without blocking critical microcontroller loops.',
    progressPercent: 65,
    keyConcepts: [
      'Task creation, priorities, and stack allocation',
      'Semaphores, Mutexes, and Race Condition Prevention',
      'Queue-based inter-task communication',
      'Hardware interrupt service routines (ISRs)'
    ],
    curatedResources: [
      { title: 'Mastering the FreeRTOS Real Time Kernel', type: 'Book' },
      { title: 'Espressif ESP-IDF Programming Guide', type: 'Docs' }
    ],
    targetGoal: 'Develop enterprise-grade industrial telemetry firmware with dual-core task affinity on ESP32-S3.'
  },
  {
    id: 'learn-3',
    topic: 'Distributed Systems & Database Sharding Patterns',
    domain: 'Backend & Cloud',
    whyLearning: 'Preparing for scalable software engineering roles by mastering high-throughput database designs, caching layers (Redis), and event queues (Kafka / RabbitMQ).',
    progressPercent: 50,
    keyConcepts: [
      'CAP Theorem & Consistency Models',
      'Redis distributed caching & session stores',
      'Message brokers & asynchronous queues',
      'Database connection pooling & indexing strategies'
    ],
    curatedResources: [
      { title: 'Designing Data-Intensive Applications (Martin Kleppmann)', type: 'Book' },
      { title: 'System Design Interview Roadmap', type: 'Course' }
    ],
    targetGoal: 'Architect backend services capable of sustaining 10,000+ real-time concurrent IoT connections.'
  }
];

export const learning = learningData;

