
import React from 'react';
import { 
  BookOpen, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Search,
  Target,
  Hammer,
  Rocket,
  TrendingUp,
  Mic2
} from 'lucide-react';

const phases = [
  {
    title: "Phase 1 — Problem Discovery",
    weeks: "Weeks 1–4",
    icon: <Search className="text-blue-400" size={24} />,
    inClass: [
      "Startup mindset",
      "Observation frameworks",
      "Digital storytelling",
      "Problem identification workshops"
    ],
    outClass: [
      "Interview real users & businesses",
      "Attend industry discussions",
      "Publish discovery content",
      "Document real-world problems"
    ]
  },
  {
    title: "Phase 2 — Validation & Sales",
    weeks: "Weeks 5–8",
    icon: <Target className="text-blue-400" size={24} />,
    inClass: [
      "Sales psychology",
      "Negotiation practice",
      "Pricing strategy",
      "Pitch simulations"
    ],
    outClass: [
      "Real sales challenges",
      "Customer conversations",
      "Attempt revenue generation",
      "Market testing experiments"
    ]
  },
  {
    title: "Phase 3 — MVP & Industry Immersion",
    weeks: "Weeks 9–12",
    icon: <Hammer className="text-blue-400" size={24} />,
    inClass: [
      "MVP design",
      "No-code tools",
      "Scalability thinking"
    ],
    outClass: [
      "Industry visits",
      "Build prototype or landing page",
      "Interview operators",
      "Analyze real business systems"
    ]
  },
  {
    title: "Phase 4 — Operations & Execution",
    weeks: "Weeks 13–16",
    icon: <Rocket className="text-blue-400" size={24} />,
    inClass: [
      "Supply chain basics",
      "Unit economics",
      "Leadership & operations strategy"
    ],
    outClass: [
      "Launch MVP publicly",
      "Handle customers & logistics",
      "Shadow business owners",
      "Solve operational challenges"
    ]
  },
  {
    title: "Phase 5 — Growth & Community",
    weeks: "Weeks 17–20",
    icon: <TrendingUp className="text-blue-400" size={24} />,
    inClass: [
      "Growth strategy",
      "PR storytelling",
      "Analytics understanding"
    ],
    outClass: [
      "Growth experiments",
      "Creator collaborations",
      "Host events or meetups",
      "Build startup community"
    ]
  },
  {
    title: "Phase 6 — Pitching & Founder Mode",
    weeks: "Weeks 21–24",
    icon: <Mic2 className="text-blue-400" size={24} />,
    inClass: [
      "Pitch storytelling",
      "Business models",
      "Fundraising fundamentals"
    ],
    outClass: [
      "Build pitch deck",
      "Collect traction data",
      "Industry mentor feedback",
      "Demo Day presentation"
    ]
  }
];

const timelineSteps = ["Explore", "Validate", "Build", "Operate", "Grow", "Pitch"];

export const FounderJourney: React.FC = () => {
  return (
    <section id="journey" className="py-[120px] bg-[#050505] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro Block */}
        <div className="max-w-4xl mb-24 reveal">
          <h2 className="text-[56px] md:text-[72px] font-sans font-bold leading-[1.1] mb-8 tracking-tight">
            Learn Entrepreneurship by <span className="text-blue-500">Building a Real Startup</span> — Not Studying One.
          </h2>
          <p className="text-xl text-white/60 leading-relaxed mb-12">
            The LEAP program is a 24-week founder journey where students move from discovering problems to generating revenue, operating real businesses, and pitching startups — through industry exposure and real-world challenges.
          </p>

          {/* Timeline Visual */}
          <div className="relative pt-8 pb-4">
            <div className="absolute top-[43px] left-0 w-full h-px bg-white/10"></div>
            <div className="flex justify-between relative">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform group-hover:scale-150"></div>
                  <span className="text-xs uppercase tracking-widest font-medium text-white/40 group-hover:text-white transition-colors">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-8 mb-32">
          <div className="flex items-center justify-between mb-12 reveal">
            <h3 className="text-3xl font-bold">The 24-Week Roadmap</h3>
            <div className="hidden md:flex gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/40">
                <div className="w-2 h-2 rounded-full bg-white/20"></div> In-Class
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Out-Class
              </div>
            </div>
          </div>

          {phases.map((phase, idx) => (
            <div key={idx} className="reveal group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Phase Info */}
                <div className="lg:col-span-3 flex flex-col justify-center p-8 rounded-[32px] bg-white/[0.02] border border-white/5">
                  <div className="mb-4">{phase.icon}</div>
                  <span className="text-blue-500 font-mono text-sm mb-2">{phase.weeks}</span>
                  <h4 className="text-xl font-bold leading-tight">{phase.title}</h4>
                </div>

                {/* In-Class vs Out-Class Split */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* In-Class */}
                  <div className="p-8 rounded-[32px] bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-2 mb-6 text-white/40 text-xs uppercase tracking-widest font-bold">
                      <BookOpen size={14} /> In-Class Learning
                    </div>
                    <ul className="space-y-4">
                      {phase.inClass.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                          <div className="w-1 h-1 rounded-full bg-white/20 mt-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Out-Class */}
                  <div className="p-8 rounded-[32px] bg-blue-500/[0.03] border border-blue-500/10 hover:bg-blue-500/[0.05] hover:border-blue-500/20 transition-all group/out">
                    <div className="flex items-center gap-2 mb-6 text-blue-400 text-xs uppercase tracking-widest font-bold">
                      <Zap size={14} className="fill-blue-400" /> Out-Class Execution
                    </div>
                    <ul className="space-y-4">
                      {phase.outClass.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm font-medium">
                          <ArrowRight size={14} className="mt-1 text-blue-500 opacity-0 -translate-x-2 group-hover/out:opacity-100 group-hover/out:translate-x-0 transition-all" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Differentiation Block */}
        <div className="reveal mb-32">
          <div className="bg-white/[0.02] border border-white/5 rounded-[48px] p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h3 className="text-3xl font-bold mb-12">Traditional Education</h3>
                <ul className="space-y-6">
                  {[
                    "Mostly classroom learning",
                    "Theory before action",
                    "Simulated projects",
                    "Standardized testing"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/40">
                      <XCircle size={20} className="text-red-500/50" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -inset-8 bg-blue-500/5 rounded-[40px] border border-blue-500/10"></div>
                <div className="relative">
                  <h3 className="text-3xl font-bold mb-12 text-blue-400">LEAP Learning</h3>
                  <ul className="space-y-6">
                    {[
                      "70% real-world execution",
                      "Real customers & revenue",
                      "Industry exposure",
                      "Build an actual startup"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <CheckCircle2 size={20} className="text-emerald-400" />
                        <span className="text-lg font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center reveal">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 max-w-2xl mx-auto leading-tight">
            “By the end of 24 weeks, students don’t just learn business — <span className="italic font-serif font-light text-blue-400">they become founders.</span>”
          </h3>
          <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            Explore the LEAP Program
          </button>
        </div>
      </div>
    </section>
  );
};
