
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface StickyCTAProps {
    onApplyClick: () => void;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ onApplyClick }) => {
    const [visible, setVisible] = useState(false);
    const [seatsLeft] = useState(12); // placeholder — wire to your backend

    useEffect(() => {
        const heroSection = document.querySelector('section');
        if (!heroSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show sticky CTA once hero is no longer visible
                setVisible(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(heroSection);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`sticky-cta ${visible ? 'visible' : ''}`}
            role="complementary"
            aria-label="Apply to LEAP cohort"
        >
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                {/* Left: program detail */}
                <div className="hidden sm:flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                    <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Next cohort: April 20, 2026
                    </span>
                    <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{
                            background: 'rgba(239,68,68,0.15)',
                            color: '#ef4444',
                            border: '1px solid rgba(239,68,68,0.3)',
                        }}
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {seatsLeft} seats left
                    </span>
                </div>

                {/* Right: CTA */}
                <div className="flex items-center gap-3 ml-auto">
                    <span
                        className="text-sm font-medium sm:hidden"
                        style={{ color: 'var(--color-text-secondary)' }}
                        aria-live="polite"
                    >
                        {seatsLeft} seats left
                    </span>
                    <button
                        onClick={onApplyClick}
                        className="btn-primary flex items-center gap-2 py-3 px-6 text-sm"
                        aria-label="Apply for the LEAP 24-week cohort"
                    >
                        Apply Now
                        <ArrowRight size={16} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
};
