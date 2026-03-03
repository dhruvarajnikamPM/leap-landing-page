
import React from 'react';

/* RealityStatement — Compression zone.
   Visual density: tight numbered grid with cross-ruled borders.
   Typography: H2 reads as a decisive editorial statement, not a shout.
   The italic "Not builders." creates controlled weight contrast. */

const PROBLEMS = [
  {
    n: '01',
    title: 'Theory without contact',
    body: 'Four years of curriculum with zero requirement to talk to a customer, ship a product, or face market rejection.',
  },
  {
    n: '02',
    title: 'Certification without competence',
    body: 'Degrees signal effort, not ability. The market has stopped trusting them as proof of execution capacity.',
  },
  {
    n: '03',
    title: 'Ideas without infrastructure',
    body: 'Students have startup ideas. Institutions have no structured system to take them from idea to revenue in a semester.',
  },
  {
    n: '04',
    title: 'Ambition without momentum',
    body: 'Entrepreneurship cells exist everywhere. Almost none produce a founder who acquires a real paying customer by graduation.',
  },
];

export const RealityStatement: React.FC = () => (
  <section
    id="reality"
    aria-labelledby="reality-heading"
    style={{
      background: 'var(--color-bg-primary)',
      padding: 'clamp(56px, 7vw, 88px) clamp(20px, 5vw, 80px)',
    }}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* Two-column header: statement left, addendum right */}
      <div
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(24px, 4vw, 64px)',
          alignItems: 'end',
          marginBottom: 'clamp(40px, 5vw, 64px)',
        }}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              aria-hidden="true"
              style={{ width: '24px', height: '1px', background: 'var(--color-brand-error)' }}
            />
            <span
              style={{
                fontSize: 'var(--type-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-brand-error)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              The System Failure
            </span>
          </div>
          <h2
            id="reality-heading"
            style={{
              fontSize: 'clamp(24px, 3.2vw, 38px)',  // Controlled — not shouting
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--color-text-primary)',
            }}
          >
            Higher education produces graduates.{' '}
            <em
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--color-text-muted)',
                display: 'block',
                marginTop: '4px',
              }}
            >
              Not builders.
            </em>
          </h2>
        </div>

        {/* Right: addendum — gives reader a relief beat before problem grid */}
        <p
          style={{
            fontSize: 'var(--type-base)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-body)',
            maxWidth: '46ch',
            paddingBottom: '4px',
          }}
        >
          The gap isn't talent. It's infrastructure. Four structural failures that prevent students from becoming founders — even when they want to.
        </p>
      </div>

      {/* Problem grid — tight cross-ruled, no dead space */}
      <div
        className="grid gap-0 reveal"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          borderTop: '1px solid var(--color-border-subtle)',
        }}
      >
        {PROBLEMS.map((p, idx) => (
          <div
            key={p.n}
            style={{
              padding: 'clamp(24px, 3vw, 36px)',
              borderBottom: '1px solid var(--color-border-subtle)',
              borderRight: '1px solid var(--color-border-subtle)',
              transition: 'background var(--dur-fast) var(--ease-out)',
              transitionDelay: `${idx * 40}ms`,
              position: 'relative',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-card)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {/* Number tag */}
            <span
              style={{
                display: 'block',
                fontSize: 'var(--type-xs)',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--color-brand-error)',
                marginBottom: '14px',
                letterSpacing: 'var(--tracking-wide)',
                opacity: 0.7,
              }}
            >
              {p.n}
            </span>

            <h3
              style={{
                fontSize: 'clamp(16px, 1.6vw, 20px)',  // Calibrated: informative not shouting
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                lineHeight: 1.25,
                marginBottom: '10px',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-body)',
                maxWidth: '38ch',
              }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
