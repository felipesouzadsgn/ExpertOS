import { useState, useEffect } from 'react';
import { Camera, Video, Image as ImageIcon, Plus, Play, Download, Wand2, Sparkles, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';
import { useExpertStore, AvatarAsset } from '@/store/expertStore';

export function Avatars() {
  const { activeExpert, addAvatar, updateAvatar } = useExpertStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'image' as 'image' | 'video',
    style: 'Cinematic',
    prompt: ''
  });

  if (!activeExpert) {
    return <div className="p-4 md:p-6 lg:p-8 text-text-main">Please select an expert first.</div>;
  }

  const handleGenerate = () => {
    if (!formData.prompt) return;

    const newAvatarId = Math.random().toString(36).substring(7);
    const newAvatar: AvatarAsset = {
      id: newAvatarId,
      type: formData.type,
      url: '', // Will be filled after generation
      status: 'generating',
      prompt: formData.prompt,
      style: formData.style,
      createdAt: new Date().toISOString()
    };

    addAvatar(activeExpert.id, newAvatar);
    setShowForm(false);
    setFormData({ type: 'image', style: 'Cinematic', prompt: '' });

    // Simulate generation process
    setTimeout(() => {
      const generatedUrl = formData.type === 'image' 
        ? `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop&sig=${newAvatarId}` // Using a placeholder that looks like a professional headshot
        : 'https://cdn.coverr.co/videos/coverr-a-woman-talking-on-her-phone-in-the-park-2741/1080p.mp4'; // Placeholder video

      updateAvatar(activeExpert.id, newAvatarId, {
        status: 'ready',
        url: generatedUrl
      });
    }, 5000); // 5 seconds simulation
  };

  const avatars = activeExpert.avatars || [];

  return (
    <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col overflow-hidden text-text-main relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 shrink-0">
          <div>
            <h1 className="font-serif text-3xl mb-2 flex items-center gap-3">
              <Camera className="text-text-muted" /> AI Digital Twins
            </h1>
            <p className="text-text-muted text-sm max-w-xl">
              Generate and manage AI-powered avatars and video clones for <span className="font-semibold" style={{ color: activeExpert.brandColor }}>{activeExpert.name}</span>.
            </p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-xl font-bold transition-colors text-white flex items-center gap-2 hover:brightness-110 w-full sm:w-auto justify-center"
            style={{ backgroundColor: activeExpert.brandColor }}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Cancel' : 'Generate New Avatar'}
          </button>
        </div>

        {/* Generation Form */}
        {showForm && (
          <div className="bg-surface border border-border rounded-2xl p-6 mb-8 shrink-0 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: activeExpert.brandColor }}></div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Wand2 size={20} style={{ color: activeExpert.brandColor }} /> 
              Avatar Generation Studio
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Asset Type</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setFormData({ ...formData, type: 'image' })}
                    className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${formData.type === 'image' ? 'bg-white/10 border-white/20 text-white' : 'bg-bg border-border text-text-muted hover:bg-white/5'}`}
                  >
                    <ImageIcon size={16} /> Image
                  </button>
                  <button 
                    onClick={() => setFormData({ ...formData, type: 'video' })}
                    className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${formData.type === 'video' ? 'bg-white/10 border-white/20 text-white' : 'bg-bg border-border text-text-muted hover:bg-white/5'}`}
                  >
                    <Video size={16} /> Video Clone
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Visual Style</label>
                <select 
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="Cinematic">Cinematic & Dramatic</option>
                  <option value="Studio">Studio Lighting (Professional)</option>
                  <option value="Casual">Casual / Lifestyle</option>
                  <option value="Podcast">Podcast Setup</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Prompt / Objective</label>
                <textarea 
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  placeholder={formData.type === 'image' ? "e.g., Professional headshot, arms crossed, looking confident, dark background..." : "e.g., Speaking directly to the camera about B2B sales strategies, energetic tone..."}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors h-24 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={!formData.prompt}
                className="px-8 py-3 rounded-xl font-bold transition-colors text-white flex items-center gap-2 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: activeExpert.brandColor }}
              >
                <Sparkles size={18} /> Generate {formData.type === 'image' ? 'Image' : 'Video'}
              </button>
            </div>
          </div>
        )}

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
          {avatars.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-border rounded-2xl p-4 md:p-6 lg:p-8">
              <Camera size={48} className="mb-4 opacity-20" />
              <h3 className="text-xl font-bold mb-2">No Avatars Generated Yet</h3>
              <p className="text-sm max-w-md text-center mb-6">
                Create AI-powered images and video clones based on {activeExpert.name}'s likeness to scale content production infinitely.
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="px-6 py-3 rounded-xl font-bold transition-colors text-white flex items-center gap-2 hover:brightness-110"
                style={{ backgroundColor: activeExpert.brandColor }}
              >
                <Plus size={18} /> Create First Avatar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {avatars.map((avatar) => (
                <div key={avatar.id} className="bg-surface border border-border rounded-2xl overflow-hidden group flex flex-col">
                  {/* Media Area */}
                  <div className="aspect-[4/5] relative bg-bg flex items-center justify-center overflow-hidden">
                    {avatar.status === 'generating' ? (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-full border-4 border-border border-t-primary animate-spin mb-4" style={{ borderTopColor: activeExpert.brandColor }}></div>
                        <p className="text-sm font-bold animate-pulse" style={{ color: activeExpert.brandColor }}>Generating {avatar.type}...</p>
                        <p className="text-xs text-text-muted mt-2">Training model on {activeExpert.name}'s likeness</p>
                      </div>
                    ) : avatar.status === 'ready' ? (
                      <>
                        {avatar.type === 'image' ? (
                          <img src={avatar.url} alt={avatar.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full relative">
                            <video src={avatar.url} className="w-full h-full object-cover" loop muted playsInline />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <Play size={24} className="ml-1" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <div className="flex gap-2">
                            <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 min-h-[44px]">
                              <Download size={14} /> Download
                            </button>
                            <button className="flex-1 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 min-h-[44px]" style={{ backgroundColor: activeExpert.brandColor }}>
                              Use Asset
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-red-400">
                        <AlertCircle size={32} className="mb-2" />
                        <p className="text-sm font-bold">Generation Failed</p>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 text-[11px] md:text-[10px] font-bold text-white uppercase tracking-wider">
                        {avatar.type === 'image' ? <ImageIcon size={12} /> : <Video size={12} />}
                        {avatar.type}
                      </div>
                      <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 text-[11px] md:text-[10px] font-bold text-white uppercase tracking-wider">
                        {avatar.style}
                      </div>
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-4 flex flex-col flex-1 border-t border-border">
                    <p className="text-xs text-text-muted line-clamp-2 mb-3 flex-1">"{avatar.prompt}"</p>
                    <div className="flex items-center justify-between text-[10px] text-text-muted font-mono">
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {new Date(avatar.createdAt).toLocaleDateString()}
                      </span>
                      {avatar.status === 'ready' && (
                        <span className="flex items-center gap-1 text-green-400">
                          <CheckCircle2 size={10} /> Ready
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
