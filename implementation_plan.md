# FUSION X '26 — KiTE Intercollegiate Technical Symposium
## Implementation Plan & Architecture Blueprint

> **Version:** 1.0  
> **Date:** March 2, 2026  
> **Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Lenis

---

## 1. Project Overview

**FUSION X '26** is the website for KiTE's one-day intercollegiate technical symposium on **March 27, 2026**. The design philosophy mirrors cinematic flagship product sites (Jesko Jets aesthetic): deep dark backgrounds, scroll-driven canvas animations, gold accent typography, and luxury editorial layouts.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR/SSG, routing, image optimization |
| Language | TypeScript 5 | Type safety across all components |
| Styling | Tailwind CSS 3.4 | Utility-first responsive styling |
| Animation | Framer Motion 11 | Spring animations, scroll-linked transforms |
| Smooth Scroll | @studio-freight/lenis ^1.0.42 | Physics-based scroll smoothing |
| Fonts | Geist (Sans + Mono) | Premium editorial typography |

---

## 3. Project Structure

```
fusionx-kite-26/
├── public/
│   ├── sequence-1/              # Hero scroll frames (001–147)
│   │   ├── ezgif-frame-001.jpg
│   │   └── ... (147 frames)
│   ├── sequence-2/              # Plane morph frames (148–294)
│   │   ├── ezgif-frame-148.jpg
│   │   └── ... (147 frames)
│   └── globe-loop.mp4           # Globe background video (looping)
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles, Tailwind layers, utilities
│   │   ├── layout.tsx           # Root layout with metadata + LenisProvider
│   │   └── page.tsx             # Home page - assembles all sections
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Sticky nav with scroll-aware transparency
│   │   │   └── Footer.tsx       # Footer with links, event info, branding
│   │   ├── sections/
│   │   │   ├── HeroScroll.tsx   # Canvas-based scrollytelling (sequence-1)
│   │   │   ├── AboutSection.tsx # Stats, description, participation rule
│   │   │   ├── PlaneMorph.tsx   # Canvas scrollytelling (sequence-2)
│   │   │   ├── EventsSection.tsx # Filterable event grid + detail modal
│   │   │   ├── RulesSection.tsx  # Animated accordion for all event rules
│   │   │   ├── CountdownSection.tsx # Live countdown timer to March 27
│   │   │   ├── GlobeSection.tsx  # HTML5 video globe with text overlay
│   │   └── providers/
│   │       └── LenisProvider.tsx # Client-side Lenis smooth scroll init
│   │   └── ui/
│   │       ├── EventCard.tsx    # Individual event card with hover state
│   │       └── MarqueeStrip.tsx # Auto-scrolling event names strip
│   ├── hooks/
│   │   ├── useImagePreloader.ts # Preloads image sequences into cache
│   │   └── useScrollCanvas.ts   # Maps scroll position to canvas frame draw
│   └── lib/
│       ├── events.ts            # All event data, rules, types, constants
│       └── utils.ts             # cn(), lerp(), clamp(), mapRange()
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 4. Asset Strategy

### 4.1 Frame Sequences

| Directory | Frames | Range | Section |
|-----------|--------|-------|---------|
| `/public/sequence-1/` | 147 | `ezgif-frame-001.jpg` → `ezgif-frame-147.jpg` | HeroScroll |
| `/public/sequence-2/` | 147 | `ezgif-frame-148.jpg` → `ezgif-frame-294.jpg` | PlaneMorph |

Naming convention: `ezgif-frame-NNN.jpg` (3-digit zero-padded).

### 4.2 Globe Video
- Place at `/public/globe-loop.mp4`
- Must be `autoPlay`, `loop`, `muted`, `playsInline`
- Rendered with `object-cover` filling the section container

---

## 5. Core Animation Mechanics

### 5.1 Scroll-Canvas System

**`useImagePreloader` hook** (`src/hooks/useImagePreloader.ts`)
```typescript
// Creates HTMLImageElement[] array from a URL pattern
// Tracks loadedCount + progress (0–1) for loading UI
// Input: basePath, prefix, count, padLength, extension, startIndex
```

**`useScrollCanvas` hook** (`src/hooks/useScrollCanvas.ts`)
```typescript
// Attaches a scroll listener to window
// Calculates scroll progress: (scrollTop - containerTop) / (containerHeight - viewport)
// Maps progress to frameIndex: Math.floor(progress * (images.length - 1))
// Draws to canvas with cover-fit logic (matches CSS object-cover behavior)
```

### 5.2 HeroScroll Section
- Container height: `400vh` (sticky 100vh viewport)
- Frames: sequence-1 (001–147)
- Text overlay with `useTransform` fades & translates Y on scroll progress 0→0.25
- Loading bar shows preload progress

### 5.3 PlaneMorph Section
- Container height: `350vh`
- Frames: sequence-2 (148–294)
- Text content fades IN at scroll 0.1→0.3, fades OUT at 0.7→0.9

### 5.4 Lenis Smooth Scroll
```typescript
// duration: 1.4, easing: exponential decay
// smoothWheel: true, wheelMultiplier: 0.8
// Runs its own rAF loop; compatible with Framer Motion useScroll
```

---

## 6. Section-by-Section Breakdown

### Section 1: `<HeroScroll />`
- **Scroll height:** 400vh (sticky)
- **Effect:** Full-screen canvas driven by scroll position
- **Overlay:** Brand name "FUSION X '26", tagline, date badge — fade+translateY out at 25% scroll
- **Scroll indicator:** Animated line bounces at bottom, fades at 10% scroll

### Section 2: `<AboutSection />`
- **Layout:** 2-col grid (heading left, glass card right)
- **Stats:** Days:10, Categories:2, Day:1, Memories:∞
- **Animation:** Text slides up on inView, card slides in from right
- **Participation rule** prominently displayed with accent border

### Section 3: `<PlaneMorph />`
- **Scroll height:** 350vh (sticky)
- **Effect:** Frame sequence with centered "Compete Across 10 Disciplines" copy
- **Typography:** `text-gradient-gold` utility class applied to number

### Section 4: `<EventsSection />`
- **Filter tabs:** All / Technical / Non-Tech
- **Grid:** Responsive (1 → 2 → 3 → 4 columns)
- **Event card hover:** Bottom accent line scales from left, arrow appears, description truncated
- **Modal:** Frosted glass modal on click — shows full rules list
- **Marquee strip:** Auto-scrolling event names ticker at top of section

### Section 5: `<RulesSection />`
- **Layout:** Full-width accordion list
- **Behavior:** One accordion open at a time, animated height with Framer `AnimatePresence`
- **Each item:** Event ID (monospace), icon, name, category badge
- **Rule items:** Numbered with monospace "—" prefix

### Section 6: `<CountdownSection />`
- **Live ticker:** Updates every 1s via `setInterval`
- **Target:** `new Date("2026-03-27T09:00:00+05:30")`
- **CTA buttons:** Primary (gold fill) → Register Now; Secondary (border) → View Events
- **Background:** Radial bokeh glow centered in section

### Section 7: `<GlobeSection />`
- **Video:** `/globe-loop.mp4` — autoPlay, muted, loop, playsInline, object-cover
- **Z-stack:** video(z-0) → blend overlays(z-10) → text(z-20)
- **Gradient overlays:** top fade + bottom fade (both using `from-background`)
- **Copy:** "Open to All." / "Built for the Best."

### Section 8: `<Footer />`
- **3 columns:** Brand · Quick Links · Event Details
- **Bottom bar:** copyright + tagline

---

## 7. Color System

```css
--background: #050505       /* Page background */
--surface:    #0d0d0d       /* Card/panel surfaces */
--border:     #1a1a1a       /* Borders and dividers */
--accent:     #c8a96e       /* Gold — primary accent */
--accent-muted: #8b7245     /* Darker gold variant */
--text-primary:   #f0ece4   /* Near-white headings */
--text-secondary: #7a776e   /* Body text */
--text-muted:     #3d3b37   /* Labels, captions */
```

---

## 8. Typography Rules

| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Hero title | `clamp(3rem, 10vw, 9rem)` | 700 | -0.02em |
| Section h2 | `clamp(1.8rem, 5vw, 4.5rem)` | 700 | tight |
| Labels | 9–10px | 400 | 0.4em (ultrawide) |
| Body | 14px | 400 | normal |
| Mono counters | `clamp(2rem, 6vw, 5rem)` | 700 | tabular-nums |

---

## 9. Event Data Reference

### Technical Events (8 total)
| # | Event | Team Size |
|---|-------|-----------|
| 1 | Paper Presentation | Max. 3 |
| 2 | Project Expo | Max. 3 |
| 3 | Poster Presentation | Max. 2 |
| 4 | Quiz | 2 |
| 5 | Vibathon | 2–4 |
| 6 | Build a Circuit | 2–4 |
| 7 | UI/UX Design Challenge | Max. 3 |
| 8 | Logo Design Challenge | Max. 3 |

### Non-Technical Events (2 total)
| # | Event | Team Size |
|---|-------|-----------|
| 9 | BGMI | Max. 4 |
| 10 | FREE FIRE | Max. 4 |

**Critical Rule:** _One participant may register for maximum 2 events: 1 Technical + 1 Non-Technical OR 2 Technical events._

---

## 10. Performance Checklist

- [x] Canvas drawing happens only in scroll handler (no rAF polling)
- [x] All images preloaded into `HTMLImageElement[]` array before rendering
- [x] Lenis `raf` loop runs in `useEffect`, cleaned up on unmount
- [x] `next.config.mjs` sets `images.unoptimized: true` for static JPEG sequences
- [x] `passive: true` scroll listener on all `window.scroll` events
- [x] Canvas cover-fit logic avoids distortion at any aspect ratio
- [x] `AnimatePresence mode="popLayout"` for grid re-ordering

---

## 11. Development Commands

```bash
# Install dependencies
npm install

# Start dev server (default port 3000)
npm run dev

# Type check (no emit)
npx tsc --noEmit

# Production build
npm run build

# Start production server
npm start
```

---

## 12. Deployment Notes

1. All frame assets (294 JPEGs) are served from `/public/` — no CDN needed for local/Vercel deployment
2. `globe-loop.mp4` should be compressed to <5MB using `ffmpeg -crf 28` for fast load
3. Frame sequences total ~5–8MB; preloader shows progress UI during load
4. Vercel-ready: zero custom server configuration needed

---

## 13. Extending / Customization

| Task | File to Edit |
|------|-------------|
| Change event data/rules | `src/lib/events.ts` |
| Change colors | `tailwind.config.ts` → `theme.extend.colors` |
| Adjust scroll speed | `src/components/providers/LenisProvider.tsx` → `duration` |
| Add new sections | `src/app/page.tsx` → import and insert component |
| Change frame count | `src/lib/events.ts` → `SEQUENCE_1_COUNT` / `SEQUENCE_2_COUNT` |
| Change countdown target | `src/lib/events.ts` → `SYMPOSIUM_DATE` |

---

*Blueprint authored for FUSION X '26 · KiTE Intercollegiate Technical Symposium · March 27, 2026*
