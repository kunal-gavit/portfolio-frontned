# Kunal Gavit — Developer Portfolio & Startup Showcase

A modern, high-performance developer portfolio built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion** — written entirely in **pure JavaScript and JSX** (`.js`, `.jsx`).

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18.18+ or v20+)
- **npm** (or `pnpm` / `bun`)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables (Optional)
Copy the example environment file:
```bash
cp .env.example .env.local
```
Set your environment variables (e.g. contact backend URL) if needed.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## ✨ Features & Architecture

- **Next.js App Router**: Optimized static site generation (SSG) with `src/app/layout.jsx`, `src/app/page.jsx`, and `src/app/resume/page.jsx`.
- **Pure JavaScript & JSX**: 100% type-free codebase (`.js`, `.jsx`) with zero TypeScript dependencies.
- **Hero & Interactive Intro**: Animated developer code card (`kunal.config.js`), live telemetry, and configurable social profiles.
- **Comprehensive Resume System**:
  - Interactive modal with **Download**, **View in New Tab**, and **Print** options.
  - Dedicated `/resume` route with `@media print` A4 layout optimization.
- **Case Studies & Projects**: 6 filter categories (`All`, `Web`, `AI`, `IoT`, `Mobile`, `Hackathon`) and in-depth architecture modal.
- **Skills Matrix**: 8 curated domain categories (`Programming`, `Web Development`, `Backend`, `Database`, `AI / ML`, `Cloud`, `Tools`, `Electronics / IoT`).
- **GitHub Integration**: Deterministic 52-week activity heatmap, repository cards, and live GitHub API connector with fallback.
- **Hackathons**: Featured highlight for **MIT India Hackathon 2026**.
- **Verified Credentials**: Filterable certifications (`AI`, `Cloud`, `Development`, `Programming`, `Other`) with verification links.
- **Contact Form**: Multi-state transmission flow (`Idle`, `Loading`, `Success`, `Error`) with modular API layer.
- **Command Palette (`Ctrl + K`)**: Keyboard-driven quick navigation across all sections, socials, and actions.
- **Custom Cursor & Easter Egg**: Desktop ambient glow tracker and `sudo kunal` developer terminal.

---

## 📂 Project Structure

```
kunal-gavit---developer-portfolio/
├── next.config.mjs          # Next.js configuration (remote image patterns)
├── postcss.config.mjs       # Tailwind CSS v4 PostCSS plugin
├── package.json             # Pure JS scripts & Next.js dependencies
├── public/                  # Static assets (favicons, resume PDFs, images)
└── src/
    ├── app/
    │   ├── globals.css      # Design tokens, scrollbar & print CSS
    │   ├── layout.jsx       # Root server layout & SEO metadata
    │   ├── page.jsx         # Main portfolio entry page
    │   └── resume/
    │       └── page.jsx     # Standalone /resume route
    ├── components/          # Reusable UI sections & modals (.jsx)
    ├── data/                # Data models (.js)
    ├── hooks/               # Custom hooks (useTheme.js)
    └── lib/                 # Utilities, API client & analytics (.js)
```

---

## 📄 License
MIT License © Kunal Gavit
# portfolio-frontned
