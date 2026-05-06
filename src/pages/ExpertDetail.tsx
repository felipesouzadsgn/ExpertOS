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

  if (!expert) return <div className="p-8 text-text-main">Expert não encontrado</div>;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/experts')} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-serif">{formData.name}</h1>
            <p className="text-sm text-text-muted">Configuração & Branding do Expert</p>
          </div>
        </div>
        <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all w-full sm:w-auto justify-center">
          <Save size={16} /> Salvar Alterações
        </button>
      </div>

      <div className="mb-6 bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary mb-1">Diretiva do Sistema: Contexto Antes da Geração</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            <strong className="text-text-main">Sem contexto do Expert, não há geração.</strong> Os Agentes de IA especializados deste Expert usam todos os dados abaixo para aprender seu tom de voz, identidade visual e perfil de cliente ideal. Quanto mais detalhado você for, melhor os agentes replicarão a identidade única deste Expert no Estúdio de Conteúdo.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Identity & Social */}
        <div className="col-span-1 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
              <ImageIcon size={14} /> Identidade
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
                <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">Alterar Foto</button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Nome Completo</label>
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
                <label className="text-[10px] uppercase font-bold text-text-muted">Nicho / Indústria</label>
                <input 
                  type="text" 
                  value={formData.niche} 
                  onChange={e => setFormData({...formData, niche: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Cargo / Título</label>
                <input 
                  type="text" 
                  value={formData.role || ''} 
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                  placeholder="Ex: Corretora de Luxo & Investidora"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Bio</label>
                <textarea 
                  value={formData.bio} 
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none resize-none h-24"
                  placeholder="Breve visão geral sobre o background do Expert..."
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <LinkIcon size={14} /> Redes Sociais
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
          {/* Brand Colors */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Palette size={14} /> Paleta de Cores da Marca
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Primária', key: 'primary' as const, value: formData.brandColors?.primary || formData.brandColor },
                { label: 'Secundária', key: 'secondary' as const, value: formData.brandColors?.secondary || '#1e1b4b' },
                { label: 'Terciária', key: 'tertiary' as const, value: formData.brandColors?.tertiary || '#c4b5fd' },
              ].map((color) => (
                <div key={color.key} className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-text-muted">{color.label}</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={color.value} 
                      onChange={e => setFormData({
                        ...formData, 
                        brandColors: { 
                          ...formData.brandColors, 
                          primary: formData.brandColors?.primary || formData.brandColor,
                          secondary: formData.brandColors?.secondary || '#1e1b4b',
                          tertiary: formData.brandColors?.tertiary || '#c4b5fd',
                          [color.key]: e.target.value 
                        },
                        ...(color.key === 'primary' ? { brandColor: e.target.value } : {})
                      })}
                      className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                    />
                    <input 
                      type="text" 
                      value={color.value} 
                      onChange={e => setFormData({
                        ...formData, 
                        brandColors: { 
                          ...formData.brandColors, 
                          primary: formData.brandColors?.primary || formData.brandColor,
                          secondary: formData.brandColors?.secondary || '#1e1b4b',
                          tertiary: formData.brandColors?.tertiary || '#c4b5fd',
                          [color.key]: e.target.value 
                        },
                        ...(color.key === 'primary' ? { brandColor: e.target.value } : {})
                      })}
                      className="flex-1 bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none uppercase font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Color Preview Bar */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-text-muted">Preview do Gradiente</label>
              <div className="h-16 rounded-xl overflow-hidden flex">
                <div className="flex-1" style={{ backgroundColor: formData.brandColors?.primary || formData.brandColor }}></div>
                <div className="flex-1" style={{ backgroundColor: formData.brandColors?.secondary || '#1e1b4b' }}></div>
                <div className="flex-1" style={{ backgroundColor: formData.brandColors?.tertiary || '#c4b5fd' }}></div>
              </div>
              {formData.brandColors?.gradient && (
                <div className="h-8 rounded-lg" style={{ background: formData.brandColors.gradient }}></div>
              )}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Type size={14} /> Sistema Tipográfico
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Display (Títulos grandes)', key: 'display', value: formData.typography?.display || 'Inter', placeholder: 'Ex: Playfair Display' },
                { label: 'Heading (Subtítulos)', key: 'heading', value: formData.typography?.heading || 'Inter', placeholder: 'Ex: Cormorant Garamond' },
                { label: 'Body (Texto corrido)', key: 'body', value: formData.typography?.body || 'Inter', placeholder: 'Ex: Inter' },
                { label: 'Accent (Destaques e CTAs)', key: 'accent', value: formData.typography?.accent || '', placeholder: 'Ex: Italiana' },
              ].map((font) => (
                <div key={font.key} className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">{font.label}</label>
                  <input 
                    type="text" 
                    value={font.value} 
                    onChange={e => setFormData({
                      ...formData, 
                      typography: { 
                        display: formData.typography?.display || 'Inter',
                        heading: formData.typography?.heading || 'Inter',
                        body: formData.typography?.body || 'Inter',
                        accent: formData.typography?.accent || '',
                        [font.key]: e.target.value 
                      }
                    })}
                    className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                    placeholder={font.placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Typography Preview */}
            {formData.typography && (
              <div className="mt-4 bg-bg border border-border rounded-xl p-4 space-y-2">
                <p className="text-[10px] uppercase font-bold text-text-muted mb-2">Preview Tipográfico</p>
                <p className="text-2xl font-bold" style={{ fontFamily: formData.typography.display }}>{formData.typography.display} — Display</p>
                <p className="text-lg font-semibold" style={{ fontFamily: formData.typography.heading }}>{formData.typography.heading} — Heading</p>
                <p className="text-sm" style={{ fontFamily: formData.typography.body }}>{formData.typography.body} — Body text para parágrafos e conteúdo longo</p>
                {formData.typography.accent && (
                  <p className="text-sm italic" style={{ fontFamily: formData.typography.accent }}>{formData.typography.accent} — Accent para destaques e CTAs</p>
                )}
              </div>
            )}
          </div>

          {/* Archetype */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Brain size={14} /> Arquétipos de Marca
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Arquétipo Primário', key: 'primary', value: formData.brandArchetype?.primary || '', placeholder: 'Ex: O Governante' },
                { label: 'Arquétipo Secundário', key: 'secondary', value: formData.brandArchetype?.secondary || '', placeholder: 'Ex: O Criador' },
                { label: 'Arquétipo Sombra', key: 'shadow', value: formData.brandArchetype?.shadow || '', placeholder: 'Ex: O Mago' },
              ].map((arch) => (
                <div key={arch.key} className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">{arch.label}</label>
                  <input 
                    type="text" 
                    value={arch.value} 
                    onChange={e => setFormData({
                      ...formData, 
                      brandArchetype: { 
                        primary: formData.brandArchetype?.primary || '',
                        secondary: formData.brandArchetype?.secondary || '',
                        shadow: formData.brandArchetype?.shadow || '',
                        essence: formData.brandArchetype?.essence || '',
                        motivation: formData.brandArchetype?.motivation || '',
                        voice: formData.brandArchetype?.voice || '',
                        [arch.key]: e.target.value 
                      }
                    })}
                    className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                    placeholder={arch.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Essência</label>
                <textarea 
                  value={formData.brandArchetype?.essence || ''}
                  onChange={e => setFormData({...formData, brandArchetype: { ...formData.brandArchetype!, essence: e.target.value }})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                  placeholder="O que define o core deste Expert? Qual é a verdade fundamental que ele representa?"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Motivação</label>
                <textarea 
                  value={formData.brandArchetype?.motivation || ''}
                  onChange={e => setFormData({...formData, brandArchetype: { ...formData.brandArchetype!, motivation: e.target.value }})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                  placeholder="O que move este Expert? Qual causa ou missão guia cada conteúdo produzido?"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Voz do Arquétipo</label>
                <textarea 
                  value={formData.brandArchetype?.voice || ''}
                  onChange={e => setFormData({...formData, brandArchetype: { ...formData.brandArchetype!, voice: e.target.value }})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                  placeholder="Como este Expert fala? Que comparações descrevem seu estilo de comunicação?"
                />
              </div>
            </div>
          </div>

          {/* Persona & Voice + Audience grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                <Sparkles size={14} /> Tom de Voz
              </h2>
              <div className="space-y-1">
                <textarea 
                  value={formData.toneOfVoice || ''}
                  onChange={e => setFormData({...formData, toneOfVoice: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-32 resize-none"
                  placeholder="Descreva como este Expert fala. Ex: 'Autoritário, direto, vocabulário sofisticado...'"
                />
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                <Target size={14} /> Público & Expertise
              </h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Perfil de Cliente Ideal (ICP)</label>
                  <textarea 
                    value={formData.icp || ''}
                    onChange={e => setFormData({...formData, icp: e.target.value})}
                    className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                    placeholder="Quem é o público-alvo?"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted">Habilidades Core (Separadas por vírgula)</label>
                  <textarea 
                    value={formData.skills?.join(', ') || ''}
                    onChange={e => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                    className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                    placeholder="Ex: Vendas de Luxo, Negociação, Branding..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Identity */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Camera size={14} /> Identidade Visual
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Estilo Fotográfico</label>
                <textarea 
                  value={formData.photographicStyle || ''}
                  onChange={e => setFormData({...formData, photographicStyle: e.target.value})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                  placeholder="Ex: Alto contraste, foco arquitetônico, iluminação quente..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Estilo de Logo</label>
                <textarea 
                  value={formData.visualIdentity?.logoStyle || ''}
                  onChange={e => setFormData({...formData, visualIdentity: { ...formData.visualIdentity!, moodKeywords: formData.visualIdentity?.moodKeywords || [], logoStyle: e.target.value }})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-20 resize-none"
                  placeholder="Ex: Monograma serifado, wordmark geométrica..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Estilo de Padrões/Texturas</label>
                <textarea 
                  value={formData.visualIdentity?.patternStyle || ''}
                  onChange={e => setFormData({...formData, visualIdentity: { ...formData.visualIdentity!, moodKeywords: formData.visualIdentity?.moodKeywords || [], logoStyle: formData.visualIdentity?.logoStyle || '', patternStyle: e.target.value }})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-16 resize-none"
                  placeholder="Ex: Linhas geométricas finas, formas orgânicas..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted">Iconografia</label>
                <textarea 
                  value={formData.visualIdentity?.iconography || ''}
                  onChange={e => setFormData({...formData, visualIdentity: { ...formData.visualIdentity!, moodKeywords: formData.visualIdentity?.moodKeywords || [], logoStyle: formData.visualIdentity?.logoStyle || '', iconography: e.target.value }})}
                  className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-16 resize-none"
                  placeholder="Ex: Linhas finas, cantos retos, estética arquitetônica..."
                />
              </div>
            </div>

            {/* Mood Keywords */}
            <div className="space-y-2 mb-4">
              <label className="text-[10px] uppercase font-bold text-text-muted">Palavras-chave do Moodboard</label>
              <div className="flex flex-wrap gap-2">
                {(formData.visualIdentity?.moodKeywords || []).map((keyword, i) => (
                  <span key={i} className="text-xs bg-white/5 border border-border px-3 py-1.5 rounded-lg text-text-muted">
                    {keyword}
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                value={formData.visualIdentity?.moodKeywords?.join(', ') || ''}
                onChange={e => setFormData({...formData, visualIdentity: { ...formData.visualIdentity!, logoStyle: formData.visualIdentity?.logoStyle || '', moodKeywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }})}
                className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none"
                placeholder="Palavras separadas por vírgula: Ex: Opulência Silenciosa, Poder Discreto..."
              />
            </div>

            {/* Brand Manifesto */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted">Manifesto da Marca</label>
              <textarea 
                value={formData.visualIdentity?.brandManifesto || ''}
                onChange={e => setFormData({...formData, visualIdentity: { ...formData.visualIdentity!, moodKeywords: formData.visualIdentity?.moodKeywords || [], logoStyle: formData.visualIdentity?.logoStyle || '', brandManifesto: e.target.value }})}
                className="w-full bg-bg border border-border rounded-lg p-3 text-sm focus:border-primary focus:outline-none h-24 resize-none italic"
                placeholder="A declaração fundamental que define a alma desta marca. O que ela acredita? Pelo que luta? Qual é a promessa que faz ao mundo?"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
