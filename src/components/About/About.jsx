import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import './About.css';

function StatCounter({ value, suffix, prefersReducedMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let frameId;
    const duration = 950;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value, prefersReducedMotion]);

  return (
    <span ref={ref} className="about__stat-value mono">
      {display}
      <span className="about__stat-suffix">{suffix}</span>
    </span>
  );
}

export default function About({ prefersReducedMotion }) {
  const { about } = PROFILE;

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">02 // SYSTEM OVERVIEW</span>
          <h2 className="section-title">Engineering Profile</h2>
        </motion.div>

        <div className="about__layout">
          <motion.div
            className="about__summary-card"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <div className="about__card-bar mono">
              <span>README.md — Summary</span>
              <span className="about__card-tag">GHAZIABAD · IN</span>
            </div>

            <p className="about__text">{about.summary}</p>

            <ul className="about__highlights">
              {about.highlights.map((line) => (
                <li key={line}>
                  <FaCircleCheck aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="about__stats-grid">
            {about.stats.map((stat, idx) => (
              <motion.article
                key={stat.id}
                className={`about__stat-card about__stat-card--${stat.accent}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.06 }}
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <h3 className="about__stat-label">{stat.label}</h3>
                <p className="about__stat-context">{stat.context}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
