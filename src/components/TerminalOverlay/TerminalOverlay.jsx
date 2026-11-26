import { useEffect, useRef, useState } from 'react';
import { FaTerminal, FaXmark } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import './TerminalOverlay.css';

const QUICK_COMMANDS = ['help', 'whoami', 'skills', 'projects', 'experience', 'contact', 'clear'];

function buildCommandOutput(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  const { personal, skillGroups, projects, experience } = PROFILE;

  switch (cmd) {
    case 'help':
      return [
        { type: 'accent', text: 'Available Mission Control commands:' },
        { type: 'text', text: '  whoami      — Engineer identity & summary' },
        { type: 'text', text: '  skills      — Grouped technical matrix from resumes' },
        { type: 'text', text: '  projects    — All 12 shipped projects & stack' },
        { type: 'text', text: '  experience  — Internship timeline (2022 – 2026)' },
        { type: 'text', text: '  contact     — Email, phone, LinkedIn & GitHub' },
        { type: 'text', text: '  clear       — Clear terminal buffer' },
        { type: 'text', text: '  exit        — Close terminal overlay' },
      ];
    case 'whoami':
      return [
        { type: 'accent', text: `${personal.name} // ${personal.rolePrimary}` },
        { type: 'text', text: `Location : ${personal.location}` },
        { type: 'text', text: `Focus    : Spring Boot, Spring Security (JWT), Spring Data JPA, MySQL, React.js` },
        { type: 'ok', text: `Status   : ${personal.liveStatusChip}` },
      ];
    case 'skills':
      return skillGroups.map((group) => ({
        type: 'text',
        text: `${group.category.padEnd(10, ' ')} : ${group.items.map((i) => i.name).join(', ')}`,
      }));
    case 'projects':
      return [
        { type: 'accent', text: `Shipped Systems (${projects.length}):` },
        ...projects.map((p, idx) => ({
          type: 'text',
          text: `${String(idx + 1).padStart(2, '0')}. ${p.title} (${p.year}) [${p.tech.slice(0, 4).join(', ')}]`,
        })),
      ];
    case 'experience':
      return experience.map((e) => ({
        type: 'text',
        text: `• ${e.role} @ ${e.company} (${e.period})`,
      }));
    case 'contact':
      return [
        { type: 'accent', text: 'Direct Channels:' },
        { type: 'text', text: `Email    : ${personal.email}` },
        { type: 'text', text: `Phone    : ${personal.phone}` },
        { type: 'text', text: `LinkedIn : ${personal.linkedin}` },
        { type: 'text', text: `GitHub   : ${personal.github}` },
      ];
    default:
      return [
        {
          type: 'warn',
          text: `Command not found: "${rawCmd.trim()}". Type 'help' to list available commands.`,
        },
      ];
  }
}

export default function TerminalOverlay({ open, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'accent',
      text: "Harsh Bhardwaj Mission Control Shell. Type 'help' to inspect commands.",
    },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histCursor, setHistCursor] = useState(-1);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const executeCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistCursor(-1);

    if (lower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (lower === 'exit' || lower === 'quit') {
      setInput('');
      onClose();
      return;
    }

    const responseLines = buildCommandOutput(trimmed);
    setHistory((prev) => [
      ...prev,
      { type: 'cmd', text: `harsh@spring-boot:~$ ${trimmed}` },
      ...responseLines,
    ]);
    setInput('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histCursor + 1, cmdHistory.length - 1);
      if (cmdHistory[next]) {
        setHistCursor(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histCursor - 1;
      if (next < 0) {
        setHistCursor(-1);
        setInput('');
      } else {
        setHistCursor(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="term-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="term-window"
        role="dialog"
        aria-modal="true"
        aria-label="Interactive developer terminal"
      >
        <div className="term-header mono">
          <div className="term-header__title">
            <FaTerminal size={13} aria-hidden="true" />
            <span>harsh@mission-control:~ (press ` or Esc)</span>
          </div>
          <button
            type="button"
            className="term-header__close"
            onClick={onClose}
            aria-label="Close terminal overlay"
          >
            <FaXmark size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="term-quickbar">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="term-quick-btn mono"
              onClick={() => executeCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>

        <div ref={bodyRef} className="term-body mono" onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <div key={i} className={`term-line term-line--${line.type}`}>
              {line.text}
            </div>
          ))}
        </div>

        <form
          className="term-prompt mono"
          onSubmit={(e) => {
            e.preventDefault();
            executeCommand(input);
          }}
        >
          <span className="term-prompt__prefix">harsh@spring:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="term-prompt__input mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type help, whoami, skills, projects..."
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
