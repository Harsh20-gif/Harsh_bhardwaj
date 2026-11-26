import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaServer,
} from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import { triggerTapRipple } from '../../utils/tapRipple';
import './Hero.css';

const HeroScene = lazy(() => import('./HeroScene'));

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

function useTypingRole(roles, disabled) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charCount, setCharCount] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const current = roles[roleIdx];

    let delay = deleting ? 32 : 56;
    if (!deleting && charCount === current.length) {
      delay = 1850;
    } else if (deleting && charCount === 0) {
      delay = 280;
    }

    const timer = setTimeout(() => {
      if (!deleting && charCount < current.length) {
        setCharCount((c) => c + 1);
      } else if (!deleting && charCount === current.length) {
        setDeleting(true);
      } else if (deleting && charCount > 0) {
        setCharCount((c) => c - 1);
      } else {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [roles, roleIdx, charCount, deleting, disabled]);

  if (disabled) return roles[0];
  return roles[roleIdx].slice(0, charCount);
}

function MagneticButton({ children, className = '', isMobile, prefersReducedMotion, onClick, ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <a
      {...props}
      className={`btn ripple-host ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        triggerTapRipple(e);
        onClick?.(e);
      }}
      style={
        !isMobile && !prefersReducedMotion
          ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }
          : undefined
      }
    >
      {children}
    </a>
  );
}

export default function Hero({
  isMobile,
  prefersReducedMotion,
  introDone,
  onNavigate,
}) {
  const { personal } = PROFILE;
  const typedText = useTypingRole(personal.rolesTyped, prefersReducedMotion);

  const heroRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [mountScene, setMountScene] = useState(false);
  const [portraitTilt, setPortraitTilt] = useState({ rx: 0, ry: 0 });

  // Pause 3D render loop when Hero scrolls out of view
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Defer lazy 3D mount until intro completes & browser is idle so gradient + LCP paint first
  useEffect(() => {
    if (prefersReducedMotion || !introDone) return;
    let cancelled = false;
    const schedule = () => {
      if (!cancelled) setMountScene(true);
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(schedule, { timeout: 600 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = setTimeout(schedule, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [prefersReducedMotion, introDone]);

  const handlePortraitMove = (e) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setPortraitTilt({
      rx: (0.5 - py) * 14,
      ry: (px - 0.5) * 14,
    });
  };

  const handlePortraitLeave = () => {
    setPortraitTilt({ rx: 0, ry: 0 });
  };

  const letters = personal.name.split('');
  const staticFallback = <div className="hero__fallback-bg" aria-hidden="true" />;

  return (
    <section id="hero" ref={heroRef} className="hero">
      {staticFallback}

      {mountScene && !prefersReducedMotion && (
        <div className="hero__canvas-wrap" aria-hidden="true">
          <SceneErrorBoundary fallback={staticFallback}>
            <Suspense fallback={null}>
              <HeroScene isMobile={isMobile} isHeroVisible={isHeroVisible} />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__status">
            <span className="hero__status-dot" aria-hidden="true" />
            <span className="mono">{personal.liveStatusChip}</span>
          </div>

          <h1 className="hero__name" aria-label={personal.name}>
            <span aria-hidden="true" className="hero__name-split">
              {letters.map((char, idx) => (
                <motion.span
                  key={`${char}-${idx}`}
                  className="hero__name-char"
                  initial={prefersReducedMotion ? false : { y: 12 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.32,
                    delay: prefersReducedMotion ? 0 : idx * 0.018,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="hero__role">
            <span className="hero__role-prefix mono">&gt;_</span>{' '}
            <span>{typedText}</span>
            {!prefersReducedMotion && <span className="hero__cursor" aria-hidden="true" />}
          </p>

          <p className="hero__summary">{personal.tagline}</p>

          <div className="hero__meta mono">
            <span>
              <FaLocationDot aria-hidden="true" />
              {personal.location}
            </span>
            <span>
              <FaServer aria-hidden="true" />
              Spring Boot · JWT · MySQL
            </span>
          </div>

          <div className="hero__actions">
            <MagneticButton
              href="#projects"
              className="btn-primary"
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('#projects');
                }
              }}
            >
              <span>View Projects</span>
              <FaArrowRight aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              href={personal.resumeUrl}
              className="btn-secondary"
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
              download="Harsh_Bhardwaj_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload aria-hidden="true" />
              <span>Download Resume</span>
            </MagneticButton>
          </div>

          <div className="hero__socials">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="Harsh Bhardwaj GitHub profile"
            >
              <FaGithub size={18} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="Harsh Bhardwaj LinkedIn profile"
            >
              <FaLinkedin size={18} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <span className="hero__shortcut-hint mono">Press ` for terminal · Ctrl+K to jump</span>
          </div>
        </div>

        <div className="hero__portrait-col">
          <div
            className="hero__portrait-frame"
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            style={
              !isMobile && !prefersReducedMotion
                ? {
                    transform: `perspective(750px) rotateX(${portraitTilt.rx}deg) rotateY(${portraitTilt.ry}deg)`,
                  }
                : undefined
            }
          >
            <div className="hero__glow-ring" aria-hidden="true" />
            <div className="hero__portrait-wrap">
              <img
                src={personal.portraitUrl}
                alt={personal.portraitAlt}
                width={640}
                height={640}
                loading="eager"
                fetchpriority="high"
                decoding="async"
                className="hero__portrait-img"
              />
            </div>

            <div className="hero__badge hero__badge--top mono">
              <span className="hero__badge-dot" aria-hidden="true" />
              REST API · SPRING BOOT
            </div>
            <div className="hero__badge hero__badge--bottom mono">
              JWT + RBAC · MYSQL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
