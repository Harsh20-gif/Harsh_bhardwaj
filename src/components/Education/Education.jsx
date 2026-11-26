import { motion } from 'framer-motion';
import { FaAward, FaGraduationCap } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import './Education.css';

export default function Education({ prefersReducedMotion }) {
  return (
    <section id="education" className="section education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">08 // ACADEMIC &amp; CREDENTIALS</span>
          <h2 className="section-title">Education &amp; Certifications</h2>
        </motion.div>

        <div className="edu-grid">
          {/* Education Column */}
          <div className="edu-col">
            <h3 className="edu-col__heading mono">
              <FaGraduationCap aria-hidden="true" />
              <span>EDUCATION</span>
            </h3>

            <div className="edu-cards">
              {PROFILE.education.map((item, idx) => (
                <motion.article
                  key={item.id}
                  className="edu-card"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.06 }}
                >
                  <span className="edu-card__period mono">{item.period}</span>
                  <h4 className="edu-card__title">{item.degree}</h4>
                  <p className="edu-card__org">{item.institution}</p>
                  <p className="edu-card__loc mono">{item.location}</p>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="edu-col">
            <h3 className="edu-col__heading edu-col__heading--amber mono">
              <FaAward aria-hidden="true" />
              <span>CERTIFICATIONS</span>
            </h3>

            <div className="edu-cards">
              {PROFILE.certifications.map((cert, idx) => (
                <motion.article
                  key={cert.id}
                  className="edu-card edu-card--cert"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.06 }}
                >
                  <div className="edu-card__top">
                    <span className="edu-card__issuer mono">{cert.issuer}</span>
                    <span className="edu-card__period mono">{cert.date}</span>
                  </div>
                  <h4 className="edu-card__title">{cert.title}</h4>
                  <p className="edu-card__details">{cert.details}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
