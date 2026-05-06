import { useState } from 'react';
import { Settings2, Activity, Play, Square, Brain, Wrench, ListTodo, ChevronRight, ArrowLeft, X, Plus } from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore, Agent } from '@/store/agentStore';

export function Agents() {
  const { activeExpert } = useExpertStore();
  const { getAgentsByExpert, addAgent, updateAgent } = useAgentStore();
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  
  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    description: '',
    model: 'Gemini 1.5 Pro',
    systemPrompt: '',
    tools: [] as string[]
  });
  const [newTool, setNewTool] = useState('');
  const [newExistingTool, setNewExistingTool] = useState('');
  const [isAddingToolToExisting, setIsAddingToolToExisting] = useState(false);

  const handleCreateAgent = () => {
    if (!newAgent.name || !newAgent.role || !newAgent.systemPrompt) return;
    
    addAgent({
      expertId: activeExpert.id,
      ...newAgent
    });

    setIsCreatingAgent(false);
    setNewAgent({
      name: '',
      role: '',
      description: '',
      model: 'Gemini 1.5 Pro',
      systemPrompt: '',
      tools: []
    });
  };

  const handleAddTool = () => {
    if (newTool.trim() && !newAgent.tools.includes(newTool.trim())) {
      setNewAgent(prev => ({ ...prev, tools: [...prev.tools, newTool.trim()] }));
      setNewTool('');
    }
  };

  const handleRemoveTool = (toolToRemove: string) => {
    setNewAgent(prev => ({ ...prev, tools: prev.tools.filter(t => t !== toolToRemove) }));
  };

  const handleAddToolToExisting = () => {
    if (newExistingTool.trim() && selectedAgent && !selectedAgent.tools.includes(newExistingTool.trim())) {
      updateAgent({
        ...selectedAgent,
        tools: [...selectedAgent.tools, newExistingTool.trim()]
      });
      setNewExistingTool('');
      setIsAddingToolToExisting(false);
    }
  };

  const handleRemoveToolFromExisting = (toolToRemove: string) => {
    if (selectedAgent) {
      updateAgent({
        ...selectedAgent,
        tools: selectedAgent.tools.filter(t => t !== toolToRemove)
      });
    }
  };

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const agents = getAgentsByExpert(activeExpert.id);
  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  if (isCreatingAgent) {
    return (
      <div className="p-8 h-full flex flex-col overflow-auto text-text-main relative custom-scrollbar">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setIsCreatingAgent(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-serif text-2xl mb-1">Create Specialized Agent</h1>
              <p className="text-text-muted text-sm">Design a new AI agent tailored to {activeExpert.name}'s ecosystem.</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Agent Name</label>
                  <input
                    type="text"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    className="w-full bg-bg border border-border rounded-lg px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    placeholder="e.g. Content Architect"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Role</label>
                  <input
                    type="text"
                    value={newAgent.role}
                    onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                    className="w-full bg-bg border border-border rounded-lg px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    placeholder="e.g. Lead Copywriter"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">AI Model</label>
                  <select
                    value={newAgent.model}
                    onChange={(e) => setNewAgent({ ...newAgent, model: e.target.value })}
                    className="w-full bg-bg border border-border rounded-lg px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Gemini 1.5 Pro">Gemini 1.5 Pro (Reasoning & Complex Tasks)</option>
                    <option value="Gemini 1.5 Flash">Gemini 1.5 Flash (Speed & High Volume)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Description</label>
                  <textarea
                    value={newAgent.description}
                    onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                    className="w-full bg-bg border border-border rounded-lg px-4 py-2 text-sm focus:border-primary focus:outline-none h-[116px] resize-none"
                    placeholder="Briefly describe what this agent does..."
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">System Prompt & Directives</label>
              <textarea
                value={newAgent.systemPrompt}
                onChange={(e) => setNewAgent({ ...newAgent, systemPrompt: e.target.value })}
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none h-48 font-mono resize-none custom-scrollbar"
                placeholder="You are a specialized agent for... CORE DIRECTIVES: ..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Available Tools</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTool()}
                  className="flex-1 bg-bg border border-border rounded-lg px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  placeholder="e.g. Web Search, Data Analytics..."
                />
                <button
                  onClick={handleAddTool}
                  className="bg-white/5 hover:bg-white/10 border border-border rounded-lg px-4 py-2 flex items-center justify-center transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newAgent.tools.map((tool, idx) => (
                  <span key={idx} className="bg-bg border border-border text-text-main px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                    <Settings2 size={14} className="text-text-muted" />
                    {tool}
                    <button onClick={() => handleRemoveTool(tool)} className="text-text-muted hover:text-red-400 ml-1">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {newAgent.tools.length === 0 && (
                  <span className="text-sm text-text-muted italic">No tools added yet.</span>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border mt-6">
              <button
                onClick={() => setIsCreatingAgent(false)}
                className="px-6 py-2 rounded-lg text-sm font-medium border border-border hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAgent}
                disabled={!newAgent.name || !newAgent.role || !newAgent.systemPrompt}
                className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: activeExpert.brandColor }}
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedAgent) {
    return (
      <div className="p-8 h-full flex flex-col overflow-auto text-text-main">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <button onClick={() => setSelectedAgentId(null)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-2xl mb-1" style={{ color: activeExpert.brandColor }}>{selectedAgent.name}</h1>
                <span className="text-[10px] uppercase tracking-wider bg-white/5 text-text-muted px-2 py-0.5 rounded border border-border">
                  {selectedAgent.role}
                </span>
              </div>
              <p className="text-text-muted text-sm">Agent Configuration & Tasks for {activeExpert.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Config */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="bg-surface border border-border rounded-xl p-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                  <Brain size={14} /> System Prompt & Core Directives
                </h2>
                <div className="bg-bg border border-border rounded-lg p-4 font-mono text-sm text-text-main leading-relaxed whitespace-pre-wrap">
                  {selectedAgent.systemPrompt}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] uppercase font-bold text-text-muted">AI Model</label>
                    <select className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none" defaultValue={selectedAgent.model}>
                      <option value="Gemini 1.5 Pro">Gemini 1.5 Pro (Reasoning & Complex Tasks)</option>
                      <option value="Gemini 1.5 Flash">Gemini 1.5 Flash (Speed & High Volume)</option>
                    </select>
                  </div>
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] uppercase font-bold text-text-muted">Status</label>
                    <div className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm flex items-center gap-2 capitalize">
                      <div className={`w-2 h-2 rounded-full ${selectedAgent.color}`}></div>
                      {selectedAgent.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                  <Wrench size={14} /> Equipped Tools & Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.tools.map((tool, idx) => (
                    <span key={idx} className="bg-bg border border-border text-text-main px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                      <Settings2 size={14} className="text-text-muted" />
                      {tool}
                      <button onClick={() => handleRemoveToolFromExisting(tool)} className="text-text-muted hover:text-red-400 ml-1 transition-colors">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  
                  {isAddingToolToExisting ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={newExistingTool}
                        onChange={(e) => setNewExistingTool(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddToolToExisting()}
                        className="bg-bg border border-border rounded-lg px-3 py-1.5 text-sm focus:border-primary focus:outline-none w-48"
                        placeholder="Tool name..."
                        autoFocus
                      />
                      <button onClick={handleAddToolToExisting} className="bg-white/5 border border-border hover:bg-white/10 text-text-main px-2 py-1.5 rounded-lg transition-colors">
                        <Plus size={16} />
                      </button>
                      <button onClick={() => { setIsAddingToolToExisting(false); setNewExistingTool(''); }} className="bg-white/5 border border-border hover:bg-white/10 text-text-main px-2 py-1.5 rounded-lg transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsAddingToolToExisting(true)}
                      className="bg-white/5 border border-dashed border-border hover:border-primary/50 text-text-muted hover:text-text-main px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <Plus size={14} /> Add Tool
                    </button>
                  )}
                  {selectedAgent.tools.length === 0 && !isAddingToolToExisting && (
                    <span className="text-sm text-text-muted italic ml-2 mt-1.5">No tools equipped.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Tasks */}
            <div className="col-span-1 space-y-6">
              <div className="bg-surface border border-border rounded-xl p-6 h-full">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                  <ListTodo size={14} /> Current Tasks
                </h2>
                
                {selectedAgent.tasks.length === 0 ? (
                  <div className="text-center py-8 text-text-muted text-sm">
                    No active tasks.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedAgent.tasks.map(task => (
                      <div key={task.id} className="bg-bg border border-border rounded-lg p-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-sm font-medium">{task.title}</h4>
                          <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            task.status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-500' :
                            task.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                            'bg-white/5 text-text-muted'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-text-muted">
                          Created: {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col overflow-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-serif text-2xl mb-1">Specialized Agents</h1>
            <p className="text-text-muted text-sm">Manage the AI workforce dedicated to <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}</span>.</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-surface border border-border hover:bg-white/5 text-text-main px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Activity size={16} />
              View System Logs
            </button>
            <button 
              onClick={() => setIsCreatingAgent(true)}
              className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:brightness-110" 
              style={{ backgroundColor: activeExpert.brandColor }}
            >
              + Create Agent
            </button>
          </div>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-border rounded-2xl">
            <Brain size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-text-main mb-2">No Agents Configured</h3>
            <p className="text-text-muted text-sm max-w-md mx-auto">
              This expert doesn't have any specialized agents yet. Create agents to automate tasks, generate content, and analyze data based on their specific context.
            </p>
            <button 
              onClick={() => setIsCreatingAgent(true)}
              className="mt-6 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all"
            >
              Create First Agent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                onClick={() => setSelectedAgentId(agent.id)}
                className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-6 hover:border-primary/30 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center shrink-0 relative">
                  {agent.status === 'busy' && (
                    <div className="absolute inset-0 rounded-xl border border-yellow-500/50 animate-ping"></div>
                  )}
                  <div className={`w-3 h-3 rounded-full ${agent.color} shadow-[0_0_10px_currentColor] ${agent.status === 'busy' ? 'animate-pulse' : ''}`}></div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-lg font-semibold text-text-main">{agent.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider bg-white/5 text-text-muted px-2 py-0.5 rounded border border-border">
                      {agent.role}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">{agent.description}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden md:block">
                    <div className="text-xs text-text-main font-medium">{agent.model}</div>
                    <div className="text-[10px] text-text-muted">{agent.tasks.length} active tasks</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {agent.status === 'idle' ? (
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-main transition-colors" title="Start Agent" onClick={(e) => e.stopPropagation()}>
                        <Play size={18} />
                      </button>
                    ) : (
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-main transition-colors" title="Stop Agent" onClick={(e) => e.stopPropagation()}>
                        <Square size={18} />
                      </button>
                    )}
                    <ChevronRight size={20} className="text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
