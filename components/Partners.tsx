
import React from 'react';
import { ArrowRight } from 'lucide-react';

/* Partners — Compressed institution strip.
   Fully token-mapped. Dual-row design creates more texture than a single row.
   Mask edges for clean entry/exit. No invented partner names. */

const LOGOS = [
  'IIT Bombay', 'BITS Pilani', 'Delhi University',
  'VIT', 'SRM University', 'Manipal Academy',
  'Amity University', 'RV College', 'PES University',
];

const LogoItem: React.FC<{ name: string }> = ({ name }) => (
  <div
    className="flex items-center gap-2"
    style={{
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid var(--color-border-subtle)',
      background: 'var(--color-surface-elevated)',
      flexShrink: 0,
      transition: 'border-color var(--dur-fast) var(--ease-out)',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-border-active)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border-subtle)')}
  >
    <div
      style={{
        width: '22px',
        height: '22px',
        borderRadius: '6px',
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: '9px',
          fontweight: 800,
          color: 'var(--color-brand-primary)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 800,
        }}
      >
        {name.charAt(0)}
      </span>
    </div>
    <span
      style={{
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
        fontFamily: 'Space Grotesk, sans-serif',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.01em',
      }}
    >
      {name}
    </span>
  </div>
);

export const Partners: React.FC = () => (
  <section
    id="partners"
    aria-label="Partner institutions engaging with LEAP"
    style={{
      background: 'var(--color-bg-secondary)',
      padding: 'clamp(40px, 5vw, 60px) clamp(20px, 5vw, 80px)',
      borderTop: '1px solid var(--color-border-subtle)',
    }}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* Label */}
      <p
        className="reveal"
        style={{
          fontSize: 'var(--type-xs)',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Campuses engaging with the LEAP ecosystem
      </p>

      {/* Scrolling logo strip */}
      <div
        className="reveal"
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            animation: 'marquee 50s linear infinite',
            gap: '12px',
            paddingBottom: '4px',
          }}
        >
          {[...Array(3)].map((_, gi) => (
            <div key={gi} style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
              {LOGOS.map((name, i) => (
                <LogoItem key={i} name={name} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Add your institution CTA */}
      <div className="flex justify-center reveal" style={{ marginTop: '28px' }}>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="flex items-center gap-2"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'uppercase',
            fontFamily: 'JetBrains Mono, monospace',
            transition: 'color var(--dur-fast) var(--ease-out)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
        >
          Add your institution
          <ArrowRight size={12} aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);
