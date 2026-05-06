import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useExpertStore } from '@/store/expertStore';
import { useAgentStore } from '@/store/agentStore';
import {
  Monitor, Undo2, Redo2, Download, ChevronLeft, ChevronRight, ChevronDown,
  Hexagon, Sparkles, Send, Play, Video, Image as ImageIcon, Type,
  LayoutTemplate, SlidersHorizontal, Layers, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Move, ArrowRight, ChevronsRight, Upload,
  Crop, Bot, FileSpreadsheet, Wand2, ImagePlus, CalendarClock,
  CheckCircle2, Brain, ZoomIn, ZoomOut, Grid3X3, PanelLeft, PanelRight,
  Palette, BookmarkPlus, Trash2, FileImage, Package, LayoutGrid,
  Maximize2, RotateCcw, MousePointerClick, Copy, Check, GripVertical,
  Plus, X, Minus, Square, RectangleHorizontal, RectangleVertical,
  Frame, AlertTriangle, BookOpen, ListOrdered, HelpCircle, Scale,
  BarChart3, ArrowLeftRight
} from 'lucide-react';

/* ═══════════════════ TYPES ═══════════════════ */

type SlideType = 'image' | 'video';
type Alignment = 'left' | 'center' | 'right' | 'justify';
type LayoutTemplate = 'overlay' | 'bottom' | 'top' | 'split' | 'minimal' | 'magazine' | 'quote' | 'data';
type CornerType = 'Logo' | 'Series Tag' | 'Author / Handle' | 'Slide Counter' | 'Arrow (Next)' | 'Swipe Right' | 'None';
type ExportFormat = 'png' | 'jpg';

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

interface CanvasItem {
  id: string;
  name: string;
  type: 'post' | 'carousel';
  x: number;
  y: number;
  displayScale: number; // tamanho visual do item no canvas (0.5 = 50%)
  slides: Slide[];
  activeSlideIndex: number;
  format: string; // aspect-[4/5], aspect-square, etc.
  fadeIntensity: number;
  fadeColor: string;
  corners: { tl: CornerType; tr: CornerType; bl: CornerType; br: CornerType };
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

/* ═══════════════════ PRESETS ═══════════════════ */

const layoutPresets: LayoutPreset[] = [
  { id: 'preset-overlay', name: 'Overlay Center', icon: LayoutTemplate, layoutTemplate: 'overlay', alignment: 'center', fadeIntensity: 85, fadeColor: '#09090B', corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Author / Handle', br: 'Slide Counter' } },
  { id: 'preset-bottom', name: 'Bottom Anchor', icon: AlignLeft, layoutTemplate: 'bottom', alignment: 'left', fadeIntensity: 70, fadeColor: '#000000', corners: { tl: 'Logo', tr: 'None', bl: 'Author / Handle', br: 'Arrow (Next)' } },
  { id: 'preset-minimal', name: 'Minimal Clean', icon: Type, layoutTemplate: 'minimal', alignment: 'left', fadeIntensity: 40, fadeColor: '#09090B', corners: { tl: 'None', tr: 'None', bl: 'Author / Handle', br: 'None' } },
  { id: 'preset-magazine', name: 'Magazine Editorial', icon: LayoutGrid, layoutTemplate: 'magazine', alignment: 'justify', fadeIntensity: 60, fadeColor: '#1a1a2e', corners: { tl: 'Series Tag', tr: 'Logo', bl: 'None', br: 'Slide Counter' } },
  { id: 'preset-quote', name: 'Quote Card', icon: Type, layoutTemplate: 'quote', alignment: 'center', fadeIntensity: 50, fadeColor: '#0f0f0f', corners: { tl: 'None', tr: 'None', bl: 'Author / Handle', br: 'None' } },
  { id: 'preset-data', name: 'Data / Stats', icon: Package, layoutTemplate: 'data', alignment: 'center', fadeIntensity: 75, fadeColor: '#0a0a0a', corners: { tl: 'Logo', tr: 'Series Tag', bl: 'None', br: 'Slide Counter' } },
  { id: 'preset-split', name: 'Split Screen', icon: Maximize2, layoutTemplate: 'split', alignment: 'left', fadeIntensity: 30, fadeColor: '#09090B', corners: { tl: 'Logo', tr: 'None', bl: 'None', br: 'Swipe Right' } },
  { id: 'preset-top', name: 'Top Anchor', icon: AlignLeft, layoutTemplate: 'top', alignment: 'left', fadeIntensity: 65, fadeColor: '#000000', corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Swipe Right', br: 'Author / Handle' } },
];

const mockSavedLayouts: SavedLayout[] = [
  { id: 'saved-1', name: 'Aria Luxury', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), layoutTemplate: 'overlay', alignment: 'center', fadeIntensity: 90, fadeColor: '#0c0c1d', corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Author / Handle', br: 'Slide Counter' } },
  { id: 'saved-2', name: 'Marcus Data-Driven', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), layoutTemplate: 'data', alignment: 'left', fadeIntensity: 80, fadeColor: '#0f172a', corners: { tl: 'Logo', tr: 'None', bl: 'Author / Handle', br: 'None' } },
];

/* ═══════════════════ HELPERS ═══════════════════ */

function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

function getAspectClass(fmt: string) {
  if (fmt.includes('4/5')) return 'aspect-[4/5]';
  if (fmt.includes('square') || fmt.includes('1/1')) return 'aspect-square';
  if (fmt.includes('9/16')) return 'aspect-[9/16]';
  if (fmt.includes('16/9')) return 'aspect-video';
  return 'aspect-[4/5]';
}

function getBaseWidth(fmt: string) {
  if (fmt.includes('4/5')) return 360;
  if (fmt.includes('square') || fmt.includes('1/1')) return 360;
  if (fmt.includes('9/16')) return 320;
  if (fmt.includes('16/9')) return 480;
  return 360;
}

function getBaseHeight(fmt: string) {
  if (fmt.includes('4/5')) return 450;
  if (fmt.includes('square') || fmt.includes('1/1')) return 360;
  if (fmt.includes('9/16')) return 568;
  if (fmt.includes('16/9')) return 270;
  return 450;
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
    case 'bottom': return 'justify-end pb-16';
    case 'top': return 'justify-start pt-16';
    case 'split': return 'justify-center w-1/2 bg-black/40 backdrop-blur-sm h-full p-6';
    case 'minimal': return 'justify-center p-8';
    case 'magazine': return 'justify-end pb-10 px-8';
    case 'quote': return 'justify-center p-10';
    case 'data': return 'justify-center p-6';
    default: return 'justify-center';
  }
}

function createDefaultSlide(type: SlideType = 'image', overrides?: Partial<Slide>): Slide {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    type,
    mediaUrl: type === 'image'
      ? 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'
      : 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop',
    title: 'NEW CONTENT',
    text: 'Add your content here...',
    alignment: 'left',
    layoutTemplate: 'overlay',
    customPosition: { x: 0, y: 0 },
    mediaScale: 1,
    ...overrides,
  };
}

function createCanvasItem(type: 'post' | 'carousel', index: number, format: string = 'aspect-[4/5]'): CanvasItem {
  const baseX = 100 + (index % 3) * 500;
  const baseY = 100 + Math.floor(index / 3) * 600;
  return {
    id: generateId(),
    name: type === 'post' ? `Post ${index + 1}` : `Carrossel ${index + 1}`,
    type,
    x: baseX,
    y: baseY,
    displayScale: 0.8,
    slides: type === 'post' ? [createDefaultSlide('image')] : [
      createDefaultSlide('image', { title: 'SLIDE 1', hat: 'INTRO', text: 'Primeiro slide do carrossel...' }),
      createDefaultSlide('image', { title: 'SLIDE 2', hat: 'CONTEÚDO', text: 'Segundo slide do carrossel...' }),
    ],
    activeSlideIndex: 0,
    format,
    fadeIntensity: 85,
    fadeColor: '#09090B',
    corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Author / Handle', br: 'Slide Counter' },
  };
}

/* ═══════════════════ SMART TEMPLATES ═══════════════════ */

interface SmartTemplate {
  id: string;
  name: string;
  description: string;
  icon: typeof LayoutTemplate;
  slideCount: number;
  generate: (expertName: string, niche: string) => Slide[];
}

const smartTemplates: SmartTemplate[] = [
  {
    id: '3-erros',
    name: '3 Erros Comuns',
    description: 'Capa + 3 erros + CTA',
    icon: AlertTriangle,
    slideCount: 5,
    generate: (name, niche) => [
      createDefaultSlide('image', { hat: 'ERROS FATAIS', title: `3 Erros que\nDestroem seu\n${niche}`, text: 'A maioria das pessoas comete pelo menos um desses erros todos os dias. Veja se você está entre elas.', cta: 'ARRASTE PARA VER', alignment: 'center', layoutTemplate: 'overlay' }),
      createDefaultSlide('image', { hat: 'ERRO #1', title: 'Focar no\nErrado', text: 'O primeiro erro é tentar agradar a todos em vez de seu público ideal. Especialização gera autoridade.', alignment: 'left', layoutTemplate: 'bottom' }),
      createDefaultSlide('image', { hat: 'ERRO #2', title: 'Inconsistência\nTotal', text: 'Publicar quando "dá tempo" é o caminho mais rápido para o esquecimento. Consistência vence talento.', alignment: 'left', layoutTemplate: 'bottom' }),
      createDefaultSlide('image', { hat: 'ERRO #3', title: 'Copiar os\nOutros', text: 'O que funciona para o guru pode não funcionar para você. Sua voz é seu maior diferencial.', alignment: 'left', layoutTemplate: 'bottom' }),
      createDefaultSlide('image', { hat: 'A SOLUÇÃO', title: `O Método\n${name.split(' ')[0]}`, text: 'Se você quer resultados diferentes, precisa de ações diferentes. O link está na bio.', cta: 'LINK NA BIO', alignment: 'center', layoutTemplate: 'overlay' }),
    ],
  },
  {
    id: 'storytelling',
    name: 'Storytelling Arc',
    description: '5 slides de narrativa',
    icon: BookOpen,
    slideCount: 5,
    generate: (name, niche) => [
      createDefaultSlide('image', { hat: 'HISTÓRIA REAL', title: `De Zero a\n${niche}`, text: `Essa história mudou como ${name} enxerga ${niche.toLowerCase()} para sempre.`, cta: 'LEIA TUDO', alignment: 'center', layoutTemplate: 'overlay' }),
      createDefaultSlide('image', { hat: 'O INÍCIO', title: 'Tudo Começou\nAssim...', text: 'Em um escritório pequeno, sem dinheiro e sem conexões. Apenas uma ideia e muita persistência.', alignment: 'left', layoutTemplate: 'magazine' }),
      createDefaultSlide('image', { hat: 'O CONFLITO', title: 'O Momento\nMais Difícil', text: 'Quando tudo parecia perdido, um insight simples mudou completamente a trajetória.', alignment: 'center', layoutTemplate: 'quote' }),
      createDefaultSlide('image', { hat: 'A VIRADA', title: 'A Descoberta\nQue Mudou\nTudo', text: 'O segredo não está em trabalhar mais. Está em trabalhar no que realmente importa.', alignment: 'left', layoutTemplate: 'data' }),
      createDefaultSlide('image', { hat: 'O RESULTADO', title: 'Hoje é\nDiferente', text: 'A jornada continua, mas agora com direção, propósito e resultados reais.', cta: 'SIGA PARA MAIS', alignment: 'center', layoutTemplate: 'overlay' }),
    ],
  },
  {
    id: 'lista',
    name: 'Lista Numerada',
    description: 'Capa + 5 dicas',
    icon: ListOrdered,
    slideCount: 6,
    generate: (name, niche) => [
      createDefaultSlide('image', { hat: 'GUIA RÁPIDO', title: `5 Dicas de\n${niche}\nQue Funcionam`, text: `${name} compilou o essencial para você aplicar hoje mesmo.`, cta: 'SALVE ESSE POST', alignment: 'center', layoutTemplate: 'overlay' }),
      createDefaultSlide('image', { hat: 'DICA #1', title: 'Comece\nPelo Fim', text: 'Defina claramente o resultado que você quer antes de qualquer ação.', alignment: 'left', layoutTemplate: 'bottom' }),
      createDefaultSlide('image', { hat: 'DICA #2', title: 'Meça\nTudo', text: 'O que não é medido não é melhorado. Dados são seu melhor amigo.', alignment: 'left', layoutTemplate: 'bottom' }),
      createDefaultSlide('image', { hat: 'DICA #3', title: 'Automatize\nO Óbvio', text: 'Se você repete algo 3 vezes, é hora de criar um sistema.', alignment: 'left', layoutTemplate: 'bottom' }),
      createDefaultSlide('image', { hat: 'DICA #4', title: 'Diga Não\nMais', text: 'Cada "sim" para algo irrelevante é um "não" para o que importa.', alignment: 'left', layoutTemplate: 'bottom' }),
      createDefaultSlide('image', { hat: 'DICA #5', title: 'Reinveste\nSempre', text: 'O maior investimento que você pode fazer é em conhecimento e pessoas.', cta: 'QUAL VOCÊ VAI APLICAR?', alignment: 'left', layoutTemplate: 'bottom' }),
    ],
  },
  {
    id: 'faq',
    name: 'FAQ',
    description: 'Capa + 4 Q&A',
    icon: HelpCircle,
    slideCount: 5,
    generate: (name, niche) => [
      createDefaultSlide('image', { hat: 'PERGUNTAS', title: `As Dúvidas\nMais Comuns\nSobre ${niche}`, text: `${name} responde o que todo mundo pergunta.`, cta: 'VEJA AS RESPOSTAS', alignment: 'center', layoutTemplate: 'overlay' }),
      createDefaultSlide('image', { hat: 'PERGUNTA #1', title: 'Por Onde\nComeçar?', text: 'O primeiro passo é sempre o mais difícil, mas também o mais importante. Comece pequeno, comece hoje.', alignment: 'left', layoutTemplate: 'quote' }),
      createDefaultSlide('image', { hat: 'PERGUNTA #2', title: 'Quanto\nCusta?', text: 'O custo da inação é sempre maior do que o custo de começar. Invista em você.', alignment: 'left', layoutTemplate: 'quote' }),
      createDefaultSlide('image', { hat: 'PERGUNTA #3', title: 'Quanto\nTempo Leva?', text: 'Resultados reais exigem consistência. A maioria desiste no dia antes da virada.', alignment: 'left', layoutTemplate: 'quote' }),
      createDefaultSlide('image', { hat: 'PERGUNTA #4', title: 'Funciona\nPra Mim?', text: 'Se você tem determinação e está disposto a aprender, funciona. Ponto final.', cta: 'MAIS DÚVIDAS? COMENTA', alignment: 'left', layoutTemplate: 'quote' }),
    ],
  },
  {
    id: 'mitos',
    name: 'Mitos vs Verdades',
    description: 'Desmistifique crenças',
    icon: Scale,
    slideCount: 5,
    generate: (name, niche) => [
      createDefaultSlide('image', { hat: 'VERDADE REVELADA', title: `Mitos de\n${niche}\nQue Você Acredita`, text: `${name} desmistifica as maiores mentiras do mercado.`, cta: 'PREPARE-SE', alignment: 'center', layoutTemplate: 'overlay' }),
      createDefaultSlide('image', { hat: 'MITO #1', title: 'Precisa de\nDinheiro', text: 'Verdade: Você precisa de estratégia. Dinheiro sem direção é apenas despesa.', alignment: 'left', layoutTemplate: 'split' }),
      createDefaultSlide('image', { hat: 'MITO #2', title: 'É Sobre\nTalent', text: 'Verdade: É sobre consistência e aprendizado contínuo. Talentos sem trabalho perdem.', alignment: 'left', layoutTemplate: 'split' }),
      createDefaultSlide('image', { hat: 'MITO #3', title: 'O Mercado\nEstá Saturado', text: 'Verdade: Não existe mercado saturado, existe posicionamento fraco.', alignment: 'left', layoutTemplate: 'split' }),
      createDefaultSlide('image', { hat: 'A REALIDADE', title: 'A Verdade\nLiberta', text: 'Agora que você sabe, está na hora de agir diferente.', cta: 'COMPARTILHE', alignment: 'center', layoutTemplate: 'overlay' }),
    ],
  },
  {
    id: 'dados',
    name: 'Dados Surpreendentes',
    description: 'Stats e números',
    icon: BarChart3,
    slideCount: 4,
    generate: (name, niche) => [
      createDefaultSlide('image', { hat: 'NÚMEROS QUE IMPACTAM', title: `Dados Sobre\n${niche}\nQue Vão te Surpreender`, text: `${name} separou as estatísticas mais relevantes.`, cta: 'CONFIRA', alignment: 'center', layoutTemplate: 'overlay' }),
      createDefaultSlide('image', { hat: 'STAT #1', title: '73%', text: 'das pessoas em ' + niche + ' desistem nos primeiros 6 meses. Seja dos 27%.', alignment: 'center', layoutTemplate: 'data' }),
      createDefaultSlide('image', { hat: 'STAT #2', title: '5x', text: 'mais resultado quem tem consistência vs quem posta "quando dá tempo".', alignment: 'center', layoutTemplate: 'data' }),
      createDefaultSlide('image', { hat: 'STAT #3', title: '90%', text: 'do seu sucesso vem de 10% das suas ações. Foque no que importa.', cta: 'QUAL MAIS TE IMPACTOU?', alignment: 'center', layoutTemplate: 'data' }),
    ],
  },
  {
    id: 'antes-depois',
    name: 'Antes / Depois',
    description: 'Transformação',
    icon: ArrowLeftRight,
    slideCount: 3,
    generate: (name, niche) => [
      createDefaultSlide('image', { hat: 'TRANSFORMAÇÃO', title: `A Virada\nEm ${niche}`, text: `O antes e depois que ${name} presenciou de perto.`, cta: 'VEJA A DIFERENÇA', alignment: 'center', layoutTemplate: 'overlay' }),
      createDefaultSlide('image', { hat: 'ANTES', title: 'Sem\nEstratégia', text: 'Trabalhando 12h por dia, sem resultados, sem direção, sem esperança.', alignment: 'center', layoutTemplate: 'minimal' }),
      createDefaultSlide('image', { hat: 'DEPOIS', title: 'Com\nMétodo', text: 'Resultados consistentes, tempo livre, crescimento previsível e sustentável.', cta: 'QUERO ISSO', alignment: 'center', layoutTemplate: 'minimal' }),
    ],
  },
];

/* ═══════════════════ COMPONENT ═══════════════════ */

export function Studio() {
  const activeExpert = useExpertStore(state => state.activeExpert);
  const { getAgentsByExpert } = useAgentStore();

  /* ── Canvas State ── */
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([
    createCanvasItem('carousel', 0, 'aspect-[4/5]'),
    createCanvasItem('post', 1, 'aspect-[4/5]'),
  ]);
  const [activeItemId, setActiveItemId] = useState<string>(canvasItems[0]?.id || '');
  const [zoom, setZoom] = useState(0.75);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  /* ── Drag Item State ── */
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [dragItemId, setDragItemId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  /* ── Sidebars ── */
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  /* ── View Mode ── */
  const [viewMode, setViewMode] = useState<'canvas' | 'focus'>('canvas');

  /* ── Tabs ── */
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'layouts' | 'ai'>('content');
  const [mobilePanel, setMobilePanel] = useState<'items' | 'canvas' | 'design'>('canvas');

  /* ── Export ── */
  const [exporting, setExporting] = useState(false);

  /* ── Layouts ── */
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>(mockSavedLayouts);
  const [showSaveLayoutModal, setShowSaveLayoutModal] = useState(false);
  const [newLayoutName, setNewLayoutName] = useState('');

  /* ── AI ── */
  const expertAgents = activeExpert ? getAgentsByExpert(activeExpert.id) : [];
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const visualAgent = expertAgents.find(a => a.role.includes('Visual') || a.role.includes('Design')) || expertAgents[0];
  const activeAgent = expertAgents.find(a => a.id === selectedAgentId) || visualAgent;
  const [aiChat, setAiChat] = useState([{ id: 1, role: 'agent' as const, text: "Hi! I'm your AI Assistant. How can I help you build content?" }]);
  const [aiInput, setAiInput] = useState('');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);

  /* ── Refs ── */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  /* ── Derived ── */
  const activeItem = useMemo(() => canvasItems.find(i => i.id === activeItemId) || canvasItems[0], [canvasItems, activeItemId]);
  const activeSlide = activeItem?.slides[activeItem?.activeSlideIndex || 0];

  /* ── Effects ── */
  useEffect(() => {
    if (activeExpert && activeAgent) {
      setAiChat([{ id: Date.now(), role: 'agent', text: `Hi! I'm ${activeAgent.name}. I've loaded ${activeExpert.name}'s brand guidelines. How can I help?` }]);
    }
  }, [activeExpert, activeAgent]);

  /* ── Canvas Pan/Zoom ── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Prevent browser zoom - handle zoom ourselves with scroll
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom(z => Math.min(Math.max(z + delta, 0.2), 2));
  }, []);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Middle click or Space+click = pan canvas
    if (e.button === 1 || e.button === 2 || (e.button === 0 && !dragItemId)) {
      // Only pan if not clicking on an item
      if ((e.target as HTMLElement).closest('[data-canvas-item]')) return;
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  }, [pan, dragItemId]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
      return;
    }
    if (isDraggingItem && dragItemId) {
      const worldX = (e.clientX - pan.x) / zoom;
      const worldY = (e.clientY - pan.y) / zoom;
      setCanvasItems(prev => prev.map(item => {
        if (item.id !== dragItemId) return item;
        return { ...item, x: worldX - dragOffset.current.x, y: worldY - dragOffset.current.y };
      }));
    }
  }, [isPanning, isDraggingItem, dragItemId, pan, zoom]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsPanning(false);
    setIsDraggingItem(false);
    setDragItemId(null);
  }, []);

  const resetView = () => { setZoom(0.75); setPan({ x: 0, y: 0 }); };

  /* ── Item Drag Start ── */
  const handleItemMouseDown = useCallback((e: React.MouseEvent, itemId: string) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setActiveItemId(itemId);
    setDragItemId(itemId);
    setIsDraggingItem(true);

    const item = canvasItems.find(i => i.id === itemId);
    if (!item) return;

    const worldX = (e.clientX - pan.x) / zoom;
    const worldY = (e.clientY - pan.y) / zoom;
    dragOffset.current = { x: worldX - item.x, y: worldY - item.y };
  }, [canvasItems, pan, zoom]);

  /* ── Update Items ── */
  const updateItem = (id: string, updates: Partial<CanvasItem>) => {
    setCanvasItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const updateActiveSlide = (updates: Partial<Slide>) => {
    if (!activeItem || !activeSlide) return;
    const newSlides = [...activeItem.slides];
    newSlides[activeItem.activeSlideIndex] = { ...newSlides[activeItem.activeSlideIndex], ...updates };
    updateItem(activeItem.id, { slides: newSlides });
  };

  /* ── Add Item ── */
  const addItem = (type: 'post' | 'carousel') => {
    const newItem = createCanvasItem(type, canvasItems.length, activeItem?.format || 'aspect-[4/5]');
    setCanvasItems(prev => [...prev, newItem]);
    setActiveItemId(newItem.id);
  };

  /* ── Delete Item ── */
  const deleteItem = (id: string) => {
    const newItems = canvasItems.filter(i => i.id !== id);
    setCanvasItems(newItems);
    if (activeItemId === id && newItems.length > 0) {
      setActiveItemId(newItems[0].id);
    }
  };

  /* ── Duplicate Item ── */
  const duplicateItem = (id: string) => {
    const item = canvasItems.find(i => i.id === id);
    if (!item) return;
    const newItem: CanvasItem = {
      ...item,
      id: generateId(),
      name: `${item.name} (Copy)`,
      x: item.x + 50,
      y: item.y + 50,
      slides: item.slides.map(s => ({ ...s, id: Date.now() + Math.floor(Math.random() * 1000) })),
    };
    setCanvasItems(prev => [...prev, newItem]);
    setActiveItemId(newItem.id);
  };

  /* ── Smart Template ── */
  const applySmartTemplate = (template: SmartTemplate) => {
    const slides = template.generate(activeExpert?.name || 'Expert', activeExpert?.niche || 'Negócio');
    const newItem: CanvasItem = {
      id: generateId(),
      name: template.name,
      type: 'carousel',
      x: 100 + (canvasItems.length % 3) * 500,
      y: 100 + Math.floor(canvasItems.length / 3) * 600,
      displayScale: 0.75,
      slides,
      activeSlideIndex: 0,
      format: 'aspect-[4/5]',
      fadeIntensity: 85,
      fadeColor: '#09090B',
      corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Author / Handle', br: 'Slide Counter' },
    };
    setCanvasItems(prev => [...prev, newItem]);
    setActiveItemId(newItem.id);
    setViewMode('focus');
  };

  /* ── Slide Management ── */
  const addSlide = (itemId: string, type: SlideType) => {
    const item = canvasItems.find(i => i.id === itemId);
    if (!item) return;
    const newSlide = createDefaultSlide(type);
    const newSlides = [...item.slides, newSlide];
    updateItem(itemId, { slides: newSlides, activeSlideIndex: newSlides.length - 1 });
  };

  const deleteSlide = (itemId: string, slideIndex: number) => {
    const item = canvasItems.find(i => i.id === itemId);
    if (!item || item.slides.length <= 1) return;
    const newSlides = item.slides.filter((_, i) => i !== slideIndex);
    updateItem(itemId, { slides: newSlides, activeSlideIndex: Math.min(item.activeSlideIndex, newSlides.length - 1) });
  };

  const moveSlide = (itemId: string, from: number, to: number) => {
    if (to < 0) return;
    const item = canvasItems.find(i => i.id === itemId);
    if (!item) return;
    const newSlides = [...item.slides];
    if (to >= newSlides.length) {
      // Move to another item
      const [moved] = newSlides.splice(from, 1);
      const targetItem = canvasItems[to - newSlides.length];
      if (targetItem) {
        updateItem(targetItem.id, { slides: [...targetItem.slides, moved] });
        updateItem(itemId, { slides: newSlides, activeSlideIndex: Math.min(from, newSlides.length - 1) });
      }
      return;
    }
    const [moved] = newSlides.splice(from, 1);
    newSlides.splice(to, 0, moved);
    updateItem(itemId, { slides: newSlides, activeSlideIndex: to });
  };

  const setActiveSlide = (itemId: string, index: number) => {
    updateItem(itemId, { activeSlideIndex: index });
    setActiveItemId(itemId);
  };

  /* ── Display Scale ── */
  const setItemDisplayScale = (itemId: string, scale: number) => {
    updateItem(itemId, { displayScale: Math.min(Math.max(scale, 0.3), 1.5) });
  };

  /* ── Layout Presets ── */
  const applyPreset = (preset: LayoutPreset) => {
    if (!activeItem) return;
    updateItem(activeItem.id, {
      fadeIntensity: preset.fadeIntensity,
      fadeColor: preset.fadeColor,
      corners: { ...preset.corners },
    });
    updateActiveSlide({
      layoutTemplate: preset.layoutTemplate,
      alignment: preset.alignment,
    });
  };

  const applySavedLayout = (layout: SavedLayout) => {
    if (!activeItem) return;
    updateItem(activeItem.id, {
      fadeIntensity: layout.fadeIntensity,
      fadeColor: layout.fadeColor,
      corners: { ...layout.corners },
    });
    updateActiveSlide({
      layoutTemplate: layout.layoutTemplate,
      alignment: layout.alignment,
    });
  };

  const saveCurrentLayout = () => {
    if (!newLayoutName.trim() || !activeItem || !activeSlide) return;
    const newLayout: SavedLayout = {
      id: `saved-${generateId()}`,
      name: newLayoutName.trim(),
      createdAt: new Date().toISOString(),
      layoutTemplate: activeSlide.layoutTemplate,
      alignment: activeSlide.alignment,
      fadeIntensity: activeItem.fadeIntensity,
      fadeColor: activeItem.fadeColor,
      corners: { ...activeItem.corners },
    };
    setSavedLayouts([newLayout, ...savedLayouts]);
    setNewLayoutName('');
    setShowSaveLayoutModal(false);
  };

  const deleteSavedLayout = (id: string) => setSavedLayouts(prev => prev.filter(l => l.id !== id));

  /* ── EXPORT ── */
  const exportItem = async (item: CanvasItem, formatType: ExportFormat = 'png') => {
    setExporting(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) { setExporting(false); return; }

    let width = 1080, height = 1350;
    if (item.format.includes('square') || item.format.includes('1/1')) { width = 1080; height = 1080; }
    else if (item.format.includes('9/16')) { width = 1080; height = 1920; }
    else if (item.format.includes('16/9')) { width = 1920; height = 1080; }

    canvas.width = width;
    canvas.height = height;

    // Process each slide
    for (let sIdx = 0; sIdx < item.slides.length; sIdx++) {
      const slide = item.slides[sIdx];

      // Clear
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);

      // Draw media
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = slide.mediaUrl;
      });

      if (img.complete && img.naturalWidth > 0) {
        const scale = slide.mediaScale || 1;
        const drawW = width * scale;
        const drawH = (img.naturalHeight / img.naturalWidth) * drawW;
        ctx.drawImage(img, (width - drawW) / 2 + (slide.mediaOffsetX || 0), (height - drawH) / 2 + (slide.mediaOffsetY || 0), drawW, drawH);
      } else {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#1a1a2e');
        grad.addColorStop(1, '#16213e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Fade
      const fadeAlpha = item.fadeIntensity / 100;
      const fadeGrad = ctx.createLinearGradient(0, height * 0.3, 0, height);
      fadeGrad.addColorStop(0, item.fadeColor + '00');
      fadeGrad.addColorStop(1, item.fadeColor + Math.round(fadeAlpha * 255).toString(16).padStart(2, '0'));
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, width, height);

      // Brand tint
      ctx.fillStyle = (activeExpert?.brandColor || '#6366f1') + '1A';
      ctx.fillRect(0, 0, width, height);

      // Text content
      const margin = width * 0.08;
      const textX = slide.alignment === 'center' ? width / 2 : slide.alignment === 'right' ? width - margin : margin;
      const textAlign = slide.alignment === 'center' ? 'center' : slide.alignment === 'right' ? 'right' : 'left';
      let currentY = height * 0.55;
      if (slide.layoutTemplate === 'bottom') currentY = height * 0.65;
      if (slide.layoutTemplate === 'top') currentY = height * 0.18;
      if (slide.layoutTemplate === 'minimal') currentY = height * 0.45;
      if (slide.layoutTemplate === 'quote') currentY = height * 0.42;
      if (slide.layoutTemplate === 'data') currentY = height * 0.4;

      ctx.textAlign = textAlign as CanvasTextAlign;
      ctx.textBaseline = 'top';

      if (slide.hat) {
        ctx.font = `bold ${width * 0.022}px sans-serif`;
        ctx.fillStyle = activeExpert?.brandColor || '#6366f1';
        ctx.fillText(slide.hat.toUpperCase(), textX, currentY);
        currentY += width * 0.045;
      }
      if (slide.title) {
        const lines = slide.title.split('\n');
        ctx.font = `900 ${width * 0.065}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        lines.forEach(line => { ctx.fillText(line, textX, currentY); currentY += width * 0.08; });
        currentY += width * 0.02;
      }
      if (slide.subtitle) {
        ctx.font = `bold ${width * 0.032}px sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillText(slide.subtitle, textX, currentY);
        currentY += width * 0.06;
      }
      if (slide.text) {
        ctx.font = `500 ${width * 0.026}px sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        const maxTextWidth = width * 0.84;
        const words = slide.text.split(' ');
        let line = '';
        words.forEach(word => {
          const testLine = line + word + ' ';
          if (ctx.measureText(testLine).width > maxTextWidth && line !== '') {
            ctx.fillText(line, textX, currentY);
            line = word + ' '; currentY += width * 0.04;
          } else { line = testLine; }
        });
        ctx.fillText(line, textX, currentY);
        currentY += width * 0.07;
      }
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
      const cm = width * 0.04;
      ctx.font = `bold ${width * 0.018}px sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.textAlign = 'left';

      if (item.corners.tl === 'Logo') {
        ctx.fillStyle = activeExpert?.brandColor || '#6366f1';
        ctx.fillRect(cm, cm, width * 0.04, width * 0.04);
      }
      if (item.corners.bl === 'Author / Handle') {
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = `bold ${width * 0.02}px sans-serif`;
        ctx.fillText((activeExpert?.name || 'Expert').toUpperCase(), cm, height - cm - width * 0.02);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = `${width * 0.016}px sans-serif`;
        ctx.fillText(activeExpert?.handle || '@expert.os', cm, height - cm + width * 0.005);
      }
      if (item.corners.br === 'Slide Counter') {
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = `bold ${width * 0.02}px sans-serif`;
        ctx.fillText(`${String(sIdx + 1).padStart(2, '0')} / ${String(item.slides.length).padStart(2, '0')}`, width - cm, height - cm - width * 0.01);
      }

      // Download this slide
      const mime = formatType === 'jpg' ? 'image/jpeg' : 'image/png';
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const name = activeExpert?.handle?.replace('@', '') || 'expert';
        link.download = `${name}_${item.name.replace(/\s+/g, '_')}_slide${sIdx + 1}_${width}x${height}.${formatType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, mime, formatType === 'jpg' ? 0.92 : undefined);
    }

    setExporting(false);
  };

  /* ── AI COPY ── */
  const generateAICopy = async () => {
    if (!activeExpert || !activeSlide) return;
    setIsGeneratingCopy(true);
    await new Promise(r => setTimeout(r, 1500));

    const copies = [
      { hat: `${activeExpert.niche.toUpperCase()} INSIGHT`, title: `A Verdade Sobre\n${activeExpert.niche}`, subtitle: 'O que ninguém te conta', text: `Baseado na análise de ${activeExpert.name}, descobrimos que 73% dos profissionais em ${activeExpert.niche.toLowerCase()} cometem o mesmo erro fundamental.`, cta: 'LEIA MAIS' },
      { hat: 'CASE STUDY', title: `Como Escalar\n${activeExpert.niche}`, subtitle: 'Framework validado', text: `${activeExpert.name} desenvolveu um método único para dominar ${activeExpert.niche.toLowerCase()}. Em 90 dias, resultados extraordinários.`, cta: 'ACESSE O MÉTODO' },
      { hat: 'ERRO COMUM', title: `Pare de Fazer\nIsso Agora`, subtitle: 'A mudança começa hoje', text: `A maior lição que ${activeExpert.name} aprendeu: o que funcionava antes não funciona mais. Aqui está o novo playbook.`, cta: 'SALVE ESSE POST' },
    ];
    const randomCopy = copies[Math.floor(Math.random() * copies.length)];
    updateActiveSlide({ ...randomCopy });
    setAiChat(prev => [...prev, { id: Date.now(), role: 'user', text: 'Gere copy com IA' }, { id: Date.now() + 1, role: 'agent', text: `Copy gerado para ${activeExpert.name}!` }]);
    setIsGeneratingCopy(false);
  };

  const handleAiSend = () => {
    if (!aiInput.trim()) return;
    const text = aiInput.trim();
    setAiInput('');
    setAiChat(prev => [...prev, { id: Date.now(), role: 'user', text }]);
    setTimeout(() => setAiChat(prev => [...prev, { id: Date.now() + 1, role: 'agent', text: 'Entendido! Analisando o contexto do expert para sugerir ajustes.' }]), 800);
  };

  /* ── CSV ── */
  const downloadCSVTemplate = () => {
    const headers = ['itemType', 'itemName', 'slideType', 'backgroundMediaUrl', 'hat', 'title', 'subtitle', 'text', 'cta', 'alignment', 'layoutTemplate', 'format'];
    const rows = [
      ['carousel', 'Meu Carrossel', 'image', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564', 'EXPERT INSIGHTS', 'THE ARCHITECTURE\nOF OS', 'Designing for the future', 'Mastering visual hierarchy.', 'SWIPE TO LEARN', 'left', 'overlay', '4:5'],
      ['post', 'Post Único', 'image', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670', 'TIP RÁPIDO', 'RESULTADOS REAIS', 'Transformação em 90 dias', 'Descubra como alcançar resultados.', 'LINK NA BIO', 'center', 'bottom', '4:5'],
    ];
    const escapeCSV = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const csv = [headers.join(','), ...rows.map(r => r.map(escapeCSV).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contentos_batch_template.csv';
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
          if (currentRow.some(c => c.trim() !== '')) rows.push(currentRow);
          currentRow = []; currentCell = '';
        } else { currentCell += char; }
      }
      if (currentCell || currentRow.length > 0) { currentRow.push(currentCell); if (currentRow.some(c => c.trim() !== '')) rows.push(currentRow); }

      const dataRows = rows.slice(1);
      const itemsMap = new Map<string, { type: string; name: string; format: string; slides: Slide[] }>();

      dataRows.forEach(row => {
        const itemType = row[0] || 'post';
        const itemName = row[1] || 'Untitled';
        const format = row[11] || '4:5';
        const key = `${itemType}-${itemName}`;
        if (!itemsMap.has(key)) {
          itemsMap.set(key, { type: itemType, name: itemName, format, slides: [] });
        }
        const slide: Slide = {
          id: Date.now() + Math.floor(Math.random() * 10000),
          type: (row[2] === 'video' ? 'video' : 'image') as SlideType,
          mediaUrl: row[3] || 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
          hat: row[4] || '', title: row[5] || '', subtitle: row[6] || '', text: row[7] || '', cta: row[8] || '',
          alignment: (['left', 'center', 'right', 'justify'].includes(row[9]) ? row[9] : 'left') as Alignment,
          layoutTemplate: (['overlay', 'bottom', 'top', 'split', 'minimal', 'magazine', 'quote', 'data'].includes(row[10]) ? row[10] : 'overlay') as LayoutTemplate,
          customPosition: { x: 0, y: 0 }, mediaScale: 1,
        };
        itemsMap.get(key)!.slides.push(slide);
      });

      const newItems: CanvasItem[] = Array.from(itemsMap.values()).map((data, idx) => ({
        id: generateId(), name: data.name, type: data.type as 'post' | 'carousel',
        x: 100 + (idx % 3) * 500, y: 100 + Math.floor(idx / 3) * 600,
        displayScale: 0.8, slides: data.slides, activeSlideIndex: 0,
        format: data.format === '1:1' ? 'aspect-square' : data.format === '9:16' ? 'aspect-[9/16]' : data.format === '16:9' ? 'aspect-video' : 'aspect-[4/5]',
        fadeIntensity: 85, fadeColor: '#09090B',
        corners: { tl: 'Logo', tr: 'Series Tag', bl: 'Author / Handle', br: 'Slide Counter' },
      }));

      setCanvasItems(prev => [...prev, ...newItems]);
      if (newItems.length > 0) setActiveItemId(newItems[0].id);
    };
    reader.readAsText(file);
    if (csvInputRef.current) csvInputRef.current.value = '';
  };

  /* ── File Upload ── */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    updateActiveSlide({ mediaUrl: url, type: isVideo ? 'video' : 'image', mediaScale: 1, mediaOffsetX: 0, mediaOffsetY: 0 });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ── Render Corner ── */
  const renderCorner = (type: CornerType) => {
    switch (type) {
      case 'Logo': return <div className="w-7 h-7 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10"><Hexagon size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} /></div>;
      case 'Series Tag': return <span className="inline-block px-2.5 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-text-main border border-white/10">Expert Series</span>;
      case 'Author / Handle': return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border p-0.5" style={{ borderColor: `${activeExpert?.brandColor || '#6366f1'}66` }}>
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}33` }}>
              {activeExpert?.profilePicture ? <img src={activeExpert.profilePicture} alt={activeExpert.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${activeExpert?.brandColor || '#6366f1'}, #000)` }} />}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-widest uppercase text-text-main shadow-black drop-shadow-md">{activeExpert?.name || 'Expert'}</span>
            <span className="text-[8px] text-text-muted shadow-black drop-shadow-md">{activeExpert?.handle || '@expert'}</span>
          </div>
        </div>
      );
      case 'Slide Counter': return <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold text-white border border-white/10">{String((activeItem?.activeSlideIndex || 0) + 1).padStart(2, '0')} / {String(activeItem?.slides.length || 1).padStart(2, '0')}</div>;
      case 'Arrow (Next)': return <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-lg" style={{ color: activeExpert?.brandColor || '#6366f1' }}><ArrowRight size={16} /></div>;
      case 'Swipe Right': return <div className="flex items-center gap-1.5 text-white/90 drop-shadow-md"><span className="text-[9px] font-black uppercase tracking-[0.2em]">Swipe</span><ChevronsRight size={14} style={{ color: activeExpert?.brandColor || '#6366f1' }} /></div>;
      default: return null;
    }
  };

  /* ═══════════════════ RENDER ═══════════════════ */

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden bg-bg text-text-main">
      {/* Mobile Tabs */}
      <div className="lg:hidden flex border-b border-border bg-surface shrink-0">
        {(['items', 'canvas', 'design'] as const).map(panel => (
          <button key={panel} onClick={() => setMobilePanel(panel)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mobilePanel === panel ? 'text-text-main border-b-2' : 'text-text-muted'}`}
            style={{ borderColor: mobilePanel === panel ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}>
            {panel === 'items' && <Layers size={14} />}{panel === 'canvas' && <Monitor size={14} />}{panel === 'design' && <SlidersHorizontal size={14} />}
            {panel === 'items' ? 'Itens' : panel === 'canvas' ? 'Canvas' : 'Design'}
          </button>
        ))}
      </div>

      {/* ═══════ LEFT SIDEBAR ═══════ */}
      <aside className={`relative bg-surface border-r border-border flex flex-col overflow-hidden shrink-0 transition-all duration-300 ${leftCollapsed ? 'lg:w-12' : 'lg:w-[320px]'} ${mobilePanel !== 'items' ? 'hidden lg:flex' : 'flex w-full'}`}>
        <button onClick={() => setLeftCollapsed(!leftCollapsed)} className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-12 bg-surface border border-border rounded-r-lg items-center justify-center text-text-muted hover:text-text-main transition-colors">
          {leftCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {!leftCollapsed ? (
          <>
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">Canvas Items</h2>
                <span className="text-[10px] text-text-muted">{canvasItems.length} itens</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addItem('post')} className="flex-1 bg-white/5 hover:bg-white/10 text-primary text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all">
                  <Square size={13} /> Post
                </button>
                <button onClick={() => addItem('carousel')} className="flex-1 bg-white/5 hover:bg-white/10 text-primary text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all">
                  <Frame size={13} /> Carrossel
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar min-h-0">
              {canvasItems.map((item) => (
                <div key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`p-3 rounded-xl transition-all duration-200 cursor-pointer group ${activeItemId === item.id ? 'bg-white/5 border-l-4 shadow-lg' : 'bg-transparent hover:bg-white/5 border-l-4 border-transparent'}`}
                  style={{ borderLeftColor: activeItemId === item.id ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-bg overflow-hidden flex-shrink-0 relative">
                      <img src={item.slides[0]?.mediaUrl} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-white">{item.slides.length}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${item.type === 'post' ? 'bg-primary/20 text-primary' : 'bg-emerald-400/20 text-emerald-400'}`}>{item.type}</span>
                        <span className="text-xs font-medium truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-muted">
                        <span>{item.format.replace('aspect-', '').replace(/[\[\]]/g, '')}</span>
                        <span>·</span>
                        <span>{Math.round(item.displayScale * 100)}%</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); duplicateItem(item.id); }} className="p-1 text-text-muted hover:text-primary"><Copy size={11} /></button>
                      <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} className="p-1 text-text-muted hover:text-red-400"><Trash2 size={11} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Templates */}
            <div className="p-4 border-t border-border/50">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Templates Rápidos</h2>
              <div className="space-y-2">
                {smartTemplates.map(template => (
                  <button key={template.id} onClick={() => applySmartTemplate(template)}
                    className="w-full p-3 bg-bg rounded-xl border border-border hover:border-primary/50 hover:bg-white/5 transition-all text-left group">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0" style={{ color: activeExpert?.brandColor || '#6366f1' }}>
                        <template.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-text-main group-hover:text-primary transition-colors">{template.name}</p>
                        <p className="text-[10px] text-text-muted">{template.description} · {template.slideCount} slides</p>
                      </div>
                      <Plus size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center pt-4 gap-3">
            <button onClick={() => setLeftCollapsed(false)} className="p-2 text-text-muted hover:text-text-main"><Layers size={18} /></button>
            <div className="w-6 h-px bg-border" />
            <button onClick={() => addItem('post')} className="p-2 text-primary hover:opacity-80"><Square size={18} /></button>
            <button onClick={() => addItem('carousel')} className="p-2 text-primary hover:opacity-80"><Frame size={18} /></button>
          </div>
        )}
      </aside>

      {/* ═══════ CENTER: Infinite Canvas ═══════ */}
      <section ref={canvasContainerRef}
        className={`flex-1 relative overflow-hidden bg-bg select-none ${mobilePanel !== 'canvas' ? 'hidden lg:flex' : 'flex'}`}
        onWheel={handleWheel}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        onContextMenu={e => e.preventDefault()}
        style={{ cursor: isPanning ? 'grabbing' : isDraggingItem ? 'grabbing' : 'default' }}
      >
        {/* Toolbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          <div className="bg-surface/90 backdrop-blur-xl px-4 py-2 rounded-full border border-border/50 flex items-center gap-3 shadow-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{canvasItems.length} itens</span>
            <div className="w-px h-4 bg-border" />
            <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.2))} className="text-text-muted hover:text-text-main transition-colors"><ZoomOut size={14} /></button>
            <span className="text-[10px] font-bold text-text-muted w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} className="text-text-muted hover:text-text-main transition-colors"><ZoomIn size={14} /></button>
            <button onClick={resetView} className="text-text-muted hover:text-text-main transition-colors" title="Reset"><RotateCcw size={14} /></button>
          </div>

          <div className="bg-surface/90 backdrop-blur-xl px-3 py-2 rounded-full border border-border/50 flex items-center gap-2 shadow-2xl">
            <button onClick={() => activeItem && exportItem(activeItem, 'png')} disabled={exporting || !activeItem}
              className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50"
              style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}>
              <Download size={12} /> {exporting ? '...' : 'PNG'}
            </button>
            <button onClick={() => activeItem && exportItem(activeItem, 'jpg')} disabled={exporting || !activeItem}
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-border text-text-muted hover:text-text-main hover:bg-white/5 transition-all disabled:opacity-50">
              JPG
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="bg-surface/90 backdrop-blur-xl px-2 py-2 rounded-full border border-border/50 flex items-center gap-1 shadow-2xl">
            <button onClick={() => setViewMode('canvas')} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'canvas' ? 'text-white' : 'text-text-muted hover:text-text-main'}`} style={{ backgroundColor: viewMode === 'canvas' ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}>
              Canvas
            </button>
            <button onClick={() => setViewMode('focus')} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'focus' ? 'text-white' : 'text-text-muted hover:text-text-main'}`} style={{ backgroundColor: viewMode === 'focus' ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}>
              Foco
            </button>
          </div>
        </div>

        {/* FOCO MODE: Large Preview */}
        {viewMode === 'focus' && activeItem && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            {/* Focus Header */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <button onClick={() => setViewMode('canvas')} className="flex items-center gap-2 px-3 py-2 bg-surface/80 backdrop-blur-xl border border-border/50 rounded-full text-xs font-bold text-text-muted hover:text-text-main transition-colors">
                  <ChevronLeft size={14} /> Voltar ao Canvas
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${activeItem.type === 'post' ? 'bg-primary/20 text-primary' : 'bg-emerald-400/20 text-emerald-400'}`}>{activeItem.type}</span>
                  <span className="text-sm font-semibold text-text-main">{activeItem.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setItemDisplayScale(activeItem.id, activeItem.displayScale - 0.05)} className="p-2 bg-surface/80 backdrop-blur-xl border border-border/50 rounded-full text-text-muted hover:text-text-main"><Minus size={14} /></button>
                <span className="text-xs font-bold text-text-muted w-10 text-center">{Math.round(activeItem.displayScale * 100)}%</span>
                <button onClick={() => setItemDisplayScale(activeItem.id, activeItem.displayScale + 0.05)} className="p-2 bg-surface/80 backdrop-blur-xl border border-border/50 rounded-full text-text-muted hover:text-text-main"><Plus size={14} /></button>
              </div>
            </div>

            {/* Large Preview */}
            <div className="flex-1 flex items-center justify-center w-full overflow-hidden py-16 px-8">
              <div className={`${getAspectClass(activeItem.format)} relative bg-surface rounded-xl overflow-hidden shadow-2xl border border-border/50`}
                style={{ width: getBaseWidth(activeItem.format) * activeItem.displayScale, height: getBaseHeight(activeItem.format) * activeItem.displayScale }}>
                {activeItem.slides[activeItem.activeSlideIndex] && renderSlideContent(activeItem.slides[activeItem.activeSlideIndex], activeItem)}
              </div>
            </div>

            {/* Timeline */}
            <div className="h-28 bg-surface/80 backdrop-blur-xl border-t border-border w-full shrink-0 flex items-center px-6 gap-3 overflow-x-auto custom-scrollbar">
              {activeItem.slides.map((slide, sIdx) => (
                <button key={slide.id} onClick={() => setActiveSlide(activeItem.id, sIdx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${activeItem.activeSlideIndex === sIdx ? 'border-primary scale-110 shadow-lg' : 'border-border/50 hover:border-text-muted'}`}
                  style={{ borderColor: activeItem.activeSlideIndex === sIdx ? (activeExpert?.brandColor || '#6366f1') : undefined }}>
                  <img src={slide.mediaUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-0.5 right-1 text-[9px] font-black text-white">{sIdx + 1}</span>
                </button>
              ))}
              <button onClick={() => addSlide(activeItem.id, 'image')}
                className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-0.5 text-text-muted hover:text-primary hover:border-primary transition-colors flex-shrink-0">
                <Plus size={14} />
                <span className="text-[8px] font-bold uppercase">Add</span>
              </button>
            </div>
          </div>
        )}

        {/* CANVAS MODE: Infinite Canvas */}
        {viewMode === 'canvas' && (
        <div className="absolute inset-0" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
          {/* Grid Background */}
          <div className="absolute" style={{
            left: -pan.x / zoom - 2000, top: -pan.y / zoom - 2000,
            width: 6000 / zoom, height: 6000 / zoom,
            backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)`,
            backgroundSize: `${20}px ${20}px`,
          }} />

          {/* Canvas Items */}
          <div style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>
            {canvasItems.map(item => {
              const isActive = item.id === activeItemId;
              const baseW = getBaseWidth(item.format);
              const baseH = getBaseHeight(item.format);

              return (
                <div key={item.id} data-canvas-item
                  onMouseDown={(e) => handleItemMouseDown(e, item.id)}
                  onDoubleClick={() => { setActiveItemId(item.id); setViewMode('focus'); }}
                  className={`absolute group ${isActive ? 'z-20' : 'z-10'}`}
                  style={{
                    left: item.x,
                    top: item.y,
                    width: baseW * item.displayScale,
                  }}
                >
                  {/* Selection Border */}
                  {isActive && (
                    <div className="absolute -inset-1 border-2 border-primary rounded-xl pointer-events-none" style={{ borderColor: activeExpert?.brandColor || '#6366f1' }} />
                  )}

                  {/* Item Label */}
                  <div className={`absolute -top-6 left-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                    <GripVertical size={10} />
                    {item.name}
                    <span className="text-text-muted/60">({item.slides.length})</span>
                  </div>

                  {/* Item Content */}
                  <div className="relative">
                    {item.type === 'post' ? (
                      /* POST: Single slide */
                      <div className={`${getAspectClass(item.format)} w-full bg-surface rounded-xl overflow-hidden shadow-xl relative border border-border/50`}
                        style={{ height: baseH * item.displayScale }}>
                        {renderSlideContent(item.slides[0], item)}
                      </div>
                    ) : (
                      /* CAROUSEL: All slides side by side */
                      <div className="flex gap-2">
                        {item.slides.map((slide, sIdx) => (
                          <div key={slide.id}
                            onClick={(e) => { e.stopPropagation(); setActiveSlide(item.id, sIdx); }}
                            className={`${getAspectClass(item.format)} bg-surface rounded-xl overflow-hidden shadow-lg relative border-2 cursor-pointer transition-all flex-shrink-0 ${
                              item.activeSlideIndex === sIdx ? 'border-primary scale-[1.02]' : 'border-border/50 hover:border-text-muted'
                            }`}
                            style={{
                              width: (baseW * item.displayScale) / Math.min(item.slides.length, 3),
                              height: (baseH * item.displayScale) / Math.min(item.slides.length, 3) * 1.2,
                              borderColor: item.activeSlideIndex === sIdx ? (activeExpert?.brandColor || '#6366f1') : undefined,
                            }}
                          >
                            {renderSlideContent(slide, item, true)}
                            <div className="absolute bottom-1 right-1.5 bg-black/60 rounded px-1 py-0.5 text-[8px] font-bold text-white">{sIdx + 1}</div>
                          </div>
                        ))}
                        {/* Add slide button */}
                        <button onClick={(e) => { e.stopPropagation(); addSlide(item.id, 'image'); }}
                          className="flex-shrink-0 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 text-text-muted hover:text-primary hover:border-primary hover:bg-white/5 transition-colors"
                          style={{ width: (baseW * item.displayScale) / Math.min(item.slides.length + 1, 3), height: (baseH * item.displayScale) / Math.min(item.slides.length + 1, 3) * 1.2 }}>
                          <Plus size={14} />
                          <span className="text-[8px] font-bold uppercase">Add</span>
                        </button>
                      </div>
                    )}

                    {/* Scale Control on Hover */}
                    {isActive && (
                      <div className="absolute -bottom-8 left-0 right-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); setItemDisplayScale(item.id, item.displayScale - 0.05); }} className="p-1 text-text-muted hover:text-text-main"><Minus size={12} /></button>
                        <input type="range" min="30" max="150" value={Math.round(item.displayScale * 100)}
                          onChange={(e) => setItemDisplayScale(item.id, Number(e.target.value) / 100)}
                          className="flex-1 h-1 bg-border rounded-lg appearance-none cursor-pointer"
                          style={{ accentColor: activeExpert?.brandColor || '#6366f1' }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button onClick={(e) => { e.stopPropagation(); setItemDisplayScale(item.id, item.displayScale + 0.05); }} className="p-1 text-text-muted hover:text-text-main"><Plus size={12} /></button>
                        <span className="text-[10px] font-bold text-text-muted w-8">{Math.round(item.displayScale * 100)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Canvas hint */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[10px] text-text-muted/50 pointer-events-none">
          <span className="flex items-center gap-1"><MousePointerClick size={10} /> Clique e arraste para mover</span>
          <span className="flex items-center gap-1"><Grid3X3 size={10} /> Scroll para zoom</span>
          <span className="flex items-center gap-1"><Move size={10} /> Botão do meio para pan</span>
        </div>
      </section>

      {/* ═══════ RIGHT SIDEBAR ═══════ */}
      <aside className={`relative bg-surface border-l border-border flex flex-col shrink-0 transition-all duration-300 ${rightCollapsed ? 'lg:w-12' : 'lg:w-80'} ${mobilePanel !== 'design' ? 'hidden lg:flex' : 'flex w-full'}`}>
        <button onClick={() => setRightCollapsed(!rightCollapsed)} className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-6 h-12 bg-surface border border-border rounded-l-lg items-center justify-center text-text-muted hover:text-text-main transition-colors">
          {rightCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {!rightCollapsed ? (
          <>
            <div className="flex border-b border-border shrink-0">
              {([{ id: 'content' as const, label: 'Content', icon: Type }, { id: 'design' as const, label: 'Design', icon: SlidersHorizontal }, { id: 'layouts' as const, label: 'Layouts', icon: LayoutGrid }, { id: 'ai' as const, label: 'AI', icon: Sparkles }]).map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 flex items-center justify-center gap-1.5 transition-colors ${activeTab === tab.id ? 'text-text-main' : 'text-text-muted hover:text-text-main border-transparent'}`}
                  style={{ borderColor: activeTab === tab.id ? (activeExpert?.brandColor || '#6366f1') : 'transparent' }}>
                  <tab.icon size={13} /> {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
              {activeTab === 'content' && activeSlide && activeItem && (
                <div className="p-5 space-y-5">
                  <div className="flex items-center gap-2 text-text-main mb-1">
                    <Type size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                    <h3 className="text-[11px] font-black uppercase tracking-widest">{activeItem.name} · Slide {activeItem.activeSlideIndex + 1}</h3>
                  </div>

                  {activeExpert && (
                    <button onClick={generateAICopy} disabled={isGeneratingCopy}
                      className="w-full py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50">
                      <Wand2 size={14} className={isGeneratingCopy ? 'animate-spin' : ''} />
                      {isGeneratingCopy ? 'Gerando...' : 'Gerar Copy com IA'}
                    </button>
                  )}

                  {['hat', 'title', 'subtitle', 'text', 'cta'].map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-text-muted">{field === 'hat' ? 'HAT' : field === 'cta' ? 'CTA' : field}</label>
                      {field === 'title' || field === 'text' ? (
                        <textarea className="w-full bg-bg border border-border rounded-lg text-sm font-bold text-text-main p-2.5 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                          value={activeSlide[field as keyof Slide] as string || ''}
                          onChange={(e) => updateActiveSlide({ [field]: e.target.value })}
                          placeholder={field === 'title' ? 'Main Headline' : 'Body copy...'}
                          rows={field === 'title' ? 2 : 3} />
                      ) : (
                        <input className="w-full bg-bg border border-border rounded-lg text-base md:text-xs text-text-main p-2.5 focus:outline-none focus:ring-1 focus:ring-primary/50"
                          value={activeSlide[field as keyof Slide] as string || ''}
                          onChange={(e) => updateActiveSlide({ [field]: e.target.value })}
                          placeholder={field === 'hat' ? 'e.g. EXPERT INSIGHTS' : field === 'cta' ? 'e.g. SWIPE TO LEARN' : ''} />
                      )}
                    </div>
                  ))}

                  <button onClick={() => updateActiveSlide({ compositionImageUrl: activeSlide.compositionImageUrl ? undefined : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop' })}
                    className="w-full bg-bg border border-border hover:bg-white/5 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
                    <ImageIcon size={14} /> {activeSlide.compositionImageUrl ? 'Remove Comp Image' : 'Add Comp Image Overlay'}
                  </button>

                  {/* Item Display Scale */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-text-muted uppercase font-bold">Tamanho no Canvas</span>
                      <span className="text-[10px] font-black" style={{ color: activeExpert?.brandColor || '#6366f1' }}>{Math.round(activeItem.displayScale * 100)}%</span>
                    </div>
                    <input type="range" min="30" max="150" value={Math.round(activeItem.displayScale * 100)}
                      onChange={(e) => setItemDisplayScale(activeItem.id, Number(e.target.value) / 100)}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" style={{ accentColor: activeExpert?.brandColor || '#6366f1' }} />
                  </div>
                </div>
              )}

              {activeTab === 'design' && activeSlide && activeItem && (
                <div className="p-5 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-main mb-1">
                      <LayoutTemplate size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">Format & Canvas</h3>
                    </div>
                    <select value={activeItem.format} onChange={(e) => updateItem(activeItem.id, { format: e.target.value })}
                      className="w-full bg-bg border border-border rounded-xl p-3 text-sm focus:outline-none appearance-none text-text-main cursor-pointer">
                      <option value="aspect-[4/5]">Feed (4:5)</option>
                      <option value="aspect-square">Single Post (1:1)</option>
                      <option value="aspect-[9/16]">Reels / TikTok (9:16)</option>
                      <option value="aspect-video">YouTube / Web (16:9)</option>
                    </select>
                  </div>

                  <div className="h-px bg-border" />

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
                        <span className="text-[10px] font-black" style={{ color: activeExpert?.brandColor || '#6366f1' }}>{activeItem.fadeIntensity}%</span>
                      </div>
                      <input className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" max="100" min="0" type="range"
                        value={activeItem.fadeIntensity} onChange={(e) => updateItem(activeItem.id, { fadeIntensity: Number(e.target.value) })} style={{ accentColor: activeExpert?.brandColor || '#6366f1' }} />
                    </div>
                    <div className="flex items-center justify-between bg-bg border border-border rounded-lg p-2">
                      <span className="text-xs font-medium text-text-main pl-2">Fade Color</span>
                      <input type="color" value={activeItem.fadeColor} onChange={(e) => updateItem(activeItem.id, { fadeColor: e.target.value })} className="w-6 h-6 rounded bg-transparent border-none cursor-pointer" />
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-text-main mb-1">
                      <Layers size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">4-Corner Layout</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(['tl', 'tr', 'bl', 'br'] as const).map(corner => (
                        <div key={corner} className="space-y-1">
                          <label className="text-[9px] text-text-muted uppercase font-bold pl-1">{corner === 'tl' ? 'Top Left' : corner === 'tr' ? 'Top Right' : corner === 'bl' ? 'Bottom Left' : 'Bottom Right'}</label>
                          <select value={activeItem.corners[corner]} onChange={(e) => updateItem(activeItem.id, { corners: { ...activeItem.corners, [corner]: e.target.value as CornerType } })}
                            className="w-full bg-bg border border-border rounded-lg p-2 text-sm focus:outline-none appearance-none text-text-main">
                            <option>None</option><option>Logo</option><option>Series Tag</option><option>Author / Handle</option><option>Slide Counter</option><option>Arrow (Next)</option><option>Swipe Right</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'layouts' && (
                <div className="p-5 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-text-main mb-3">
                      <Palette size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest">Layout Presets</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {layoutPresets.map(preset => (
                        <button key={preset.id} onClick={() => applyPreset(preset)}
                          className={`p-3 rounded-xl border transition-all text-left hover:bg-white/5 ${activeSlide?.layoutTemplate === preset.layoutTemplate ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <preset.icon size={18} className="mb-2" style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                          <p className="text-xs font-medium text-text-main">{preset.name}</p>
                          <p className="text-[10px] text-text-muted mt-0.5">{preset.alignment} · {preset.fadeIntensity}% fade</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-text-main">
                        <BookmarkPlus size={16} style={{ color: activeExpert?.brandColor || '#6366f1' }} />
                        <h3 className="text-[11px] font-black uppercase tracking-widest">Saved Layouts</h3>
                      </div>
                      <button onClick={() => setShowSaveLayoutModal(true)} className="text-[10px] text-primary hover:underline font-bold uppercase">Salvar Atual</button>
                    </div>
                    {savedLayouts.length === 0 ? <p className="text-xs text-text-muted text-center py-4">Nenhum layout salvo</p> : (
                      <div className="space-y-2">
                        {savedLayouts.map(layout => (
                          <div key={layout.id} className="flex items-center gap-3 p-3 bg-bg rounded-xl border border-border group">
                            <button onClick={() => applySavedLayout(layout)} className="flex-1 text-left">
                              <p className="text-sm font-medium text-text-main">{layout.name}</p>
                              <p className="text-[10px] text-text-muted">{layout.layoutTemplate} · {layout.alignment} · {new Date(layout.createdAt).toLocaleDateString()}</p>
                            </button>
                            <button onClick={() => deleteSavedLayout(layout.id)} className="p-1.5 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {showSaveLayoutModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                      <div className="bg-surface border border-border rounded-xl w-full max-w-sm p-5 space-y-4">
                        <h3 className="text-lg font-semibold text-text-main">Salvar Layout</h3>
                        <input type="text" value={newLayoutName} onChange={(e) => setNewLayoutName(e.target.value)}
                          placeholder="Nome do layout" className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
                          onKeyDown={(e) => { if (e.key === 'Enter') saveCurrentLayout(); }} />
                        <div className="flex gap-3">
                          <button onClick={() => setShowSaveLayoutModal(false)} className="flex-1 px-4 py-2.5 border border-border text-text-main rounded-lg font-medium hover:bg-white/5 transition-colors text-sm">Cancelar</button>
                          <button onClick={saveCurrentLayout} disabled={!newLayoutName.trim()} className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm disabled:opacity-50">Salvar</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1 text-green-500"><CheckCircle2 size={12} /> Research</div>
                    <ChevronRight size={12} className="text-text-muted" />
                    <div className="flex items-center gap-1 text-green-500"><CheckCircle2 size={12} /> Copy</div>
                    <ChevronRight size={12} className="text-text-muted" />
                    <div className="flex items-center gap-1 animate-pulse" style={{ color: activeExpert?.brandColor || '#6366f1' }}><Brain size={12} /> Design</div>
                  </div>

                  <div className="flex items-center justify-between mb-5 p-3 rounded-xl bg-bg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}33`, color: activeExpert?.brandColor || '#6366f1' }}>
                        <Bot size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-text-main">{activeAgent?.name || 'AI Assistant'}</h3>
                        <p className="text-[10px] text-text-muted">{activeExpert?.name || 'Expert OS'}</p>
                      </div>
                    </div>
                    <select value={activeAgent?.id || ''} onChange={(e) => setSelectedAgentId(e.target.value)} className="bg-surface border border-border rounded-lg text-xs p-2 focus:outline-none appearance-none pr-8 cursor-pointer">
                      {expertAgents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <input type="file" ref={csvInputRef} onChange={handleCSVUpload} accept=".csv" className="hidden" />
                    <button onClick={() => csvInputRef.current?.click()} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <FileSpreadsheet size={16} className="text-text-muted group-hover:text-primary transition-colors" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Import CSV</span>
                    </button>
                    <button onClick={downloadCSVTemplate} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <Download size={16} className="text-text-muted group-hover:text-primary transition-colors" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Template CSV</span>
                    </button>
                    <button onClick={generateAICopy} disabled={isGeneratingCopy} className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <Wand2 size={16} className={`text-text-muted group-hover:text-primary transition-colors ${isGeneratingCopy ? 'animate-spin' : ''}`} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">AI Copy</span>
                    </button>
                    <button className="bg-bg border border-border hover:bg-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group min-h-[44px]">
                      <CalendarClock size={16} className="text-text-muted group-hover:text-primary transition-colors" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main text-center">Schedule</span>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {aiChat.map(msg => (
                      <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.role === 'agent' && (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}33`, color: activeExpert?.brandColor || '#6366f1' }}>
                            <Bot size={12} />
                          </div>
                        )}
                        <div className={`p-3 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-surface border border-border text-text-main' : 'bg-bg border border-border text-text-muted'}`}>{msg.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 bg-bg/50 border-t border-border shrink-0">
              <div className="relative group">
                <textarea value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAiSend(); } }}
                  className="w-full bg-surface border border-border rounded-xl text-sm text-text-main p-4 pr-12 h-20 resize-none transition-all placeholder:text-text-muted/50 focus:outline-none"
                  placeholder={activeTab === 'ai' ? "Tell the Visual Director..." : "Ask AI to edit..."} />
                <button onClick={handleAiSend} className="absolute bottom-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white hover:brightness-110 transition-all active:scale-95 shadow-lg" style={{ backgroundColor: activeExpert?.brandColor || '#6366f1' }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center pt-4 gap-3">
            <button onClick={() => setRightCollapsed(false)} className="p-2 text-text-muted hover:text-text-main"><SlidersHorizontal size={18} /></button>
            <div className="w-6 h-px bg-border" />
            <button onClick={() => { setActiveTab('content'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary"><Type size={18} /></button>
            <button onClick={() => { setActiveTab('design'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary"><Palette size={18} /></button>
            <button onClick={() => { setActiveTab('layouts'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary"><LayoutGrid size={18} /></button>
            <button onClick={() => { setActiveTab('ai'); setRightCollapsed(false); }} className="p-2 text-text-muted hover:text-primary"><Sparkles size={18} /></button>
          </div>
        )}
      </aside>
    </div>
  );

  /* ═══════ SLIDE RENDERER ═══════ */
  function renderSlideContent(slide: Slide, item: CanvasItem, isMiniature = false) {
    return (
      <>
        {slide.type === 'video' ? (
          <video src={slide.mediaUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline
            style={{ transform: `scale(${slide.mediaScale || 1}) translate(${slide.mediaOffsetX || 0}px, ${slide.mediaOffsetY || 0}px)` }} />
        ) : (
          <img src={slide.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `scale(${slide.mediaScale || 1}) translate(${slide.mediaOffsetX || 0}px, ${slide.mediaOffsetY || 0}px)` }} />
        )}
        <div className="absolute inset-0 mix-blend-multiply transition-opacity duration-300" style={{
          background: `linear-gradient(to top, ${item.fadeColor}, ${item.fadeColor}66, transparent)`,
          opacity: item.fadeIntensity / 100
        }} />
        <div className="absolute inset-0 mix-blend-overlay" style={{ backgroundColor: `${activeExpert?.brandColor || '#6366f1'}1A` }} />

        {!isMiniature && (
          <>
            <div className="absolute top-4 left-4 z-20">{renderCorner(item.corners.tl)}</div>
            <div className="absolute top-4 right-4 z-20">{renderCorner(item.corners.tr)}</div>
            <div className="absolute bottom-4 left-4 z-20">{renderCorner(item.corners.bl)}</div>
            <div className="absolute bottom-4 right-4 z-20">{renderCorner(item.corners.br)}</div>
          </>
        )}

        <div className={`absolute inset-0 flex flex-col p-6 z-10 pointer-events-none transition-all duration-300 ${getLayoutClasses(slide.layoutTemplate)} ${getAlignmentClasses(slide.alignment)}`}
          style={{ transform: `translate(${slide.customPosition?.x || 0}px, ${slide.customPosition?.y || 0}px)` }}>
          {slide.compositionImageUrl && !isMiniature && (
            <img src={slide.compositionImageUrl} alt="" className="w-20 h-20 object-cover rounded-xl shadow-2xl mb-4 border-2 border-white/20" />
          )}
          {slide.hat && <span className={`uppercase tracking-[0.3em] font-black mb-2 drop-shadow-md ${isMiniature ? 'text-[6px]' : 'text-[8px]'}`} style={{ color: activeExpert?.brandColor || '#6366f1' }}>{slide.hat}</span>}
          {slide.title && <h1 className={`font-black leading-tight tracking-tighter text-white drop-shadow-xl mb-1 ${isMiniature ? 'text-[10px]' : 'text-xl md:text-2xl'}`} dangerouslySetInnerHTML={{ __html: slide.title.replace(/\n/g, '<br/>') }} />}
          {slide.subtitle && <h2 className={`font-bold text-white/90 drop-shadow-lg mb-2 ${isMiniature ? 'text-[7px]' : 'text-sm'}`}>{slide.subtitle}</h2>}
          {slide.text && <p className={`font-medium text-white/80 leading-relaxed drop-shadow-lg max-w-[90%] mb-3 ${isMiniature ? 'text-[6px] line-clamp-3' : 'text-xs'}`}>{slide.text}</p>}
          {slide.cta && !isMiniature && (
            <div className="mt-1 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md border border-white/20"
              style={{ backgroundColor: activeExpert?.brandColor || '#6366f1', fontSize: '8px' }}>{slide.cta}</div>
          )}
        </div>
      </>
    );
  }
}
