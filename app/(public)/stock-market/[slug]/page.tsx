import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Share2, Bookmark, Calendar, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('articles').select('title, body').eq('slug', slug).eq('status', 'PUBLISHED').single();
  if (!data) return { title: 'Article Not Found | Blorix Markets' };
  return { title: `${data.title} | Blorix Markets`, description: data.body?.replace(/<[^>]*>/g, '').substring(0, 160) };
}

export default async function StockMarketArticlePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from('articles')
    .select('*, categories(id, name, slug)')
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .single();

  if (!article || error) notFound();

  const category = Array.isArray(article.categories) ? article.categories[0] : (article.categories || { name: 'MARKETS', slug: 'stock-market' });
  const wordCount = article.body?.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const { data: relatedRaw } = await supabase
    .from('articles')
    .select('id, title, slug, image_url, published_at, categories(name)')
    .eq('status', 'PUBLISHED')
    .eq('category_id', article.category_id)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3);

  const related = (relatedRaw || []).map(a => ({
    ...a,
    categories: Array.isArray(a.categories) ? a.categories[0] : (a.categories || { name: 'MARKETS' }),
  }));

  const publishedDate = new Date(article.published_at || article.created_at)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white font-sans text-slate-900 min-h-screen">
      <main className="max-w-[1440px] mx-auto px-6 pt-40 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Article */}
          <article className="lg:col-span-8">
            {/* Badge + readtime */}
            <div className="flex items-center gap-3 mb-6">
              <Link href="/stock-market">
                <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 tracking-widest uppercase rounded-full hover:bg-emerald-700 transition-colors">
                  {category.name || 'MARKETS'}
                </span>
              </Link>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> {readTime} MIN READ
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[38px] md:text-[52px] font-black tracking-tighter leading-[1.05] mb-8">{article.title}</h1>

            {/* Author row */}
            <div className="flex items-center justify-between border-y border-gray-100 py-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                  {(article.author_name || 'B').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[12px] font-black tracking-widest uppercase">{article.author_name || 'Blorix Markets Desk'}</p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{publishedDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime} min read</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg"><Share2 className="w-4 h-4 text-gray-500" /></button>
                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg"><Bookmark className="w-4 h-4 text-gray-500" /></button>
              </div>
            </div>

            {/* Hero image */}
            {article.image_url && (
              <figure className="mb-10">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                  <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                </div>
              </figure>
            )}

            {/* Body */}
            <div
              className="
                text-[18px] leading-[1.85] text-gray-800 font-serif
                [&_h1]:font-sans [&_h1]:text-[36px] [&_h1]:font-black [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:leading-tight [&_h1]:tracking-tighter
                [&_h2]:font-sans [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:tracking-tight
                [&_h3]:font-sans [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-2
                [&_p]:mb-6 [&_p]:text-gray-700
                [&>p:first-of-type]:first-letter:text-[84px] [&>p:first-of-type]:first-letter:font-black [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-4 [&>p:first-of-type]:first-letter:mt-2 [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:text-emerald-900 [&>p:first-of-type]:first-letter:font-serif
                [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-600 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-10 [&_blockquote]:text-[20px] [&_blockquote]:leading-relaxed
                [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul]:text-gray-700 [&_ul]:space-y-3
                [&_ul_li]:relative [&_ul_li]:pl-6 [&_ul_li::before]:content-[''] [&_ul_li::before]:absolute [&_ul_li::before]:left-0 [&_ul_li::before]:top-3 [&_ul_li::before]:w-2 [&_ul_li::before]:h-2 [&_ul_li::before]:bg-emerald-600 [&_ul_li::before]:rounded-sm
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8 [&_ol]:text-gray-700 [&_ol]:space-y-3
                [&_li]:text-[18px]
                [&_a]:text-emerald-600 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-emerald-600/30 hover:[&_a]:decoration-emerald-600 transition-all
                [&_hr]:border-gray-200 [&_hr]:my-12
                [&_strong]:font-bold [&_strong]:text-gray-900
                [&_em]:italic
              "
              dangerouslySetInnerHTML={{ __html: article.body || '' }}
            />

            {/* Category Link Block */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Continue Reading</p>
                <h4 className="text-[18px] font-bold text-gray-900">More in {category.name || 'Markets'}</h4>
              </div>
              <Link href="/stock-market" className="px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl text-[12px] font-black uppercase tracking-widest transition-colors flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {related.length > 0 && (
                <div className="border border-gray-100 rounded-2xl p-6">
                  <h3 className="text-[12px] font-black tracking-[0.2em] uppercase border-b-2 border-slate-900 pb-4 mb-5">Related Stories</h3>
                  <div className="space-y-5">
                    {related.map(rel => (
                      <Link key={rel.id} href={`/stock-market/${rel.slug}`} className="flex gap-3 items-start group">
                        <div className="w-18 h-14 w-[72px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {rel.image_url
                            ? <img src={rel.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            : <div className="w-full h-full bg-emerald-100 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-400" /></div>
                          }
                        </div>
                        <h4 className="text-[13px] font-bold leading-tight group-hover:text-emerald-600 transition-colors line-clamp-3">{rel.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#050a14] rounded-2xl p-6 text-white space-y-4">
                <p className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase">Markets Brief</p>
                <h4 className="text-[20px] font-black tracking-tighter leading-tight">Intelligence before the opening bell.</h4>
                <p className="text-slate-400 text-[13px]">Pre-market movers, earnings previews, macro analysis at 7:30 AM IST.</p>
                <input type="email" placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-emerald-400 transition-colors" />
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] tracking-widest py-3.5 rounded-xl uppercase transition-colors">
                  Subscribe Free
                </button>
              </div>

              {/* Other Categories */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <h3 className="text-[12px] font-black tracking-[0.2em] uppercase border-b-2 border-slate-200 pb-4 mb-4 text-gray-900">Explore Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="/automobile" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">Automobile</Link>
                  <Link href="/tech" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">Tech</Link>
                  <Link href="/sport" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">Sport</Link>
                  <Link href="/government" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">Government</Link>
                  <Link href="/health" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">Health</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
