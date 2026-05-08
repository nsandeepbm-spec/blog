"use client";

import React from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const ArticleCard = ({
  tag, title, desc, imageUrl
}: {
  tag: string; title: string; desc: string; imageUrl: string
}) => (
  <div className="group cursor-pointer">
    <div className="aspect-[16/10] mb-4 overflow-hidden relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="space-y-2">
      <span className="inline-block bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
        {tag}
      </span>
      <h3 className="text-[20px] font-bold leading-tight group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2">
        {desc}
      </p>
    </div>
  </div>
);

export default function AutomobilePage() {
  return (
    <div className="bg-white font-sans text-slate-900">
      <main className="max-w-[1400px] mx-auto px-6 py-10 mt-24">
        {/* HERO SECTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] w-full mb-8 overflow-hidden">
              <img
                src="/home/hero.png"
                alt="Automobile Concept"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest">
                AUTOMOBILE
              </span>
            </div>
            <h1 className="text-[38px] md:text-[52px] font-black tracking-tight leading-[1.0] mb-6">
              The Horizon of Hydrogen: How Next-Gen Engines are Redefining Logistics.
            </h1>
            <p className="text-[18px] text-gray-500 leading-relaxed max-w-2xl mb-8">
              As reliance on fossil fuels wanes, a new breed of combustion-hydrogen hybrids is emerging from secret labs in Stuttgart. We analyze the upcoming torque metrics and infrastructure challenges.
            </p>
          </div>
          
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-gray-100">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-8">
              <h2 className="text-lg font-black tracking-tighter italic uppercase">Trending in Auto</h2>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-10">
              {[
                { cat: 'TECH', title: 'Solid-State Batteries hit 500-mile range marker.', time: '24 MINS AGO' },
                { cat: 'INDUSTRY', title: 'Global Auto Pact: New Tariffs Announced for 2025.', time: '1 HOUR AGO' },
                { cat: 'RACING', title: 'Formula E 2025: New Street Circuit Blueprints Leaked.', time: '2 HOURS AGO' },
                { cat: 'SAFETY', title: 'Autonomous Driving: Lidar Tech Breaks New Record.', time: '4 HOURS AGO' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-[10px] font-bold text-blue-600 mb-1.5 tracking-widest uppercase">
                    0{i + 1}. {item.cat}
                  </p>
                  <h4 className="font-bold text-[16px] leading-tight group-hover:underline decoration-blue-600 decoration-2 underline-offset-4 transition-all">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tight">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AUTOMOBILE SECTION */}
        <section className="mt-10 border-t border-gray-100 pt-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase">Recent Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ArticleCard
              tag="REVIEW"
              title="Tesla Model S Plaid: Three Years Later."
              desc="Has the competition finally caught up to the electric world's 'acceleration king'?"
              imageUrl="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800"
            />
            <ArticleCard
              tag="INDUSTRY"
              title="Mass Transit: The Shift to Autonomous Shuttles."
              desc="Why cities are ditching light rail for flexible AI-powered van fleets."
              imageUrl="https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?auto=format&fit=crop&q=80&w=800"
            />
            <ArticleCard
              tag="RETRO"
              title="Electric Conversions: Saving Internal Combustion Heritage."
              desc="Engineering firms turning classic Ferraris into silent electric speedsters."
              imageUrl="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
