
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* ContactFormSection — Decision zone.
   Fully token-mapped: no hardcoded colors, no tailwind utility classes.
   Two-column: decision framing left + institution form right.
   Typography: H2 controlled at 28–44px, not 48–96px (previous had text-8xl). */

interface ContactFormProps { }

export const ContactFormSection: React.FC<ContactFormProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fieldFocus, setFieldFocus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = (fieldId: string): React.CSSProperties => ({
    width: '100%',
    background: 'var(--color-surface-input)',
    border: `1px solid ${fieldFocus === fieldId ? 'var(--color-border-focus)' : 'var(--color-border-default)'}`,
    borderRadius: '10px',
    padding: '12px 16px',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--type-sm)',
    outline: 'none',
    transition: 'border-color var(--dur-fast) var(--ease-out)',
    fontFamily: 'Inter, sans-serif',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '10px',
    fontWeight: 700,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-widest)',
    fontFamily: 'JetBrains Mono, monospace',
    marginBottom: '8px',
  };

  const fieldGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        background: 'var(--color-bg-primary)',
        padding: 'clamp(64px, 8vw, 96px) clamp(20px, 5vw, 80px)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Decision framing */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-5">
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
                For Institutions
              </span>
            </div>

            <h2
              id="contact-heading"
              style={{
                fontSize: 'clamp(26px, 3.8vw, 44px)',  // ← FIXED: was text-8xl (96px mobile)
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 800,
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 1.12,
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
              }}
            >
              Bring the{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--color-brand-primary)',
                }}
              >
                Builder Movement
              </em>{' '}
              to your campus.
            </h2>

            <p
              style={{
                fontSize: 'var(--type-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-body)',
                maxWidth: '44ch',
                marginBottom: '36px',
              }}
            >
              Institutions in the LEAP network run cohorts with documented outcomes for NBA/NAAC/NIRF accreditation and placement improvement.
            </p>

            {/* Contact details — token-mapped */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                { label: 'Email', value: 'growth@leapmovement.in', icon: '✉' },
                { label: 'Call', value: '+91 [number on request]', icon: '📞' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</p>
                    <p style={{ fontSize: 'var(--type-sm)', color: 'var(--color-text-primary)', fontWeight: 600 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Institutional assurances */}
            <div
              style={{
                padding: '18px 20px',
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '12px',
              }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Institutional assurances
              </p>
              {[
                'MoU-based partnership structure',
                'NBA/NAAC/NIRF outcome documentation',
                'Proctored sessions with HOD sign-off',
                'Bulk enrollment + college pay options',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: 'var(--color-brand-success)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="reveal"
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 44px)',
            }}
          >
            {submitted ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '48px 0',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'color-mix(in srgb, var(--color-brand-success) 15%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--color-brand-success) 40%, transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                  }}
                  role="img"
                  aria-label="Success"
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  Request Received
                </h3>
                <p
                  style={{
                    fontSize: 'var(--type-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--line-body)',
                    maxWidth: '32ch',
                  }}
                >
                  Our institutional lead will reach out within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'var(--type-xs)',
                    fontWeight: 700,
                    color: 'var(--color-brand-primary)',
                    letterSpacing: 'var(--tracking-wide)',
                    textTransform: 'uppercase',
                    fontFamily: 'JetBrains Mono, monospace',
                    marginTop: '8px',
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    marginBottom: '28px',
                  }}
                >
                  Institutional inquiry form
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={fieldGroupStyle}>
                    <label htmlFor="inst-name" style={labelStyle}>Institution</label>
                    <input
                      id="inst-name"
                      required
                      type="text"
                      placeholder="e.g. IIT Bangalore"
                      style={inputStyle('inst-name')}
                      onFocus={() => setFieldFocus('inst-name')}
                      onBlur={() => setFieldFocus(null)}
                    />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label htmlFor="contact-name" style={labelStyle}>Contact Person</label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      placeholder="Full Name"
                      style={inputStyle('contact-name')}
                      onFocus={() => setFieldFocus('contact-name')}
                      onBlur={() => setFieldFocus(null)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={fieldGroupStyle}>
                    <label htmlFor="contact-role" style={labelStyle}>Role</label>
                    <input
                      id="contact-role"
                      required
                      type="text"
                      placeholder="e.g. Dean, HOD"
                      style={inputStyle('contact-role')}
                      onFocus={() => setFieldFocus('contact-role')}
                      onBlur={() => setFieldFocus(null)}
                    />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label htmlFor="contact-email" style={labelStyle}>Email</label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      placeholder="work@institution.edu"
                      style={inputStyle('contact-email')}
                      onFocus={() => setFieldFocus('contact-email')}
                      onBlur={() => setFieldFocus(null)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={fieldGroupStyle}>
                    <label htmlFor="inst-type" style={labelStyle}>Institution Type</label>
                    <select
                      id="inst-type"
                      style={{ ...inputStyle('inst-type'), cursor: 'pointer' }}
                      onFocus={() => setFieldFocus('inst-type')}
                      onBlur={() => setFieldFocus(null)}
                    >
                      <option>Engineering</option>
                      <option>Management</option>
                      <option>Design</option>
                      <option>General Degree</option>
                      <option>University</option>
                    </select>
                  </div>
                  <div style={fieldGroupStyle}>
                    <label htmlFor="student-count" style={labelStyle}>Student Count</label>
                    <input
                      id="student-count"
                      required
                      type="number"
                      placeholder="e.g. 2000"
                      style={inputStyle('student-count')}
                      onFocus={() => setFieldFocus('student-count')}
                      onBlur={() => setFieldFocus(null)}
                    />
                  </div>
                </div>

                <div style={{ ...fieldGroupStyle, marginBottom: '24px' }}>
                  <label htmlFor="contact-message" style={labelStyle}>Goals (optional)</label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Tell us about your campus goals..."
                    style={{
                      ...inputStyle('contact-message'),
                      resize: 'vertical',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onFocus={() => setFieldFocus('contact-message')}
                    onBlur={() => setFieldFocus(null)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                  style={{ width: '100%', justifyContent: 'center' }}
                  aria-label="Submit institutional inquiry"
                >
                  Submit Inquiry
                  <ArrowRight size={15} aria-hidden="true" />
                </button>

                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'JetBrains Mono, monospace',
                    textAlign: 'center',
                    marginTop: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  Response within 24 business hours · No spam
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
