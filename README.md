# Lumora — Cinematic Hero Section

A fullscreen, cinematic hero section for **Lumora**, a mindfulness/focus app.
Built with React + TypeScript, Tailwind CSS, and Lucide React icons.

## Features

- 4 crossfading looping background videos with a labeled switcher
- Animated transparent PNG overlay ("train-bob" motion)
- Custom `.liquid-glass` frosted-glass UI treatment
- Automatic dark-mode palette swap for the "Deep Woods" video
- Responsive nav: desktop pill nav / mobile hamburger with a staggered
  fullscreen menu
- Instrument Serif display font (Google Fonts) + system-ui body font

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
lumora/
├── index.html              # HTML shell, Google Fonts preconnect
├── src/
│   ├── main.tsx             # React entry point
│   ├── App.tsx               # Hero section component
│   └── index.css              # Tailwind + liquid-glass + animations
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── tsconfig.json
```

## Notes

- All background video URLs are hosted externally and loaded directly
  via `<video>` tags — no local assets required.
- `prefers-reduced-motion` is respected: the overlay bob animation and
  transition durations collapse for users who request reduced motion.
