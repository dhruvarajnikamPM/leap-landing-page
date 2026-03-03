
import React from 'react';

export const MovementDeclaration: React.FC = () => {
  return (
    <section className="py-40 bg-[#050508] text-white text-center overflow-hidden relative">
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-12 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          The Declaration
        </div>
        <h2 className="text-6xl md:text-[110px] leading-[0.85] font-heading font-bold tracking-tighter mb-12 reveal">
          LEAP is not a course. <br />
          <span className="font-serif italic text-blue-500">It’s a national movement.</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
          We are redefining the DNA of higher education. Moving from static textbook learning to a dynamic builder ecosystem.
        </p>
      </div>
    </section>
  );
};
