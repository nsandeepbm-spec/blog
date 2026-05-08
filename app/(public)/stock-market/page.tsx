import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TrendingUp, TrendingDown, ArrowRight, BarChart2, Clock, Activity } from 'lucide-react';

// ─── Market Ticker Data (static — can be replaced with a live API later) ───
const MARKET_INDICES = [
  { name: 'S&P 500', value: '5,308.15', change: '+0.74%', up: true },
  { name: 'NASDAQ', value: '18,671.29', change: '+1.12%', up: true },
  { name: 'DOW JONES', value: '39,433.20', change: '-0.08%', up: false },
  { name: 'NIFTY 50', value: '22,475.85', change: '+0.61%', up: true },
  { name: 'SENSEX', value: '73,878.15', change: '+0.55%', up: true },
  { name: 'BITCOIN', value: '$62,410', change: '+2.34%', up: true },
];



const SIDEBAR_MOVERS = [
  { ticker: 'NVDA', name: 'Nvidia', change: '+8.24%', up: true },
  { ticker: 'TSLA', name: 'Tesla', change: '-3.18%', up: false },
  { ticker: 'AAPL', name: 'Apple', change: '+1.05%', up: true },
  { ticker: 'AMZN', name: 'Amazon', change: '+2.61%', up: true },
  { ticker: 'META', name: 'Meta', change: '-0.87%', up: false },
];

// ─── Article type ─────────────────────────────────────────────────────────
type Article = {
  id: string; title: string; body: string; slug: string;
  image_url: string; published_at: string;
  categories: { name: string };
};

// ─── Article Card ───────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/stock-market/${article.slug}`} className="group block">
      <div className="aspect-[16/10] mb-4 overflow-hidden rounded-xl bg-gray-100 relative">
        <img
          src={article.image_url || 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black px-2.5 py-1 tracking-widest uppercase rounded-full">
          {article.categories?.name || 'MARKETS'}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="text-[18px] font-bold leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p
          className="text-gray-500 text-[13px] leading-relaxed line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: article.body?.replace(/<[^>]*>/g, '').substring(0, 120) + '...' || ''
          }}
        />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight flex items-center gap-1 pt-1">
          <Clock className="w-3 h-3" />
          {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </div>
    </Link>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function StockMarketPage() {
  const supabase = await createClient();

  // Fetch articles in the stock-market category
  const { data: rawArticles } = await supabase
    .from('articles')
    .select('id, title, body, slug, image_url, published_at, categories(name)')
    .eq('status', 'PUBLISHED')
    .order('published_at', { ascending: false })
    .limit(12);

  // Map the raw data and normalize categories join
  const allArticles: Article[] = (rawArticles || []).map(article => ({
    ...article,
    categories: Array.isArray(article.categories)
      ? article.categories[0]
      : (article.categories || { name: 'MARKETS' })
  }));

  const articles = allArticles.filter(
    a => a.categories?.name?.toLowerCase().replace(/\s+/g, '-').includes('stock') ||
         a.categories?.name?.toLowerCase().includes('market') ||
         a.categories?.name?.toLowerCase().includes('finance')
  );

  const [featured, ...rest] = articles;

  return (
    <div className="bg-white font-sans text-slate-900 min-h-screen">
      <main className="max-w-[1440px] mx-auto px-6 pt-40 pb-20">

        {/* ── PAGE HEADER ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-5 bg-emerald-500 rounded-full animate-pulse" />
          <h1 className="text-[11px] font-black tracking-[0.3em] uppercase text-gray-900">Markets Intelligence</h1>
        </div>

        {/* ── EMPTY STATE ── */}
        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-200 rounded-2xl text-center mb-12">
            <div className="text-5xl mb-4">📈</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">No Market Articles Yet</h2>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Add articles from the <strong>Admin → Articles</strong> panel and assign them the <strong>Stock Market</strong> category to see them here.
            </p>
          </div>
        )}

        {/* ── LIVE MARKET INDICES TICKER ── */}
        <div className="mb-10 overflow-hidden border border-gray-100 rounded-2xl bg-gray-50">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Market Indices</span>
            </div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Delayed 15 min</span>
          </div>
          <div className="flex overflow-x-auto gap-0 divide-x divide-gray-100">
            {MARKET_INDICES.map((idx) => (
              <div key={idx.name} className="flex-none px-6 py-4 hover:bg-white transition-colors cursor-pointer">
                <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">{idx.name}</p>
                <p className="text-[16px] font-black text-gray-900 leading-none">{idx.value}</p>
                <div className={`flex items-center gap-1 mt-1 ${idx.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {idx.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-[11px] font-black">{idx.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN GRID: Featured + Sidebar ── */}
        {articles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-100">

          {/* Featured Article */}
          <div className="lg:col-span-8">
            <Link href={`/stock-market/${featured.slug}`} className="group block">
              <div className="relative aspect-[16/9] w-full mb-8 overflow-hidden bg-gray-100 rounded-2xl">
                <img
                  src={featured.image_url || 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <span className="absolute top-5 left-5 bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 tracking-widest uppercase rounded-full">
                  {featured.categories?.name || 'MARKETS'}
                </span>
              </div>
              <h2 className="text-[36px] md:text-[46px] font-black tracking-tight leading-[1.05] mb-5 group-hover:text-emerald-600 transition-colors mt-5">
                {featured.title}
              </h2>
              <p
                className="text-[17px] text-gray-500 leading-relaxed max-w-2xl"
                dangerouslySetInnerHTML={{
                  __html: featured.body?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || ''
                }}
              />
            </Link>
          </div>

          {/* Sidebar: Top Movers */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-gray-100 space-y-8">
            <div>
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
                <h3 className="text-lg font-black tracking-tighter uppercase">Top Movers</h3>
                <BarChart2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="space-y-4">
                {SIDEBAR_MOVERS.map((m) => (
                  <div key={m.ticker} className="flex items-center justify-between py-3 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer">
                    <div>
                      <p className="text-[13px] font-black text-gray-900">{m.ticker}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{m.name}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${m.up ? 'text-emerald-600' : 'text-red-500'}`}>
                      {m.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span className="text-[13px] font-black">{m.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Quick Nav</p>
              {['Equities', 'Commodities', 'Crypto', 'IPO Watch', 'Macro Analysis'].map(l => (
                <div key={l} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-[13px] font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">{l}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
        )} {/* end articles.length > 0 */}

        {/* ── MORE ARTICLES GRID ── */}
        {rest.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[28px] font-black tracking-tighter uppercase flex items-center gap-3">
                <div className="w-4 h-4 bg-emerald-500 rounded-sm" />
                Latest Market News
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* ── NEWSLETTER ── */}
        <section className="mt-24 bg-[#050a14] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 blur-[100px] -mr-32 -mt-32" />
          <div className="md:w-3/5 space-y-4 z-10">
            <p className="text-emerald-500 text-[11px] font-black tracking-[0.4em] uppercase">Markets Morning Brief</p>
            <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter leading-[1.05]">
              Market intelligence before the opening bell.
            </h2>
            <p className="text-slate-400 text-[15px] max-w-md">
              Get pre-market movers, earnings previews, and macro analysis delivered at 7:30 AM IST.
            </p>
          </div>
          <div className="md:w-[380px] w-full mt-10 md:mt-0 z-10">
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder-white/40 text-sm outline-none focus:border-emerald-400 transition-colors" />
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] tracking-widest py-4 rounded-xl uppercase transition-colors">
                Subscribe Free
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
