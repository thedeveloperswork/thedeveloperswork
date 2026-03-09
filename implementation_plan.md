# Next.js Portfolio Architecture Plan

## 1. Goal Description
The user wants to replace their existing Vite/React SPA portfolio (`d:\github\developerswork\portfolio\portfolio`) with a newly generated, modern `Next.js` application. The existing codebase will serve as a reference for current knowledge, standards, and practices, but the actual implementation will be a fresh start. The design must be modern, highly aesthetic, and follow the [SKILL.md](file:///d:/github/developerswork/portfolio/.agent/skills/resume/SKILL.md) directives to display the full historical spectrum of their career.

## 2. Analysis of Existing Codebase
- **Tech Stack:** React 19, Vite, Material UI (`@mui/material`), Styled Components, Redux Toolkit, React Router DOM, Framer/Emotion.
- **Features implied by dependencies:** Theme switching/styling (Emotion/Styled Components), scroll behaviors (`react-scroll`), typewriter effects (`typewriter-effect`), state management (`redux`).

## 3. Proposed Next.js Architecture
- **Framework:** Next.js (App Router, React 19).
- **Language:** TypeScript (for robust data modeling of the markdown assets).
- **Styling:** Vanilla CSS / CSS Modules (as mandated by system web-dev guidelines, unless Tailwind is explicitly approved). *We will use highly polished CSS for glassmorphism, gradient text, and animations.*
- **Data Sourcing:** We will build a utility to parse the existing `assets/` Markdown files natively using Node `fs` and `gray-matter` (or a similar MD parser) to populate the frontend statically at build time.
- **Deployment:** Vercel (Standard Next.js hosting) or static export for GH Pages.

## 4. Proposed Changes to [SKILL.md](file:///d:/github/developerswork/portfolio/.agent/skills/resume/SKILL.md)
We will update [d:\github\developerswork\portfolio\.agent\skills\portfolio\SKILL.md](file:///d:/github/developerswork/portfolio/.agent/skills/portfolio/SKILL.md) to explicitly state:
1. The framework is strictly **Next.js**.
2. Start from a **completely fresh codebase** using `npx create-next-app@latest`.
3. Integrate the existing data from `assets/` dynamically.
4. Mandate high-end modern aesthetics (dark mode, glassmorphism, micro-animations).

## 5. User Review Required
> [!IMPORTANT]
> - Do you approve using **TypeScript** for the new Next.js project?
> - The global system guidelines prefer **Vanilla CSS** for styling to ensure maximum customization, but your old project used Material-UI & Styled Components. Do you want to stick to Vanilla CSS (highly aesthetic) or use a modern utility framework like TailwindCSS/Framer Motion for the new Next.js build?
> - Where should the new Next.js project be initialized? Should we delete the contents of `portfolio/` and run `npx create-next-app` inside it?
