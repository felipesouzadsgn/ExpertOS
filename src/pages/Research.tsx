import { useState } from 'react';
import { 
  Search, TrendingUp, Target, Zap, ArrowRight, Youtube, Smartphone, 
  Newspaper, Wand2, X, Play, Copy, CheckCircle2, Linkedin, Instagram, 
  Twitter, Users, Layers, Filter, BarChart2, BookOpen
} from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';

export function Research() {
  const { activeExpert } = useExpertStore();
  const { getAgentsByExpert } = useAgentStore();
  const [activeTab, setActiveTab] = useState<'viral' | 'news' | 'competitors'>('viral');
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
        script: `The old model is dead. If you're still relying on generic advice, you're losing leverage. Here is the exact framework we use at ${activeExpert.name} to secure predictable outcomes...`,
        rationale: `Adapted the original aggressive hook to ${activeExpert.name}'s more sophisticated, authoritative tone. Shifted the focus from 'quick hacks' to 'structural leverage' to appeal to ${activeExpert.icp}.`,
        funnelStrategy: 'Top of Funnel (Awareness) -> Drive to Newsletter',
        structuralBreakdown: [
          { phase: 'Hook', detail: 'Pattern interrupt challenging a common industry belief.' },
          { phase: 'Agitation', detail: 'Highlight the financial/time cost of the old method.' },
          { phase: 'Authority Pivot', detail: 'Introduce the proprietary framework used by the expert.' },
          { phase: 'Soft CTA', detail: 'Direct to the link in bio for the full case study.' }
        ]
      });
    }, 3000);
  };

  const viralContent = [
    {
      id: 1,
      platform: 'TikTok',
      icon: Smartphone,
      title: "The 3 things keeping you poor in 2025",
      views: "2.4M",
      engagement: "12%",
      originalHook: "Stop scrolling if you want to be rich. These 3 habits are destroying your bank account.",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      funnelStage: "Top of Funnel",
      framework: "PAS (Problem, Agitate, Solve)",
      structure: ["Negative Hook", "Relatable Scenario", "Counter-Intuitive Solution"]
    },
    {
      id: 2,
      platform: 'LinkedIn',
      icon: Linkedin,
      title: "How I scaled from $0 to $10M without funding",
      views: "1.2M",
      engagement: "8.5%",
      originalHook: "Bootstrapping isn't dead. It's just misunderstood. Here is the 5-step playbook I used to hit 8 figures.",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
      funnelStage: "Middle of Funnel",
      framework: "Hero's Journey / Case Study",
      structure: ["Credibility Hook", "The Struggle", "The Turning Point", "Actionable Steps"]
    },
    {
      id: 3,
      platform: 'Instagram',
      icon: Instagram,
      title: "Behind the scenes of a $50M negotiation",
      views: "3.1M",
      engagement: "15%",
      originalHook: "Want to know what happens in a room where $50M is on the line? It's not what you think.",
      thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1000&auto=format&fit=crop",
      funnelStage: "Top of Funnel",
      framework: "Insider Secrets / Curiosity Gap",
      structure: ["Curiosity Hook", "Busting a Myth", "The Real Secret", "Engagement Question"]
    },
    {
      id: 4,
      platform: 'Twitter',
      icon: Twitter,
      title: "10 AI Tools that will replace your agency",
      views: "5.5M",
      engagement: "4.2%",
      originalHook: "Agencies are terrified of 2025. Here are 10 AI tools that do the work of a 5-person team for $0:",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
      funnelStage: "Top of Funnel",
      framework: "Listicle / Fear of Missing Out",
      structure: ["Fear/Urgency Hook", "High-Value List", "Bookmark CTA"]
    }
  ];

  const newsArticles = [
    {
      id: 1,
      source: 'WSJ',
      title: "The Great Wealth Transfer Accelerates",
      relevance: "Critical",
      seoScore: 94,
      targetKeyword: "wealth transfer strategies 2025",
      summary: "Trillions are moving to the next generation, altering investment landscapes."
    },
    {
      id: 2,
      source: 'TechCrunch',
      title: "AI Agents are the new SaaS",
      relevance: "High",
      seoScore: 88,
      targetKeyword: "ai agent implementation",
      summary: "Software is moving from tools you use, to agents that work for you."
    },
    {
      id: 3,
      source: 'Bloomberg',
      title: "Institutional Capital Shifts to Alternative Assets",
      relevance: "High",
      seoScore: 91,
      targetKeyword: "alternative asset allocation",
      summary: "Family offices and endowments are increasing exposure to private credit and real estate."
    },
    {
      id: 4,
      source: 'Forbes',
      title: "The Rise of the 'Micro-Monopoly' in B2B",
      relevance: "Medium",
      seoScore: 76,
      targetKeyword: "b2b niche dominance",
      summary: "Why hyper-specialized consulting firms are outperforming generalist giants."
    }
  ];

  const competitors = [
    {
      id: 1,
      name: "Industry Titan A",
      niche: "Generalist Consulting",
      strengths: ["Massive reach", "High production value", "Consistent daily posting"],
      weaknesses: ["Generic advice", "Low engagement rate", "Lacks deep technical insights"],
      topFormat: "Short-form motivational video",
      contentGap: "Data-driven, highly technical breakdowns for advanced practitioners.",
      threatLevel: "High"
    },
    {
      id: 2,
      name: "Niche Specialist B",
      niche: "Technical Implementation",
      strengths: ["Deep expertise", "Highly engaged loyal community", "Strong SEO"],
      weaknesses: ["Poor visual design", "Inconsistent posting schedule", "Too academic"],
      topFormat: "Long-form blog posts & whitepapers",
      contentGap: "Translating complex concepts into digestible, highly-visual social carousels.",
      threatLevel: "Medium"
    },
    {
      id: 3,
      name: "Rising Star C",
      niche: "Modern Strategies",
      strengths: ["Excellent hook writing", "Mastery of TikTok/Reels algorithms"],
      weaknesses: ["Lacks historical credibility", "Offers are unproven at enterprise scale"],
      topFormat: "Controversial hot-takes (Video)",
      contentGap: "Case studies proving ROI over a 5+ year time horizon.",
      threatLevel: "Low"
    }
  ];

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden text-text-main relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <div className="text-center mb-8 shrink-0">
          <h1 className="font-serif text-3xl mb-3">Market Intelligence</h1>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            Deep analysis of trends, competitors, and viral structures tailored to <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}'s</span> specific market positioning.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 shrink-0">
          <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ backgroundColor: `${activeExpert.brandColor}33` }}></div>
          <div className="relative bg-surface border border-border rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center shadow-2xl gap-2 sm:gap-0">
            <div className="pl-4 pr-2" style={{ color: activeExpert.brandColor }}>
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder={`Search topics, competitors, or trends in ${activeExpert.niche}...`} 
              className="flex-1 bg-transparent border-none focus:outline-none text-base sm:text-lg py-3 px-2 placeholder:text-text-muted/50"
            />
            <button className="text-white px-6 py-3 rounded-xl font-medium transition-colors hover:brightness-110 flex items-center gap-2 justify-center" style={{ backgroundColor: activeExpert.brandColor }}>
              <Zap size={18} /> Deep Scan
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 shrink-0 border-b border-border pb-2 overflow-x-auto custom-scrollbar">
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
          <button 
            onClick={() => setActiveTab('competitors')}
            className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'competitors' ? 'text-text-main' : 'text-text-muted border-transparent hover:text-text-main'}`}
            style={{ borderColor: activeTab === 'competitors' ? activeExpert.brandColor : 'transparent' }}
          >
            <Target size={16} /> Competitor Analysis
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-8 pr-2">
          {activeTab === 'viral' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {viralContent.map(item => (
                <div key={item.id} className="bg-surface border border-border rounded-2xl overflow-hidden group flex flex-col">
                  <div className="h-48 relative overflow-hidden shrink-0">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Play size={24} className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-white">
                      <item.icon size={14} /> {item.platform}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-3 text-xs font-bold text-white">
                      <span>👁 {item.views}</span>
                      <span>🔥 {item.engagement}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg mb-3 line-clamp-1">{item.title}</h3>
                    
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-border px-2 py-1 rounded text-text-muted flex items-center gap-1">
                        <Filter size={10} /> {item.funnelStage}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-border px-2 py-1 rounded text-text-muted flex items-center gap-1">
                        <Layers size={10} /> {item.framework}
                      </span>
                    </div>

                    <div className="bg-bg border border-border p-3 rounded-xl mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">Original Hook</p>
                      <p className="text-sm italic text-text-muted">"{item.originalHook}"</p>
                    </div>

                    <div className="mb-4 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-2">Structural Breakdown</p>
                      <div className="flex gap-1">
                        {item.structure.map((step, idx) => (
                          <div key={idx} className="flex-1 h-1.5 rounded-full bg-white/10 relative group/tooltip cursor-help">
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] bg-black text-white text-[10px] p-2 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                              Step {idx + 1}: {step}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] text-text-muted mt-1 px-1">
                        <span>Hook</span>
                        <span>Body</span>
                        <span>CTA</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleCloneAndAdapt(item)}
                      className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors hover:brightness-110 text-white mt-auto"
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
                      <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${article.relevance === 'Critical' ? 'text-red-400' : article.relevance === 'High' ? 'text-orange-400' : 'text-yellow-400'}`}>
                        <Zap size={12} /> {article.relevance} Relevance
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 flex items-center gap-1">
                        <BarChart2 size={12} /> SEO Score: {article.seoScore}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl mb-2">{article.title}</h3>
                    <p className="text-sm text-text-muted mb-3">{article.summary}</p>
                    <div className="inline-flex items-center gap-1 text-[10px] font-mono text-text-muted bg-bg px-2 py-1 rounded border border-border">
                      <Search size={10} /> Target Keyword: {article.targetKeyword}
                    </div>
                  </div>
                  <div className="pl-0 sm:pl-6 border-l-0 sm:border-l border-border ml-0 sm:ml-6 flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    <button className="bg-bg border border-border hover:bg-white/5 px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                      Read Full
                    </button>
                    <button className="px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap text-white hover:brightness-110 flex items-center gap-2 justify-center" style={{ backgroundColor: activeExpert.brandColor }}>
                      <BookOpen size={14} /> Turn into Blog Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'competitors' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {competitors.map(comp => (
                <div key={comp.id} className="bg-surface border border-border rounded-2xl p-6 flex flex-col relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${comp.threatLevel === 'High' ? 'bg-red-500' : comp.threatLevel === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center">
                      <Users size={20} className="text-text-muted" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{comp.name}</h3>
                      <p className="text-xs text-text-muted">{comp.niche}</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-green-400 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {comp.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-text-muted flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-red-400 mb-2">Weaknesses</h4>
                      <ul className="space-y-1">
                        {comp.weaknesses.map((w, i) => (
                          <li key={i} className="text-xs text-text-muted flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-bg border border-border rounded-xl p-3">
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-text-main mb-1">Top Format</h4>
                      <p className="text-xs text-text-muted">{comp.topFormat}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold mb-2 flex items-center gap-1" style={{ color: activeExpert.brandColor }}>
                      <Target size={12} /> Content Gap Opportunity
                    </h4>
                    <p className="text-sm text-text-main italic">"{comp.contentGap}"</p>
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
          <div className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-full">
            <div className="p-4 border-b border-border flex justify-between items-center bg-bg">
              <div className="flex items-center gap-2">
                <Wand2 size={18} style={{ color: activeExpert.brandColor }} />
                <h3 className="font-bold">Contextual Adaptation Engine</h3>
              </div>
              <button onClick={() => setSelectedViral(null)} className="p-2 hover:bg-white/5 rounded-lg text-text-muted transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {isAdapting ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 rounded-2xl bg-bg border border-border flex items-center justify-center mb-6 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <Wand2 size={40} className="animate-pulse" style={{ color: activeExpert.brandColor }} />
                  </div>
                  <h4 className="text-xl font-serif mb-3">{orchestrator.name} is engineering content...</h4>
                  <p className="text-sm text-text-muted text-center max-w-md leading-relaxed">
                    Deconstructing the viral mechanics of "{selectedViral.title}" and rebuilding it through the lens of {activeExpert.name}'s tone, targeting {activeExpert.icp?.split(',')[0] || 'the audience'}.
                  </p>
                </div>
              ) : adaptedContent ? (
                <div className="space-y-6">
                  {/* Validation Banner */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-green-500 mb-1">Identity Locked & Validated</h4>
                      <p className="text-xs text-green-400/80 leading-relaxed">{adaptedContent.rationale}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Copy */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                          <Zap size={14} /> Adapted Hook
                        </h4>
                        <div className="bg-bg border border-border rounded-xl p-4 relative group">
                          <p className="text-lg font-serif text-text-main">{adaptedContent.hook}</p>
                          <button className="absolute top-2 right-2 p-2 bg-surface border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                          <BookOpen size={14} /> Suggested Script / Copy
                        </h4>
                        <div className="bg-bg border border-border rounded-xl p-4 relative group">
                          <p className="text-sm text-text-muted leading-relaxed">{adaptedContent.script}</p>
                          <button className="absolute top-2 right-2 p-2 bg-surface border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Strategy */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                          <Target size={14} /> Funnel Strategy
                        </h4>
                        <div className="bg-bg border border-border rounded-xl p-4">
                          <p className="text-sm font-medium" style={{ color: activeExpert.brandColor }}>{adaptedContent.funnelStrategy}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                          <Layers size={14} /> Structural Breakdown
                        </h4>
                        <div className="bg-bg border border-border rounded-xl p-4 space-y-3">
                          {adaptedContent.structuralBreakdown.map((step: any, idx: number) => (
                            <div key={idx} className="flex gap-3">
                              <div className="w-6 h-6 shrink-0 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-bold text-text-muted">
                                {idx + 1}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-text-main mb-0.5">{step.phase}</div>
                                <div className="text-[10px] text-text-muted">{step.detail}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button className="flex-1 bg-bg border border-border hover:bg-white/5 py-3 rounded-xl text-sm font-bold transition-colors">
                      Regenerate Options
                    </button>
                    <button className="flex-[2] py-3 rounded-xl text-sm font-bold transition-colors text-white flex items-center justify-center gap-2 hover:brightness-110" style={{ backgroundColor: activeExpert.brandColor }}>
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
