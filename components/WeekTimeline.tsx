
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, Target, Rocket, Settings, TrendingUp, Coins } from 'lucide-react';

// ── 24-Week Data Model ──────────────────────────────────────────────────────
export interface WeekData {
    id: string;
    weekNumber: number;
    phase: 1 | 2 | 3 | 4 | 5 | 6;
    phaseName: 'Discover' | 'Validate' | 'Build' | 'Operate' | 'Grow' | 'Fundraise';
    title: string;
    intent: string;
    actions: [string, string, string];
    proofArtifactUrl: string | null;
    proofType: 'video' | 'screenshot' | 'doc' | null;
    ctaLabel: string;
}

const PHASE_META = [
    { phase: 1, name: 'Discover', weeks: '1–4', color: 'var(--phase-discover)', Icon: Globe },
    { phase: 2, name: 'Validate', weeks: '5–8', color: 'var(--phase-validate)', Icon: Target },
    { phase: 3, name: 'Build', weeks: '9–12', color: 'var(--phase-build)', Icon: Rocket },
    { phase: 4, name: 'Operate', weeks: '13–16', color: 'var(--phase-operate)', Icon: Settings },
    { phase: 5, name: 'Grow', weeks: '17–20', color: 'var(--phase-grow)', Icon: TrendingUp },
    { phase: 6, name: 'Fundraise', weeks: '21–24', color: 'var(--phase-fundraise)', Icon: Coins },
] as const;

const WEEKS: WeekData[] = [
    // Phase 1: Discover (W1–4)
    { id: 'w01', weekNumber: 1, phase: 1, phaseName: 'Discover', title: 'Finding Your Problem', intent: 'Identify a real, painful problem worth solving.', actions: ['Conduct 5+ customer interviews', 'Map pain points', 'Document findings'], proofArtifactUrl: null, proofType: null, ctaLabel: 'View W1 Guide' },
    { id: 'w02', weekNumber: 2, phase: 1, phaseName: 'Discover', title: 'Market Research Sprint', intent: 'Quantify the size and urgency of your target market.', actions: ['Size the TAM', 'Identify 3 competitors', 'Define target persona'], proofArtifactUrl: null, proofType: null, ctaLabel: 'View W2 Guide' },
    { id: 'w03', weekNumber: 3, phase: 1, phaseName: 'Discover', title: 'Content-Led Discovery', intent: 'Build an audience while testing your hypothesis publicly.', actions: ['Post 3 discovery pieces', 'Track engagement', 'Collect 10 DMs'], proofArtifactUrl: null, proofType: null, ctaLabel: 'View W3 Guide' },
    { id: 'w04', weekNumber: 4, phase: 1, phaseName: 'Discover', title: 'Phase 1 Proof Review', intent: 'Present findings and get cohort feedback.', actions: ['Compile research deck', 'Peer review session', 'Pivot or proceed decision'], proofArtifactUrl: null, proofType: 'doc', ctaLabel: 'Upload Proof' },
    // Phase 2: Validate (W5–8)
    { id: 'w05', weekNumber: 5, phase: 2, phaseName: 'Validate', title: 'Sell Before You Build', intent: 'Get a paying commitment before writing a line of code.', actions: ['Create a landing page', 'Drive 50 visitors', 'Collect 1 pre-order'], proofArtifactUrl: null, proofType: 'screenshot', ctaLabel: 'Upload Proof' },
    { id: 'w06', weekNumber: 6, phase: 2, phaseName: 'Validate', title: 'Dropshipping Sprint', intent: 'Run a live product business in one week.', actions: ['Source 1 product', 'List on marketplace', 'Make first sale'], proofArtifactUrl: null, proofType: 'screenshot', ctaLabel: 'Upload Proof' },
    { id: 'w07', weekNumber: 7, phase: 2, phaseName: 'Validate', title: 'Pricing & Negotiation', intent: 'Test premium pricing and handle real objections.', actions: ['Price 3 variations', 'Run A/B test', 'Document conversion rate'], proofArtifactUrl: null, proofType: null, ctaLabel: 'View W7 Guide' },
    { id: 'w08', weekNumber: 8, phase: 2, phaseName: 'Validate', title: 'Revenue Milestone Review', intent: 'Hit ₹[X] revenue — your first verified proof of concept.', actions: ['Submit revenue screenshot', 'User testimonial', 'Week 8 cohort demo'], proofArtifactUrl: null, proofType: 'screenshot', ctaLabel: 'Upload Proof' },
    // Phase 3: Build (W9–12)
    { id: 'w09', weekNumber: 9, phase: 3, phaseName: 'Build', title: 'MVP Architecture Sprint', intent: 'Ship a working product in 4 days, not 4 months.', actions: ['Define core user flow', 'Select no-code/low-code stack', 'Build V1'], proofArtifactUrl: null, proofType: 'video', ctaLabel: 'Upload Demo' },
    { id: 'w10', weekNumber: 10, phase: 3, phaseName: 'Build', title: 'User Testing Week', intent: 'Get real users to break your MVP.', actions: ['Recruit 5 beta users', 'Record 3 sessions', 'Prioritize fixes'], proofArtifactUrl: null, proofType: 'video', ctaLabel: 'Upload Proof' },
    { id: 'w11', weekNumber: 11, phase: 3, phaseName: 'Build', title: 'Chitale Bandhu Factory Visit', intent: 'Study large-scale operations and supply chains firsthand.', actions: ['Observe production flow', 'Map supply chain', 'Write insights report'], proofArtifactUrl: null, proofType: 'doc', ctaLabel: 'Upload Report' },
    { id: 'w12', weekNumber: 12, phase: 3, phaseName: 'Build', title: 'MVP Launch Day', intent: 'Public launch — acquire your first 10 real users.', actions: ['Post launch content', 'Collect feedback', 'Reach 10-user milestone'], proofArtifactUrl: null, proofType: 'screenshot', ctaLabel: 'Upload Proof' },
    // Phase 4: Operate (W13–16)
    { id: 'w13', weekNumber: 13, phase: 4, phaseName: 'Operate', title: 'Ops & Logistics Setup', intent: 'Build systems that run without you.', actions: ['Map fulfillment flow', 'Set SLA targets', 'Document SOPs'], proofArtifactUrl: null, proofType: 'doc', ctaLabel: 'Upload SOP' },
    { id: 'w14', weekNumber: 14, phase: 4, phaseName: 'Operate', title: 'Vendor & Supply Chain', intent: 'Negotiate real terms with real suppliers.', actions: ['Contact 3 vendors', 'Negotiate 1 deal', 'Document unit economics'], proofArtifactUrl: null, proofType: 'doc', ctaLabel: 'Upload Proof' },
    { id: 'w15', weekNumber: 15, phase: 4, phaseName: 'Operate', title: 'AgriTech Challenge', intent: 'Solve a real agricultural or sustainability problem.', actions: ['Define agri user pain', 'Prototype solution', 'Present to panel'], proofArtifactUrl: null, proofType: 'video', ctaLabel: 'Upload Pitch' },
    { id: 'w16', weekNumber: 16, phase: 4, phaseName: 'Operate', title: 'Operational Review', intent: 'Audit your ops: speed, cost, NPS.', actions: ['Run NPS survey', 'Calculate CAC vs LTV', 'Present ops audit'], proofArtifactUrl: null, proofType: 'doc', ctaLabel: 'Upload Audit' },
    // Phase 5: Grow (W17–20)
    { id: 'w17', weekNumber: 17, phase: 5, phaseName: 'Grow', title: 'Growth Loop Design', intent: 'Find the one channel that 10x\'s your user base.', actions: ['Map 3 growth loops', 'Run paid + organic test', 'Measure CAC'], proofArtifactUrl: null, proofType: 'screenshot', ctaLabel: 'Upload Data' },
    { id: 'w18', weekNumber: 18, phase: 5, phaseName: 'Grow', title: 'Community & Content Engine', intent: 'Turn users into advocates who recruit for you.', actions: ['Launch referral mechanism', 'Publish 5 pieces weekly', 'Build newsletter'], proofArtifactUrl: null, proofType: 'screenshot', ctaLabel: 'Upload Proof' },
    { id: 'w19', weekNumber: 19, phase: 5, phaseName: 'Grow', title: 'Seed Fund Internal Pitch', intent: 'Compete for internal seed capital based on traction.', actions: ['Prepare 5-slide deck', 'Revenue screenshot', '3-min pitch presentation'], proofArtifactUrl: null, proofType: 'video', ctaLabel: 'Upload Pitch' },
    { id: 'w20', weekNumber: 20, phase: 5, phaseName: 'Grow', title: 'Growth Milestone Check', intent: 'Hit [X] users, [Y] revenue — your growth proof.', actions: ['Submit updated metrics', 'Peer feedback session', 'Revise go-to-market'], proofArtifactUrl: null, proofType: 'screenshot', ctaLabel: 'Upload Proof' },
    // Phase 6: Fundraise (W21–24)
    { id: 'w21', weekNumber: 21, phase: 6, phaseName: 'Fundraise', title: 'Pitch Deck Architecture', intent: 'Build a deck that makes investors lean forward.', actions: ['Draft 10-slide deck', 'Add verified traction slide', 'Peer deck review'], proofArtifactUrl: null, proofType: 'doc', ctaLabel: 'Upload Deck' },
    { id: 'w22', weekNumber: 22, phase: 6, phaseName: 'Fundraise', title: 'VC Simulation Round', intent: 'Get grilled by experienced investors — for real.', actions: ['3-minute pitch', 'Live Q&A session', 'Incorporate feedback'], proofArtifactUrl: null, proofType: 'video', ctaLabel: 'Upload Pitch' },
    { id: 'w23', weekNumber: 23, phase: 6, phaseName: 'Fundraise', title: 'Demo Day Prep', intent: 'Polish your narrative, demo, and numbers.', actions: ['Final deck polish', '5-min demo rehearsal', 'Invite network to Demo Day'], proofArtifactUrl: null, proofType: null, ctaLabel: 'View W23 Guide' },
    { id: 'w24', weekNumber: 24, phase: 6, phaseName: 'Fundraise', title: 'Demo Day', intent: 'Present to investors, mentors, and the public. Ship it.', actions: ['Live 5-min pitch', 'Public product demo', 'Celebrate & next steps'], proofArtifactUrl: null, proofType: 'video', ctaLabel: 'Upload Final Proof' },
];

// ── Component ────────────────────────────────────────────────────────────────
export const WeekTimeline: React.FC = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeWeek, setActiveWeek] = useState(0); // 0-indexed
    const [activePhase, setActivePhase] = useState(0); // 0-indexed phase
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollStart = useRef(0);

    const CARD_WIDTH = 256; // px incl gap

    /* ── Scroll to week ── */
    const scrollToWeek = useCallback((idx: number) => {
        const track = trackRef.current;
        if (!track) return;
        const target = Math.max(0, Math.min(idx, WEEKS.length - 1));
        setActiveWeek(target);
        setActivePhase(WEEKS[target].phase - 1);
        track.scrollTo({ left: target * CARD_WIDTH, behavior: 'smooth' });
    }, []);

    const scrollToPhase = useCallback((phaseIdx: number) => {
        const firstWeekIdx = phaseIdx * 4; // 4 weeks per phase
        scrollToWeek(firstWeekIdx);
    }, [scrollToWeek]);

    /* ── Keyboard navigation ── */
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft': e.preventDefault(); scrollToWeek(activeWeek - 1); break;
            case 'ArrowRight': e.preventDefault(); scrollToWeek(activeWeek + 1); break;
            case 'Home': e.preventDefault(); scrollToWeek(0); break;
            case 'End': e.preventDefault(); scrollToWeek(WEEKS.length - 1); break;
        }
    }, [activeWeek, scrollToWeek]);

    /* ── Mouse drag ── */
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragScrollStart.current = trackRef.current?.scrollLeft ?? 0;
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current || !trackRef.current) return;
        const dx = dragStartX.current - e.clientX;
        trackRef.current.scrollLeft = dragScrollStart.current + dx;
    }, []);

    const handleMouseUp = useCallback(() => {
        if (!isDragging.current || !trackRef.current) return;
        isDragging.current = false;
        // Snap to nearest card
        const nearest = Math.round(trackRef.current.scrollLeft / CARD_WIDTH);
        scrollToWeek(nearest);
    }, [scrollToWeek]);

    /* ── Scroll sync: update active week on scroll ── */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const onScroll = () => {
            const idx = Math.round(track.scrollLeft / CARD_WIDTH);
            setActiveWeek(idx);
            setActivePhase(WEEKS[Math.min(idx, WEEKS.length - 1)].phase - 1);
        };
        track.addEventListener('scroll', onScroll, { passive: true });
        return () => track.removeEventListener('scroll', onScroll);
    }, []);

    const activeWeekData = WEEKS[activeWeek];
    const phaseColor = PHASE_META[activePhase]?.color ?? 'var(--phase-discover)';

    return (
        <section
            className="py-24 overflow-hidden"
            style={{ background: 'var(--color-bg-secondary)' }}
            aria-labelledby="timeline-heading"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="reveal mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px" style={{ background: 'var(--color-brand-primary)' }} aria-hidden="true" />
                        <span
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: 'var(--color-brand-primary)' }}
                        >
                            Program Structure
                        </span>
                    </div>
                    <h2
                        id="timeline-heading"
                        className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}
                    >
                        The 24-Week Journey
                    </h2>
                    <p className="text-base max-w-2xl" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        Drag, swipe, or use your keyboard to explore every week. Each phase builds directly on the last.
                    </p>
                </div>

                {/* Phase navigation pills */}
                <div
                    className="flex flex-wrap gap-2 mb-8"
                    role="tablist"
                    aria-label="Program phases"
                >
                    {PHASE_META.map((p, i) => {
                        const Icon = p.Icon;
                        const isActive = i === activePhase;
                        return (
                            <button
                                key={p.phase}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`phase-panel-${p.phase}`}
                                onClick={() => scrollToPhase(i)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                                style={{
                                    border: `1px solid ${isActive ? p.color : 'var(--color-border-default)'}`,
                                    background: isActive ? `${p.color}22` : 'transparent',
                                    color: isActive ? p.color : 'var(--color-text-muted)',
                                    transition: 'all 160ms ease',
                                }}
                            >
                                <Icon size={12} aria-hidden="true" />
                                {p.name}
                                <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>W{p.weeks}</span>
                            </button>
                        );
                    })}
                </div>

                {/* ARIA slider container */}
                <div
                    role="slider"
                    aria-label="Week timeline"
                    aria-valuemin={1}
                    aria-valuemax={24}
                    aria-valuenow={activeWeek + 1}
                    aria-valuetext={`Week ${activeWeek + 1}: ${activeWeekData.title} (Phase ${activeWeekData.phase}: ${activeWeekData.phaseName})`}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className="relative"
                    style={{ outline: 'none' }}
                >
                    {/* Focus ring override for slider */}
                    <style>{`[role="slider"]:focus-visible { outline: 2px solid var(--color-border-focus); outline-offset: 4px; border-radius: 8px; }`}</style>

                    {/* Keyboard hint */}
                    <p
                        className="sr-only"
                        aria-live="polite"
                    >
                        Week {activeWeek + 1} of 24: {activeWeekData.title}. Use left and right arrow keys to navigate.
                    </p>

                    {/* Track */}
                    <div
                        ref={trackRef}
                        className="timeline-track"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        aria-hidden="true" // Mouse users navigate via drag; keyboard via the parent slider
                    >
                        {/* Left padding sentinel */}
                        <div style={{ flexShrink: 0, width: 1 }} />

                        {WEEKS.map((week, i) => {
                            const isActive = i === activeWeek;
                            const pMeta = PHASE_META[week.phase - 1];
                            const color = pMeta.color;
                            return (
                                <div
                                    key={week.id}
                                    className="timeline-week-card"
                                    onClick={() => scrollToWeek(i)}
                                    style={{
                                        borderColor: isActive ? color : 'var(--color-border-default)',
                                        background: isActive ? `color-mix(in srgb, ${color} 8%, var(--color-surface-card))` : 'var(--color-surface-card)',
                                        transition: 'border-color 200ms ease, background 200ms ease, transform 200ms ease',
                                        cursor: 'pointer',
                                        transform: isActive ? 'translateY(-4px)' : 'none',
                                    }}
                                >
                                    {/* Phase badge */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                            style={{
                                                background: `${color}22`,
                                                color,
                                                border: `1px solid ${color}44`,
                                            }}
                                        >
                                            {week.phaseName}
                                        </span>
                                        <span
                                            className="text-xs font-mono"
                                            style={{ color: 'var(--color-text-muted)' }}
                                        >
                                            W{week.weekNumber.toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Week title */}
                                    <h3
                                        className="text-sm font-bold mb-2 leading-tight"
                                        style={{
                                            fontFamily: 'Space Grotesk, sans-serif',
                                            color: 'var(--color-text-primary)',
                                        }}
                                    >
                                        {week.title}
                                    </h3>

                                    {/* Intent */}
                                    <p
                                        className="text-xs mb-4 leading-relaxed"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        {week.intent}
                                    </p>

                                    {/* Actions */}
                                    <ul className="space-y-1.5">
                                        {week.actions.map((action) => (
                                            <li
                                                key={action}
                                                className="flex items-start gap-2 text-xs"
                                                style={{ color: 'var(--color-text-muted)' }}
                                            >
                                                <span
                                                    className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                                                    style={{ background: color }}
                                                    aria-hidden="true"
                                                />
                                                {action}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Proof badge */}
                                    {week.proofType && (
                                        <div
                                            className="mt-4 pt-3 flex items-center gap-1.5 text-xs font-bold"
                                            style={{
                                                borderTop: '1px solid var(--color-border-subtle)',
                                                color,
                                            }}
                                        >
                                            <span aria-hidden="true">
                                                {week.proofType === 'video' ? '📹' : week.proofType === 'screenshot' ? '📸' : '📄'}
                                            </span>
                                            {week.ctaLabel}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Right padding sentinel */}
                        <div style={{ flexShrink: 0, width: 24 }} />
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={() => scrollToWeek(activeWeek - 1)}
                            disabled={activeWeek === 0}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                            style={{
                                background: 'var(--color-surface-card)',
                                border: '1px solid var(--color-border-default)',
                                color: activeWeek === 0 ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                                opacity: activeWeek === 0 ? 0.4 : 1,
                                cursor: activeWeek === 0 ? 'not-allowed' : 'pointer',
                            }}
                            aria-label="Previous week"
                        >
                            <ChevronLeft size={16} aria-hidden="true" /> Prev
                        </button>

                        {/* Progress indicator */}
                        <div className="flex items-center gap-3">
                            <span
                                className="text-xs font-mono"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                Week {activeWeek + 1} / 24
                            </span>
                            {/* Progress bar */}
                            <div
                                className="h-1 w-32 rounded-full overflow-hidden"
                                style={{ background: 'var(--color-border-default)' }}
                                role="progressbar"
                                aria-valuenow={activeWeek + 1}
                                aria-valuemin={1}
                                aria-valuemax={24}
                                aria-label="Timeline progress"
                            >
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${((activeWeek + 1) / 24) * 100}%`,
                                        background: phaseColor,
                                        transition: 'width 200ms cubic-bezier(0,0,0.2,1)',
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => scrollToWeek(activeWeek + 1)}
                            disabled={activeWeek === WEEKS.length - 1}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                            style={{
                                background: 'var(--color-surface-card)',
                                border: '1px solid var(--color-border-default)',
                                color: activeWeek === WEEKS.length - 1 ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                                opacity: activeWeek === WEEKS.length - 1 ? 0.4 : 1,
                                cursor: activeWeek === WEEKS.length - 1 ? 'not-allowed' : 'pointer',
                            }}
                            aria-label="Next week"
                        >
                            Next <ChevronRight size={16} aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Active week detail panel */}
                <div
                    id={`phase-panel-${activeWeekData.phase}`}
                    role="tabpanel"
                    className="mt-8 p-6 rounded-2xl"
                    style={{
                        background: 'var(--color-surface-card)',
                        border: `1px solid ${phaseColor}44`,
                    }}
                    aria-label={`Phase ${activeWeekData.phase}: ${activeWeekData.phaseName} details`}
                >
                    <div className="flex flex-wrap items-start gap-4 justify-between">
                        <div>
                            <p
                                className="text-xs font-bold uppercase tracking-widest mb-1"
                                style={{ color: phaseColor }}
                            >
                                Phase {activeWeekData.phase}: {activeWeekData.phaseName} · Week {activeWeekData.weekNumber}
                            </p>
                            <h3
                                className="text-xl font-bold"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}
                            >
                                {activeWeekData.title}
                            </h3>
                            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                {activeWeekData.intent}
                            </p>
                        </div>
                        {activeWeekData.proofType && (
                            <button
                                className="btn-primary py-2 px-5 text-xs"
                                style={{ background: phaseColor }}
                                aria-label={activeWeekData.ctaLabel}
                            >
                                {activeWeekData.ctaLabel}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
