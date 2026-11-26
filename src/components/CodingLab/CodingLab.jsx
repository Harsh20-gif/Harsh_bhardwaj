import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBolt, FaCheck, FaPlay, FaRotateRight, FaTerminal } from 'react-icons/fa6';
import { VscFiles } from 'react-icons/vsc';
import { PROFILE } from '../../data/profile';
import './CodingLab.css';

const JAVA_KEYWORDS = new Set([
  'public',
  'private',
  'protected',
  'class',
  'interface',
  'final',
  'return',
  'new',
  'void',
  'import',
  'package',
]);

const JAVA_TYPES = new Set([
  'OrderController',
  'OrderService',
  'OrderResponse',
  'OrderRequest',
  'ResponseEntity',
  'UserDetails',
  'HttpStatus',
  'Order',
  'User',
  'OrderStatus',
  'BigDecimal',
  'OrderItem',
  'List',
  'ArrayList',
  'Long',
  'JobApplicationServiceTest',
  'JobApplicationRepository',
  'JobApplicationService',
  'JobApplication',
  'ApplicationStage',
  'Optional',
  'GenerationType',
  'FetchType',
  'EnumType',
  'CascadeType',
]);

function highlightJavaLine(line) {
  const tokenRegex = /(@\w+|"[^"]*"|\b[A-Za-z_]\w*\b)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }

    const token = match[0];
    let cls = '';
    if (token.startsWith('@')) {
      cls = 'tok-anno';
    } else if (token.startsWith('"')) {
      cls = 'tok-str';
    } else if (JAVA_KEYWORDS.has(token)) {
      cls = 'tok-kw';
    } else if (JAVA_TYPES.has(token)) {
      cls = 'tok-type';
    }

    if (cls) {
      parts.push(
        <span key={`${match.index}-${token}`} className={cls}>
          {token}
        </span>
      );
    } else {
      parts.push(token);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts.length > 0 ? parts : ' ';
}

export default function CodingLab({ prefersReducedMotion }) {
  const { codingLab } = PROFILE;
  const [activeFileId, setActiveFileId] = useState(codingLab.files[0].id);
  const activeFile = useMemo(
    () => codingLab.files.find((f) => f.id === activeFileId) || codingLab.files[0],
    [activeFileId, codingLab.files]
  );

  const labRef = useRef(null);
  const inView = useInView(labRef, { once: true, amount: 0.25 });

  const [visibleChars, setVisibleChars] = useState(
    prefersReducedMotion ? activeFile.code.length : 0
  );
  const [isTyping, setIsTyping] = useState(false);
  const [termRunId, setTermRunId] = useState(0);
  const [visibleTermLines, setVisibleTermLines] = useState(
    prefersReducedMotion ? codingLab.terminalLines.length : 0
  );

  // Typing animation for editor
  useEffect(() => {
    const targetLen = activeFile.code.length;

    if (prefersReducedMotion) {
      setVisibleChars(targetLen);
      setIsTyping(false);
      return;
    }

    if (!inView) return;

    setVisibleChars(0);
    setIsTyping(true);

    const stepSize = 6;
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        const next = Math.min(prev + stepSize, targetLen);
        if (next >= targetLen) {
          clearInterval(interval);
          setIsTyping(false);
        }
        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [activeFile, inView, prefersReducedMotion]);

  // Terminal test output reveal
  useEffect(() => {
    const total = codingLab.terminalLines.length;
    if (prefersReducedMotion) {
      setVisibleTermLines(total);
      return;
    }
    if (!inView && termRunId === 0) return;

    setVisibleTermLines(1);
    const timers = [];
    for (let i = 1; i < total; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleTermLines(i + 1);
        }, i * 190)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [inView, termRunId, codingLab.terminalLines.length, prefersReducedMotion]);

  const displayedCode = activeFile.code.slice(0, visibleChars);
  const codeLines = displayedCode.split('\n');

  const handleInstantShow = () => {
    setVisibleChars(activeFile.code.length);
    setIsTyping(false);
  };

  const handleReplayTyping = () => {
    if (prefersReducedMotion) return;
    setVisibleChars(0);
    setIsTyping(true);
    const targetLen = activeFile.code.length;
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        const next = Math.min(prev + 6, targetLen);
        if (next >= targetLen) {
          clearInterval(interval);
          setIsTyping(false);
        }
        return next;
      });
    }, 16);
  };

  return (
    <section id="coding-lab" className="section coding-lab">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">05 // CODING LAB</span>
          <h2 className="section-title">Spring Boot &amp; JUnit Workbench</h2>
          <p className="section-subtitle">
            Realistic JWT-secured controller, JPA entity mapping, and JUnit service tests from my
            E-Commerce Management System and Job Application Tracker.
          </p>
        </motion.div>

        <div ref={labRef} className="ide-shell">
          {/* Top VS Code Title Bar */}
          <div className="ide-titlebar">
            <div className="ide-dots" aria-hidden="true">
              <span className="ide-dot ide-dot--red" />
              <span className="ide-dot ide-dot--amber" />
              <span className="ide-dot ide-dot--green" />
            </div>

            <div className="ide-workspace mono">
              <VscFiles aria-hidden="true" />
              <span>{codingLab.workspace}</span>
            </div>

            <div className="ide-controls">
              {isTyping ? (
                <button
                  type="button"
                  className="ide-ctrl-btn mono"
                  onClick={handleInstantShow}
                >
                  <FaBolt aria-hidden="true" />
                  <span>Skip</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="ide-ctrl-btn mono"
                  onClick={handleReplayTyping}
                  disabled={prefersReducedMotion}
                >
                  <FaRotateRight aria-hidden="true" />
                  <span>Replay</span>
                </button>
              )}
            </div>
          </div>

          {/* Editor Tabs */}
          <div className="ide-tabs" role="tablist" aria-label="Java source files">
            {codingLab.files.map((file) => {
              const active = file.id === activeFile.id;
              return (
                <button
                  key={file.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`ide-tab mono ${active ? 'ide-tab--active' : ''}`}
                  onClick={() => setActiveFileId(file.id)}
                >
                  <span className="ide-tab-badge">J</span>
                  <span>{file.filename}</span>
                </button>
              );
            })}
          </div>

          {/* Breadcrumb path */}
          <div className="ide-breadcrumb mono">
            <span>{activeFile.path}</span>
            <span className="ide-lang">{activeFile.language}</span>
          </div>

          {/* Code Viewport */}
          <div className="ide-editor" role="tabpanel" aria-label={activeFile.filename}>
            <pre className="ide-pre mono">
              <code>
                {codeLines.map((line, index) => (
                  <div key={index} className="ide-line">
                    <span className="ide-ln" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="ide-code-text">
                      {highlightJavaLine(line)}
                      {index === codeLines.length - 1 && isTyping && (
                        <span className="ide-caret" aria-hidden="true" />
                      )}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Maven Terminal */}
          <div className="ide-terminal">
            <div className="ide-terminal__bar mono">
              <div className="ide-terminal__title">
                <FaTerminal aria-hidden="true" />
                <span>TERMINAL — Maven Test Runner</span>
              </div>
              <button
                type="button"
                className="ide-ctrl-btn mono"
                onClick={() => setTermRunId((n) => n + 1)}
                disabled={prefersReducedMotion}
              >
                <FaPlay size={10} aria-hidden="true" />
                <span>Run mvn test</span>
              </button>
            </div>

            <div className="ide-terminal__body mono" aria-live="polite">
              {codingLab.terminalLines.slice(0, visibleTermLines).map((entry, idx) => (
                <div
                  key={`${entry.text}-${idx}`}
                  className={`ide-term-line ide-term-line--${entry.type}`}
                >
                  {entry.type === 'success' && <FaCheck aria-hidden="true" />}
                  <span>{entry.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
