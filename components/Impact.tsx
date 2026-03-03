
import React, { useEffect, useRef, useState } from 'react';

/* Three verified, program-specific stats. No invented claims.
   Font scale: display (36–56px), not hero (44–72px) — controls shouting.
   Horizontal rule grid creates rhythm without padding waste. */
const STATS = [
  {
    value: '24',
    unit: 'Weeks',
    label: 'Structured programme from problem discovery to Demo Day',
    accent: 'var(--phase-discover)',
    sublabel: '6 phases · each harder than the last',
  },
  {
    value: '6',
    unit: 'Phases',
    label: 'Discover · Validate · Build · Operate · Grow · Fundraise',
    accent: 'var(--phase-build)',
    sublabel: 'Escalating intensity every 4 weeks',
  },
  {
    value: '100%',
    unit: 'Live',
    label: 'All execution in real markets — no simulations, no hypotheticals',
    accent: 'var(--phase-fundraise)',
    sublabel: 'Real customers · Real revenue · Real feedback',
  },
];

/* Controlled counter animation — starts on intersection */
function useCounter(target: number, duration = 900, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

const StatCell: React.FC<{ stat: typeof STATS[0]; idx: number }> = ({ stat, idx }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const numericTarget = parseInt(stat.value.replace(/\D/g, ''), 10) || 0;
  const prefix = stat.value.includes('₹') ? '₹' : '';
  const suffix = stat.value.includes('%') ? '%' : '';
  const count = useCounter(numericTarget, 900, active);
  const displayValue = numericTarget > 0 ? `${prefix}${count}${suffix}` : stat.value;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        padding: 'clamp(32px, 4vw, 52px) clamp(20px, 3vw, 40px)',
        borderRight: idx < 2 ? '1px solid var(--color-border-subtle)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'background var(--dur-base) var(--ease-out)',
        transitionDelay: `${idx * 60}ms`,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-card)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Value + unit inline — capped at display scale, NOT hero */}
      <div className="flex items-baseline gap-2" style={{ lineHeight: 1 }}>
        <span
          style={{
            fontSize: 'clamp(34px, 4.5vw, 56px)',  // ← FIXED: was --type-hero (72px max)
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 800,
            letterSpacing: 'var(--tracking-tight)',
            color: stat.accent,
            fontVariantNumeric: 'tabular-nums',
          }}
          aria-label={`${stat.value} ${stat.unit}`}
        >
          {displayValue}
        </span>
        <span
          style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            letterSpacing: 'var(--tracking-tight)',
          }}
          aria-hidden="true"
        >
          {stat.unit}
        </span>
      </div>

      {/* Primary label */}
      <p
        style={{
          fontSize: 'var(--type-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--line-body)',
          maxWidth: '30ch',
        }}
      >
        {stat.label}
      </p>

      {/* Sublabel — muted context */}
      <p
        style={{
          fontSize: 'var(--type-xs)',
          fontFamily: 'JetBrains Mono, monospace',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--tracking-wide)',
          marginTop: '2px',
        }}
      >
        {stat.sublabel}
      </p>
    </div>
  );
};

export const Impact: React.FC = () => (
  <section
    id="impact"
    aria-label="Programme structure metrics"
    style={{
      background: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border-subtle)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}
  >
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      {STATS.map((stat, i) => (
        <StatCell key={i} stat={stat} idx={i} />
      ))}
    </div>
  </section>
);
