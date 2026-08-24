export const blogs = [
  {
    id: 'article-1',
    slug: 'mit-india-hackathon-2026-lessons',
    title: 'What Building CircuitBotz at MIT India Hackathon 2026 Taught Me About AI + Hardware',
    description: 'A deep dive into the 36-hour sprint of fusing generative AI with physical circuit debugging, handling live hardware failures on stage, and structuring resilient full-stack systems.',
    summary: 'A deep dive into the 36-hour sprint of fusing generative AI with physical circuit debugging, handling live hardware failures on stage, and structuring resilient full-stack systems.',
    date: 'February 2026',
    readingTime: '5 min read',
    readTime: '5 min read',
    author: 'Kunal Gavit',
    category: 'Hackathons',
    tags: ['Hackathons', 'MIT India 2026', 'AI', 'ESP32', 'React', 'Startup Sprint'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    published: true,
    content: `
### The 36-Hour Reality of Hardware Hackathons

Participating in the **MIT India Hackathon 2026** was one of the most intense and rewarding engineering experiences of my college journey. When our team pitched **CircuitBotz**, our premise was simple yet technically daunting: *Can we use multimodal AI to look at physical breadboard wiring and immediately diagnose incorrect connections?*

#### 1. Why AI Alone Fails in Hardware (And How We Solved It)
When you give raw circuit questions to standard LLMs, they will confidently hallucinate nonexistent pin numbers on microcontrollers. An ESP32 does not have 5V outputs on every pin, and feeding 5V into a 3.3V GPIO will fry the silicon.

To prevent this in our hackathon prototype:
- We built a strict **Grounding Verification Layer** in JavaScript.
- The AI was instructed to output pure structured JSON.
- Our custom deterministic rule validator checked every pin number against an in-memory datasheet map before rendering the schematic to the judge screen.

#### 2. The Power of Live Fallbacks
During the final jury demo, a stage Wi-Fi slowdown caused an initial 4-second latency spike. Because we had built an **optimistic local cache** for the 5 most common demo circuits (LED blinkers, relay switches, ultrasonic rangers), the UI transitioned seamlessly without a single awkward silence.

#### 3. Takeaways for Engineering Students
- **Don't just build UI—build systems**: Judges care about why you chose specific architectural boundaries.
- **Fail fast on prototypes**: Breadboards are messy, but clean software interfaces make complex hardware approachable.
- **Team cohesion is everything**: When backend, frontend, and firmware members communicate with typed contracts, 36 hours is more than enough to ship a production-like MVP.
    `,
    contentMarkdown: `
### The 36-Hour Reality of Hardware Hackathons

Participating in the **MIT India Hackathon 2026** was one of the most intense and rewarding engineering experiences of my college journey. When our team pitched **CircuitBotz**, our premise was simple yet technically daunting: *Can we use multimodal AI to look at physical breadboard wiring and immediately diagnose incorrect connections?*

#### 1. Why AI Alone Fails in Hardware (And How We Solved It)
When you give raw circuit questions to standard LLMs, they will confidently hallucinate nonexistent pin numbers on microcontrollers. An ESP32 does not have 5V outputs on every pin, and feeding 5V into a 3.3V GPIO will fry the silicon.

To prevent this in our hackathon prototype:
- We built a strict **Grounding Verification Layer** in JavaScript.
- The AI was instructed to output pure structured JSON.
- Our custom deterministic rule validator checked every pin number against an in-memory datasheet map before rendering the schematic to the judge screen.

#### 2. The Power of Live Fallbacks
During the final jury demo, a stage Wi-Fi slowdown caused an initial 4-second latency spike. Because we had built an **optimistic local cache** for the 5 most common demo circuits (LED blinkers, relay switches, ultrasonic rangers), the UI transitioned seamlessly without a single awkward silence.

#### 3. Takeaways for Engineering Students
- **Don't just build UI—build systems**: Judges care about why you chose specific architectural boundaries.
- **Fail fast on prototypes**: Breadboards are messy, but clean software interfaces make complex hardware approachable.
- **Team cohesion is everything**: When backend, frontend, and firmware members communicate with typed contracts, 36 hours is more than enough to ship a production-like MVP.
    `
  },
  {
    id: 'article-2',
    slug: 'esp32-freertos-iot-architecture-guide',
    title: 'Architecting Production-Ready IoT Telemetry with ESP32 & FreeRTOS',
    description: 'How to structure dual-core ESP32 C++ firmware with non-blocking Wi-Fi queues, deep sleep power management, and real-time React dashboards.',
    summary: 'How to structure dual-core ESP32 C++ firmware with non-blocking Wi-Fi queues, deep sleep power management, and real-time React dashboards.',
    date: 'January 2026',
    readingTime: '7 min read',
    readTime: '7 min read',
    author: 'Kunal Gavit',
    category: 'IoT',
    tags: ['IoT', 'ESP32', 'C++', 'FreeRTOS', 'Telemetry', 'Embedded Systems'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    published: true,
    content: `
### Moving Beyond the Arduino loop() Function

Most beginner IoT tutorials place all sensor reading, delay calls, and Wi-Fi requests into the single \`void loop()\` block. While this works for blinking a single LED on your desk, it completely fails in real-world deployments.

#### The Problem with Blocking Delays
If your Wi-Fi reconnects or experiences a TCP timeout for 3 seconds, your sensor stops sampling, your physical buttons stop responding, and your relay switches might stay stuck in an ON state.

#### The Multithreaded Architecture
With ESP32's dual-core Xtensa processor and FreeRTOS:
1. **Core 0 (Networking Task)**: Dedicated solely to maintaining MQTT/WebSocket connectivity and transmitting outgoing JSON packets.
2. **Core 1 (Sensory & Control Task)**: Strictly samples ADC pins at fixed intervals (e.g. 50ms) using hardware timers and processes emergency shutoff interrupts.
3. **Queue Communication**: Data flows between Core 1 and Core 0 through thread-safe FreeRTOS queues (\`xQueueSend\` and \`xQueueReceive\`), eliminating race conditions and ensuring 0 packet drops.

#### Real-World Battery Optimization
By utilizing ESP32's ULP (Ultra Low Power) co-processor and capacitive touch / RTC wakeups, current draw drops from 80mA down to 10µA during idle periods, extending battery lifespan from 2 days to over 4 months on a single 18650 cell.
    `,
    contentMarkdown: `
### Moving Beyond the Arduino loop() Function

Most beginner IoT tutorials place all sensor reading, delay calls, and Wi-Fi requests into the single \`void loop()\` block. While this works for blinking a single LED on your desk, it completely fails in real-world deployments.

#### The Problem with Blocking Delays
If your Wi-Fi reconnects or experiences a TCP timeout for 3 seconds, your sensor stops sampling, your physical buttons stop responding, and your relay switches might stay stuck in an ON state.

#### The Multithreaded Architecture
With ESP32's dual-core Xtensa processor and FreeRTOS:
1. **Core 0 (Networking Task)**: Dedicated solely to maintaining MQTT/WebSocket connectivity and transmitting outgoing JSON packets.
2. **Core 1 (Sensory & Control Task)**: Strictly samples ADC pins at fixed intervals (e.g. 50ms) using hardware timers and processes emergency shutoff interrupts.
3. **Queue Communication**: Data flows between Core 1 and Core 0 through thread-safe FreeRTOS queues (\`xQueueSend\` and \`xQueueReceive\`), eliminating race conditions and ensuring 0 packet drops.

#### Real-World Battery Optimization
By utilizing ESP32's ULP (Ultra Low Power) co-processor and capacitive touch / RTC wakeups, current draw drops from 80mA down to 10µA during idle periods, extending battery lifespan from 2 days to over 4 months on a single 18650 cell.
    `
  },
  {
    id: 'article-3',
    slug: 'structuring-fullstack-mern-production-apps',
    title: 'Full-Stack Architecture Lessons from Building BinaryBotz E-Commerce',
    description: 'A comprehensive walkthrough of atomic MongoDB transactions, secure payment webhook lifecycles, and high-performance React component trees.',
    summary: 'A comprehensive walkthrough of atomic MongoDB transactions, secure payment webhook lifecycles, and high-performance React component trees.',
    date: 'December 2025',
    readingTime: '6 min read',
    readTime: '6 min read',
    author: 'Kunal Gavit',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Web Security', 'Payment Gateways', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    published: true,
    content: `
### Beyond Basic CRUD: Building Resilient Web Apps

Building an e-commerce platform like **BinaryBotz** required tackling real software engineering problems: state management during multi-item checkouts, payment failure edge cases, and lightning-fast product filtering.

#### 1. Idempotent Payment Webhooks
Never trust client-side callbacks for payment verification. Always listen to server-side webhooks with cryptographic HMAC signatures. If a webhook triggers twice due to network retries, check your database transaction log before mutating order status.

#### 2. Optimistic UI with Rollback
When a user adds a component to their cart, update the cart badge immediately. If the API returns an "Out of Stock" error, gracefully roll back the state and display a non-intrusive toast notification.

#### 3. Modular Code Organization
Keeping data definitions, business logic hooks, and clean presentation components strictly separated is what allows an application to scale from 5 components to 50 without becoming unmaintainable spaghetti code.
    `,
    contentMarkdown: `
### Beyond Basic CRUD: Building Resilient Web Apps

Building an e-commerce platform like **BinaryBotz** required tackling real software engineering problems: state management during multi-item checkouts, payment failure edge cases, and lightning-fast product filtering.

#### 1. Idempotent Payment Webhooks
Never trust client-side callbacks for payment verification. Always listen to server-side webhooks with cryptographic HMAC signatures. If a webhook triggers twice due to network retries, check your database transaction log before mutating order status.

#### 2. Optimistic UI with Rollback
When a user adds a component to their cart, update the cart badge immediately. If the API returns an "Out of Stock" error, gracefully roll back the state and display a non-intrusive toast notification.

#### 3. Modular Code Organization
Keeping data definitions, business logic hooks, and clean presentation components strictly separated is what allows an application to scale from 5 components to 50 without becoming unmaintainable spaghetti code.
    `
  }
];

export const blogArticles = blogs;
export const blogsData = blogs;
