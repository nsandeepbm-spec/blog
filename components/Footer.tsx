// components/Footer.tsx
import Link from 'next/link';
import { Rss, Share2, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-gray-200 pt-16 pb-12 mt-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <h2 className="text-xl font-black tracking-tighter text-black">BLORIX</h2>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-[240px]">
              High-performance journalism for a high-frequency world. Clinical, urgent, and precise coverage of the forces shaping our future.
            </p>
          </div>

          {/* Column 2: About */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">About Nexus</h3>
            <ul className="space-y-3 text-[13px] font-medium text-gray-700">
              <li><Link href="/mission" className="hover:text-blue-600 transition-colors">Our Mission</Link></li>
              <li><Link href="/editorial" className="hover:text-blue-600 transition-colors">Editorial Team</Link></li>
              <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">Legal</h3>
            <ul className="space-y-3 text-[13px] font-medium text-gray-700">
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/ad-choices" className="hover:text-blue-600 transition-colors">Ad Choices</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">Connect</h3>
            <div className="flex gap-4 text-gray-600">
              <Link href="#" className="hover:text-blue-600 transition-colors"><Rss size={18} /></Link>
              <Link href="#" className="hover:text-blue-600 transition-colors"><Share2 size={18} /></Link>
              <Link href="#" className="hover:text-blue-600 transition-colors"><Mail size={18} /></Link>
            </div>
            <p className="text-[11px] text-gray-400 pt-4 leading-tight">
              © 2024 Project Nexus. All rights reserved. System V4.2
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;