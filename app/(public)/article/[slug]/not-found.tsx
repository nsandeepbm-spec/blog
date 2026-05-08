import Link from 'next/link';
import { ArrowLeft, FileX } from 'lucide-react';

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <FileX className="w-16 h-16 text-gray-200 mx-auto mb-6" />
        <h1 className="text-[64px] font-black text-gray-100 leading-none mb-2">404</h1>
        <p className="text-[18px] font-bold text-gray-900 mb-3">Article Not Found</p>
        <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
          This article may have been unpublished, moved, or the URL is incorrect.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white text-[11px] font-black tracking-widest px-6 py-3.5 rounded-xl hover:bg-blue-700 transition-colors uppercase">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
