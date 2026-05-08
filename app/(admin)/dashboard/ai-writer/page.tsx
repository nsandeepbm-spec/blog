import { Sparkles, Wand2, Search, Zap } from 'lucide-react'

export default function AIWriterPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            AI Content Writer
          </h1>
          <p className="text-gray-500 font-medium">Generate professional automotive news using Gemini 2.5 Flash.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">What should the article be about?</label>
              <textarea 
                className="w-full h-32 p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-700 leading-relaxed"
                placeholder="e.g. The impact of the new Tesla Model 3 on the Indian luxury EV market..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tone of Voice</label>
                <select className="w-full bg-transparent font-medium text-gray-900 outline-none">
                  <option>Professional & Technical</option>
                  <option>Exciting & Viral</option>
                  <option>Opinionated & Analytical</option>
                </select>
              </div>
              <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Language</label>
                <select className="w-full bg-transparent font-medium text-gray-900 outline-none">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Bilingual (Dual)</option>
                </select>
              </div>
            </div>

            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-900/20 group">
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Generate Article
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
            <Zap className="w-10 h-10 mb-6 text-blue-200" />
            <h3 className="text-xl font-bold mb-3">AI Intelligence</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Our AI pipeline performs real-time research across multiple automotive sources before drafting content.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-bold bg-blue-700/50 p-3 rounded-xl border border-blue-400/20">
                <Search className="w-4 h-4" />
                Live Web Research Enabled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
