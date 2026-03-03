
import React from 'react';

/* Marquee strip — decompression breath between Hero and WhoItIsFor.
   Dual-track: top row left→right (slower), bottom row implied via items.
   Speed: 35s — perceivable but not distracting. */
const ITEMS_A = [
  'Action-First Curriculum',
  'Customer Discovery',
  'MVP Delivery',
  'Revenue Generation',
  'Demo Day Pitch',
  'Cohort-Based Learning',
  'Builder Ecosystem',
  'Startup Infrastructure',
];
const ITEMS_B = [
  'Mentor Network',
  'Urban Immersion',
  'Factory Visits',
  'VC Simulation',
  'Institution Partnership',
  'Seed Fund Pitch',
  'AgriTech Challenge',
  'Dropshipping Sprint',
];

const DOT = (
  <svg width="4" height="4" viewBox="0 0 4 4" aria-hidden="true" focusable="false">
    <circle cx="2" cy="2" r="2" fill="var(--color-brand-primary)" opacity="0.5" />
  </svg>
);

const Track: React.FC<{ items: string[]; speed?: string; reverse?: boolean }> = ({
  items,
  speed = '38s',
  reverse = false,
}) => (
  <div
    style={{
      display: 'flex',
      animation: `marquee${reverse ? 'Rev' : ''} ${speed} linear infinite`,
      animationPlayState: 'running',
    }}
  >
    {[...Array(3)].map((_, gi) => (
      <div key={gi} style={{ display: 'inline-flex', alignItems: 'center', gap: '28px', paddingRight: '28px' }}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
            {DOT}
          </React.Fragment>
        ))}
      </div>
    ))}
  </div>
);

export const MarqueeStrip: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      borderTop: '1px solid var(--color-border-subtle)',
      borderBottom: '1px solid var(--color-border-subtle)',
      background: 'var(--color-surface-card)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}
  >
    {/* Top track */}
    <div
      style={{
        padding: '14px 0 10px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <Track items={ITEMS_A} speed="38s" />
    </div>

    {/* Divider micro-line */}
    <div style={{ height: '1px', background: 'var(--color-border-subtle)', margin: '0 clamp(20px, 5vw, 80px)' }} />

    {/* Bottom track — slightly faster, different cadence */}
    <div
      style={{
        padding: '10px 0 14px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <Track items={ITEMS_B} speed="50s" reverse />
    </div>

    <style>{`
      @keyframes marquee    { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
      @keyframes marqueeRev { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
      @media (prefers-reduced-motion: reduce) {
        [style*="marquee"] { animation: none !important; }
      }
    `}</style>
  </div>
);
