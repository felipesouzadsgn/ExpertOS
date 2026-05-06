import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Wand2, Brain } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';

export function Calendar() {
  const { activeExpert } = useExpertStore();
  const { getAgentsByExpert } = useAgentStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<number[]>([]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days grid

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const expertAgents = getAgentsByExpert(activeExpert.id);
  const orchestrator = expertAgents.find(a => a.role.includes('Strategy') || a.role.includes('Orchestrator')) || { name: 'Orchestrator Prime' };

  const handleAutoFill = () => {
    setIsGenerating(true);
    // Simulate Orchestrator analyzing and generating a strategy
    setTimeout(() => {
      setIsGenerating(false);
      // Randomly populate some days
      setGeneratedPosts([2, 5, 8, 11, 14, 19, 22, 26, 29]);
    }, 3000);
  };

  return (
    <div className="p-8 h-full flex flex-col text-text-main">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-2xl mb-1">Editorial Calendar</h1>
          <p className="text-text-muted text-sm">Schedule and manage content pipeline for <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}</span>.</p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
            <button className="p-1 hover:bg-white/5 rounded transition-colors"><ChevronLeft size={18} /></button>
            <span className="text-sm font-medium px-2">October 2025</span>
            <button className="p-1 hover:bg-white/5 rounded transition-colors"><ChevronRight size={18} /></button>
          </div>
          
          <button 
            onClick={handleAutoFill}
            disabled={isGenerating}
            className="bg-surface border border-border hover:bg-white/5 text-text-main px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isGenerating ? <Brain size={16} className="animate-pulse text-primary" /> : <Wand2 size={16} className="text-primary" />}
            {isGenerating ? `${orchestrator.name} is planning...` : 'Auto-Fill Strategy'}
          </button>

          <button className="text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors hover:brightness-110 w-full sm:w-auto justify-center" style={{ backgroundColor: activeExpert.brandColor }}>
            <Plus size={16} />
            Schedule
          </button>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-2xl overflow-hidden flex flex-col relative">
        {isGenerating && (
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4 shadow-2xl">
              <Brain size={32} className="text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-serif mb-2">{orchestrator.name} is analyzing context...</h3>
            <p className="text-sm text-text-muted max-w-sm text-center">
              Reviewing {activeExpert.name}'s ICP, recent market trends, and brand guidelines to generate an optimal 30-day content mix.
            </p>
          </div>
        )}

        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-border bg-bg/50">
          {days.map(day => (
            <div key={day} className="p-1 sm:p-3 text-center text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
          {dates.map((date, i) => {
            const isToday = date === 15;
            const hasManualPost = date === 12 || date === 15 || date === 18 || date === 24;
            const hasGeneratedPost = generatedPosts.includes(date);
            const hasPost = hasManualPost || hasGeneratedPost;
            
            return (
              <div 
                key={i} 
                className={`border-r border-b border-border p-1 sm:p-2 min-h-[60px] sm:min-h-[100px] transition-colors hover:bg-white/[0.02] ${
                  (i + 1) % 7 === 0 ? 'border-r-0' : ''
                } ${i >= 28 ? 'border-b-0' : ''}`}
              >
                <div className={`text-[10px] sm:text-xs font-medium w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full mb-1 sm:mb-2 ${
                  isToday ? 'text-white' : 'text-text-muted'
                }`} style={{ backgroundColor: isToday ? activeExpert.brandColor : 'transparent' }}>
                  {date > 31 ? date - 31 : date}
                </div>
                
                {hasPost && (
                  <div className="space-y-1">
                    {hasManualPost && date === 15 && (
                      <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] p-1.5 rounded truncate cursor-pointer hover:bg-blue-500/20 transition-colors">
                        LI: The Scarcity Premium
                      </div>
                    )}
                    {hasManualPost && (date === 12 || date === 18) && (
                      <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] p-1.5 rounded truncate cursor-pointer hover:bg-purple-500/20 transition-colors">
                        IG: Market Update Reel
                      </div>
                    )}
                    {hasManualPost && date === 24 && (
                      <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] p-1.5 rounded truncate cursor-pointer hover:bg-green-500/20 transition-colors">
                        News: Q4 Predictions
                      </div>
                    )}
                    
                    {/* AI Generated Posts */}
                    {hasGeneratedPost && (
                      <div className="bg-primary/10 border border-primary/20 text-primary text-[10px] p-1.5 rounded cursor-pointer hover:bg-primary/20 transition-colors flex flex-col gap-1">
                        <div className="flex items-center gap-1 font-bold">
                          <Wand2 size={10} /> AI Strategy
                        </div>
                        <div className="truncate opacity-80">
                          {date % 2 === 0 ? 'Authority Builder (LI)' : 'Engagement Hook (IG)'}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
