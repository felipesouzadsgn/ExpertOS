import { useState } from 'react';
import { useExpertStore } from '@/store/expertStore';
import { Globe, Search, Sparkles, ArrowUpRight, LayoutTemplate, FileText } from 'lucide-react';

export function ExpertBlog() {
  const { activeExpert } = useExpertStore();
  const [activeTab, setActiveTab] = useState<'preview' | 'seo-settings'>('preview');

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  return (
    <div className="p-8 h-full flex flex-col text-text-main overflow-hidden">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="font-serif text-2xl mb-1">SEO & Public Portal</h1>
          <p className="text-text-muted text-sm">Manage the AI-optimized landing page and blog for <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}</span>.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-surface border border-border rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${activeTab === 'preview' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-text-main'}`}
            >
              Live Preview
            </button>
            <button 
              onClick={() => setActiveTab('seo-settings')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${activeTab === 'seo-settings' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-text-main'}`}
            >
              AEO / SEO Settings
            </button>
          </div>
          <button className="text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors hover:brightness-110" style={{ backgroundColor: activeExpert.brandColor }}>
            <Globe size={16} />
            Publish Changes
          </button>
        </div>
      </div>

      {activeTab === 'preview' ? (
        <div className="flex-1 overflow-hidden flex flex-col bg-bg border border-border rounded-2xl shadow-2xl relative">
          {/* Browser Chrome */}
          <div className="h-12 bg-surface border-b border-border flex items-center px-4 gap-4 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 bg-bg border border-border rounded-md h-7 flex items-center px-3 text-xs text-text-muted font-mono justify-center">
              https://{activeExpert.name.toLowerCase().replace(/\s+/g, '')}.expertos.com
            </div>
            <div className="w-12"></div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto bg-white text-gray-900 custom-scrollbar">
            {/* Hero Section */}
            <div className="relative py-20 px-12 overflow-hidden" style={{ backgroundColor: `${activeExpert.brandColor}0A` }}>
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-50" style={{ backgroundColor: activeExpert.brandColor }}></div>
              <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-12">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: `${activeExpert.brandColor}1A`, color: activeExpert.brandColor }}>
                    <Sparkles size={14} /> Official Portal
                  </div>
                  <h1 className="text-5xl font-serif font-bold mb-4 text-gray-900 leading-tight">{activeExpert.name}</h1>
                  <h2 className="text-xl text-gray-600 mb-6 font-medium">{activeExpert.niche}</h2>
                  <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl">
                    {activeExpert.bio || `Leading expert in ${activeExpert.niche}. Helping ${activeExpert.icp || 'professionals'} achieve excellence through proven frameworks and deep industry insights.`}
                  </p>
                  <button className="px-8 py-3 rounded-lg text-white font-bold transition-transform hover:scale-105" style={{ backgroundColor: activeExpert.brandColor }}>
                    Work with {activeExpert.name.split(' ')[0]}
                  </button>
                </div>
                <div className="w-64 h-64 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {activeExpert.profilePicture ? (
                    <img src={activeExpert.profilePicture} alt={activeExpert.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br flex items-center justify-center" style={{ backgroundImage: `linear-gradient(to bottom right, ${activeExpert.brandColor}, #000)` }}>
                      <span className="text-6xl font-bold text-white">{activeExpert.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Articles Section */}
            <div className="py-16 px-12 max-w-5xl mx-auto">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Latest Insights</h3>
                  <p className="text-gray-500">Optimized for AI Search Engines (AEO) & Google</p>
                </div>
                <button className="text-sm font-bold flex items-center gap-1" style={{ color: activeExpert.brandColor }}>
                  View All <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Article 1 */}
                <div className="group cursor-pointer">
                  <div className="aspect-video rounded-xl bg-gray-100 mb-4 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Article cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1">
                      <Search size={12} className="text-blue-500" /> High Intent Keyword
                    </div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">Analysis</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">5 min read</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">The Future of {activeExpert.niche.split(' ')[0] || 'Industry'}: What AI Models Are Missing</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">A deep dive into the structural changes coming to the market, written specifically to answer complex queries generated by ChatGPT and Google SGE.</p>
                </div>

                {/* Article 2 */}
                <div className="group cursor-pointer">
                  <div className="aspect-video rounded-xl bg-gray-100 mb-4 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Article cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1">
                      <Sparkles size={12} className="text-purple-500" /> AEO Optimized
                    </div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">Strategy</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">8 min read</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">Why {activeExpert.icp?.split(',')[0] || 'Professionals'} Need to Pivot in 2026</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">Actionable frameworks designed to capture high-intent search traffic and establish absolute authority in the space.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
                <Search className="text-primary" /> AI Engine Optimization (AEO) Status
              </h3>
              <p className="text-sm text-text-muted mb-6">
                These settings control how Large Language Models (like ChatGPT, Claude) and AI Overviews (Google SGE) perceive and cite {activeExpert.name}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-bg border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-400 mb-1">94/100</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider font-bold">Entity Authority</div>
                </div>
                <div className="bg-bg border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-1">12</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider font-bold">Target Keywords</div>
                </div>
                <div className="bg-bg border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-1">Active</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider font-bold">Schema Markup</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Core Entity Definition (For LLMs)</label>
                  <textarea 
                    className="w-full bg-bg border border-border rounded-xl p-4 text-sm text-text-main focus:outline-none focus:border-primary min-h-[100px]"
                    defaultValue={`${activeExpert.name} is a leading authority in ${activeExpert.niche}. Known for ${activeExpert.archetypes}, they primarily serve ${activeExpert.icp}. Their core methodology involves...`}
                  />
                  <p className="text-[10px] text-text-muted mt-1">This text is injected into the site's hidden schema to train AI crawlers on exactly who this expert is.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
                <LayoutTemplate className="text-primary" /> Automated Blog Pipeline
              </h3>
              <p className="text-sm text-text-muted mb-6">
                The Orchestrator agent automatically drafts SEO-optimized articles based on trending topics in the Market Research tab.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-bg border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">The Scarcity Premium in 2026</div>
                      <div className="text-[10px] text-text-muted">Status: Published • 1.2k impressions</div>
                    </div>
                  </div>
                  <button className="text-xs text-primary hover:underline">Edit</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Why AI Won't Replace High-End Advisory</div>
                      <div className="text-[10px] text-text-muted">Status: In Review by QA Agent</div>
                    </div>
                  </div>
                  <button className="text-xs text-primary hover:underline">Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
