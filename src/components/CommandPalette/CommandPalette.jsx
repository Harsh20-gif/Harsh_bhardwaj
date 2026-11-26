import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaCopy,
  FaDownload,
  FaMagnifyingGlass,
  FaRotateRight,
  FaTerminal,
  FaXmark,
} from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import './CommandPalette.css';

export default function CommandPalette({
  open,
  onClose,
  onNavigate,
  onOpenTerminal,
  onReplayIntro,
}) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const sections = PROFILE.navLinks.map((nav, i) => ({
      id: `nav-${nav.id}`,
      group: 'SECTIONS',
      label: `Jump to ${nav.label}`,
      hint: nav.hint,
      shortcut: `0${i + 2}`,
      action: () => {
        onClose();
        onNavigate(`#${nav.id}`);
      },
    }));

    const actions = [
      {
        id: 'act-terminal',
        group: 'MISSION CONTROL',
        label: 'Open Interactive Terminal',
        hint: 'Run whoami, skills, projects, experience, contact',
        shortcut: '`',
        icon: 'terminal',
        action: () => {
          onClose();
          onOpenTerminal();
        },
      },
      {
        id: 'act-resume',
        group: 'MISSION CONTROL',
        label: 'Download Resume PDF',
        hint: 'Harsh Bhardwaj Resume',
        shortcut: 'PDF',
        icon: 'download',
        action: () => {
          onClose();
          window.open(PROFILE.personal.resumeUrl, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'act-copy-email',
        group: 'MISSION CONTROL',
        label: copiedMsg ? 'Email Copied!' : 'Copy Email Address',
        hint: PROFILE.personal.email,
        shortcut: 'COPY',
        icon: 'copy',
        action: async () => {
          try {
            await navigator.clipboard.writeText(PROFILE.personal.email);
            setCopiedMsg(true);
            setTimeout(() => setCopiedMsg(false), 1600);
          } catch {
            window.location.href = `mailto:${PROFILE.personal.email}`;
          }
        },
      },
      {
        id: 'act-replay-boot',
        group: 'MISSION CONTROL',
        label: 'Replay Boot Sequence',
        hint: 'Re-run Mission Control intro loader',
        shortcut: 'BOOT',
        icon: 'replay',
        action: () => {
          onClose();
          onReplayIntro();
        },
      },
    ];

    return [...sections, ...actions];
  }, [onClose, onNavigate, onOpenTerminal, onReplayIntro, copiedMsg]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) =>
          filtered.length ? (i - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].action();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  const renderIcon = (icon) => {
    switch (icon) {
      case 'terminal':
        return <FaTerminal size={13} aria-hidden="true" />;
      case 'download':
        return <FaDownload size={13} aria-hidden="true" />;
      case 'copy':
        return <FaCopy size={13} aria-hidden="true" />;
      case 'replay':
        return <FaRotateRight size={13} aria-hidden="true" />;
      default:
        return <FaArrowRight size={12} aria-hidden="true" />;
    }
  };

  return (
    <div
      className="cmd-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cmd-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette navigation"
      >
        <div className="cmd-palette__search">
          <FaMagnifyingGlass className="cmd-palette__search-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette__input mono"
            placeholder="Jump to section or run command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter sections and commands"
          />
          <button
            type="button"
            className="cmd-palette__close"
            onClick={onClose}
            aria-label="Close command palette"
          >
            <FaXmark size={16} aria-hidden="true" />
          </button>
        </div>

        <ul className="cmd-palette__list" role="listbox">
          {filtered.length === 0 ? (
            <li className="cmd-palette__empty mono">
              No matching command for &ldquo;{query}&rdquo;. Try &ldquo;projects&rdquo; or
              &ldquo;terminal&rdquo;.
            </li>
          ) : (
            filtered.map((item, idx) => (
              <li key={item.id} role="option" aria-selected={idx === activeIndex}>
                <button
                  type="button"
                  className={`cmd-palette__item ${
                    idx === activeIndex ? 'cmd-palette__item--active' : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={item.action}
                >
                  <span className="cmd-palette__item-icon">{renderIcon(item.icon)}</span>
                  <span className="cmd-palette__item-main">
                    <span className="cmd-palette__item-label">{item.label}</span>
                    <span className="cmd-palette__item-hint mono">{item.hint}</span>
                  </span>
                  <span className="cmd-palette__kbd mono">{item.shortcut}</span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="cmd-palette__footer mono">
          <span>↑↓ Navigate</span>
          <span>↵ Execute</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
