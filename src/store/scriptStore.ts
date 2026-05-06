import { create } from 'zustand';

export interface ScriptSection {
  id: string;
  timestamp: string;
  type: 'hook' | 'storytelling' | 'educational' | 'cta' | 'transition';
  content: string;
  notes?: string;
}

export interface ScriptVariant {
  id: string;
  hookType: 'curiosity' | 'controversy' | 'transformation' | 'authority' | 'story';
  hook: string;
  sections: ScriptSection[];
  duration: number;
  platform: string;
}

export interface Script {
  id: string;
  expertId: string;
  title: string;
  topic: string;
  format: 'reels' | 'carousel' | 'story' | 'long-form' | 'thread';
  platform: string;
  duration: number;
  status: 'draft' | 'generating' | 'review' | 'approved' | 'published';
  variants: ScriptVariant[];
  createdAt: string;
  updatedAt: string;
}

interface ScriptStore {
  scripts: Script[];
  getScriptsByExpert: (expertId: string) => Script[];
  addScript: (script: Script) => void;
  updateScript: (id: string, updates: Partial<Script>) => void;
  deleteScript: (id: string) => void;
  addVariant: (scriptId: string, variant: ScriptVariant) => void;
}

const mockScripts: Script[] = [
  {
    id: 'script-1',
    expertId: '1',
    title: 'Por que o mercado de luxo não quebrou em 2026',
    topic: 'Tendências imobiliárias de luxo',
    format: 'reels',
    platform: 'Instagram',
    duration: 60,
    status: 'approved',
    variants: [
      {
        id: 'v1',
        hookType: 'controversy',
        hook: 'Todo mundo disse que o mercado de luxo ia quebrar. Mentira. Aqui está o que realmente aconteceu.',
        sections: [
          { id: 's1', timestamp: '0:00-0:05', type: 'hook', content: 'Todo mundo disse que o mercado de luxo ia quebrar. Mentira.' },
          { id: 's2', timestamp: '0:05-0:20', type: 'storytelling', content: 'Em janeiro, um cliente UHNW ligou querendo vender tudo. Em março, ele estava comprando 3 propriedades a mais.' },
          { id: 's3', timestamp: '0:20-0:45', type: 'educational', content: 'O que mudou? O jogo não é mais sobre preço. É sobre storytelling arquitetônico, curadoria e experiência.' },
          { id: 's4', timestamp: '0:45-0:55', type: 'cta', content: 'Se você vende alto padrão, comenta "LUXO" que te mando o framework completo.' },
          { id: 's5', timestamp: '0:55-1:00', type: 'transition', content: 'Siga para mais análises do mercado premium.' },
        ],
        duration: 60,
        platform: 'Instagram',
      },
      {
        id: 'v2',
        hookType: 'curiosity',
        hook: 'Existe uma métrica secreta que os corretores de luxo usam — e ninguém fala sobre ela.',
        sections: [
          { id: 's1', timestamp: '0:00-0:05', type: 'hook', content: 'Existe uma métrica secreta que os corretores de luxo usam.' },
          { id: 's2', timestamp: '0:05-0:20', type: 'storytelling', content: 'Eu descobri isso em uma reunião em Dubai. Um investidor de $500M me mostrou a planilha dele.' },
          { id: 's3', timestamp: '0:20-0:45', type: 'educational', content: 'Não é cap rate. Não é valorização. É algo chamado "coeficiente de legado". Mede o quanto uma propriedade fortalece o sobrenome da família.' },
          { id: 's4', timestamp: '0:45-0:55', type: 'cta', content: 'Quer saber como calcular? Me chama no DM.' },
          { id: 's5', timestamp: '0:55-1:00', type: 'transition', content: 'Salva esse vídeo. Você vai precisar.' },
        ],
        duration: 60,
        platform: 'Instagram',
      },
      {
        id: 'v3',
        hookType: 'transformation',
        hook: 'De R$50k/mês para R$500k/mês em 18 meses — o que esse corretor fez diferente.',
        sections: [
          { id: 's1', timestamp: '0:00-0:05', type: 'hook', content: 'De R$50k/mês para R$500k/mês em 18 meses.' },
          { id: 's2', timestamp: '0:05-0:20', type: 'storytelling', content: 'João era um corretor comum. Bons números, mas sem posicionamento. Até que ele decidiu parar de vender imóveis e começar a vender legados.' },
          { id: 's3', timestamp: '0:20-0:45', type: 'educational', content: 'A virada foi simples: ele começou a documentar cada venda como um case de transformação. Não mostrava a casa. Mostrava a vida que a casa criava.' },
          { id: 's4', timestamp: '0:45-0:55', type: 'cta', content: 'Se você quer essa transformação, link na bio.' },
          { id: 's5', timestamp: '0:55-1:00', type: 'transition', content: 'Siga para mais cases de transformação.' },
        ],
        duration: 60,
        platform: 'Instagram',
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'script-2',
    expertId: '2',
    title: 'O erro que custa $50K em MRR todo mês',
    topic: 'Retenção em SaaS',
    format: 'reels',
    platform: 'LinkedIn',
    duration: 45,
    status: 'review',
    variants: [
      {
        id: 'v1',
        hookType: 'authority',
        hook: 'Eu já revi 200+ funis de SaaS. Esse erro aparece em 73% deles — e custa $50K+ em MRR.',
        sections: [
          { id: 's1', timestamp: '0:00-0:05', type: 'hook', content: '200+ funis de SaaS revisados. 73% comete esse erro. Custa $50K+ em MRR.' },
          { id: 's2', timestamp: '0:05-0:20', type: 'educational', content: 'O erro: onboarding sem milestone de "aha! moment". Os usuários ativam, mas nunca entendem o valor real.' },
          { id: 's3', timestamp: '0:20-0:35', type: 'educational', content: 'A solução: mapar o critical path do usuário e inserir micro-celebrations a cada milestone.' },
          { id: 's4', timestamp: '0:35-0:45', type: 'cta', content: 'Framework completo no link da bio. Gratuito essa semana.' },
        ],
        duration: 45,
        platform: 'LinkedIn',
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const useScriptStore = create<ScriptStore>((set, get) => ({
  scripts: mockScripts,
  getScriptsByExpert: (expertId) => get().scripts.filter(s => s.expertId === expertId),
  addScript: (script) => set((state) => ({ scripts: [script, ...state.scripts] })),
  updateScript: (id, updates) => set((state) => ({
    scripts: state.scripts.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s)
  })),
  deleteScript: (id) => set((state) => ({
    scripts: state.scripts.filter(s => s.id !== id)
  })),
  addVariant: (scriptId, variant) => set((state) => ({
    scripts: state.scripts.map(s => s.id === scriptId ? { ...s, variants: [...s.variants, variant] } : s)
  })),
}));
