import { useEffect, useState } from 'react';
import { PROFILE } from '../../data/profile';
import './IntroLoader.css';

const SPLIT_NAME = PROFILE.personal.name.toUpperCase().split('');

export default function IntroLoader({ onComplete, prefersReducedMotion }) {
  const lines = PROFILE.introBootLines;
  const [visibleLineCount, setVisibleLineCount] = useState(1);
  const [showName, setShowName] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setVisibleLineCount(2), 140);
    const t2 = setTimeout(() => setVisibleLineCount(3), 280);
    const t3 = setTimeout(() => setShowName(true), 400);
    const t4 = setTimeout(() => setExiting(true), 760);
    const t5 = setTimeout(() => onComplete(), 980);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className={`intro-loader ${exiting ? 'intro-loader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Initializing Harsh Bhardwaj Mission Control"
      onClick={onComplete}
    >
      <div className="intro-loader__box">
        <div className="intro-loader__topbar mono">
          <span>MISSION_CONTROL // BOOT_SEQ</span>
          <button
            type="button"
            className="intro-loader__skip mono"
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
          >
            SKIP →
          </button>
        </div>

        <div className="intro-loader__lines mono">
          {lines.slice(0, visibleLineCount).map((line, idx) => (
            <div
              key={line}
              className={`intro-loader__line ${
                idx === lines.length - 1 ? 'intro-loader__line--ready' : ''
              }`}
            >
              <span>{line}</span>
            </div>
          ))}
        </div>

        <div
          className={`intro-loader__name ${showName ? 'intro-loader__name--reveal' : ''}`}
          aria-hidden="true"
        >
          {SPLIT_NAME.map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="intro-loader__char"
              style={{ transitionDelay: `${index * 22}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
