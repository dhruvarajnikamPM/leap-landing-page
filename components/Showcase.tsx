
import React from 'react';
import { Rocket, Cpu, Users, Zap, Globe, BarChart3, Plus } from 'lucide-react';

export const Showcase: React.FC = () => {
  const cards = [
    { 
      title: "Practical Startup Cohorts", 
      desc: "Immersive 12-week cycles where students build MVPs from scratch. We provide the stack, the mentorship, and the initial push.", 
      icon: <Rocket />, 
      size: "large",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      title: "AI Co-Founder", 
      desc: "Connect with like-minded builders across regions.", 
      icon: <Cpu />, 
      size: "small",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    { 
      title: "Industry Mentors", 
      desc: "Learn from people who have actually built things.", 
      icon: <Users />, 
      size: "small",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    { 
      title: "Builder Sprints", 
      desc: "High-intensity weekend hackathons.", 
      icon: <Zap />, 
      size: "small",
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    },
    { 
      title: "Digital Innovation Labs", 
      desc: "Cloud-powered spaces equipped for radical experimentation. Access premium tools and resources 24/7.", 
      icon: <Globe />, 
      size: "large",
      color: "text-blue-600",
      bg: "bg-blue-600/10"
    },
    { 
      title: "Impact Dashboards", 
      desc: "Real-time tracking of outcomes.", 
      icon: <BarChart3 />, 
      size: "small",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
  ];

  return (
    <section className="py-32 bg-[#050508] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 reveal">
          <h2 className="text-5xl md:text-8xl font-heading font-bold mb-6 tracking-tighter text-white leading-[0.9]">
            Inside the <span className="font-serif italic text-blue-500">LEAP Engine</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Our ecosystem components are designed for high-speed execution and real-world results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-auto">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className={`reveal p-12 rounded-[32px] group relative overflow-hidden flex flex-col justify-between border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:border-white/10 transition-all duration-500 ${
                card.size === 'large' ? 'md:col-span-2' : ''
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Card Background Glow */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 blur-[80px] opacity-10 rounded-full transition-all duration-700 group-hover:scale-150 group-hover:opacity-20 ${card.bg.replace('/10', '/40')}`}></div>

              <div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 border border-white/5 bg-white/[0.03] ${card.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {React.cloneElement(card.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-3xl font-heading font-bold mb-6 text-white group-hover:text-blue-400 transition-colors">{card.title}</h3>
                <p className="text-lg text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{card.desc}</p>
              </div>

              <div className="mt-10 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-500">
                 <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-blue-500">Learn More</span>
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                    <Plus size={18} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
