
import React from 'react';

export const Journey: React.FC = () => {
  const steps = [
    { 
      step: "01", 
      title: "Enter the Movement", 
      desc: "Your institution becomes a certified LEAP hub. We audit your resources and deploy our ecosystem layers." 
    },
    { 
      step: "02", 
      title: "Students Build", 
      desc: "No more passive learning. Students take on real projects, build startups, and solve industry problems in real-time." 
    },
    { 
      step: "03", 
      title: "Real Outcomes", 
      desc: "Placement rates skyrocket. Student startups get funded. A new generation of builders emerges from your campus." 
    },
  ];

  return (
    <section className="py-32 bg-[#050508] border-y border-white/5 relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 reveal">
          <h2 className="text-5xl md:text-8xl font-heading font-bold mb-4 tracking-tighter text-white leading-[0.9]">
            The <span className="font-serif italic text-blue-500">Journey</span>
          </h2>
          <p className="text-white/40 text-lg uppercase tracking-[0.2em] font-mono text-[11px]">How we transform institutional DNA</p>
        </div>

        <div className="flex flex-col gap-32">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 reveal ${
                idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="text-9xl font-heading font-black text-white/[0.03] mb-[-60px] block pointer-events-none">
                  {step.step}
                </span>
                <h3 className="text-4xl md:text-6xl font-heading font-bold mb-6 relative z-10 text-white tracking-tighter">
                  {step.title}
                </h3>
                <p className="text-xl text-white/40 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {step.desc}
                </p>
              </div>
              
              <div className="lg:w-1/2">
                <div className="aspect-video rounded-[32px] overflow-hidden relative group border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                  <img 
                    src={`https://picsum.photos/seed/leap-${idx}/800/450`} 
                    alt={step.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-125 transition-transform duration-500">
                      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
