
import React, { useState } from 'react';
import { GraduationCap, Building2, University, ArrowRight } from 'lucide-react';

/* WhoItIsFor — Audience matrix.
   Typography fix: card role h3 reduced from --type-xl (24–40px) to 22–28px.
   Each card has a left-border accent per audience type.
   Signal callout uses tighter, italicised label instead of icon-led block. */

interface AudienceCard {
    icon: React.ReactNode;
    role: string;
    tag: string;
    transformation: string;
    signal: string;
    cta: string;
    accentColor: string;
    onCTA?: () => void;
}

interface WhoItIsForProps {
    onApplyClick: () => void;
}

export const WhoItIsFor: React.FC<WhoItIsForProps> = ({ onApplyClick }) => {
    const [hovered, setHovered] = useState<number | null>(null);

    const cards: AudienceCard[] = [
        {
            icon: <GraduationCap size={22} aria-hidden="true" />,
            role: 'Student',
            tag: 'Undergraduate · Postgraduate',
            transformation:
                'You go from having a startup idea to having a startup — with real customers, some revenue, and a Demo Day pitch. All while still in college.',
            signal: '"I want to build something but don\'t know how to start without sacrificing my academics."',
            cta: 'Apply for the Cohort',
            accentColor: 'var(--phase-discover)',
        },
        {
            icon: <Building2 size={22} aria-hidden="true" />,
            role: 'HOD / Dean',
            tag: 'Academic Leadership',
            transformation:
                'Your department becomes a documented builder ecosystem: MVPs shipped, startups formed, placements improved. Tangible proof of innovation culture — not a pitch about one.',
            signal: '"I need a structured, measurable entrepreneurship outcome — not another hackathon."',
            cta: 'Partner as an Institution',
            accentColor: 'var(--phase-build)',
        },
        {
            icon: <University size={22} aria-hidden="true" />,
            role: 'Institution',
            tag: 'College · University',
            transformation:
                'LEAP runs as a campus cohort with MoU structure, curriculum integration, proctored sessions, and outcome reporting for NBA/NAAC/NIRF documentation.',
            signal: '"We want to move beyond theoretical entrepreneurship cells to execution-first with accountability."',
            cta: 'Explore Campus Program',
            accentColor: 'var(--phase-fundraise)',
        },
    ];

    return (
        <section
            id="who"
            aria-labelledby="who-heading"
            style={{
                background: 'var(--color-bg-secondary)',
                padding: 'clamp(64px, 8vw, 96px) clamp(20px, 5vw, 80px)',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Section header — statement, not a shout */}
                <div className="reveal" style={{ marginBottom: 'clamp(40px, 5vw, 60px)', maxWidth: '560px' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            style={{ width: '24px', height: '1px', background: 'var(--color-brand-primary)' }}
                            aria-hidden="true"
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
                            Built For
                        </span>
                    </div>
                    <h2
                        id="who-heading"
                        style={{
                            fontSize: 'clamp(26px, 3.5vw, 40px)',  // ← FIXED: was --type-display (36–62px)
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            letterSpacing: 'var(--tracking-tight)',
                            color: 'var(--color-text-primary)',
                            marginBottom: '14px',
                        }}
                    >
                        Three audiences. One outcome: <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-text-secondary)' }}>builders, not graduates.</em>
                    </h2>
                    <p
                        style={{
                            fontSize: 'var(--type-base)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 'var(--line-body)',
                            maxWidth: '56ch',
                        }}
                    >
                        Each path is distinct. Each has a specific, documented outcome — not a promise.
                    </p>
                </div>

                {/* Audience matrix — 3 columns */}
                <div
                    className="grid gap-4 reveal"
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}
                >
                    {cards.map((card, i) => (
                        <article
                            key={card.role}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                background: hovered === i ? 'var(--color-surface-elevated)' : 'var(--color-surface-card)',
                                border: `1px solid ${hovered === i ? 'var(--color-border-active)' : 'var(--color-border-default)'}`,
                                borderLeft: `3px solid ${card.accentColor}`,  // ← accent left border per audience
                                borderRadius: '16px',
                                padding: 'clamp(24px, 3.5vw, 36px)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '18px',
                                transition: 'all var(--dur-base) var(--ease-out)',
                            }}
                        >
                            {/* Icon pill */}
                            <div className="flex items-start justify-between">
                                <div
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '12px',
                                        background: `color-mix(in srgb, ${card.accentColor} 12%, transparent)`,
                                        border: `1px solid color-mix(in srgb, ${card.accentColor} 30%, transparent)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: card.accentColor,
                                        flexShrink: 0,
                                    }}
                                >
                                    {card.icon}
                                </div>
                                <span
                                    style={{
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        letterSpacing: 'var(--tracking-wide)',
                                        textTransform: 'uppercase',
                                        color: 'var(--color-text-muted)',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        paddingTop: '4px',
                                        textAlign: 'right',
                                        maxWidth: '14ch',
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {card.tag}
                                </span>
                            </div>

                            {/* Role — calibrated size */}
                            <h3
                                style={{
                                    fontSize: 'clamp(20px, 2vw, 26px)',  // ← FIXED: was --type-xl (24–40px)
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontWeight: 800,
                                    letterSpacing: 'var(--tracking-tight)',
                                    color: 'var(--color-text-primary)',
                                    lineHeight: 1.1,
                                }}
                            >
                                {card.role}
                            </h3>

                            {/* Transformation narrative */}
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.65,
                                    maxWidth: '48ch',
                                    flexGrow: 1,
                                }}
                            >
                                {card.transformation}
                            </p>

                            {/* Signal — what this person already tells themselves */}
                            <div
                                style={{
                                    padding: '10px 14px',
                                    background: `color-mix(in srgb, ${card.accentColor} 6%, var(--color-bg-primary))`,
                                    borderRadius: '8px',
                                    borderLeft: `2px solid color-mix(in srgb, ${card.accentColor} 50%, transparent)`,
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '12px',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 1.55,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {card.signal}
                                </p>
                            </div>

                            {/* CTA link */}
                            <button
                                onClick={i === 0 ? onApplyClick : undefined}
                                className="flex items-center gap-2"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: card.accentColor,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: 'var(--tracking-wide)',
                                    textTransform: 'uppercase',
                                    padding: 0,
                                    marginTop: 'auto',
                                    transition: 'opacity var(--dur-fast) var(--ease-out)',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                }}
                                aria-label={card.cta}
                            >
                                {card.cta}
                                <ArrowRight
                                    size={13}
                                    aria-hidden="true"
                                    style={{
                                        transform: hovered === i ? 'translateX(4px)' : 'none',
                                        transition: 'transform var(--dur-fast) var(--ease-out)',
                                    }}
                                />
                            </button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
