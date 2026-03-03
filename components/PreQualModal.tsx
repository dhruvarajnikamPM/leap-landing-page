
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Phone, Building, CheckCircle, MessageCircle } from 'lucide-react';
import { trackEvent } from '../App';

interface PreQualModalProps {
    onClose: () => void;
}

type Step = 'form' | 'success';

/* India phone validation: +91 followed by 6–9 starting 10 digits */
const INDIA_PHONE_RE = /^[6-9]\d{9}$/;

export const PreQualModal: React.FC<PreQualModalProps> = ({ onClose }) => {
    const [step, setStep] = useState<Step>('form');
    const [phone, setPhone] = useState('');
    const [college, setCollege] = useState('');
    const [errors, setErrors] = useState<{ phone?: string; college?: string }>({});
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);

    /* Focus trap + ESC handler */
    useEffect(() => {
        firstInputRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, input, [tabindex]:not([tabindex="-1"])'
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
                    e.preventDefault();
                    (e.shiftKey ? last : first).focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const validate = () => {
        const e: { phone?: string; college?: string } = {};
        const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '');
        if (!INDIA_PHONE_RE.test(cleanPhone)) {
            e.phone = 'Enter a valid 10-digit Indian mobile number (starts with 6–9)';
        }
        if (college.trim().length < 3) {
            e.college = 'Enter your college or institution name';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = useCallback(
        async (ev: React.FormEvent) => {
            ev.preventDefault();
            if (!validate()) return;
            setLoading(true);
            // Simulate async submit (replace with real API call)
            await new Promise((r) => setTimeout(r, 800));
            setLoading(false);
            setStep('success');
            trackEvent('prequal_submit', { college });
        },
        [phone, college]
    );

    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '');
    const whatsappText = encodeURIComponent(
        `Hi LEAP! I'm interested in the 24-Week Startup Cohort. My name is [Your Name], from ${college}.`
    );
    const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

    return (
        <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prequal-title"
            aria-describedby="prequal-desc"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div ref={modalRef} className="modal-panel" style={{ maxWidth: '480px' }}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full transition-all"
                    style={{ background: 'var(--color-border-default)' }}
                    aria-label="Close modal"
                >
                    <X size={18} style={{ color: 'var(--color-text-secondary)' }} />
                </button>

                {step === 'form' ? (
                    <>
                        {/* Header */}
                        <div className="mb-8">
                            <div
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                                style={{
                                    background: 'var(--color-brand-primary-light)',
                                    color: 'var(--color-brand-primary)',
                                    border: '1px solid var(--color-border-active)',
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                April 2026 Cohort Open
                            </div>
                            <h2
                                id="prequal-title"
                                className="text-2xl font-bold tracking-tight mb-2"
                                style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                Apply to LEAP
                            </h2>
                            <p
                                id="prequal-desc"
                                className="text-sm"
                                style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}
                            >
                                2 fields. 30 seconds. Our team will reach out within 24 hours to schedule your interview.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* Phone field */}
                            <div className="mb-5">
                                <label
                                    htmlFor="prequal-phone"
                                    className="block text-xs font-bold uppercase tracking-widest mb-2"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    Mobile Number (India)
                                </label>
                                <div className="relative">
                                    <div
                                        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
                                        aria-hidden="true"
                                    >
                                        <span className="text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
                                            +91
                                        </span>
                                        <div
                                            className="w-px h-4"
                                            style={{ background: 'var(--color-border-default)' }}
                                        />
                                    </div>
                                    <input
                                        ref={firstInputRef}
                                        id="prequal-phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                                        }}
                                        placeholder="98765 43210"
                                        inputMode="numeric"
                                        autoComplete="tel"
                                        aria-required="true"
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                                        className="w-full pl-20 pr-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                                        style={{
                                            background: 'var(--color-surface-input)',
                                            border: `1px solid ${errors.phone ? 'var(--color-brand-error)' : 'var(--color-border-default)'}`,
                                            color: 'var(--color-text-primary)',
                                            outline: 'none',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--color-brand-primary)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.phone
                                                ? 'var(--color-brand-error)'
                                                : 'var(--color-border-default)';
                                        }}
                                    />
                                </div>
                                {errors.phone && (
                                    <p id="phone-error" role="alert" className="mt-1.5 text-xs" style={{ color: '#ef4444' }}>
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* College field */}
                            <div className="mb-8">
                                <label
                                    htmlFor="prequal-college"
                                    className="block text-xs font-bold uppercase tracking-widest mb-2"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    College / Institution
                                </label>
                                <input
                                    id="prequal-college"
                                    type="text"
                                    value={college}
                                    onChange={(e) => {
                                        setCollege(e.target.value);
                                        if (errors.college) setErrors((p) => ({ ...p, college: undefined }));
                                    }}
                                    placeholder="e.g. IIT Bombay, Pune University..."
                                    autoComplete="organization"
                                    aria-required="true"
                                    aria-invalid={!!errors.college}
                                    aria-describedby={errors.college ? 'college-error' : undefined}
                                    className="w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                                    style={{
                                        background: 'var(--color-surface-input)',
                                        border: `1px solid ${errors.college ? 'var(--color-brand-error)' : 'var(--color-border-default)'}`,
                                        color: 'var(--color-text-primary)',
                                        outline: 'none',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--color-brand-primary)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.college
                                            ? 'var(--color-brand-error)'
                                            : 'var(--color-border-default)';
                                    }}
                                />
                                {errors.college && (
                                    <p id="college-error" role="alert" className="mt-1.5 text-xs" style={{ color: '#ef4444' }}>
                                        {errors.college}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-4 text-sm mb-4"
                                aria-busy={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>

                            <p className="text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                No spam. We respect your time.
                            </p>
                        </form>
                    </>
                ) : (
                    /* Success state */
                    <div className="text-center py-4">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                            aria-hidden="true"
                        >
                            <CheckCircle size={32} color="#10b981" />
                        </div>
                        <h2
                            className="text-2xl font-bold mb-3"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}
                        >
                            You're on the list!
                        </h2>
                        <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            Our team will schedule your interview within 24 hours. Meanwhile, join our WhatsApp group to meet your cohort.
                        </p>

                        {/* WhatsApp CTA */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2 mb-4"
                            style={{ background: '#25D366' }}
                            onClick={() => trackEvent('prequal_submit')}
                        >
                            <MessageCircle size={16} aria-hidden="true" />
                            Join WhatsApp Group
                        </a>

                        <br />
                        <button
                            onClick={onClose}
                            className="text-sm mt-2"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
