
import React from 'react';

export const Vision: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-[#050508]">
      {/* Dynamic background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/[0.05] blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 reveal">
        <h2 className="text-6xl md:text-[140px] leading-[0.85] font-heading font-bold tracking-tighter mb-12 text-white">
          A Nation of <br/><span className="text-blue-500">Builders</span> <br />
          Starts in the <span className="font-serif italic text-white/40">Classroom.</span>
        </h2>
        <p className="text-2xl md:text-3xl text-white/40 max-w-3xl mx-auto leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
          We're not just fixing education. We're building the infrastructure for India's next 10,000 unicorns.
        </p>
      </div>
    </section>
  );
};
