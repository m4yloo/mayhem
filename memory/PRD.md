# Tyler Durden 5-Day Split — Viewer

## Original problem statement
> make me a viewer for this, AND AWWWARDS STYLE, and creative, and just a viewer nothing else not a tracker, just for me to view this in a cool way, NO RGB BULLSHIT OR ANYTHING ELSE JUST FOR ME TO VIEW THIS

Attached source: `tyler_durden_5day_split.html` (7 day cards, 5 training + 2 rest).

## User choices
- Aesthetic: **Fight Club** (raw / brutalist mono, bone + ink, stencil display)
- Animation intensity: **Fight Club** (bold — preloader, marquees, scroll reveals, custom cursor)

## Architecture
- Pure frontend React viewer. **No backend, no database, no tracking.**
- Data lives in `/app/frontend/src/data/workout.js` (read-only)
- Tailwind + framer-motion + Google Fonts (Big Shoulders Stencil Display, Special Elite, JetBrains Mono)

## Components (all under `/app/frontend/src/components/viewer/`)
- `Viewer.jsx`     – page composition + IntersectionObserver for active day
- `Preloader.jsx`  – boot screen ("you don't talk about the gym")
- `Hero.jsx`       – TYLER / DURDEN / 5·DAY·SPLIT masthead with masked reveals
- `DaySection.jsx` – per-day layout (alternating sides, hover-shift exercises)
- `Marquee.jsx`    – infinite stencil ticker (3 instances; one in soap pink)
- `SideNav.jsx`    – fixed right-edge 01–07 day jumper
- `Cursor.jsx`     – custom dot + lerped ring with hover scale to soap pink
- `Footer.jsx`     – bone-paper closer with all 8 house rules

## What's implemented (2026-02-13)
- 7 day sections rendered from source HTML data, verbatim exercises/sets/notes
- Preloader → hero → 7 days (with 2 rest panels) → footer flow
- Animations: masked text reveal, staggered exercise entry, hover slide + soap-pink underline
- Read-only — no inputs, no checkboxes, no progress, no streaks, no analytics
- Mobile responsive grid for exercise rows

## Verified
Frontend smoke test passed: all 7 day wraps OK, 5×6 exercises, 2 rest panels, 3 marquees, side-nav, cursor, hero, footer present, jump-to-day works.

## Backlog / Next
- P2: keyboard arrow nav between days
- P2: print stylesheet for offline reading
- P2: optional audio cue toggle (single soap-pink toggle, off by default)
