
import React from 'react';
import { 
  ArrowUpRight 
} from 'lucide-react';

export const ChoosePath: React.FC = () => {
  const paths = [
    {
      label: "Become a",
      title: "Creator",
      duration: "4 Months",
      accent: "pink",
      image: "https://i.postimg.cc/zG2cpBtL/Chat_GPT_Image_Feb_22_2026_11_47_23_PM.png"
    },
    {
      label: "Become an",
      title: "Entrepreneur",
      duration: "6 Months",
      accent: "blue",
      image: "https://i.postimg.cc/dVNxn1HV/Chat_GPT_Image_Feb_22_2026_11_47_21_PM.png"
    },
    {
      label: "Become an",
      title: "AI Expert",
      duration: "5 Months",
      accent: "purple",
      image: "https://i.postimg.cc/nhSPTzRV/Chat_GPT_Image_Feb_22_2026_11_47_28_PM.png"
    },
    {
      label: "Become Full Stack",
      title: "Marketer",
      duration: "4 Months",
      accent: "green",
      image: "https://i.postimg.cc/N0yPncSD/Chat-GPT-Image-Feb-22-2026-11-47-26-PM.png"
    },
    {
      label: "Master",
      title: "Sales Skills",
      duration: "3 Months",
      accent: "blue",
      image: "https://i.postimg.cc/pXZ7hkK8/Chat_GPT_Image_Feb_22_2026_11_47_31_PM.png"
    },
    {
      label: "Learn",
      title: "Networking",
      duration: "2 Months",
      accent: "purple",
      image: "https://i.postimg.cc/rwZPgmnm/Chat_GPT_Image_Feb_22_2026_11_47_30_PM.png"
    }
  ];

  const getAccentStyles = (accent: string) => {
    switch (accent) {
      case 'pink': return 'bg-pink-500/15 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)] border-pink-500/20';
      case 'blue': return 'bg-blue-500/15 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] border-blue-500/20';
      case 'purple': return 'bg-purple-500/15 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] border-purple-500/20';
      case 'green': return 'bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] border-emerald-500/20';
      default: return 'bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] border-white/20';
    }
  };

  return (
    <section id="paths" className="py-[120px] bg-[#050505] relative overflow-hidden">
      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 reveal">
          <h2 className="text-[64px] md:text-[72px] font-sans font-bold mb-6 tracking-tight leading-none text-white">
            Choose <span className="font-serif italic font-light text-white/80">Your Path</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto pb-12 gap-6 no-scrollbar snap-x snap-mandatory">
          {paths.map((path, idx) => (
            <div 
              key={idx}
              className="reveal relative min-w-[300px] md:min-w-[380px] h-[520px] rounded-[24px] group overflow-hidden transition-all duration-[350ms] ease-out hover:scale-[1.02] border border-white/10 hover:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer snap-center"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Image Background with Cinematic Treatment */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={path.image} 
                  alt={path.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 brightness-[0.8] group-hover:brightness-[1]"
                  referrerPolicy="no-referrer"
                />
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
              </div>

              {/* Floating Duration Badge (Top Left) */}
              <div className="absolute top-6 left-6 z-20">
                <div className={`px-3.5 py-1.5 rounded-full backdrop-blur-xl border text-[13px] font-medium transition-all duration-300 ${getAccentStyles(path.accent)}`}>
                  {path.duration}
                </div>
              </div>

              {/* Floating Arrow Button (Top Right) */}
              <div className="absolute top-6 right-6 z-20">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* Content Anchored to Bottom-Left */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <span className="text-[15px] font-medium text-white/70 mb-1 transform transition-all duration-500 group-hover:translate-x-1">
                  {path.label}
                </span>
                <h3 className="text-[36px] font-sans font-bold leading-tight text-white mb-2 transform transition-all duration-500 group-hover:translate-x-1">
                  {path.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
