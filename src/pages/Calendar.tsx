import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export function Calendar() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days grid

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-2xl mb-1">Editorial Calendar</h1>
          <p className="text-text-muted text-sm">Schedule and manage your content pipeline.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
            <button className="p-1 hover:bg-white/5 rounded transition-colors"><ChevronLeft size={18} /></button>
            <span className="text-sm font-medium px-2">October 2025</span>
            <button className="p-1 hover:bg-white/5 rounded transition-colors"><ChevronRight size={18} /></button>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={16} />
            Schedule
          </button>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-border bg-bg/50">
          {days.map(day => (
            <div key={day} className="p-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
          {dates.map((date, i) => {
            const isToday = date === 15;
            const hasPost = date === 12 || date === 15 || date === 18 || date === 24;
            
            return (
              <div 
                key={i} 
                className={`border-r border-b border-border p-2 min-h-[100px] transition-colors hover:bg-white/[0.02] ${
                  (i + 1) % 7 === 0 ? 'border-r-0' : ''
                } ${i >= 28 ? 'border-b-0' : ''}`}
              >
                <div className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mb-2 ${
                  isToday ? 'bg-primary text-white' : 'text-text-muted'
                }`}>
                  {date > 31 ? date - 31 : date}
                </div>
                
                {hasPost && (
                  <div className="space-y-1">
                    {date === 15 && (
                      <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] p-1.5 rounded truncate cursor-pointer hover:bg-blue-500/20 transition-colors">
                        LI: The Scarcity Premium
                      </div>
                    )}
                    {(date === 12 || date === 18) && (
                      <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] p-1.5 rounded truncate cursor-pointer hover:bg-purple-500/20 transition-colors">
                        IG: Market Update Reel
                      </div>
                    )}
                    {date === 24 && (
                      <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] p-1.5 rounded truncate cursor-pointer hover:bg-green-500/20 transition-colors">
                        News: Q4 Predictions
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
