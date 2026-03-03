
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Week {
  week: number;
  title: string;
  intent: string;
  actions: string[];
  proofType: string;
}

interface Phase {
  id: string;
  name: string;
  color: string;
  weeks: number[];
  summary: string;
  weekData: Week[];
  gain: string;   // what you gain after this phase
}

const PHASES: Phase[] = [
  {
    id: 'discover',
    name: 'Discover',
    color: 'var(--phase-discover)',
    weeks: [1, 2, 3, 4],
    summary: 'Move from assumption to evidence. Find a real problem a real person will pay to fix.',
    gain: 'A validated user problem with documented user research from real conversations.',
    weekData: [
      { week: 1, title: 'Why Most Ideas Fail Before Launch', intent: 'Understand the difference between an idea and a validated problem.', actions: ['Interview 5 potential users this week', 'Document pain points verbatim', 'Map the current workaround'], proofType: 'User interview transcript' },
      { week: 2, title: 'Narrowing the Problem Space', intent: 'Eliminate assumptions. Confirm one painful, recurring problem to solve.', actions: ['Synthesize interview findings', 'Create problem statement (<30 words)', 'Identify the worst pain point'], proofType: 'Problem statement doc' },
      { week: 3, title: 'Who Exactly Has This Problem?', intent: 'Define your first customer segment with precision — not demographics, behaviour.', actions: ['Write a 1-page customer archetype', 'Identify buying triggers', 'Find where they currently complain'], proofType: 'Archetype document' },
      { week: 4, title: 'The Evidence Review', intent: 'Present problem + customer evidence to cohort mentors. Defend your assumption.', actions: ['Prepare 5-minute evidence presentation', 'Map risk if assumption is wrong', 'Get mentor sign-off to proceed'], proofType: 'Mentor sign-off + evidence deck' },
    ],
  },
  {
    id: 'validate',
    name: 'Validate',
    color: 'var(--phase-validate)',
    weeks: [5, 6, 7, 8],
    summary: 'Stop building. Start testing. Validation means someone attempted to pay before you write code.',
    gain: 'At least one pre-purchase signal (letter of intent, payment, or strong commitment from a real user).',
    weekData: [
      { week: 5, title: 'The Pre-Sell Method', intent: 'Sell the idea before you build it. The sales process reveals the real objections.', actions: ['Create a 1-page "explainer" with a price', 'Approach 10 target customers with it', 'Document every objection you receive'], proofType: 'Sales conversations with objection log' },
      { week: 6, title: 'Minimum Valuable Proof', intent: 'Build the smallest possible artefact that tests your biggest assumption.', actions: ['Define the core assumption to test', 'Build a landing page, mockup, or demo in 48 hours', 'Drive 50 relevant visitors to it'], proofType: 'Live test artifact + traffic report' },
      { week: 7, title: 'Reading the Signals', intent: 'Analyse who said yes, who said no, and what the difference is.', actions: ['Calculate conversion rate', 'Do follow-up calls with yes and no respondents', 'Decide: pivot, persevere, or stop'], proofType: 'Conversion data + decision memo' },
      { week: 8, title: 'Commit or Kill', intent: 'Make a binary, evidence-based decision to proceed to Build or re-enter Discover.', actions: ['Present validation evidence to mentor', 'Get a pre-purchase letter of intent or equivalent', 'Write your v1 product hypothesis'], proofType: 'Letter of intent or payment confirmation' },
    ],
  },
  {
    id: 'build',
    name: 'Build',
    color: 'var(--phase-build)',
    weeks: [9, 10, 11, 12],
    summary: 'Ship the simplest version that a paying customer can actually use. Scope is your enemy.',
    gain: 'A live MVP deployed and actively used by at least one paying or committed customer.',
    weekData: [
      { week: 9, title: 'MVP Scope Lockdown', intent: 'Define the absolute minimum feature set that solves the core pain.', actions: ['List every feature you think you need', 'Cut 60% of it', 'Write spec for what remains (1 page max)'], proofType: 'MVP spec doc, signed by mentor' },
      { week: 10, title: 'Sprint 1: Build the Core', intent: 'First working version of the product. Ugly is fine. Broken is not.', actions: ['Set up infrastructure and repository', 'Build and test the core user flow', 'Share with your earliest committed user'], proofType: 'Working product milestone + user session recording' },
      { week: 11, title: 'Sprint 2: Fix the Critical', intent: 'Identify and fix the highest-friction points before real customer use.', actions: ['Run 3 unmoderated user sessions', 'Prioritise top 3 friction points', 'Deploy fixes within the week'], proofType: 'Session recordings + fix changelog' },
      { week: 12, title: 'Go Live', intent: 'Deploy publicly. First real customers. First real test of your value proposition.', actions: ['Deploy to production', 'Onboard first 3 paying or committed users', 'Create customer onboarding flow'], proofType: 'Live product URL + onboarded user proof' },
    ],
  },
  {
    id: 'operate',
    name: 'Operate',
    color: 'var(--phase-operate)',
    weeks: [13, 14, 15, 16],
    summary: 'Build the business behind the product. Ops, pricing, delivery, retention — while serving real customers.',
    gain: 'A functioning operational system — pricing, delivery, support, and at least one month of measurable customer retention.',
    weekData: [
      { week: 13, title: 'The Revenue System', intent: 'Build a repeatable way to charge, collect, and fulfil.', actions: ['Set up payment/invoicing system', 'Document your delivery process', 'Define your refund and support policy'], proofType: 'Payment system live + first invoice sent' },
      { week: 14, title: 'Retention First Engagement', intent: 'A customer who comes back is worth 10 who come once. Design for return.', actions: ['Map your customer lifecycle', 'Create a re-engagement touchpoint for week 2 users', 'Measure day-7 and day-14 retention'], proofType: 'Retention data — week 1 vs week 2' },
      { week: 15, title: 'Supply Chain and Delivery', intent: 'Ensure your delivery doesn\'t break when orders/users increase 3x.', actions: ['Document your delivery playbook', 'Stress-test with a simulated 3x load', 'Identify the first thing to break and fix it'], proofType: 'Operational playbook + stress test findings' },
      { week: 16, title: 'Unit Economics Review', intent: 'Know if you make money or lose money per customer. This number determines everything.', actions: ['Calculate CAC, LTV, and gross margin', 'Present to mentor and defend the numbers', 'Adjust price or reduce cost if margin is negative'], proofType: 'Unit economics spreadsheet, signed by mentor' },
    ],
  },
  {
    id: 'grow',
    name: 'Grow',
    color: 'var(--phase-grow)',
    weeks: [17, 18, 19, 20],
    summary: 'Find distribution that doesn\'t rely on you. Build a channel that outlasts your own hustle.',
    gain: 'A documented, repeatable acquisition channel generating consistent new customers without founder involvement.',
    weekData: [
      { week: 17, title: 'Distribution Before Marketing', intent: 'Find where your customer already gathers and put your product there.', actions: ['Map 5 distribution channels', 'Test the top 2 with 48-hour campaigns', 'Measure cost-per-click and cost-per-conversion'], proofType: 'Channel test results + CAC by channel' },
      { week: 18, title: 'Referral and Word of Mouth', intent: 'The best distribution is a customer telling another customer. Build the mechanism.', actions: ['Talk to your top 3 customers about why they talk about you', 'Design a referral incentive', 'Launch referral program to existing customers'], proofType: 'Referral program live + first referral tracked' },
      { week: 19, title: 'Content and Organic', intent: 'Build a content asset that compounds over time — not a one-off post.', actions: ['Choose one content format (written, video, community)', 'Publish 3 pieces in one week', 'Track which drives actual signups or inquiries'], proofType: 'Content analytics — traffic to conversion rate' },
      { week: 20, title: 'Growth System Handoff', intent: 'Document your top acquisition channel so someone else can run it without you.', actions: ['Write an operations manual for your best channel', 'Delegate one acquisition task to a team member', 'Verify they can run a campaign without you'], proofType: 'Acquisition playbook + delegation proof' },
    ],
  },
  {
    id: 'fundraise',
    name: 'Fundraise',
    color: 'var(--phase-fundraise)',
    weeks: [21, 22, 23, 24],
    summary: 'Raise capital from evidence, not from slides. Demo Day is a presentation of what already exists.',
    gain: 'A polished Demo Day pitch backed by 24 weeks of documented proof — customers, revenue, retention, and traction.',
    weekData: [
      { week: 21, title: 'Pitch Architecture', intent: 'Your pitch is evidence in motion. Every claim must have a supporting artefact.', actions: ['Map your 12 claims from the past 20 weeks', 'Pair each claim with evidence', 'Build first draft: 10 slides maximum'], proofType: 'Draft pitch with evidence index' },
      { week: 22, title: 'Investor Psychology', intent: 'Investors don\'t fund ideas. They fund patterns. Learn to present yours correctly.', actions: ['Study 3 portfolios from relevant investors', 'Reframe your narrative around their thesis', 'Run a cold outreach test to 5 investors'], proofType: 'Outreach log + investor response analysis' },
      { week: 23, title: 'The Dry Run', intent: 'Present your full pitch to a panel of founders and investors. 10 minutes. Full critique.', actions: ['Run 3 full dry-run sessions', 'Collect critical feedback (not compliments)', 'Revise pitch and financials based on feedback'], proofType: 'Dry run recording + revision log' },
      { week: 24, title: 'Demo Day', intent: 'Present to investors, mentors, and the broader LEAP community. 24 weeks of execution on stage.', actions: ['Final pitch — 8 minutes + Q&A', 'Distribute 1-page deal memo to interested investors', 'Schedule post-event meetings with interested leads'], proofType: 'Demo Day — live presentation + deal memo distributed' },
    ],
  },
];

const PHASE_LINE_INTENSITY: Record<string, { thickness: number; glow: string; pulse: boolean }> = {
  discover: { thickness: 1, glow: 'none', pulse: false },
  validate: { thickness: 2, glow: '0 0 8px rgba(16,185,129,0.5)', pulse: false },
  build: { thickness: 2, glow: '0 0 12px rgba(168,85,247,0.6)', pulse: false },
  operate: { thickness: 3, glow: '0 0 16px rgba(249,115,22,0.6)', pulse: false },
  grow: { thickness: 3, glow: '0 0 20px rgba(236,72,153,0.7)', pulse: true },
  fundraise: { thickness: 4, glow: '0 0 28px rgba(245,158,11,0.85)', pulse: true },
};

export const FounderCurriculum: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string>('discover');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState<Record<string, number>>({});
  const phaseRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentPhase = PHASES.find(p => p.id === activePhase)!;
  const intensity = PHASE_LINE_INTENSITY[activePhase];

  // ── Animate the vertical progress line on phase change ──────────────────
  useEffect(() => {
    setLineHeight(prev => ({ ...prev, [activePhase]: 0 }));
    const durationMs = 700;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setLineHeight(prev => ({ ...prev, [activePhase]: eased * 100 }));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    setExpandedWeek(null);
  }, [activePhase]);

  const toggleWeek = (weekNum: number) =>
    setExpandedWeek(prev => (prev === weekNum ? null : weekNum));

  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      style={{
        background: 'var(--color-bg-primary)',
        padding: 'clamp(64px, 8vw, 96px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }} className="reveal">
          <div className="flex items-center gap-3 mb-4">
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
              24-Week Programme
            </span>
          </div>
          <h2
            id="curriculum-heading"
            style={{
              fontSize: 'var(--type-display)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              lineHeight: 'var(--line-display)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--color-text-primary)',
              maxWidth: '22ch',
              marginBottom: '16px',
            }}
          >
            Six phases. Each more difficult than the last.
          </h2>
          <p
            style={{
              fontSize: 'var(--type-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-body)',
              maxWidth: 'var(--measure)',
            }}
          >
            Every week has a defined intent, three required actions, and a proof artefact. Progress is earned, not assumed.
          </p>
        </div>

        {/* ── Phase Navigator (tab row) ── */}
        <div
          className="reveal"
          role="tablist"
          aria-label="Programme phases"
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {PHASES.map(phase => (
            <button
              key={phase.id}
              role="tab"
              aria-selected={activePhase === phase.id}
              aria-controls={`phase-panel-${phase.id}`}
              id={`phase-tab-${phase.id}`}
              onClick={() => setActivePhase(phase.id)}
              style={{
                padding: '8px 18px',
                border: `1px solid ${activePhase === phase.id ? phase.color : 'var(--color-border-default)'}`,
                borderRadius: '999px',
                background: activePhase === phase.id ? `color-mix(in srgb, ${phase.color} 15%, transparent)` : 'transparent',
                color: activePhase === phase.id ? phase.color : 'var(--color-text-muted)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'var(--type-sm)',
                cursor: 'pointer',
                transition: `all var(--dur-base) var(--ease-out)`,
                letterSpacing: 'var(--tracking-wide)',
                boxShadow: activePhase === phase.id ? intensity.glow : 'none',
              }}
            >
              {phase.name}
            </button>
          ))}
        </div>

        {/* ── Phase Panel ── */}
        <div
          id={`phase-panel-${currentPhase.id}`}
          role="tabpanel"
          aria-labelledby={`phase-tab-${currentPhase.id}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '3px 1fr',
            gap: '0 32px',
            alignItems: 'start',
          }}
        >
          {/* Progress line — escalating for each phase */}
          <div
            style={{
              position: 'relative',
              alignSelf: 'stretch',
            }}
            aria-hidden="true"
          >
            {/* Track (dim) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--color-border-subtle)',
                borderRadius: '2px',
              }}
            />
            {/* Active fill (animated) */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: `${lineHeight[activePhase] ?? 0}%`,
                background: currentPhase.color,
                borderRadius: '2px',
                boxShadow: intensity.glow,
                width: `${intensity.thickness}px`,
                transition: 'box-shadow 300ms ease',
                animation: intensity.pulse ? 'phasePulse 2s ease-in-out infinite' : 'none',
              }}
            />
          </div>

          {/* Content column */}
          <div>
            {/* Phase summary */}
            <div
              style={{
                marginBottom: '28px',
                padding: '20px 24px',
                background: 'var(--color-surface-card)',
                border: `1px solid ${currentPhase.color}`,
                borderRadius: '14px',
                borderLeftWidth: '3px',
              }}
            >
              <p
                style={{
                  fontSize: 'var(--type-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-body)',
                }}
              >
                {currentPhase.summary}
              </p>
            </div>

            {/* Week list — expandable rows */}
            <div
              className="flex flex-col"
              style={{ gap: '6px' }}
            >
              {currentPhase.weekData.map((week) => {
                const isOpen = expandedWeek === week.week;
                return (
                  <div
                    key={week.week}
                    style={{
                      border: `1px solid ${isOpen ? currentPhase.color : 'var(--color-border-default)'}`,
                      background: isOpen ? 'var(--color-surface-card)' : 'transparent',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
                    }}
                  >
                    {/* Week header — always visible */}
                    <button
                      onClick={() => toggleWeek(week.week)}
                      aria-expanded={isOpen}
                      aria-controls={`week-panel-${week.week}`}
                      id={`week-btn-${week.week}`}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '18px 20px',
                        gap: '16px',
                        textAlign: 'left',
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          style={{
                            fontSize: 'var(--type-xs)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontWeight: 700,
                            color: currentPhase.color,
                            letterSpacing: 'var(--tracking-wide)',
                            flexShrink: 0,
                            minWidth: '56px',
                          }}
                        >
                          W{week.week < 10 ? `0${week.week}` : week.week}
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--type-base)',
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontWeight: isOpen ? 700 : 500,
                            color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            lineHeight: 1.3,
                          }}
                        >
                          {week.title}
                        </span>
                      </div>
                      <div
                        style={{
                          color: 'var(--color-text-muted)',
                          flexShrink: 0,
                          transform: isOpen ? 'rotate(90deg)' : 'none',
                          transition: 'transform var(--dur-base) var(--ease-out)',
                        }}
                      >
                        <ChevronRight size={16} aria-hidden="true" />
                      </div>
                    </button>

                    {/* Expandable drawer */}
                    <div
                      id={`week-panel-${week.week}`}
                      role="region"
                      aria-labelledby={`week-btn-${week.week}`}
                      style={{
                        maxHeight: isOpen ? '600px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        overflow: 'hidden',
                        transition: `max-height var(--dur-slow) var(--ease-out), opacity var(--dur-base) var(--ease-out)`,
                      }}
                    >
                      <div
                        style={{
                          padding: '0 20px 24px 20px',
                          paddingLeft: 'calc(20px + 56px + 16px)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                          borderTop: '1px solid var(--color-border-subtle)',
                          paddingTop: '20px',
                        }}
                      >
                        {/* Intent */}
                        <p
                          style={{
                            fontSize: 'var(--type-sm)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 'var(--line-body)',
                            fontStyle: 'italic',
                          }}
                        >
                          {week.intent}
                        </p>

                        {/* Three required actions */}
                        <div>
                          <p
                            style={{
                              fontSize: 'var(--type-xs)',
                              fontFamily: 'JetBrains Mono, monospace',
                              fontWeight: 700,
                              letterSpacing: 'var(--tracking-widest)',
                              textTransform: 'uppercase',
                              color: 'var(--color-text-muted)',
                              marginBottom: '10px',
                            }}
                          >
                            This Week's Actions
                          </p>
                          <ul
                            style={{
                              listStyle: 'none',
                              padding: 0, margin: 0,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                            }}
                          >
                            {week.actions.map((action, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3"
                              >
                                <span
                                  style={{
                                    width: '18px', height: '18px',
                                    borderRadius: '50%',
                                    background: `color-mix(in srgb, ${currentPhase.color} 15%, transparent)`,
                                    border: `1px solid ${currentPhase.color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '9px',
                                    fontWeight: 800,
                                    color: currentPhase.color,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                  }}
                                  aria-hidden="true"
                                >
                                  {idx + 1}
                                </span>
                                <span
                                  style={{
                                    fontSize: 'var(--type-sm)',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 'var(--line-body)',
                                  }}
                                >
                                  {action}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Proof artefact badge */}
                        <div
                          className="flex items-center gap-2"
                          style={{
                            padding: '8px 14px',
                            background: `color-mix(in srgb, ${currentPhase.color} 8%, transparent)`,
                            border: `1px solid color-mix(in srgb, ${currentPhase.color} 30%, transparent)`,
                            borderRadius: '8px',
                            alignSelf: 'flex-start',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 'var(--type-xs)',
                              fontFamily: 'JetBrains Mono, monospace',
                              fontWeight: 700,
                              letterSpacing: 'var(--tracking-wide)',
                              color: currentPhase.color,
                              textTransform: 'uppercase',
                            }}
                          >
                            Proof →
                          </span>
                          <span
                            style={{
                              fontSize: 'var(--type-xs)',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {week.proofType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Phase gain footer */}
            <div
              style={{
                marginTop: '24px',
                padding: '20px 24px',
                background: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: currentPhase.color,
                  boxShadow: intensity.glow,
                  flexShrink: 0,
                  marginTop: '6px',
                }}
              />
              <div>
                <p
                  style={{
                    fontSize: 'var(--type-xs)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    color: currentPhase.color,
                    marginBottom: '6px',
                  }}
                >
                  After {currentPhase.name}
                </p>
                <p
                  style={{
                    fontSize: 'var(--type-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--line-body)',
                  }}
                >
                  {currentPhase.gain}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mid-curriculum CTA */}
        <div
          className="reveal flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            marginTop: 'clamp(40px, 6vw, 60px)',
            padding: '28px 32px',
            background: 'var(--color-brand-primary-light)',
            border: '1px solid var(--color-border-active)',
            borderRadius: '16px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: 'var(--type-base)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '4px',
              }}
            >
              Next cohort starts April 20, 2026
            </p>
            <p
              style={{
                fontSize: 'var(--type-sm)',
                color: 'var(--color-text-muted)',
              }}
            >
              Applications close 2 weeks before cohort start. Limited seats.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary"
            style={{ fontSize: 'var(--type-sm)', whiteSpace: 'nowrap', flexShrink: 0 }}
            aria-label="Apply for the April 2026 cohort"
          >
            Apply for April 2026
          </a>
        </div>
      </div>

      <style>{`
        @keyframes phasePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="phasePulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};
