import React from "react";
import { TrendingUp, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// Article Card Component
const ArticleCard = ({
  category, title, desc, imageUrl, slug
}: {
  category: string; title: string; desc: string; imageUrl: string; slug: string;
}) => (
  <Link href={`/article/${slug}`} className="group cursor-pointer block">
    <div className="aspect-[16/10] mb-4 overflow-hidden relative bg-gray-100 rounded-xl">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="space-y-2">
      <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 tracking-widest uppercase rounded">
        {category}
      </span>
      <h3 className="text-[20px] font-bold leading-tight group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-[14px] leading-relaxed line-clamp-2">
        {desc}
      </p>
    </div>
  </Link>
);

// Fallback data if DB is empty for Sidebar
const FALLBACK_RECENT = [
  { category: 'Technology', title: 'Quant-Neural Chips Hit 50% Efficiency Milestone', slug: '#', time: '24 MINS AGO' },
  { category: 'Government', title: 'Global Trade Pact: New Tariffs Announced for 2025', slug: '#', time: '1 HOUR AGO' },
  { category: 'Sport', title: 'Olympics 2028: New Venue Blueprints Leaked', slug: '#', time: '2 HOURS AGO' },
  { category: 'Health', title: 'Longevity Research: Cellular Regeneration Breaks Record', slug: '#', time: '4 HOURS AGO' }
];

export default async function GlobalHomePage() {
  const supabase = await createClient();

  // Fetch all published articles
  const { data: rawArticles } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('status', 'PUBLISHED')
    .order('published_at', { ascending: false })
    .limit(20);

  // Normalize the data mapping for categories join
  const articles = (rawArticles || []).map(article => ({
    ...article,
    categories: Array.isArray(article.categories) 
      ? article.categories[0] 
      : (article.categories || null)
  }));
  
  // Separate into featured and others
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const recentArticles = articles.slice(1, 5);
  
  const autoSlugs = ['electric-vehicles', 'luxury-cars', 'supercars', 'suv-offroad', 'automobile'];
  const automobileArticles = articles.filter(a => autoSlugs.includes(a.categories?.slug || '')).slice(0, 3);
  
  const techArticles = articles.filter(a => a.categories?.slug === 'tech-innovation' || a.categories?.slug === 'tech').slice(0, 3);
  const sportArticles = articles.filter(a => a.categories?.slug === 'sport').slice(0, 3);
  const govArticles = articles.filter(a => a.categories?.slug === 'industry-news' || a.categories?.slug === 'government').slice(0, 3);
  const healthArticles = articles.filter(a => a.categories?.slug === 'health').slice(0, 3);
  const stockArticles = articles.filter(a => a.categories?.slug === 'stock-market' || a.categories?.slug?.includes('market') || a.categories?.slug?.includes('finance')).slice(0, 3);

  // Helper: strip HTML tags for plain-text previews
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();

  return (
    <div className="bg-white font-sans text-slate-900">
      <main className="max-w-[1440px] mx-auto px-6 py-10 pt-40">
        
        {/* 1. HERO SECTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-100">
          
          {/* Main Feature */}
          <div className="lg:col-span-8">
            {featuredArticle ? (
              <Link href={`/article/${featuredArticle.slug}`} className="block group">
                <div className="relative aspect-[16/9] w-full mb-8 overflow-hidden bg-gray-100 rounded-2xl">
                  <img
                    src={featuredArticle.image_url || "/home/hero.png"}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase shadow-lg rounded">
                    {featuredArticle.categories?.name || 'FEATURED'}
                  </span>
                </div>
                <h1 className="text-[38px] md:text-[52px] font-black tracking-tight leading-[1.0] mb-6 group-hover:text-blue-600 transition-colors">
                  {featuredArticle.title}
                </h1>
                <p className="text-[18px] text-gray-500 leading-relaxed max-w-2xl mb-8 line-clamp-3">
                  {stripHtml(featuredArticle.body).substring(0, 220)}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
                    {featuredArticle.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] font-black tracking-widest uppercase">By {featuredArticle.author_name}</p>
                    <p className="text-[11px] text-gray-400 font-bold uppercase flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 
                      {new Date(featuredArticle.published_at || featuredArticle.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              // FALLBACK HERO
              <Link href="#" className="block group">
                <div className="relative aspect-[16/9] w-full mb-8 overflow-hidden bg-gray-100 rounded-2xl">
                  <img
                    src="/home/hero.png"
                    alt="Automobile Concept"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase shadow-lg rounded">
                    AUTOMOBILE
                  </span>
                </div>
                <h1 className="text-[38px] md:text-[52px] font-black tracking-tight leading-[1.0] mb-6 group-hover:text-blue-600 transition-colors">
                  The Horizon of Hydrogen: How Next-Gen Engines are Redefining Logistics.
                </h1>
                <p className="text-[18px] text-gray-500 leading-relaxed max-w-2xl mb-8 line-clamp-3">
                  As reliance on fossil fuels wanes, a new breed of combustion-hydrogen hybrids is emerging from secret labs in Stuttgart. We analyze the upcoming torque metrics and infrastructure challenges.
                </p>
              </Link>
            )}
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-gray-100">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-8">
              <h2 className="text-lg font-black tracking-tighter italic uppercase">Live Feed</h2>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-8">
              {recentArticles.length > 0 ? recentArticles.map((item, i) => (
                <Link href={`/article/${item.slug}`} key={item.id} className="group block cursor-pointer">
                  <p className="text-[10px] font-bold text-blue-600 mb-1.5 tracking-widest uppercase">
                    0{i + 1}. {item.categories?.name || 'NEWS'}
                  </p>
                  <h4 className="font-bold text-[16px] leading-tight group-hover:underline decoration-blue-600 decoration-2 underline-offset-4 transition-all">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tight flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.published_at || item.created_at).toLocaleDateString()}
                  </p>
                </Link>
              )) : FALLBACK_RECENT.map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-[10px] font-bold text-gray-400 mb-1.5 tracking-widest uppercase">
                    0{i + 1}. {item.category}
                  </p>
                  <h4 className="font-bold text-[16px] leading-tight text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tight flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CATEGORY SHOWCASE STRIP */}
        {/* ========================================================= */}
        <section className="mt-12 mb-4">
          <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Automobile', href: '/automobile', img: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800', color: 'bg-blue-600' },
              { name: 'Tech', href: '/tech', img: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800', color: 'bg-slate-900' },
              { name: 'Sport', href: '/sport', img: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800', color: 'bg-orange-500' },
              { name: 'Government', href: '/government', img: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800', color: 'bg-purple-700' },
              { name: 'Health', href: '/health', img: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800', color: 'bg-green-600' },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href} className="group relative overflow-hidden rounded-xl aspect-[4/3] block">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-white text-[11px] font-black tracking-[0.2em] uppercase">{cat.name}</span>
                  <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* ARTICLE SECTIONS */}
        {/* ========================================================= */}

        {/* 2. AUTOMOBILE SECTION */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600"></div> Automobile
            </h2>
            <Link href="/automobile" className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-blue-600 uppercase transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {automobileArticles.length > 0 ? automobileArticles.map(a => (
              <ArticleCard key={a.id} category={a.categories?.name || 'AUTO'} title={a.title} desc={stripHtml(a.body).substring(0, 120) + '...'} imageUrl={a.image_url || 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'} slug={a.slug} />
            )) : (
              <>
                <ArticleCard category="REVIEW" title="Tesla Model S Plaid: Three Years Later." desc="Has the competition finally caught up to the electric world's 'acceleration king'?" imageUrl="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="INDUSTRY" title="Mass Transit: The Shift to Autonomous Shuttles." desc="Why cities are ditching light rail for flexible AI-powered van fleets." imageUrl="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="RETRO" title="Electric Conversions: Saving Internal Combustion Heritage." desc="Engineering firms turning classic Ferraris into silent electric speedsters." imageUrl="https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
              </>
            )}
          </div>
        </section>

        {/* 3. TECH SECTION */}
        <section className="mt-20 border-t border-gray-100 pt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase flex items-center gap-3">
              <div className="w-4 h-4 bg-black"></div> Tech & Innovation
            </h2>
            <Link href="/tech" className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-blue-600 uppercase transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {techArticles.length > 0 ? techArticles.map(a => (
              <ArticleCard key={a.id} category={a.categories?.name || 'TECH'} title={a.title} desc={a.body.substring(0, 100) + '...'} imageUrl={a.image_url || 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800'} slug={a.slug} />
            )) : (
              <>
                <ArticleCard category="AI & ML" title="GPT-5 Architecture Leaks: What We Know." desc="Internal documents point towards smaller, more efficient modular models." imageUrl="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="SECURITY" title="Zero-Day Crisis: Global Banking Under Siege." desc="Coordinated attacks on clearing houses expose cloud infrastructure flaws." imageUrl="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="FUTURE OF WORK" title="Hybrid 2.0: Is the Physical Desk Dead?" desc="Tech giants are prioritizing local collaborative hubs over massive offices." imageUrl="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
              </>
            )}
          </div>
        </section>

        {/* 4. SPORT SECTION */}
        <section className="mt-20 border-t border-gray-100 pt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase flex items-center gap-3">
              <div className="w-4 h-4 bg-orange-500"></div> Sport
            </h2>
            <Link href="/sport" className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-blue-600 uppercase transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {sportArticles.length > 0 ? sportArticles.map(a => (
              <ArticleCard key={a.id} category={a.categories?.name || 'SPORT'} title={a.title} desc={a.body.substring(0, 100) + '...'} imageUrl={a.image_url || 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800'} slug={a.slug} />
            )) : (
              <>
                <ArticleCard category="FORMULA 1" title="Aerodynamic Overhaul for 2026 Season." desc="How the new wing regulations will drastically change overtaking dynamics." imageUrl="https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="FOOTBALL" title="The Analytics Revolution in Scouting." desc="Clubs are relying more on data scientists than traditional scouts for transfers." imageUrl="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="TENNIS" title="A New Generation Assumes Control." desc="The changing of the guard is complete following this year's intense Grand Slams." imageUrl="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
              </>
            )}
          </div>
        </section>

        {/* 5. GOVERNMENT SECTION */}
        <section className="mt-20 border-t border-gray-100 pt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-600"></div> Government
            </h2>
            <Link href="/government" className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-blue-600 uppercase transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {govArticles.length > 0 ? govArticles.map(a => (
              <ArticleCard key={a.id} category={a.categories?.name || 'GOV'} title={a.title} desc={a.body.substring(0, 100) + '...'} imageUrl={a.image_url || 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800'} slug={a.slug} />
            )) : (
              <>
                <ArticleCard category="POLICY" title="New Carbon Tax Framework Outlined." desc="Major industrial nations agree to a unified approach to combat emissions." imageUrl="https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="ECONOMICS" title="Central Banks Hint at Rate Adjustments." desc="Inflation targets might be revised as global supply chains stabilize." imageUrl="https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="DIPLOMACY" title="Historic Summit Yields Trade Agreement." desc="A breakthrough in negotiations opens new markets for agricultural exports." imageUrl="https://images.pexels.com/photos/1464212/pexels-photo-1464212.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
              </>
            )}
          </div>
        </section>

        {/* 6. HEALTH SECTION */}
        <section className="mt-20 border-t border-gray-100 pt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-black tracking-tighter uppercase flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500"></div> Health
            </h2>
            <Link href="/health" className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-blue-600 uppercase transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {healthArticles.length > 0 ? healthArticles.map(a => (
              <ArticleCard key={a.id} category={a.categories?.name || 'HEALTH'} title={a.title} desc={a.body.substring(0, 100) + '...'} imageUrl={a.image_url || 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800'} slug={a.slug} />
            )) : (
              <>
                <ArticleCard category="MEDICAL" title="Breakthrough in Genomic Sequencing." desc="New techniques allow for faster, more accurate detection of hereditary conditions." imageUrl="https://images.pexels.com/photos/4031323/pexels-photo-4031323.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="WELLNESS" title="The Science of Deep Sleep." desc="Neurologists reveal why the third stage of sleep is critical for cognitive function." imageUrl="https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
                <ArticleCard category="NUTRITION" title="Revisiting the Mediterranean Diet." desc="Long-term studies confirm significant benefits for cardiovascular longevity." imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800" slug="#" />
              </>
            )}
          </div>
        </section>

        {/* 7. STOCK MARKET SECTION */}
        {stockArticles.length > 0 && (
          <section className="mt-20 border-t border-gray-100 pt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[28px] font-black tracking-tighter uppercase flex items-center gap-3">
                <div className="w-4 h-4 bg-emerald-500 rounded-sm"></div> Markets
              </h2>
              <Link href="/stock-market" className="text-[10px] font-bold tracking-widest flex items-center gap-1 hover:text-emerald-600 uppercase transition-colors">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {stockArticles.map(a => (
                <ArticleCard
                  key={a.id}
                  category={a.categories?.name || 'MARKETS'}
                  title={a.title}
                  desc={stripHtml(a.body).substring(0, 120) + '...'}
                  imageUrl={a.image_url || 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  slug={a.slug}
                />
              ))}
            </div>
          </section>
        )}

        {/* 7. THE BRIEFING - NEWSLETTER */}
        <section className="mt-24 bg-[#050a14] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32"></div>

          <div className="md:w-3/5 space-y-6 z-10">
            <p className="text-blue-500 text-[11px] font-black tracking-[0.4em] uppercase">The Briefing</p>
            <h2 className="text-[36px] md:text-[50px] font-black tracking-tighter leading-[1.05]">
              Intelligence delivered before the markets open.
            </h2>
            <p className="text-slate-400 text-[16px] max-w-md font-medium">
              Join 250,000+ professionals who start their day with Blorix. Precision journalism, zero noise.
            </p>
          </div>

          <div className="md:w-[400px] w-full mt-12 md:mt-0 z-10">
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-[#0f172a] border border-slate-800 px-6 py-4 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 font-medium text-white rounded-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[12px] tracking-[0.2em] py-5 transition-all shadow-xl uppercase">
                Initialize Subscription
              </button>
              <p className="text-[9px] text-slate-500 text-center mt-3 tracking-widest font-bold uppercase">
                No spam. One-click unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}