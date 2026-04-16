import { FileText, Image as ImageIcon, Video, CheckCircle2, Clock, Brain } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';

export function Dashboard() {
  const { activeExpert } = useExpertStore();
  const { getAgentsByExpert } = useAgentStore();

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const agents = getAgentsByExpert(activeExpert.id);

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full text-text-main">
      {/* Main Column */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Context Readiness Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" style={{ backgroundColor: `${activeExpert.brandColor}1A` }}></div>
          
          <div className="font-serif text-lg mb-6 flex justify-between items-center relative z-10">
            <span style={{ color: activeExpert.brandColor }}>{activeExpert.name}'s</span> Context Readiness
            <span className="font-sans text-[11px] uppercase tracking-wider px-2 py-1 rounded border" style={{ backgroundColor: `${activeExpert.brandColor}1A`, color: activeExpert.brandColor, borderColor: `${activeExpert.brandColor}33` }}>
              98% Aligned
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 relative z-10">
            <div className="border-r border-border">
              <span className="text-2xl font-bold block">{activeExpert.archetypes}</span>
              <span className="text-xs text-text-muted">Core Archetypes</span>
            </div>
            <div className="border-r border-border pl-4">
              <span className="text-2xl font-bold block">{activeExpert.tokens}</span>
              <span className="text-xs text-text-muted">Tokens Indexed</span>
            </div>
            <div className="pl-4">
              <span className="text-2xl font-bold block">22</span>
              <span className="text-xs text-text-muted">Target Personas</span>
            </div>
          </div>
        </div>

        {/* Active Content Studio */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg">Active Content Studio</h3>
          
          <div className="bg-[#1c1c1f] border border-border rounded-xl overflow-hidden flex h-[180px] group hover:border-primary/30 transition-colors">
            <div className="w-[180px] bg-border flex items-center justify-center text-[#3f3f46] text-4xl group-hover:text-primary/40 transition-colors">
              <ImageIcon size={48} strokeWidth={1} />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: activeExpert.brandColor }}>Carousel Series</div>
              <div className="text-base font-semibold mb-2">The Invisible Architecture of High-Net-Worth Portfolios</div>
              <p className="text-[13px] text-text-muted leading-relaxed flex-1">
                A 10-slide breakdown using {activeExpert.name}'s '{activeExpert.toneOfVoice?.split(',')[0] || 'unique'}' tone of voice, targeting {activeExpert.icp?.split(',')[0] || 'their audience'}.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="text-[11px] uppercase tracking-wider bg-green-500/10 text-green-500 px-2 py-1 rounded flex items-center gap-1">
                  <CheckCircle2 size={12} /> Approved
                </span>
                <span className="text-[11px] uppercase tracking-wider bg-border text-text-muted px-2 py-1 rounded flex items-center gap-1">
                  <Clock size={12} /> Scheduled: Oct 24
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#1c1c1f] border border-border rounded-xl overflow-hidden flex h-[180px] group hover:border-primary/30 transition-colors">
            <div className="w-[180px] bg-border flex items-center justify-center text-[#3f3f46] text-4xl group-hover:text-primary/40 transition-colors">
              <Video size={48} strokeWidth={1} />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: activeExpert.brandColor }}>Video Script</div>
              <div className="text-base font-semibold mb-2">Why 2025 Real Estate is About Scarcity, Not Square Footage</div>
              <p className="text-[13px] text-text-muted leading-relaxed flex-1">
                90-second vertical script with visual hooks optimized for {activeExpert.name}'s persona.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="text-[11px] uppercase tracking-wider text-white px-2 py-1 rounded animate-pulse" style={{ backgroundColor: activeExpert.brandColor }}>
                  Refining Tone...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Column */}
      <div className="flex flex-col gap-4">
        <h3 className="font-serif text-base mb-1">Specialized Agents</h3>
        
        {agents.length === 0 ? (
          <div className="text-center py-8 bg-surface border border-border rounded-xl">
            <Brain size={32} className="mx-auto text-text-muted mb-2 opacity-20" />
            <p className="text-text-muted text-xs">No agents configured for this expert.</p>
          </div>
        ) : (
          agents.map(agent => (
            <div key={agent.id} className="bg-white/5 border border-border p-3 rounded-xl flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${agent.status === 'busy' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-pulse' : agent.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-500'}`}></div>
              <div>
                <h4 className="text-[13px] font-semibold">{agent.name}</h4>
                <p className="text-[11px] text-text-muted">{agent.status === 'busy' ? 'Working on tasks...' : 'Ready for tasks'}</p>
              </div>
            </div>
          ))
        )}

        <div className="bg-surface border border-border rounded-2xl p-5 mt-2 flex-1">
          <div className="text-sm font-semibold mb-3">Knowledge Base</div>
          <div className="space-y-1">
            <div className="flex justify-between items-center py-2 border-b border-border text-[13px]">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-text-muted" />
                <span>Brand_Manifesto.pdf</span>
              </div>
              <span className="text-text-muted text-xs">12kb</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border text-[13px]">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-text-muted" />
                <span>Q3_Market_Report.doc</span>
              </div>
              <span className="text-text-muted text-xs">1.4mb</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border text-[13px]">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-text-muted" />
                <span>ICP_Analysis_Luxury.csv</span>
              </div>
              <span className="text-text-muted text-xs">45kb</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
