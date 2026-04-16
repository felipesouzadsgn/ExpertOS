import { useState } from 'react';
import { Plus, MoreHorizontal, AlignLeft, Brain, ShieldAlert, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';

type Task = {
  id: string;
  title: string;
  platform: string;
  format: string;
  status: 'backlog' | 'research' | 'production' | 'review' | 'approved';
  aiStatus?: 'checking' | 'approved' | 'rejected';
  aiFeedback?: string;
  agents: string[];
};

export function Kanban() {
  const { activeExpert } = useExpertStore();
  const { getAgentsByExpert } = useAgentStore();

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'The Invisible Architecture of HNW Portfolios',
      platform: 'LinkedIn',
      format: 'Carousel',
      status: 'production',
      agents: ['OP', 'CA']
    },
    {
      id: '2',
      title: 'Why 2025 Real Estate is About Scarcity',
      platform: 'Instagram',
      format: 'Reel',
      status: 'production',
      agents: ['VD']
    }
  ]);

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const expertAgents = getAgentsByExpert(activeExpert.id);
  const qaAgent = expertAgents.find(a => a.role.includes('Tone') || a.role.includes('Copy')) || { name: 'Brand QA Agent', color: 'bg-yellow-500' };

  const columns = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'research', title: 'Research' },
    { id: 'production', title: 'In Production' },
    { id: 'review', title: 'Review' },
    { id: 'approved', title: 'Approved' },
  ] as const;

  const moveTaskToReview = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, status: 'review', aiStatus: 'checking' } 
        : t
    ));

    // Simulate AI QA Process
    setTimeout(() => {
      setTasks(prev => prev.map(t => {
        if (t.id === taskId) {
          // Simulate 50/50 pass/fail for demo purposes
          const passed = Math.random() > 0.5;
          if (passed) {
            return { 
              ...t, 
              status: 'approved', 
              aiStatus: 'approved',
              aiFeedback: `Identity Locked: Tone matches ${activeExpert.name}'s guidelines perfectly.`
            };
          } else {
            return { 
              ...t, 
              status: 'production', 
              aiStatus: 'rejected',
              aiFeedback: `Rejected by ${qaAgent.name}: The tone is too generic. It needs to sound more like ${activeExpert.name} targeting ${activeExpert.icp?.split(',')[0] || 'the audience'}.`
            };
          }
        }
        return t;
      }));
    }, 3000);
  };

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden text-text-main">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
          <h1 className="font-serif text-2xl mb-1">Kanban Flow</h1>
          <p className="text-text-muted text-sm">Track content production stages for <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}</span>.</p>
        </div>
        <button className="text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors hover:brightness-110" style={{ backgroundColor: activeExpert.brandColor }}>
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map(col => {
            const columnTasks = tasks.filter(t => t.status === col.id);
            
            return (
              <div key={col.id} className="w-[320px] flex flex-col h-full bg-surface/50 border border-border rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{col.title}</h3>
                    <span className="bg-bg text-text-muted text-xs px-2 py-0.5 rounded-full">{columnTasks.length}</span>
                  </div>
                  <button className="text-text-muted hover:text-text-main transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                  {columnTasks.map(task => (
                    <div key={task.id} className="bg-surface border border-border rounded-xl p-4 shadow-sm flex flex-col group">
                      <div className="flex gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-wider bg-white/5 text-text-muted px-2 py-1 rounded border border-border">{task.platform}</span>
                        <span className="text-[10px] uppercase tracking-wider bg-white/5 text-text-muted px-2 py-1 rounded border border-border">{task.format}</span>
                      </div>
                      <h4 className="text-sm font-medium mb-3">{task.title}</h4>
                      
                      {/* AI QA Status Indicators */}
                      {task.aiStatus === 'checking' && (
                        <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
                          <Brain size={14} className="text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
                          <span className="text-xs text-yellow-500 leading-tight">{qaAgent.name} is verifying brand adherence...</span>
                        </div>
                      )}
                      {task.aiStatus === 'rejected' && (
                        <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                          <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-red-400 leading-tight">{task.aiFeedback}</span>
                        </div>
                      )}
                      {task.aiStatus === 'approved' && (
                        <div className="mb-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-green-400 leading-tight">{task.aiFeedback}</span>
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1"><AlignLeft size={14} /></div>
                        
                        <div className="flex items-center gap-2">
                          {col.id === 'production' && (
                            <button 
                              onClick={() => moveTaskToReview(task.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-primary hover:text-primary/80"
                            >
                              Send to QA <ArrowRight size={12} />
                            </button>
                          )}
                          <div className="flex -space-x-2">
                            {task.agents.map((agentInitials, idx) => (
                              <div key={idx} className="w-6 h-6 rounded-full bg-bg border-2 border-surface flex items-center justify-center text-[8px] font-bold text-text-muted">
                                {agentInitials}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
