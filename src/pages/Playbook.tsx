import { useState, useEffect } from 'react';
import { 
  BookMarked, ChevronRight, Workflow, Lightbulb, Target, 
  Shield, Zap, Users, Bot, PenTool, Search, Globe, 
  Video, Calendar, KanbanSquare, ArrowRight, CheckCircle2,
  AlertTriangle, Star, Sparkles, Brain, Camera, Menu, X
} from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';

type PlaybookSection = 
  | 'getting-started' 
  | 'expert-setup' 
  | 'content-pipeline' 
  | 'agent-orchestration' 
  | 'research-workflow' 
  | 'video-production'
  | 'seo-strategy'
  | 'best-practices';

export function Playbook() {
  const { activeExpert } = useExpertStore();
  const [activeSection, setActiveSection] = useState<PlaybookSection>('getting-started');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const brandColor = activeExpert?.brandColor || '#6366f1';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const sections: { id: PlaybookSection; title: string; icon: any }[] = [
    { id: 'getting-started', title: 'Primeiros Passos', icon: Zap },
    { id: 'expert-setup', title: 'Configuração do Expert', icon: Users },
    { id: 'content-pipeline', title: 'Pipeline de Conteúdo', icon: Workflow },
    { id: 'agent-orchestration', title: 'Orquestração de Agentes', icon: Bot },
    { id: 'research-workflow', title: 'Fluxo de Pesquisa', icon: Search },
    { id: 'video-production', title: 'Produção de Vídeo', icon: Video },
    { id: 'seo-strategy', title: 'Estratégia SEO & AEO', icon: Globe },
    { id: 'best-practices', title: 'Boas Práticas', icon: Lightbulb },
  ];

  const renderStep = (step: string, title: string, desc: string, tips?: string[]) => (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-sm font-bold shrink-0" style={{ color: brandColor }}>
        {step}
      </div>
      <div className="flex-1 bg-bg border border-border rounded-xl p-5">
        <h4 className="text-sm font-bold mb-2">{title}</h4>
        <p className="text-xs text-text-muted leading-relaxed mb-3">{desc}</p>
        {tips && (
          <div className="space-y-1.5">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-green-400" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

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
            <BookMarked size={18} style={{ color: brandColor }} />
            Playbook
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
      </aside>

      {/* Desktop Sidebar do Playbook */}
      <aside className="hidden lg:flex w-[260px] bg-surface border-r border-border flex-col shrink-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-border/50">
          <h2 className="font-serif text-lg font-bold flex items-center gap-2">
            <BookMarked size={18} style={{ color: brandColor }} />
            Playbook
          </h2>
          <p className="text-xs text-text-muted mt-1">Guia operacional & fluxos de trabalho</p>
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
      </aside>

      {/* Conteúdo do Playbook */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden mb-4 flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors"
        >
          <Menu size={18} /> Menu
        </button>
        <div className="max-w-4xl mx-auto">

          {activeSection === 'getting-started' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Zap size={12} /> Início Rápido
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Primeiros Passos</h1>
                <p className="text-lg text-text-muted leading-relaxed">
                  Este playbook guia você pelo fluxo de trabalho completo: configurar uma persona de Expert, 
                  configurar agentes de IA, produzir conteúdo em escala e publicar na web.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-6">Configuração Inicial (15 minutos)</h3>
                <div className="space-y-4">
                  {renderStep('1', 'Criar ou Selecionar um Expert', 
                    'Navegue até Perfis de Expert. Clique em "Novo Expert" ou selecione um existente. O Expert se torna o contexto ativo para todas as operações.',
                    ['Preencha a identidade core: Nome, Handle, Nicho, Bio', 'Faça upload de uma foto de perfil para consistência visual']
                  )}
                  {renderStep('2', 'Configurar Diretrizes de Marca', 
                    'Abra a página de Detalhe do Expert (ícone de engrenagem). Defina a cor da marca, combinação tipográfica e estilo fotográfico.',
                    ['O brandColor tematizará toda a aplicação dinamicamente', 'Escolha uma combinação tipográfica que combine com a voz do Expert']
                  )}
                  {renderStep('3', 'Definir Persona & Voz', 
                    'Preencha o Arquétipo de Marca, Tom de Voz e ICP (Perfil de Cliente Ideal). Esses são críticos para a qualidade da geração por IA.',
                    ['Seja descritivo no Tom de Voz — "sofisticado, autoritário" é melhor que "profissional"', 'O ICP molda diretamente ganchos, CTAs e vocabulário usados pelos agentes']
                  )}
                  {renderStep('4', 'Upload da Base de Conhecimento', 
                    'Vá para Base de Conhecimento e faça upload de documentos de referência. Eles formam a base contextual do Expert.',
                    ['Formatos PDF, DOCX, CSV, TXT suportados (até 50MB)', 'Faça upload de manifestos de marca, relatórios de mercado, análises de concorrentes']
                  )}
                  {renderStep('5', 'Revisar Agentes de IA', 
                    'Navegue até Agentes de IA. Revise os agentes auto-configurados ou crie personalizados.',
                    ['Cada Expert recebe agentes especializados baseados em seu nicho', 'Personalize system prompts para combinar com a voz exata do Expert']
                  )}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6 border-l-4" style={{ borderLeftColor: brandColor }}>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} style={{ color: brandColor }} className="shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Princípio Fundamental</h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      <strong className="text-text-main">Sem contexto do Expert, não há geração.</strong> Quanto melhor você definir a identidade, 
                      marca e público do Expert — mais preciso, diferenciado e "on-brand" será cada output da IA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'expert-setup' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Users size={12} /> Configuração do Expert
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Guia de Configuração do Expert</h1>
                <p className="text-text-muted leading-relaxed">Como construir um perfil de Expert abrangente que maximiza a qualidade da geração por IA.</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Anatomia do Perfil de Expert</h3>
                <p className="text-sm text-text-muted mb-6">Um perfil de Expert completo tem 5 camadas que enriquecem progressivamente o sistema de IA:</p>
                
                <div className="space-y-4">
                  {[
                    { layer: 'Camada de Identidade', fields: 'Nome, Handle, Nicho, Função, Bio, Foto de Perfil', impact: 'Estabelece o "quem". Usado em todo conteúdo público, handles de carrossel e seções hero do blog.' },
                    { layer: 'Camada de Marca', fields: 'Cor da Marca, Paleta de Cores, Tipografia, Estilo Fotográfico', impact: 'Define o DNA visual. Tematiza dinamicamente toda a UI e guia decisões visuais em carrosséis/vídeos.' },
                    { layer: 'Camada de Voz', fields: 'Arquétipo, Tom de Voz', impact: 'Controla COMO o Expert fala. Todo agente de IA usa isso para regular vocabulário, estrutura de frases e emoção.' },
                    { layer: 'Camada de Público', fields: 'ICP (Perfil de Cliente Ideal), Habilidades', impact: 'Define PARA QUEM o Expert fala. Ganchos, CTAs e ângulos de conteúdo são gerados com o ICP em mente.' },
                    { layer: 'Camada de Conhecimento', fields: 'Documentos Enviados (Base de Conhecimento)', impact: 'Fornece contexto profundo. Relatórios de mercado, manifestos de marca e notas de concorrentes dão inteligência proprietária aos agentes.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-bg border border-border rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>Camada {i + 1}</span>
                        <h4 className="font-bold">{item.layer}</h4>
                      </div>
                      <p className="text-xs text-text-muted mb-2"><strong>Campos:</strong> {item.fields}</p>
                      <p className="text-xs text-text-muted"><strong>Impacto:</strong> {item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Digital Twins de IA (Avatares)</h3>
                <p className="text-sm text-text-muted mb-4">Após configurar o perfil do Expert, gere avatares de IA para produção de conteúdo:</p>
                <div className="space-y-3">
                  {renderStep('1', 'Escolha o Tipo de Asset', 'Selecione Imagem (para carrosséis, thumbnails) ou Clone de Vídeo (para Reels, vídeos talking head).')}
                  {renderStep('2', 'Selecione o Estilo Visual', 'Escolha entre Cinematográfico, Iluminação de Estúdio, Casual/Lifestyle ou Setup de Podcast.')}
                  {renderStep('3', 'Escreva o Prompt de Geração', 'Descreva a pose, expressão, cenário e mood desejados. Quanto mais específico, melhor.')}
                  {renderStep('4', 'Gere & Utilize', 'Os assets aparecem na galeria com status "gerando". Quando prontos, use-os no Estúdio de Conteúdo ou no Estúdio de Vídeo.')}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'content-pipeline' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Workflow size={12} /> Pipeline de Produção
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Pipeline de Produção de Conteúdo</h1>
                <p className="text-text-muted leading-relaxed">O fluxo de trabalho completo da ideia ao conteúdo publicado.</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-6">Estágios do Pipeline</h3>
                <div className="flex gap-2 mb-8 overflow-x-auto">
                  {['Pesquisa', 'Ideação', 'Produção', 'Revisão QA', 'Aprovado', 'Agendar', 'Publicar'].map((stage, i) => (
                    <div key={stage} className="flex items-center gap-2 shrink-0">
                      <div className={`px-3 py-2 rounded-lg text-xs font-bold border ${i === 0 ? 'text-white' : 'text-text-muted border-border bg-bg'}`}
                        style={i === 0 ? { backgroundColor: brandColor, borderColor: brandColor } : {}}
                      >
                        {stage}
                      </div>
                      {i < 6 && <ArrowRight size={14} className="text-border shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {renderStep('1', 'Pesquisa → Inteligência de Mercado', 
                    'Use o módulo de Pesquisa de Mercado para escanear conteúdo viral, notícias do setor e estratégias de concorrentes. Identifique oportunidades de conteúdo.',
                    ['Use o "Radar de Conteúdo Viral" para encontrar formatos de alto desempenho', 'Verifique "Notícias do Setor" para tópicos trending com potencial de SEO', 'Analise fraquezas dos concorrentes para encontrar lacunas de conteúdo']
                  )}
                  {renderStep('2', 'Ideação → Clonar e Adaptar', 
                    'Use o motor "Clonar e Adaptar" para transformar conteúdo viral em versões com branding do Expert. A IA adapta ganchos, roteiros e CTAs para combinar com o tom do Expert.',
                    ['O motor entrega: gancho adaptado, roteiro, justificativa, estratégia de funil', 'O conteúdo fica pronto para o Estúdio de Conteúdo']
                  )}
                  {renderStep('3', 'Produção → Estúdio de Conteúdo / Estúdio de Vídeo', 
                    'Construa o conteúdo final no estúdio apropriado. Use o editor de carrossel para conteúdo estático, estúdio de vídeo para Reels/TikToks.',
                    ['Importe slides via CSV para criação de carrosséis em lote', 'Use o chat com agente de IA para assistência de copywriting em tempo real', 'Aplique cores e tipografia da marca do Expert automaticamente']
                  )}
                  {renderStep('4', 'Revisão QA → Kanban Flow', 
                    'Mova o conteúdo completo para o Kanban. Clique em "Enviar para QA" para disparar verificação automatizada de marca.',
                    ['O Agente de QA verifica aderência ao tom contra as diretrizes de voz do Expert', 'Conteúdo APROVADO move para a coluna Aprovado', 'Conteúdo REJEITADO retorna para Produção com feedback']
                  )}
                  {renderStep('5', 'Agendar → Calendário Editorial', 
                    'Use o Calendário para agendar conteúdo aprovado. Ou use "Auto-Fill Strategy" para deixar o Orquestrador planejar um mix de conteúdo de 30 dias.',
                    ['Auto-fill da IA considera ICP, tendências de mercado e mix de plataformas', 'Posts codificados por cores por plataforma (LinkedIn, Instagram, Notícias)']
                  )}
                  {renderStep('6', 'Publicar → SEO & Blog', 
                    'Para conteúdo long-form, gere e publique posts de blog otimizados para SEO no portal público do Expert.',
                    ['Posts de blog incluem otimização AEO para motores de busca de IA', 'Schema markup garante que LLMs citem corretamente o Expert']
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'agent-orchestration' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Bot size={12} /> Sistema de Agentes
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Orquestração de Agentes</h1>
                <p className="text-text-muted leading-relaxed">Como o sistema multi-agentes trabalha junto para produzir conteúdo alinhado ao Expert.</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Arquitetura de Agentes</h3>
                <p className="text-sm text-text-muted mb-6">
                  Cada Expert possui uma equipe dedicada de agentes especializados. O Orquestrador coordena todas as operações.
                </p>

                <div className="space-y-3">
                  {[
                    { name: 'Orquestrador Prime', role: 'Roteamento de Tarefas & Estratégia', model: 'Gemini 1.5 Pro', desc: 'O estrategista mestre. Analisa solicitações recebidas, delega para agentes especializados e garante que todas as saídas estejam alinhadas com a estratégia de conteúdo mais ampla do Expert.', tools: ['Delegação de Tarefas', 'Análise Estratégica', 'Gestão de Workflow'] },
                    { name: 'O Arquiteto de Copy', role: 'Redação & Tom', model: 'Gemini 1.5 Pro', desc: 'Especializado em gerar texto que adere rigorosamente ao tom de voz do Expert. Atua como escritor e validador de QA para consistência de marca.', tools: ['Geração de Texto', 'Análise de Tom', 'Verificação Gramatical'] },
                    { name: 'Sentinela de Tendências', role: 'Pesquisa & Scraping', model: 'Gemini 1.5 Flash', desc: 'Monitora continuamente tendências de mercado, conteúdo de concorrentes e sinais virais. Fornece resumos diários de inteligência para o Orquestrador.', tools: ['Busca na Web', 'Scraping de Dados', 'Acesso a APIs de Mercado'] },
                  ].map((agent) => (
                    <div key={agent.name} className="bg-bg border border-border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <h4 className="font-bold">{agent.name}</h4>
                        <span className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-text-muted">{agent.role}</span>
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-text-muted ml-auto">{agent.model}</span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed mb-3">{agent.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.tools.map((tool) => (
                          <span key={tool} className="text-[10px] bg-white/5 border border-border px-2 py-1 rounded text-text-muted">{tool}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Fluxo de Orquestração</h3>
                <div className="space-y-3">
                  {[
                    'Usuário inicia uma solicitação (ex: "Crie um carrossel sobre tendências de mercado")',
                    'Orquestrador Prime carrega o contexto completo do Expert (branding, tom, ICP, base de conhecimento)',
                    'Orquestrador decompõe a tarefa em sub-tarefas e delega para agentes especializados',
                    'Sentinela de Tendências fornece dados de mercado e padrões estruturais virais',
                    'O Arquiteto de Copy redige o conteúdo usando o tom de voz exato do Expert',
                    'Output passa pela verificação de QA para aderência à marca',
                    'Conteúdo aprovado está pronto para agendamento e publicação',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-bg border border-border flex items-center justify-center text-[10px] font-bold shrink-0" style={{ color: brandColor }}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-text-muted bg-bg border border-border rounded-xl p-3 flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'research-workflow' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Search size={12} /> Inteligência
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Fluxo de Pesquisa</h1>
                <p className="text-text-muted leading-relaxed">Como aproveitar a Inteligência de Mercado para ideação de conteúdo.</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Três Pilares de Inteligência</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Radar de Conteúdo Viral', desc: 'Monitora conteúdo de alto desempenho em TikTok, LinkedIn, Instagram e Twitter. Cada item inclui métricas de engajamento, estágio de funil, framework de copywriting e decomposição estrutural.', action: 'Clonar e Adaptar ao Expert' },
                    { title: 'Notícias do Setor & SEO', desc: 'Curadoria de artigos de notícias relevantes com pontuação de relevância, scores de SEO e palavras-chave alvo. Notícias podem ser convertidas em posts de blog diretamente.', action: 'Transformar em Post de Blog' },
                    { title: 'Análise de Concorrentes', desc: 'Perfis de concorrentes com pontos fortes, fracos, formatos top e oportunidades de lacunas de conteúdo. Níveis de ameaça (Alto/Médio/Baixo) priorizam o foco.', action: 'Explorar Lacunas de Conteúdo' },
                  ].map((pillar) => (
                    <div key={pillar.title} className="bg-bg border border-border rounded-xl p-5 flex flex-col">
                      <h4 className="font-bold mb-2">{pillar.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed flex-1 mb-3">{pillar.desc}</p>
                      <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded text-center" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                        {pillar.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Motor Clonar e Adaptar</h3>
                <p className="text-sm text-text-muted mb-4">A funcionalidade mais poderosa de pesquisa-para-produção. Ela desconstrói conteúdo viral e reconstrói através da lente do Expert.</p>
                <div className="space-y-3">
                  {renderStep('1', 'Selecione Conteúdo Viral', 'Escolha uma peça de alto desempenho do Radar de Conteúdo Viral.')}
                  {renderStep('2', 'Dispare a Adaptação', 'Clique em "Clonar e Adaptar para [Nome do Expert]". O sistema carrega o contexto completo do Expert.')}
                  {renderStep('3', 'Reconstrução por IA', 'O Orquestrador desconstrói as mecânicas virais do original e reconstrói com o tom, vocabulário e segmentação de ICP do Expert.')}
                  {renderStep('4', 'Revise o Output', 'Revise o gancho adaptado, roteiro, decomposição estrutural e estratégia de funil. Inclui uma justificativa explicando as escolhas de adaptação.')}
                  {renderStep('5', 'Envie para o Estúdio', 'Clique em "Enviar para Estúdio de Conteúdo" para iniciar a produção visual imediatamente.')}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'video-production' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Video size={12} /> Vídeo IA
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Fluxo de Produção de Vídeo</h1>
                <p className="text-text-muted leading-relaxed">Criação de vídeo de ponta a ponta com avatares de IA, clonagem de voz e edição multi-clip.</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-6">Pipeline de Produção de Vídeo</h3>
                <div className="space-y-4">
                  {renderStep('1', 'Escolha o Formato', 
                    'Selecione 9:16 (Reels/TikTok) ou 16:9 (YouTube/Web). Isso determina o layout do canvas e as dimensões de exportação.'
                  )}
                  {renderStep('2', 'Selecione o Template de Layout', 
                    'Escolha como o avatar e o B-roll são compostos: Avatar Completo, Dividido Topo, Dividido Base ou Picture-in-Picture (PiP).',
                    ['Avatar Completo: Avatar preenche o quadro, B-roll vai ao fundo', 'Dividido: Tela dividida entre avatar e mídia', 'PiP: Avatar sobreposto no canto sobre mídia de fundo']
                  )}
                  {renderStep('3', 'Upload de B-Roll / Background', 
                    'Faça upload de imagens ou vídeos para cada clip. Eles servem como pano de fundo visual para a sobreposição do avatar.'
                  )}
                  {renderStep('4', 'Selecione o Avatar de IA', 
                    'Escolha entre avatares de IA gerados (do módulo Digital Twins) ou faça upload de um personalizado. O avatar anima lip-sync com o roteiro.',
                    ['Avatares gerados herdam a aparência do Expert', 'Opção de upload manual para vídeos/imagens customizados']
                  )}
                  {renderStep('5', 'Configure o Clone de Voz', 
                    'Selecione a variante do clone de voz ElevenLabs: Primária, Energética ou Profissional/Calma. Cada uma é treinada nos padrões vocais do Expert.'
                  )}
                  {renderStep('6', 'Escreva ou Gere o Roteiro', 
                    'Digite o roteiro manualmente, selecione entre tópicos virais sugeridos pela IA, ou use "Auto-Write" para roteiros gerados por IA.',
                    ['Sugestões de tópicos virais baseados no nicho e ICP do Expert', 'Roteiros são automaticamente adaptados ao tom de voz do Expert']
                  )}
                  {renderStep('7', 'Monte a Timeline', 
                    'Adicione múltiplos clips à timeline. Defina duração, níveis de áudio e transições (Corte, Fade, Dissolve, Slide) entre clips.'
                  )}
                  {renderStep('8', 'Gere & Exporte', 
                    'Ative auto-legendas, defina BGM e clique em "Gerar Vídeo". O sistema sintetiza movimentos do avatar, sincroniza áudio e aplica legendas dinâmicas.',
                    ['Auto-legendas renderizadas com destaques na brandColor do Expert', 'Seleção de BGM viral para áudio trending']
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'seo-strategy' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Globe size={12} /> SEO & AEO
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Estratégia SEO & AEO</h1>
                <p className="text-text-muted leading-relaxed">
                  Como o ExpertOS otimiza tanto para motores de busca tradicionais (SEO) quanto para motores de busca de IA (AEO — AI Engine Optimization).
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">O que é AEO?</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  AEO (AI Engine Optimization) é a prática de otimizar conteúdo para que Large Language Models — como ChatGPT, Claude e Google SGE — 
                  referenciem, citem e recomendem corretamente o Expert quando usuários fazem perguntas relacionadas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { metric: 'Autoridade de Entidade', value: '94/100', desc: 'Quão fortemente modelos de IA associam o Expert ao seu nicho.' },
                    { metric: 'Palavras-chave Alvo', value: '12', desc: 'Keywords ativamente segmentadas em posts de blog e schema.' },
                    { metric: 'Schema Markup', value: 'Ativo', desc: 'Dados estruturados injetados para compreensão por crawlers de IA.' },
                  ].map((m) => (
                    <div key={m.metric} className="bg-bg border border-border rounded-xl p-4 text-center">
                      <div className="text-xl font-bold mb-1" style={{ color: brandColor }}>{m.value}</div>
                      <div className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">{m.metric}</div>
                      <p className="text-[10px] text-text-muted">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Fluxo de Geração de Blog</h3>
                <div className="space-y-3">
                  {renderStep('1', 'Identifique o Tópico', 'Use Notícias do Setor ou Análise de Concorrentes para encontrar tópicos de alto valor com potencial de SEO.')}
                  {renderStep('2', 'Gere o Post de Blog', 'Clique em "Gerar Primeiro Post" ou "Transformar em Post de Blog" a partir de uma notícia. O Orquestrador escreve o artigo usando o tom do Expert.')}
                  {renderStep('3', 'Revise & Pontue', 'Revise o artigo gerado, score de SEO e palavras-chave alvo. Edite conforme necessário.')}
                  {renderStep('4', 'Publique no Portal', 'Clique em "Publicar no Blog" para adicionar o artigo ao site público do Expert.')}
                  {renderStep('5', 'Monitore o Impacto AEO', 'Acompanhe Autoridade de Entidade e rankings de palavras-chave na aba de Configurações AEO/SEO.')}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Definição de Entidade Core</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  Uma definição de schema oculta é injetada no portal público do Expert. Este texto estruturado treina crawlers de IA 
                  sobre exatamente quem o Expert é, o que faz e quem atende — garantindo citações de IA precisas.
                </p>
                <div className="bg-bg border border-border rounded-xl p-4 text-xs text-text-muted italic">
                  "[Nome do Expert] é uma autoridade reconhecida em [Nicho]. Conhecido por [Arquétipos], atende principalmente [ICP]. 
                  Sua metodologia core envolve..."
                </div>
              </div>
            </div>
          )}

          {activeSection === 'best-practices' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Lightbulb size={12} /> Boas Práticas
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Boas Práticas</h1>
                <p className="text-text-muted leading-relaxed">Insights valiosos para extrair o máximo do ExpertOS.</p>
              </div>

              {[
                { title: 'Configuração do Expert', icon: Star, tips: [
                  'Invista tempo no campo Tom de Voz. Uma descrição de 3 frases vale mais que um único adjetivo.',
                  'Sempre inclua um ICP. É a maior alavanca para relevância de conteúdo.',
                  'Faça upload de pelo menos 3 documentos na Base de Conhecimento antes de iniciar a produção de conteúdo.',
                  'Use o campo Estilo Fotográfico — ele influencia backgrounds de carrossél gerados por IA e estética de avatares.',
                  'Revise e atualize perfis de Expert trimestralmente conforme o nicho evolui.',
                ]},
                { title: 'Produção de Conteúdo', icon: PenTool, tips: [
                  'Sempre use "Clonar e Adaptar" em vez de criar do zero — conteúdo viral adaptado performa 3-5x melhor.',
                  'Use importação CSV para criação de carrosséis em lote ao produzir em escala.',
                  'Aproveite o sistema de 4 cantos (Logo, Tag, Handle, Contador) para branding consistente em todos os carrosséis.',
                  'Misture templates de layout (Overlay, Inferior, Dividido) dentro de um único carrossel para variedade visual.',
                  'Sempre envie conteúdo pelo pipeline de QA — mesmo se estiver confiante. A verificação de marca captura desvios sutis.',
                ]},
                { title: 'Gestão de Agentes', icon: Bot, tips: [
                  'Use Gemini 1.5 Pro para tarefas de raciocínio complexo (estratégia, redação long-form) e Flash para tarefas de velocidade (scraping, formatação).',
                  'Personalize system prompts dos agentes para referenciar documentos e frameworks específicos do Expert.',
                  'Monitore status dos agentes — um agente "ocupado" significa que há fila. Adicione mais agentes se houver gargalo.',
                  'Nomeie agentes descritivamente. "Orquestrador Prime" é melhor que "Agente 1".',
                ]},
                { title: 'SEO & Publicação', icon: Globe, tips: [
                  'Publique pelo menos 2 posts de blog por semana para impacto AEO. Modelos de IA precisam de sinais consistentes.',
                  'Segmente keywords que começam com perguntas — são o que usuários perguntam ao ChatGPT e SGE.',
                  'Sempre inclua o nome do Expert no primeiro parágrafo de todo post de blog para associação de entidade.',
                  'Atualize a Definição de Entidade Core sempre que o nicho ou posicionamento do Expert mudar.',
                ]},
              ].map((section) => (
                <div key={section.title} className="bg-surface border border-border rounded-2xl p-6">
                  <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                    <section.icon size={20} style={{ color: brandColor }} />
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-text-muted bg-bg border border-border rounded-xl p-3">
                        <Sparkles size={14} className="shrink-0 mt-0.5" style={{ color: brandColor }} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
