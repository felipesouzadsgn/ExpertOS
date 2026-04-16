import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpertStore } from '@/store/expertStore';
import { ArrowLeft, Save, Image as ImageIcon, Palette, Type, Camera, Instagram, Linkedin, Twitter, Link as LinkIcon, Brain, Target, Briefcase, Sparkles } from 'lucide-react';

export function ExpertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { experts, updateExpert } = useExpertStore();
  
  const expert = experts.find(e => e.id === id);
  
  const [formData, setFormData] = useState(expert || {
    id: '', name: '', handle: '', niche: '', role: '', bio: '', profilePicture: '', socialLinks: { instagram: '', linkedin: '', twitter: '' }, avatarGradient: '', brandColor: '', colorPalette: [], typography: { heading: 'Inter', body: 'Inter' }, archetype: '', toneOfVoice: '', photographicStyle: '', icp: '', skills: [], tokens: '', archetypes: 0
  });

  useEffect(() => {
    if (expert) setFormData(expert);
  }, [expert]);

  if (!expert) return <div className="p-8 text-text-main">Expert not found</div>;

  const handleSave = () => {
    updateExpert(formData);
    navigate('/experts');
  };

  const handleSocialChange = (platform: 'instagram' | 'linkedin' | 'twitter', value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value
      }
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto text-text-main">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/experts')} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-serif">{formData.name}</h1>
            <p className="text-sm text-text-muted">Expert Configuration & Branding</p>
          </div>
        </div>
        <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="mb-6 bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary mb-1">AI Agent Context Active</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            The specialized AI Agent for this expert uses all the data below to learn their tone of voice, visual identity, and ideal customer profile. The more detailed you are, the better the agent will perform in the Content Studio.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity & Social */}
        <div className="col-span-1 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
              <ImageIcon size={14} /> Identity
            </h2>
            
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4 mb-6 pb-6 border-b border-border/50">
              <div className="relative w-24 h-24 rounded-full overflow-hidden group cursor-pointer border-2 border-border hover:border-primary transition-colors">
                {formData.profilePicture ? (
                  <img src={formData.profilePicture} alt={formData.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br flex items-center justify-center" style={{ backgroundImage: `linear-gradient(to bottom right, ${formData.brandColor}, #000)` }}>
                    <span className="text-3xl font-bold text-white">{formData.name.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">Change Picture</button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Handle / Username</label>
                <input 
                  type="text" 
                  value={formData.handle} 
                  onChange={e => setFormData({...formData, handle: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Niche / Industry</label>
                <input 
                  type="text" 
                  value={formData.niche} 
                  onChange={e => setFormData({...formData, niche: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Role / Title</label>
                <input 
                  type="text" 
                  value={formData.role || ''} 
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                  placeholder="e.g., Luxury Broker & Investor"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Bio</label>
                <textarea 
                  value={formData.bio} 
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none resize-none h-24"
                  placeholder="Brief overview of the expert's background..."
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <LinkIcon size={14} /> Social Links
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Instagram size={18} className="text-text-muted w-5" />
                <input 
                  type="text" 
                  placeholder="Instagram URL" 
                  value={formData.socialLinks?.instagram || ''} 
                  onChange={e => handleSocialChange('instagram', e.target.value)}
                  className="flex-1 bg-bg border border-border rounded-lg p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <Linkedin size={18} className="text-text-muted w-5" />
                <input 
                  type="text" 
                  placeholder="LinkedIn URL" 
                  value={formData.socialLinks?.linkedin || ''} 
                  onChange={e => handleSocialChange('linkedin', e.target.value)}
                  className="flex-1 bg-bg border border-border rounded-lg p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <Twitter size={18} className="text-text-muted w-5" />
                <input 
                  type="text" 
                  placeholder="Twitter / X URL" 
                  value={formData.socialLinks?.twitter || ''} 
                  onChange={e => handleSocialChange('twitter', e.target.value)}
                  className="flex-1 bg-bg border border-border rounded-lg p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Branding & Content */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Palette size={14} /> Brand Guidelines
            </h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Primary Brand Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={formData.brandColor} 
                    onChange={e => setFormData({...formData, brandColor: e.target.value})}
                    className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                  />
                  <input 
                    type="text" 
                    value={formData.brandColor} 
                    onChange={e => setFormData({...formData, brandColor: e.target.value})}
                    className="flex-1 bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none uppercase"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Typography Pairings</label>
                <select 
                  value={`${formData.typography?.heading} & ${formData.typography?.body}`}
                  onChange={e => {
                    const [heading, body] = e.target.value.split(' & ');
                    setFormData({...formData, typography: { heading, body }});
                  }}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="Inter & Inter">Inter & Inter (Modern)</option>
                  <option value="Playfair Display & Inter">Playfair & Inter (Sophisticated)</option>
                  <option value="Space Grotesk & Inter">Space Grotesk & Inter (Tech)</option>
                  <option value="Georgia & Lato">Georgia & Lato (Editorial)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted">Photographic Style</label>
              <textarea 
                value={formData.photographicStyle || ''}
                onChange={e => setFormData({...formData, photographicStyle: e.target.value})}
                className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                placeholder="E.g., High contrast, architectural focus, warm lighting..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                <Brain size={14} /> Persona & Voice
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Brand Archetype</label>
                  <input 
                    type="text" 
                    value={formData.archetype || ''} 
                    onChange={e => setFormData({...formData, archetype: e.target.value})}
                    className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                    placeholder="E.g., The Ruler / The Creator"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Tone of Voice</label>
                  <textarea 
                    value={formData.toneOfVoice || ''}
                    onChange={e => setFormData({...formData, toneOfVoice: e.target.value})}
                    className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-32 resize-none"
                    placeholder="Describe how this expert speaks. E.g., 'Authoritative, direct, uses high-level vocabulary...'"
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                <Target size={14} /> Audience & Expertise
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Ideal Customer Profile (ICP)</label>
                  <textarea 
                    value={formData.icp || ''}
                    onChange={e => setFormData({...formData, icp: e.target.value})}
                    className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                    placeholder="Who is the target audience?"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Core Skills (Comma separated)</label>
                  <textarea 
                    value={formData.skills?.join(', ') || ''}
                    onChange={e => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                    className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                    placeholder="E.g., Luxury Sales, Negotiation, Branding..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
