# Harsh Bhardwaj — Java Backend Developer Portfolio

Mobile-first, animated personal portfolio website for **Harsh Bhardwaj** (Java Backend Developer | Spring Boot with full-stack exposure), built with React, Vite, Three.js, Framer Motion, and Lenis.

## Tech Stack

- **Framework:** Vite + React 18 (JavaScript)
- **Styling:** Plain CSS with CSS custom properties (`src/styles/variables.css`)
- **3D Graphics:** Three.js via `@react-three/fiber` & `@react-three/drei` (lazy-loaded with mobile particle reduction & `prefers-reduced-motion` support)
- **Motion & Smooth Scroll:** Framer Motion + Lenis
- **Icons:** `react-icons`

## Project Structure

```text
├── index.html                  # SEO meta tags, Open Graph, Twitter Card, JSON-LD Person schema
├── vite.config.js              # Base path '/Harsh_bhardwaj/' for GitHub Pages + chunk splitting
├── public/
│   ├── og-image.jpg            # 1200x630 social sharing preview
│   ├── portrait.webp           # 640x640 optimized WebP portrait
│   ├── resume.pdf              # Downloadable resume linked from Hero CTA
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── data/profile.js         # Single source of truth (personal info, stats, skills, projects, links)
    ├── hooks/useMediaPreferences.js
    ├── utils/techIcons.jsx
    ├── styles/
    │   ├── variables.css
    │   └── global.css
    └── components/
        ├── IntroLoader/        # Terminal boot sequence + split-text intro (React state only)
        ├── CustomCursor/       # Desktop fine-pointer cursor dot + ring
        ├── CommandPalette/     # Ctrl+K quick section & action switcher
        ├── TerminalOverlay/    # Backtick (`) interactive developer shell
        ├── Navbar/
        ├── Hero/               # Split-text Hero + InstancedMesh 3D HeroScene (pauses off-screen)
        ├── About/
        ├── TechStack/
        ├── Architecture/       # Sequential Spring Boot request pipeline + animated packet
        ├── CodingLab/          # Interactive REST endpoint & JWT demo inspector + Maven status
        ├── Projects/           # 12 spotlight/tilt cards + Framer Motion layoutId modal
        ├── Experience/         # Vertical internship timeline
        ├── Education/          # Degrees & certifications
        └── Contact/            # Direct links, copy email, mailto composer, footer
```

## Updating Content & Project Links

All personal content, metrics, skills, project bullets, internships, education, and placeholder GitHub/live URLs live in [`src/data/profile.js`](src/data/profile.js). Update `PROJECT_LINKS` at the top of that file to point to live deployments and repositories.

## Local Development

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173/Harsh_bhardwaj/` (matching the configured `base` path).

## Production Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Ensure the GitHub repository is named `Harsh_bhardwaj` under user `Harsh20-gif` (or update `base` in `vite.config.js` and canonical URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml` to match your repository name).
2. Run the deploy script:

```bash
npm run deploy
```

This runs `vite build` and publishes the `dist/` folder to the `gh-pages` branch via `gh-pages`.
