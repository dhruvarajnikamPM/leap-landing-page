
import React, { useState } from 'react';
import { trackEvent } from '../App';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export const ProofUpload: React.FC = () => {
    const [uploadType, setUploadType] = useState<'video' | 'text'>('video');
    const [textProof, setTextProof] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
    const [error, setError] = useState('');

    const MAX_VIDEO_MB = 50;
    const MAX_DURATION_S = 30;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > MAX_VIDEO_MB * 1024 * 1024) {
            setError(`Video must be under ${MAX_VIDEO_MB}MB`);
            return;
        }
        setError('');
        setFile(f);
    };

    const handleSubmit = async () => {
        if (uploadType === 'video' && !file) { setError('Please select a video file'); return; }
        if (uploadType === 'text' && textProof.trim().length < 50) {
            setError('Please write at least 50 characters describing your Week 0 progress');
            return;
        }
        setStatus('uploading');
        // Simulate upload (replace with your API)
        await new Promise((r) => setTimeout(r, 1200));
        setStatus('done');
        trackEvent('proof_upload', { type: uploadType, fileName: file?.name });
    };

    return (
        <section
            className="py-16 px-6"
            style={{ background: 'var(--color-bg-tertiary)' }}
            aria-labelledby="proof-upload-heading"
        >
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h2
                        id="proof-upload-heading"
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-primary)' }}
                    >
                        Week 0 Proof Upload
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        Upload a 30-second intro video (or written proof) to lock your seat. This is how we verify you're committed.
                    </p>
                </div>

                {status === 'done' ? (
                    <div className="text-center py-12">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                        >
                            <CheckCircle size={32} color="#10b981" />
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                            Seat locked! 🎉
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Your Week 0 proof has been received. Welcome to the cohort.
                        </p>
                    </div>
                ) : (
                    <div
                        className="p-8 rounded-2xl"
                        style={{
                            background: 'var(--color-surface-card)',
                            border: '1px solid var(--color-border-default)',
                        }}
                    >
                        {/* Toggle: Video / Text */}
                        <div
                            className="flex gap-2 mb-8"
                            role="group"
                            aria-labelledby="upload-type-label"
                        >
                            <span id="upload-type-label" className="sr-only">Upload type</span>
                            {(['video', 'text'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { setUploadType(t); setError(''); }}
                                    className="payment-tab"
                                    aria-pressed={uploadType === t}
                                    aria-selected={uploadType === t}
                                    style={{
                                        background: uploadType === t ? 'var(--color-brand-primary-light)' : 'transparent',
                                        border: `1px solid ${uploadType === t ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
                                        color: uploadType === t ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                                    }}
                                >
                                    {t === 'video' ? '📹 30-sec Video' : '📝 Written Proof'}
                                </button>
                            ))}
                        </div>

                        {uploadType === 'video' ? (
                            <div>
                                <label htmlFor="proof-video" className="block mb-4">
                                    <div
                                        className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all"
                                        style={{
                                            borderColor: file ? 'var(--color-brand-primary)' : 'var(--color-border-default)',
                                            background: file ? 'var(--color-brand-primary-light)' : 'var(--color-surface-input)',
                                        }}
                                    >
                                        <Upload
                                            size={32}
                                            className="mx-auto mb-3"
                                            style={{ color: 'var(--color-text-muted)' }}
                                            aria-hidden="true"
                                        />
                                        {file ? (
                                            <p className="font-medium text-sm" style={{ color: 'var(--color-brand-primary)' }}>
                                                {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                                            </p>
                                        ) : (
                                            <>
                                                <p className="font-medium text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                                    Drop your 30-second video here
                                                </p>
                                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                    MP4 or MOV · Max {MAX_VIDEO_MB}MB · Max {MAX_DURATION_S}s
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        id="proof-video"
                                        type="file"
                                        accept="video/mp4,video/quicktime,video/*"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                        aria-required="true"
                                        aria-describedby={error ? 'proof-error' : 'proof-hint'}
                                    />
                                </label>
                                <p id="proof-hint" className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                    Tell us: who you are, what problem you're solving, and why LEAP.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="proof-text" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                    Written Proof (fallback)
                                </label>
                                <textarea
                                    id="proof-text"
                                    rows={6}
                                    value={textProof}
                                    onChange={(e) => { setTextProof(e.target.value); setError(''); }}
                                    placeholder="Describe who you are, what problem you want to solve, and why you're applying to LEAP. Be specific. (min. 50 characters)"
                                    aria-required="true"
                                    aria-describedby={error ? 'proof-error' : undefined}
                                    className="w-full px-4 py-3 rounded-xl text-sm transition-all resize-none"
                                    style={{
                                        background: 'var(--color-surface-input)',
                                        border: '1px solid var(--color-border-default)',
                                        color: 'var(--color-text-primary)',
                                        outline: 'none',
                                        lineHeight: '1.6',
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-brand-primary)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border-default)'; }}
                                />
                                <p className="text-xs mt-1 text-right" style={{ color: 'var(--color-text-muted)' }}>
                                    {textProof.length} / 50 min characters
                                </p>
                            </div>
                        )}

                        {/* Error state */}
                        {error && (
                            <div
                                id="proof-error"
                                role="alert"
                                className="flex items-center gap-2 mt-4 text-xs"
                                style={{ color: 'var(--color-brand-error)' }}
                            >
                                <AlertCircle size={14} aria-hidden="true" />
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={status === 'uploading'}
                            className="btn-primary w-full mt-6"
                            aria-busy={status === 'uploading'}
                        >
                            {status === 'uploading' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Uploading...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Upload size={16} aria-hidden="true" />
                                    Submit & Lock Seat
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
