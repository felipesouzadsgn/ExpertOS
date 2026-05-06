import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';
import {
  Monitor, Undo2, Redo2, Download, ChevronLeft, ChevronRight, ChevronDown,
  Hexagon, Sparkles, Send, Play, Video, Image as ImageIcon, Type,
  LayoutTemplate, SlidersHorizontal, Layers, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Move, ArrowRight, ChevronsRight, Upload,
  Crop, Bot, FileSpreadsheet, Wand2, ImagePlus, CalendarClock,
  CheckCircle2, Brain, ZoomIn, ZoomOut, Grid3X3, PanelLeft, PanelRight,
  Palette, BookmarkPlus, BookmarkCheck, Trash2, FileImage, FileCode,
  Package, LayoutGrid, Maximize2, RotateCcw, MousePointerClick,
  Copy, Check
} from 'lucide-react';

/* ─────────────────────────── TYPES ─────────────────────────── */

type SlideType = 'image' | 'video';
type Alignment = 'left' | 'center' | 'right' | 'justify';
type LayoutTemplate = 'overlay' | 'bottom' | 'top' | 'split' | 'minimal' | 'magazine' | 'quote' | 'data';
type CornerType = 'Logo' | 'Series Tag' | 'Author / Handle' | 'Slide Counter' | 'Arrow (Next)' | 'Swipe Right' | 'None';
type ExportFormat = 'png' | 'jpg';
type EditorMode = 'carousel' | 'post';

interface Slide {
  id: number;
  type: SlideType;
  mediaUrl: string;
  compositionImageUrl?: string;
  hat?: string;
  title: string;
  subtitle?: string;
  text: string;
  cta?: string;
  alignment: Alignment;
  layoutTemplate: LayoutTemplate;
  customPosition?: { x: number; y: number };
  videoTrimStart?: number;
  videoTrimEnd?: number;
  videoPlaybackSpeed?: number;
  videoThumbnailFrame?: number;
  mediaScale?: number;
  mediaOffsetX?: number;
  mediaOffsetY?: number;
}

interface LayoutPreset {
  id: string;
  name: string;
  icon: typeof LayoutTemplate;
  layoutTemplate: LayoutTemplate;
  alignment: Alignment;
  fadeIntensity: number;
  fadeColor: string;
  corners: { tl: CornerType; tr: CornerType; bl: CornerType; br: CornerType };
}

interface SavedLayout {
  id: string;
  name: string;
  createdAt: string;
  layoutTemplate: LayoutTemplate;
  alignment: Alignment;
  fadeIntensity: number;
  fadeColor: string;
  corners: { tl: CornerType; tr: CornerType; bl: CornerType; br: CornerType };
}

/* ───────────────────── LAYOUT PRESETS ──────────────────────── */

const layoutPresets: LayoutPreset[] = [
  {
    id: 'preset-overlay',
    name: 'Overlay Center',
    icon: LayoutTemplate,
    layoutTemplate: 'overlay',
    alignment: 'center',
    fadeIntensity: 85,
    fadeColor: '#09090B',
    corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Author / Handle', br: 'Slide Counter' },
  },
  {
    id: 'preset-bottom',
    name: 'Bottom Anchor',
    icon: AlignLeft,
    layoutTemplate: 'bottom',
    alignment: 'left',
    fadeIntensity: 70,
    fadeColor: '#000000',
    corners: { tl: 'Logo', tr: 'None', bl: 'Author / Handle', br: 'Arrow (Next)' },
  },
  {
    id: 'preset-minimal',
    name: 'Minimal Clean',
    icon: Type,
    layoutTemplate: 'minimal',
    alignment: 'left',
    fadeIntensity: 40,
    fadeColor: '#09090B',
    corners: { tl: 'None', tr: 'None', bl: 'Author / Handle', br: 'None' },
  },
  {
    id: 'preset-magazine',
    name: 'Magazine Editorial',
    icon: LayoutGrid,
    layoutTemplate: 'magazine',
    alignment: 'justify',
    fadeIntensity: 60,
    fadeColor: '#1a1a2e',
    corners: { tl: 'Series Tag', tr: 'Logo', bl: 'None', br: 'Slide Counter' },
  },
  {
    id: 'preset-quote',
    name: 'Quote Card',
    icon: Type,
    layoutTemplate: 'quote',
    alignment: 'center',
    fadeIntensity: 50,
    fadeColor: '#0f0f0f',
    corners: { tl: 'None', tr: 'None', bl: 'Author / Handle', br: 'None' },
  },
  {
    id: 'preset-data',
    name: 'Data / Stats',
    icon: Package,
    layoutTemplate: 'data',
    alignment: 'center',
    fadeIntensity: 75,
    fadeColor: '#0a0a0a',
    corners: { tl: 'Logo', tr: 'Series Tag', bl: 'None', br: 'Slide Counter' },
  },
  {
    id: 'preset-split',
    name: 'Split Screen',
    icon: Maximize2,
    layoutTemplate: 'split',
    alignment: 'left',
    fadeIntensity: 30,
    fadeColor: '#09090B',
    corners: { tl: 'Logo', tr: 'None', bl: 'None', br: 'Swipe Right' },
  },
  {
    id: 'preset-top',
    name: 'Top Anchor',
    icon: AlignLeft,
    layoutTemplate: 'top',
    alignment: 'left',
    fadeIntensity: 65,
    fadeColor: '#000000',
    corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Swipe Right', br: 'Author / Handle' },
  },
];

/* ────────────────────── MOCK SAVED LAYOUTS ─────────────────── */

const mockSavedLayouts: SavedLayout[] = [
  {
    id: 'saved-1',
    name: 'Aria Luxury',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    layoutTemplate: 'overlay',
    alignment: 'center',
    fadeIntensity: 90,
    fadeColor: '#0c0c1d',
    corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Author / Handle', br: 'Slide Counter' },
  },
  {
    id: 'saved-2',
    name: 'Marcus Data-Driven',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    layoutTemplate: 'data',
    alignment: 'left',
    fadeIntensity: 80,
    fadeColor: '#0f172a',
    corners: { tl: 'Logo', tr: 'None', bl: 'Author / Handle', br: 'None' },
  },
];

/* ────────────────────── HELPER FUNCTIONS ───────────────────── */

function generateId() { return Date.now() + Math.random().toString(36).slice(2, 8); }

function getAspectClass(format: string) {
  if (format.includes('4/5')) return 'aspect-[4/5]';
  if (format.includes('1/1') || format.includes('square')) return 'aspect-square';
  if (format.includes('9/16')) return 'aspect-[9/16]';
  if (format.includes('16/9')) return 'aspect-video';
  return 'aspect-[4/5]';
}

function getAlignmentClasses(alignment: Alignment) {
  switch (alignment) {
    case 'center': return 'items-center text-center';
    case 'right': return 'items-end text-right';
    case 'justify': return 'items-start text-justify';
    default: return 'items-start text-left';
  }
}

function getLayoutClasses(layout: LayoutTemplate) {
  switch (layout) {
    case 'bottom': return 'justify-end pb-24';
    case 'top': return 'justify-start pt-24';
    case 'split': return 'justify-center w-1/2 bg-black/40 backdrop-blur-sm h-full p-8';
    case 'minimal': return 'justify-center p-12';
    case 'magazine': return 'justify-end pb-16 px-10';
    case 'quote': return 'justify-center p-14';
    case 'data': return 'justify-center p-10';
    default: return 'justify-center';
  }
}

/* ───────────────────────── COMPONENT ───────────────────────── */

export function Studio() {
  const activeExpert = useExpertStore(state => state.activeExpert);
  const { getAgentsByExpert } = useAgentStore();

  /* ── Editor Mode ── */
  const [editorMode, setEditorMode] = useState<EditorMode>('carousel');

  /* ── Canvas Infinite ── */
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  /* ── Sidebars ── */
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  /* ── Slides ── */
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1, type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      hat: 'EXPERT INSIGHTS',
      title: 'THE ARCHITECTURE\nOF OS',
      subtitle: 'Designing for the future',
      text: 'Mastering the visual hierarchy of elite professional workspaces through intentional depth and structure.',
      cta: 'SWIPE TO LEARN',
      alignment: 'left', layoutTemplate: 'overlay',
      customPosition: { x: 0, y: 0 }
    },
    {
      id: 2, type: 'video',
      mediaUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
      title: 'B-ROLL TRANSITION',
      text: '[Video: Slow pan across luxury office] Why borders are a thing of the past.',
      alignment: 'center', layoutTemplate: 'bottom',
      customPosition: { x: 0, y: 0 }
    }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = slides[activeSlideIndex];

  /* ── Format & Design ── */
  const [format, setFormat] = useState('aspect-[4/5]');
  const [fadeIntensity, setFadeIntensity] = useState(90);
  const [fadeColor, setFadeColor] = useState('#09090B');

  /* ── Corners ── */
  const [corners, setCorners] = useState({
    tl: 'Logo' as CornerType,
    tr: 'Series Tag' as CornerType,
    bl: 'Author / Handle' as CornerType,
    br: 'Slide Counter' as CornerType,
  });

  /* ── Saved Layouts ── */
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>(mockSavedLayouts);
  const [showSaveLayoutModal, setShowSaveLayoutModal] = useState(false);
  const [newLayoutName, setNewLayoutName] = useState('');

  /* ── Tabs & Panels ── */
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'ai' | 'layouts'>('content');
  const [mobilePanel, setMobilePanel] = useState<'slides' | 'canvas' | 'design'>('canvas');

  /* ── Export ── */
  const [exporting, setExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [exportAll, setExportAll] = useState(false);

  /* ── AI ── */
  const expertAgents = activeExpert ? getAgentsByExpert(activeExpert.id) : [];
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const visualAgent = expertAgents.find(a => a.role.includes('Visual') || a.role.includes('Design')) || expertAgents[0];
  const activeAgent = expertAgents.find(a => a.id === selectedAgentId) || visualAgent;
  const [aiChat, setAiChat] = useState([
    { id: 1, role: 'agent' as const, text: "Hi! I'm your AI Assistant. How can I help you build this carousel?" }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);

  /* ── Refs ── */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const canvasPreviewRef = useRef<HTMLDivElement>(null);

  /* ── Effects ── */
  useEffect(() => {
    if (activeExpert && activeAgent) {
      setAiChat([{ id: Date.now(), role: 'agent', text: `Hi! I'm ${activeAgent.name}. I've loaded ${activeExpert.name}'s brand guidelines, tone of voice, and recent research context. How can I help you build this carousel?` }]);
    } else if (activeExpert) {
      setAiChat([{ id: Date.now(), role: 'agent', text: `Hi! I'm your AI Assistant. Please select an agent to load their specific skills.` }]);
    } else {
      setAiChat([{ id: Date.now(), role: 'agent', text: `Hi! Please select an expert to load their brand guidelines and context.` }]);
    }
  }, [activeExpert, activeAgent]);

  /* ── Canvas Infinite: Wheel Zoom ── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(z => Math.min(Math.max(z + delta, 0.3), 3));
    }
  }, []);

  /* ── Canvas Infinite: Pan Start ── */
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  }, [pan]);

  /* ── Canvas Infinite: Pan Move ── */
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  }, [isPanning]);

  /* ── Canvas Infinite: Pan End ── */
  const handleCanvasMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  /* ── Reset View ── */
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  /* ── Update Slide ── */
  const updateActiveSlide = (updates: Partial<Slide>) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex] = { ...newSlides[activeSlideIndex], ...updates };
    setSlides(newSlides);
  };

  /* ── Add Slide ── */
  const addSlide = (type: SlideType) => {
    const newSlide: Slide = {
      id: Date.now(), type,
      mediaUrl: type === 'image'
        ? 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop',
      title: editorMode === 'post' ? 'NEW POST' : `SLIDE ${slides.length + 1}`,
      text: 'Add your content here...',
      alignment: 'left', layoutTemplate: 'overlay',
      customPosition: { x: 0, y: 0 }
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  /* ── Duplicate Slide ── */
  const duplicateSlide = (index: number) => {
    const slide = slides[index];
    const newSlide = { ...slide, id: Date.now() };
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, newSlide);
    setSlides(newSlides);
    setActiveSlideIndex(index + 1);
  };

  /* ── Delete Slide ── */
  const deleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    setActiveSlideIndex(Math.min(activeSlideIndex, newSlides.length - 1));
  };

  /* ── Move Slide ── */
  const moveSlide = (from: number, to: number) => {
    if (to < 0 || to >= slides.length) return;
    const newSlides = [...slides];
    const [moved] = newSlides.splice(from, 1);
    newSlides.splice(to, 0, moved);
    setSlides(newSlides);
    setActiveSlideIndex(to);
  };

  /* ── Apply Layout Preset ── */
  const applyPreset = (preset: LayoutPreset) => {
    setFadeIntensity(preset.fadeIntensity);
    setFadeColor(preset.fadeColor);
    setCorners({ ...preset.corners });
    updateActiveSlide({
      layoutTemplate: preset.layoutTemplate,
      alignment: preset.alignment,
    });
  };

  /* ── Apply Saved Layout ── */
  const applySavedLayout = (layout: SavedLayout) => {
    setFadeIntensity(layout.fadeIntensity);
    setFadeColor(layout.fadeColor);
    setCorners({ ...layout.corners });
    updateActiveSlide({
      layoutTemplate: layout.layoutTemplate,
      alignment: layout.alignment,
    });
  };

  /* ── Save Current Layout ── */
  const saveCurrentLayout = () => {
    if (!newLayoutName.trim()) return;
    const newLayout: SavedLayout = {
      id: `saved-${generateId()}`,
      name: newLayoutName.trim(),
      createdAt: new Date().toISOString(),
      layoutTemplate: activeSlide.layoutTemplate,
      alignment: activeSlide.alignment,
      fadeIntensity,
      fadeColor,
      corners: { ...corners },
    };
    setSavedLayouts([newLayout, ...savedLayouts]);
    setNewLayoutName('');
    setShowSaveLayoutModal(false);
  };

  /* ── Delete Saved Layout ── */
  const deleteSavedLayout = (id: string) => {
    setSavedLayouts(savedLayouts.filter(l => l.id !== id));
  };

  /* ── EXPORT: Render to Canvas ── */
  const exportSlide = async (slideIndex?: number, formatType: ExportFormat = exportFormat) => {
    const idx = slideIndex ?? activeSlideIndex;
    const slide = slides[idx];
    if (!slide) return;

    setExporting(true);

    // Create off-screen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) { setExporting(false); return; }

    // Determine dimensions based on format
    let width = 1080, height = 1350; // default 4:5
    if (format.includes('square') || format.includes('1/1')) { width = 1080; height = 1080; }
    else if (format.includes('9/16')) { width = 1080; height = 1920; }
    else if (format.includes('16/9')) { width = 1920; height = 1080; }

    canvas.width = width;
    canvas.height = height;

    // Fill background
    ctx.fillStyle = '#09090B';
    ctx.fillRect(0, 0, width, height);

    // Draw media (image)
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = slide.mediaUrl;
    }).catch(() => {
      // fallback: draw a gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#1a1a2e');
      grad.addColorStop(1, '#16213e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });

    if (img.complete && img.naturalWidth > 0) {
      const scale = slide.mediaScale || 1;
      const offsetX = slide.mediaOffsetX || 0;
      const offsetY = slide.mediaOffsetY || 0;
      const drawW = width * scale;
      const drawH = (img.naturalHeight / img.naturalWidth) * drawW;
      ctx.drawImage(img, offsetX + (width - drawW) / 2, offsetY + (height - drawH) / 2, drawW, drawH);
    }

    // Draw fade overlay
    const fadeAlpha = fadeIntensity / 100;
    const fadeGrad = ctx.createLinearGradient(0, height * 0.3, 0, height);
    fadeGrad.addColorStop(0, fadeColor + '00');
    fadeGrad.addColorStop(1, fadeColor + Math.round(fadeAlpha * 255).toString(16).padStart(2, '0'));
    ctx.fillStyle = fadeGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw brand tint
    ctx.fillStyle = (activeExpert?.brandColor || '#6366f1') + '1A';
    ctx.fillRect(0, 0, width, height);

    // Draw text content
    const margin = width * 0.08;
    const textX = slide.alignment === 'center' ? width / 2 : slide.alignment === 'right' ? width - margin : margin;
    const textAlign = slide.alignment === 'center' ? 'center' : slide.alignment === 'right' ? 'right' : 'left';
    let currentY = height * 0.55;

    // Adjust Y based on layout
    if (slide.layoutTemplate === 'bottom') currentY = height * 0.65;
    if (slide.layoutTemplate === 'top') currentY = height * 0.18;
    if (slide.layoutTemplate === 'minimal') currentY = height * 0.45;
    if (slide.layoutTemplate === 'quote') currentY = height * 0.42;
    if (slide.layoutTemplate === 'data') currentY = height * 0.4;

    ctx.textAlign = textAlign as CanvasTextAlign;
    ctx.textBaseline = 'top';

    // Hat
    if (slide.hat) {
      ctx.font = `bold ${width * 0.022}px sans-serif`;
      ctx.fillStyle = activeExpert?.brandColor || '#6366f1';
      ctx.letterSpacing = `${width * 0.003}px`;
      ctx.fillText(slide.hat.toUpperCase(), textX, currentY);
      currentY += width * 0.045;
    }

    // Title
    if (slide.title) {
      const lines = slide.title.split('\n');
      ctx.font = `900 ${width * 0.065}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      lines.forEach(line => {
        ctx.fillText(line, textX, currentY);
        currentY += width * 0.08;
      });
      currentY += width * 0.02;
    }

    // Subtitle
    if (slide.subtitle) {
      ctx.font = `bold ${width * 0.032}px sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillText(slide.subtitle, textX, currentY);
      currentY += width * 0.06;
    }

    // Body text
    if (slide.text) {
      ctx.font = `500 ${width * 0.026}px sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      const maxTextWidth = width * 0.84;
      const words = slide.text.split(' ');
      let line = '';
      words.forEach(word => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTextWidth && line !== '') {
          ctx.fillText(line, textX, currentY);
          line = word + ' ';
          currentY += width * 0.04;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, textX, currentY);
      currentY += width * 0.07;
    }

    // CTA
    if (slide.cta) {
      const ctaText = slide.cta.toUpperCase();
      ctx.font = `900 ${width * 0.022}px sans-serif`;
      const ctaMetrics = ctx.measureText(ctaText);
      const ctaW = ctaMetrics.width + width * 0.06;
      const ctaH = width * 0.055;
      const ctaX = textAlign === 'center' ? textX - ctaW / 2 : textAlign === 'right' ? textX - ctaW : textX;
      ctx.fillStyle = activeExpert?.brandColor || '#6366f1';
      ctx.beginPath();
      ctx.roundRect(ctaX, currentY, ctaW, ctaH, width * 0.02);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(ctaText, ctaX + ctaW / 2, currentY + ctaH * 0.32);
    }

    // Corners
    const cornerMargin = width * 0.04;
    const cornerY = height * 0.04;
    const cornerBottomY = height - cornerMargin - width * 0.035;
    ctx.font = `bold ${width * 0.018}px sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'left';

    // Top Left
    if (corners.tl === 'Logo') {
      ctx.fillStyle = activeExpert?.brandColor || '#6366f1';
      ctx.fillRect(cornerMargin, cornerY, width * 0.04, width * 0.04);
    } else if (corners.tl === 'Series Tag') {
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.roundRect(cornerMargin, cornerY, width * 0.18, width * 0.035, width * 0.008);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'center';
      ctx.fillText('EXPERT SERIES', cornerMargin + width * 0.09, cornerY + width * 0.01);
    }

    // Top Right
    if (corners.tr === 'Series Tag') {
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.roundRect(width - cornerMargin - width * 0.18, cornerY, width * 0.18, width * 0.035, width * 0.008);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'center';
      ctx.fillText('EXPERT SERIES', width - cornerMargin - width * 0.09, cornerY + width * 0.01);
    }

    // Bottom Left
    if (corners.bl === 'Author / Handle') {
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = `bold ${width * 0.02}px sans-serif`;
      ctx.fillText(activeExpert?.name?.toUpperCase() || 'EXPERT', cornerMargin, cornerBottomY);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = `${width * 0.016}px sans-serif`;
      ctx.fillText(activeExpert?.handle || '@expert.os', cornerMargin, cornerBottomY + width * 0.028);
    }

    // Bottom Right
    if (corners.br === 'Slide Counter') {
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = `bold ${width * 0.02}px sans-serif`;
      ctx.fillText(`${String(idx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`, width - cornerMargin, cornerBottomY);
    } else if (corners.br === 'Swipe Right') {
      ctx.textAlign = 'right';
      ctx.fillStyle = activeExpert?.brandColor || '#6366f1';
      ctx.font = `bold ${width * 0.018}px sans-serif`;
      ctx.fillText('SWIPE →', width - cornerMargin, cornerBottomY);
    }

    // Download
    const mime = formatType === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = formatType === 'jpg' ? 0.92 : undefined;
    canvas.toBlob((blob) => {
      if (!blob) { setExporting(false); return; }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const name = activeExpert?.handle?.replace('@', '') || 'expert';
      link.download = `${name}_${editorMode}_slide${idx + 1}_${width}x${height}.${formatType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExporting(false);
    }, mime, quality);
  };

  /* ── AI COPY GENERATION ── */
  const generateAICopy = async () => {
    if (!activeExpert) return;
    setIsGeneratingCopy(true);

    // Simulate AI generation delay
    await new Promise(r => setTimeout(r, 1500));

    const copies = [
      {
        hat: `${activeExpert.niche.toUpperCase()} INSIGHT`,
        title: `A Verdade Sobre\n${activeExpert.niche}`,
        subtitle: `O que ninguém te conta`,
        text: `Baseado na análise de ${activeExpert.name}, descobrimos que 73% dos profissionais em ${activeExpert.niche.toLowerCase()} cometem o mesmo erro fundamental. Aqui está o que você precisa saber para se destacar.`,
        cta: 'LEIA MAIS',
      },
      {
        hat: 'CASE STUDY',
        title: `Como Escalar\n${activeExpert.niche}`,
        subtitle: `Framework validado`,
        text: `${activeExpert.name} desenvolveu um método único para dominar ${activeExpert.niche.toLowerCase()}. Em 90 dias, seus clientes viram resultados que antes levavam anos para alcançar.`,
        cta: 'ACESSE O MÉTODO',
      },
      {
        hat: 'ERRO COMUM',
        title: `Pare de Fazer\nIsso Agora`,
        subtitle: `A mudança começa hoje`,
        text: `A maior lição que ${activeExpert.name} aprendeu em ${activeExpert.niche.toLowerCase()}: o que funcionava em 2023 não funciona mais. Aqui está o novo playbook.`,
        cta: 'SALVE ESSE POST',
      },
    ];

    const randomCopy = copies[Math.floor(Math.random() * copies.length)];

    updateActiveSlide({
      hat: randomCopy.hat,
      title: randomCopy.title,
      subtitle: randomCopy.subtitle,
      text: randomCopy.text,
      cta: randomCopy.cta,
    });

    setAiChat(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: 'Gere copy para este slide baseado no perfil do expert.' },
      { id: Date.now() + 1, role: 'agent', text: `Gerado! Usei o tom de voz de ${activeExpert.name} (${activeExpert.toneOfVoice?.slice(0, 60)}...), focando em ${activeExpert.niche}. O copy está alinhado com o ICP: ${activeExpert.icp?.slice(0, 80)}...` },
    ]);

    setIsGeneratingCopy(false);
  };

  /* ── AI CHAT SEND ── */
  const handleAiSend = () => {
    if (!aiInput.trim()) return;
    const text = aiInput.trim();
    setAiInput('');
    setAiChat(prev => [...prev, { id: Date.now(), role: 'user', text }]);

    // Simple response simulation
    setTimeout(() => {
      setAiChat(prev => [...prev, { id: Date.now() + 1, role: 'agent', text: 'Entendi! Vou analisar o contexto do expert e sugerir ajustes visuais e de copy para maximizar o engajamento.' }]);
    }, 800);
  };

  /* ── CSV HANDLERS ── */
  const downloadCSVTemplate = () => {
    const headers = ['mode', 'type', 'backgroundMediaUrl', 'hat', 'title', 'subtitle', 'text', 'cta', 'alignment', 'layoutTemplate'];
    const exampleRow1 = ['carousel', 'image', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564', 'EXPERT INSIGHTS', 'THE ARCHITECTURE\nOF OS', 'Designing for the future', 'Mastering the visual hierarchy of elite professional workspaces.', 'SWIPE TO LEARN', 'left', 'overlay'];
    const exampleRow2 = ['post', 'image', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670', 'CASE STUDY', 'RESULTADOS REAIS', 'Transformação em 90 dias', 'Descubra como nossos clientes alcançaram resultados extraordinários.', 'LINK NA BIO', 'center', 'bottom'];

    const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const csvContent = [headers.join(','), exampleRow1.map(escapeCSV).join(','), exampleRow2.map(escapeCSV).join(',')].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'contentos_batch_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        if (char === '"' && text[i + 1] === '"') { currentCell += '"'; i++; }
        else if (char === '"') { inQuotes = !inQuotes; }
        else if (char === ',' && !inQuotes) { currentRow.push(currentCell); currentCell = ''; }
        else if ((char === '\n' || char === '\r') && !inQuotes) {
          if (char === '\r' && text[i + 1] === '\n') i++;
          currentRow.push(currentCell);
          if (currentRow.some(cell => cell.trim() !== '')) rows.push(currentRow);
          currentRow = []; currentCell = '';
        } else { currentCell += char; }
      }
      if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell);
        if (currentRow.some(cell => cell.trim() !== '')) rows.push(currentRow);
      }

      const dataRows = rows.slice(1);
      if (dataRows.length === 0) return;

      const newSlides: Slide[] = dataRows.map((row, index) => ({
        id: Date.now() + index,
        type: (row[1] === 'video' ? 'video' : 'image') as SlideType,
        mediaUrl: row[2] || 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        hat: row[3] || '',
        title: row[4] || '',
        subtitle: row[5] || '',
        text: row[6] || '',
        cta: row[7] || '',
        alignment: (['left', 'center', 'right', 'justify'].includes(row[8]) ? row[8] : 'left') as Alignment,
        layoutTemplate: (['overlay', 'bottom', 'top', 'split', 'minimal', 'magazine', 'quote', 'data'].includes(row[9]) ? row[9] : 'overlay') as LayoutTemplate,
        customPosition: { x: 0, y: 0 }
      }));

      setSlides(newSlides);
      setActiveSlideIndex(0);

      // Detect mode from CSV
      const firstMode = dataRows[0]?.[0]?.toLowerCase();
      if (firstMode === 'post') setEditorMode('post');
      else if (firstMode === 'carousel') setEditorMode('carousel');
    };
    reader.readAsText(file);
    if (csvInputRef.current) csvInputRef.current.value = '';
  };

  /* ── FILE UPLOAD ── */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    updateActiveSlide({ mediaUrl: url, type: isVideo ? 'video' : 'image', mediaScale: 1, mediaOffsetX: 0, mediaOffsetY: 0 });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ── FORMAT CHANGE ── */
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val.includes('4/5')) setFormat('aspect-[4/5]');
    else if (val.includes('1/1')) setFormat('aspect-square');
    else if (val.includes('9/16')) setFormat('aspect-[9/16]');
    else if (val.includes('16/9')) setFormat('aspect-video');
  };

  /* ── RENDER CORNER ── */
  const renderCorner = (type: CornerType) => {
    switch (type) {
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
      default: return null;
    }
  };

  /* ═══════════════════════════ RENDER ═══════════════════════════ */

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden bg-bg text-text-main">
      {/* Mobile Panel Tabs */}
      <div className="lg:hidden flex border-b border-border bg-surface shrink-0">
        {(['slides', 'canvas', 'design'] as const).map((panel) => (
          <button
            key={panel}
            onClick={() => setMobilePanel(panel)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mobilePanel === panel ? 'text-text-main border-b-2' : 'text-text-muted'}`}
            style={{ borderColor: mobilePanel === panel ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}
          >
            {panel === 'slides' && <Layers size={14} />}
            {panel === 'canvas' && <Monitor size={14} />}
            {panel === 'design' && <SlidersHorizontal size={14} />}
            {panel === 'slides' ? 'Slides' : panel === 'canvas' ? 'Canvas' : 'Design'}
          </button>
        ))}
      </div>

      {/* ═══════ LEFT SIDEBAR: Slide Navigator ═══════ */}
      <aside
        className={`relative bg-surface border-r border-border flex flex-col overflow-hidden shrink-0 transition-all duration-300 ${
          leftCollapsed ? 'lg:w-12' : 'lg:w-[340px]'
        } ${mobilePanel !== 'slides' ? 'hidden lg:flex' : 'flex w-full'}`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setLeftCollapsed(!leftCollapsed)}
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-12 bg-surface border border-border rounded-r-lg items-center justify-center text-text-muted hover:text-text-main transition-colors"
        >
          {leftCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {!leftCollapsed ? (
          <>
            {/* Header */}
            <div className="p-5 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">Content Blocks</h2>
                {/* Mode Toggle */}
                <div className="flex bg-bg rounded-lg border border-border p-0.5">
                  <button
                    onClick={() => { setEditorMode('carousel'); if (slides.length === 1) addSlide('image'); }}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${editorMode === 'carousel' ? 'bg-surface text-text-main' : 'text-text-muted'}`}
                  >
                    Carrossel
                  </button>
                  <button
                    onClick={() => { setEditorMode('post'); setSlides(slides.slice(0, 1)); setActiveSlideIndex(0); }}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${editorMode === 'post' ? 'bg-surface text-text-main' : 'text-text-muted'}`}
                  >
                    Post
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addSlide('image')} className="flex-1 bg-white/5 hover:bg-white/10 text-primary text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <ImageIcon size={14} /> {editorMode === 'post' ? 'Novo Post' : 'Add Slide'}
                </button>
                {editorMode === 'carousel' && (
                  <button onClick={() => addSlide('video')} className="flex-1 bg-white/5 hover:bg-white/10 text-primary text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                    <Video size={14} /> Add Video
                  </button>
                )}
              </div>
            </div>

            {/* Slide List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar min-h-0">
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
                      <img alt={`Slide ${index + 1}`} className={`w-full h-full object-cover ${slide.type === 'video' ? 'opacity-70' : ''}`} src={slide.mediaUrl} />
                      {slide.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center"><Play size={16} className="text-white drop-shadow-md" fill="white" /></div>
                      )}
                      <div className="absolute top-1 right-1 bg-black/50 rounded p-0.5">
                        {slide.type === 'video' ? <Video size={10} className="text-white" /> : <ImageIcon size={10} className="text-white" />}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest transition-colors" style={{ color: activeSlideIndex === index ? (activeExpert?.brandColor || '#6366f1') : '#a1a1aa' }}>
                        {editorMode === 'post' ? 'Post' : `Slide ${index + 1}`}
                      </span>
                      <span className="text-sm font-medium truncate w-full">{slide.title || 'Untitled'}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); duplicateSlide(index); }} className="p-1 hover:text-primary transition-colors"><Copy size={12} /></button>
                      <button onClick={(e) => { e.stopPropagation(); moveSlide(index, index - 1); }} className="p-1 hover:text-primary transition-colors disabled:opacity-30" disabled={index === 0}><ChevronLeft size={12} /></button>
                      <button onClick={(e) => { e.stopPropagation(); moveSlide(index, index + 1); }} className="p-1 hover:text-primary transition-colors disabled:opacity-30" disabled={index === slides.length - 1}><ChevronRight size={12} /></button>
                      <button onClick={(e) => { e.stopPropagation(); deleteSlide(index); }} className="p-1 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
                    </div>
                  </div>

                  {/* Expanded Editor for Active Slide */}
                  {activeSlideIndex === index && (
                    <div className="mt-4 space-y-3 border-t border-border/50 pt-4" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted">HAT (Eyebrow Text)</label>
                        <input className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-main p-2 focus:outline-none focus:ring-1 focus:ring-primary/50"
                          value={slide.hat || ''} onChange={(e) => updateActiveSlide({ hat: e.target.value })} placeholder="e.g. EXPERT INSIGHTS" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted">Title</label>
                        <textarea className="w-full bg-bg border border-border rounded-lg text-sm font-bold text-text-main p-2 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-16"
                          value={slide.title} onChange={(e) => updateActiveSlide({ title: e.target.value })} placeholder="Main Headline" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted">Subtitle</label>
                        <input className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-main p-2 focus:outline-none focus:ring-1 focus:ring-primary/50"
                          value={slide.subtitle || ''} onChange={(e) => updateActiveSlide({ subtitle: e.target.value })} placeholder="Supporting headline" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted">Description</label>
                        <textarea className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-muted p-2 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-20"
                          value={slide.text} onChange={(e) => updateActiveSlide({ text: e.target.value })} placeholder="Body copy..." />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted">CTA</label>
                        <input className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-main p-2 focus:outline-none focus:ring-1 focus:ring-primary/50"
                          value={slide.cta || ''} onChange={(e) => updateActiveSlide({ cta: e.target.value })} placeholder="e.g. SWIPE TO LEARN" />
                      </div>
                      <button onClick={() => updateActiveSlide({ compositionImageUrl: slide.compositionImageUrl ? undefined : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop' })}
                        className="w-full bg-bg border border-border hover:bg-white/5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
                        <ImageIcon size={14} /> {slide.compositionImageUrl ? 'Remove Comp Image' : 'Add Comp Image'}
                      </button>

                      {/* Video Controls */}
                      {slide.type === 'video' && (
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                          <h4 className="text-[10px] uppercase font-black flex items-center gap-1" style={{ color: activeExpert?.brandColor || '#6366f1' }}><Video size={12} /> Video Settings</h4>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-text-muted flex justify-between">
                              <span>Trim (s)</span><span>{slide.videoTrimStart || 0}s - {slide.videoTrimEnd || 15}s</span>
                            </label>
                            <div className="flex items-center gap-2">
                              <input type="number" className="w-full bg-bg border border-border rounded p-1.5 text-base md:text-xs text-text-main focus:outline-none"
                                placeholder="Start" value={slide.videoTrimStart || 0} onChange={e => updateActiveSlide({ videoTrimStart: Number(e.target.value) })} />
                              <span className="text-text-muted">-</span>
                              <input type="number" className="w-full bg-bg border border-border rounded p-1.5 text-base md:text-xs text-text-main focus:outline-none"
                                placeholder="End" value={slide.videoTrimEnd || 15} onChange={e => updateActiveSlide({ videoTrimEnd: Number(e.target.value) })} />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-text-muted">Playback Speed</label>
                            <select className="w-full bg-bg border border-border rounded p-1.5 text-base md:text-xs text-text-main focus:outline-none appearance-none"
                              value={slide.videoPlaybackSpeed || 1} onChange={e => updateActiveSlide({ videoPlaybackSpeed: Number(e.target.value) })}>
                              <option value={0.5}>0.5x (Slow)</option>
                              <option value={1}>1.0x (Normal)</option>
                              <option value={1.5}>1.5x (Fast)</option>
                              <option value={2}>2.0x (Very Fast)</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-text-muted flex justify-between"><span>Thumbnail Frame</span><span>{slide.videoThumbnailFrame || 0}%</span></label>
                            <input type="range" min="0" max="100" className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer"
                              style={{ accentColor: activeExpert?.brandColor || '#6366f1' }} value={slide.videoThumbnailFrame || 0} onChange={e => updateActiveSlide({ videoThumbnailFrame: Number(e.target.value) })} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Collapsed State */
          <div className="flex flex-col items-center pt-4 gap-3">
            <button onClick={() => setLeftCollapsed(false)} className="p-2 text-text-muted hover:text-text-main transition-colors"><Layers size={18} /></button>
            <div className="w-6 h-px bg-border" />
            <button onClick={() => addSlide('image')} className="p-2 text-primary hover:opacity-80 transition-colors"><ImageIcon size={18} /></button>
            <button onClick={() => addSlide('video')} className="p-2 text-primary hover:opacity-80 transition-colors"><Video size={18} /></button>
          </div>
        )}
      </aside>

      {/* ═══════ CENTER: Infinite Canvas ═══════ */}
      <section
        ref={canvasRef}
        className={`flex-1 flex flex-col relative overflow-hidden bg-bg ${mobilePanel !== 'canvas' ? 'hidden lg:flex' : 'flex'}`}
        onWheel={handleWheel}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        style={{ cursor: isPanning ? 'grabbing' : 'default' }}
      >
        {/* Top Toolbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {/* Format */}
          <div className="bg-surface/80 backdrop-blur-xl px-4 py-2 rounded-full border border-border/50 flex items-center gap-4 shadow-2xl">
            <select onChange={handleFormatChange} className="bg-transparent text-xs font-bold uppercase tracking-widest text-text-main focus:outline-none cursor-pointer appearance-none pr-4">
              <option value="4:5">Feed (4:5)</option>
              <option value="1:1">Post (1:1)</option>
              <option value="9:16">Reels (9:16)</option>
              <option value="16:9">YouTube (16:9)</option>
            </select>
            <div className="w-px h-4 bg-border" />
            <button className="text-text-muted hover:text-primary transition-colors"><Undo2 size={16} /></button>
            <button className="text-text-muted hover:text-primary transition-colors"><Redo2 size={16} /></button>
          </div>

          {/* Export */}
          <div className="bg-surface/80 backdrop-blur-xl px-3 py-2 rounded-full border border-border/50 flex items-center gap-2 shadow-2xl">
            <button
              onClick={() => exportSlide(undefined, 'png')}
              disabled={exporting}
              className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 min-h-[36px] disabled:opacity-50"
              style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}
            >
              <Download size={14} />
              {exporting ? 'Exporting...' : 'PNG'}
            </button>
            <button
              onClick={() => exportSlide(undefined, 'jpg')}
              disabled={exporting}
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-border text-text-muted hover:text-text-main hover:bg-white/5 transition-all min-h-[36px] disabled:opacity-50"
            >
              JPG
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="bg-surface/80 backdrop-blur-xl px-2 py-2 rounded-full border border-border/50 flex items-center gap-1 shadow-2xl">
            <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.3))} className="p-1.5 text-text-muted hover:text-text-main transition-colors"><ZoomOut size={14} /></button>
            <span className="text-[10px] font-bold text-text-muted w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(z + 0.1, 3))} className="p-1.5 text-text-muted hover:text-text-main transition-colors"><ZoomIn size={14} /></button>
            <button onClick={resetView} className="p-1.5 text-text-muted hover:text-text-main transition-colors" title="Reset view"><RotateCcw size={14} /></button>
          </div>
        </div>

        {/* Canvas Workspace with Infinite Pan/Zoom */}
        <div className="flex-1 flex items-center justify-center overflow-hidden relative">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
              backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
              transform: `translate(${pan.x % (20 * zoom)}px, ${pan.y % (20 * zoom)}px)`,
            }}
          />

          {/* Transform Container */}
          <div
            className="relative transition-transform duration-75"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            {/* Canvas Frame */}
            <div
              ref={canvasPreviewRef}
              className={`${getAspectClass(format)} w-full max-w-md bg-surface rounded-xl overflow-hidden shadow-2xl relative border border-border/50`}
              style={{ width: editorMode === 'post' ? '420px' : undefined }}
            >
              {/* Base Media */}
              {activeSlide.type === 'video' ? (
                <video key={activeSlide.id} src={activeSlide.mediaUrl} className="absolute inset-0 w-full h-full object-cover"
                  autoPlay loop muted playsInline style={{
                    transform: `scale(${activeSlide.mediaScale || 1}) translate(${activeSlide.mediaOffsetX || 0}px, ${activeSlide.mediaOffsetY || 0}px)`
                  }} />
              ) : (
                <img key={activeSlide.id} alt="Active Slide" className="absolute inset-0 w-full h-full object-cover"
                  src={activeSlide.mediaUrl} style={{
                    transform: `scale(${activeSlide.mediaScale || 1}) translate(${activeSlide.mediaOffsetX || 0}px, ${activeSlide.mediaOffsetY || 0}px)`
                  }} />
              )}

              {/* Fade Overlay */}
              <div className="absolute inset-0 mix-blend-multiply transition-opacity duration-300" style={{
                background: `linear-gradient(to top, ${fadeColor}, ${fadeColor}66, transparent)`,
                opacity: fadeIntensity / 100
              }} />
              <div className="absolute inset-0 mix-blend-overlay" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}1A` }} />

              {/* 4-Corner Architecture */}
              <div className="absolute top-6 left-6 z-20">{renderCorner(corners.tl)}</div>
              <div className="absolute top-6 right-6 z-20">{renderCorner(corners.tr)}</div>
              <div className="absolute bottom-6 left-6 z-20">{renderCorner(corners.bl)}</div>
              <div className="absolute bottom-6 right-6 z-20">{renderCorner(corners.br)}</div>

              {/* Center Content */}
              <div className={`absolute inset-0 flex flex-col p-10 z-10 pointer-events-none transition-all duration-300 ${getLayoutClasses(activeSlide.layoutTemplate)} ${getAlignmentClasses(activeSlide.alignment)}`}
                style={{ transform: `translate(${activeSlide.customPosition?.x || 0}px, ${activeSlide.customPosition?.y || 0}px)` }}>
                {activeSlide.compositionImageUrl && (
                  <img src={activeSlide.compositionImageUrl} alt="Composition" className="w-32 h-32 object-cover rounded-xl shadow-2xl mb-6 border-2 border-white/20" />
                )}
                {activeSlide.hat && (
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black mb-3 drop-shadow-md" style={{ color: activeExpert?.brandColor || '#6366f1' }}>{activeSlide.hat}</span>
                )}
                {activeSlide.title && (
                  <h1 className="text-4xl font-black leading-tight tracking-tighter text-white drop-shadow-xl mb-2" dangerouslySetInnerHTML={{ __html: activeSlide.title.replace(/\n/g, '<br/>') }} />
                )}
                {activeSlide.subtitle && (
                  <h2 className="text-lg font-bold text-white/90 drop-shadow-lg mb-4">{activeSlide.subtitle}</h2>
                )}
                {activeSlide.text && (
                  <p className="text-sm font-medium text-white/80 leading-relaxed drop-shadow-lg max-w-[90%] mb-6">{activeSlide.text}</p>
                )}
                {activeSlide.cta && (
                  <div className="mt-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md border border-white/20"
                    style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}>{activeSlide.cta}</div>
                )}
              </div>
            </div>

            {/* Canvas Info Badge */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] text-text-muted whitespace-nowrap">
              <span className="flex items-center gap-1"><MousePointerClick size={10} /> Alt+Drag para pan</span>
              <span className="flex items-center gap-1"><ZoomIn size={10} /> Ctrl+Scroll para zoom</span>
              <span className="flex items-center gap-1"><Grid3X3 size={10} /> {getAspectClass(format).replace('aspect-', '').replace('[', '').replace(']', '')}</span>
            </div>
          </div>
        </div>

        {/* Bottom Timeline */}
        {editorMode === 'carousel' && (
          <div className="h-32 bg-surface border-t border-border flex items-center px-4 shrink-0 relative overflow-hidden">
            <div className="flex items-center gap-3 w-full h-full overflow-x-auto custom-scrollbar pb-2 pt-2">
              {slides.map((slide, idx) => (
                <div key={slide.id} onClick={() => setActiveSlideIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer transition-all duration-300 group ${
                    activeSlideIndex === idx ? 'border-primary scale-105 shadow-lg z-10' : 'border-border/50 hover:border-text-muted hover:scale-105 opacity-60 hover:opacity-100'
                  }`}
                  style={{ borderColor: activeSlideIndex === idx ? (activeExpert?.brandColor || '#6366f1') : '' }}>
                  <img src={slide.mediaUrl} alt={`Slide ${idx + 1}`} className={`w-full h-full object-cover transition-transform duration-500 ${activeSlideIndex === idx ? 'scale-110' : 'group-hover:scale-110'} ${slide.type === 'video' ? 'opacity-80' : ''}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 right-2 text-[10px] font-black text-white drop-shadow-md">{idx + 1}</span>
                  {slide.type === 'video' && <div className="absolute top-1 right-1 bg-black/60 rounded p-0.5"><Video size={10} className="text-white" /></div>}
                </div>
              ))}
              <div className="flex flex-col gap-2 shrink-0 ml-2">
                <button onClick={() => addSlide('image')} className="w-20 h-9 rounded-lg border-2 border-dashed border-border flex items-center justify-center gap-1 text-text-muted hover:text-primary hover:border-primary hover:bg-white/5 transition-colors">
                  <ImageIcon size={12} /><span className="text-[9px] font-bold uppercase">Img</span>
                </button>
                <button onClick={() => addSlide('video')} className="w-20 h-9 rounded-lg border-2 border-dashed border-border flex items-center justify-center gap-1 text-text-muted hover:text-primary hover:border-primary hover:bg-white/5 transition-colors">
                  <Video size={12} /><span className="text-[9px] font-bold uppercase">Vid</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ═══════ RIGHT SIDEBAR: Design & AI ═══════ */}
      <aside
        className={`relative bg-surface border-l border-border flex flex-col shrink-0 transition-all duration-300 ${
          rightCollapsed ? 'lg:w-12' : 'lg:w-80'
        } ${mobilePanel !== 'design' ? 'hidden lg:flex' : 'flex w-full'}`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setRightCollapsed(!rightCollapsed)}
          className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-6 h-12 bg-surface border border-border rounded-l-lg items-center justify-center text-text-muted hover:text-text-main transition-colors"
        >
          {rightCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {!rightCollapsed ? (
          <>
            {/* Tabs */}
            <div className="flex border-b border-border shrink-0">
              {([
                { id: 'content' as const, label: 'Content', icon: Type },
                { id: 'design' as const, label: 'Design', icon: SlidersHorizontal },
                { id: 'layouts' as const, label: 'Layouts', icon: LayoutGrid },
                { id: 'ai' as const, label: 'AI', icon: Sparkles },
              ]).map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 flex items-center justify-center gap-1.5 transition-colors ${activeTab === tab.id ? 'text-text-main' : 'text-text-muted hover:text-text-main border-transparent'}`}
                  style={{ borderColor: activeTab === tab.id ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}>
                  <tab.icon size={13} /> {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
              {/* ── TAB: CONTENT ── */}
              {activeTab === 'content' && (
                <div className="p-5 space-y-5">
                  <div className="flex items-center gap-2 text-text-main mb-2">
                    <Type size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                    <h3 className="text-[11px] font-black uppercase tracking-widest">Slide #{activeSlideIndex + 1} Content</h3>
                  </div>

                  {/* AI Generate Copy */}
                  {activeExpert && (
                    <button
                      onClick={generateAICopy}
                      disabled={isGeneratingCopy}
                      className="w-full py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                    >
                      <Wand2 size={14} className={isGeneratingCopy ? 'animate-spin' : ''} />
                      {isGeneratingCopy ? 'Gerando copy...' : 'Gerar Copy com IA'}
                    </button>
                  )}

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">HAT</label>
                    <input className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-main p-2.5 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      value={activeSlide.hat || ''} onChange={(e) => updateActiveSlide({ hat: e.target.value })} placeholder="e.g. EXPERT INSIGHTS" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">Title</label>
                    <textarea className="w-full bg-bg border border-border rounded-lg text-sm font-bold text-text-main p-3 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-20 leading-tight"
                      value={activeSlide.title} onChange={(e) => updateActiveSlide({ title: e.target.value })} placeholder="Main Headline" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">Subtitle</label>
                    <input className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-main p-2.5 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      value={activeSlide.subtitle || ''} onChange={(e) => updateActiveSlide({ subtitle: e.target.value })} placeholder="Supporting headline" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">Description</label>
                    <textarea className="w-full bg-bg border border-border rounded-lg text-xs text-text-muted p-3 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-28"
                      value={activeSlide.text} onChange={(e) => updateActiveSlide({ text: e.target.value })} placeholder="Body copy..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-text-muted">CTA</label>
                    <input className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-main p-2.5 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      value={activeSlide.cta || ''} onChange={(e) => updateActiveSlide({ cta: e.target.value })} placeholder="e.g. SWIPE TO LEARN" />
                  </div>
                  <button onClick={() => updateActiveSlide({ compositionImageUrl: activeSlide.compositionImageUrl ? undefined : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop' })}
                    className="w-full bg-bg border border-border hover:bg-white/5 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
                    <ImageIcon size={14} /> {activeSlide.compositionImageUrl ? 'Remove Comp Image' : 'Add Comp Image Overlay'}
                  </button>

                  {activeSlide.type === 'video' && (
                    <div className="mt-4 space-y-4 bg-bg p-4 rounded-xl border border-border">
                      <h4 className="text-[10px] uppercase font-black flex items-center gap-1" style={{ color: activeExpert?.brandColor || '#6366f1' }}><Video size={12} /> Video Timing</h4>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted flex justify-between"><span>Trim (s)</span><span>{activeSlide.videoTrimStart || 0}s - {activeSlide.videoTrimEnd || 15}s</span></label>
                        <div className="flex items-center gap-2">
                          <input type="number" className="w-full bg-surface border border-border rounded p-1.5 text-base md:text-xs text-text-main focus:outline-none" placeholder="Start" value={activeSlide.videoTrimStart || 0} onChange={e => updateActiveSlide({ videoTrimStart: Number(e.target.value) })} />
                          <span className="text-text-muted">-</span>
                          <input type="number" className="w-full bg-surface border border-border rounded p-1.5 text-base md:text-xs text-text-main focus:outline-none" placeholder="End" value={activeSlide.videoTrimEnd || 15} onChange={e => updateActiveSlide({ videoTrimEnd: Number(e.target.value) })} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-text-muted">Playback Speed</label>
                        <select className="w-full bg-surface border border-border rounded p-1.5 text-base md:text-xs text-text-main focus:outline-none appearance-none" value={activeSlide.videoPlaybackSpeed || 1} onChange={e => updateActiveSlide({ videoPlaybackSpeed: Number(e.target.value) })}>
                          <option value={0.5}>0.5x (Slow)</option>
                          <option value={1}>1.0x (Normal)</option>
                          <option value={1.5}>1.5x (Fast)</option>
                          <option value={2}>2.0x (Very Fast)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB: DESIGN ── */}
              {activeTab === 'design' && (
                <div className="p-5 space-y-6">
                  {/* Format & Canvas */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-main mb-1">
                      <LayoutTemplate size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">Format & Canvas</h3>
                    </div>
                    <select onChange={handleFormatChange} className="w-full bg-bg border border-border rounded-xl p-3 text-sm focus:outline-none appearance-none text-text-main cursor-pointer">
                      <option value="4:5">Carousel / Feed (4:5)</option>
                      <option value="1:1">Single Post (1:1)</option>
                      <option value="9:16">Reels / TikTok (9:16)</option>
                      <option value="16:9">YouTube / Web (16:9)</option>
                    </select>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Layout & Alignment */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-text-main mb-1">
                      <AlignLeft size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">Layout & Alignment</h3>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Text Alignment</label>
                      <div className="flex gap-2 bg-bg p-1 rounded-lg border border-border">
                        {(['left', 'center', 'right', 'justify'] as Alignment[]).map(a => (
                          <button key={a} onClick={() => updateActiveSlide({ alignment: a })}
                            className={`flex-1 py-1.5 rounded flex justify-center items-center transition-colors ${activeSlide.alignment === a ? 'bg-surface shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}>
                            {a === 'left' && <AlignLeft size={14} />}{a === 'center' && <AlignCenter size={14} />}{a === 'right' && <AlignRight size={14} />}{a === 'justify' && <AlignJustify size={14} />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] text-text-muted uppercase font-bold pl-1">Layout Template</label>
                      <select value={activeSlide.layoutTemplate} onChange={(e) => updateActiveSlide({ layoutTemplate: e.target.value as LayoutTemplate })}
                        className="w-full bg-bg border border-border rounded-lg p-2.5 text-sm focus:outline-none appearance-none text-text-main cursor-pointer">
                        <option value="overlay">Overlay (Center)</option>
                        <option value="bottom">Bottom Anchor</option>
                        <option value="top">Top Anchor</option>
                        <option value="split">Split (Half/Half)</option>
                        <option value="minimal">Minimal Clean</option>
                        <option value="magazine">Magazine Editorial</option>
                        <option value="quote">Quote Card</option>
                        <option value="data">Data / Stats</option>
                      </select>
                    </div>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] text-text-muted uppercase font-bold pl-1 flex items-center gap-1"><Move size={10} /> Manual Position</label>
                        <button onClick={() => updateActiveSlide({ customPosition: { x: 0, y: 0 } })} className="text-[9px] text-primary hover:underline">Reset</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center bg-bg border border-border rounded-lg px-2 py-1.5">
                          <span className="text-[9px] font-bold text-text-muted w-3">X</span>
                          <input type="number" value={activeSlide.customPosition?.x || 0} onChange={(e) => updateActiveSlide({ customPosition: { ...activeSlide.customPosition!, x: Number(e.target.value) } })}
                            className="bg-transparent border-none focus:outline-none text-base md:text-xs w-full text-right text-text-main" />
                        </div>
                        <div className="flex items-center bg-bg border border-border rounded-lg px-2 py-1.5">
                          <span className="text-[9px] font-bold text-text-muted w-3">Y</span>
                          <input type="number" value={activeSlide.customPosition?.y || 0} onChange={(e) => updateActiveSlide({ customPosition: { ...activeSlide.customPosition!, y: Number(e.target.value) } })}
                            className="bg-transparent border-none focus:outline-none text-base md:text-xs w-full text-right text-text-main" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Media & Fade */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-text-main mb-1">
                      <ImageIcon size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">Media & Fade</h3>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-bg border border-border hover:bg-white/5 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
                      <Upload size={14} /> Upload Media
                    </button>

                    <div className="space-y-3 pt-2 bg-bg p-3 rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-1"><Crop size={12} className="text-text-muted" /><span className="text-[9px] uppercase font-bold text-text-muted">Media Transform</span></div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-text-muted uppercase font-bold">Scale / Zoom</span>
                          <span className="text-[9px] font-black" style={{ color: activeExpert?.brandColor || '#6366f1' }}>{activeSlide.mediaScale || 1}x</span>
                        </div>
                        <input className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" max="3" min="0.5" step="0.1" type="range"
                          value={activeSlide.mediaScale || 1} onChange={(e) => updateActiveSlide({ mediaScale: Number(e.target.value) })} style={{ accentColor: activeExpert?.brandColor || '#6366f1' }} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="flex items-center bg-surface border border-border rounded px-2 py-1">
                          <span className="text-[9px] font-bold text-text-muted w-3">X</span>
                          <input type="number" value={activeSlide.mediaOffsetX || 0} onChange={(e) => updateActiveSlide({ mediaOffsetX: Number(e.target.value) })}
                            className="bg-transparent border-none focus:outline-none text-base md:text-xs w-full text-right text-text-main" />
                        </div>
                        <div className="flex items-center bg-surface border border-border rounded px-2 py-1">
                          <span className="text-[9px] font-bold text-text-muted w-3">Y</span>
                          <input type="number" value={activeSlide.mediaOffsetY || 0} onChange={(e) => updateActiveSlide({ mediaOffsetY: Number(e.target.value) })}
                            className="bg-transparent border-none focus:outline-none text-base md:text-xs w-full text-right text-text-main" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-text-muted uppercase font-bold">Fade Intensity</span>
                        <span className="text-[10px] font-black" style={{ color: activeExpert?.brandColor || '#6366f1' }}>{fadeIntensity}%</span>
                      </div>
                      <input className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range"
                        value={fadeIntensity} onChange={(e) => setFadeIntensity(Number(e.target.value))} style={{ accentColor: activeExpert?.brandColor || '#6366f1' }} />
                    </div>
                    <div className="flex items-center justify-between bg-bg border border-border rounded-lg p-2">
                      <span className="text-xs font-medium text-text-main pl-2">Fade Color</span>
                      <input type="color" value={fadeColor} onChange={(e) => setFadeColor(e.target.value)} className="w-6 h-6 rounded bg-transparent border-none cursor-pointer" />
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* 4-Corner Architecture */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-text-main mb-1">
                      <Layers size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">4-Corner Layout</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(['tl', 'tr', 'bl', 'br'] as const).map(corner => (
                        <div key={corner} className="space-y-1">
                          <label className="text-[9px] text-text-muted uppercase font-bold pl-1">{corner === 'tl' ? 'Top Left' : corner === 'tr' ? 'Top Right' : corner === 'bl' ? 'Bottom Left' : 'Bottom Right'}</label>
                          <select value={corners[corner]} onChange={(e) => setCorners({ ...corners, [corner]: e.target.value as CornerType })}
                            className="w-full bg-bg border border-border rounded-lg p-2 text-sm focus:outline-none appearance-none text-text-main">
                            <option>None</option>
                            <option>Logo</option>
                            <option>Series Tag</option>
                            <option>Author / Handle</option>
                            <option>Slide Counter</option>
                            <option>Arrow (Next)</option>
                            <option>Swipe Right</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB: LAYOUTS ── */}
              {activeTab === 'layouts' && (
                <div className="p-5 space-y-6">
                  {/* Presets */}
                  <div>
                    <div className="flex items-center gap-2 text-text-main mb-3">
                      <Palette size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">Layout Presets</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {layoutPresets.map(preset => (
                        <button key={preset.id} onClick={() => applyPreset(preset)}
                          className={`p-3 rounded-xl border transition-all text-left hover:bg-white/5 ${
                            activeSlide.layoutTemplate === preset.layoutTemplate ? 'border-primary bg-primary/5' : 'border-border'
                          }`}>
                          <preset.icon size={18} className="mb-2" style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                          <p className="text-xs font-medium text-text-main">{preset.name}</p>
                          <p className="text-[10px] text-text-muted mt-0.5">{preset.alignment} · {preset.fadeIntensity}% fade</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Save Current */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-text-main">
                        <BookmarkPlus size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                        <h3 className="text-[11px] font-black uppercase tracking-widest">Saved Layouts</h3>
                      </div>
                      <button onClick={() => setShowSaveLayoutModal(true)} className="text-[10px] text-primary hover:underline font-bold uppercase">Salvar Atual</button>
                    </div>

                    {savedLayouts.length === 0 ? (
                      <p className="text-xs text-text-muted text-center py-4">Nenhum layout salvo</p>
                    ) : (
                      <div className="space-y-2">
                        {savedLayouts.map(layout => (
                          <div key={layout.id} className="flex items-center gap-3 p-3 bg-bg rounded-xl border border-border group">
                            <button onClick={() => applySavedLayout(layout)} className="flex-1 text-left">
                              <p className="text-sm font-medium text-text-main">{layout.name}</p>
                              <p className="text-[10px] text-text-muted">{layout.layoutTemplate} · {layout.alignment} · {new Date(layout.createdAt).toLocaleDateString()}</p>
                            </button>
                            <button onClick={() => deleteSavedLayout(layout.id)} className="p-1.5 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Save Modal */}
                  {showSaveLayoutModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                      <div className="bg-surface border border-border rounded-xl w-full max-w-sm p-5 space-y-4">
                        <h3 className="text-lg font-semibold text-text-main">Salvar Layout</h3>
                        <input type="text" value={newLayoutName} onChange={(e) => setNewLayoutName(e.target.value)}
                          placeholder="Nome do layout (ex: Aria Luxury)"
                          className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
                          onKeyDown={(e) => { if (e.key === 'Enter') saveCurrentLayout(); }}
                        />
                        <div className="flex gap-3">
                          <button onClick={() => setShowSaveLayoutModal(false)} className="flex-1 px-4 py-2.5 border border-border text-text-main rounded-lg font-medium hover:bg-white/5 transition-colors text-sm">Cancelar</button>
                          <button onClick={saveCurrentLayout} disabled={!newLayoutName.trim()} className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm disabled:opacity-50">Salvar</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB: AI ── */}
              {activeTab === 'ai' && (
                <div className="p-5 flex flex-col h-full">
                  {/* Pipeline */}
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1 text-green-500"><CheckCircle2 size={12} /> Research</div>
                    <ChevronRight size={12} className="text-text-muted" />
                    <div className="flex items-center gap-1 text-green-500"><CheckCircle2 size={12} /> Copy</div>
                    <ChevronRight size={12} className="text-text-muted" />
                    <div className="flex items-center gap-1 animate-pulse" style={{ color: activeExpert?.brandColor || '#6366f1' }}><Brain size={12} /> Visual Design</div>
                  </div>

                  {/* Agent Header */}
                  <div className="flex items-center justify-between mb-5 p-3 rounded-xl bg-bg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}33`, color: activeExpert?.brandColor || '#6366f1' }}>
                        <Bot size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-text-main">{activeAgent?.name || 'AI Assistant'}</h3>
                        <p className="text-[10px] text-text-muted">Context: {activeExpert?.name || 'Expert OS'}</p>
                      </div>
                    </div>
                    <select value={activeAgent?.id || ''} onChange={(e) => setSelectedAgentId(e.target.value)}
                      className="bg-surface border border-border rounded-lg text-xs p-2 focus:outline-none appearance-none pr-8 cursor-pointer">
                      {expertAgents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
                    </select>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <input type="file" ref={csvInputRef} onChange={handleCSVUpload} accept=".csv" className="hidden" />
                    <button onClick={() => csvInputRef.current?.click()} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <FileSpreadsheet size={16} className="text-text-muted group-hover:text-primary transition-colors" style={{ color: activeExpert?.brandColor }} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Import CSV</span>
                    </button>
                    <button onClick={downloadCSVTemplate} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <Download size={16} className="text-text-muted group-hover:text-primary transition-colors" style={{ color: activeExpert?.brandColor }} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Get Template</span>
                    </button>
                    <button onClick={generateAICopy} disabled={isGeneratingCopy} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <Wand2 size={16} className={`text-text-muted group-hover:text-primary transition-colors ${isGeneratingCopy ? 'animate-spin' : ''}`} style={{ color: activeExpert?.brandColor }} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">AI Copy</span>
                    </button>
                    <button className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <CalendarClock size={16} className="text-text-muted group-hover:text-primary transition-colors" style={{ color: activeExpert?.brandColor }} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Schedule</span>
                    </button>
                  </div>

                  {/* Chat */}
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

            {/* AI Input */}
            <div className="p-5 bg-bg/50 border-t border-border shrink-0">
              <div className="relative group">
                <textarea
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAiSend(); } }}
                  className="w-full bg-surface border border-border rounded-xl text-sm text-text-main p-4 pr-12 h-20 resize-none transition-all placeholder:text-text-muted/50 focus:outline-none"
                  placeholder={activeTab === 'ai' ? "Tell the Visual Director what to do..." : "Ask AI to edit text, change layout, or swap media..."}
                />
                <button onClick={handleAiSend} className="absolute bottom-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white hover:brightness-110 transition-all active:scale-95 shadow-lg" style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Collapsed State */
          <div className="flex flex-col items-center pt-4 gap-3">
            <button onClick={() => setRightCollapsed(false)} className="p-2 text-text-muted hover:text-text-main transition-colors"><SlidersHorizontal size={18} /></button>
            <div className="w-6 h-px bg-border" />
            <button onClick={() => { setActiveTab('content'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary transition-colors"><Type size={18} /></button>
            <button onClick={() => { setActiveTab('design'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary transition-colors"><Palette size={18} /></button>
            <button onClick={() => { setActiveTab('layouts'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary transition-colors"><LayoutGrid size={18} /></button>
            <button onClick={() => { setActiveTab('ai'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary transition-colors"><Sparkles size={18} /></button>
          </div>
        )}
      </aside>
    </div>
  );
}
