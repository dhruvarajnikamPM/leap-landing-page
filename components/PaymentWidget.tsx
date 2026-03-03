
import React, { useState } from 'react';
import { trackEvent } from '../App';
import { Smartphone, QrCode, CreditCard, Building2, CheckCircle } from 'lucide-react';

type PayTab = 'upi' | 'qr' | 'card' | 'bulk';

const TABS: { id: PayTab; label: string; Icon: React.FC<any> }[] = [
    { id: 'upi', label: 'UPI', Icon: Smartphone },
    { id: 'qr', label: 'QR Code', Icon: QrCode },
    { id: 'card', label: 'Card', Icon: CreditCard },
    { id: 'bulk', label: 'College Pay', Icon: Building2 },
];

const SEATS_REMAINING = 12; // Wire to live backend

export const PaymentWidget: React.FC = () => {
    const [activeTab, setActiveTab] = useState<PayTab>('upi');
    const [upiId, setUpiId] = useState('');
    const [cardDetails, setCardDetails] = useState({ num: '', expiry: '', cvv: '', name: '' });
    const [institutionCode, setInstitutionCode] = useState('');
    const [paid, setPaid] = useState(false);

    const handlePay = () => {
        setPaid(true);
        trackEvent('payment_complete', { method: activeTab });
    };

    if (paid) {
        return (
            <div className="text-center py-16 px-6">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                    aria-hidden="true"
                >
                    <CheckCircle size={32} color="#10b981" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}>
                    Payment confirmed!
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
                    Your seat is reserved. Upload your Week 0 proof to officially lock it.
                </p>
            </div>
        );
    }

    return (
        <section
            className="py-16 px-6"
            style={{ background: 'var(--color-bg-secondary)' }}
            aria-labelledby="payment-heading"
        >
            <div className="max-w-lg mx-auto">
                <div className="mb-8">
                    <h2
                        id="payment-heading"
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}
                    >
                        Secure Your Seat
                    </h2>
                    <div className="flex items-center gap-3">
                        <span
                            className="text-xs px-3 py-1 rounded-full font-bold"
                            style={{
                                background: 'rgba(239,68,68,0.12)',
                                color: '#ef4444',
                                border: '1px solid rgba(239,68,68,0.3)',
                            }}
                            aria-live="polite"
                        >
                            {SEATS_REMAINING} seats remaining
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            Next cohort: April 20, 2026
                        </span>
                    </div>
                </div>

                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-default)' }}
                >
                    {/* Tab list */}
                    <div
                        role="tablist"
                        aria-label="Payment method"
                        className="flex border-b"
                        style={{ borderColor: 'var(--color-border-default)' }}
                    >
                        {TABS.map(({ id, label, Icon }) => {
                            const isActive = id === activeTab;
                            return (
                                <button
                                    key={id}
                                    role="tab"
                                    id={`tab-${id}`}
                                    aria-selected={isActive}
                                    aria-controls={`panel-${id}`}
                                    onClick={() => setActiveTab(id)}
                                    className="flex-1 flex flex-col items-center gap-1 py-4 text-xs font-bold uppercase tracking-wide transition-all"
                                    style={{
                                        background: isActive ? 'var(--color-brand-primary-light)' : 'transparent',
                                        color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                                        borderBottom: isActive ? '2px solid var(--color-brand-primary)' : '2px solid transparent',
                                    }}
                                >
                                    <Icon size={18} aria-hidden="true" />
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Panel content */}
                    <div className="p-8">
                        {activeTab === 'upi' && (
                            <div role="tabpanel" id="panel-upi" aria-labelledby="tab-upi">
                                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                                    Pay instantly via any UPI app. We'll send a payment request to your UPI ID.
                                </p>
                                <label htmlFor="upi-id" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                    Your UPI ID
                                </label>
                                <input
                                    id="upi-id"
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    placeholder="yourname@upi"
                                    autoComplete="off"
                                    className="w-full px-4 py-3.5 rounded-xl text-sm mb-6"
                                    style={{
                                        background: 'var(--color-surface-input)',
                                        border: '1px solid var(--color-border-default)',
                                        color: 'var(--color-text-primary)',
                                        outline: 'none',
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-brand-primary)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-default)'; }}
                                />
                                <div className="flex items-center gap-3 mb-6">
                                    {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                                        <span
                                            key={app}
                                            className="text-xs px-2 py-1 rounded-md font-medium"
                                            style={{ background: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                                        >
                                            {app}
                                        </span>
                                    ))}
                                </div>
                                <button onClick={handlePay} className="btn-primary w-full">
                                    Send UPI Request
                                </button>
                            </div>
                        )}

                        {activeTab === 'qr' && (
                            <div role="tabpanel" id="panel-qr" aria-labelledby="tab-qr" className="text-center">
                                <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                    Scan this QR code with any UPI app to pay.
                                </p>
                                {/* QR Placeholder */}
                                <div
                                    className="w-48 h-48 mx-auto rounded-2xl flex items-center justify-center mb-6"
                                    style={{ background: '#fff', border: '1px solid var(--color-border-default)' }}
                                    aria-label="UPI QR code (placeholder — replace with generated QR)"
                                >
                                    <QrCode size={120} color="#1a1a1a" aria-hidden="true" />
                                </div>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                    UPI ID: leapmovement@ybl · Amount: ₹[Your Fee]
                                </p>
                                <button onClick={handlePay} className="btn-secondary mt-6 mx-auto">
                                    I've paid via QR
                                </button>
                            </div>
                        )}

                        {activeTab === 'card' && (
                            <div role="tabpanel" id="panel-card" aria-labelledby="tab-card">
                                <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                    Visa, Mastercard, RuPay accepted. Secured via Razorpay / Stripe.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { id: 'card-name', label: 'Name on card', type: 'text', placeholder: 'Full Name', key: 'name' },
                                        { id: 'card-num', label: 'Card number', type: 'text', placeholder: '1234 5678 9012 3456', key: 'num' },
                                    ].map(f => (
                                        <div key={f.id}>
                                            <label htmlFor={f.id} className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>{f.label}</label>
                                            <input
                                                id={f.id}
                                                type={f.type}
                                                placeholder={f.placeholder}
                                                className="w-full px-4 py-3.5 rounded-xl text-sm"
                                                style={{ background: 'var(--color-surface-input)', border: '1px solid var(--color-border-default)', color: 'var(--color-text-primary)', outline: 'none' }}
                                                onFocus={(e) => { e.target.style.borderColor = 'var(--color-brand-primary)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-default)'; }}
                                            />
                                        </div>
                                    ))}
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { id: 'card-expiry', label: 'Expiry', placeholder: 'MM / YY' },
                                            { id: 'card-cvv', label: 'CVV', placeholder: '···' },
                                        ].map(f => (
                                            <div key={f.id}>
                                                <label htmlFor={f.id} className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>{f.label}</label>
                                                <input
                                                    id={f.id}
                                                    type="text"
                                                    placeholder={f.placeholder}
                                                    className="w-full px-4 py-3.5 rounded-xl text-sm"
                                                    style={{ background: 'var(--color-surface-input)', border: '1px solid var(--color-border-default)', color: 'var(--color-text-primary)', outline: 'none' }}
                                                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-brand-primary)'; }}
                                                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-default)'; }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={handlePay} className="btn-primary w-full mt-6">
                                    Pay Securely
                                </button>
                                <p className="text-xs text-center mt-2" style={{ color: 'var(--color-text-muted)' }}>
                                    🔒 256-bit SSL encryption
                                </p>
                            </div>
                        )}

                        {activeTab === 'bulk' && (
                            <div role="tabpanel" id="panel-bulk" aria-labelledby="tab-bulk">
                                <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                    For colleges enrolling 10+ students. Receive a bulk invoice with institutional payment terms (Net 30).
                                </p>
                                <label htmlFor="institution-code" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                    Institution / MoU Code
                                </label>
                                <input
                                    id="institution-code"
                                    type="text"
                                    value={institutionCode}
                                    onChange={(e) => setInstitutionCode(e.target.value)}
                                    placeholder="e.g. IITB-LEAP-2026"
                                    className="w-full px-4 py-3.5 rounded-xl text-sm mb-6"
                                    style={{ background: 'var(--color-surface-input)', border: '1px solid var(--color-border-default)', color: 'var(--color-text-primary)', outline: 'none' }}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-brand-primary)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-default)'; }}
                                />
                                <button onClick={handlePay} className="btn-primary w-full">
                                    Request Bulk Invoice
                                </button>
                                <p className="text-xs text-center mt-3" style={{ color: 'var(--color-text-muted)' }}>
                                    Our institutional team will respond within 24 hours with a formal invoice.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
