import { motion } from 'framer-motion';
import { FaBriefcase, FaCircleCheck, FaLocationDot } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import './Experience.css';

export default function Experience({ prefersReducedMotion }) {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">07 // INTERNSHIP TIMELINE</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Hands-on backend and full-stack internships shipping production portals, admin panels,
            inventory/CRM systems, and e-learning applications.
          </p>
        </motion.div>

        <div className="timeline">
          {PROFILE.experience.map((exp, idx) => (
            <motion.article
              key={exp.id}
              className="timeline__item"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : idx * 0.08 }}
            >
              <div className="timeline__marker" aria-hidden="true">
                <FaBriefcase size={14} />
              </div>

              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__role">{exp.role}</h3>
                    <p className="timeline__company">
                      <span>{exp.company}</span>
                      <span className="timeline__loc mono">
                        <FaLocationDot size={11} aria-hidden="true" />
                        {exp.location}
                      </span>
                    </p>
                  </div>
                  <span className="timeline__period mono">{exp.period}</span>
                </div>

                <ul className="timeline__bullets">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>
                      <FaCircleCheck aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="timeline__stack">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="project-chip mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
