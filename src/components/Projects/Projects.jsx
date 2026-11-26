import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight, FaGithub, FaLayerGroup } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import ProjectModal from './ProjectModal';
import './Projects.css';

export default function Projects({ prefersReducedMotion, onModalChange }) {
  const [category, setCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const triggerRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (category === 'all') return PROFILE.projects;
    return PROFILE.projects.filter((p) => p.category === category);
  }, [category]);

  const openModal = (project, buttonEl) => {
    triggerRef.current = buttonEl;
    setSelectedProject(project);
    onModalChange?.(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    onModalChange?.(false);
    triggerRef.current?.focus();
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">06 // SHIPPED SYSTEMS</span>
          <h2 className="section-title">Projects &amp; Production Builds</h2>
          <p className="section-subtitle">
            Backend APIs, full-stack platforms, and internship applications built across Spring
            Boot, Laravel, React.js, Flask, and MySQL.
          </p>
        </motion.div>

        <div className="projects__filters" role="group" aria-label="Filter projects by technology">
          {PROFILE.projectCategories.map((cat) => {
            const active = category === cat.id;
            const count =
              cat.id === 'all'
                ? PROFILE.projects.length
                : PROFILE.projects.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                className={`projects__filter-btn mono ${
                  active ? 'projects__filter-btn--active' : ''
                }`}
                onClick={() => setCategory(cat.id)}
                aria-pressed={active}
              >
                <span>{cat.label}</span>
                <span className="projects__filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : (idx % 3) * 0.05 }}
            >
              <div className="project-card__top mono">
                <span className="project-card__tag">
                  <FaLayerGroup size={12} aria-hidden="true" />
                  <span>{project.featured ? 'CORE BACKEND' : 'APPLICATION'}</span>
                </span>
                <span className="project-card__year">{project.year}</span>
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.summary}</p>

              <div className="project-card__chips">
                {project.tech.map((tech) => (
                  <span key={tech} className="project-chip mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-card__footer">
                <button
                  type="button"
                  className="project-card__details-btn mono"
                  onClick={(e) => openModal(project, e.currentTarget)}
                >
                  <span>View details</span>
                  <FaChevronRight size={12} aria-hidden="true" />
                </button>

                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__repo-link"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <FaGithub size={17} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
}
