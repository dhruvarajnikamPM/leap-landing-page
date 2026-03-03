
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps { onApplyClick: () => void; }

export const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  // ── Deferred video load (IntersectionObserver on poster) ─────────────────
  // Poster renders immediately → LCP not blocked.
  // iframe replaces it after 1.2s or on user interaction.
  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const videoId = 'ZTYiSsl5tss';
  const embedParams = [
    'autoplay=1', 'mute=1', 'loop=1', `playlist=${videoId}`,
    'controls=0', 'rel=0', 'showinfo=0', 'iv_load_policy=3',
    'modestbranding=1', 'playsinline=1', 'disablekb=1',
    'vq=hd720',
  ].join('&');

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        height: '100svh',
        minHeight: '600px',
        background: 'var(--color-bg-primary)',
      }}
      aria-label="LEAP — 24-Week Action Startup Cohort"
    >
      {/* ── Background layer: Poster → Video ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Static poster — visible until video loads (LCP image) */}
        <div
          ref={posterRef}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 15% 60%, rgba(20,30,80,0.95) 0%, transparent 65%),
              radial-gradient(ellipse 60% 60% at 85% 20%, rgba(50,20,80,0.4) 0%, transparent 60%),
              linear-gradient(160deg, #06060E 0%, #0A0820 40%, #080614 100%)
            `,
            opacity: videoLoaded ? 0 : 1,
          }}
        />

        {/* Deferred YouTube iframe */}
        {videoLoaded && (
          <div
            ref={iframeContainerRef}
            className="absolute inset-0"
            style={{
              opacity: 1,
              animation: 'fadeIn 700ms var(--ease-out) forwards',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?${embedParams}`}
              className="absolute border-none"
              style={{
                top: '50%', left: '50%',
                width: '100vw',
                height: '56.25vw',
                minHeight: '100%',
                minWidth: '177.78vh',
                transform: 'translate(-50%, -50%) scale(1.08)',
              }}
              allow="autoplay; encrypted-media"
              title="LEAP program background"
              loading="lazy"
            />
          </div>
        )}

        {/* ── Overlay discipline: 3 layers ── */}
        {/* Layer 1: Bottom-left bleed */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 75% 90% at 0% 100%, rgba(6,6,14,0.92) 0%, transparent 65%)',
          }}
        />
        {/* Layer 2: Top-right bleed */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 100% 0%, rgba(6,6,14,0.75) 0%, transparent 55%)',
          }}
        />
        {/* Layer 3: Bottom gradient — prevents text collision */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '40%',
            background: 'linear-gradient(to top, rgba(6,6,14,0.85) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Subtle grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59,123,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59,123,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* ── Content: 3-line hierarchy, never 4 ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-end"
        style={{ padding: 'clamp(32px, 6vw, 80px)' }}
      >
        {/* LEFT COLUMN: Main message block */}
        <div style={{ maxWidth: '680px' }}>

          {/* Line 1: Eyebrow label */}
          <div
            className="flex items-center gap-3 mb-5"
            style={{
              animation: 'heroReveal 600ms var(--ease-out) 100ms both',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: '28px', height: '1px',
                background: 'var(--color-brand-primary)',
              }}
            />
            <span
              style={{
                fontSize: 'var(--type-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-brand-primary)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              India's Action-First Startup Cohort · 24 Weeks
            </span>
          </div>

          {/* Line 2: H1 — Primary claim (never more than 72px) */}
          <h1
            style={{
              fontSize: 'var(--type-hero)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              lineHeight: 'var(--line-hero)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--color-text-primary)',
              marginBottom: '20px',
              maxWidth: '14ch',
              animation: 'heroReveal 700ms var(--ease-out) 200ms both',
            }}
          >
            Learn. Build. Grow.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-brand-primary) 0%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              While in college.
            </span>
          </h1>

          {/* Line 3: Sub-copy — context only */}
          <p
            style={{
              fontSize: 'var(--type-lg)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-body)',
              maxWidth: '52ch',
              marginBottom: '36px',
              animation: 'heroReveal 700ms var(--ease-out) 350ms both',
            }}
          >
            A structured 6-phase cohort that takes you from problem discovery through Demo Day.
            Real customers. Real revenue. In 24 weeks.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4"
            style={{ animation: 'heroReveal 600ms var(--ease-out) 480ms both' }}
          >
            <button
              onClick={onApplyClick}
              id="hero-apply-cta"
              className="btn-primary flex items-center gap-2"
              style={{ fontSize: 'var(--type-sm)' }}
              aria-label="Apply to the LEAP cohort"
            >
              Apply for April 2026
              <ArrowRight size={15} aria-hidden="true" />
            </button>
            <a
              href="#curriculum"
              onClick={(e) => { e.preventDefault(); document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-secondary"
              style={{ fontSize: 'var(--type-sm)', padding: '10px 22px' }}
              aria-label="See the 24-week program structure"
            >
              See the Program
            </a>
          </div>
        </div>

        {/* ── Credibility strip — visible WITHOUT scroll (WCAG: no invented stats) ── */}
        <div
          className="flex flex-wrap items-center gap-8 mt-12"
          style={{ animation: 'heroReveal 600ms var(--ease-out) 600ms both' }}
        >
          {/* Active cohort signal */}
          <div className="flex items-center gap-2">
            <div
              className="animate-pulse rounded-full"
              style={{ width: '7px', height: '7px', background: '#10B981' }}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: 'var(--type-xs)',
                fontWeight: 700,
                color: '#10B981',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
              }}
            >
              Applications Open
            </span>
          </div>

          <div
            aria-hidden="true"
            style={{ width: '1px', height: '16px', background: 'var(--color-border-default)' }}
          />

          {/* Program facts — verified, no invented claims */}
          {[
            { label: '6 Phases', sub: 'Discover → Fundraise' },
            { label: 'Demo Day', sub: 'Pitch to investors' },
            { label: '24 Weeks', sub: 'Start 20 April 2026' },
          ].map(({ label, sub }) => (
            <div key={label}>
              <p style={{ fontSize: 'var(--type-sm)', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>
                {label}
              </p>
              <p style={{ fontSize: 'var(--type-xs)', color: 'var(--color-text-muted)', marginTop: '3px' }}>
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          height: '120px',
          background: 'linear-gradient(to top, var(--color-bg-primary), transparent)',
          zIndex: 20,
        }}
      />

      {/* fadeIn keyframe for iframe */}
      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 0.78; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroReveal"], [style*="fadeIn"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};
