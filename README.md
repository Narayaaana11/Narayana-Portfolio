# Arin Pattnaik — Personal Portfolio

An interactive, editorial portfolio showcasing data, machine-learning, and full-stack work. Built with React 19, TypeScript, Tailwind CSS 4, and Motion.

**Live**: [arinpattnaik.me](https://arinpattnaik.me)
**Repository**: [github.com/ArinPattnaik/Arin-s-Website](https://github.com/ArinPattnaik/Arin-s-Website)

## 🆕 What's New in V4 — Complete Theme Overhaul

V4 is a full theme change and rebuild of the site, moving from the previous card-based layout to a warm, editorial "Cantina" art direction.

- **New art direction** — Warm near-black + champagne cream palette, oversized Archivo display type, Space Mono micro-labels, and Inter body copy.
- **Cinematic hero** — Full-bleed looping video with a layered gradient, animated availability badge, and a bold "No Peace Without War." credo.
- **Editorial sections** — Reworked About, alternating Work case-study rows, draggable image gallery, and a five-discipline Studio breakdown.
- **Project case studies** — Dedicated detail pages per project with autoplay demo video, problem/approach narrative, key features, and tech stack.
- **Fullscreen menu** — Drag-to-explore card navigation that works on both desktop and touch.
- **Guestbook** — Visitors can sign the wall, like notes, with built-in spam protection and an admin moderation mode.
- **Mobile-first pass** — Fixed text clipping, draggable menus, and responsive meta so everything reads cleanly on small screens.
- **Leaner project** — Removed unused dependencies and dead config; resolved dependency security advisories.

## ✨ Core Features

- **Smooth scrolling** — Lenis-powered inertia scrolling on desktop.
- **Motion** — Masked line reveals, scroll-linked text, and staggered entrances via Motion.
- **Custom cursor** — A morphing cream cursor that labels interactive targets (desktop).
- **Preloader** — One-per-session intro reveal.
- **Responsive design** — Mobile-first layouts with Tailwind CSS 4.
- **Accessibility** — Respects `prefers-reduced-motion` and includes low-end-device safeguards.
- **TypeScript** — Full type safety across the codebase.

## 🛠 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 19, React Router 7 |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Animation | Motion, Lenis |
| Icons | lucide-react |
| Language | TypeScript 5.8 |

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run the dev server (http://localhost:3000)
npm run dev

# type-check
npm run lint

# production build
npm run build

# preview the production build
npm run preview
```

## 📁 Project Structure

```
public/            Static assets (hero video, project media)
src/
  components/      Reusable UI (cursor, reveals, preloader, marquee)
  data/            Project case-study content
  lib/             Hooks, theme, and utilities
  pages/           Project detail route
  App.tsx          Home page composition
  main.tsx         App entry + routing
```

## 📞 Contact

**Email**: [arinpattnaikofficial@gmail.com](mailto:arinpattnaikofficial@gmail.com)
**Location**: Bhubaneswar, India [20.27° N, 85.84° E]
**GitHub**: [@ArinPattnaik](https://github.com/ArinPattnaik)
**LinkedIn**: [linkedin.com/in/arinpattnaik](https://www.linkedin.com/in/arinpattnaik)

---

**Built with React + Tailwind + Motion**
