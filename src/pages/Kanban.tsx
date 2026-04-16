import { Plus, MoreHorizontal, AlignLeft, Brain } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';

export function Kanban() {
  const { activeExpert } = useExpertStore();

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const columns = [
    { id: 'backlog', title: 'Backlog', count: 12 },
    { id: 'research', title: 'Research', count: 3 },
    { id: 'production', title: 'In Production', count: 2 },
    { id: 'review', title: 'Review', count: 4 },
    { id: 'approved', title: 'Approved', count: 1 },
  ];

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="font-serif text-2xl mb-1">Kanban Flow</h1>
          <p className="text-text-muted text-sm">Track content production stages for <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}</span>.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map(col => (
            <div key={col.id} className="w-[320px] flex flex-col h-full bg-surface/50 border border-border rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm">{col.title}</h3>
                  <span className="bg-bg text-text-muted text-xs px-2 py-0.5 rounded-full">{col.count}</span>
                </div>
                <button className="text-text-muted hover:text-text-main transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {/* Mock Card 1 */}
                <div className="bg-surface border border-border rounded-xl p-4 cursor-grab hover:border-primary/50 transition-colors shadow-sm">
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider bg-purple-500/10 text-purple-400 px-2 py-1 rounded">LinkedIn</span>
                    <span className="text-[10px] uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Carousel</span>
                  </div>
                  <h4 className="text-sm font-medium mb-2">The Invisible Architecture of HNW Portfolios</h4>
                  <div className="flex items-center gap-3 text-xs text-text-muted mt-4">
                    <div className="flex items-center gap-1"><AlignLeft size={14} /> 3</div>
                    <div className="ml-auto flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-500 border-2 border-surface flex items-center justify-center text-[8px] font-bold text-white">OP</div>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 border-2 border-surface flex items-center justify-center text-[8px] font-bold text-white">CA</div>
                    </div>
                  </div>
                </div>

                {/* Mock Card 2 (only in some columns for variety) */}
                {col.id === 'production' && (
                  <div className="bg-surface border border-border rounded-xl p-4 cursor-grab hover:border-primary/50 transition-colors shadow-sm">
                    <div className="flex gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-wider bg-pink-500/10 text-pink-400 px-2 py-1 rounded">Instagram</span>
                      <span className="text-[10px] uppercase tracking-wider bg-orange-500/10 text-orange-400 px-2 py-1 rounded">Reel</span>
                    </div>
                    <h4 className="text-sm font-medium mb-2">Why 2025 Real Estate is About Scarcity</h4>
                    <div className="flex items-center gap-3 text-xs text-text-muted mt-4">
                      <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
                        <Brain size={12} />
                        <span>Visual Director working...</span>
                      </div>
                      <div className="ml-auto w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-surface flex items-center justify-center text-[8px] font-bold text-white">VD</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
