import { create } from 'zustand';

export interface SEOPackItem {
  id: string;
  type: 'title' | 'description' | 'hashtag' | 'keyword' | 'caption' | 'alt_text' | 'schema_markup' | 'faq';
  content: string;
  platform?: string;
}

export interface SEOPack {
  id: string;
  expertId: string;
  scriptId?: string;
  scriptTitle: string;
  platform: string;
  items: SEOPackItem[];
  geoOptimized: boolean;
  aeoOptimized: boolean;
  status: 'draft' | 'generated' | 'approved';
  createdAt: string;
}

interface SEOStore {
  seoPacks: SEOPack[];
  getPacksByExpert: (expertId: string) => SEOPack[];
  addPack: (pack: SEOPack) => void;
  updatePack: (id: string, updates: Partial<SEOPack>) => void;
  deletePack: (id: string) => void;
}

const mockSEOPacks: SEOPack[] = [
  {
    id: 'seo-1',
    expertId: '1',
    scriptId: 'script-1',
    scriptTitle: 'Por que o mercado de luxo não quebrou em 2026',
    platform: 'Instagram',
    items: [
      { id: 'i1', type: 'title', content: 'O Segredo que Corretores de Luxo Não Contam sobre 2026', platform: 'Instagram' },
      { id: 'i2', type: 'description', content: 'Descubra por que o mercado de imóveis de luxo não apenas resistiu, mas EVOLUIU em 2026. Dados reais, cases reais. Se você vende alto padrão, precisa ver isso.', platform: 'Instagram' },
      { id: 'i3', type: 'hashtag', content: '#imoveisdeluxo #mercadodeluxo #corretordeimoveis #investimentouhnw #trophyassets #mercadoimobiliario2026 #propriedadesdeluxo' },
      { id: 'i4', type: 'caption', content: 'Em 2026, o jogo mudou. Não é mais sobre preço — é sobre storytelling, curadoria e experiência. Se você ainda vende imóveis como "metragem + localização", está deixando milhões na mesa.\n\nQual foi a maior lição que você aprendeu sobre o mercado de luxo esse ano? Comenta aqui 👇' },
      { id: 'i5', type: 'alt_text', content: 'Corretora de luxo em escritório minimalista com vista panorâmica da cidade, analisando documentos de propriedades premium' },
      { id: 'i6', type: 'faq', content: 'Q: O mercado de luxo realmente não caiu em 2026?\nA: Não apenas não caiu, mas segmentos premium valorizaram 12-18% em mercados-chave.' },
    ],
    geoOptimized: true,
    aeoOptimized: true,
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'seo-2',
    expertId: '2',
    scriptId: 'script-2',
    scriptTitle: 'O erro que custa $50K em MRR todo mês',
    platform: 'LinkedIn',
    items: [
      { id: 'i1', type: 'title', content: '73% dos SaaS perdem $50K+ em MRR por causa desse erro de onboarding', platform: 'LinkedIn' },
      { id: 'i2', type: 'description', content: 'Depois de revisar 200+ funis de SaaS, identifiquei um padrão mortal. Aqui está o framework para consertar em 30 dias.', platform: 'LinkedIn' },
      { id: 'i3', type: 'hashtag', content: '#saas #productledgrowth #onboarding #churn #retention #growthstrategy #b2bsaas' },
      { id: 'i4', type: 'caption', content: 'A maioria dos SaaS B2B investe milhões em aquisição e $0 em ativação.\n\nResultado: churn de 15-25% no primeiro mês.\n\nO problema não é o produto. É o "aha! moment" que nunca chega.\n\nAqui está o framework que usamos para reduzir churn em 40% em 90 dias:\n\n1. Mapear o critical path do usuário ideal\n2. Identificar os 3 micro-milestones de ativação\n3. Inserir micro-celebrations em cada ponto\n4. Medir time-to-value (TTV) semanalmente\n\nQual é o TTV do seu produto? Comenta abaixo.' },
      { id: 'i5', type: 'alt_text', content: 'Dashboard de métricas SaaS mostrando redução de churn e aumento de ativação de usuários' },
      { id: 'i6', type: 'schema_markup', content: '{"@context":"https://schema.org","@type":"Article","headline":"73% dos SaaS perdem $50K+ em MRR por causa desse erro de onboarding","author":{"@type":"Person","name":"Marcus Chen"}}' },
    ],
    geoOptimized: true,
    aeoOptimized: true,
    status: 'generated',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const useSEOStore = create<SEOStore>((set, get) => ({
  seoPacks: mockSEOPacks,
  getPacksByExpert: (expertId) => get().seoPacks.filter(p => p.expertId === expertId),
  addPack: (pack) => set((state) => ({ seoPacks: [pack, ...state.seoPacks] })),
  updatePack: (id, updates) => set((state) => ({
    seoPacks: state.seoPacks.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  deletePack: (id) => set((state) => ({
    seoPacks: state.seoPacks.filter(p => p.id !== id)
  })),
}));
