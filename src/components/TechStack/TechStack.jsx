import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../../data/profile';
import { TechIcon } from '../../utils/techIcons';
import { triggerTapRipple } from '../../utils/tapRipple';
import './TechStack.css';

function TiltSkillCard({ item, isMobile, prefersReducedMotion }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  const handleMouseMove = (e) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 14;
    const rx = (0.5 - py) * 14;
    setTilt({ rx, ry, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, active: false });
  };

  return (
    <div
      className={`tech-card ripple-host ${tilt.active ? 'tech-card--tilting' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={triggerTapRipple}
      style={
        !isMobile && !prefersReducedMotion
          ? {
              transform: `perspective(650px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${
                tilt.active ? '-3px' : '0px'
              })`,
            }
          : undefined
      }
    >
      <div className="tech-card__icon">
        <TechIcon iconKey={item.iconKey} size={22} />
      </div>
      <div className="tech-card__body">
        <h4 className="tech-card__name">{item.name}</h4>
        <p className="tech-card__note">{item.note}</p>
      </div>
    </div>
  );
}

export default function TechStack({ isMobile, prefersReducedMotion }) {
  return (
    <section id="tech-stack" className="section tech-stack">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">03 // TECHNICAL MATRIX</span>
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">
            Core Java, Spring ecosystem, relational databases, security mechanisms, and full-stack
            tooling used across production-style backends and internships.
          </p>
        </motion.div>

        <div className="tech-groups">
          {PROFILE.skillGroups.map((group, idx) => (
            <motion.div
              key={group.category}
              className="tech-group"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.04 }}
            >
              <div className="tech-group__header">
                <h3 className="tech-group__title">{group.category}</h3>
                <span className="tech-group__tag mono">{group.tag}</span>
              </div>

              <div className="tech-group__grid">
                {group.items.map((item) => (
                  <TiltSkillCard
                    key={item.name}
                    item={item}
                    isMobile={isMobile}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
