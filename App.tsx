
import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { WhoItIsFor } from './components/WhoItIsFor';
import { RealityStatement } from './components/RealityStatement';
import { Impact } from './components/Impact';
import { FounderCurriculum } from './components/FounderCurriculum';
import { CaseStory } from './components/CaseStory';
import { Partners } from './components/Partners';
import { DecisionTension } from './components/DecisionTension';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { PreQualModal } from './components/PreQualModal';

/* ── THEME TYPES ── */
export type Theme = 'dark' | 'light-saffron' | 'light-arctic' | 'light-forest';

/* ── THEME CONTEXT ── */
interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => { },
  toggleTheme: () => { },
});
export const useTheme = () => useContext(ThemeContext);

/* ── ANALYTICS EVENT BUS ── */
export type AnalyticsEvent =
  | 'apply_click' | 'prequal_submit' | 'interview_booked'
  | 'payment_complete' | 'proof_upload' | 'demo_view' | 'theme_toggle';

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  const detail = { event, timestamp: Date.now(), ...data };
  window.dispatchEvent(new CustomEvent('leap:analytics', { detail }));
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, data);
  }
  if (import.meta.env?.DEV) console.info('[LEAP]', event, detail);
}

const THEME_CYCLE: Theme[] = ['dark', 'light-saffron', 'light-arctic', 'light-forest'];

const App: React.FC = () => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [modalOpen, setModalOpen] = useState(false);

  /* ── Theme persistence ── */
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('leap-theme', t);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];
    setTheme(next);
    trackEvent('theme_toggle', { from: theme, to: next });
  }, [theme, setTheme]);

  useEffect(() => {
    const saved = localStorage.getItem('leap-theme') as Theme | null;
    if (saved && THEME_CYCLE.includes(saved)) setTheme(saved);
  }, []);

  /* ── Reveal animations with 50ms stagger ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let i = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && i < 4) {
            const el = entry.target as HTMLElement;
            setTimeout(() => el.classList.add('active'), i * 60);
            i++;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -48px 0px' }
    );
    document.querySelectorAll<HTMLElement>('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openModal = useCallback(() => { setModalOpen(true); trackEvent('apply_click'); }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className="min-h-screen relative" style={{ color: 'var(--color-text-primary)', fontFamily: 'Inter, sans-serif' }}>
        <Navbar onApplyClick={openModal} />

        <main id="main-content">
          {/* ── ATTENTION FLOW ────────────────────────────────────
            0–3s  : Hero (clarity + immediate CTA + credibility strip)
            3–8s  : MarqueeStrip (decompression breath)
            8–20s : WhoItIsFor (audience qualification)
            20s   : RealityStatement (problem compression)
            30s   : Impact (stat reveal — controlled scale)
            30–60s: FounderCurriculum (progressive escalation narrative)
            60s   : CaseStory (proof before decision)
            65s   : Partners (social proof — compressed breath)
            70s   : DecisionTension (full-width CTA band — TENSION)
            75s+  : ContactFormSection (institutional conversion)
          ─────────────────────────────────────────────────────── */}

          {/* DENSE — Hero: cinematic clarity */}
          <Hero onApplyClick={openModal} />

          {/* BREATH — dual-track marquee separator */}
          <MarqueeStrip />

          {/* DENSE — Who is this for: 3-audience matrix */}
          <WhoItIsFor onApplyClick={openModal} />

          {/* COMPRESSION — Problem statement: 4-cell grid */}
          <RealityStatement />

          {/* REVEAL — 3 programme facts, counter-animated */}
          <Impact />

          {/* TENSION + ESCALATION — 24-week progressive curriculum */}
          <FounderCurriculum />

          {/* PROOF — Editorial testimony + documented outcomes */}
          <CaseStory />

          {/* BREATH — Partner institution logos */}
          <Partners />

          {/* DECISION — Full-width CTA tension band */}
          <DecisionTension onApplyClick={openModal} />

          {/* CONVERSION — Institutional form */}
          <ContactFormSection />
        </main>

        <Footer />
        <StickyCTA onApplyClick={openModal} />
        {modalOpen && <PreQualModal onClose={closeModal} />}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
