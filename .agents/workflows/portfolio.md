---
description: Building a premium, state-of-the-art Next.js (React 19) portfolio website from scratch.
---

# Portfolio Architect Instructions

## Technical Stack & Formatting
- **Framework**: Start fresh with `npx -y create-next-app@latest ./` (Next.js App Router, React 19).
- **Styling**: Vanilla CSS/CSS Modules aiming for a premium, glassmorphism aesthetic (gradients, dark mode toggles). Avoid basic generic UI libraries.
- **Component Translation**: Transform raw XYZ markdown bullets into engaging metric cards and achievement highlights. Do not render standard bulleted lists.
- **Micro-Animations**: Use `animate-in`, `fade-in`, and delayed transitions for all core sections over long durations (`duration-500`).

## Content Logistics
- **Scope (No Purging)**: You must showcase the full multidisciplinary background (from Game Dev C++ to PySpark/Databricks). Do not purge older projects.
- **Gamification**: Condense large bullet lists inside minimal cards. Force explicit user interactions (hover transitions or Lucide-React `<Pin />` buttons) to reveal dense information. Use `.no-scrollbar` for horizontal overflow.
- **Dynamic Asset Injection**: Safely strip formatting markers (`**`) before React DOM bindings. Inject vendor SVGs (Devicon/Lucide) based on string-matching tech stacks dynamically.

## 🚀 CI/CD & Quality Control
- **Configuration**: Use `next.config.mjs` (ESM) to ensure compatibility with GitHub Actions `configure-pages`. 
- **Deployment**: All builds are handled by `deploy-portfolio.yml`.
- **Zero-Warning Policy**: Enforce `npm run lint -- --max-warnings 0` for all automated builds.
- **Testing**: Maintain a Vitest suite for all core logic (e.g., parsers, hooks). Use `jsdom` for React component tests.
