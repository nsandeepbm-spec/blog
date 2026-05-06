"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bolt } from "lucide-react"; // Install lucide-react if not present

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "AUTOMOBILE", href: "/" },
    { name: "TECH", href: "/tech" },
    { name: "SPORT", href: "/sport" },
    { name: "GOVERNMENT", href: "/government" },
    { name: "HEALTH", href: "/health" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-[100] font-sans border-b border-gray-100">
      {/* 1. Main Navigation Bar */}
      <nav className="max-w-[1440px] mx-auto px-6 h-[70px] flex items-center justify-between">
        
        {/* Mobile Hamburger - Visible only on mobile/tablet */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden p-2 -ml-2 text-black hover:bg-gray-50 transition-colors"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl md:text-2xl font-[900] tracking-tighter text-black uppercase">
            Blorix
          </Link>
        </div>

        {/* Center Links - Desktop Only */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] font-black tracking-[0.2em] transition-all hover:text-blue-600 ${
                pathname === link.href ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: LOGIN */}
        <div className="flex items-center">
          <Link
            href="/login"
            className="bg-[#2563eb] text-white text-[9px] md:text-[10px] font-black tracking-[0.2em] px-5 md:px-8 py-2.5 md:py-3 rounded-[2px] hover:bg-blue-700 transition-all shadow-md uppercase"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* 2. MOBILE MENU OVERLAY */}
      <div className={`lg:hidden fixed inset-0 top-[70px] bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col p-8 space-y-6 bg-white h-full border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-[900] tracking-widest ${
                pathname === link.href ? "text-blue-600" : "text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">System Metrics</p>
            <div className="flex gap-4">
               <span className="text-[10px] font-bold text-blue-600">LATENCY: 14MS</span>
               <span className="text-[10px] font-bold text-blue-600">ACCURACY: 99.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HIGH-TECH STATUS BAR (IMPROVED) */}
      <div className="bg-[#050a14] text-white py-1.5 md:py-2 overflow-hidden border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-full shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="text-[8px] font-black tracking-widest text-blue-400 uppercase">SYSTEM ACTIVE</span>
            </div>
            
            <div className="text-[10px] font-medium text-slate-400 tracking-tight overflow-hidden whitespace-nowrap">
              <div className="animate-marquee flex gap-2">
                <span className="text-slate-100 font-bold uppercase tracking-tighter shrink-0 flex items-center gap-1">
                   <Bolt size={10} className="text-blue-500"/> DATA STREAM:
                </span> 
                <span>Processing 452 global intelligence nodes. Deep-learning architecture engaged.</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 font-mono border-l border-slate-800 pl-6">
            <div className="flex flex-col items-end">
              <span className="text-[7px] text-slate-500 uppercase font-black tracking-widest">LATENCY</span>
              <span className="text-blue-400 font-bold text-[11px]">0.14<small className="opacity-50 ml-0.5">MS</small></span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(50%); }
          100% { transform: translateX(-100%); }
        }
        /* Only apply marquee on smaller screens or if text is too long */
        @media (min-width: 1024px) {
          .animate-marquee {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;