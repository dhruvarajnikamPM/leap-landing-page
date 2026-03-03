
import React from 'react';

/* Footer — Minimal institutional footprint.
   Fully token-mapped: no hardcoded colors (#050508, text-white etc).
   Grid: logo+tagline / Platform / Resources / Legal / Social.
   Bottom bar: copyright + Made in India flag dots. */

const NAV_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'How it Works', href: '#curriculum' },
      { label: 'The 24-Week Program', href: '#curriculum' },
      { label: 'Who it\'s For', href: '#who' },
      { label: 'Apply Now', href: '#contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Case Study', href: '#proof' },
      { label: 'Institution Deck', href: '#contact' },
      { label: 'Mentor Network', href: '#' },
      { label: 'Program FAQ', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
  {
    heading: 'Social',
    links: [
      { label: 'X / Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
];

export const Footer: React.FC = () => (
  <footer
    style={{
      background: 'var(--color-bg-primary)',
      borderTop: '1px solid var(--color-border-subtle)',
      padding: 'clamp(48px, 7vw, 80px) clamp(20px, 5vw, 80px) clamp(32px, 4vw, 48px)',
    }}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* Grid row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(32px, 4vw, 64px)',
          marginBottom: 'clamp(40px, 5vw, 64px)',
        }}
      >
        {/* Brand column */}
        <div style={{ gridColumn: 'span 2' }}>
          <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
            <img
              src="https://i.postimg.cc/Y2hPjDgC/1-2-removebg-preview.png"
              alt="LEAP"
              width="96"
              height="auto"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--line-body)',
              maxWidth: '30ch',
            }}
          >
            India's action-first startup cohort. 24 weeks. 6 phases. Real customers. Real revenue.
          </p>

          {/* Next batch signal */}
          <div className="flex items-center gap-2" style={{ marginTop: '20px' }}>
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--color-brand-success)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                color: 'var(--color-brand-success)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
              }}
            >
              Next batch: 20 April 2026
            </span>
          </div>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map((col) => (
          <div key={col.heading}>
            <h4
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-widest)',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '20px',
              }}
            >
              {col.heading}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {col.links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'color var(--dur-fast) var(--ease-out)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          © {new Date().getFullYear()} LEAP Practical Education Movement. Built for builders.
        </p>

        <div className="flex items-center gap-4">
          <span
            style={{
              fontSize: '10px',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-widest)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
            }}
          >
            Made in India
          </span>
          <div className="flex gap-1" aria-hidden="true">
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF9933' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-text-primary)', opacity: 0.8 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#138808' }} />
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.9); }
      }
    `}</style>
  </footer>
);
