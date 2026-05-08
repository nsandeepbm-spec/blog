import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Tag, Share2, Bookmark, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

// ─── Dynamic Metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('articles')
    .select('title, body')
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .single();

  if (!article) return { title: 'Article Not Found | Blorix' };

  const desc = article.body?.replace(/<[^>]*>/g, '').substring(0, 160);
  return {
    title: `${article.title} | Blorix`,
    description: desc,
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from('articles')
    .select('*, categories(id, name, slug)')
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .single();

  if (!article || error) notFound();

  // Normalize categories join
  const category = Array.isArray(article.categories)
    ? article.categories[0]
    : (article.categories || { name: 'NEWS', slug: '#' });

  // Estimated read time: ~200 words per minute
  const wordCount = article.body?.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Fetch 3 related articles from the same category
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
    categories: Array.isArray(a.categories) ? a.categories[0] : (a.categories || { name: 'NEWS' }),
  }));

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const categoryHref = category.slug ? `/${category.slug}` : '/';

  return (
    <div className="bg-white font-sans text-slate-900 min-h-screen">
      <main className="max-w-[1440px] mx-auto px-6 pt-40 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── ARTICLE CONTENT (8 cols) ── */}
          <article className="lg:col-span-8">

            {/* Category badge */}
            <div className="flex items-center gap-3 mb-6">
              <Link href={categoryHref}>
                <span className="bg-black text-white text-[10px] font-black px-3 py-1.5 tracking-widest uppercase hover:bg-blue-600 transition-colors cursor-pointer">
                  {category.name}
                </span>
              </Link>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {readTime} MIN READ
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[40px] md:text-[56px] font-black tracking-tighter leading-[1.0] mb-8">
              {article.title}
            </h1>

            {/* Author / Meta row */}
            <div className="flex items-center justify-between border-y border-gray-100 py-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                  {(article.author_name || 'A').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[12px] font-black tracking-widest uppercase">{article.author_name || 'Blorix Editorial'}</p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {publishedDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime} min read</span>
                  </div>
                </div>
              </div>
              {/* Share buttons */}
              <div className="flex gap-2">
                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg" title="Share">
                  <Share2 className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg" title="Bookmark">
                  <Bookmark className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Hero Image */}
            {article.image_url && (
              <figure className="mb-10">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </figure>
            )}

            {/* Article Body */}
            <div
              className="
                text-[19px] leading-[1.8] text-gray-800 font-lora
                [&_h1]:font-sans [&_h1]:text-[36px] [&_h1]:font-black [&_h1]:text-black [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:leading-[1.2] [&_h1]:tracking-tight
                [&_h2]:font-sans [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:tracking-tight
                [&_h3]:font-sans [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:mb-7
                [&>p:first-of-type]:first-letter:text-[96px] [&>p:first-of-type]:first-letter:font-black [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-4 [&>p:first-of-type]:first-letter:mt-2 [&>p:first-of-type]:first-letter:leading-[0.75] [&>p:first-of-type]:first-letter:text-blue-900 [&>p:first-of-type]:first-letter:font-lora
                [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/50 [&_blockquote]:py-4 [&_blockquote]:pr-4 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:my-10 [&_blockquote]:text-[21px] [&_blockquote]:leading-relaxed
                [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul]:space-y-4
                [&_ul_li]:relative [&_ul_li]:pl-6 [&_ul_li::before]:content-[''] [&_ul_li::before]:absolute [&_ul_li::before]:left-0 [&_ul_li::before]:top-3.5 [&_ul_li::before]:w-2 [&_ul_li::before]:h-2 [&_ul_li::before]:bg-blue-600 [&_ul_li::before]:rounded-sm
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8 [&_ol]:space-y-4
                [&_li]:text-[19px] [&_li]:leading-[1.8] [&_li]:text-gray-800
                [&_a]:text-blue-700 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-[5px] [&_a]:decoration-blue-700/30 hover:[&_a]:decoration-blue-700 hover:[&_a]:bg-blue-50 transition-all
                [&_hr]:border-gray-200 [&_hr]:my-14
                [&_strong]:font-bold [&_strong]:text-black
                [&_em]:italic
              "
              dangerouslySetInnerHTML={{ __html: article.body || '' }}
            />

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </div>
              {[category.name, 'Blorix', 'Analysis'].map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-3 py-1.5 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link href={categoryHref} className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to {category.name}
              </Link>
            </div>
          </article>

          {/* ── SIDEBAR (4 cols) ── */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">

              {/* Related Articles */}
              {related.length > 0 && (
                <div className="border border-gray-100 rounded-2xl p-6">
                  <h3 className="text-[13px] font-black tracking-[0.2em] uppercase border-b-2 border-slate-900 pb-4 mb-6">
                    Related Stories
                  </h3>
                  <div className="space-y-6">
                    {related.map((rel, i) => (
                      <Link key={rel.id} href={`/article/${rel.slug}`} className="flex gap-4 items-start group">
                        <div className="w-20 h-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {rel.image_url ? (
                            <img src={rel.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-black text-lg">
                              {i + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1 block">
                            {rel.categories?.name}
                          </span>
                          <h4 className="text-[13px] font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                            {rel.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author card */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3">
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-gray-400">About the Author</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-lg">
                    {(article.author_name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[13px] font-black">{article.author_name || 'Blorix Editorial'}</p>
                    <p className="text-[11px] text-gray-400 font-medium">Senior Correspondent</p>
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  Delivering precision journalism on {category.name} and global affairs.
                </p>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-blue-600 rounded-2xl p-6 text-white space-y-4">
                <h4 className="text-[20px] font-black tracking-tighter leading-tight">The Daily Brief</h4>
                <p className="text-[13px] text-blue-100 leading-relaxed">
                  Join 250,000+ professionals. Precision intelligence at 7:30 AM.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-blue-700/50 border border-blue-400 rounded-xl px-4 py-3 text-sm focus:outline-none placeholder:text-blue-300 text-white"
                />
                <button className="w-full bg-white text-blue-600 font-black text-[11px] tracking-widest py-3 rounded-xl uppercase hover:bg-blue-50 transition-colors">
                  Subscribe Free
                </button>
              </div>

              {/* Other Categories */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <h3 className="text-[12px] font-black tracking-[0.2em] uppercase border-b-2 border-slate-200 pb-4 mb-4 text-gray-900">Explore Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="/stock-market" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Markets</Link>
                  <Link href="/automobile" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Automobile</Link>
                  <Link href="/tech" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Tech</Link>
                  <Link href="/sport" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Sport</Link>
                  <Link href="/government" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Government</Link>
                  <Link href="/health" className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Health</Link>
                </div>
              </div>

            </div>
          </aside>
        </div>

        {/* ── MORE FROM THIS CATEGORY ── */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-gray-100 pt-16">
            <h2 className="text-[22px] font-black tracking-tighter uppercase mb-10 flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600" />
              More from {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map(rel => (
                <Link key={rel.id} href={`/article/${rel.slug}`} className="group block">
                  <div className="aspect-[16/10] mb-4 overflow-hidden rounded-xl bg-gray-100">
                    {rel.image_url ? (
                      <img src={rel.image_url} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 font-black text-3xl">B</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 block">{rel.categories?.name}</span>
                  <h3 className="text-[18px] font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{rel.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
