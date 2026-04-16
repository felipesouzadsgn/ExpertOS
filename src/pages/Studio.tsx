import React, { useState, useRef, useEffect } from 'react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';
import { 
  Monitor, 
  Undo2, 
  Redo2, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Hexagon, 
  Sparkles, 
  Send,
  Play,
  Video,
  Image as ImageIcon,
  Type,
  LayoutTemplate,
  SlidersHorizontal,
  Layers,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Move,
  ArrowRight,
  ChevronsRight,
  Upload,
  Crop,
  Bot,
  FileSpreadsheet,
  Wand2,
  ImagePlus,
  CalendarClock
} from 'lucide-react';

type Slide = {
  id: number;
  type: 'image' | 'video';
  mediaUrl: string;
  compositionImageUrl?: string;
  hat?: string;
  title: string;
  subtitle?: string;
  text: string;
  cta?: string;
  alignment: 'left' | 'center' | 'right' | 'justify';
  layoutTemplate: 'overlay' | 'bottom' | 'top' | 'split';
  customPosition?: { x: number, y: number };
  videoTrimStart?: number;
  videoTrimEnd?: number;
  videoPlaybackSpeed?: number;
  videoThumbnailFrame?: number;
  mediaScale?: number;
  mediaOffsetX?: number;
  mediaOffsetY?: number;
};

export function Studio() {
  const activeExpert = useExpertStore(state => state.activeExpert);
  const { getAgentsByExpert } = useAgentStore();

  const [format, setFormat] = useState('aspect-[4/5]');
  const [fadeIntensity, setFadeIntensity] = useState(90);
  const [fadeColor, setFadeColor] = useState('#09090B');
  const [activeTab, setActiveTab] = useState<'design' | 'ai'>('design');
  
  const expertAgents = activeExpert ? getAgentsByExpert(activeExpert.id) : [];
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const activeAgent = expertAgents.find(a => a.id === selectedAgentId) || expertAgents[0];

  const [aiChat, setAiChat] = useState([
    { id: 1, role: 'agent', text: "Hi! I'm your AI Assistant. How can I help you build this carousel?" }
  ]);

  // Update AI greeting when expert or agent changes
  useEffect(() => {
    if (activeExpert && activeAgent) {
      setAiChat([
        { id: Date.now(), role: 'agent', text: `Hi! I'm ${activeAgent.name}. I've loaded ${activeExpert.name}'s brand guidelines, tone of voice, and recent research context. How can I help you build this carousel?` }
      ]);
    } else if (activeExpert) {
      setAiChat([
        { id: Date.now(), role: 'agent', text: `Hi! I'm your AI Assistant. Please select an agent to load their specific skills.` }
      ]);
    } else {
      setAiChat([
        { id: Date.now(), role: 'agent', text: `Hi! Please select an expert to load their brand guidelines and context.` }
      ]);
    }
  }, [activeExpert, activeAgent]);
  
  const [slides, setSlides] = useState<Slide[]>([
    { 
      id: 1, 
      type: 'image', 
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', 
      hat: 'EXPERT INSIGHTS',
      title: 'THE ARCHITECTURE\nOF OS', 
      subtitle: 'Designing for the future',
      text: 'Mastering the visual hierarchy of elite professional workspaces through intentional depth and structure.', 
      cta: 'SWIPE TO LEARN',
      alignment: 'left',
      layoutTemplate: 'overlay',
      customPosition: { x: 0, y: 0 }
    },
    { 
      id: 2, 
      type: 'video', 
      mediaUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', 
      title: 'B-ROLL TRANSITION', 
      text: '[Video: Slow pan across luxury office] Why borders are a thing of the past.',
      alignment: 'center',
      layoutTemplate: 'bottom',
      customPosition: { x: 0, y: 0 }
    }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [corners, setCorners] = useState({
    tl: 'Logo',
    tr: 'Series Tag',
    bl: 'Author / Handle',
    br: 'Slide Counter'
  });

  const activeSlide = slides[activeSlideIndex];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const downloadCSVTemplate = () => {
    const headers = ['type', 'backgroundMediaUrl', 'compositionImageUrl', 'hat', 'title', 'subtitle', 'text', 'cta', 'alignment', 'layoutTemplate'];
    const exampleRow1 = ['image', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', '', 'EXPERT INSIGHTS', 'THE ARCHITECTURE\nOF OS', 'Designing for the future', 'Mastering the visual hierarchy of elite professional workspaces.', 'SWIPE TO LEARN', 'left', 'overlay'];
    const exampleRow2 = ['video', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', '', 'B-ROLL', 'VIDEO BACKGROUND', '', 'This slide uses a video background with bottom layout.', '', 'center', 'bottom'];
    
    const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
    
    const csvContent = [
      headers.join(','),
      exampleRow1.map(escapeCSV).join(','),
      exampleRow2.map(escapeCSV).join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'expert_carousel_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyAIPrompt = () => {
    const prompt = `Atue como um Diretor Visual e Copywriter Especialista. Crie um carrossel de alto nível.
Gere APENAS um formato CSV válido com os seguintes cabeçalhos exatos (em inglês):
type,backgroundMediaUrl,compositionImageUrl,hat,title,subtitle,text,cta,alignment,layoutTemplate

Regras para encaixe perfeito no layout:
1. type: "image" ou "video"
2. backgroundMediaUrl: URL real do Unsplash (ex: https://images.unsplash.com/photo-...) para o fundo.
3. compositionImageUrl: URL de imagem de composição (opcional, deixe vazio se não precisar).
4. hat: Texto de sobrancelha (Eyebrow), máx 20 caracteres, MAIÚSCULAS.
5. title: Título principal, máx 40 caracteres. Use \\n para quebras de linha estratégicas.
6. subtitle: Subtítulo de apoio, máx 50 caracteres.
7. text: Corpo do texto, máx 150 caracteres para leitura rápida.
8. cta: Call to action, máx 20 caracteres (ex: ARRASTE PARA O LADO).
9. alignment: "left", "center", "right" ou "justify".
10. layoutTemplate: "overlay", "bottom", "top" ou "split".

Escreva o conteúdo em Português, focado em autoridade e engajamento. Não inclua formatação markdown como \`\`\`csv, apenas o texto bruto do CSV.`;

    navigator.clipboard.writeText(prompt);
    
    setAiChat(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: "Me dê um prompt para gerar o CSV perfeitamente." },
      { id: Date.now() + 1, role: 'agent', text: "Copiei o prompt perfeito para a sua área de transferência! Cole no ChatGPT ou Claude para gerar um CSV com os limites de caracteres exatos para o nosso layout." }
    ]);
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const rows: string[][] = [];
      let currentRow: string[] = [];
      let currentCell = '';
      let inQuotes = false;
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"' && text[i+1] === '"') {
          currentCell += '"';
          i++;
        } else if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          currentRow.push(currentCell);
          currentCell = '';
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
          if (char === '\r' && text[i+1] === '\n') i++;
          currentRow.push(currentCell);
          if (currentRow.some(cell => cell.trim() !== '')) rows.push(currentRow);
          currentRow = [];
          currentCell = '';
        } else {
          currentCell += char;
        }
      }
      if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell);
        if (currentRow.some(cell => cell.trim() !== '')) rows.push(currentRow);
      }

      const dataRows = rows.slice(1);
      if (dataRows.length === 0) return;

      const newSlides: Slide[] = dataRows.map((row, index) => ({
        id: Date.now() + index,
        type: (row[0] === 'video' ? 'video' : 'image') as 'image' | 'video',
        mediaUrl: row[1] || 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        compositionImageUrl: row[2] || undefined,
        hat: row[3] || '',
        title: row[4] || '',
        subtitle: row[5] || '',
        text: row[6] || '',
        cta: row[7] || '',
        alignment: (['left', 'center', 'right', 'justify'].includes(row[8]) ? row[8] : 'left') as 'left' | 'center' | 'right' | 'justify',
        layoutTemplate: (['overlay', 'bottom', 'top', 'split'].includes(row[9]) ? row[9] : 'overlay') as 'overlay' | 'bottom' | 'top' | 'split',
        customPosition: { x: 0, y: 0 }
      }));

      setSlides(newSlides);
      setActiveSlideIndex(0);
      
      setAiChat(prev => [
        ...prev,
        { id: Date.now(), role: 'user', text: `I've uploaded a CSV with ${newSlides.length} slides.` },
        { id: Date.now() + 1, role: 'agent', text: `Perfect! I've successfully imported ${newSlides.length} slides from your CSV and applied all the content, media, and layout settings. You can review them in the canvas now.` }
      ]);
    };
    reader.readAsText(file);
    
    if (csvInputRef.current) csvInputRef.current.value = '';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    
    updateActiveSlide({
      mediaUrl: url,
      type: isVideo ? 'video' : 'image',
      mediaScale: 1,
      mediaOffsetX: 0,
      mediaOffsetY: 0
    });
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const updateActiveSlide = (updates: Partial<Slide>) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex] = { ...newSlides[activeSlideIndex], ...updates };
    setSlides(newSlides);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val.includes('4:5')) setFormat('aspect-[4/5]');
    else if (val.includes('1:1')) setFormat('aspect-square');
    else if (val.includes('9:16')) setFormat('aspect-[9/16]');
    else if (val.includes('16:9')) setFormat('aspect-video');
  };

  const addSlide = (type: 'image' | 'video') => {
    const newSlide: Slide = {
      id: Date.now(),
      type,
      mediaUrl: type === 'image' ? 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop',
      title: `NEW BLOCK`,
      text: 'Add your content here...',
      alignment: 'left',
      layoutTemplate: 'overlay',
      customPosition: { x: 0, y: 0 }
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const renderCorner = (type: string) => {
    switch(type) {
      case 'Logo':
        return (
          <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10">
            <Hexagon size={18} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
          </div>
        );
      case 'Series Tag':
        return (
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-text-main border border-white/10">
            Expert Series
          </span>
        );
      case 'Author / Handle':
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border p-0.5" style={{ borderColor: `${activeExpert?.brandColor || '#6366f1'}66` }}>
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}33` }}>
                {activeExpert?.profilePicture ? (
                  <img src={activeExpert.profilePicture} alt={activeExpert.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${activeExpert?.brandColor || '#6366f1'}, #000)` }}></div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest uppercase text-text-main shadow-black drop-shadow-md">{activeExpert?.name || 'Expert OS'}</span>
              <span className="text-[9px] text-text-muted shadow-black drop-shadow-md">{activeExpert?.handle || '@expert.os'}</span>
            </div>
          </div>
        );
      case 'Slide Counter':
        return (
          <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
            {String(activeSlideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        );
      case 'Arrow (Next)':
        return (
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-lg" style={{ color: activeExpert?.brandColor || '#6366f1' }}>
            <ArrowRight size={20} />
          </div>
        );
      case 'Swipe Right':
        return (
          <div className="flex items-center gap-2 text-white/90 drop-shadow-md">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Swipe</span>
            <ChevronsRight size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
          </div>
        );
      default:
        return null;
    }
  };

  // Determine alignment classes
  const getAlignmentClasses = () => {
    switch (activeSlide.alignment) {
      case 'center': return 'items-center text-center';
      case 'right': return 'items-end text-right';
      case 'justify': return 'items-start text-justify';
      default: return 'items-start text-left';
    }
  };

  // Determine layout classes
  const getLayoutClasses = () => {
    switch (activeSlide.layoutTemplate) {
      case 'bottom': return 'justify-end pb-24';
      case 'top': return 'justify-start pt-24';
      case 'split': return 'justify-center w-1/2 bg-black/40 backdrop-blur-sm h-full p-8'; // Example split
      default: return 'justify-center'; // overlay
    }
  };

  return (
    <div className="h-full flex overflow-hidden bg-bg text-text-main">
      {/* Left Sidebar: Slide Navigator & Editor */}
      <aside className="w-[340px] bg-surface border-r border-border flex flex-col overflow-hidden shrink-0">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Content Blocks</h2>
          <div className="flex gap-2">
            <button onClick={() => addSlide('image')} className="flex-1 bg-white/5 hover:bg-white/10 text-primary text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200">
              <ImageIcon size={14} /> Add Slide
            </button>
            <button onClick={() => addSlide('video')} className="flex-1 bg-white/5 hover:bg-white/10 text-primary text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200">
              <Video size={14} /> Add Video
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              onClick={() => setActiveSlideIndex(index)}
              className={`p-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                activeSlideIndex === index ? 'bg-white/5 border-l-4 shadow-lg' : 'bg-transparent hover:bg-white/5 border-l-4 border-transparent'
              }`}
              style={{ borderLeftColor: activeSlideIndex === index ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}
            >
              <div className="flex gap-3 mb-2">
                <div className="w-16 h-16 rounded-lg bg-bg overflow-hidden flex-shrink-0 relative">
                  <img 
                    alt={`Slide Thumbnail ${index + 1}`} 
                    className={`w-full h-full object-cover ${slide.type === 'video' ? 'opacity-70' : ''}`} 
                    src={slide.mediaUrl} 
                  />
                  {slide.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play size={16} className="text-white drop-shadow-md" fill="white" />
                    </div>
                  )}
                  <div className="absolute top-1 right-1 bg-black/50 rounded p-0.5">
                    {slide.type === 'video' ? <Video size={10} className="text-white" /> : <ImageIcon size={10} className="text-white" />}
                  </div>
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <span className="text-[10px] font-bold uppercase tracking-widest transition-colors" style={{ color: activeSlideIndex === index ? (activeExpert?.brandColor || '#6366f1') : '#a1a1aa' }}>
                    Slide {index + 1}
                  </span>
                  <span className="text-sm font-medium truncate w-full">{slide.title || 'Untitled'}</span>
                </div>
              </div>

              {/* Expanded Editor for Active Slide */}
              {activeSlideIndex === index && (
                <div className="mt-4 space-y-3 border-t border-border/50 pt-4" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">HAT (Eyebrow Text)</label>
                    <input 
                      className="w-full bg-bg border border-border rounded-lg text-xs text-text-main p-2 focus:outline-none" 
                      style={{ '--tw-ring-color': activeExpert?.brandColor || '#6366f1' } as any}
                      value={slide.hat || ''}
                      onChange={(e) => updateActiveSlide({ hat: e.target.value })}
                      placeholder="e.g. EXPERT INSIGHTS"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">Title</label>
                    <textarea 
                      className="w-full bg-bg border border-border rounded-lg text-sm font-bold text-text-main p-2 focus:outline-none resize-none h-16" 
                      value={slide.title}
                      onChange={(e) => updateActiveSlide({ title: e.target.value })}
                      placeholder="Main Headline"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">Subtitle</label>
                    <input 
                      className="w-full bg-bg border border-border rounded-lg text-xs text-text-main p-2 focus:outline-none" 
                      value={slide.subtitle || ''}
                      onChange={(e) => updateActiveSlide({ subtitle: e.target.value })}
                      placeholder="Supporting headline"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">Description</label>
                    <textarea 
                      className="w-full bg-bg border border-border rounded-lg text-xs text-text-muted p-2 focus:outline-none resize-none h-20" 
                      value={slide.text}
                      onChange={(e) => updateActiveSlide({ text: e.target.value })}
                      placeholder="Body copy..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">Call to Action (CTA)</label>
                    <input 
                      className="w-full bg-bg border border-border rounded-lg text-xs text-text-main p-2 focus:outline-none" 
                      value={slide.cta || ''}
                      onChange={(e) => updateActiveSlide({ cta: e.target.value })}
                      placeholder="e.g. SWIPE TO LEARN"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={() => updateActiveSlide({ compositionImageUrl: slide.compositionImageUrl ? undefined : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop' })}
                      className="w-full bg-bg border border-border hover:bg-white/5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ImageIcon size={14} /> 
                      {slide.compositionImageUrl ? 'Remove Comp Image' : 'Add Comp Image'}
                    </button>
                  </div>

                  {/* Video Controls */}
                  {slide.type === 'video' && (
                    <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                      <h4 className="text-[10px] uppercase font-black flex items-center gap-1" style={{ color: activeExpert?.brandColor || '#6366f1' }}>
                        <Video size={12} /> Video Settings
                      </h4>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted flex justify-between">
                          <span>Trim (Seconds)</span>
                          <span>{slide.videoTrimStart || 0}s - {slide.videoTrimEnd || 15}s</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            className="w-full bg-bg border border-border rounded p-1.5 text-xs text-text-main focus:outline-none" 
                            placeholder="Start" 
                            value={slide.videoTrimStart || 0} 
                            onChange={e => updateActiveSlide({ videoTrimStart: Number(e.target.value) })} 
                          />
                          <span className="text-text-muted">-</span>
                          <input 
                            type="number" 
                            className="w-full bg-bg border border-border rounded p-1.5 text-xs text-text-main focus:outline-none" 
                            placeholder="End" 
                            value={slide.videoTrimEnd || 15} 
                            onChange={e => updateActiveSlide({ videoTrimEnd: Number(e.target.value) })} 
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted">Playback Speed</label>
                        <select 
                          className="w-full bg-bg border border-border rounded p-1.5 text-xs text-text-main focus:outline-none appearance-none" 
                          value={slide.videoPlaybackSpeed || 1} 
                          onChange={e => updateActiveSlide({ videoPlaybackSpeed: Number(e.target.value) })}
                        >
                          <option value={0.5}>0.5x (Slow)</option>
                          <option value={1}>1.0x (Normal)</option>
                          <option value={1.5}>1.5x (Fast)</option>
                          <option value={2}>2.0x (Very Fast)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted flex justify-between">
                          <span>Thumbnail Frame</span>
                          <span>{slide.videoThumbnailFrame || 0}%</span>
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" 
                          style={{ accentColor: activeExpert?.brandColor || '#6366f1' }} 
                          value={slide.videoThumbnailFrame || 0} 
                          onChange={e => updateActiveSlide({ videoThumbnailFrame: Number(e.target.value) })} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Center: Premium Preview Canvas */}
      <section className="flex-1 flex flex-col relative overflow-hidden bg-bg">
        {/* Toolbar Overlay */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-surface/60 backdrop-blur-xl px-6 py-3 rounded-full border border-border/50 flex items-center gap-6 z-10 shadow-2xl">
          <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
            <Monitor size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{format.replace('aspect-', '')}</span>
          </button>
          <div className="w-[1px] h-4 bg-border"></div>
          <div className="flex items-center gap-4">
            <button className="text-text-muted hover:text-primary transition-colors"><Undo2 size={18} /></button>
            <button className="text-text-muted hover:text-primary transition-colors"><Redo2 size={18} /></button>
          </div>
          <div className="w-[1px] h-4 bg-border"></div>
          <button className="text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full hover:brightness-110 active:scale-95 transition-all flex items-center gap-2" style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}>
            <Download size={14} />
            Export
          </button>
        </div>

        {/* Preview Canvas Workspace */}
        <div className="flex-1 flex items-center justify-center p-12 overflow-y-auto">
          {/* Canvas Container - Responsive Aspect Ratio */}
          <div className={`${format} w-full max-w-md bg-surface rounded-xl overflow-hidden shadow-2xl relative group border border-border/50 transition-all duration-500`}>
            
            {/* Base Media (Image or Video) */}
            {activeSlide.type === 'video' ? (
              <video 
                key={activeSlide.id}
                src={activeSlide.mediaUrl}
                className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  transform: `scale(${activeSlide.mediaScale || 1}) translate(${activeSlide.mediaOffsetX || 0}px, ${activeSlide.mediaOffsetY || 0}px)`
                }}
              />
            ) : (
              <img 
                key={activeSlide.id}
                alt="Active Slide Full Render" 
                className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500" 
                src={activeSlide.mediaUrl} 
                style={{
                  transform: `scale(${activeSlide.mediaScale || 1}) translate(${activeSlide.mediaOffsetX || 0}px, ${activeSlide.mediaOffsetY || 0}px)`
                }}
              />
            )}
            
            {/* Configurable Fade Overlay */}
            <div className="absolute inset-0 mix-blend-multiply transition-opacity duration-300" style={{ 
              background: `linear-gradient(to top, ${fadeColor}, ${fadeColor}66, transparent)`,
              opacity: fadeIntensity / 100 
            }}></div>
            <div className="absolute inset-0 mix-blend-overlay" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}1A` }}></div>

            {/* 4-Corner Architecture */}
            <div className="absolute top-6 left-6 z-20">{renderCorner(corners.tl)}</div>
            <div className="absolute top-6 right-6 z-20">{renderCorner(corners.tr)}</div>
            <div className="absolute bottom-6 left-6 z-20">{renderCorner(corners.bl)}</div>
            <div className="absolute bottom-6 right-6 z-20">{renderCorner(corners.br)}</div>

            {/* Center Content (Text/Titles/Comp Image) */}
            <div 
              className={`absolute inset-0 flex flex-col p-10 z-10 pointer-events-none transition-all duration-300 ${getLayoutClasses()} ${getAlignmentClasses()}`}
              style={{ 
                transform: `translate(${activeSlide.customPosition?.x || 0}px, ${activeSlide.customPosition?.y || 0}px)` 
              }}
            >
              {activeSlide.compositionImageUrl && (
                <img 
                  src={activeSlide.compositionImageUrl} 
                  alt="Composition" 
                  className="w-32 h-32 object-cover rounded-xl shadow-2xl mb-6 border-2 border-white/20"
                />
              )}

              {activeSlide.hat && (
                <span className="text-[10px] uppercase tracking-[0.3em] font-black mb-3 drop-shadow-md" style={{ color: activeExpert?.brandColor || '#6366f1' }}>
                  {activeSlide.hat}
                </span>
              )}
              
              {activeSlide.title && (
                <h1 className="text-4xl font-black leading-tight tracking-tighter text-white drop-shadow-xl mb-2" dangerouslySetInnerHTML={{ __html: activeSlide.title.replace('\n', '<br/>') }}></h1>
              )}
              
              {activeSlide.subtitle && (
                <h2 className="text-lg font-bold text-white/90 drop-shadow-lg mb-4">{activeSlide.subtitle}</h2>
              )}
              
              {activeSlide.text && (
                <p className="text-sm font-medium text-white/80 leading-relaxed drop-shadow-lg max-w-[90%] mb-6">
                  {activeSlide.text}
                </p>
              )}

              {activeSlide.cta && (
                <div className="mt-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md border border-white/20" style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}>
                  {activeSlide.cta}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Control: Timeline/Navigation */}
        <div className="h-20 bg-surface/40 backdrop-blur-md flex items-center justify-center gap-12 px-8 border-t border-border shrink-0">
          <button 
            onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
            className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors disabled:opacity-50"
            disabled={activeSlideIndex === 0}
          >
            <ChevronLeft size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Prev</span>
          </button>
          
          {/* Mini Timeline */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                className="w-12 h-1.5 rounded-full cursor-pointer transition-colors"
                style={{ backgroundColor: activeSlideIndex === idx ? (activeExpert?.brandColor || '#6366f1') : 'rgba(255,255,255,0.2)' }}
              ></div>
            ))}
          </div>

          <button 
            onClick={() => setActiveSlideIndex(Math.min(slides.length - 1, activeSlideIndex + 1))}
            className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors disabled:opacity-50"
            disabled={activeSlideIndex === slides.length - 1}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Right Sidebar: Customization & AI */}
      <aside className="w-80 bg-surface border-l border-border flex flex-col shrink-0">
        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          <button 
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 flex items-center justify-center gap-2 transition-colors ${activeTab === 'design' ? 'text-text-main' : 'text-text-muted hover:text-text-main border-transparent'}`} 
            style={{ borderColor: activeTab === 'design' ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}
          >
            <SlidersHorizontal size={14} /> Design
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 flex items-center justify-center gap-2 transition-colors ${activeTab === 'ai' ? 'text-text-main' : 'text-text-muted hover:text-text-main border-transparent'}`}
            style={{ borderColor: activeTab === 'ai' ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}
          >
            <Sparkles size={14} /> AI Agent
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'design' ? (
            <div className="p-6 space-y-8">
              
              {/* 1. Format & Canvas */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-text-main mb-2">
                <LayoutTemplate size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                <h3 className="text-[11px] font-black uppercase tracking-widest">Format & Canvas</h3>
              </div>
              
              <div className="relative">
                <select onChange={handleFormatChange} className="w-full bg-bg border border-border rounded-xl p-3 text-sm focus:outline-none appearance-none text-text-main cursor-pointer" style={{ '--tw-ring-color': activeExpert?.brandColor || '#6366f1' } as any}>
                  <option value="4:5">Carousel / Feed (4:5)</option>
                  <option value="1:1">Single Post (1:1)</option>
                  <option value="9:16">Reels / TikTok (9:16)</option>
                  <option value="16:9">YouTube / Web (16:9)</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>

            <div className="h-[1px] bg-border w-full"></div>

            {/* 2. Layout & Alignment (NEW) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-text-main mb-2">
                <AlignLeft size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                <h3 className="text-[11px] font-black uppercase tracking-widest">Layout & Alignment</h3>
              </div>
              
              <div className="space-y-3">
                <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Text Alignment</label>
                <div className="flex gap-2 bg-bg p-1 rounded-lg border border-border">
                  <button onClick={() => updateActiveSlide({ alignment: 'left' })} className={`flex-1 py-1.5 rounded flex justify-center items-center transition-colors ${activeSlide.alignment === 'left' ? 'bg-surface shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>
                    <AlignLeft size={14} />
                  </button>
                  <button onClick={() => updateActiveSlide({ alignment: 'center' })} className={`flex-1 py-1.5 rounded flex justify-center items-center transition-colors ${activeSlide.alignment === 'center' ? 'bg-surface shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>
                    <AlignCenter size={14} />
                  </button>
                  <button onClick={() => updateActiveSlide({ alignment: 'right' })} className={`flex-1 py-1.5 rounded flex justify-center items-center transition-colors ${activeSlide.alignment === 'right' ? 'bg-surface shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>
                    <AlignRight size={14} />
                  </button>
                  <button onClick={() => updateActiveSlide({ alignment: 'justify' })} className={`flex-1 py-1.5 rounded flex justify-center items-center transition-colors ${activeSlide.alignment === 'justify' ? 'bg-surface shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>
                    <AlignJustify size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Layout Template</label>
                <div className="relative">
                  <select 
                    value={activeSlide.layoutTemplate}
                    onChange={(e) => updateActiveSlide({ layoutTemplate: e.target.value as any })}
                    className="w-full bg-bg border border-border rounded-lg p-2.5 text-xs focus:outline-none appearance-none text-text-main cursor-pointer"
                  >
                    <option value="overlay">Overlay (Center)</option>
                    <option value="bottom">Bottom Anchor</option>
                    <option value="top">Top Anchor</option>
                    <option value="split">Split (Half/Half)</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] text-text-muted uppercase font-bold pl-1 flex items-center gap-1">
                    <Move size={10} /> Manual Position
                  </label>
                  <button 
                    onClick={() => updateActiveSlide({ customPosition: { x: 0, y: 0 } })}
                    className="text-[9px] text-primary hover:underline"
                  >
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center bg-bg border border-border rounded-lg px-2 py-1.5">
                    <span className="text-[9px] font-bold text-text-muted w-3">X</span>
                    <input 
                      type="number" 
                      value={activeSlide.customPosition?.x || 0} 
                      onChange={(e) => updateActiveSlide({ customPosition: { ...activeSlide.customPosition!, x: Number(e.target.value) } })}
                      className="bg-transparent border-none focus:outline-none text-xs w-full text-right text-text-main" 
                    />
                  </div>
                  <div className="flex items-center bg-bg border border-border rounded-lg px-2 py-1.5">
                    <span className="text-[9px] font-bold text-text-muted w-3">Y</span>
                    <input 
                      type="number" 
                      value={activeSlide.customPosition?.y || 0} 
                      onChange={(e) => updateActiveSlide({ customPosition: { ...activeSlide.customPosition!, y: Number(e.target.value) } })}
                      className="bg-transparent border-none focus:outline-none text-xs w-full text-right text-text-main" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-border w-full"></div>

            {/* 3. Media & Fade */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-text-main mb-2">
                <ImageIcon size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                <h3 className="text-[11px] font-black uppercase tracking-widest">Media & Fade</h3>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*,video/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-bg border border-border hover:bg-white/5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={14} /> Upload Media
                </button>
              </div>

              {/* Media Transform Controls */}
              <div className="space-y-3 pt-2 bg-bg p-3 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Crop size={12} className="text-text-muted" />
                  <span className="text-[9px] uppercase font-bold text-text-muted">Media Transform</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-text-muted uppercase font-bold">Scale / Zoom</span>
                    <span className="text-[9px] font-black" style={{ color: activeExpert?.brandColor || '#6366f1' }}>{activeSlide.mediaScale || 1}x</span>
                  </div>
                  <input 
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" 
                    max="3" 
                    min="0.5" 
                    step="0.1"
                    type="range" 
                    value={activeSlide.mediaScale || 1}
                    onChange={(e) => updateActiveSlide({ mediaScale: Number(e.target.value) })}
                    style={{ accentColor: activeExpert?.brandColor || '#6366f1' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="flex items-center bg-surface border border-border rounded px-2 py-1">
                    <span className="text-[9px] font-bold text-text-muted w-3">X</span>
                    <input 
                      type="number" 
                      value={activeSlide.mediaOffsetX || 0} 
                      onChange={(e) => updateActiveSlide({ mediaOffsetX: Number(e.target.value) })}
                      className="bg-transparent border-none focus:outline-none text-xs w-full text-right text-text-main" 
                    />
                  </div>
                  <div className="flex items-center bg-surface border border-border rounded px-2 py-1">
                    <span className="text-[9px] font-bold text-text-muted w-3">Y</span>
                    <input 
                      type="number" 
                      value={activeSlide.mediaOffsetY || 0} 
                      onChange={(e) => updateActiveSlide({ mediaOffsetY: Number(e.target.value) })}
                      className="bg-transparent border-none focus:outline-none text-xs w-full text-right text-text-main" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-text-muted uppercase font-bold">Fade Intensity</span>
                  <span className="text-[10px] font-black" style={{ color: activeExpert?.brandColor || '#6366f1' }}>{fadeIntensity}%</span>
                </div>
                <input 
                  className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" 
                  max="100" 
                  min="0" 
                  type="range" 
                  value={fadeIntensity}
                  onChange={(e) => setFadeIntensity(Number(e.target.value))}
                  style={{ accentColor: activeExpert?.brandColor || '#6366f1' }}
                />
              </div>
              
              <div className="flex items-center justify-between bg-bg border border-border rounded-lg p-2">
                <span className="text-xs font-medium text-text-main pl-2">Fade Color</span>
                <div className="flex items-center gap-2">
                  <input type="color" value={fadeColor} onChange={(e) => setFadeColor(e.target.value)} className="w-6 h-6 rounded bg-transparent border-none cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-border w-full"></div>

            {/* 4. Corner Architecture */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-text-main mb-2">
                <Layers size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                <h3 className="text-[11px] font-black uppercase tracking-widest">4-Corner Layout</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Top Left */}
                <div className="space-y-1">
                  <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Top Left</label>
                  <div className="relative">
                    <select value={corners.tl} onChange={(e) => setCorners({...corners, tl: e.target.value})} className="w-full bg-bg border border-border rounded-lg p-2 text-xs focus:outline-none appearance-none text-text-main">
                      <option>Logo</option>
                      <option>None</option>
                      <option>Series Tag</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>
                </div>
                {/* Top Right */}
                <div className="space-y-1">
                  <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Top Right</label>
                  <div className="relative">
                    <select value={corners.tr} onChange={(e) => setCorners({...corners, tr: e.target.value})} className="w-full bg-bg border border-border rounded-lg p-2 text-xs focus:outline-none appearance-none text-text-main">
                      <option>Series Tag</option>
                      <option>None</option>
                      <option>Logo</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>
                </div>
                {/* Bottom Left */}
                <div className="space-y-1">
                  <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Bottom Left</label>
                  <div className="relative">
                    <select value={corners.bl} onChange={(e) => setCorners({...corners, bl: e.target.value})} className="w-full bg-bg border border-border rounded-lg p-2 text-xs focus:outline-none appearance-none text-text-main">
                      <option>Author / Handle</option>
                      <option>None</option>
                      <option>Logo</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>
                </div>
                {/* Bottom Right */}
                <div className="space-y-1">
                  <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Bottom Right</label>
                  <div className="relative">
                    <select value={corners.br} onChange={(e) => setCorners({...corners, br: e.target.value})} className="w-full bg-bg border border-border rounded-lg p-2 text-xs focus:outline-none appearance-none text-text-main">
                      <option>Slide Counter</option>
                      <option>Arrow (Next)</option>
                      <option>Swipe Right</option>
                      <option>Watermark</option>
                      <option>None</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 rounded-xl border" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}1A`, borderColor: `${activeExpert?.brandColor || '#6366f1'}33` }}>
                <input type="checkbox" id="applyAll" defaultChecked className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: activeExpert?.brandColor || '#6366f1' }} />
                <label htmlFor="applyAll" className="text-xs font-medium cursor-pointer" style={{ color: activeExpert?.brandColor || '#6366f1' }}>Apply layout to all slides</label>
              </div>
            </div>

          </div>
          ) : (
            <div className="p-6 flex flex-col h-full">
              {/* AI Agent Header */}
              <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-bg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}33`, color: activeExpert?.brandColor || '#6366f1' }}>
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-text-main">{activeAgent?.name || 'AI Assistant'}</h3>
                    <p className="text-[10px] text-text-muted">Context: {activeExpert?.name || 'Expert OS'}</p>
                  </div>
                </div>
                <div className="relative">
                  <select 
                    className="bg-surface border border-border rounded-lg text-xs p-2 focus:outline-none appearance-none pr-8 cursor-pointer"
                    value={activeAgent?.id || ''}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                  >
                    {expertAgents.map(agent => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <input 
                  type="file" 
                  ref={csvInputRef} 
                  onChange={handleCSVUpload} 
                  accept=".csv" 
                  className="hidden" 
                />
                <button onClick={() => csvInputRef.current?.click()} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                  <FileSpreadsheet size={16} className="text-text-muted group-hover:text-primary transition-colors" style={{ color: activeExpert?.brandColor }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Import CSV</span>
                </button>
                <button onClick={downloadCSVTemplate} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                  <Download size={16} className="text-text-muted group-hover:text-primary transition-colors" style={{ color: activeExpert?.brandColor }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Get Template</span>
                </button>
                <button onClick={copyAIPrompt} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                  <Type size={16} className="text-text-muted group-hover:text-primary transition-colors" style={{ color: activeExpert?.brandColor }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Copy Prompt</span>
                </button>
                <button className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
                  <CalendarClock size={16} className="text-text-muted group-hover:text-primary transition-colors" style={{ color: activeExpert?.brandColor }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Schedule</span>
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {aiChat.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'agent' && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}33`, color: activeExpert?.brandColor || '#6366f1' }}>
                        <Bot size={12} />
                      </div>
                    )}
                    <div className={`p-3 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-surface border border-border text-text-main' : 'bg-bg border border-border text-text-muted'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Input (Fixed at bottom) */}
        <div className="p-6 bg-bg/50 border-t border-border shrink-0">
          <div className="relative group">
            <textarea 
              className="w-full bg-surface border border-border rounded-xl text-sm text-text-main p-4 pr-12 h-20 resize-none transition-all placeholder:text-text-muted/50 focus:outline-none" 
              placeholder={activeTab === 'ai' ? "Tell the Visual Director what to do..." : "Ask AI to edit text, change layout, or swap media..."}
              style={{ '--tw-ring-color': activeExpert?.brandColor || '#6366f1' } as any}
            ></textarea>
            <button className="absolute bottom-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white hover:brightness-110 transition-all active:scale-95 shadow-lg" style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
