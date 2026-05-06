// import React from 'react';
// import { Bookmark, CheckCircle2, Clock } from 'lucide-react';

// const GovernmentPolicyPage = () => {
//   return (
//     <div className="bg-white min-h-screen text-slate-900 font-sans ">
//       <main className="max-w-7xl mx-auto px-6 py-12">
        
//         {/* --- 1. SECTION HEADER --- */}
//         <header className="mb-16 border-b border-slate-100 pb-10 mt-30">
//           <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">
//             Government & Policy
//           </h1>
//           <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
//             Real-time legislative tracking and AI-driven analysis of global governance. We map the intersection of technology, regulation, and international diplomacy.
//           </p>
//         </header>

//         {/* --- 2. MAIN CONTENT GRID --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
//           {/* LEFT COLUMN: Main Feed (8 Columns) */}
//           <div className="lg:col-span-8 space-y-20">
            
//             {/* HERO ARTICLE */}
//             <article className="group cursor-pointer">
//               <div className="relative aspect-[16/8] overflow-hidden bg-slate-100 mb-8">
//                 <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
//                   Deep Dive
//                 </div>
//                 <img 
//                   src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2000&auto=format&fit=crop" 
//                   alt="Government Building"
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//               </div>
//               <div className="max-w-3xl">
//                 <h2 className="text-5xl font-black tracking-tighter leading-[0.95] mb-6 group-hover:text-blue-600 transition-colors">
//                   The Digital Westphalia: Analyzing the Global Framework for AI Regulation
//                 </h2>
//                 <p className="text-lg text-slate-600 leading-relaxed mb-6">
//                   As global powers convene in Brussels and Washington, a new architecture of trade and tech sovereignty is emerging. Our AI analysis reveals three primary regulatory blocks that will define the next decade of international relations.
//                 </p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-5 h-5 bg-black rounded-sm"></div>
//                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//                     By Elena Vance • 6 MIN READ
//                   </span>
//                 </div>
//               </div>
//             </article>

//             {/* TWO-COLUMN GRID ARTICLES */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//               <article className="group">
//                 <div className="aspect-video overflow-hidden bg-slate-100 mb-6">
//                   <img 
//                     src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" 
//                     alt="Legislation"
//                     className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0"
//                   />
//                 </div>
//                 <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-3 block">Legislation</span>
//                 <h3 className="text-2xl font-bold tracking-tight mb-3">New Data Privacy Laws: The Shift Toward Algorithmic Transparency</h3>
//                 <p className="text-sm text-slate-500 leading-relaxed mb-6">Proposed amendments to current privacy frameworks aim to give citizens direct oversight of automated decision systems in public services.</p>
//                 <div className="flex items-center justify-between border-t border-slate-50 pt-4">
//                   <span className="text-[10px] font-bold text-slate-300 uppercase">12 Hours Ago</span>
//                   <Bookmark className="w-4 h-4 text-slate-300 hover:text-black cursor-pointer" />
//                 </div>
//               </article>

//               <article className="group">
//                 <div className="aspect-video overflow-hidden bg-slate-100 mb-6">
//                   <img 
//                     src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" 
//                     alt="City Infrastructure"
//                     className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0"
//                   />
//                 </div>
//                 <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-3 block">Urban Policy</span>
//                 <h3 className="text-2xl font-bold tracking-tight mb-3">Smart City Infrastructure: Financing the Next Decade</h3>
//                 <p className="text-sm text-slate-500 leading-relaxed mb-6">Federal grants are shifting toward sensor-driven public transit and energy-responsive lighting systems in major metropolitan corridors.</p>
//                 <div className="flex items-center justify-between border-t border-slate-50 pt-4">
//                   <span className="text-[10px] font-bold text-slate-300 uppercase">1 Day Ago</span>
//                   <Bookmark className="w-4 h-4 text-slate-300 hover:text-black cursor-pointer" />
//                 </div>
//               </article>
//             </div>

//             {/* HORIZONTAL FEATURE ARTICLE */}
//             <article className="flex flex-col md:flex-row gap-8 items-center border-t border-slate-100 pt-12">
//               <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden bg-slate-100">
//                 <img 
//                   src="https://images.unsplash.com/photo-1521791136364-758a4d317902?q=80&w=800&auto=format&fit=crop" 
//                   alt="Governance"
//                   className="w-full h-full object-cover grayscale transition-all hover:grayscale-0"
//                 />
//               </div>
//               <div className="md:w-2/3">
//                 <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">Governance</span>
//                 <h3 className="text-3xl font-bold tracking-tighter mb-4">AI Governance Frameworks: UN Summit Insights</h3>
//                 <p className="text-slate-500 mb-6">A leaked draft from the international committee suggests a unified standard for bias auditing in public sector artificial intelligence models.</p>
//                 <div className="flex gap-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">
//                   <span>March 14, 2024</span>
//                   <span>•</span>
//                   <span>Policy Report</span>
//                 </div>
//               </div>
//             </article>
//           </div>

//           {/* RIGHT COLUMN: Sidebar (4 Columns) */}
//           <aside className="lg:col-span-4 space-y-12">
            
//             {/* POLICY PULSE LIST */}
//             <div className="space-y-8">
//               <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-4 mb-10">
//                 <h2 className="text-lg font-black uppercase tracking-tighter">Policy Pulse</h2>
//               </div>

//               <div className="space-y-10">
//                 {/* Pulse Item 1 */}
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
//                     <span className="bg-slate-100 px-2 py-0.5">Vote Result</span>
//                     <span>14:02 EST</span>
//                   </div>
//                   <h4 className="font-bold text-sm leading-snug">House passes "Broadband for All" infrastructure amendment.</h4>
//                   <div className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
//                     <CheckCircle2 size={10} strokeWidth={3} /> Passed 234-192
//                   </div>
//                 </div>

//                 {/* Pulse Item 2 */}
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
//                     <span className="bg-slate-100 px-2 py-0.5">Regulatory Shift</span>
//                     <span>11:30 EST</span>
//                   </div>
//                   <h4 className="font-bold text-sm leading-snug">SEC updates guidelines on ESG reporting for technology firms.</h4>
//                   <p className="text-[11px] text-slate-400">New rules require quarterly disclosures on carbon offset algorithmic modeling.</p>
//                 </div>

//                 {/* Pulse Item 3 */}
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
//                     <span className="bg-slate-100 px-2 py-0.5">Diplomacy</span>
//                     <span>09:15 EST</span>
//                   </div>
//                   <h4 className="font-bold text-sm leading-snug">G7 Finance Ministers reach tentative deal on global chip tariffs.</h4>
//                   <div className="flex items-center gap-1.5 text-amber-500 text-[9px] font-black uppercase tracking-widest">
//                     <Clock size={10} strokeWidth={3} /> Pending Ratification
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* POLICY BRIEFING NEWSLETTER BOX */}
//             <div className="bg-[#0b101b] p-8 text-white">
//               <h3 className="text-xl font-bold mb-2">Policy Briefing</h3>
//               <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6">The legislative day, distilled by AI.</p>
//               <div className="space-y-3">
//                 <input 
//                   type="email" 
//                   placeholder="Email Address" 
//                   className="w-full bg-slate-800 border border-slate-700 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
//                 />
//                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] py-4 uppercase tracking-[0.2em] transition-all">
//                   Sign Up
//                 </button>
//               </div>
//             </div>

//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default GovernmentPolicyPage;





import React from 'react';
import { Bookmark, CheckCircle2, Clock } from 'lucide-react';

const GovernmentPolicyPageHindi = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* --- 1. सेक्शन हेडर (Section Header) --- */}
        <header className="mb-16 border-b border-slate-100 pb-10 mt-20">
          <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">
            सरकारी शासन और नीति
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            वैश्विक शासन का वास्तविक समय विधायी ट्रैकिंग और एआई-संचालित विश्लेषण। हम तकनीक, नियमन और अंतरराष्ट्रीय कूटनीति के मिलन बिंदु का विश्लेषण करते हैं।
          </p>
        </header>

        {/* --- 2. मुख्य कंटेंट ग्रिड (Main Content Grid) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* बायां कॉलम: मुख्य फीड (Left Column: Main Feed) */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* मुख्य लेख (HERO ARTICLE) */}
            <article className="group cursor-pointer">
              <div className="relative aspect-[16/8] overflow-hidden bg-slate-100 mb-8">
                <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
                  गहन विश्लेषण (Deep Dive)
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2000&auto=format&fit=crop" 
                  alt="सरकारी भवन"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="max-w-3xl">
                <h2 className="text-5xl font-black tracking-tighter leading-[0.95] mb-6 group-hover:text-blue-600 transition-colors">
                  डिजिटल वेस्टफेलिया: एआई विनियमन के वैश्विक ढांचे का विश्लेषण
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  जैसे-जैसे वैश्विक शक्तियां ब्रुसेल्स और वाशिंगटन में एकत्रित हो रही हैं, व्यापार और तकनीक संप्रभुता की एक नई संरचना उभर रही है। हमारा एआई विश्लेषण तीन प्राथमिक नियामक ब्लॉकों को प्रकट करता है जो अंतरराष्ट्रीय संबंधों के अगले दशक को परिभाषित करेंगे।
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-black rounded-sm"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    एलेना वेंस द्वारा • 6 मिनट की पढ़ाई
                  </span>
                </div>
              </div>
            </article>

            {/* दो-कॉलम ग्रिड लेख (Two-Column Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <article className="group">
                <div className="aspect-video overflow-hidden bg-slate-100 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop" 
                    alt="विधान"
                    className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0"
                  />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-3 block">कानून और विधान</span>
                <h3 className="text-2xl font-bold tracking-tight mb-3">नए डेटा गोपनीयता कानून: एल्गोरिथम पारदर्शिता की ओर बदलाव</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">वर्तमान गोपनीयता ढांचे में प्रस्तावित संशोधन नागरिकों को सार्वजनिक सेवाओं में स्वचालित निर्णय प्रणालियों पर सीधी निगरानी देने का लक्ष्य रखते हैं।</p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-[10px] font-bold text-slate-300 uppercase">12 घंटे पहले</span>
                  <Bookmark className="w-4 h-4 text-slate-300 hover:text-black cursor-pointer" />
                </div>
              </article>

              <article className="group">
                <div className="aspect-video overflow-hidden bg-slate-100 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" 
                    alt="शहरी अवसंरचना"
                    className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0"
                  />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-3 block">शहरी नीति</span>
                <h3 className="text-2xl font-bold tracking-tight mb-3">स्मार्ट सिटी इंफ्रास्ट्रक्चर: अगले दशक का वित्तपोषण</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">संघीय अनुदान प्रमुख महानगरीय क्षेत्रों में सेंसर-संचालित सार्वजनिक पारगमन और ऊर्जा-उत्तरदायी प्रकाश प्रणालियों की ओर स्थानांतरित हो रहे हैं।</p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-[10px] font-bold text-slate-300 uppercase">1 दिन पहले</span>
                  <Bookmark className="w-4 h-4 text-slate-300 hover:text-black cursor-pointer" />
                </div>
              </article>
            </div>

            {/* क्षैतिज फीचर लेख (Horizontal Feature) */}
            <article className="flex flex-col md:flex-row gap-8 items-center border-t border-slate-100 pt-12">
              <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1521791136364-758a4d317902?q=80&w=800&auto=format&fit=crop" 
                  alt="शासन"
                  className="w-full h-full object-cover grayscale transition-all hover:grayscale-0"
                />
              </div>
              <div className="md:w-2/3">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">गवर्नेंस (शासन)</span>
                <h3 className="text-3xl font-bold tracking-tighter mb-4">एआई गवर्नेंस फ्रेमवर्क: यूएन शिखर सम्मेलन के निष्कर्ष</h3>
                <p className="text-slate-500 mb-6">अंतरराष्ट्रीय समिति के एक लीक हुए मसौदे से सार्वजनिक क्षेत्र के कृत्रिम बुद्धिमत्ता मॉडल में पूर्वाग्रह ऑडिटिंग के लिए एक एकीकृत मानक का सुझाव मिलता है।</p>
                <div className="flex gap-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  <span>14 मार्च, 2024</span>
                  <span>•</span>
                  <span>नीति रिपोर्ट</span>
                </div>
              </div>
            </article>
          </div>

          {/* दायां कॉलम: साइडबार (Right Column: Sidebar) */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* पॉलिसी पल्स लिस्ट (POLICY PULSE) */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-4 mb-10">
                <h2 className="text-lg font-black uppercase tracking-tighter">नीति पल्स (Policy Pulse)</h2>
              </div>

              <div className="space-y-10">
                {/* आइटम 1 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="bg-slate-100 px-2 py-0.5">मतदान परिणाम</span>
                    <span>14:02 EST</span>
                  </div>
                  <h4 className="font-bold text-sm leading-snug">सदन ने "सभी के लिए ब्रॉडबैंड" बुनियादी ढांचा संशोधन पारित किया।</h4>
                  <div className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={10} strokeWidth={3} /> 234-192 से पारित
                  </div>
                </div>

                {/* आइटम 2 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="bg-slate-100 px-2 py-0.5">नियामक बदलाव</span>
                    <span>11:30 EST</span>
                  </div>
                  <h4 className="font-bold text-sm leading-snug">एसईसी (SEC) ने प्रौद्योगिकी फर्मों के लिए ईएसजी रिपोर्टिंग दिशानिर्देश अपडेट किए।</h4>
                  <p className="text-[11px] text-slate-400">नए नियमों के लिए कार्बन ऑफसेट एल्गोरिथम मॉडलिंग पर त्रैमासिक खुलासे की आवश्यकता है।</p>
                </div>

                {/* आइटम 3 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="bg-slate-100 px-2 py-0.5">कूटनीति</span>
                    <span>09:15 EST</span>
                  </div>
                  <h4 className="font-bold text-sm leading-snug">G7 वित्त मंत्रियों ने वैश्विक चिप टैरिफ पर अस्थायी समझौता किया।</h4>
                  <div className="flex items-center gap-1.5 text-amber-500 text-[9px] font-black uppercase tracking-widest">
                    <Clock size={10} strokeWidth={3} /> अनुसमर्थन लंबित
                  </div>
                </div>
              </div>
            </div>

            {/* न्यूज़लेटर बॉक्स (NEWSLETTER BOX) */}
            <div className="bg-[#0b101b] p-8 text-white">
              <h3 className="text-xl font-bold mb-2">नीति ब्रीफिंग</h3>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6">विधायी दिन का सार, एआई द्वारा प्रस्तुत।</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="ईमेल पता" 
                  className="w-full bg-slate-800 border border-slate-700 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-500"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] py-4 uppercase tracking-[0.2em] transition-all">
                  साइन अप करें
                </button>
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
};

export default GovernmentPolicyPageHindi;


