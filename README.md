# Amit Dhiman — Portfolio

Personal portfolio site for Amit Dhiman, Full-Stack and AI Engineer.
Built with React 19, Vite 8, and Tailwind CSS v4.

Live at: https://amitdhiman-dev.github.io/portfolio (or your configured domain)

---

## Tech Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | React 19                                              |
| Build tool | Vite 8                                                |
| Styling    | Tailwind CSS v4 + custom CSS                          |
| Animations | CSS keyframes, Web Animations, requestAnimationFrame  |
| Canvas     | HTML5 Canvas (particle network)                       |
| Confetti   | canvas-confetti                                       |
| Fonts      | Inter (400–800), Space Grotesk (900) via Google Fonts |

---

## Project Structure

```
src/
  components/
    About.jsx           — About section with avatar, cards
    AmbientGlow.jsx     — Mouse-following radial glow (RAF lerp)
    Contact.jsx         — Contact form and social links
    CustomCursor.jsx    — Custom cursor dot and ring with lerp
    Hero.jsx            — Full-screen hero, canvas particles, typewriter
    HorizontalScroll.jsx — Scroll-pinned skills carousel (desktop) / vertical stack (mobile)
    Projects.jsx        — Bento grid project cards with clip-path reveal
    Skills.jsx          — Skills wrapper feeding panels into HorizontalScroll
    Stats.jsx           — Impact metrics with count-up animation
  data/
    portfolio.js        — All content: personal info, projects, skills, nav, contact
  hooks/
    useTextScramble.js  — Character scramble then reveal animation hook
  App.jsx               — Root: nav, scroll observers, progress bar, page sweep
  index.css             — All custom CSS, keyframes, design tokens
  main.jsx              — React DOM entry
public/
  Amit-Dhiman-CV.html   — Downloadable CV
index.html              — HTML shell with OG meta tags
```

---

## Features

- Sticky glassmorphism navigation with active section indicator and hamburger menu on mobile
- Full-screen hero with HTML5 canvas particle network (60 particles, edge bounce, connection lines)
- Text scramble animation on name reveal using a reusable `useTextScramble` hook
- Horizontal scroll-pinned skills section with four panels and a segmented progress bar
  - Falls back to a plain vertical stack on screens narrower than 768px
- Bento grid project cards with clip-path reveal on intersection and 3D tilt on mouse move
- Animated gradient border on featured project card using CSS `@property` for angle interpolation
- Mouse-following ambient glow (600px radial gradient, RAF lerp at factor 0.06)
  - Shifts color on `.btn-primary` hover (sky blue) and project card hover (teal)
- Custom dual cursor: 8px instant dot and 32px lerped ring; semantic `data-cursor` modes:
  `button`, `link`, `text`
- Scroll-reveal entrance animation on all sections (fade + translateY)
- Section transition sweep line (2px purple, 400ms, triggered on section change)
- Giant faded section numbers (Space Grotesk 900, opacity 0.03) in section backgrounds
- Page-load progress bar (indigo, scaleX 0 to 1)
- Hero dot-grid parallax at 0.3x scroll speed
- Count-up animation on stats (requestAnimationFrame)
- Faux terminal typing animation in Lumina project card
- Footer confetti easter egg (canvas-confetti on click)
- Full `prefers-reduced-motion` support: all JS animation branches + CSS overrides
- Touch device support: `cursor: pointer` restored, custom cursor hidden, AmbientGlow disabled
- OG meta tags for social sharing

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Customization

All content — name, bio, projects, skills, contact details, navigation — lives in a single file:

```
src/data/portfolio.js
```

Edit the exported `portfolio` object. No other files need to change for content updates.

---

## Environment

No environment variables or backend required. The contact form currently does not submit to any endpoint — wire it to a service such as Formspree or EmailJS when deploying.

---


