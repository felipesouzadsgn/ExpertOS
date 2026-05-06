import { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronRight, Code2, Database, Layers, Layout, 
  Brain, Shield, Palette, Globe, Users, Search, PenTool, 
  Video, Calendar, KanbanSquare, Bot, Camera, FileText,
  Zap, ArrowRight, ExternalLink, Menu, X
} from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';

type DocSection = 
  | 'overview' 
  | 'architecture' 
  | 'modules' 
  | 'data-models' 
  | 'business-rules' 
  | 'tech-stack' 
  | 'design-system';

export function Documentation() {
  const { activeExpert } = useExpertStore();
  const [activeSection, setActiveSection] = useState<DocSection>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const brandColor = activeExpert?.brandColor || '#6366f1';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const sections: { id: DocSection; title: string; icon: any }[] = [
    { id: 'overview', title: 'Visão Geral', icon: BookOpen },
    { id: 'architecture', title: 'Arquitetura', icon: Layers },
    { id: 'modules', title: 'Módulos', icon: Layout },
    { id: 'data-models', title: 'Modelos de Dados', icon: Database },
    { id: 'business-rules', title: 'Regras de Negócio', icon: Shield },
    { id: 'tech-stack', title: 'Tecnologias', icon: Code2 },
    { id: 'design-system', title: 'Design System', icon: Palette },
  ];

  return (
    <div className="h-full flex overflow-hidden text-text-main relative">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-[280px] bg-surface border-r border-border flex flex-col shrink-0 overflow-y-auto custom-scrollbar z-50 lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold flex items-center gap-2">
            <BookOpen size={18} style={{ color: brandColor }} />
            Documentação
          </h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-text-muted">
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 flex-1">
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => { setActiveSection(s.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === s.id
                      ? 'bg-white/5 text-text-main'
                      : 'text-text-muted hover:bg-white/5 hover:text-text-main'
                  }`}
                  style={activeSection === s.id ? { borderLeft: `3px solid ${brandColor}`, paddingLeft: '9px' } : {}}
                >
                  <s.icon size={16} style={activeSection === s.id ? { color: brandColor } : {}} />
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 m-3 bg-white/5 rounded-xl">
          <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Versão</p>
          <p className="text-sm font-medium mt-1">MVP v1.0 — Sprint 1</p>
        </div>
      </aside>

      {/* Desktop Sidebar da Documentação */}
      <aside className="hidden lg:flex w-[260px] bg-surface border-r border-border flex-col shrink-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-border/50">
          <h2 className="font-serif text-lg font-bold flex items-center gap-2">
            <BookOpen size={18} style={{ color: brandColor }} />
            Documentação
          </h2>
          <p className="text-xs text-text-muted mt-1">Referência técnica do ExpertOS</p>
        </div>
        <nav className="p-3 flex-1">
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === s.id
                      ? 'bg-white/5 text-text-main'
                      : 'text-text-muted hover:bg-white/5 hover:text-text-main'
                  }`}
                  style={activeSection === s.id ? { borderLeft: `3px solid ${brandColor}`, paddingLeft: '9px' } : {}}
                >
                  <s.icon size={16} style={activeSection === s.id ? { color: brandColor } : {}} />
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 m-3 bg-white/5 rounded-xl">
          <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Versão</p>
          <p className="text-sm font-medium mt-1">MVP v1.0 — Sprint 1</p>
        </div>
      </aside>

      {/* Conteúdo da Documentação */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden mb-4 flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors"
        >
          <Menu size={18} /> Menu
        </button>
        <div className="max-w-4xl mx-auto">
          
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Zap size={12} /> Visão Geral do Projeto
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">ExpertOS</h1>
                <p className="text-lg text-text-muted leading-relaxed mb-6">
                  O ExpertOS é uma plataforma SaaS multi-expert com IA, projetada para criar, gerenciar e escalar personas digitais 
                  alimentadas por inteligência artificial. O sistema permite que criadores de conteúdo, consultores e especialistas 
                  clonem sua identidade — incluindo voz, branding, base de conhecimento e estratégia de conteúdo — em um sistema 
                  de produção autônomo dirigido por agentes de IA especializados.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Proposta de Valor Central</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Expert First', desc: 'Toda operação começa com o contexto do Expert selecionado — branding, tom de voz, ICP e base de conhecimento.' },
                    { title: 'Contexto Antes da Geração', desc: 'Nenhum agente produz no vácuo. Cada saída responde: Para quem é isso? Qual é o objetivo?' },
                    { title: 'Identidade Travada', desc: 'Toda saída reflete o posicionamento do Expert. O sistema replica raciocínio, repertório e identidade visual.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-bg border border-border rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: brandColor }}>0{i + 1}. {item.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Capacidades Principais</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Gestão Multi-Expert com branding completo e configuração de persona',
                    'Agentes de IA especializados por Expert com system prompts distintos',
                    'Estúdio de Conteúdo para criação de carrosséis com importação CSV',
                    'Estúdio de Vídeo e Reels com pipeline HeyGen/ElevenLabs',
                    'Inteligência de Mercado com clonagem e adaptação de conteúdo viral',
                    'Digital Twins de IA para geração de avatares em imagem/vídeo',
                    'Workflow Kanban com verificação QA automatizada por IA',
                    'Blog e portal público otimizados para SEO/AEO',
                    'Calendário Editorial com auto-preenchimento de estratégia por IA',
                    'Base de Conhecimento com índice vetorial e gestão de documentos',
                  ].map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-muted">
                      <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: brandColor }} />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Layers size={12} /> Arquitetura do Sistema
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Arquitetura</h1>
                <p className="text-text-muted leading-relaxed">
                  O ExpertOS segue uma arquitetura SPA client-side com stores Zustand como fonte única de verdade. 
                  O sistema foi projetado para aprimoramento progressivo — atualmente mock-first, pronto para integração com Supabase + APIs de IA.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-6">Fluxo da Aplicação</h3>
                <div className="space-y-4">
                  {[
                    { step: '1', label: 'Ponto de Entrada', detail: 'main.tsx → renderiza App.tsx envolto em React.StrictMode.', tech: 'React 19' },
                    { step: '2', label: 'Roteamento', detail: 'BrowserRouter com 12 rotas — cada uma mapeada para um componente de página.', tech: 'react-router-dom v7' },
                    { step: '3', label: 'Shell de Layout', detail: 'AppLayout envolve todas as rotas. Fornece sidebar de navegação, seletor de expert e cabeçalho do usuário.', tech: 'Componente' },
                    { step: '4', label: 'Gerenciamento de Estado', detail: 'Dois stores Zustand: expertStore (experts, avatares, blog) e agentStore (agentes, tarefas).', tech: 'Zustand v5' },
                    { step: '5', label: 'Contexto do Expert', detail: 'Toda página lê o activeExpert do store. Toda UI, agentes e geração são conscientes do contexto.', tech: 'Padrão' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center text-xs font-bold shrink-0" style={{ color: brandColor }}>
                        {item.step}
                      </div>
                      <div className="flex-1 bg-bg border border-border rounded-xl p-4">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-bold">{item.label}</h4>
                          <span className="text-[9px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-text-muted">{item.tech}</span>
                        </div>
                        <p className="text-xs text-text-muted">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Estrutura de Diretórios</h3>
                <div className="bg-bg border border-border rounded-xl p-4 font-mono text-xs text-text-muted space-y-1">
                  <p className="text-text-main font-bold">src/</p>
                  <p className="pl-4">├── App.tsx <span className="text-text-muted/50">— Roteador e definição de rotas</span></p>
                  <p className="pl-4">├── main.tsx <span className="text-text-muted/50">— Ponto de entrada</span></p>
                  <p className="pl-4">├── index.css <span className="text-text-muted/50">— Config Tailwind, tokens de design, animações</span></p>
                  <p className="pl-4">├── components/</p>
                  <p className="pl-8">└── layout/</p>
                  <p className="pl-12">└── AppLayout.tsx <span className="text-text-muted/50">— Shell: sidebar, cabeçalho, seletor de expert</span></p>
                  <p className="pl-4">├── pages/ <span className="text-text-muted/50">— 15 componentes de página (módulos de funcionalidade)</span></p>
                  <p className="pl-4">├── store/</p>
                  <p className="pl-8">├── expertStore.ts <span className="text-text-muted/50">— Perfis de experts, avatares, posts de blog</span></p>
                  <p className="pl-8">└── agentStore.ts <span className="text-text-muted/50">— Agentes de IA, tarefas</span></p>
                  <p className="pl-4">└── lib/</p>
                  <p className="pl-8">└── utils.ts <span className="text-text-muted/50">— Utilitário clsx + tailwind-merge</span></p>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Arquitetura de Estado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-bg border border-border rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: brandColor }}>expertStore</h4>
                    <ul className="space-y-2 text-xs text-text-muted">
                      <li className="flex items-center gap-2"><Database size={12} /> <code className="bg-white/5 px-1 rounded">experts[]</code> — Todos os perfis de experts</li>
                      <li className="flex items-center gap-2"><Users size={12} /> <code className="bg-white/5 px-1 rounded">activeExpert</code> — Expert selecionado atualmente</li>
                      <li className="flex items-center gap-2"><ArrowRight size={12} /> <code className="bg-white/5 px-1 rounded">setActiveExpert()</code></li>
                      <li className="flex items-center gap-2"><ArrowRight size={12} /> <code className="bg-white/5 px-1 rounded">updateExpert()</code></li>
                      <li className="flex items-center gap-2"><ArrowRight size={12} /> <code className="bg-white/5 px-1 rounded">addAvatar() / updateAvatar()</code></li>
                      <li className="flex items-center gap-2"><ArrowRight size={12} /> <code className="bg-white/5 px-1 rounded">addBlogPost()</code></li>
                    </ul>
                  </div>
                  <div className="bg-bg border border-border rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: brandColor }}>agentStore</h4>
                    <ul className="space-y-2 text-xs text-text-muted">
                      <li className="flex items-center gap-2"><Database size={12} /> <code className="bg-white/5 px-1 rounded">agents[]</code> — Todas as instâncias de agentes</li>
                      <li className="flex items-center gap-2"><ArrowRight size={12} /> <code className="bg-white/5 px-1 rounded">getAgentsByExpert(id)</code></li>
                      <li className="flex items-center gap-2"><ArrowRight size={12} /> <code className="bg-white/5 px-1 rounded">updateAgent()</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'modules' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Layout size={12} /> Módulos de Funcionalidade
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Módulos</h1>
                <p className="text-text-muted leading-relaxed">
                  Cada módulo é um componente de página autônomo que opera dentro do contexto do Expert.
                </p>
              </div>

              {[
                { 
                  icon: Layout, name: 'Dashboard', path: '/', 
                  desc: 'Central de comando exibindo Prontidão do Contexto (tokens, arquétipos, personas), Diretivas do Sistema, itens ativos do Estúdio de Conteúdo, lista de Agentes Especializados e visão geral da Base de Conhecimento.',
                  features: ['Pontuação de prontidão do contexto (98% Alinhado)', 'Exibição de Diretivas do Sistema (Expert First, Contexto Antes da Geração, Identidade Travada, Verificação Humana)', 'Itens de conteúdo ativos com status (Aprovado, Refinando)', 'Indicadores de status dos agentes em tempo real']
                },
                { 
                  icon: Users, name: 'Perfis de Experts', path: '/experts', 
                  desc: 'Gerencie personas de experts com IA. Cada expert possui identidade, branding, persona/voz, segmentação de público e configuração de redes sociais.',
                  features: ['Criação e alternância de experts', 'Configuração completa de identidade (nome, handle, nicho, bio)', 'Diretrizes de marca (cores, tipografia, estilo fotográfico)', 'Persona e voz (arquétipo, tom de voz)', 'Segmentação de público (ICP, habilidades)']
                },
                { 
                  icon: Camera, name: 'Digital Twins de IA', path: '/avatars', 
                  desc: 'Gere imagens e clones de vídeo com IA baseados na aparência do Expert.',
                  features: ['Geração de clones de imagem e vídeo', 'Presets de estilo (Cinematográfico, Estúdio, Casual, Podcast)', 'Geração baseada em prompt com rastreamento de status assíncrono', 'Galeria com ações de download e uso de assets']
                },
                { 
                  icon: BookOpen, name: 'Base de Conhecimento', path: '/knowledge', 
                  desc: 'Faça upload e gerencie documentos que formam a base contextual do Expert. Suporta PDF, DOCX, CSV, TXT.',
                  features: ['Upload drag & drop de arquivos (até 50MB)', 'Tabela de documentos com tipo, tamanho, status', 'Status do Índice Vetorial com métricas de armazenamento', 'Funcionalidade de busca e filtro']
                },
                { 
                  icon: Search, name: 'Pesquisa de Mercado', path: '/research', 
                  desc: 'Hub de inteligência multi-aba: Radar de Conteúdo Viral, Notícias da Indústria e SEO, e Análise de Concorrentes.',
                  features: ['Cards de conteúdo viral com métricas de engajamento (views, %)', 'Decomposição estrutural (Gancho → Corpo → CTA)', 'Motor "Clonar e Adaptar" — adapta conteúdo viral para a persona do Expert', 'Notícias da indústria com scores de SEO, níveis de relevância, palavras-chave alvo', 'Perfis de concorrentes: pontos fortes, fracos, lacunas de conteúdo', 'Ação "Transformar em Post de Blog" a partir de notícias']
                },
                { 
                  icon: PenTool, name: 'Estúdio de Conteúdo', path: '/studio', 
                  desc: 'Editor completo de carrosséis/slides com assistente de IA. Layout de três painéis: navegador de slides, preview do canvas, customização + chat com IA.',
                  features: ['Editor de carrosséis multi-slide (imagem + vídeo)', 'Importação/exportação CSV para criação em lote', 'Gerador de prompts IA para conteúdo CSV', '4 templates de layout (Overlay, Inferior, Superior, Dividido)', 'Alinhamento de texto, controles de fade, escala de mídia', 'Arquitetura de 4 cantos (Logo, Tag de Série, Handle, Contador)', 'Chat com assistente IA por agente no painel direito', 'Suporte multi-formato (4:5, 1:1, 9:16, 16:9)']
                },
                { 
                  icon: Video, name: 'Vídeo & Reels IA', path: '/video-studio', 
                  desc: 'Pipeline de produção de vídeo com avatares HeyGen, clone de voz ElevenLabs e timeline multi-clip.',
                  features: ['Seleção de formato (9:16 Reels ou 16:9 YouTube)', '4 templates de layout (Avatar Completo, Dividido Topo/Base, PiP)', 'Upload de B-Roll/background por clip', 'Seleção de Avatar IA com opção de upload manual', 'Seletor de clone de voz (Primária, Energética, Profissional)', 'Editor de roteiro com sugestões de tópicos virais', 'Timeline multi-clip com transições (Corte, Fade, Dissolve, Slide)', 'Controles de auto-legendas, BGM e auto-cortes']
                },
                { 
                  icon: Calendar, name: 'Calendário Editorial', path: '/calendar', 
                  desc: 'Visualização mensal do calendário para agendar conteúdo. Auto-preenchimento por IA gera estratégia de 30 dias.',
                  features: ['Grade mensal com agendamento por dia', 'Criação manual de posts com tags de plataforma/tipo', 'IA "Auto-Fill Strategy" — Orquestrador analisa ICP e tendências', 'Posts codificados por cores por plataforma (LinkedIn, Instagram, Notícias)']
                },
                { 
                  icon: KanbanSquare, name: 'Kanban Flow', path: '/kanban', 
                  desc: 'Rastreamento de produção de conteúdo com 5 colunas e verificação automatizada de QA de Marca por IA.',
                  features: ['5 colunas: Backlog → Pesquisa → Produção → Revisão → Aprovado', 'Ação "Enviar para QA" dispara verificação de Marca por IA', 'Agente de IA valida aderência ao tom em tempo real', 'Aprovado/Rejeitado com feedback detalhado (Identidade Travada ou Rejeitada)', 'Cards de tarefa com plataforma, formato e agente atribuído']
                },
                { 
                  icon: Bot, name: 'Agentes de IA', path: '/agents', 
                  desc: 'Gerencie a força de trabalho de IA. Cada agente tem system prompt, modelo, ferramentas e tarefas.',
                  features: ['Lista de agentes com status (ativo/ocupado/inativo)', 'Visão detalhada: system prompt, modelo de IA, ferramentas, tarefas atuais', 'Controles de Iniciar/Parar agente', 'Seleção de modelo (Gemini 1.5 Pro vs Flash)', 'Adição de ferramentas personalizadas aos agentes']
                },
                { 
                  icon: Globe, name: 'SEO & Blog', path: '/blog', 
                  desc: 'Módulo de duplo propósito: Preview ao Vivo do portal público do Expert + configuração AEO/SEO.',
                  features: ['Preview do site ao vivo com chrome do navegador', 'Seção hero com bio do expert e CTA', 'Gerador de Blog com IA e pontuação SEO', 'Configurações AEO (Autoridade de Entidade, Schema Markup)', 'Definição de Entidade Core para treinamento de LLMs', 'Gestão automatizada de pipeline de blog']
                },
              ].map((mod) => (
                <div key={mod.path} className="bg-surface border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center shrink-0">
                      <mod.icon size={18} style={{ color: brandColor }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-xl font-bold">{mod.name}</h3>
                        <code className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-text-muted font-mono">{mod.path}</code>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">{mod.desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-14">
                    {mod.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                        <ChevronRight size={12} className="shrink-0 mt-0.5" style={{ color: brandColor }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'data-models' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Database size={12} /> Modelos de Dados
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Modelos de Dados</h1>
                <p className="text-text-muted leading-relaxed">Interfaces TypeScript que definem a camada de dados. Atualmente armazenados no Zustand (client-side), projetados para migração ao Supabase.</p>
              </div>

              {[
                {
                  name: 'Expert',
                  file: 'store/expertStore.ts',
                  fields: [
                    { name: 'id', type: 'string', desc: 'Identificador único' },
                    { name: 'name', type: 'string', desc: 'Nome de exibição completo' },
                    { name: 'handle', type: 'string', desc: 'Handle social (ex: @aria.sterling)' },
                    { name: 'niche', type: 'string', desc: 'Indústria/nicho (ex: "Imóveis de Luxo")' },
                    { name: 'role', type: 'string?', desc: 'Título profissional' },
                    { name: 'bio', type: 'string', desc: 'Biografia curta' },
                    { name: 'profilePicture', type: 'string?', desc: 'URL da imagem de perfil' },
                    { name: 'socialLinks', type: 'object', desc: '{ instagram?, linkedin?, twitter? }' },
                    { name: 'brandColor', type: 'string', desc: 'Cor hexadecimal primária da marca' },
                    { name: 'colorPalette', type: 'string[]?', desc: 'Array completo de paleta de cores' },
                    { name: 'typography', type: 'object?', desc: '{ heading, body } — combinação de fontes' },
                    { name: 'archetype', type: 'string?', desc: 'Arquétipo de marca (ex: O Governante)' },
                    { name: 'toneOfVoice', type: 'string?', desc: 'Descrição detalhada de voz e tom' },
                    { name: 'photographicStyle', type: 'string?', desc: 'Direção visual para imagens' },
                    { name: 'icp', type: 'string?', desc: 'Descrição do Perfil de Cliente Ideal' },
                    { name: 'skills', type: 'string[]?', desc: 'Lista de competências principais' },
                    { name: 'tokens', type: 'string', desc: 'Contagem de tokens indexados (ex: "1.2M")' },
                    { name: 'archetypes', type: 'number', desc: 'Número de arquétipos configurados' },
                    { name: 'avatars', type: 'AvatarAsset[]?', desc: 'Avatares de IA gerados' },
                    { name: 'blogPosts', type: 'BlogPost[]?', desc: 'Artigos de blog publicados' },
                  ]
                },
                {
                  name: 'Agent',
                  file: 'store/agentStore.ts',
                  fields: [
                    { name: 'id', type: 'string', desc: 'Identificador único do agente' },
                    { name: 'expertId', type: 'string', desc: 'FK → Expert (proprietário)' },
                    { name: 'name', type: 'string', desc: 'Nome do agente (ex: "Orquestrador Prime")' },
                    { name: 'role', type: 'string', desc: 'Função do agente (ex: "Roteamento de Tarefas & Estratégia")' },
                    { name: 'description', type: 'string', desc: 'Resumo das capacidades do agente' },
                    { name: 'status', type: "'active'|'busy'|'idle'", desc: 'Status operacional atual' },
                    { name: 'model', type: 'string', desc: 'Modelo de IA (Gemini 1.5 Pro/Flash)' },
                    { name: 'systemPrompt', type: 'string', desc: 'System prompt completo com diretivas' },
                    { name: 'tools', type: 'string[]', desc: 'Ferramentas e capacidades equipadas' },
                    { name: 'tasks', type: 'AgentTask[]', desc: 'Fila de tarefas ativas' },
                    { name: 'color', type: 'string', desc: 'Classe CSS para indicador de status' },
                  ]
                },
                {
                  name: 'AvatarAsset',
                  file: 'store/expertStore.ts',
                  fields: [
                    { name: 'id', type: 'string', desc: 'ID único do avatar' },
                    { name: 'type', type: "'image'|'video'", desc: 'Tipo de asset' },
                    { name: 'url', type: 'string', desc: 'URL da mídia gerada' },
                    { name: 'status', type: "'generating'|'ready'|'failed'", desc: 'Status de geração' },
                    { name: 'prompt', type: 'string', desc: 'Prompt de geração utilizado' },
                    { name: 'style', type: 'string', desc: 'Preset de estilo visual' },
                    { name: 'createdAt', type: 'string', desc: 'Timestamp ISO de criação' },
                  ]
                },
                {
                  name: 'BlogPost',
                  file: 'store/expertStore.ts',
                  fields: [
                    { name: 'id', type: 'string', desc: 'ID único do post' },
                    { name: 'title', type: 'string', desc: 'Título do artigo' },
                    { name: 'excerpt', type: 'string', desc: 'Meta descrição para SEO' },
                    { name: 'content', type: 'string', desc: 'Corpo completo do artigo' },
                    { name: 'coverImage', type: 'string', desc: 'URL da imagem de capa' },
                    { name: 'seoScore', type: 'number', desc: 'Pontuação de otimização SEO (0–100)' },
                    { name: 'keywords', type: 'string[]', desc: 'Palavras-chave alvo de SEO' },
                    { name: 'readTime', type: 'string', desc: 'Tempo estimado de leitura' },
                    { name: 'category', type: 'string', desc: 'Categoria do conteúdo' },
                    { name: 'publishedAt', type: 'string', desc: 'Timestamp ISO de publicação' },
                  ]
                },
                {
                  name: 'AgentTask',
                  file: 'store/agentStore.ts',
                  fields: [
                    { name: 'id', type: 'string', desc: 'ID da tarefa' },
                    { name: 'title', type: 'string', desc: 'Descrição da tarefa' },
                    { name: 'status', type: "'pending'|'in-progress'|'completed'|'failed'", desc: 'Status da tarefa' },
                    { name: 'createdAt', type: 'string', desc: 'Timestamp ISO de criação' },
                  ]
                },
              ].map((model) => (
                <div key={model.name} className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-border bg-bg/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database size={16} style={{ color: brandColor }} />
                      <h3 className="font-bold font-mono text-lg">{model.name}</h3>
                    </div>
                    <code className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-text-muted font-mono">{model.file}</code>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-xs text-text-muted uppercase bg-bg/30">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Campo</th>
                          <th className="px-4 py-3 text-left font-medium">Tipo</th>
                          <th className="px-4 py-3 text-left font-medium">Descrição</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {model.fields.map((field, i) => (
                          <tr key={i} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-2 font-mono text-xs font-medium">{field.name}</td>
                            <td className="px-4 py-2 font-mono text-xs text-text-muted">{field.type}</td>
                            <td className="px-4 py-2 text-xs text-text-muted">{field.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'business-rules' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Shield size={12} /> Regras de Negócio
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Regras de Negócio & Diretivas do Sistema</h1>
                <p className="text-text-muted leading-relaxed">
                  Os invariantes fundamentais e restrições comportamentais que governam toda operação no ExpertOS.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-6">As Quatro Diretivas do Sistema</h3>
                <div className="space-y-4">
                  {[
                    { id: '01', title: 'Expert First', rule: 'Toda operação DEVE começar com o Expert selecionado. Antes de gerar qualquer coisa, o sistema carrega o briefing, branding, tom de voz, ICP e base de conhecimento. Nenhum módulo opera sem um contexto de Expert ativo.', enforcement: 'Todos os componentes de página verificam `if (!activeExpert)` e bloqueiam a renderização até que um seja selecionado.' },
                    { id: '02', title: 'Contexto Antes da Geração', rule: 'Nenhuma geração relevante acontece sem contexto suficiente. Nenhum agente produz "no vácuo". Toda saída deve responder: Quem é esse? Para quem é? Qual é o objetivo?', enforcement: 'Agentes de IA recebem contexto do expert nos system prompts. O motor Clonar e Adaptar carrega brandColor, toneOfVoice, ICP e nicho antes da adaptação.' },
                    { id: '03', title: 'Identidade Travada', rule: 'Toda saída DEVE refletir a identidade, voz e posicionamento do Expert. Produzir significa replicar raciocínio, repertório e estilo visual. O sistema não é um gerador genérico.', enforcement: 'O QA do Kanban rejeita automaticamente conteúdo que falha na verificação de tom. O agente Copy Architect garante aderência ao tom. O Visual Studio aplica brandColor do Expert em todo lugar.' },
                    { id: '04', title: 'Verificação Humana', rule: 'O sistema acelera a produção, mas a autenticidade permanece validada. O core de Brand Voice + QA garante que a saída nunca soe genérica.', enforcement: 'O workflow de QA no Kanban simula verificação de marca com feedback aprovado/reprovado. O conteúdo passa pela coluna de Revisão antes de ser Aprovado.' },
                  ].map((d) => (
                    <div key={d.id} className="bg-bg border border-border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>{d.id}</span>
                        <h4 className="font-bold text-lg">{d.title}</h4>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed mb-3">{d.rule}</p>
                      <div className="flex items-start gap-2 text-xs">
                        <Shield size={12} className="shrink-0 mt-0.5 text-green-400" />
                        <span className="text-green-400/80"><span className="font-bold text-green-400">Enforcement:</span> {d.enforcement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Regras do Ciclo de Vida do Expert</h3>
                <div className="space-y-3">
                  {[
                    'Um Expert DEVE ter: nome, handle, nicho, brandColor e avatarGradient no mínimo.',
                    'Trocar o Expert ativo re-contextualiza imediatamente todos os módulos do app.',
                    'Cada Expert possui seu próprio conjunto de: Agentes, Avatares, Posts de Blog e documentos da Base de Conhecimento.',
                    'O branding do Expert (brandColor) tematiza dinamicamente todos os elementos de UI, botões e cores de destaque em toda a aplicação.',
                    'Links de redes sociais, combinações tipográficas e estilo fotográfico são opcionais, mas enriquecem a qualidade da geração por IA.',
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-muted bg-bg border border-border rounded-xl p-3">
                      <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: brandColor }}>R{i + 1}</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Regras do Sistema de Agentes</h3>
                <div className="space-y-3">
                  {[
                    'Cada Agente pertence a exatamente um Expert (FK expertId).',
                    'O system prompt de um Agente DEVE referenciar a identidade, tom de voz e público-alvo do Expert.',
                    'Agentes possuem 3 estados operacionais: ativo (pronto), ocupado (processando), inativo (parado).',
                    'O agente Orquestrador delega para agentes especializados. Ele nunca produz conteúdo final diretamente.',
                    'O agente Copy Architect / QA valida aderência à marca. Ele pode rejeitar conteúdo de volta para Produção.',
                    'Atribuições de ferramentas aos agentes estendem suas capacidades. Ferramentas personalizadas podem ser adicionadas em tempo de execução.',
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-muted bg-bg border border-border rounded-xl p-3">
                      <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: brandColor }}>A{i + 1}</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Regras de Produção de Conteúdo</h3>
                <div className="space-y-3">
                  {[
                    'O conteúdo flui por um pipeline rigoroso: Backlog → Pesquisa → Produção → Revisão → Aprovado.',
                    'Mover para Revisão dispara verificação automática de QA por IA pelo Agente de QA de Marca.',
                    'QA pode resultar em APROVADO (move para coluna Aprovado) ou REJEITADO (retorna para Produção com feedback).',
                    'O motor "Clonar e Adaptar" requer a decomposição estrutural do conteúdo original (Gancho, Agitação, Pivô de Autoridade, CTA).',
                    'O conteúdo adaptado DEVE incluir: gancho adaptado, roteiro, justificativa, estratégia de funil e decomposição estrutural.',
                    'Posts de blog requerem score SEO, palavras-chave alvo e estrutura otimizada para AEO para visibilidade em motores de busca de IA.',
                    'Geração de avatar é assíncrona — transições de status: gerando → pronto | falhou.',
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-muted bg-bg border border-border rounded-xl p-3">
                      <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: brandColor }}>C{i + 1}</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'tech-stack' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Code2 size={12} /> Tecnologias
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Stack Tecnológico</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { category: 'Framework', items: [{ name: 'React 19', desc: 'Biblioteca de UI com Strict Mode' }, { name: 'Vite 6.2', desc: 'Ferramenta de build e servidor dev (porta 3000)' }] },
                  { category: 'Linguagem', items: [{ name: 'TypeScript 5.8', desc: 'Tipagem estrita com módulo ESNext' }] },
                  { category: 'Estilização', items: [{ name: 'Tailwind CSS v4', desc: 'CSS utilitário com plugin @tailwindcss/vite' }, { name: 'Poppins + REM', desc: 'Sistema tipográfico via Google Fonts' }] },
                  { category: 'Gerenciamento de Estado', items: [{ name: 'Zustand v5', desc: 'Store leve com atualizações imutáveis' }] },
                  { category: 'Roteamento', items: [{ name: 'react-router-dom v7', desc: 'BrowserRouter client-side com 12 rotas' }] },
                  { category: 'Utilitários', items: [{ name: 'clsx + tailwind-merge', desc: 'Composição condicional de classes CSS' }, { name: 'Lucide React', desc: 'Biblioteca de ícones (60+ usados)' }] },
                  { category: 'Animação', items: [{ name: 'Motion (Framer)', desc: 'Biblioteca de animação para transições' }, { name: 'CSS @keyframes', desc: 'Animações shimmer, pulse, progresso' }] },
                  { category: 'Integração IA (Planejada)', items: [{ name: 'API Gemini', desc: 'SDK Google GenAI (@google/genai)' }, { name: 'Ambiente', desc: 'GEMINI_API_KEY via .env.local' }] },
                ].map((cat) => (
                  <div key={cat.category} className="bg-surface border border-border rounded-2xl p-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: brandColor }}>{cat.category}</h3>
                    <div className="space-y-3">
                      {cat.items.map((item) => (
                        <div key={item.name}>
                          <div className="text-sm font-bold">{item.name}</div>
                          <div className="text-xs text-text-muted">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'design-system' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Palette size={12} /> Sistema Visual
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Design System</h1>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Tokens de Cor</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: '--color-bg', value: '#09090b', desc: 'Fundo' },
                    { name: '--color-surface', value: '#121214', desc: 'Superfície elevada' },
                    { name: '--color-border', value: '#27272a', desc: 'Borda/divisor' },
                    { name: '--color-primary', value: '#6366f1', desc: 'Destaque padrão da marca' },
                    { name: '--color-text-main', value: '#f4f4f5', desc: 'Texto primário' },
                    { name: '--color-text-muted', value: '#a1a1aa', desc: 'Texto secundário' },
                  ].map((token) => (
                    <div key={token.name} className="flex items-center gap-3 bg-bg border border-border rounded-xl p-3">
                      <div className="w-8 h-8 rounded-lg shrink-0 border border-white/10" style={{ backgroundColor: token.value }}></div>
                      <div>
                        <div className="text-xs font-bold font-mono">{token.value}</div>
                        <div className="text-[10px] text-text-muted">{token.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Tipografia</h3>
                <div className="space-y-4">
                  <div className="bg-bg border border-border rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Sans-Serif (Primária)</h4>
                    <p className="text-2xl font-sans">Poppins — A tipografia principal da interface</p>
                    <p className="text-xs text-text-muted mt-1">Usada para texto corrido, rótulos, botões e todos os elementos de UI.</p>
                  </div>
                  <div className="bg-bg border border-border rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Display (Títulos)</h4>
                    <p className="text-2xl font-serif">REM — Títulos e cabeçalhos de seção</p>
                    <p className="text-xs text-text-muted mt-1">Usada para títulos de página, cabeçalhos de seção e conteúdo editorial.</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Branding Dinâmico</h3>
                <p className="text-sm text-text-muted mb-4">
                  Toda a UI se adapta dinamicamente ao <code className="bg-white/5 px-1 rounded">brandColor</code> do Expert ativo. 
                  Isso é aplicado via estilos inline em toda a aplicação — afetando botões, destaques, bordas, badges e brilhos.
                </p>
                <div className="flex gap-4">
                  {['#6366f1', '#3b82f6', '#f43f5e'].map((color) => (
                    <div key={color} className="flex-1 bg-bg border border-border rounded-xl p-4 text-center">
                      <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ backgroundColor: color }}></div>
                      <div className="text-xs font-mono text-text-muted">{color}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Padrões de Componentes</h3>
                <div className="grid grid-cols-2 gap-3 text-xs text-text-muted">
                  {[
                    'Cards: bg-surface, border-border, rounded-2xl, p-6',
                    'Botões: brandColor bg, rounded-lg, hover:brightness-110',
                    'Rótulos: [10px] uppercase, tracking-wider, text-text-muted',
                    'Inputs: bg-bg, border-border, rounded-lg, focus:border-primary',
                    'Badges: bg-{color}/10, text-{color}, rounded, text-[10px]',
                    'Modais: absolute inset, bg-bg/80, backdrop-blur-sm',
                    'Scrollbar: custom-scrollbar com 6px de largura',
                    'Shimmer: animate-[shimmer_2s_infinite] overlay gradiente',
                  ].map((p, i) => (
                    <div key={i} className="bg-bg border border-border rounded-xl p-3 font-mono">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
