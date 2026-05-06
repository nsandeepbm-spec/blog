import React from 'react';
import { ChevronRight } from 'lucide-react';

// --- Interfaces for Type Safety ---
interface SectionHeaderProps {
  title: string;
}

interface TrendingItemProps {
  tag: string;
  title: string;
}

interface ArticleCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  date: string;
}

interface TextCardProps {
  tag: string;
  title: string;
  desc: string;
  status: string;
}

interface SimpleCardProps {
  img: string;
  tag: string;
  title: string;
}

const HealthPage: React.FC = () => {
  return (
    <div className="bg-white font-sans text-slate-900 mt-28">
      <main className="max-w-[1440px] mx-auto px-6 py-10">
        
        {/* 1. HERO SECTION & TRENDING SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Main Article (Left) */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2000&auto=format&fit=crop" 
                alt="Longevity Protocol" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest">Health</span>
              <h1 className="text-[42px] md:text-[54px] font-[900] tracking-tighter leading-[0.95] text-slate-900">
                The Longevity Protocol: How AI Is Decoding the Human Lifespan
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
                A ground-breaking global study involving over 400 research institutions has utilized generative AI to identify specific genetic triggers that decelerate cellular aging, promising a new era of proactive medicine.
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Dr. Aris Thorne <span className="mx-2">•</span> 12 MIN READ
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar: Vital Signs (Right) */}
          <div className="lg:col-span-4 border-l border-slate-100 lg:pl-10">
            <h2 className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 border-b border-slate-100 pb-4 mb-8">
              Vital Signs: Trending
            </h2>
            
            <div className="space-y-10 mb-12">
              <TrendingItem 
                tag="Diagnostics" 
                title="Neural-Link chips cleared for human trials in depression treatment" 
              />
              <TrendingItem 
                tag="Nutrition" 
                title="The Micro-Nutrient Myth: New data challenges supplement efficacy" 
              />
              <TrendingItem 
                tag="Fitness" 
                title="Zone 2 Training: Why the 'Slow Burn' is the peak of cardiovascular longevity" 
              />
            </div>

            {/* Newsletter Box */}
            <div className="bg-slate-50 p-8 border border-slate-100">
              <h3 className="text-[14px] font-black tracking-tight mb-2">Nexus Health Letter</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                Clinical insights delivered to your inbox every Tuesday.
              </p>
              <input 
                type="email" 
                placeholder="email@nexus.com" 
                className="w-full bg-white border border-slate-200 px-4 py-3 text-xs mb-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="w-full bg-[#050a14] text-white text-[10px] font-black tracking-[0.2em] py-4 uppercase">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* 2. BIO-TECH SECTION */}
        <section className="mb-20">
          <SectionHeader title="Bio-Tech" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ArticleCard 
              img="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop"
              tag="Health"
              title="CRISPR 3.0: Precision gene editing without collateral damage"
              desc="Recent advancements allow for single-nucleotide precision in live tissue samples."
              date="May 14, 2024"
            />
            <ArticleCard 
              img="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=800&auto=format&fit=crop"
              tag="Health"
              title="Wearable Labs: The future of continuous blood monitoring"
              desc="Subcutaneous sensors that track over 50 biomarkers in real-time are hitting the market."
              date="May 12, 2024"
            />
            <ArticleCard 
              img="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
              tag="Health"
              title="Soft Robotics: Restoring tactile feedback to prosthetics"
              desc="How synthetic skin is bridging the gap between mechanical limbs and the nervous system."
              date="May 10, 2024"
            />
          </div>
        </section>

      </main>

      {/* 3. MENTAL HEALTH SECTION (Gray Background) */}
      <section className="bg-slate-100 py-20 mb-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <SectionHeader title="Mental Health" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TextCard 
              tag="Health"
              title="The Cortisol Loop: Breaking the cycle of modern workplace stress"
              desc="Chronic high-stress environments are re-wiring our brain's fight-or-flight response at a scale never before seen."
              status="Analysis"
            />
            <TextCard 
              tag="Health"
              title="Psilocybin therapy gains traction in mainstream psychiatry"
              desc="Clinical trials show unprecedented recovery rates for treatment-resistant PTSD patients."
              status="Feature"
            />
            <TextCard 
              tag="Health"
              title="Digital Detox: The science behind dopamine receptor recovery"
              desc="Research suggests 72 hours of complete disconnection can significantly reset reward pathways."
              status="Report"
            />
          </div>
        </div>
      </section>

      {/* 4. PUBLIC POLICY SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 mb-24">
        <SectionHeader title="Public Policy" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <SimpleCard 
            img="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
            tag="Health"
            title="The Universal Healthcare Debate: AI as a cost-cutting measure"
          />
          <SimpleCard 
            img="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop"
            tag="Health"
            title="Global Pandemic Preparedness: Lessons from the 2024 response"
          />
          <SimpleCard 
            img="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
            tag="Health"
            title="The Ethics of CRISPR: Proposing a global regulatory framework"
          />
        </div>
      </section>
    </div>
  );
};

// --- Sub-components with Types ---

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-10">
    <h2 className="text-[28px] font-black tracking-tighter uppercase">{title}</h2>
    <button className="text-blue-600 text-[11px] font-bold tracking-widest flex items-center gap-1 uppercase">
      View All <ChevronRight size={14} strokeWidth={3} />
    </button>
  </div>
);

const TrendingItem: React.FC<TrendingItemProps> = ({ tag, title }) => (
  <div className="group cursor-pointer">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{tag}</p>
    <h3 className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
  </div>
);

const ArticleCard: React.FC<ArticleCardProps> = ({ img, tag, title, desc, date }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[16/9] overflow-hidden bg-slate-100 mb-6">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="space-y-3">
      <span className="bg-black text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-widest inline-block">{tag}</span>
      <h3 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">{desc}</p>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-2">{date}</p>
    </div>
  </div>
);

const TextCard: React.FC<TextCardProps> = ({ tag, title, desc, status }) => (
  <div className="bg-white p-8 group cursor-pointer border border-transparent hover:border-slate-200 transition-all">
    <div className="space-y-4">
      <span className="bg-black text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-widest inline-block">{tag}</span>
      <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-[14px] text-slate-500 leading-relaxed">{desc}</p>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-4">{status}</p>
    </div>
  </div>
);

const SimpleCard: React.FC<SimpleCardProps> = ({ img, tag, title }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[16/9] overflow-hidden bg-slate-100 mb-4">
      <img src={img} alt={title} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
    </div>
    <div className="space-y-2">
      <span className="bg-black text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-widest inline-block">{tag}</span>
      <h3 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors">{title}</h3>
    </div>
  </div>
);

export default HealthPage;