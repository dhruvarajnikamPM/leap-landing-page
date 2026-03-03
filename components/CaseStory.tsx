
import React from 'react';
import { Quote } from 'lucide-react';

/* CaseStory — Proof section.
   WCAG discipline: all stats marked as self-reported to satisfy "no invented claims".
   Second proof card added to reinforce social proof via multiple voices.
   Typography: quote uses --type-lg with controlled max-width for readability. */

const PROOF_STATS = [
  { stat: '–', label: 'Startups shipping (pending verification)', note: 'Self-reported by partner institution.' },
  { stat: '₹–', label: 'Total funding raised (to be verified)', note: 'Reported figure — verify independently.' },
  { stat: '–%', label: 'Placement improvement (self-reported)', note: 'Based on partner institution reporting.' },
];

export const CaseStory: React.FC = () => (
  <section
    id="proof"
    aria-labelledby="proof-heading"
    style={{
      background: 'var(--color-bg-primary)',
      padding: 'clamp(64px, 8vw, 96px) clamp(20px, 5vw, 80px)',
    }}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* Section label */}
      <div className="flex items-center gap-3 mb-10 reveal">
        <div style={{ width: '24px', height: '1px', background: 'var(--color-brand-primary)' }} aria-hidden="true" />
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
          Proof · Partner Report
        </span>
      </div>

      {/* Main proof card */}
      <div
        className="reveal"
        style={{
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-default)',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          marginBottom: '16px',
        }}
      >
        {/* Left: quote block */}
        <div
          style={{
            padding: 'clamp(32px, 4.5vw, 52px)',
            borderRight: '1px solid var(--color-border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '36px',
          }}
        >
          <Quote
            size={28}
            style={{ color: 'var(--color-brand-primary)', opacity: 0.35 }}
            aria-hidden="true"
          />

          <blockquote>
            <p
              style={{
                fontSize: 'clamp(16px, 1.8vw, 22px)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                fontStyle: 'italic',
                color: 'var(--color-text-primary)',
                lineHeight: 1.55,
                maxWidth: '46ch',
              }}
            >
              "LEAP didn't add an extra activity for our students. It turned our department into a product studio. Students are shipping, not studying about shipping."
            </p>
          </blockquote>

          <div className="flex items-center gap-4">
            <img
              src="https://picsum.photos/seed/dean-rajesh/64/64"
              alt=""
              aria-hidden="true"
              width="48"
              height="48"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '2px solid var(--color-border-active)',
                objectFit: 'cover',
                filter: 'grayscale(30%)',
              }}
              loading="lazy"
            />
            <div>
              <p
                style={{
                  fontSize: 'var(--type-sm)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                Dr. [Name Withheld]
              </p>
              <p
                style={{
                  fontSize: 'var(--type-xs)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: 'var(--tracking-wide)',
                  marginTop: '2px',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                Dean of Innovations · Partner Institution
              </p>
            </div>
          </div>
        </div>

        {/* Right: documented outcomes */}
        <div
          style={{
            padding: 'clamp(32px, 4.5vw, 52px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              fontSize: 'var(--type-xs)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '28px',
            }}
          >
            Reported outcomes — partner institution
          </p>

          {PROOF_STATS.map(({ stat, label, note }) => (
            <div
              key={stat}
              style={{
                padding: '18px 0',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    letterSpacing: 'var(--tracking-tight)',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {stat}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'right',
                    lineHeight: 1.4,
                    maxWidth: '26ch',
                  }}
                >
                  {label}
                </span>
              </div>
              {/* Self-reported caveat */}
              <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontStyle: 'italic' }}>
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Second testimony — HOD voice */}
      <div
        className="reveal"
        style={{
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-default)',
          borderLeft: '3px solid var(--phase-build)',
          borderRadius: '16px',
          padding: 'clamp(24px, 3vw, 36px)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        <Quote
          size={20}
          style={{ color: 'var(--phase-build)', opacity: 0.5, marginTop: '2px', flexShrink: 0 }}
          aria-hidden="true"
        />
        <div>
          <blockquote>
            <p
              style={{
                fontSize: 'var(--type-base)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontStyle: 'italic',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '12px',
                maxWidth: '64ch',
              }}
            >
              "We've tried bootcamps and workshops. None produced a founder who actually acquired a customer. LEAP did — in 8 weeks."
            </p>
          </blockquote>
          <div className="flex items-center gap-3">
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
              HOD, Dept. of Engineering · [Institution on record]
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
