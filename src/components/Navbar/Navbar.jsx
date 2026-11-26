import { useEffect, useRef, useState } from 'react';
import { FaBars, FaMagnifyingGlass, FaTerminal, FaXmark } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import { triggerTapRipple } from '../../utils/tapRipple';
import './Navbar.css';

export default function Navbar({ onNavigate, onOpenPalette, onOpenTerminal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', ...PROFILE.navLinks.map((l) => l.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#hero"
          className="navbar__brand"
          onClick={(e) => handleLinkClick(e, 'hero')}
          aria-label="Harsh Bhardwaj — Back to top"
        >
          <span className="navbar__brand-icon" aria-hidden="true">
            <FaTerminal size={14} />
          </span>
          <span className="navbar__brand-text">
            HB<span className="navbar__brand-slash"> // </span>
            <span className="navbar__brand-sub">spring.dev</span>
          </span>
        </a>

        <nav className="navbar__desktop" aria-label="Primary navigation">
          <ul className="navbar__list">
            {PROFILE.navLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`navbar__link ${activeId === item.id ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__tools">
          <button
            type="button"
            className="navbar__tool-btn mono ripple-host"
            onClick={(e) => {
              triggerTapRipple(e);
              onOpenPalette();
            }}
            aria-label="Open command palette (Ctrl+K)"
            title="Command Palette (Ctrl+K)"
          >
            <FaMagnifyingGlass size={12} aria-hidden="true" />
            <span className="navbar__kbd">Ctrl+K</span>
          </button>

          <button
            type="button"
            className="navbar__tool-btn navbar__tool-btn--term mono ripple-host"
            onClick={(e) => {
              triggerTapRipple(e);
              onOpenTerminal();
            }}
            aria-label="Open terminal overlay (backtick)"
            title="Open Terminal (`)"
          >
            <FaTerminal size={12} aria-hidden="true" />
            <span className="navbar__term-hint">`</span>
          </button>

          <button
            ref={toggleBtnRef}
            type="button"
            className="navbar__toggle ripple-host"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={(e) => {
              triggerTapRipple(e);
              setMenuOpen((prev) => !prev);
            }}
          >
            {menuOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__mobile-list">
          {PROFILE.navLinks.map((item, idx) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                tabIndex={menuOpen ? 0 : -1}
                className={`navbar__mobile-link ripple-host ${
                  activeId === item.id ? 'navbar__mobile-link--active' : ''
                }`}
                onClick={(e) => {
                  triggerTapRipple(e);
                  handleLinkClick(e, item.id);
                }}
              >
                <span className="navbar__mobile-idx">0{idx + 2}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
