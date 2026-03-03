
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Play, Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';

const THEME_ICONS: Record<string, React.ReactNode> = {
  'dark': <Moon size={15} aria-hidden="true" />,
  'light-saffron': <Sun size={15} aria-hidden="true" />,
  'light-arctic': <Sun size={15} aria-hidden="true" />,
  'light-forest': <Sun size={15} aria-hidden="true" />,
};
const THEME_LABELS: Record<string, string> = {
  'dark': 'Dark', 'light-saffron': 'Saffron', 'light-arctic': 'Arctic', 'light-forest': 'Forest',
};

const SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'who', label: 'Who' },
  { id: 'curriculum', label: 'Program' },
  { id: 'proof', label: 'Proof' },
  { id: 'contact', label: 'Apply' },
];

interface NavbarProps { onApplyClick: () => void; }

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const rafRef = useRef<number>(0);

  // ── Scroll progress + compact mode ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        setScrolled(scrolled > 48);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Active section detection ─────────────────────────────────────────────
  useEffect(() => {
    const sectionEls = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-20% 0px -60% 0px' }
    );
    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Mobile ESC + scroll lock ─────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const smoothScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-full z-40"
      style={{
        background: scrolled ? 'var(--color-bg-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border-default)' : 'transparent'}`,
        transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      }}
    >
      {/* ── Scroll Progress Bar ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: `${progress}%`,
          background: 'var(--color-brand-primary)',
          transition: 'width 60ms linear',
          transformOrigin: 'left',
          zIndex: 10,
        }}
      />

      {/* ── Announcement strip ── */}
      <div
        className="w-full overflow-hidden whitespace-nowrap"
        style={{
          background: 'var(--color-announcement-bg)',
          height: scrolled ? '0px' : '32px',
          opacity: scrolled ? 0 : 1,
          transition: 'height var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out)',
          overflow: 'hidden',
        }}
        role="marquee"
        aria-label="Next Batch Starts on 20th April 2026"
      >
        <div className="flex animate-marquee items-center h-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-6">
              <span
                className="font-mono font-bold uppercase"
                style={{
                  fontSize: 'var(--type-xs)',
                  letterSpacing: 'var(--tracking-widest)',
                  color: 'var(--color-announcement-text)',
                }}
              >
                Next Batch: 20 April 2026
              </span>
              <div
                className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-brand-primary)', opacity: 0.8 }}
                aria-hidden="true"
              >
                <Play size={8} fill="white" color="white" />
              </div>
              <span
                className="font-mono font-bold uppercase"
                style={{
                  fontSize: 'var(--type-xs)',
                  letterSpacing: 'var(--tracking-widest)',
                  color: 'var(--color-announcement-text)',
                }}
              >
                Ship Your Startup in 24 Weeks · April 2026
              </span>
              <div
                className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-brand-primary)', opacity: 0.8 }}
                aria-hidden="true"
              >
                <Play size={8} fill="white" color="white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main nav row ── */}
      <div
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
        style={{
          paddingTop: scrolled ? '10px' : '14px',
          paddingBottom: scrolled ? '10px' : '14px',
          transition: 'padding var(--dur-base) var(--ease-out)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => smoothScroll('hero')}
          aria-label="LEAP — back to top"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img
            src="https://i.postimg.cc/Y2hPjDgC/1-2-removebg-preview.png"
            alt="LEAP"
            style={{
              height: scrolled ? '40px' : '48px',
              width: 'auto',
              objectFit: 'contain',
              transition: 'height var(--dur-base) var(--ease-out)',
            }}
            loading="eager"
          />
        </button>

        {/* Desktop: section links */}
        <div className="hidden md:flex items-center gap-6">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => smoothScroll(s.id)}
              className="nav-section-link"
              aria-current={activeSection === s.id ? 'true' : undefined}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: activeSection === s.id ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                fontSize: 'var(--type-sm)',
                fontWeight: activeSection === s.id ? 700 : 500,
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                transition: 'color var(--dur-fast) var(--ease-out)',
                padding: '4px 0',
                position: 'relative',
              }}
            >
              {s.label}
              {/* Active underline indicator */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0,
                  width: activeSection === s.id ? '100%' : '0%',
                  height: '1px',
                  background: 'var(--color-brand-primary)',
                  transition: 'width var(--dur-base) var(--ease-out)',
                }}
              />
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5"
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '999px',
              padding: '6px 12px',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--type-xs)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-wide)',
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
            aria-label={`Switch theme — current: ${THEME_LABELS[theme]}`}
          >
            {THEME_ICONS[theme]}
            <span className="hidden lg:inline" style={{ marginLeft: '4px' }}>{THEME_LABELS[theme]}</span>
          </button>

          <button
            onClick={onApplyClick}
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: 'var(--type-sm)' }}
            aria-label="Apply to LEAP cohort"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '50%',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
            }}
            aria-label={`Theme: ${THEME_LABELS[theme]}`}
          >
            {THEME_ICONS[theme]}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{ color: 'var(--color-text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="md:hidden"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0, right: 0,
            background: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-border-default)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => smoothScroll(s.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 'var(--type-xl)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                color: activeSection === s.id ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onApplyClick(); }}
            className="btn-primary w-full"
            style={{ maxWidth: '320px' }}
          >
            Apply Now
          </button>
        </div>
      )}
    </nav>
  );
};
