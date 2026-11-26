import { Component, Suspense, lazy, useEffect, useState } from 'react';
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

    let delay = deleting ? 32 : 58;
    if (!deleting && charCount === current.length) {
      delay = 1900;
    } else if (deleting && charCount === 0) {
      delay = 320;
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

export default function Hero({ isMobile, prefersReducedMotion, onNavigate }) {
  const { personal } = PROFILE;
  const typedText = useTypingRole(personal.rolesTyped, prefersReducedMotion);

  const staticFallback = <div className="hero__fallback-bg" aria-hidden="true" />;

  return (
    <section id="hero" className="hero">
      {/* Static dark engineering gradient always underneath */}
      {staticFallback}

      {/* Lazy-loaded lightweight Three.js scene (disabled on reduced motion) */}
      {!prefersReducedMotion && (
        <div className="hero__canvas-wrap" aria-hidden="true">
          <SceneErrorBoundary fallback={staticFallback}>
            <Suspense fallback={null}>
              <HeroScene isMobile={isMobile} />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__status">
            <span className="hero__status-dot" aria-hidden="true" />
            <span className="mono">{personal.availability}</span>
          </div>

          <h1 className="hero__name">{personal.name}</h1>

          <p className="hero__role" aria-label={personal.rolePrimary}>
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
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('#projects');
                }
              }}
            >
              <span>View Projects</span>
              <FaArrowRight aria-hidden="true" />
            </a>

            <a
              href={personal.resumeUrl}
              className="btn btn-secondary"
              download="Harsh_Bhardwaj_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload aria-hidden="true" />
              <span>Download Resume</span>
            </a>
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
          </div>
        </motion.div>

        <motion.div
          className="hero__portrait-col"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__portrait-frame">
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
        </motion.div>
      </div>
    </section>
  );
}
