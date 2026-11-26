import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaTerminal,
} from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import './Contact.css';

export default function Contact({ prefersReducedMotion, onNavigate }) {
  const { personal } = PROFILE;
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('Java Backend Developer Opportunity');
  const [message, setMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const handleMailtoSubmit = (e) => {
    e.preventDefault();
    const encodedSubject = encodeURIComponent(subject || 'Portfolio Inquiry');
    const encodedBody = encodeURIComponent(
      message || 'Hi Harsh,\n\nI saw your portfolio and would like to connect.'
    );
    window.location.href = `mailto:${personal.email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <>
      <section id="contact" className="section contact">
        <div className="container">
          <motion.div
            className="section-header"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-kicker">09 // CONNECT</span>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Open to entry-level Java, Spring Boot, and full-stack software engineering roles.
              Reach out directly via email, phone, LinkedIn, or GitHub.
            </p>
          </motion.div>

          <div className="contact__grid">
            <div className="contact__channels">
              <div className="contact__card">
                <div className="contact__card-icon">
                  <FaEnvelope size={18} aria-hidden="true" />
                </div>
                <div className="contact__card-body">
                  <span className="contact__label mono">EMAIL</span>
                  <a href={`mailto:${personal.email}`} className="contact__value">
                    {personal.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="contact__copy-btn mono"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                >
                  {copied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <a href={personal.phoneHref} className="contact__card contact__card--link">
                <div className="contact__card-icon">
                  <FaPhone size={18} aria-hidden="true" />
                </div>
                <div className="contact__card-body">
                  <span className="contact__label mono">PHONE</span>
                  <span className="contact__value">{personal.phone}</span>
                </div>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__card contact__card--link"
              >
                <div className="contact__card-icon">
                  <FaLinkedin size={18} aria-hidden="true" />
                </div>
                <div className="contact__card-body">
                  <span className="contact__label mono">LINKEDIN</span>
                  <span className="contact__value">{personal.linkedinDisplay}</span>
                </div>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__card contact__card--link"
              >
                <div className="contact__card-icon">
                  <FaGithub size={18} aria-hidden="true" />
                </div>
                <div className="contact__card-body">
                  <span className="contact__label mono">GITHUB</span>
                  <span className="contact__value">{personal.githubDisplay}</span>
                </div>
              </a>
            </div>

            <form className="contact__composer" onSubmit={handleMailtoSubmit}>
              <div className="contact__composer-head mono">
                <span>QUICK MAILTO DISPATCH</span>
                <span className="contact__composer-badge">CLIENT-SIDE</span>
              </div>

              <label className="contact__field">
                <span className="mono">Subject</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Role or project inquiry"
                  required
                />
              </label>

              <label className="contact__field">
                <span className="mono">Message</span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a quick note to open in your email client..."
                />
              </label>

              <button type="submit" className="btn btn-primary contact__submit">
                <FaEnvelope aria-hidden="true" />
                <span>Send via Email Client</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__left mono">
            <FaTerminal aria-hidden="true" />
            <span>Harsh Bhardwaj · {personal.location}</span>
          </div>

          <p className="footer__credit mono">Built with React + Three.js</p>

          <a
            href="#hero"
            className="footer__top mono"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('#hero');
              }
            }}
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
