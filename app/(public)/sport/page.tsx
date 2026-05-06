import React from 'react';
import { ChevronRight } from 'lucide-react';

// --- TypeScript Interfaces ---
interface ScoreItemProps {
    label: string;
    status: string;
    teams: { name: string; score: string }[];
}

interface SportArticleProps {
    img: string;
    tag?: string;
    title: string;
    desc: string;
}

interface TrendingSportProps {
    rank: string;
    title: string;
    meta: string;
}

interface SectionHeaderProps {
    title: string;
}

const SportPage: React.FC = () => {
    return (
        <div className="bg-white font-sans text-slate-900 mt-28">

            {/* 1. TOP TICKER BAR */}
            <div className="w-full bg-[#f0f9ff] border-b border-blue-100 py-2 px-6 flex items-center text-[10px] font-bold tracking-tight text-blue-900/70 uppercase">
                <span className="text-blue-600 mr-2">LIVE AI RESEARCH:</span>
                <span>Analyzing 452 global sources for latest updates</span>
            </div>

            <main className="max-w-[1440px] mx-auto px-6 py-10">

                {/* 2. HERO SECTION & LIVE SCOREBOARD */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

                    {/* Main Hero (8 Cols) */}
                    <div className="lg:col-span-8">
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 mb-8">
                            <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest z-10">
                                BREAKING
                            </span>
                            <img
                                src="/home/sport.png"
                                alt="Stadium Atmosphere"
                                className="w-full h-full object-cover grayscale-[0.2]"
                            />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-[44px] md:text-[58px] font-[900] tracking-tighter leading-[0.95] text-slate-900">
                                The Modern Coliseum: Redefining High-Performance Competition in the Digital Era
                            </h1>
                            <p className="text-[18px] text-slate-500 leading-relaxed font-serif max-w-2xl italic">
                                As global sports infrastructure pivots toward technological integration, the boundary between athlete and machine begins to blur. We analyze the physiological and structural shifts defining the next decade of performance.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-black">MV</div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                                    By Marcus Vance <span className="mx-2">•</span> 12 MIN READ
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Live Scoreboard Sidebar (4 Cols) */}
                    <div className="lg:col-span-4 bg-slate-50 p-8 border border-slate-100">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                            <h2 className="text-[12px] font-black tracking-widest uppercase text-slate-900">Live Scoreboard</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                <span className="text-[9px] font-black text-blue-600 uppercase">Live Now</span>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <ScoreItem
                                label="Formula 1: Qualifying"
                                status="Final"
                                teams={[{ name: 'Verstappen (RBR)', score: '1:27.421' }, { name: 'Leclerc (SF)', score: '+0.142' }]}
                            />
                            <ScoreItem
                                label="UCL: Quarter Final"
                                status="74'"
                                teams={[{ name: 'Real Madrid', score: '2' }, { name: 'Man. City', score: '1' }]}
                            />
                            <ScoreItem
                                label="ATP Masters 1000"
                                status="Set 3"
                                teams={[{ name: 'Alcaraz', score: '6 | 4 | 3' }, { name: 'Sinner', score: '2 | 6 | 5' }]}
                            />
                        </div>

                        <button className="w-full mt-12 py-3 border-t border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                            View All Results
                        </button>
                    </div>
                </div>

                {/* 3. MOTORSPORT SECTION */}
                <section className="mb-20">
                    <SectionHeader title="Motorsport" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <SportArticle
                            tag="REVIEW"
                            img="https://images.unsplash.com/photo-1541133569702-f1f31742490f?q=80&w=800&auto=format&fit=crop"
                            title="Aero-Dynamics: How 2025 Regulations Shift the Grid"
                            desc="Technical experts weigh in on the implications of ground-effect adjustments..."
                        />
                        <SportArticle
                            img="https://images.unsplash.com/photo-1547915714-d022b79997e0?q=80&w=800&auto=format&fit=crop"
                            title="The Return of Hybrid Rally: Sustainability in the Dirt"
                            desc="The WRC prepares for its most ambitious technical shift in three decades."
                        />
                        <SportArticle
                            tag="DEEP DIVE"
                            img="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop"
                            title="Bikes on the Brink: Analyzing MotoGP's Safety Curve"
                            desc="Inside the data centers determining track safety standards across Europe."
                        />
                    </div>
                </section>

                {/* 4. FOOTBALL & TRENDING SIDEBAR */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Football Column (8 Cols) */}
                    <div className="lg:col-span-8">
                        <SectionHeader title="Football" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <SportArticle
                                img="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop"
                                title="Tactical Hegemony: The Decline of the 'Number 10'"
                                desc="How data-driven systems are phasing out the traditional creative playmaker."
                            />
                            <SportArticle
                                tag="BREAKING"
                                img="https://images.unsplash.com/photo-1552318975-27db474df114?q=80&w=800&auto=format&fit=crop"
                                title="Transfer Window: Nexus Predicts Record Spending"
                                desc="Our proprietary algorithm identifies the top 5 targets for Premier League giants."
                            />
                            <SportArticle
                                img="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop"
                                title="Recovery Science: The New Edge in Elite Leagues"
                                desc="Cryotherapy and bio-tracking: how clubs are extending player careers."
                            />
                        </div>
                    </div>

                    {/* Right Sidebar: Trending & Newsletter (4 Cols) */}
                    <div className="lg:col-span-4 space-y-12">

                        {/* Trending Section */}
                        <div className="bg-slate-50 p-8 border border-slate-100">
                            <h2 className="text-[12px] font-black tracking-widest uppercase text-slate-900 border-b border-slate-200 pb-4 mb-8">
                                Trending in Sport
                            </h2>
                            <div className="space-y-8">
                                <TrendingItem
                                    rank="01"
                                    title="The 2028 Olympic Logistics: A Blueprint for Sustainable Games"
                                    meta="ATHLETICS • 4 HOURS AGO"
                                />
                                <TrendingItem
                                    rank="02"
                                    title="Venture Capital's New Obsession: European Football Academies"
                                    meta="BUSINESS • 6 HOURS AGO"
                                />
                                <TrendingItem
                                    rank="03"
                                    title="The Physics of the Perfect Serve: A Bio-Mechanical Study"
                                    meta="TENNIS • 1 DAY AGO"
                                />
                            </div>
                        </div>

                        {/* Newsletter Section */}
                        <div className="p-8 border border-slate-200 bg-white">
                            <h2 className="text-[14px] font-[900] tracking-tight mb-3 uppercase">The Nexus Sport Daily</h2>
                            <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                                The essential briefing for sports professionals and enthusiasts. Delivered at 06:00 GMT.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full border border-slate-200 px-4 py-3 text-xs outline-none focus:border-blue-600 transition-colors"
                                />
                                <button className="w-full bg-[#050a14] text-white text-[10px] font-black tracking-[0.2em] py-4 uppercase hover:bg-black transition-colors">
                                    Sign Up
                                </button>
                            </div>
                            <p className="text-[9px] text-slate-400 mt-4 leading-tight italic">
                                By subscribing, you agree to our Terms and Privacy Policy.
                            </p>
                        </div>

                        {/* Ad Placeholder */}
                        <div className="aspect-[4/5] bg-slate-50 border border-slate-100 flex items-center justify-center">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Advertisement</span>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Sub-components Implementation ---

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
    <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-10">
        <h2 className="text-[28px] font-black tracking-tighter uppercase">{title}</h2>
        <button className="text-blue-600 text-[10px] font-bold tracking-widest flex items-center gap-1 uppercase hover:underline">
            View All <ChevronRight size={14} strokeWidth={3} />
        </button>
    </div>
);

const ScoreItem: React.FC<ScoreItemProps> = ({ label, status, teams }) => (
    <div className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
        <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400 mb-3 tracking-widest">
            <span>{label}</span>
            <span className="text-slate-900 bg-slate-200 px-1">{status}</span>
        </div>
        <div className="space-y-2">
            {teams.map((team, idx) => (
                <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {idx === 0 && <div className="w-0.5 h-3 bg-blue-600"></div>}
                        <span className="text-[13px] font-bold">{team.name}</span>
                    </div>
                    <span className="text-[13px] font-black tabular-nums">{team.score}</span>
                </div>
            ))}
        </div>
    </div>
);

const SportArticle: React.FC<SportArticleProps> = ({ img, tag, title, desc }) => (
    <div className="group cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 mb-5">
            {tag && (
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest z-10">
                    {tag}
                </span>
            )}
            <img
                src={img}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[0.2]"
            />
        </div>
        <h3 className="text-[19px] font-bold leading-tight mb-3 group-hover:text-blue-600 transition-colors">
            {title}
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
            {desc}
        </p>
    </div>
);

const TrendingItem: React.FC<TrendingSportProps> = ({ rank, title, meta }) => (
    <div className="flex gap-4 group cursor-pointer items-start">
        <span className="text-3xl font-black text-slate-200 tracking-tighter group-hover:text-blue-600 transition-colors">
            {rank}
        </span>
        <div>
            <h3 className="text-[14px] font-bold leading-snug mb-2 group-hover:underline">
                {title}
            </h3>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{meta}</p>
        </div>
    </div>
);

export default SportPage;