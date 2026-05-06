import { create } from 'zustand';

export interface BriefingAsset {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  name: string;
  url?: string;
  description?: string;
}

export interface BriefingSection {
  id: string;
  title: string;
  content: string;
  required: boolean;
}

export interface Briefing {
  id: string;
  expertId: string;
  scriptId?: string;
  scriptTitle: string;
  editorName: string;
  status: 'draft' | 'ready' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;
  format: 'reels' | 'carousel' | 'story' | 'long-form' | 'podcast' | 'thumbnail';
  platform: string;
  duration?: number;
  sections: BriefingSection[];
  assets: BriefingAsset[];
  brandGuidelines: string;
  referenceLinks: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface BriefingStore {
  briefings: Briefing[];
  getBriefingsByExpert: (expertId: string) => Briefing[];
  addBriefing: (briefing: Briefing) => void;
  updateBriefing: (id: string, updates: Partial<Briefing>) => void;
  deleteBriefing: (id: string) => void;
}

const mockBriefings: Briefing[] = [
  {
    id: 'brief-1',
    expertId: '1',
    scriptId: 'script-1',
    scriptTitle: 'Por que o mercado de luxo não quebrou em 2026',
    editorName: 'Carlos Designer',
    status: 'ready',
    priority: 'high',
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    format: 'reels',
    platform: 'Instagram',
    duration: 60,
    sections: [
      { id: 'sec1', title: 'Hook Visual', content: 'Texto animado em serifada fina sobre fundo de propriedade de luxo. Ouro sobre índigo. Transição rápida 0.5s.', required: true },
      { id: 'sec2', title: 'Storytelling', content: 'Cut rápidos entre o escritório da Aria e imagens de propriedades. B-roll cinematográfico. Duração: 15s.', required: true },
      { id: 'sec3', title: 'Conteúdo Educacional', content: 'Gráfico animado mostrando evolução do mercado. Cores: índigo, dourado, branco. Fonte: Cormorant Garamond para números.', required: true },
      { id: 'sec4', title: 'CTA', content: 'Overlay com "LUXO" pulsando sutilmente. Link na bio em destaque. 5s finais.', required: true },
    ],
    assets: [
      { id: 'a1', type: 'image', name: 'aria-office.jpg', description: 'Foto do escritório da Aria' },
      { id: 'a2', type: 'video', name: 'property-tour.mp4', description: 'Tour da propriedade principal' },
    ],
    brandGuidelines: 'Usar paleta índigo + dourado. Fonte serifada para títulos, sans para body. Transições suaves, nada brusco. Estética: opulência silenciosa.',
    referenceLinks: ['https://instagram.com/aria.sterling/reel-123', 'https://pinterest.com/luxury-reels-2026'],
    notes: 'Cliente pediu para manter o tom autoritário mas acessível. Evitar zoom excessivo nas propriedades.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'brief-2',
    expertId: '2',
    scriptId: 'script-2',
    scriptTitle: 'O erro que custa $50K em MRR todo mês',
    editorName: 'Ana Motion',
    status: 'in_progress',
    priority: 'urgent',
    deadline: new Date(Date.now() + 86400000).toISOString(),
    format: 'carousel',
    platform: 'LinkedIn',
    sections: [
      { id: 'sec1', title: 'Capa', content: 'Slide 1: Título impactante com número 73% em destaque. Fundo azul elétrico + slate. Fonte Space Grotesk.', required: true },
      { id: 'sec2', title: 'O Problema', content: 'Slide 2-3: Gráfico mostrando churn médio vs churn otimizado. Seta vermelha para cima no churn.', required: true },
      { id: 'sec3', title: 'A Solução', content: 'Slide 4-6: Framework em 4 passos com ícones minimalistas. Cada passo com bullet curto.', required: true },
      { id: 'sec4', title: 'Resultados', content: 'Slide 7: Case study com números reais. Antes/Depois. CTA final com link.', required: true },
    ],
    assets: [
      { id: 'a1', type: 'image', name: 'churn-graph.png', description: 'Gráfico de churn antes e depois' },
    ],
    brandGuidelines: 'Paleta: azul elétrico (#3b82f6) + slate escuro (#0f172a) + ciano (#06b6d4). Fontes: Space Grotesk (títulos), Sora (subtítulos), Poppins (body). Estilo: data-driven, minimalista, tech.',
    referenceLinks: ['https://linkedin.com/pulse/onboarding-framework'],
    notes: 'Urgente para evento de growth na quinta. Precisa estar pronto amanhã às 18h.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const useBriefingStore = create<BriefingStore>((set, get) => ({
  briefings: mockBriefings,
  getBriefingsByExpert: (expertId) => get().briefings.filter(b => b.expertId === expertId),
  addBriefing: (briefing) => set((state) => ({ briefings: [briefing, ...state.briefings] })),
  updateBriefing: (id, updates) => set((state) => ({
    briefings: state.briefings.map(b => b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b)
  })),
  deleteBriefing: (id) => set((state) => ({
    briefings: state.briefings.filter(b => b.id !== id)
  })),
}));
