import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useMediaPreferences } from './hooks/useMediaPreferences';
import IntroLoader from './components/IntroLoader/IntroLoader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import TechStack from './components/TechStack/TechStack';
import Architecture from './components/Architecture/Architecture';
import CodingLab from './components/CodingLab/CodingLab';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';

const CommandPalette = lazy(() => import('./components/CommandPalette/CommandPalette'));
const TerminalOverlay = lazy(() => import('./components/TerminalOverlay/TerminalOverlay'));

export default function App() {
  const { isMobile, prefersReducedMotion } = useMediaPreferences();
  const lenisRef = useRef(null);

  // React state only (no sessionStorage/localStorage) for intro boot gating
  const [introDone, setIntroDone] = useState(prefersReducedMotion);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(prefersReducedMotion);
  const [modalOpen, setModalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const anyOverlayOpen = modalOpen || paletteOpen || terminalOpen;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroDone(true);
      setHasPlayedIntro(true);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (anyOverlayOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [anyOverlayOpen]);

  // Global keyboard shortcuts: Ctrl/Cmd+K (Command Palette) & ` (Terminal)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((prev) => !prev);
        return;
      }

      const tag = e.target?.tagName?.toLowerCase();
      const isEditable =
        tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;

      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (isEditable && !terminalOpen) return;
        e.preventDefault();
        setPaletteOpen(false);
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [terminalOpen]);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    setHasPlayedIntro(true);
  }, []);

  const handleReplayIntro = useCallback(() => {
    if (prefersReducedMotion) return;
    setIntroDone(false);
    setHasPlayedIntro(false);
  }, [prefersReducedMotion]);

  const handleNavigate = useCallback((target) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64 });
    } else {
      const id = target.replace(/^#/, '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {!hasPlayedIntro && (
        <IntroLoader
          onComplete={handleIntroComplete}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      <CustomCursor isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />

      {paletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette
            open={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            onNavigate={handleNavigate}
            onOpenTerminal={() => setTerminalOpen(true)}
            onReplayIntro={handleReplayIntro}
          />
        </Suspense>
      )}

      {terminalOpen && (
        <Suspense fallback={null}>
          <TerminalOverlay
            open={terminalOpen}
            onClose={() => setTerminalOpen(false)}
          />
        </Suspense>
      )}

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar
        onNavigate={handleNavigate}
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <main id="main-content">
        <Hero
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
          introDone={introDone}
          onNavigate={handleNavigate}
        />
        <About prefersReducedMotion={prefersReducedMotion} />
        <TechStack isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
        <Architecture prefersReducedMotion={prefersReducedMotion} />
        <CodingLab prefersReducedMotion={prefersReducedMotion} />
        <Projects
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
          onModalChange={setModalOpen}
        />
        <Experience prefersReducedMotion={prefersReducedMotion} />
        <Education prefersReducedMotion={prefersReducedMotion} />
        <Contact
          prefersReducedMotion={prefersReducedMotion}
          onNavigate={handleNavigate}
        />
      </main>
    </>
  );
}
