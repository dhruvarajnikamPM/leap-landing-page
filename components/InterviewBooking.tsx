
import React, { useState } from 'react';
import { trackEvent } from '../App';
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react';

// Asia/Kolkata date/time utilities
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const now = () => new Date(Date.now() + IST_OFFSET_MS);

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getMonthStart(year: number, month: number) {
    return new Date(year, month, 1).getDay(); // 0=Sun
}

const TIME_SLOTS = [
    { id: 'slot-1', label: '10:00 AM', type: 'Morning', tz: 'IST' },
    { id: 'slot-2', label: '11:30 AM', type: 'Morning', tz: 'IST' },
    { id: 'slot-3', label: '2:00 PM', type: 'Afternoon', tz: 'IST' },
    { id: 'slot-4', label: '4:00 PM', type: 'Afternoon', tz: 'IST' },
    { id: 'slot-5', label: '5:30 PM', type: 'Evening', tz: 'IST' },
];

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const InterviewBooking: React.FC = () => {
    const istNow = now();
    const [viewYear, setViewYear] = useState(istNow.getFullYear());
    const [viewMonth, setViewMonth] = useState(istNow.getMonth());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [booked, setBooked] = useState(false);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const startDay = getMonthStart(viewYear, viewMonth);

    const todayStr = `${istNow.getFullYear()}-${String(istNow.getMonth() + 1).padStart(2, '0')}-${String(istNow.getDate()).padStart(2, '0')}`;

    const prevMonth = () => {
        setViewMonth(m => { if (m === 0) { setViewYear(y => y - 1); return 11; } return m - 1; });
    };
    const nextMonth = () => {
        setViewMonth(m => { if (m === 11) { setViewYear(y => y + 1); return 0; } return m + 1; });
    };

    const handleBook = () => {
        if (!selectedDate || !selectedSlot) return;
        setBooked(true);
        trackEvent('interview_booked', { date: selectedDate, slot: selectedSlot });
    };

    if (booked) {
        const slot = TIME_SLOTS.find(s => s.id === selectedSlot);
        return (
            <div className="text-center py-12 px-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <CheckCircle size={32} color="#10b981" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}>
                    Interview booked!
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
                    {selectedDate} at {slot?.label} IST. You'll receive a confirmation on WhatsApp.
                </p>
            </div>
        );
    }

    return (
        <section
            className="py-16 px-6"
            style={{ background: 'var(--color-bg-primary)' }}
            aria-labelledby="booking-heading"
        >
            <div className="max-w-xl mx-auto">
                <div className="mb-8">
                    <h2
                        id="booking-heading"
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}
                    >
                        Book Your Interview
                    </h2>
                    <p className="text-sm flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                        <Clock size={14} aria-hidden="true" />
                        All times shown in Indian Standard Time (IST, UTC+5:30)
                    </p>
                </div>

                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border-default)' }}
                >
                    {/* Calendar header */}
                    <div
                        className="flex items-center justify-between px-6 py-4"
                        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                    >
                        <button
                            onClick={prevMonth}
                            className="p-2 rounded-lg transition-all"
                            style={{ color: 'var(--color-text-secondary)' }}
                            aria-label="Previous month"
                        >
                            <ChevronLeft size={18} aria-hidden="true" />
                        </button>
                        <h3
                            className="text-sm font-bold"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}
                            aria-live="polite"
                        >
                            {MONTH_NAMES[viewMonth]} {viewYear}
                        </h3>
                        <button
                            onClick={nextMonth}
                            className="p-2 rounded-lg transition-all"
                            style={{ color: 'var(--color-text-secondary)' }}
                            aria-label="Next month"
                        >
                            <ChevronRight size={18} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Day names */}
                    <div className="grid grid-cols-7 px-4 pt-4">
                        {DAY_NAMES.map(d => (
                            <div key={d} className="text-center text-xs font-bold pb-2" style={{ color: 'var(--color-text-muted)' }}>
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div
                        className="grid grid-cols-7 gap-1 px-4 pb-4"
                        role="grid"
                        aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear} calendar`}
                    >
                        {/* Empty cells before month start */}
                        {Array.from({ length: startDay }).map((_, i) => (
                            <div key={`empty-${i}`} role="gridcell" />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const isPast = dateStr < todayStr;
                            const isSelected = dateStr === selectedDate;
                            const isToday = dateStr === todayStr;
                            const isWeekend = new Date(viewYear, viewMonth, day).getDay() % 6 === 0;

                            return (
                                <button
                                    key={day}
                                    role="gridcell"
                                    aria-label={`${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}${isPast ? ' (unavailable)' : ''}${isToday ? ' (today)' : ''}`}
                                    aria-pressed={isSelected}
                                    disabled={isPast || isWeekend}
                                    onClick={() => setSelectedDate(dateStr)}
                                    className="aspect-square rounded-lg text-sm font-medium transition-all flex items-center justify-center"
                                    style={{
                                        background: isSelected ? 'var(--color-brand-primary)' : isToday ? 'var(--color-brand-primary-light)' : 'transparent',
                                        color: isSelected ? '#fff' : isPast || isWeekend ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                                        opacity: isPast || isWeekend ? 0.3 : 1,
                                        cursor: isPast || isWeekend ? 'not-allowed' : 'pointer',
                                        border: isToday && !isSelected ? '1px solid var(--color-brand-primary)' : '1px solid transparent',
                                    }}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {/* Time slots */}
                    {selectedDate && (
                        <div
                            className="px-6 pb-6"
                            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                        >
                            <p className="text-xs font-bold uppercase tracking-widest pt-4 mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Available times on {selectedDate}
                            </p>
                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                                role="group"
                                aria-label="Interview time slots"
                            >
                                {TIME_SLOTS.map(slot => {
                                    const isActive = selectedSlot === slot.id;
                                    return (
                                        <button
                                            key={slot.id}
                                            onClick={() => setSelectedSlot(slot.id)}
                                            aria-pressed={isActive}
                                            className="py-3 px-4 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                background: isActive ? 'var(--color-brand-primary)' : 'var(--color-surface-input)',
                                                border: `1px solid ${isActive ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
                                                color: isActive ? '#fff' : 'var(--color-text-primary)',
                                            }}
                                        >
                                            <span className="block font-bold">{slot.label}</span>
                                            <span className="block text-xs opacity-70">{slot.type} · {slot.tz}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Book button */}
                    <div className="px-6 pb-6">
                        <button
                            onClick={handleBook}
                            disabled={!selectedDate || !selectedSlot}
                            className="btn-primary w-full"
                            style={{
                                opacity: !selectedDate || !selectedSlot ? 0.4 : 1,
                                cursor: !selectedDate || !selectedSlot ? 'not-allowed' : 'pointer',
                            }}
                            aria-disabled={!selectedDate || !selectedSlot}
                        >
                            Confirm Interview Booking
                        </button>
                        <p className="text-xs text-center mt-2" style={{ color: 'var(--color-text-muted)' }}>
                            WhatsApp confirmation sent after booking · IST timezone
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
