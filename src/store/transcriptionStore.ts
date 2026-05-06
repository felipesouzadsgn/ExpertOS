import { create } from 'zustand';

export interface TranscriptSegment {
  id: string;
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

export interface SuggestedCut {
  id: string;
  start: number;
  end: number;
  type: 'hook' | 'viral_moment' | 'insight' | 'quote' | 'cta';
  title: string;
  description: string;
  engagementScore: number;
  platform: string;
  duration: number;
  transcript: string;
}

export interface Transcription {
  id: string;
  expertId: string;
  title: string;
  sourceUrl?: string;
  sourceType: 'upload' | 'youtube' | 'podcast' | 'live';
  status: 'uploading' | 'processing' | 'transcribing' | 'done' | 'error';
  progress: number;
  language: string;
  duration: number;
  segments: TranscriptSegment[];
  suggestedCuts: SuggestedCut[];
  summary?: string;
  keyTopics?: string[];
  createdAt: string;
}

interface TranscriptionStore {
  transcriptions: Transcription[];
  getTranscriptionsByExpert: (expertId: string) => Transcription[];
  addTranscription: (t: Transcription) => void;
  updateTranscription: (id: string, updates: Partial<Transcription>) => void;
  deleteTranscription: (id: string) => void;
  addCut: (transcriptionId: string, cut: SuggestedCut) => void;
}

const mockTranscriptions: Transcription[] = [
  {
    id: 'trans-1',
    expertId: '1',
    title: 'Live: Tendências Imobiliárias de Luxo Q1 2026',
    sourceUrl: 'https://youtube.com/watch?v=abc123',
    sourceType: 'youtube',
    status: 'done',
    progress: 100,
    language: 'pt-BR',
    duration: 2847,
    segments: [
      { id: 'seg1', start: 0, end: 45, text: 'Boa noite a todos. Hoje a gente vai falar sobre algo que muita gente tem perguntado: será que o mercado de luxo realmente segurou em 2026?', speaker: 'Aria' },
      { id: 'seg2', start: 45, end: 120, text: 'Eu posso dizer com propriedade: não apenas segurou, mas evoluiu. E quem entendeu a nova dinâmica já está colhendo frutos.', speaker: 'Aria' },
      { id: 'seg3', start: 120, end: 210, text: 'A grande mudança foi do preço para a experiência. Antes, a gente vendia metros quadrados. Hoje a gente vende legados, narrativas, status.', speaker: 'Aria' },
      { id: 'seg4', start: 210, end: 300, text: 'Eu tenho um cliente que comprou uma propriedade em Dubai não porque precisava, mas porque a arquitetura conta uma história que ele quer que o sobrenome dele carregue.', speaker: 'Aria' },
      { id: 'seg5', start: 300, end: 420, text: 'Isso é o que eu chamo de coeficiente de legado. É a métrica mais importante do mercado de luxo hoje — e ninguém fala sobre ela.', speaker: 'Aria' },
      { id: 'seg6', start: 420, end: 600, text: 'Para calcular o coeficiente de legado, você precisa avaliar três variáveis: a narrativa arquitetônica, a raridade da propriedade e o efeito de rede do bairro.', speaker: 'Aria' },
      { id: 'seg7', start: 600, end: 720, text: 'Quer saber mais? Meu novo curso Trophy Assets tem um módulo inteiro sobre isso. Link na bio.', speaker: 'Aria' },
    ],
    suggestedCuts: [
      {
        id: 'cut1',
        start: 120,
        end: 210,
        type: 'hook',
        title: 'A virada do mercado de luxo',
        description: 'Momento perfeito para Reels. Aria explica a transição de preço para experiência de forma impactante.',
        engagementScore: 94,
        platform: 'Instagram Reels',
        duration: 90,
        transcript: 'A grande mudança foi do preço para a experiência. Antes, a gente vendia metros quadrados. Hoje a gente vende legados, narrativas, status.',
      },
      {
        id: 'cut2',
        start: 300,
        end: 420,
        type: 'insight',
        title: 'Coeficiente de Legado — a métrica secreta',
        description: 'Insight altamente compartilhável. Aria revela uma métrica que ninguém conhece. Perfeito para LinkedIn e YouTube Shorts.',
        engagementScore: 97,
        platform: 'LinkedIn / YouTube Shorts',
        duration: 120,
        transcript: 'Isso é o que eu chamo de coeficiente de legado. É a métrica mais importante do mercado de luxo hoje — e ninguém fala sobre ela.',
      },
      {
        id: 'cut3',
        start: 420,
        end: 600,
        type: 'educational',
        title: 'Como calcular o Coeficiente de Legado',
        description: 'Conteúdo educacional de alto valor. Excelente para TikTok e YouTube.',
        engagementScore: 89,
        platform: 'TikTok / YouTube',
        duration: 180,
        transcript: 'Para calcular o coeficiente de legado, você precisa avaliar três variáveis: a narrativa arquitetônica, a raridade da propriedade e o efeito de rede do bairro.',
      },
    ],
    summary: 'Live de Aria Sterling sobre tendências do mercado imobiliário de luxo em 2026. Principais tópicos: transição de preço para experiência, coeficiente de legado como nova métrica, e o futuro do investimento UHNW.',
    keyTopics: ['mercado de luxo', 'coeficiente de legado', 'investimento UHNW', 'experiência vs preço'],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'trans-2',
    expertId: '2',
    title: 'Podcast: De $1M para $10M ARR em 12 meses',
    sourceUrl: 'https://spotify.com/episode/xyz789',
    sourceType: 'podcast',
    status: 'done',
    progress: 100,
    language: 'pt-BR',
    duration: 4520,
    segments: [
      { id: 'seg1', start: 0, end: 60, text: 'Hoje a gente vai desconstruir o crescimento de $1M para $10M ARR. Não é mágica. É matemática aplicada a execução.', speaker: 'Marcus' },
      { id: 'seg2', start: 60, end: 180, text: 'A maioria das empresas morre entre $1M e $3M porque acham que o que funcionou antes vai continuar funcionando. Spoiler: não vai.', speaker: 'Marcus' },
      { id: 'seg3', start: 180, end: 300, text: 'A virada é simples: de founder-led sales para product-led growth. Mas simples não significa fácil.', speaker: 'Marcus' },
      { id: 'seg4', start: 300, end: 480, text: 'Vou te dar o framework exato. Três pilares: ativação, retenção e expansão de receita. Em ordem. Sem ativação, retenção não importa. Sem retenção, expansão é impossível.', speaker: 'Marcus' },
    ],
    suggestedCuts: [
      {
        id: 'cut1',
        start: 60,
        end: 180,
        type: 'hook',
        title: 'Por que SaaS morre entre $1M e $3M',
        description: 'Hook poderoso sobre o vale da morte do SaaS. Excelente para LinkedIn e Twitter.',
        engagementScore: 92,
        platform: 'LinkedIn / Twitter',
        duration: 120,
        transcript: 'A maioria das empresas morre entre $1M e $3M porque acham que o que funcionou antes vai continuar funcionando. Spoiler: não vai.',
      },
      {
        id: 'cut2',
        start: 300,
        end: 480,
        type: 'insight',
        title: 'Os 3 Pilares do PLG',
        description: 'Framework claro e aplicável. Ótimo para carrossel e short-form.',
        engagementScore: 95,
        platform: 'Instagram / LinkedIn',
        duration: 180,
        transcript: 'Vou te dar o framework exato. Três pilares: ativação, retenção e expansão de receita. Em ordem. Sem ativação, retenção não importa.',
      },
    ],
    summary: 'Podcast com Marcus Chen sobre escalada de SaaS B2B de $1M para $10M ARR. Framework de PLG com foco em ativação, retenção e expansão.',
    keyTopics: ['product-led growth', 'escala saas', 'retenção', 'ativação', 'expansão de receita'],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

export const useTranscriptionStore = create<TranscriptionStore>((set, get) => ({
  transcriptions: mockTranscriptions,
  getTranscriptionsByExpert: (expertId) => get().transcriptions.filter(t => t.expertId === expertId),
  addTranscription: (t) => set((state) => ({ transcriptions: [t, ...state.transcriptions] })),
  updateTranscription: (id, updates) => set((state) => ({
    transcriptions: state.transcriptions.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  deleteTranscription: (id) => set((state) => ({
    transcriptions: state.transcriptions.filter(t => t.id !== id)
  })),
  addCut: (transcriptionId, cut) => set((state) => ({
    transcriptions: state.transcriptions.map(t => t.id === transcriptionId ? { ...t, suggestedCuts: [...t.suggestedCuts, cut] } : t)
  })),
}));
