import { useState } from 'react';
import { Search, TrendingUp, Target, Zap, ArrowRight, Youtube, Smartphone, Newspaper, Wand2, X, Play, Copy, CheckCircle2 } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';

export function Research() {
  const { activeExpert } = useExpertStore();
  const { getAgentsByExpert } = useAgentStore();
  const [activeTab, setActiveTab] = useState<'viral' | 'news'>('viral');
  const [selectedViral, setSelectedViral] = useState<any>(null);
  const [isAdapting, setIsAdapting] = useState(false);
  const [adaptedContent, setAdaptedContent] = useState<any>(null);

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const expertAgents = getAgentsByExpert(activeExpert.id);
  const orchestrator = expertAgents.find(a => a.role.includes('Strategy') || a.role.includes('Orchestrator')) || { name: 'Orchestrator Prime' };

  const handleCloneAndAdapt = (item: any) => {
    setSelectedViral(item);
    setIsAdapting(true);
    setAdaptedContent(null);

    // Simulate AI adaptation process based on Expert context
    setTimeout(() => {
      setIsAdapting(false);
      setAdaptedContent({
        hook: `Why ${activeExpert.icp?.split(',')[0] || 'professionals'} are abandoning traditional strategies in 2026.`,
        script: `The old model is dead. If you're still relying on [Generic Strategy], you're losing leverage. Here is the exact framework we use at ${activeExpert.name} to secure...`,
        rationale: `Adapted the original aggressive hook to ${activeExpert.name}'s more sophisticated, authoritative tone. Shifted the focus from 'quick hacks' to 'structural leverage' to appeal to ${activeExpert.icp}.`
      });
    }, 3000);
  };

  const viralVideos = [
    {
      id: 1,
      platform: 'TikTok',
      icon: Smartphone,
      title: "The 3 things keeping you poor in 2025",
      views: "2.4M",
      engagement: "12%",
      originalHook: "Stop scrolling if you want to be rich. These 3 habits are destroying your bank account.",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      platform: 'YouTube',
      icon: Youtube,
      title: "I tried the new algorithm for 30 days",
      views: "850K",
      engagement: "8.5%",
      originalHook: "I spent 30 days testing every single algorithm update so you don't have to. Here is what actually works.",
      thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const newsArticles = [
    {
      id: 1,
      source: 'WSJ',
      title: "The Great Wealth Transfer Accelerates",
      relevance: "High",
      summary: "Trillions are moving to the next generation, altering investment landscapes."
    },
    {
      id: 2,
      source: 'TechCrunch',
      title: "AI Agents are the new SaaS",
      relevance: "Critical",
      summary: "Software is moving from tools you use, to agents that work for you."
    }
  ];

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden text-text-main relative">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
        <div className="text-center mb-8 shrink-0">
          <h1 className="font-serif text-3xl mb-3">Market Intelligence</h1>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Analyze trends, competitors, and viral references tailored to <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}'s</span> niche and audience.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 shrink-0">
          <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ backgroundColor: `${activeExpert.brandColor}33` }}></div>
          <div className="relative bg-surface border border-border rounded-2xl p-2 flex items-center shadow-2xl">
            <div className="pl-4 pr-2" style={{ color: activeExpert.brandColor }}>
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder={`Search topics, competitors, or trends in ${activeExpert.niche}...`} 
              className="flex-1 bg-transparent border-none focus:outline-none text-lg py-3 px-2 placeholder:text-text-muted/50"
            />
            <button className="text-white px-6 py-3 rounded-xl font-medium transition-colors hover:brightness-110 flex items-center gap-2" style={{ backgroundColor: activeExpert.brandColor }}>
              <Zap size={18} /> Deep Scan
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 shrink-0 border-b border-border pb-2">
          <button 
            onClick={() => setActiveTab('viral')}
            className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'viral' ? 'text-text-main' : 'text-text-muted border-transparent hover:text-text-main'}`}
            style={{ borderColor: activeTab === 'viral' ? activeExpert.brandColor : 'transparent' }}
          >
            <TrendingUp size={16} /> Viral Content Radar
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'news' ? 'text-text-main' : 'text-text-muted border-transparent hover:text-text-main'}`}
            style={{ borderColor: activeTab === 'news' ? activeExpert.brandColor : 'transparent' }}
          >
            <Newspaper size={16} /> Industry News & SEO
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-8">
          {activeTab === 'viral' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {viralVideos.map(video => (
                <div key={video.id} className="bg-surface border border-border rounded-2xl overflow-hidden group">
                  <div className="h-48 relative overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Play size={24} className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-white">
                      <video.icon size={14} /> {video.platform}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-3 text-xs font-bold text-white">
                      <span>👁 {video.views}</span>
                      <span>🔥 {video.engagement}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{video.title}</h3>
                    <div className="bg-bg border border-border p-3 rounded-xl mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">Original Hook</p>
                      <p className="text-sm italic text-text-muted">"{video.originalHook}"</p>
                    </div>
                    <button 
                      onClick={() => handleCloneAndAdapt(video)}
                      className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors hover:brightness-110 text-white"
                      style={{ backgroundColor: activeExpert.brandColor }}
                    >
                      <Wand2 size={16} /> Clone & Adapt to {activeExpert.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-4">
              {newsArticles.map(article => (
                <div key={article.id} className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between group hover:border-primary/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-text-muted">{article.source}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                        <Zap size={12} /> {article.relevance} Relevance
                      </span>
                    </div>
                    <h3 className="font-serif text-xl mb-2">{article.title}</h3>
                    <p className="text-sm text-text-muted">{article.summary}</p>
                  </div>
                  <div className="pl-6 border-l border-border ml-6 flex flex-col gap-2">
                    <button className="bg-bg border border-border hover:bg-white/5 px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                      Read Full
                    </button>
                    <button className="px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap text-white hover:brightness-110" style={{ backgroundColor: activeExpert.brandColor }}>
                      Turn into Blog Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Adaptation Modal */}
      {selectedViral && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-bg/80 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-full">
            <div className="p-4 border-b border-border flex justify-between items-center bg-bg">
              <div className="flex items-center gap-2">
                <Wand2 size={18} style={{ color: activeExpert.brandColor }} />
                <h3 className="font-bold">Contextual Adaptation</h3>
              </div>
              <button onClick={() => setSelectedViral(null)} className="p-2 hover:bg-white/5 rounded-lg text-text-muted">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {isAdapting ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-bg border border-border flex items-center justify-center mb-4 shadow-xl">
                    <Wand2 size={32} className="animate-pulse" style={{ color: activeExpert.brandColor }} />
                  </div>
                  <h4 className="text-lg font-serif mb-2">{orchestrator.name} is working...</h4>
                  <p className="text-sm text-text-muted text-center max-w-sm">
                    Analyzing viral structure and rewriting through the lens of {activeExpert.name}'s tone, targeting {activeExpert.icp?.split(',')[0] || 'the audience'}.
                  </p>
                </div>
              ) : adaptedContent ? (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-green-500 mb-1">Identity Locked</h4>
                      <p className="text-xs text-green-400/80 leading-relaxed">{adaptedContent.rationale}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Adapted Hook</h4>
                    <div className="bg-bg border border-border rounded-xl p-4 relative group">
                      <p className="text-lg font-serif">{adaptedContent.hook}</p>
                      <button className="absolute top-2 right-2 p-2 bg-surface border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Suggested Script / Copy</h4>
                    <div className="bg-bg border border-border rounded-xl p-4 relative group">
                      <p className="text-sm text-text-muted leading-relaxed">{adaptedContent.script}</p>
                      <button className="absolute top-2 right-2 p-2 bg-surface border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button className="flex-1 bg-bg border border-border hover:bg-white/5 py-3 rounded-xl text-sm font-bold transition-colors">
                      Regenerate
                    </button>
                    <button className="flex-1 py-3 rounded-xl text-sm font-bold transition-colors text-white flex items-center justify-center gap-2 hover:brightness-110" style={{ backgroundColor: activeExpert.brandColor }}>
                      Send to Content Studio <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
