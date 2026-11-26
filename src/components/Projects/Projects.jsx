import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FaChevronRight, FaGithub, FaLayerGroup } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import { triggerTapRipple } from '../../utils/tapRipple';
import ProjectModal from './ProjectModal';
import './Projects.css';

function SpotlightProjectCard({
  project,
  idx,
  isMobile,
  prefersReducedMotion,
  onOpen,
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: '50%', my: '50%', active: false });

  const handleMouseMove = (e) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 9,
      ry: (px - 0.5) * 9,
      mx: `${(px * 100).toFixed(1)}%`,
      my: `${(py * 100).toFixed(1)}%`,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: '50%', my: '50%', active: false });
  };

  return (
    <motion.article
      layoutId={prefersReducedMotion ? undefined : `project-card-${project.id}`}
      className={`project-card ripple-host ${
        project.featured ? 'project-card--featured' : ''
      } ${tilt.active ? 'project-card--spotlight' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.34, delay: prefersReducedMotion ? 0 : (idx % 3) * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (e.target.closest('a')) return;
        triggerTapRipple(e);
        onOpen(project, e.currentTarget.querySelector('.project-card__details-btn'));
      }}
      style={
        !isMobile && !prefersReducedMotion
          ? {
              '--mx': tilt.mx,
              '--my': tilt.my,
              transform: `perspective(720px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${
                tilt.active ? '-3px' : '0px'
              })`,
            }
          : undefined
      }
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
          className="project-card__details-btn mono ripple-host"
          onClick={(e) => {
            e.stopPropagation();
            triggerTapRipple(e);
            onOpen(project, e.currentTarget);
          }}
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
  );
}

export default function Projects({ isMobile, prefersReducedMotion, onModalChange }) {
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
                className={`projects__filter-btn mono ripple-host ${
                  active ? 'projects__filter-btn--active' : ''
                }`}
                onClick={(e) => {
                  triggerTapRipple(e);
                  setCategory(cat.id);
                }}
                aria-pressed={active}
              >
                <span>{cat.label}</span>
                <span className="projects__filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <div className="projects__grid">
            {filteredProjects.map((project, idx) => (
              <SpotlightProjectCard
                key={project.id}
                project={project}
                idx={idx}
                isMobile={isMobile}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={openModal}
              />
            ))}
          </div>

          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={closeModal}
                prefersReducedMotion={prefersReducedMotion}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
