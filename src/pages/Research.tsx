import { Search, TrendingUp, Target, Zap, ArrowRight } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';

export function Research() {
  const { activeExpert } = useExpertStore();

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  return (
    <div className="p-8 h-full flex flex-col overflow-auto text-text-main">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl mb-3">Market Intelligence</h1>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Analyze trends, competitors, and viral references tailored to <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}'s</span> niche and audience.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: `${activeExpert.brandColor}33` }}></div>
          <div className="relative bg-surface border border-border rounded-2xl p-2 flex items-center shadow-2xl">
            <div className="pl-4 pr-2" style={{ color: activeExpert.brandColor }}>
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder={`What topic or trend do you want to research for ${activeExpert.niche}?`} 
              className="flex-1 bg-transparent border-none focus:outline-none text-lg py-3 px-2 placeholder:text-text-muted/50"
            />
            <button className="text-white px-6 py-3 rounded-xl font-medium transition-colors hover:brightness-110" style={{ backgroundColor: activeExpert.brandColor }}>
              Analyze
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Trending Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-serif text-lg mb-2">Trending Topics</h3>
            <p className="text-sm text-text-muted mb-4">Discover what your audience is searching for right now.</p>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm">
                <span>Off-market properties</span>
                <span className="text-green-400 text-xs">+124%</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Interest rate impact 2025</span>
                <span className="text-green-400 text-xs">+85%</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Branded residences</span>
                <span className="text-green-400 text-xs">+42%</span>
              </li>
            </ul>
          </div>

          {/* Competitor Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
              <Target size={20} />
            </div>
            <h3 className="font-serif text-lg mb-2">Competitor Radar</h3>
            <p className="text-sm text-text-muted mb-4">Analyze top performing content from direct competitors.</p>
            <div className="space-y-3">
              <div className="bg-bg p-3 rounded-lg border border-border">
                <p className="text-xs font-bold uppercase mb-1" style={{ color: activeExpert.brandColor }}>Top Format</p>
                <p className="text-sm">Educational Carousels (7-10 slides)</p>
              </div>
              <div className="bg-bg p-3 rounded-lg border border-border">
                <p className="text-xs font-bold uppercase mb-1" style={{ color: activeExpert.brandColor }}>Missing Gap</p>
                <p className="text-sm">Data-driven market predictions</p>
              </div>
            </div>
          </div>

          {/* Viral Hooks Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
              <Zap size={20} />
            </div>
            <h3 className="font-serif text-lg mb-2">Viral References</h3>
            <p className="text-sm text-text-muted mb-4">Proven hooks and structures adapted to your voice.</p>
            <ul className="space-y-3">
              <li className="text-sm border-l-2 border-orange-500/50 pl-3 py-1">
                "The 3 things nobody tells you about..."
              </li>
              <li className="text-sm border-l-2 border-orange-500/50 pl-3 py-1">
                "Why I stopped doing X and started Y"
              </li>
              <li className="text-sm border-l-2 border-orange-500/50 pl-3 py-1">
                "The exact framework I used to..."
              </li>
            </ul>
          </div>
        </div>

        {/* Action Area */}
        <div className="border rounded-2xl p-6 flex items-center justify-between" style={{ backgroundColor: `${activeExpert.brandColor}1A`, borderColor: `${activeExpert.brandColor}33` }}>
          <div>
            <h3 className="font-serif text-lg mb-1">Turn Insights into Content</h3>
            <p className="text-sm text-text-muted">Send these findings directly to the Content Studio to generate drafts.</p>
          </div>
          <button className="bg-surface border border-border hover:bg-white/5 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            Open in Studio <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
