// 



"use client";

import React from "react";
import { TrendingUp, ArrowRight } from "lucide-react";

// लेख कार्ड के लिए उप-घटक (Article Card Component)
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

export default function NexusPageHindi() {
  return (
    <div className="bg-white font-sans text-slate-900">

      <main className="max-w-[1400px] mx-auto px-6 py-10 mt-24">

        {/* 2. मुख्य फीचर सेक्शन (HERO SECTION GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">

          {/* मुख्य लेख (Main Feature) */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] w-full mb-8 overflow-hidden">
              <img
                src="/home/hero.png"
                alt="हाइड्रोजन कॉन्सेप्ट कार"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest">
                ऑटोमोबाइल
              </span>
            </div>

            <h1 className="text-[38px] md:text-[52px] font-black tracking-tight leading-[1.0] mb-6">
              हाइड्रोजन का क्षितिज: कैसे अगली पीढ़ी के इंजन वैश्विक लॉजिस्टिक्स को फिर से परिभाषित कर रहे हैं।
            </h1>

            <p className="text-[18px] text-gray-500 leading-relaxed max-w-2xl mb-8">
              जैसे-जैसे जीवाश्म ईंधन पर निर्भरता कम हो रही है, स्टटगार्ट की गुप्त प्रयोगशालाओं से दहन-हाइड्रोजन हाइब्रिड की एक नई नस्ल उभर रही है। हम आने वाले टॉर्क मेट्रिक्स और बुनियादी ढांचे की चुनौतियों का विश्लेषण करते हैं।
            </p>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                className="w-10 h-10 rounded-full object-cover grayscale"
                alt="मार्कस थोर्न"
              />
              <div>
                <p className="text-[11px] font-black tracking-widest uppercase">मार्कस थोर्न द्वारा</p>
                <p className="text-[11px] text-gray-400 font-bold uppercase">12 मिनट पहले</p>
              </div>
            </div>
          </div>

          {/* ट्रेंडिंग साइडबार (Trending Sidebar) */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-gray-100">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-8">
              <h2 className="text-lg font-black tracking-tighter italic uppercase">अभी चर्चा में</h2>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>

            <div className="space-y-10">
              {[
                { cat: 'टेक', title: 'क्वांट-न्यूरल चिप्स 50% दक्षता के मील के पत्थर तक पहुंचे।', time: '24 मिनट पहले' },
                { cat: 'सरकार', title: 'वैश्विक व्यापार समझौता: 2025 के लिए नए टैरिफ की घोषणा।', time: '1 घंटा पहले' },
                { cat: 'खेल', title: 'ओलंपिक 2028: पेरिस में नए वेन्यू के ब्लूप्रिंट लीक।', time: '2 घंटे पहले' },
                { cat: 'स्वास्थ्य', title: 'दीर्घायु अनुसंधान: सेलुलर पुनर्जनन ने रिकॉर्ड तोड़ा।', time: '4 घंटे पहले' }
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

        {/* 3. ऑटोमोबाइल सेक्शन (AUTOMOBILE SECTION) */}
        <section className="mt-10 border-t border-gray-100 pt-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase">ऑटोमोबाइल</h2>
            <button className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-blue-600 uppercase">
              सभी देखें <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ArticleCard
              tag="समीक्षा"
              title="टेस्ला मॉडल एस प्लेड: तीन साल बाद।"
              desc="क्या प्रतिस्पर्धा आखिरकार इलेक्ट्रिक दुनिया के इस 'एक्सेलेरेशन किंग' की बराबरी कर पाई है?"
              imageUrl="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800"
            />
            <ArticleCard
              tag="उद्योग"
              title="मास ट्रांजिट: स्वायत्त शटल की ओर झुकाव।"
              desc="शहर क्यों लाइट रेल को छोड़कर लचीले एआई-संचालित वैन बेड़े को अपना रहे हैं?"
              imageUrl="/home/mass.png"
            />
            <ArticleCard
              tag="रेट्रो"
              title="इलेक्ट्रिक रूपांतरण: आंतरिक दहन विरासत को बचाना।"
              desc="इंजीनियरिंग फर्में जो क्लासिक फेरारी कारों को शांत इलेक्ट्रिक स्पीडस्टर्स में बदल रही हैं।"
              imageUrl="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </section>

        {/* 4. टेक सेक्शन (TECH SECTION) */}
        <section className="mt-20 border-t border-gray-100 pt-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase">टेक</h2>
            <button className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-blue-600 uppercase">
              सभी देखें <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ArticleCard
              tag="एआई और एमएल"
              title="GPT-5 आर्किटेक्चर लीक: अब तक हमें जो पता है।"
              desc="आंतरिक दस्तावेज़ छोटे और अधिक कुशल मॉड्यूलर मॉडल की ओर संकेत करते हैं।"
              imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
            />
            <ArticleCard
              tag="सुरक्षा"
              title="जीरो-डे संकट: वैश्विक बैंकिंग घेरे में।"
              desc="क्लीयरिंग हाउसों पर समन्वित हमले ने क्लाउड इंफ्रास्ट्रक्चर की कमियों को उजागर किया।"
              imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
            />
            <ArticleCard
              tag="भविष्य का काम"
              title="हाइब्रिड 2.0: क्या फिजिकल डेस्क का अंत हो रहा है?"
              desc="टेक दिग्गज अब बड़े ऑफिसों के बजाय स्थानीय सहयोगी हब (Collaborative Hubs) को प्राथमिकता दे रहे हैं।"
              imageUrl="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </section>

        {/* 5. द ब्रीफिंग - न्यूज़लेटर (THE BRIEFING) */}
        <section className="mt-24 bg-[#050a14] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
          {/* सजावटी पृष्ठभूमि तत्व */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32"></div>

          <div className="md:w-3/5 space-y-6 z-10">
            <p className="text-blue-500 text-[11px] font-black tracking-[0.4em] uppercase">द ब्रीफिंग</p>
            <h2 className="text-[36px] md:text-[50px] font-black tracking-tighter leading-[1.05]">
              बाजार खुलने से पहले आप तक पहुँचाई गई सटीक जानकारी।
            </h2>
            <p className="text-slate-400 text-[16px] max-w-md font-medium">
              उन 250,000+ पेशेवरों से जुड़ें जो अपने दिन की शुरुआत 'प्रोजेक्ट नेक्सस' के साथ करते हैं। सटीक पत्रकारिता, बिना किसी फालतू बात के।
            </p>
          </div>

          <div className="md:w-[400px] w-full mt-12 md:mt-0 z-10">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="ईमेल पता"
                className="bg-[#0f172a] border border-slate-800 px-6 py-4 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 font-medium text-white"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[12px] tracking-[0.2em] py-5 transition-all shadow-xl uppercase">
                सब्सक्रिप्शन शुरू करें
              </button>
              <p className="text-[9px] text-slate-500 text-center mt-2 tracking-widest font-bold uppercase">
                कोई स्पैम नहीं। किसी भी समय एक-क्लिक में अनसब्सक्राइब करें।
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}