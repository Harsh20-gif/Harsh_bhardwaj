import { useEffect, useRef } from 'react';
import { FaCircleCheck, FaGithub, FaUpRightFromSquare, FaXmark } from 'react-icons/fa6';

export default function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="modal__header">
          <div>
            <span className="modal__year mono">YEAR // {project.year}</span>
            <h3 id="project-modal-title" className="modal__title">
              {project.title}
            </h3>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="modal__close"
            aria-label="Close project details"
            onClick={onClose}
          >
            <FaXmark size={18} aria-hidden="true" />
          </button>
        </div>

        <p className="modal__summary">{project.summary}</p>

        <div className="modal__section">
          <h4 className="modal__section-title mono">IMPLEMENTATION HIGHLIGHTS</h4>
          <ul className="modal__bullets">
            {project.bullets.map((bullet) => (
              <li key={bullet}>
                <FaCircleCheck aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal__section">
          <h4 className="modal__section-title mono">TECH STACK</h4>
          <div className="project-card__chips">
            {project.tech.map((tech) => (
              <span key={tech} className="project-chip mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="modal__actions">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <FaGithub aria-hidden="true" />
            <span>GitHub Repo</span>
          </a>
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FaUpRightFromSquare aria-hidden="true" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
