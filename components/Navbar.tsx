"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "AUTOMOBILE", href: "/automobile" },
  { name: "TECH", href: "/tech" },
  { name: "SPORT", href: "/sport" },
  { name: "GOVERNMENT", href: "/government" },
  { name: "HEALTH", href: "/health" },
  { name: "MARKETS", href: "/stock-market" },
];

// Page-specific ticker configuration
const tickerConfig: Record<string, { label: string; text: string; stat: string; statLabel: string }> = {
  "/": {
    label: "GLOBAL FEED",
    text: "Live coverage across Automobile, Tech, Sport, Government & Health — updated in real time.",
    stat: "5 CATEGORIES",
    statLabel: "LIVE",
  },
  "/automobile": {
    label: "AUTOMOBILE",
    text: "Tracking EV launches, combustion innovations, F1 tech, and the future of mobility.",
    stat: "EV TECH",
    statLabel: "TRENDING",
  },
  "/tech": {
    label: "TECH & AI",
    text: "Analyzing 452 global intelligence nodes. Deep-learning architecture engaged. Silicon Valley pulse.",
    stat: "0.14MS",
    statLabel: "LATENCY",
  },
  "/sport": {
    label: "SPORT DESK",
    text: "Live scores, transfer news, F1 standings, and in-depth match analysis from global correspondents.",
    stat: "LIVE",
    statLabel: "SCORES",
  },
  "/government": {
    label: "POLICY DESK",
    text: "Monitoring global legislation, economic policy shifts, diplomatic summits, and trade agreements.",
    stat: "G20",
    statLabel: "WATCH",
  },
  "/health": {
    label: "HEALTH INTEL",
    text: "Latest breakthroughs in genomics, neuroscience, clinical trials, nutrition, and longevity research.",
    stat: "CLINICAL",
    statLabel: "UPDATES",
  },
  "/stock-market": {
    label: "MARKETS LIVE",
    text: "Real-time coverage of global equities, commodities, crypto, IPOs, and macro economic shifts.",
    stat: "LIVE",
    statLabel: "INDICES",
  },
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ticker = tickerConfig[pathname] || tickerConfig["/"];

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-[100] font-sans shadow-sm">

      {/* ── MAIN NAV ── */}
      <nav className="max-w-[1440px] mx-auto px-6 h-[64px] flex items-center justify-between border-b border-gray-100">

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 -ml-2 text-black hover:bg-gray-50 transition-colors"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-[900] tracking-tighter text-black uppercase flex-shrink-0">
          Blorix
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[12px] font-black tracking-[0.15em] transition-all hover:text-blue-600 pb-0.5 ${
                pathname === link.href
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-black border-b-2 border-transparent"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="bg-[#2563eb] text-white text-[12px] font-black tracking-[0.15em] px-5 md:px-7 py-2.5 hover:bg-blue-700 transition-all uppercase"
        >
          Login
        </Link>
      </nav>

      {/* ── SMART TICKER BAR ── */}
      <div className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex items-center gap-6">

          {/* Live pill */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase whitespace-nowrap">
              {ticker.label}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-slate-700 shrink-0 hidden md:block" />

          {/* Short ticker text */}
          <p className="text-[12px] text-white font-medium tracking-wide truncate flex-1 hidden sm:block">
            {ticker.text}
          </p>

          {/* Right stat */}
          <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
            <div className="bg-slate-800 border border-slate-700 shadow-sm rounded-lg px-3 py-1 flex items-center gap-2">
              <span className="text-[9px] text-slate-300 uppercase font-bold tracking-widest">{ticker.statLabel}</span>
              <span className="text-white font-black text-[12px]">{ticker.stat}</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={`lg:hidden fixed inset-0 top-[106px] bg-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 space-y-6 h-full border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-[900] tracking-widest transition-colors ${
                pathname === link.href ? "text-blue-600" : "text-black hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] text-slate-400 leading-relaxed">{ticker.text}</p>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;