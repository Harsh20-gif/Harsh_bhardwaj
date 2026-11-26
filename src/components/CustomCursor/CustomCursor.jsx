import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], input, textarea, .project-card, .tech-card, .arch__node';

export default function CustomCursor({ isMobile, prefersReducedMotion }) {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const active = finePointer && !isMobile && !prefersReducedMotion;
    setEnabled(active);

    if (active) {
      document.body.classList.add('has-custom-cursor');
    } else {
      document.body.classList.remove('has-custom-cursor');
    }

    return () => {
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hovering = false;
    let visible = false;
    let rafId;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        ringX = mouseX;
        ringY = mouseY;
        visible = true;
      }

      const target = e.target?.closest?.(INTERACTIVE_SELECTOR);
      hovering = Boolean(target);
    };

    const handleLeave = () => {
      visible = false;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.opacity = visible ? '1' : '0';
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          hovering ? 0.65 : 1
        })`;
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = visible ? '1' : '0';
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
          hovering ? 1.55 : 1
        })`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
