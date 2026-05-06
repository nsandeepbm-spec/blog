import React from 'react';
import { Share2, Bookmark, Bolt, ArrowRight, MessageSquare, ThumbsUp } from 'lucide-react';

export default function ArticlePage() {
    return (
        <div className="bg-white min-h-screen text-slate-900 selection:bg-blue-100">
            {/* 1. TOP TICKER BAR (Included for context) */}
            <div className="w-full bg-[#f0f9ff] border-b border-blue-100 py-2 px-6 flex justify-between items-center text-[10px] font-bold tracking-tight text-blue-900/70 uppercase">
                <div className="flex items-center gap-2">
                    <span className="text-blue-600">LIVE AI RESEARCH:</span>
                    <span className="hidden md:inline">Analyzing 452 global sources for latest updates... Quantum computing breakthrough in Helsinki.</span>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 py-12 lg:grid lg:grid-cols-12 lg:gap-16">

                {/* --- LEFT COLUMN: ARTICLE CONTENT (8 COLS) --- */}
                <article className="lg:col-span-8">

                    {/* Header Metadata */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-black text-white text-[10px] font-black px-3 py-1 tracking-widest uppercase">
                                TECH DEEP DIVE
                            </span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                                8 MIN READ
                            </span>
                        </div>

                        <h1 className="text-[48px] md:text-[64px] font-black tracking-tighter leading-[0.95] mb-8">
                            The Silent Architect: How Neural Symbiosis is Rewriting the Future of Global Software Infrastructure.
                        </h1>

                        {/* Author Section */}
                        <div className="flex items-center justify-between border-y border-gray-100 py-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                                    className="w-12 h-12 rounded-full object-cover grayscale border border-gray-200"
                                    alt="Julian Vane"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[12px] font-black tracking-widest uppercase">Julian Vane</p>
                                        <span className="bg-blue-50 text-blue-600 text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 font-black uppercase">
                                            <Bolt className="w-3 h-3" /> AI ENHANCED
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Senior Technology Correspondent • Nov 14, 2024</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors"><Share2 className="w-4 h-4" /></button>
                                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors"><Bookmark className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </header>

                    {/* Hero Image */}
                    <figure className="mb-12">
                        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop"
                                alt="Neural Network Visualization"
                                className="w-full h-full object-cover grayscale brightness-90 contrast-125"
                            />
                        </div>
                        <figcaption className="mt-4 text-[12px] text-gray-500 italic border-l-2 border-blue-600 pl-4 py-1">
                            Abstract representation of decentralized neural nodes currently undergoing stress testing in Silicon Valley. (Nexus Graphics/Getty)
                        </figcaption>
                    </figure>

                    {/* Article Body Content */}
                    <div className="prose prose-slate max-w-none font-serif text-[19px] leading-relaxed text-slate-800 space-y-8">
                        <p className="first-letter:text-7xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left leading-none">
                            For decades, the architecture of the internet was built on static foundations. Servers acted as passive vessels, responding only when called upon. Today, that paradigm is collapsing. A new wave of "Neural Symbiosis" is creating a living, breathing software layer that anticipates traffic before it peaks and patches security vulnerabilities before they are even discovered by hostile actors.
                        </p>

                        <p>
                            Industry analysts at the Helsinki Tech Summit suggest that within three years, 90% of global data routing will be managed by autonomous agents. This isn't just an upgrade; it's a fundamental reimagining of how digital societies function at the atomic level.
                        </p>

                        <h2 className="text-[32px] font-black font-sans tracking-tighter text-slate-900 mt-16 mb-6">The Grid is Awakening</h2>

                        <p>
                            The implications for privacy and sovereignty are profound. As these systems become more integrated into our daily routines, the line between human intent and machine execution begins to blur. In our clinical analysis of 452 global sources, we've found that the primary bottleneck is no longer processing power, but the regulatory speed at which governments can adapt.
                        </p>

                        {/* In-article Sponsorship / AD block */}
                        <div className="my-16 bg-slate-50 border border-slate-200 h-48 flex flex-col items-center justify-center space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Advertisement • Nexus Partner Content</span>
                            <div className="w-1/2 h-px bg-slate-200"></div>
                            <p className="text-sm font-sans font-bold text-slate-600 uppercase">Sponsorship: Building the future securely</p>
                        </div>

                        <p>
                            There is an architectural purity to the new systems. Unlike the bloated frameworks of the early 2000s, modern neural architecture is lean, modular, and incredibly resilient. It mimics the structural clarity of Swiss design—everything is there for a reason, and there is no decorative flourish that doesn't serve a functional purpose.
                        </p>

                        {/* Pull Quote */}
                        <div className="border-y-4 border-slate-900 py-12 my-16">
                            <blockquote className="text-[36px] font-black italic text-center leading-tight tracking-tighter font-sans">
                                "We are moving from a world of programmed responses to a world of engineered intuition."
                            </blockquote>
                            <cite className="block text-center mt-6 font-sans text-[12px] font-black uppercase tracking-widest not-italic">
                                — Dr. Aris Thorne, CTO at Nexus Dynamics
                            </cite>
                        </div>

                        <p>
                            As we look toward the 2030 horizon, the question remains: who controls the keys to the symbiosis? If the architecture is truly autonomous, the traditional levers of power become obsolete. We are entering an era of clinical governance where precision is the only currency that matters.
                        </p>
                    </div>

                    {/* 4. READ NEXT SECTION */}
                    <section className="mt-24 border-t-2 border-slate-900 pt-12">
                        <p className="text-blue-600 font-black text-[12px] tracking-[0.2em] uppercase mb-8">Read Next Story</p>
                        <div className="group cursor-pointer grid md:grid-cols-2 gap-8 items-center border border-slate-100 p-8 hover:bg-slate-50 transition-all">
                            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                <img
                                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
                                    alt="Hardware manufacturing"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[28px] font-black leading-tight tracking-tighter">Titanium Logic: The Return of Localized Hardware Manufacturing.</h3>
                                <p className="text-slate-500 text-[15px] font-serif leading-relaxed line-clamp-3">In a reversal of a forty-year trend, decentralized fabrication plants are popping up in urban centers across Europe and North America...</p>
                                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest uppercase mt-4">
                                    Read Full Report <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. COMMENTS SECTION */}
                    <section className="mt-24 mb-16">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-8">
                            <h3 className="text-[20px] font-black tracking-tight uppercase">Comments (12)</h3>
                            <div className="flex gap-4">
                                <button className="text-[10px] font-bold text-slate-400 uppercase">Newest</button>
                                <button className="text-[10px] font-bold text-slate-900 uppercase underline underline-offset-4">Top</button>
                            </div>
                        </div>

                        {/* Comment Example */}
                        <div className="space-y-8">
                            <div className="border-b border-slate-50 pb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">MK</div>
                                    <span className="text-[12px] font-black uppercase">Marcus K.</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">2h ago</span>
                                </div>
                                <p className="text-slate-600 text-[15px] leading-relaxed">The shift toward neural symbiosis is inevitable, but the security implications of 'engineered intuition' are terrifying if not properly sandboxed.</p>
                                <div className="flex gap-4 mt-4">
                                    <button className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase"><ThumbsUp className="w-3 h-3" /> Upvote (14)</button>
                                    <button className="text-[10px] font-black text-slate-400 uppercase">Reply</button>
                                </div>
                            </div>
                        </div>

                        {/* Comment Input Area */}
                        <div className="mt-12 bg-slate-50 p-8">
                            <p className="text-[10px] font-black tracking-widest uppercase mb-4 text-slate-900">Join the discussion</p>
                            <textarea
                                className="w-full h-32 p-4 bg-white border border-slate-200 focus:outline-none focus:border-blue-600 text-[15px] font-serif"
                                placeholder="Your clinical perspective..."
                            />
                            <button className="mt-4 bg-slate-900 text-white px-8 py-3 font-black text-[10px] tracking-widest uppercase hover:bg-slate-800 transition-colors">
                                POST COMMENT
                            </button>
                        </div>
                    </section>

                </article>

                {/* --- RIGHT COLUMN: SIDEBAR (4 COLS) --- */}
                <aside className="lg:col-span-4 space-y-12">
                    <div className="sticky top-24 space-y-12">

                        {/* Table of Contents */}
                        <nav className="border border-slate-100 p-8">
                            <h4 className="text-[14px] font-black tracking-[0.2em] uppercase border-b-2 border-slate-900 pb-4 mb-6">In This Article</h4>
                            <ul className="space-y-4">
                                {['01. The Silent Architect', '02. The Grid Awakening', '03. Engineered Intuition', '04. The 2030 Horizon', '05. Conclusion'].map((item, idx) => (
                                    <li key={idx}>
                                        <a href="#" className={`text-[11px] font-black uppercase tracking-tight transition-colors ${idx === 0 ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Recommended Stories */}
                        {/* Recommended Stories with Images */}
                        <div className="border border-slate-100 p-8 bg-white">
                            <h4 className="text-[14px] font-black tracking-[0.2em] uppercase border-b-2 border-slate-900 pb-4 mb-6">Recommended</h4>
                            <div className="space-y-8">
                                {[
                                    {
                                        tag: 'GOVERNMENT',
                                        title: 'The Digital Euro: Centralized or Decentralized?',
                                        img: 'https://images.unsplash.com/photo-1621417646633-2f3cd069142e?auto=format&fit=crop&q=80&w=200'
                                    },
                                    {
                                        tag: 'AUTOMOBILE',
                                        title: 'Hydrogen vs. Solid State: The New Race.',
                                        img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=200'
                                    },
                                    {
                                        tag: 'HEALTH',
                                        title: 'Crispr 2.0 and the End of Inherited Traits.',
                                        img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=200'
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-pointer flex gap-4 items-start">
                                        {/* Recommended Thumbnail */}
                                        <div className="w-20 h-14 shrink-0 overflow-hidden bg-slate-100 border border-slate-200">
                                            <img
                                                src={item.img}
                                                alt=""
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div>
                                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1 block">
                                                {item.tag}
                                            </span>
                                            <h5 className="text-[14px] font-bold leading-tight group-hover:text-blue-600 transition-colors">
                                                {item.title}
                                            </h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-4 border border-slate-900 text-[10px] font-black tracking-widest uppercase hover:bg-slate-50 transition-colors">
                                EXPLORE ALL
                            </button>
                        </div>

                        {/* Small Newsletter CTA */}
                        <div className="bg-blue-600 p-8 text-white">
                            <h4 className="text-[24px] font-black tracking-tighter leading-tight mb-3">The Nexus Report</h4>
                            <p className="text-[13px] text-blue-100 leading-relaxed mb-6">Clinical analysis of the day's most critical shifts, delivered at 06:00 GMT.</p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="w-full bg-blue-700/50 border border-blue-400 px-4 py-3 text-sm focus:outline-none placeholder:text-blue-300"
                                />
                                <button className="w-full bg-white text-blue-600 font-black text-[10px] tracking-widest py-4 uppercase">
                                    BRIEF ME
                                </button>
                            </div>
                        </div>

                    </div>
                </aside>

            </main>
        </div>
    );
}