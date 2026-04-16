import { Settings2, Activity, Play, Square } from 'lucide-react';

export function Agents() {
  const agents = [
    { name: 'Orchestrator Prime', role: 'Task Routing & Strategy', status: 'active', color: 'bg-green-500', desc: 'Analyzes incoming requests and delegates to specialized agents.' },
    { name: 'The Copy Architect', role: 'Writing & Tone', status: 'active', color: 'bg-green-500', desc: 'Ensures all generated text strictly adheres to the Expert\'s tone of voice.' },
    { name: 'Trend Sentinel', role: 'Research & Scraping', status: 'active', color: 'bg-green-500', desc: 'Continuously monitors market trends and competitor content.' },
    { name: 'Visual Director', role: 'Image & Layout', status: 'busy', color: 'bg-yellow-500', desc: 'Generates image prompts and structures visual carousels.' },
    { name: 'SEO Optimizer', role: 'Search Ranking', status: 'idle', color: 'bg-text-muted', desc: 'Optimizes blog posts and long-form content for search engines.' },
  ];

  return (
    <div className="p-8 h-full flex flex-col overflow-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-2xl mb-1">Specialized Agents</h1>
            <p className="text-text-muted text-sm">Manage the AI workforce dedicated to your Expert.</p>
          </div>
          <button className="bg-surface border border-border hover:bg-white/5 text-text-main px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Activity size={16} />
            View System Logs
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {agents.map((agent, i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-6 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center shrink-0 relative">
                {agent.status === 'busy' && (
                  <div className="absolute inset-0 rounded-xl border border-yellow-500/50 animate-ping"></div>
                )}
                <div className={`w-3 h-3 rounded-full ${agent.color} shadow-[0_0_10px_currentColor] ${agent.status === 'busy' ? 'animate-pulse' : ''}`}></div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-serif text-lg font-semibold">{agent.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider bg-white/5 text-text-muted px-2 py-0.5 rounded">
                    {agent.role}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{agent.desc}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {agent.status === 'idle' ? (
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-main transition-colors" title="Start Agent">
                    <Play size={18} />
                  </button>
                ) : (
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-main transition-colors" title="Stop Agent">
                    <Square size={18} />
                  </button>
                )}
                <button className="p-2 border border-border hover:bg-white/5 rounded-lg text-text-muted hover:text-text-main transition-colors">
                  <Settings2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
