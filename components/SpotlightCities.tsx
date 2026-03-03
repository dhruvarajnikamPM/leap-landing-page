
import React from 'react';
/* Added ArrowRight to imports to resolve the undefined component error on line 131 */
import { MapPin, Camera, Zap, ArrowUpRight, ArrowRight } from 'lucide-react';

export const SpotlightCities: React.FC = () => {
  const regions = [
    {
      name: "Baramati",
      tagline: "The Rural Tech Frontier",
      description: "Transforming the agricultural heartland into a high-octane builder hub. Our Baramati campus focuses on Agri-Tech and Industrial Automation.",
      images: [
        { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", caption: "Agri-Botics Workshop" },
        { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", caption: "Baramati Innovation Lab" }
      ]
    },
    {
      name: "Satara",
      tagline: "Precision Engineering Hub",
      description: "Where heritage meets hard-tech. Our Satara movement is centered around precision manufacturing and sustainable energy solutions.",
      images: [
        { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800", caption: "Hardware Sprint 2024" },
        { url: "https://images.unsplash.com/photo-1558444479-c8f02e60246e?auto=format&fit=crop&q=80&w=800", caption: "E-Mobility Lab" }
      ]
    }
  ];

  return (
    <section className="py-32 bg-[#050508] relative overflow-hidden">
      {/* Huge Background Text with Scroll-Parallax Feel */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[400px] font-black font-heading leading-none -mr-60 transform rotate-12 text-white">MAHA</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 reveal">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-500 font-mono mb-6 uppercase tracking-[0.3em] text-[10px] font-bold">
              <MapPin size={14} className="animate-pulse" />
              <span>Expansion Phase I</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-white">
              Expanding the <br />
              <span className="font-serif italic text-blue-500">Builder Map.</span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-xl text-white/40 max-w-sm mb-8 leading-relaxed">
              We're going deep into the heart of Maharashtra, activating talent in Tier 2 cities.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {["Pune", "Mumbai", "Baramati", "Satara"].map(city => (
                <span key={city} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:border-blue-500 hover:text-blue-500 transition-all cursor-default">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-40">
          {regions.map((region, idx) => (
            <div key={idx} className="group reveal" style={{ transitionDelay: `${idx * 0.2}s` }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-5 relative">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-12 h-[1px] bg-blue-500"></span>
                    <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px]">{region.tagline}</span>
                  </div>
                  <h3 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-white group-hover:text-blue-500 transition-colors duration-700 tracking-tighter">
                    {region.name}
                  </h3>
                  <p className="text-xl text-white/40 leading-relaxed mb-12 max-w-md">
                    {region.description}
                  </p>
                  
                  <button className="flex items-center gap-4 group/btn px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 text-white transition-all">
                    <span className="font-bold text-sm uppercase tracking-widest">Enter {region.name} Movement</span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>

                {/* Structured Photo Gallery */}
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-2 gap-8">
                    {region.images.map((img, i) => (
                      <div key={i} className={`relative overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-xl group/img ${i % 2 !== 0 ? 'translate-y-12' : '-translate-y-4'}`}>
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={img.url} 
                            alt={img.caption}
                            className="w-full h-full object-cover grayscale opacity-40 group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-1000"
                          />
                        </div>
                        
                        {/* Overlay info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-500 p-10 flex flex-col justify-end">
                           <div className="flex items-center gap-3 text-white">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                              <Camera size={14} />
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-blue-400 mb-1">Live from Campus</p>
                              <p className="font-bold text-lg">{img.caption}</p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Sparkle Effect on Hover */}
                        <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-500">
                           <Zap size={20} className="text-blue-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="mt-52 reveal">
          <div className="relative p-1 px-1 rounded-[48px] bg-white/5 overflow-hidden group/cta">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 opacity-0 group-hover/cta:opacity-100 transition-opacity animate-pulse"></div>
             <div className="relative p-20 bg-[#0A0A0F] rounded-[46px] text-center border border-white/5">
                <h4 className="text-4xl md:text-7xl font-heading font-bold mb-10 tracking-tighter text-white leading-[0.9]">Want to see LEAP in <br/><span className="font-serif italic text-blue-500">your city?</span></h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all flex items-center gap-3 uppercase text-sm tracking-widest">
                    Propose a Local Hub <ArrowRight size={18} />
                  </button>
                  <p className="text-white/40 max-w-xs text-left text-sm font-medium leading-relaxed">
                    We're prioritizing regions with strong industrial footprints and active student communities.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
