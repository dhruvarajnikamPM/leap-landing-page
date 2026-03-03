
import React from 'react';

const mentors = [
  { 
    name: "Indraneel Chitale", 
    role: "Managing Partner @Chitale Bandhu Mithaiwale", 
    image: "https://i.postimg.cc/prdszdrc/indraneel.jpg",
    bio: "Scaling traditional businesses with modern technology." 
  },
  { 
    name: "Sagar Babar", 
    role: "Founder & CEO @Comsense Media", 
    image: "https://i.postimg.cc/hGTmZR6H/783c083e-845e-4006-ae39-61194baa0471.jpg",
    bio: "200k+ Instagram • Master of B2B sales and international market expansion." 
  },
  { 
    name: "Shaurya Gaikwad", 
    role: "Founder & CEO @LEAP", 
    image: "https://i.postimg.cc/Kzxqcf2z/IMG-4002.jpg",
    bio: "Instagram 70k+ • Deep tech specialist and startup ecosystem builder." 
  },
  { 
    name: "Raul John Aju", 
    role: "AI Kid of India", 
    image: "https://i.postimg.cc/K83s04Nf/30-day-cha-enge-(Instagram-Post-(45))(1).png",
    bio: "Instagram 300k+ • Expert in business transformation and operational excellence." 
  },
  { 
    name: "Anmol Malik", 
    role: "AI Expert", 
    image: "https://picsum.photos/seed/anmol/400/500",
    bio: "Instagram 70k+ • Expert in consumer brands and market entry strategies." 
  },
  { 
    name: "Dev Taneja", 
    role: "Founder & CEO @Unjob.ai", 
    image: "https://i.postimg.cc/DfCjF1Yh/1763913027633.jpg",
    bio: "Instagram 50k+ • Specialist in building scalable digital products and UX." 
  },
  { 
    name: "Mann Jadwani", 
    role: "Founder and CEO @Neural Arc", 
    image: "https://i.postimg.cc/T1TZSGwq/image_removebg_preview_(1).png",
    bio: "Instagram 70k+ • Expert in brand building and digital transformation." 
  }
];

export const Mentors: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Meet the Mentors
          </h2>
          <p className="text-white/50 text-lg max-w-2xl">
            Learn from industry leaders and founders who have built real businesses.
          </p>
        </div>

        {/* Simple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => (
            <div key={index} className="group">
              {/* Image with simple rounded corners */}
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 mb-6">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Clean Typography */}
              <h3 className="text-xl font-bold text-white mb-1">
                {mentor.name}
              </h3>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3">
                {mentor.role}
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                {mentor.bio}
              </p>
            </div>
          ))}
          
          {/* Simple CTA Card */}
          <div className="flex flex-col justify-center p-8 rounded-2xl bg-blue-600/10 border border-blue-500/20 aspect-[3/4]">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the next cohort.
            </h3>
            <p className="text-white/60 text-sm mb-8">
              Get mentored by the best in the industry.
            </p>
            <button className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
