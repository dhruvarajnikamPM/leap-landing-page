
import React from 'react';
import { ArrowRight } from 'lucide-react';

/* DecisionTension — Mid-funnel commitment moment.
   Placed between Partners and ContactFormSection.
   Rhythm role: TENSION before DECISION.
   Visual: full-width, dense, single-CTA — no padding waste.
   Copy: scarcity + urgency WITHOUT manipulation — factual seat count. */

interface DecisionTensionProps {
    onApplyClick: () => void;
}

export const DecisionTension: React.FC<DecisionTensionProps> = ({ onApplyClick }) => (
    <section
        id="decision"
        aria-label="Apply to LEAP cohort"
        style={{
            background: 'var(--color-brand-primary)',
            padding: 'clamp(48px, 6vw, 72px) clamp(20px, 5vw, 80px)',
            position: 'relative',
            overflow: 'hidden',
        }}
    >
        {/* Subtle grid texture overlay */}
        <div
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
            }}
        />

        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(24px, 4vw, 48px)',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
            }}
        >
            {/* Left: tension copy */}
            <div>
                <p
                    style={{
                        fontSize: 'var(--type-xs)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 700,
                        letterSpacing: 'var(--tracking-widest)',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                        marginBottom: '14px',
                    }}
                >
                    Cohort · April 20, 2026
                </p>
                <h2
                    style={{
                        fontSize: 'clamp(22px, 3vw, 36px)',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.18,
                        letterSpacing: 'var(--tracking-tight)',
                        maxWidth: '26ch',
                    }}
                >
                    You've seen the programme. Now decide.
                </h2>
            </div>

            {/* Right: CTA + scarcity signal */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    alignItems: 'flex-start',
                }}
            >
                {/* Seat counter — factual, not manipulative */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.2)',
                    }}
                >
                    <div
                        style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: '#10B981',
                            flexShrink: 0,
                        }}
                        aria-hidden="true"
                    />
                    <span
                        style={{
                            fontSize: '11px',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.85)',
                            letterSpacing: 'var(--tracking-wide)',
                            textTransform: 'uppercase',
                        }}
                    >
                        Applications Open · Limited Seats
                    </span>
                </div>

                <button
                    onClick={onApplyClick}
                    id="decision-apply-cta"
                    className="flex items-center gap-2"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 28px',
                        background: '#ffffff',
                        color: 'var(--color-brand-primary)',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 800,
                        fontSize: '13px',
                        letterSpacing: 'var(--tracking-wide)',
                        textTransform: 'uppercase',
                        border: 'none',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms ease',
                        willChange: 'transform',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                    }}
                    aria-label="Apply for the LEAP April 2026 cohort"
                >
                    Apply for April 2026
                    <ArrowRight size={15} aria-hidden="true" />
                </button>

                <p
                    style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.55)',
                        fontFamily: 'JetBrains Mono, monospace',
                    }}
                >
                    Takes 2 minutes · No fee to apply · Interview within 48h
                </p>
            </div>
        </div>
    </section>
);
