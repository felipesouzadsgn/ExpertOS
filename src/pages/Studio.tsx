import { useState } from 'react';
import { useExpertStore } from '@/store/expertStore';
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
  Move
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
};

export function Studio() {
  const activeExpert = useExpertStore(state => state.activeExpert);

  const [format, setFormat] = useState('aspect-[4/5]');
  const [fadeIntensity, setFadeIntensity] = useState(90);
  const [fadeColor, setFadeColor] = useState('#09090B');
  
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
            <img 
              key={activeSlide.id}
              alt="Active Slide Full Render" 
              className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500" 
              src={activeSlide.mediaUrl} 
            />
            
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
          <button className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 text-text-main flex items-center justify-center gap-2" style={{ borderColor: activeExpert?.brandColor || '#6366f1' }}>
            <SlidersHorizontal size={14} /> Design
          </button>
          <button className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors flex items-center justify-center gap-2">
            <Sparkles size={14} /> AI Edit
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
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
                <button className="flex-1 bg-bg border border-border hover:bg-white/5 py-2 rounded-lg text-xs font-medium transition-colors">Replace Media</button>
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
                      <option>None</option>
                      <option>Watermark</option>
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
        </div>

        {/* AI Input (Fixed at bottom) */}
        <div className="p-6 bg-bg/50 border-t border-border shrink-0">
          <div className="relative group">
            <textarea 
              className="w-full bg-surface border border-border rounded-xl text-sm text-text-main p-4 pr-12 h-20 resize-none transition-all placeholder:text-text-muted/50 focus:outline-none" 
              placeholder="Ask AI to edit text, change layout, or swap media..."
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
