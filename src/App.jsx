import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useMediaPreferences } from './hooks/useMediaPreferences';
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

export default function App() {
  const { isMobile, prefersReducedMotion } = useMediaPreferences();
  const lenisRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
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
    if (modalOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [modalOpen]);

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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar onNavigate={handleNavigate} />

      <main id="main-content">
        <Hero
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
          onNavigate={handleNavigate}
        />
        <About prefersReducedMotion={prefersReducedMotion} />
        <TechStack isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
        <Architecture prefersReducedMotion={prefersReducedMotion} />
        <CodingLab prefersReducedMotion={prefersReducedMotion} />
        <Projects
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
