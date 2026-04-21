import React, { useState, useEffect } from 'react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';
import { 
  Video, Smartphone, Monitor, Mic, Music, Type, LayoutTemplate, Wand2, 
  Play, Scissors, Sparkles, Download, Settings2, CheckCircle2, Bot, 
  Layers, Upload, Image as ImageIcon, Plus, X, ChevronLeft, ChevronRight, 
  ArrowRight, Volume2, VolumeX, FolderOutput
} from 'lucide-react';

interface VideoClip {
  id: string;
  backgroundMedia: string | null;
  mediaType: 'image' | 'video' | null;
  template: 'normal' | 'split-top' | 'split-bottom' | 'pip';
  script: string;
  duration: number;
  transition: 'none' | 'fade' | 'dissolve' | 'slide';
  audioLevel: number;
}

export function VideoStudio() {
  const { activeExpert } = useExpertStore();
  const { getAgentsByExpert } = useAgentStore();
  
  const [format, setFormat] = useState<'9:16' | '16:9'>('9:16');
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState('elevenlabs-1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  
  // Timeline State
  const [clips, setClips] = useState<VideoClip[]>([{
    id: 'clip-1',
    backgroundMedia: null,
    mediaType: null,
    template: 'normal',
    script: '',
    duration: 5,
    transition: 'none',
    audioLevel: 100
  }]);
  const [activeClipId, setActiveClipId] = useState<string>('clip-1');
  
  const activeClipIndex = clips.findIndex(c => c.id === activeClipId);
  const activeClip = clips[activeClipIndex] || clips[0];
  
  // Avatar State
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [manualAvatarUrl, setManualAvatarUrl] = useState<string | null>(null);
  
  const viralTopics = [
    `Why ${activeExpert?.niche.split(' ')[0] || 'Industry'} is changing in 2026`,
    `3 secrets your competitors don't want you to know about ${activeExpert?.niche}`,
    `The exact framework I use for ${activeExpert?.icp?.split(',')[0] || 'clients'}`
  ];

  const expertAgents = activeExpert ? getAgentsByExpert(activeExpert.id) : [];
  const videoAgent = expertAgents.find(a => a.role.includes('Video') || a.role.includes('Director')) || expertAgents[0];
  const videoAvatars = activeExpert?.avatars?.filter(a => a.type === 'video') || [];

  useEffect(() => {
    if (videoAvatars.length > 0 && !selectedAvatarId && !manualAvatarUrl) {
      setSelectedAvatarId(videoAvatars[0].id);
    }
  }, [videoAvatars, selectedAvatarId, manualAvatarUrl]);

  const updateActiveClip = (updates: Partial<VideoClip>) => {
    setClips(clips.map(c => c.id === activeClipId ? { ...c, ...updates } : c));
  };

  const addClip = () => {
    const newClip: VideoClip = {
      id: `clip-${Date.now()}`,
      backgroundMedia: null,
      mediaType: null,
      template: 'normal',
      script: '',
      duration: 5,
      transition: 'none',
      audioLevel: 100
    };
    setClips([...clips, newClip]);
    setActiveClipId(newClip.id);
  };

  const deleteClip = (id: string) => {
    if (clips.length === 1) return;
    const newClips = clips.filter(c => c.id !== id);
    setClips(newClips);
    if (activeClipId === id) {
      setActiveClipId(newClips[0].id);
    }
  };

  const moveClip = (index: number, direction: number) => {
    const newClips = [...clips];
    const temp = newClips[index];
    newClips[index] = newClips[index + direction];
    newClips[index + direction] = temp;
    setClips(newClips);
  };

  const updateClipTransition = (id: string, transition: VideoClip['transition']) => {
    setClips(clips.map(c => c.id === id ? { ...c, transition } : c));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedVideo(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
    }, 5000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateActiveClip({ backgroundMedia: url, mediaType: file.type.startsWith('video/') ? 'video' : 'image' });
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setManualAvatarUrl(url);
      setSelectedAvatarId('manual');
    }
  };

  const removeMedia = () => {
    updateActiveClip({ backgroundMedia: null, mediaType: null });
  };

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const renderMedia = (className: string) => {
    if (!activeClip.backgroundMedia) return null;
    if (activeClip.mediaType === 'video') {
      return <video src={activeClip.backgroundMedia} autoPlay loop muted className={className} />;
    }
    return <img src={activeClip.backgroundMedia} alt="Background Media" className={className} />;
  };

  const currentAvatarUrl = selectedAvatarId === 'manual' 
    ? manualAvatarUrl 
    : videoAvatars.find(a => a.id === selectedAvatarId)?.url;

  const renderAvatarPreview = (className: string = "") => {
    if (currentAvatarUrl) {
      return <img src={currentAvatarUrl} alt="Selected Avatar" className={`object-cover ${className}`} />;
    }
    return <Bot size={32} className={`opacity-50 ${className}`} />;
  };

  return (
    <div className="h-full flex overflow-hidden bg-bg text-text-main">
      {/* Left Sidebar: Configuration */}
      <aside className="w-[340px] bg-surface border-r border-border flex flex-col overflow-y-auto custom-scrollbar shrink-0">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-lg font-serif font-bold mb-1 flex items-center gap-2">
            <Video className="text-primary" size={20} /> Video & Reels AI
          </h2>
          <p className="text-xs text-text-muted">Powered by HeyGen, Veo3 & ElevenLabs</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted flex items-center gap-2">
              <LayoutTemplate size={14} /> Format
            </label>
            <div className="flex gap-2">
              <button 
                onClick={() => setFormat('9:16')}
                className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === '9:16' ? 'bg-primary/10 border-primary text-primary' : 'bg-bg border-border text-text-muted hover:border-text-muted'}`}
              >
                <Smartphone size={20} />
                <span className="text-xs font-bold">Reels / TikTok</span>
                <span className="text-[9px]">9:16</span>
              </button>
              <button 
                onClick={() => setFormat('16:9')}
                className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === '16:9' ? 'bg-primary/10 border-primary text-primary' : 'bg-bg border-border text-text-muted hover:border-text-muted'}`}
              >
                <Monitor size={20} />
                <span className="text-xs font-bold">YouTube / Web</span>
                <span className="text-[9px]">16:9</span>
              </button>
            </div>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted flex items-center gap-2">
              <Layers size={14} /> Layout Template
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => updateActiveClip({ template: 'normal' })}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${activeClip.template === 'normal' ? 'bg-primary/10 border-primary text-primary' : 'bg-bg border-border text-text-muted hover:border-text-muted'}`}
              >
                Full Avatar
              </button>
              <button 
                onClick={() => updateActiveClip({ template: 'split-top' })}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${activeClip.template === 'split-top' ? 'bg-primary/10 border-primary text-primary' : 'bg-bg border-border text-text-muted hover:border-text-muted'}`}
              >
                Split (Video Top)
              </button>
              <button 
                onClick={() => updateActiveClip({ template: 'split-bottom' })}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${activeClip.template === 'split-bottom' ? 'bg-primary/10 border-primary text-primary' : 'bg-bg border-border text-text-muted hover:border-text-muted'}`}
              >
                Split (Video Bottom)
              </button>
              <button 
                onClick={() => updateActiveClip({ template: 'pip' })}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${activeClip.template === 'pip' ? 'bg-primary/10 border-primary text-primary' : 'bg-bg border-border text-text-muted hover:border-text-muted'}`}
              >
                Avatar Corner (PiP)
              </button>
            </div>
          </div>

          {/* B-Roll / Background Upload */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted flex items-center justify-between">
              <span className="flex items-center gap-2"><Upload size={14} /> B-Roll / Background</span>
              {activeClip.backgroundMedia && (
                <button onClick={removeMedia} className="text-red-400 hover:text-red-300">Remove</button>
              )}
            </label>
            <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors relative ${activeClip.backgroundMedia ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {activeClip.backgroundMedia ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded overflow-hidden bg-black border border-border">
                    {renderMedia("w-full h-full object-cover")}
                  </div>
                  <span className="text-[10px] text-primary font-medium">Click to replace media</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-text-muted">
                  <Upload size={20} />
                  <span className="text-xs">Click or drag to upload</span>
                  <span className="text-[9px]">Images or Videos (MP4, JPG, PNG)</span>
                </div>
              )}
            </div>

            {/* Clip Settings (Duration & Audio) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-text-muted">Duration (s)</label>
                <input 
                  type="number" min="1" max="60" 
                  value={activeClip.duration}
                  onChange={(e) => updateActiveClip({ duration: parseInt(e.target.value) || 5 })}
                  className="w-full bg-bg border border-border rounded p-1.5 text-xs text-text-main focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-text-muted flex justify-between">
                  <span>Audio Level</span>
                  <span>{activeClip.audioLevel}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={activeClip.audioLevel}
                  onChange={(e) => updateActiveClip({ audioLevel: parseInt(e.target.value) })}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer mt-1"
                  style={{ accentColor: activeExpert.brandColor }}
                />
              </div>
            </div>
          </div>

          {/* Avatar Selection */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted flex items-center gap-2">
              <Bot size={14} /> AI Avatar
            </label>
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
              {/* Manual Upload Button */}
              <label className={`w-16 h-16 shrink-0 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden ${selectedAvatarId === 'manual' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
                <input type="file" accept="image/*,video/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleAvatarUpload} />
                {manualAvatarUrl ? (
                  <>
                    <img src={manualAvatarUrl} alt="Manual Avatar" className="w-full h-full object-cover" />
                    {selectedAvatarId === 'manual' && <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"></div>}
                  </>
                ) : (
                  <>
                    <Plus size={16} className="text-text-muted mb-1" />
                    <span className="text-[8px] text-text-muted">Upload</span>
                  </>
                )}
              </label>

              {/* Generated Avatars */}
              {videoAvatars.map((avatar) => (
                <div 
                  key={avatar.id} 
                  onClick={() => setSelectedAvatarId(avatar.id)}
                  className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer relative ${selectedAvatarId === avatar.id ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={avatar.url} alt="Avatar" className="w-full h-full object-cover" />
                  {selectedAvatarId === avatar.id && <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Voice Selection */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted flex items-center gap-2">
              <Mic size={14} /> Voice Clone (ElevenLabs)
            </label>
            <select 
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg p-2.5 text-xs text-text-main focus:outline-none focus:border-primary"
            >
              <option value="elevenlabs-1">{activeExpert.name} (Primary Clone)</option>
              <option value="elevenlabs-2">{activeExpert.name} (Energetic)</option>
              <option value="elevenlabs-3">{activeExpert.name} (Professional/Calm)</option>
            </select>
          </div>

          {/* Script / Content */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted flex items-center gap-2">
                <Type size={14} /> Script
              </label>
              <button 
                onClick={() => updateActiveClip({ script: viralTopics[0] })}
                className="text-[10px] text-primary hover:underline flex items-center gap-1"
              >
                <Sparkles size={10} /> Auto-Write
              </button>
            </div>
            <textarea 
              value={activeClip.script}
              onChange={(e) => updateActiveClip({ script: e.target.value })}
              placeholder="Paste your script here or use the AI to generate one based on viral market research..."
              className="w-full bg-bg border border-border rounded-lg p-3 text-xs text-text-main focus:outline-none focus:border-primary min-h-[120px] resize-none"
            />
            <div className="flex flex-wrap gap-2">
              {viralTopics.map((topic, idx) => (
                <button 
                  key={idx}
                  onClick={() => updateActiveClip({ script: topic })}
                  className="text-[9px] bg-white/5 hover:bg-white/10 border border-border rounded-full px-2 py-1 text-text-muted transition-colors truncate max-w-full"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Center: Preview Canvas & Timeline */}
      <section className="flex-1 flex flex-col relative overflow-hidden bg-bg">
        {/* Toolbar */}
        <div className="h-14 border-b border-border bg-surface/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCaptionsEnabled(!captionsEnabled)}
              className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${captionsEnabled ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted hover:text-text-main'}`}
            >
              <Type size={14} /> Auto-Captions
            </button>
            <button className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 text-text-muted hover:text-text-main transition-colors">
              <Music size={14} /> Viral BGM
            </button>
            <button className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 text-text-muted hover:text-text-main transition-colors">
              <Scissors size={14} /> Auto-Cuts
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                alert('Project data (Timeline, Scripts, Assets) has been queued for export.');
              }}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-white/5 text-text-main transition-all hover:bg-white/10"
            >
              <FolderOutput size={14} /> Export Project
            </button>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !activeClip.script}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: activeExpert.brandColor }}
            >
              {isGenerating ? (
                <><Wand2 size={14} className="animate-pulse" /> Generating...</>
              ) : (
                <><Play size={14} /> Generate Video</>
              )}
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div 
            className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-border/50 transition-all duration-500 flex flex-col ${format === '9:16' ? 'w-[320px] aspect-[9/16]' : 'w-[720px] aspect-video'}`}
          >
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/90 backdrop-blur-sm z-50">
                <div className="w-16 h-16 rounded-2xl bg-bg border border-border flex items-center justify-center mb-4 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]"></div>
                  <Wand2 size={32} className="animate-pulse" style={{ color: activeExpert.brandColor }} />
                </div>
                <h3 className="font-serif text-lg mb-2">Synthesizing Video...</h3>
                <p className="text-xs text-text-muted text-center max-w-[200px]">
                  Rendering avatar movements, syncing ElevenLabs audio, and applying dynamic captions.
                </p>
                <div className="w-48 h-1 bg-bg rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-[progress_5s_ease-in-out_infinite]" style={{ backgroundColor: activeExpert.brandColor }}></div>
                </div>
              </div>
            ) : generatedVideo ? (
              <>
                <img src={generatedVideo} alt="Generated Video" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = generatedVideo;
                    a.download = `video-export-${Date.now()}.mp4`;
                    a.click();
                  }}
                  className="absolute top-4 right-4 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors z-50"
                  title="Download Video"
                >
                  <Download size={20} />
                </button>
                {captionsEnabled && (
                  <div className="absolute bottom-20 left-0 right-0 flex justify-center px-8">
                    <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-center">
                      <span className="text-white font-black uppercase text-sm tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {activeClip.script.substring(0, 30)}...
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted text-center">
                
                {/* Background Layer for Normal and PiP */}
                {(activeClip.template === 'normal' || activeClip.template === 'pip') && (
                  <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
                    {activeClip.backgroundMedia ? renderMedia("w-full h-full object-cover opacity-80") : (
                      activeClip.template === 'normal' ? renderAvatarPreview("w-full h-full opacity-50") : <ImageIcon size={48} className="opacity-20" />
                    )}
                  </div>
                )}

                {/* Split Top Template */}
                {activeClip.template === 'split-top' && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-border/50 bg-black flex items-center justify-center overflow-hidden">
                      {activeClip.backgroundMedia ? renderMedia("w-full h-full object-cover opacity-80") : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon size={24} className="opacity-50" />
                          <span className="text-[10px] text-white/50">B-Roll Media</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-surface/20 flex items-center justify-center overflow-hidden">
                      {currentAvatarUrl ? (
                        renderAvatarPreview("w-full h-full opacity-80")
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Bot size={32} className="opacity-50" />
                          <span className="text-[10px] text-white/50">AI Avatar</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Split Bottom Template */}
                {activeClip.template === 'split-bottom' && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-surface/20 flex items-center justify-center overflow-hidden">
                      {currentAvatarUrl ? (
                        renderAvatarPreview("w-full h-full opacity-80")
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Bot size={32} className="opacity-50" />
                          <span className="text-[10px] text-white/50">AI Avatar</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 border-t border-border/50 bg-black flex items-center justify-center overflow-hidden">
                      {activeClip.backgroundMedia ? renderMedia("w-full h-full object-cover opacity-80") : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon size={24} className="opacity-50" />
                          <span className="text-[10px] text-white/50">B-Roll Media</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* PiP Template Avatar Overlay */}
                {activeClip.template === 'pip' && (
                  <div className="absolute bottom-4 right-4 w-1/3 aspect-[3/4] rounded-xl border border-white/20 bg-black/80 backdrop-blur-sm flex items-center justify-center shadow-2xl overflow-hidden z-10">
                    {currentAvatarUrl ? (
                      renderAvatarPreview("w-full h-full")
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Bot size={20} className="opacity-50" />
                        <span className="text-[8px] text-white/50">Avatar</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Normal Template Avatar Overlay (if background is uploaded) */}
                {activeClip.template === 'normal' && activeClip.backgroundMedia && (
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-8 z-10 pointer-events-none">
                    {currentAvatarUrl ? (
                      <div className="w-2/3 h-full flex items-end justify-center opacity-90">
                        <img src={currentAvatarUrl} alt="Avatar Overlay" className="w-full h-full object-contain object-bottom" style={{ maskImage: 'linear-gradient(to top, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)' }} />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Bot size={32} className="opacity-50 text-white" />
                        <span className="text-[10px] text-white/80">AI Avatar Overlay</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Default Text when no media is present in normal mode */}
                {activeClip.template === 'normal' && !activeClip.backgroundMedia && !currentAvatarUrl && (
                  <div className="z-10 flex flex-col items-center">
                    <p className="text-sm font-medium text-text-main mb-2">Ready to Generate</p>
                    <p className="text-xs max-w-[200px] text-white/50">
                      Select your format, write a script, and let the AI direct your next viral video.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Timeline Area */}
        <div className="h-56 bg-surface/80 backdrop-blur-md border-t border-border p-4 flex flex-col shrink-0 z-20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
              <Scissors size={14} /> Timeline Editor
            </h3>
            <button onClick={addClip} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
              <Plus size={14}/> Add Clip
            </button>
          </div>
          <div className="flex-1 flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
            {clips.map((clip, idx) => (
              <React.Fragment key={clip.id}>
                {/* Clip Block */}
                <div 
                  onClick={() => setActiveClipId(clip.id)}
                  className={`h-full w-36 shrink-0 rounded-xl border-2 p-2.5 flex flex-col cursor-pointer transition-all ${activeClipId === clip.id ? 'border-primary bg-primary/5' : 'border-border bg-bg hover:border-primary/50'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Clip {idx + 1}</span>
                    {clips.length > 1 && (
                      <button onClick={(e) => { e.stopPropagation(); deleteClip(clip.id); }} className="text-text-muted hover:text-red-400 transition-colors"><X size={12}/></button>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-center mb-2 bg-black/40 rounded-lg overflow-hidden relative border border-white/5">
                    {clip.backgroundMedia ? (
                      clip.mediaType === 'video' ? (
                        <video src={clip.backgroundMedia} className="w-full h-full object-cover opacity-50" />
                      ) : (
                        <img src={clip.backgroundMedia} className="w-full h-full object-cover opacity-50" />
                      )
                    ) : (
                      <LayoutTemplate size={16} className="opacity-20"/>
                    )}
                    <div className="absolute bottom-1 right-1 bg-black/60 px-1 rounded text-[8px] font-mono text-white">{clip.duration}s</div>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-1 border-t border-border/50">
                    <div className="flex gap-1">
                      <button onClick={(e) => { e.stopPropagation(); moveClip(idx, -1); }} disabled={idx === 0} className="text-text-muted hover:text-text-main disabled:opacity-30"><ChevronLeft size={14}/></button>
                      <button onClick={(e) => { e.stopPropagation(); moveClip(idx, 1); }} disabled={idx === clips.length - 1} className="text-text-muted hover:text-text-main disabled:opacity-30"><ChevronRight size={14}/></button>
                    </div>
                    {clip.audioLevel > 0 ? <Volume2 size={10} className="text-primary"/> : <VolumeX size={10} className="text-text-muted"/>}
                  </div>
                </div>
                
                {/* Transition Selector */}
                {idx < clips.length - 1 && (
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <select 
                      value={clip.transition}
                      onChange={(e) => updateClipTransition(clip.id, e.target.value as any)}
                      className="text-[9px] bg-bg border border-border rounded px-1.5 py-1 text-text-muted focus:outline-none focus:border-primary appearance-none text-center cursor-pointer"
                    >
                      <option value="none">Cut</option>
                      <option value="fade">Fade</option>
                      <option value="dissolve">Dissolve</option>
                      <option value="slide">Slide</option>
                    </select>
                    <ArrowRight size={12} className="text-border" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Right Sidebar: AI Agent Context */}
      <aside className="w-[300px] bg-surface border-l border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Bot className="text-primary" size={16} /> AI Director
          </h2>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="bg-bg border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Video size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xs font-bold">{videoAgent.name}</h3>
                <p className="text-[10px] text-text-muted">{videoAgent.role}</p>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              I'm analyzing viral trends in the {activeExpert.niche} space. 
              Using your brand colors and selected avatar, I'll direct a highly engaging video optimized for retention.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Generation Checklist</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-green-400" /> Avatar Selected
              </li>
              <li className="flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-green-400" /> Voice Cloned
              </li>
              <li className="flex items-center gap-2 text-xs">
                {activeClip.script ? <CheckCircle2 size={14} className="text-green-400" /> : <div className="w-3.5 h-3.5 rounded-full border border-border" />} 
                Script Written
              </li>
              <li className="flex items-center gap-2 text-xs">
                {activeClip.backgroundMedia ? <CheckCircle2 size={14} className="text-green-400" /> : <div className="w-3.5 h-3.5 rounded-full border border-border" />} 
                B-Roll Added
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
