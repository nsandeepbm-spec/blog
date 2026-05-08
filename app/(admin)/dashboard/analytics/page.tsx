import { BarChart3, TrendingUp, Users, Eye, ArrowUpRight } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          Performance Analytics
        </h1>
        <p className="text-gray-500 font-medium">Track article engagement and reader behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Avg. Read Time', value: '0m 00s', icon: Eye, trend: '0%' },
          { name: 'Click Through Rate', value: '0.00%', icon: TrendingUp, trend: '0%' },
          { name: 'Active Readers', value: '0', icon: Users, trend: '0%' },
        ].map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {stat.trend}
              </div>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.name}</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white overflow-hidden relative border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <BarChart3 className="w-64 h-64 rotate-12" />
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Data Processing</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8">
            Our analytics engine is waiting for traffic. Once your articles are live and receiving hits, detailed charts will appear here.
          </p>
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-800 rounded-2xl border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase">Waiting for first event</span>
          </div>
        </div>
      </div>
    </div>
  )
}
