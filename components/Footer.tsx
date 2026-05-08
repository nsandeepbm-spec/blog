// components/Footer.tsx
import Link from 'next/link';
import { Twitter, Linkedin, Github, Youtube, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* ── ADVERTISEMENT BANNER ── */}
      <div className="w-full bg-white py-12 border-t border-gray-100">
        <div className="max-w-[970px] mx-auto h-[120px] bg-gray-50 border border-gray-200 flex flex-col items-center justify-center rounded-xl relative overflow-hidden">
          <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase absolute top-2 left-3">Advertisement</span>
          <span className="text-[14px] font-bold text-gray-400">Premium Ad Space</span>
          <span className="text-[11px] text-gray-400 mt-1">970 x 120 Leaderboard</span>
        </div>
      </div>

      <footer className="w-full bg-[#050a14] border-t border-slate-900 pt-20 pb-10">
        <div className="max-w-[1440px] mx-auto px-6">
          
          {/* Top Section: Brand & Newsletter CTA */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end pb-16 border-b border-slate-800/60 mb-16 gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter text-white mb-6">BLORIX.</h2>
              <p className="text-slate-400 text-[15px] leading-relaxed font-lora italic">
              High-performance journalism for a high-frequency world. Clinical, urgent, and precise coverage of the forces shaping our future.
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase mb-4">The Daily Brief</h3>
            <div className="flex items-center gap-2">
              <input 
                type="email" 
                placeholder="Intelligence delivered daily..." 
                className="bg-slate-900/50 border border-slate-800 text-white text-[13px] rounded-lg px-4 py-3 w-full lg:w-72 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">Intelligence</h3>
            <ul className="space-y-4 text-[13px] font-medium text-slate-400">
              <li><Link href="/stock-market" className="hover:text-blue-400 transition-colors">Markets & Finance</Link></li>
              <li><Link href="/tech" className="hover:text-blue-400 transition-colors">Tech & AI</Link></li>
              <li><Link href="/automobile" className="hover:text-blue-400 transition-colors">Automobile</Link></li>
              <li><Link href="/government" className="hover:text-blue-400 transition-colors">Government & Policy</Link></li>
              <li><Link href="/health" className="hover:text-blue-400 transition-colors">Health & BioTech</Link></li>
              <li><Link href="/sport" className="hover:text-blue-400 transition-colors">Global Sports</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">Organization</h3>
            <ul className="space-y-4 text-[13px] font-medium text-slate-400">
              <li><Link href="/mission" className="hover:text-blue-400 transition-colors">The Blorix Mission</Link></li>
              <li><Link href="/editorial" className="hover:text-blue-400 transition-colors">Editorial Board</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers & Research</Link></li>
              <li><Link href="/investors" className="hover:text-blue-400 transition-colors">Investor Relations</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">Compliance</h3>
            <ul className="space-y-4 text-[13px] font-medium text-slate-400">
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Architecture</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/ethics" className="hover:text-blue-400 transition-colors">Journalistic Ethics</Link></li>
              <li><Link href="/ad-choices" className="hover:text-blue-400 transition-colors">Ad Choices</Link></li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="col-span-2 lg:col-span-2 space-y-6 lg:ml-auto">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase lg:text-right">Global Nodes</h3>
            <div className="flex flex-wrap lg:justify-end gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-800 hover:text-white hover:border-blue-800 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all">
                <Github size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                <Mail size={16} />
              </a>
            </div>
            <p className="text-[12px] text-slate-500 leading-relaxed lg:text-right max-w-sm ml-auto mt-6">
              Securely transmitted from our global data centers. Encrypted endpoints ensure journalistic integrity and source protection.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Blorix Media Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] text-slate-600 font-black tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Systems Operational
            </span>
            <span className="text-[10px] text-slate-600 font-black tracking-widest uppercase">
              Build V4.2.0
            </span>
          </div>
        </div>

      </div>
    </footer>
    </>
  );
};

export default Footer;