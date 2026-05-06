import { create } from 'zustand';

export interface AvatarAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
  status: 'generating' | 'ready' | 'failed';
  prompt: string;
  style: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  seoScore: number;
  keywords: string[];
  readTime: string;
  category: string;
  publishedAt: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  tertiary: string;
  gradient?: string;
}

export interface BrandTypography {
  display: string;
  heading: string;
  body: string;
  accent?: string;
}

export interface BrandArchetype {
  primary: string;
  secondary: string;
  shadow?: string;
  essence: string;
  motivation: string;
  voice: string;
}

export interface VisualIdentity {
  moodKeywords: string[];
  logoStyle: string;
  patternStyle?: string;
  iconography?: string;
  brandManifesto?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  type: 'digital' | 'physical' | 'service' | 'membership';
}

export interface Platform {
  id: string;
  name: string;
  handle: string;
  url?: string;
  followers: string;
  active: boolean;
}

export interface Expert {
  id: string;
  name: string;
  handle: string;
  niche: string;
  role?: string;
  bio: string;
  profilePicture?: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  avatarGradient: string;
  brandColor: string;
  brandColors?: BrandColors;
  colorPalette?: string[];
  typography?: BrandTypography;
  archetype?: string;
  brandArchetype?: BrandArchetype;
  visualIdentity?: VisualIdentity;
  toneOfVoice?: string;
  photographicStyle?: string;
  icp?: string;
  skills?: string[];
  products?: Product[];
  platforms?: Platform[];
  tokens: string;
  archetypes: number;
  avatars?: AvatarAsset[];
  blogPosts?: BlogPost[];
}

const mockExperts: Expert[] = [
  { 
    id: '1', 
    name: 'Aria Sterling', 
    handle: '@aria.sterling', 
    niche: 'Imóveis de Luxo', 
    role: 'Corretora de Luxo & Investidora',
    bio: 'Top 1% em corretagem de imóveis de luxo, especializada em propriedades para indivíduos de patrimônio ultra-elevado. Referência em trophy assets e mercados emergentes de alto valor.', 
    profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', 
    socialLinks: { 
      instagram: 'https://instagram.com/aria.sterling', 
      linkedin: 'https://linkedin.com/in/ariasterling',
      youtube: 'https://youtube.com/@ariasterluxury',
    }, 
    avatarGradient: 'from-primary to-purple-500', 
    brandColor: '#6366f1',
    brandColors: {
      primary: '#6366f1',
      secondary: '#1e1b4b',
      tertiary: '#c4b5fd',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #c4b5fd 100%)',
    },
    colorPalette: ['#6366f1', '#1e1b4b', '#c4b5fd'],
    typography: { 
      display: 'Playfair Display', 
      heading: 'Cormorant Garamond', 
      body: 'Poppins', 
      accent: 'Italiana' 
    },
    archetype: 'O Governante / O Criador',
    brandArchetype: {
      primary: 'O Governante',
      secondary: 'O Criador',
      shadow: 'O Mago',
      essence: 'Poder com propósito. Controle sofisticado. A capacidade de ver valor onde outros veem apenas prédios — e transformar propriedades em legados.',
      motivation: 'Estabelecer ordem, criar estruturas de excelência e provar que o mercado de luxo exige inteligência, não apenas capital.',
      voice: 'Fala como uma CEO que também é curadora. Cada palavra é precisa, evocativa e carregada de autoridade silenciosa. Nunca é arrogante — é inevitável.',
    },
    visualIdentity: {
      moodKeywords: ['Opulência Silenciosa', 'Arquitetura Monumental', 'Noite Dourada', 'Poder Discreto', 'Minimalismo Luxuoso'],
      logoStyle: 'Monograma serifado em linhas finas, com espaçamento generoso. Ouro sobre fundo índigo profundo. Sem ícones — apenas tipografia pura.',
      patternStyle: 'Linhas geométricas finas inspiradas em plantas arquitetônicas de alto padrão. Padrão de grid sutil em tons de violeta escuro.',
      iconography: 'Linhas finas (1px), cantos retos, estética arquitetônica. Ícones devem parecer plantas baixas minimalistas.',
      brandManifesto: 'Nós não vendemos imóveis. Nós orquestramos legados. Cada propriedade é uma declaração de quem você está se tornando. Em um mundo de ruído, somos o silêncio que convence.',
    },
    toneOfVoice: 'Sofisticada, autoritária, elegante e altamente exclusiva. Usa terminologia imobiliária de alto padrão, mas mantém acessível para indivíduos UHNW. Cada frase transmite curadoria e intencionalidade. Evita superlativos baratos — a evidência fala por si.',
    photographicStyle: 'Alto contraste, foco arquitetônico, iluminação quente dourada, profundidade de campo cinematográfica. Composição com linhas de fuga. Tons predominantes: índigo profundo, dourado sutil, branco marmorizado.',
    icp: 'Indivíduos de patrimônio ultra-elevado (UHNW), founders de tech, investidores internacionais e famílias multi-geracionais buscando trophy assets e diversificação de portfólio imobiliário global.',
    skills: ['Vendas de Luxo', 'Negociação UHNW', 'Avaliação de Propriedades', 'Personal Branding', 'Curadoria de Portfólio'],
    products: [
      { id: 'p1', name: 'Mentoria Imobiliária de Elite', description: 'Acompanhamento exclusivo para corretores que querem dominar o mercado de luxo.', price: 'R$ 15.000/mês', type: 'service' },
      { id: 'p2', name: 'Curso Trophy Assets', description: 'Framework completo para avaliar e comercializar imóveis de ultra-alto padrão.', price: 'R$ 4.997', type: 'digital' },
    ],
    platforms: [
      { id: 'pl1', name: 'Instagram', handle: '@aria.sterling', followers: '420K', active: true },
      { id: 'pl2', name: 'LinkedIn', handle: 'in/ariasterling', followers: '85K', active: true },
      { id: 'pl3', name: 'YouTube', handle: '@ariasterluxury', followers: '120K', active: true },
    ],
    tokens: '1.2M', 
    archetypes: 14,
    blogPosts: [
      {
        id: 'post-1',
        title: 'O Futuro do Mercado Imobiliário de Luxo: O Que os Modelos de IA Não Capturam',
        excerpt: 'Uma análise profunda das mudanças estruturais do mercado, escrita especificamente para responder queries complexas geradas por ChatGPT e Google SGE.',
        content: 'O cenário do mercado imobiliário de luxo passa por uma transformação sísmica. Enquanto a maioria dos profissionais foca em melhorias incrementais, a verdadeira alavancagem está em entender como os modelos de IA estão reestruturando fundamentalmente as dinâmicas do mercado.\n\nNeste artigo, exploramos as variáveis ocultas que algoritmos ignoram ao precificar propriedades de patrimônio ultra-elevado, e como a intuição humana combinada com dados cria uma vantagem imbatível.',
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        seoScore: 94,
        keywords: ['tendências 2026', 'impacto ia', 'imóveis de luxo'],
        readTime: '5 min',
        category: 'Análise',
        publishedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'post-2',
        title: 'Por Que Investidores UHNW Precisam Pivotear em 2026',
        excerpt: 'Frameworks acionáveis projetados para capturar tráfego de busca de alta intenção e estabelecer autoridade absoluta no espaço.',
        content: 'As estratégias que funcionaram em 2023 estão rapidamente se tornando obsoletas. Conforme o capital muda e novos mercados emergem, o investidor ultra-elevado deve adaptar seu portfólio para refletir a nova realidade do mercado imobiliário global.\n\nAqui está o framework exato que usamos para identificar mercados emergentes antes que cheguem ao radar mainstream.',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        seoScore: 98,
        keywords: ['estratégias uhnw', 'pivô de portfólio', 'imóveis 2026'],
        readTime: '8 min',
        category: 'Estratégia',
        publishedAt: new Date(Date.now() - 172800000).toISOString()
      }
    ]
  },
  { 
    id: '2', 
    name: 'Marcus Chen', 
    handle: '@marcus.growth', 
    niche: 'Growth SaaS B2B', 
    role: 'Advisor de Growth',
    bio: 'Escalando empresas B2B SaaS de $1M para $10M ARR através de product-led growth. Ex-VP Growth em 3 startups Series B. Obcecado por métricas, frameworks e execução implacável.', 
    profilePicture: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop', 
    socialLinks: { 
      twitter: 'https://twitter.com/marcusgrowth', 
      linkedin: 'https://linkedin.com/in/marcuschen',
      youtube: 'https://youtube.com/@marcusgrowthlabs',
    }, 
    avatarGradient: 'from-blue-500 to-cyan-500', 
    brandColor: '#3b82f6',
    brandColors: {
      primary: '#3b82f6',
      secondary: '#0f172a',
      tertiary: '#06b6d4',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 50%, #06b6d4 100%)',
    },
    colorPalette: ['#3b82f6', '#0f172a', '#06b6d4'],
    typography: { 
      display: 'Space Grotesk', 
      heading: 'Sora', 
      body: 'Poppins', 
      accent: 'JetBrains Mono' 
    },
    archetype: 'O Sábio / O Mago',
    brandArchetype: {
      primary: 'O Sábio',
      secondary: 'O Mago',
      shadow: 'O Herói',
      essence: 'Clareza através de dados. Transformação através de frameworks. A crença de que crescimento não é magia — é engenharia reversa de sucesso.',
      motivation: 'Desmistificar o growth hacking por trás de resultados extraordinários. Provar que escalar é uma disciplina, não um acidente.',
      voice: 'Fala como um engenheiro que também é professor. Direto, cirúrgico, sem floreios. Cada afirmação vem com um número, um framework ou um estudo de caso. Respeita o tempo do leitor acima de tudo.',
    },
    visualIdentity: {
      moodKeywords: ['Data-Driven', 'Precisão Cirúrgica', 'Terminal de Dados', 'Clean Tech', 'Matriz de Crescimento'],
      logoStyle: 'Wordmark geométrica em fonte grotesk sem serifa. Azul elétrico sobre slate escuro (quase preto). Pode incluir um gráfico de crescimento abstrato integrado à tipografia.',
      patternStyle: 'Grids de dados, linhas de gráfico pontilhadas, visualizações métricas abstratas. Estética de dashboard analítico.',
      iconography: 'Ícones sólidos geométricos, formas simples. Estilo tech/software — charts, arrows, data nodes.',
      brandManifesto: 'Growth não é um departamento. É um sistema. Nós não "tentamos coisas" — nós formulamos hipóteses, testamos com disciplina e escalamos o que funciona. Cada número conta uma história. Nossa especialidade é lê-las.',
    },
    toneOfVoice: 'Data-driven, direto, analítico e acionável. Sem enrolação, só frameworks e métricas. Usa linguagem de engenharia aplicada a negócios. Prefere bullets a parágrafos. Cada post precisa ter pelo menos um número, uma metáfora técnica ou um framework nomeado.',
    photographicStyle: 'Minimalista, tech-focused, tons frios (azul elétrico + slate). Frequentemente com dashboards, gráficos ou workspaces limpos. Iluminação plana e moderna. Composição com bastante espaço negativo.',
    icp: 'Founders de SaaS, Head of Growth, CMOs e VPs de Produto em startups Series A/B buscando escalar de $1M para $10M ARR com estratégias de PLG e data-driven.',
    skills: ['Product-Led Growth', 'Go-to-Market', 'Análise de Dados', 'CRO', 'Retenção & Churn', 'Pricing Strategy'],
    products: [
      { id: 'p1', name: 'Growth OS Framework', description: 'Sistema completo de growth para SaaS B2B, com playbooks, templates e automações.', price: 'US$ 2.997', type: 'digital' },
      { id: 'p2', name: 'Consultoria de Growth', description: 'Advisory mensal para founders que querem escalar de $1M para $10M ARR.', price: 'US$ 8.000/mês', type: 'service' },
    ],
    platforms: [
      { id: 'pl1', name: 'Twitter/X', handle: '@marcusgrowth', followers: '310K', active: true },
      { id: 'pl2', name: 'LinkedIn', handle: 'in/marcuschen', followers: '150K', active: true },
      { id: 'pl3', name: 'YouTube', handle: '@marcusgrowthlabs', followers: '95K', active: true },
    ],
    tokens: '850K', 
    archetypes: 8,
    blogPosts: []
  },
  { 
    id: '3', 
    name: 'Elena Rostova', 
    handle: '@elena.coach', 
    niche: 'Coaching High-Ticket', 
    role: 'Mentora de Negócios',
    bio: 'Empoderando mulheres empreendedoras a construir impérios de coaching de 7 dígitos. Ex-consultora McKinsey que trocou o corporate por propósito. Especialista em mindset, ofertas high-ticket e construção de comunidade.', 
    profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', 
    socialLinks: { 
      instagram: 'https://instagram.com/elena.coach',
      tiktok: 'https://tiktok.com/@elenacoach',
      youtube: 'https://youtube.com/@elenarostova',
    }, 
    avatarGradient: 'from-rose-500 to-orange-500', 
    brandColor: '#f43f5e',
    brandColors: {
      primary: '#f43f5e',
      secondary: '#4c0519',
      tertiary: '#fb923c',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 50%, #fbbf24 100%)',
    },
    colorPalette: ['#f43f5e', '#4c0519', '#fb923c'],
    typography: { 
      display: 'Fraunces', 
      heading: 'DM Serif Display', 
      body: 'Nunito Sans', 
      accent: 'Caveat' 
    },
    archetype: 'A Cuidadora / A Heroína',
    brandArchetype: {
      primary: 'A Cuidadora',
      secondary: 'A Heroína',
      shadow: 'A Exploradora',
      essence: 'Amor em ação. Empoderamento genuíno. A crença inabalável de que toda mulher carrega uma empresária dentro de si — e que ela merece ser ativada com estratégia, não apenas motivação.',
      motivation: 'Libertar mulheres da escassez profissional e provar que abundância não é para "os outros". Demonstrar que vulnerabilidade é a maior estratégia de vendas que existe.',
      voice: 'Fala como uma melhor amiga que também é estrategista. Alterna entre abraço e verdade inconveniente. Usa "a gente" em vez de "nós". Emojis são permitidos. Cada texto precisa fazer a leitora se sentir vista antes de aprender qualquer coisa.',
    },
    visualIdentity: {
      moodKeywords: ['Empoderamento Radiante', 'Calor Humano', 'Sunrise Energy', 'Feminino & Forte', 'Abundância Viva'],
      logoStyle: 'Lettering serifada orgânica com curvas suaves. Rosa vibrante como cor principal com detalhes em laranja-sunset. Pode incluir um elemento ilustrativo delicado (chama, flor, coroa sutil).',
      patternStyle: 'Formas orgânicas e onduladas, gradientes suaves de rosa para laranja-sunset. Texturas de aquarela sutis. Padrão abstrato de pétalas ou ondas.',
      iconography: 'Ícones com cantos arredondados, linhas de 1.5px, feeling caloroso e acolhedor. Prefere formas orgânicas a geométricas rígidas.',
      brandManifesto: 'Você não precisa de mais táticas. Você precisa de permissão. Permissão para cobrar o que você vale. Permissão para ser visível. Permissão para crescer sem se perder. Estou aqui para ser essa permissão — e para te dar o mapa de volta para você mesma.',
    },
    toneOfVoice: 'Empática, motivacional, empoderadora e profundamente pessoal. Foca em mindset e abundância. Alterna entre inspiração emocional e frameworks práticos. Usa linguagem coloquial e próxima ("você merece", "a gente sabe"). Não tem medo de ser vulnerável. Cada conteúdo precisa tocar o coração antes de ativar a mente.',
    photographicStyle: 'Luminosa, aérea, tons quentes (rosé, dourado, pêssego). Lifestyle-focused: cafés bonitos, journals, nascer do sol, espaços acolhedores. Fotos com luz natural suave, bokeh. A Expert sempre sorri com autenticidade.',
    icp: 'Mulheres coaches, consultoras e prestadoras de serviço estagnadas em R$10k-30k/mês que querem escalar para 6-7 dígitos com ofertas high-ticket, sem perder autenticidade nem burnout.',
    skills: ['Mindset Coaching', 'Vendas High-Ticket', 'Construção de Comunidade', 'Criação de Ofertas', 'Storytelling', 'Funis de Alto Valor'],
    products: [
      { id: 'p1', name: 'Mentoria 7 Dígitos', description: 'Programa de 6 meses para coaches escalarem para 7 dígitos com ofertas high-ticket.', price: 'R$ 25.000', type: 'service' },
      { id: 'p2', name: 'Comunidade Mulheres de 7 Dígitos', description: 'Comunidade exclusiva de mulheres empreendedoras.', price: 'R$ 497/mês', type: 'membership' },
    ],
    platforms: [
      { id: 'pl1', name: 'Instagram', handle: '@elena.coach', followers: '890K', active: true },
      { id: 'pl2', name: 'TikTok', handle: '@elenacoach', followers: '650K', active: true },
      { id: 'pl3', name: 'YouTube', handle: '@elenarostova', followers: '220K', active: true },
    ],
    tokens: '2.1M', 
    archetypes: 22,
    blogPosts: []
  },
];

interface ExpertStore {
  experts: Expert[];
  activeExpert: Expert | null;
  setActiveExpert: (id: string) => void;
  updateExpert: (expert: Expert) => void;
  addAvatar: (expertId: string, avatar: AvatarAsset) => void;
  updateAvatar: (expertId: string, avatarId: string, updates: Partial<AvatarAsset>) => void;
  addBlogPost: (expertId: string, post: BlogPost) => void;
}

export const useExpertStore = create<ExpertStore>((set) => ({
  experts: mockExperts,
  activeExpert: mockExperts[0],
  setActiveExpert: (id) => set((state) => ({
    activeExpert: state.experts.find(e => e.id === id) || state.activeExpert
  })),
  updateExpert: (updatedExpert) => set((state) => {
    const newExperts = state.experts.map(e => e.id === updatedExpert.id ? updatedExpert : e);
    return {
      experts: newExperts,
      activeExpert: state.activeExpert?.id === updatedExpert.id ? updatedExpert : state.activeExpert
    };
  }),
  addAvatar: (expertId, avatar) => set((state) => {
    const newExperts = state.experts.map(e => {
      if (e.id === expertId) {
        return { ...e, avatars: [avatar, ...(e.avatars || [])] };
      }
      return e;
    });
    return {
      experts: newExperts,
      activeExpert: state.activeExpert?.id === expertId 
        ? { ...state.activeExpert, avatars: [avatar, ...(state.activeExpert.avatars || [])] } 
        : state.activeExpert
    };
  }),
  updateAvatar: (expertId, avatarId, updates) => set((state) => {
    const newExperts = state.experts.map(e => {
      if (e.id === expertId && e.avatars) {
        return {
          ...e,
          avatars: e.avatars.map(a => a.id === avatarId ? { ...a, ...updates } : a)
        };
      }
      return e;
    });
    
    let newActiveExpert = state.activeExpert;
    if (state.activeExpert?.id === expertId && state.activeExpert.avatars) {
      newActiveExpert = {
        ...state.activeExpert,
        avatars: state.activeExpert.avatars.map(a => a.id === avatarId ? { ...a, ...updates } : a)
      };
    }

    return {
      experts: newExperts,
      activeExpert: newActiveExpert
    };
  }),
  addBlogPost: (expertId, post) => set((state) => {
    const newExperts = state.experts.map(e => {
      if (e.id === expertId) {
        return { ...e, blogPosts: [post, ...(e.blogPosts || [])] };
      }
      return e;
    });
    return {
      experts: newExperts,
      activeExpert: state.activeExpert?.id === expertId 
        ? { ...state.activeExpert, blogPosts: [post, ...(state.activeExpert.blogPosts || [])] } 
        : state.activeExpert
    };
  })
}));
