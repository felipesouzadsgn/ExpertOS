import { useState, useEffect } from 'react';
import { 
  FileBarChart2, ChevronRight, Target, Users, Shield, Zap, 
  Layers, Globe, Bot, Calendar, CheckCircle2, Clock, 
  ArrowRight, Sparkles, AlertTriangle, TrendingUp, Video,
  Search, PenTool, KanbanSquare, Camera, BookOpen, BarChart2,
  Star, Rocket, Milestone, Menu, X
} from 'lucide-react';
import { useExpertStore } from '@/store/expertStore';

type PRDSection = 
  | 'vision' 
  | 'personas' 
  | 'user-stories' 
  | 'features' 
  | 'roadmap' 
  | 'metrics' 
  | 'risks';

export function PRD() {
  const { activeExpert } = useExpertStore();
  const [activeSection, setActiveSection] = useState<PRDSection>('vision');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const brandColor = activeExpert?.brandColor || '#6366f1';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const sections: { id: PRDSection; title: string; icon: any }[] = [
    { id: 'vision', title: 'Visão & Estratégia', icon: Target },
    { id: 'personas', title: 'Personas de Usuário', icon: Users },
    { id: 'user-stories', title: 'Histórias de Usuário', icon: BookOpen },
    { id: 'features', title: 'Matriz de Features', icon: Layers },
    { id: 'roadmap', title: 'Roadmap', icon: Milestone },
    { id: 'metrics', title: 'Métricas de Sucesso', icon: BarChart2 },
    { id: 'risks', title: 'Riscos & Mitigações', icon: Shield },
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
            <FileBarChart2 size={18} style={{ color: brandColor }} />
            PRD
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
        <div className="p-4 m-3 bg-white/5 rounded-xl space-y-2">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Status</p>
            <p className="text-sm font-medium text-green-400 flex items-center gap-1"><CheckCircle2 size={12} /> MVP em Desenvolvimento</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Sprint</p>
            <p className="text-sm font-medium">Sprint 1 — Fundação</p>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar do PRD */}
      <aside className="hidden lg:flex w-[260px] bg-surface border-r border-border flex-col shrink-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-border/50">
          <h2 className="font-serif text-lg font-bold flex items-center gap-2">
            <FileBarChart2 size={18} style={{ color: brandColor }} />
            PRD
          </h2>
          <p className="text-xs text-text-muted mt-1">Documento de Requisitos do Produto</p>
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
        <div className="p-4 m-3 bg-white/5 rounded-xl space-y-2">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Status</p>
            <p className="text-sm font-medium text-green-400 flex items-center gap-1"><CheckCircle2 size={12} /> MVP em Desenvolvimento</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Sprint</p>
            <p className="text-sm font-medium">Sprint 1 — Fundação</p>
          </div>
        </div>
      </aside>

      {/* Conteúdo do PRD */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden mb-4 flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors"
        >
          <Menu size={18} /> Menu
        </button>
        <div className="max-w-4xl mx-auto">

          {activeSection === 'vision' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Target size={12} /> Visão do Produto
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Documento de Requisitos do Produto</h1>
                <p className="text-lg text-text-muted leading-relaxed">
                  ExpertOS — O sistema operacional para produção de conteúdo com IA orientada por experts em escala.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Visão do Produto</h3>
                <div className="bg-bg border border-border rounded-xl p-5 mb-6">
                  <p className="text-lg font-serif italic leading-relaxed" style={{ color: brandColor }}>
                    "Primeiro o sistema entende o Expert. Depois o sistema produz como o Expert."
                  </p>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  O ExpertOS permite que especialistas, criadores de conteúdo e marcas pessoais criem um gêmeo digital 
                  de sua identidade profissional — incluindo conhecimento, voz, estilo visual e estratégia de conteúdo — alimentado 
                  por uma equipe de agentes de IA especializados que produzem, validam e publicam conteúdo de forma autônoma, 
                  mantendo autenticidade absoluta da marca.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Posicionamento Estratégico</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Problema', desc: 'Experts gastam 20+ horas/semana criando conteúdo. Ferramentas genéricas de IA produzem outputs que não soam como eles, prejudicando credibilidade e consistência de marca.' },
                    { title: 'Solução', desc: 'Um sistema dedicado de produção com IA pré-carregado com a identidade, voz, público e conhecimento do Expert. Todo output é "on-brand" por design.' },
                    { title: 'Diferenciação', desc: 'Diferente de ferramentas genéricas de IA, o ExpertOS impõe o Bloqueio de Identidade — o sistema não pode produzir sem contexto do Expert. Isso é uma feature, não uma limitação.' },
                    { title: 'Oportunidade de Mercado', desc: 'Economia dos criadores ($250B+), personal branding, thought leadership B2B. Alvo: consultores, coaches, corretores, founders de SaaS e profissionais de conteúdo.' },
                  ].map((item) => (
                    <div key={item.title} className="bg-bg border border-border rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: brandColor }}>{item.title}</h4>
                      <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl mb-4">Modelo de Receita</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { tier: 'Starter', price: 'R$249/mês', features: ['1 Perfil de Expert', '2 Agentes de IA', '50 gerações IA/mês', 'Base de Conhecimento básica', 'Estúdio de Conteúdo'] },
                    { tier: 'Professional', price: 'R$749/mês', features: ['3 Perfis de Expert', 'Agentes ilimitados', 'Gerações ilimitadas', 'Base de Conhecimento completa', 'Estúdio de Vídeo + Blog AEO', 'Suporte prioritário'] },
                    { tier: 'Enterprise', price: 'Personalizado', features: ['Experts ilimitados', 'Treinamento personalizado de agentes', 'Infraestrutura dedicada', 'Portal white-label', 'Acesso à API', 'SSO e gestão de equipe'] },
                  ].map((tier, i) => (
                    <div key={tier.tier} className={`bg-bg border rounded-xl p-5 flex flex-col ${i === 1 ? 'border-2' : 'border-border'}`} style={i === 1 ? { borderColor: brandColor } : {}}>
                      {i === 1 && (
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1" style={{ color: brandColor }}>
                          <Star size={10} /> Mais Popular
                        </div>
                      )}
                      <h4 className="text-lg font-bold mb-1">{tier.tier}</h4>
                      <p className="text-2xl font-bold mb-4" style={{ color: i === 1 ? brandColor : undefined }}>{tier.price}</p>
                      <div className="space-y-2 flex-1">
                        {tier.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-text-muted">
                            <CheckCircle2 size={12} className="text-green-400 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'personas' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Users size={12} /> Personas de Usuário
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Personas de Usuário Alvo</h1>
              </div>

              {[
                { 
                  name: 'Aria Sterling', role: 'Corretora de Imóveis de Luxo', 
                  pain: 'Gasta 15+ horas/semana em posts do LinkedIn, carrosséis do Instagram e comentários de mercado. Contrata um social media manager que não compreende seu nicho suficientemente.',
                  goal: 'Clonar sua voz autoritária em um sistema de IA que produz conteúdo indistinguível de sua própria escrita, enquanto ela foca em negócios de R$50M+.',
                  usage: 'Usa o Estúdio de Conteúdo diariamente para carrosséis, Estúdio de Vídeo para Reels e Pesquisa de Mercado semanalmente para tópicos trending.',
                  tier: 'Professional'
                },
                { 
                  name: 'Marcus Chen', role: 'Advisor de Growth SaaS B2B', 
                  pain: 'Tem conhecimento técnico profundo mas luta para traduzir insights em conteúdo social engajador de forma consistente. Posts inconsistentes matam o momentum.',
                  goal: 'Automatizar o pipeline ideação-para-publicação. Pesquisa → Rascunho → QA → Agendamento deve acontecer com mínima intervenção manual.',
                  usage: 'Depende de Agentes de IA para resumos automatizados de pesquisa, Clonar e Adaptar para ideação de conteúdo, e Calendário Editorial para agendamento estratégico.',
                  tier: 'Professional'
                },
                { 
                  name: 'Elena Rostova', role: 'Coach & Mentora High-Ticket', 
                  pain: 'Engajamento com comunidade é crítico mas consome muito tempo. Ferramentas genéricas de IA fazem ela soar robótica e inautêntica para sua marca empática e acolhedora.',
                  goal: 'Um sistema de IA treinado especificamente na sua voz que possa redigir newsletters, respostas de comunidade e carrosséis motivacionais que soem genuinamente pessoais.',
                  usage: 'Usa Base de Conhecimento extensivamente (uploads de frameworks de coaching), Avatares de IA para conteúdo em vídeo em escala, e Blog SEO para construção de autoridade orgânica.',
                  tier: 'Enterprise'
                },
              ].map((persona) => (
                <div key={persona.name} className="bg-surface border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-bg border border-border flex items-center justify-center">
                      <Users size={24} style={{ color: brandColor }} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold">{persona.name}</h3>
                      <p className="text-xs text-text-muted uppercase tracking-wider">{persona.role}</p>
                    </div>
                    <span className="ml-auto text-[10px] uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                      {persona.tier}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Dor', value: persona.pain, icon: AlertTriangle },
                      { label: 'Objetivo', value: persona.goal, icon: Target },
                      { label: 'Uso Principal', value: persona.usage, icon: TrendingUp },
                    ].map((item) => (
                      <div key={item.label} className="bg-bg border border-border rounded-xl p-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1">
                          <item.icon size={12} /> {item.label}
                        </h4>
                        <p className="text-xs text-text-muted leading-relaxed">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'user-stories' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <BookOpen size={12} /> Histórias de Usuário
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Histórias de Usuário</h1>
                <p className="text-text-muted">Histórias de usuário priorizadas organizadas por módulo. Escopo MVP destacado.</p>
              </div>

              {[
                { module: 'Gestão de Experts', stories: [
                  { story: 'Como usuário, quero criar um novo perfil de Expert com nome, nicho e branding para que o sistema tenha contexto para todas as operações de IA.', priority: 'P0', status: 'Feito' },
                  { story: 'Como usuário, quero alternar entre perfis de Expert instantaneamente para que todos os módulos se re-contextualizem para o Expert selecionado.', priority: 'P0', status: 'Feito' },
                  { story: 'Como usuário, quero configurar cor da marca, tipografia e estilo fotográfico para que todo conteúdo gerado corresponda ao DNA visual do Expert.', priority: 'P0', status: 'Feito' },
                  { story: 'Como usuário, quero definir tom de voz e ICP para que agentes de IA gerem conteúdo que soe autêntico e mire o público correto.', priority: 'P0', status: 'Feito' },
                ]},
                { module: 'Estúdio de Conteúdo', stories: [
                  { story: 'Como usuário, quero criar carrosséis multi-slide com texto, imagens e layouts personalizados para produzir conteúdo social em escala.', priority: 'P0', status: 'Feito' },
                  { story: 'Como usuário, quero importar slides via CSV para criar carrosséis em lote a partir de conteúdo gerado por IA ou externo.', priority: 'P1', status: 'Feito' },
                  { story: 'Como usuário, quero um assistente de chat com IA no estúdio para obter ajuda de copywriting sem sair do editor.', priority: 'P1', status: 'Feito' },
                  { story: 'Como usuário, quero exportar carrosséis como imagens para publicá-los em plataformas de redes sociais.', priority: 'P1', status: 'Planejado' },
                ]},
                { module: 'Estúdio de Vídeo', stories: [
                  { story: 'Como usuário, quero criar vídeos com IA com lip-sync de avatar e clonagem de voz para produzir Reels/TikToks sem aparecer na câmera.', priority: 'P0', status: 'Feito (UI)' },
                  { story: 'Como usuário, quero múltiplos templates de layout (Completo, Dividido, PiP) para variar meus formatos de vídeo.', priority: 'P1', status: 'Feito' },
                  { story: 'Como usuário, quero uma timeline multi-clip com transições para construir narrativas de vídeo complexas.', priority: 'P1', status: 'Feito' },
                ]},
                { module: 'Pesquisa de Mercado', stories: [
                  { story: 'Como usuário, quero ver conteúdo viral entre plataformas com métricas de engajamento e decomposições estruturais para entender o que funciona no meu nicho.', priority: 'P0', status: 'Feito' },
                  { story: 'Como usuário, quero Clonar e Adaptar conteúdo viral para a persona do meu Expert para produzir formatos de conteúdo comprovados com minha voz única.', priority: 'P0', status: 'Feito' },
                  { story: 'Como usuário, quero cards de análise de concorrentes com pontos fortes, fracos e oportunidades de lacunas de conteúdo.', priority: 'P1', status: 'Feito' },
                ]},
                { module: 'Kanban & QA', stories: [
                  { story: 'Como usuário, quero uma verificação automatizada de QA de Marca que valide conteúdo contra o tom de voz do Expert antes da aprovação.', priority: 'P0', status: 'Feito (Mock)' },
                  { story: 'Como usuário, quero que o conteúdo flua pelos estágios Backlog → Pesquisa → Produção → Revisão → Aprovado.', priority: 'P0', status: 'Feito' },
                ]},
                { module: 'SEO & Blog', stories: [
                  { story: 'Como usuário, quero posts de blog gerados por IA otimizados para SEO e AEO para que meu Expert seja citado por motores de busca de IA.', priority: 'P1', status: 'Feito' },
                  { story: 'Como usuário, quero um portal público com hero, bio e artigos para que o Expert tenha uma presença web profissional.', priority: 'P1', status: 'Feito' },
                ]},
              ].map((module) => (
                <div key={module.module} className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-border bg-bg/50 flex items-center gap-2">
                    <Layers size={16} style={{ color: brandColor }} />
                    <h3 className="font-bold">{module.module}</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {module.stories.map((story, i) => (
                      <div key={i} className="p-4 flex items-start gap-4 hover:bg-white/[0.02]">
                        <div className="flex gap-2 shrink-0">
                          <span className={`text-[11px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            story.priority === 'P0' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {story.priority}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed flex-1">{story.story}</p>
                        <span className={`text-[11px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                          story.status === 'Feito' ? 'bg-green-500/10 text-green-400' : 
                          story.status.includes('Mock') || story.status.includes('UI') ? 'bg-blue-500/10 text-blue-400' : 
                          'bg-white/5 text-text-muted'
                        }`}>
                          {story.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'features' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Layers size={12} /> Matriz de Features
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Matriz de Features</h1>
                <p className="text-text-muted">Inventário completo de funcionalidades com status de implementação.</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-text-muted uppercase bg-bg/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Funcionalidade</th>
                      <th className="px-4 py-3 text-left font-medium">Módulo</th>
                      <th className="px-4 py-3 text-center font-medium">UI</th>
                      <th className="px-4 py-3 text-center font-medium">Lógica</th>
                      <th className="px-4 py-3 text-center font-medium">Backend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { feature: 'CRUD de Expert (Criar, Ler, Atualizar)', module: 'Experts', ui: true, logic: true, backend: false },
                      { feature: 'Troca de Contexto de Expert', module: 'Global', ui: true, logic: true, backend: false },
                      { feature: 'Tematização Dinâmica de Marca', module: 'Global', ui: true, logic: true, backend: false },
                      { feature: 'Editor de Carrossel Multi-Slide', module: 'Estúdio', ui: true, logic: true, backend: false },
                      { feature: 'Importação/Exportação CSV', module: 'Estúdio', ui: true, logic: true, backend: false },
                      { feature: 'Assistente de Chat com IA', module: 'Estúdio', ui: true, logic: false, backend: false },
                      { feature: 'Timeline Multi-Clip de Vídeo', module: 'Vídeo', ui: true, logic: true, backend: false },
                      { feature: 'Geração de Avatar com IA', module: 'Avatares', ui: true, logic: false, backend: false },
                      { feature: 'Integração HeyGen/ElevenLabs', module: 'Vídeo', ui: true, logic: false, backend: false },
                      { feature: 'Radar de Conteúdo Viral', module: 'Pesquisa', ui: true, logic: false, backend: false },
                      { feature: 'Motor Clonar e Adaptar', module: 'Pesquisa', ui: true, logic: false, backend: false },
                      { feature: 'Análise de Concorrentes', module: 'Pesquisa', ui: true, logic: false, backend: false },
                      { feature: 'Workflow Kanban', module: 'Kanban', ui: true, logic: true, backend: false },
                      { feature: 'Verificação de QA de Marca por IA', module: 'Kanban', ui: true, logic: false, backend: false },
                      { feature: 'Calendário Editorial', module: 'Calendário', ui: true, logic: true, backend: false },
                      { feature: 'Auto-Fill de Estratégia por IA', module: 'Calendário', ui: true, logic: false, backend: false },
                      { feature: 'Geração de Blog com IA', module: 'Blog', ui: true, logic: false, backend: false },
                      { feature: 'Configuração AEO/SEO', module: 'Blog', ui: true, logic: false, backend: false },
                      { feature: 'Portal Público do Expert', module: 'Blog', ui: true, logic: true, backend: false },
                      { feature: 'Upload da Base de Conhecimento', module: 'Conhecimento', ui: true, logic: false, backend: false },
                      { feature: 'Busca e Filtro de Documentos', module: 'Conhecimento', ui: true, logic: false, backend: false },
                      { feature: 'Gestão de Agentes', module: 'Agentes', ui: true, logic: true, backend: false },
                      { feature: 'Config de System Prompt de Agentes', module: 'Agentes', ui: true, logic: true, backend: false },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-2.5 font-medium text-xs">{row.feature}</td>
                        <td className="px-4 py-2.5 text-xs text-text-muted">{row.module}</td>
                        <td className="px-4 py-2.5 text-center">
                          {row.ui ? <CheckCircle2 size={14} className="text-green-400 mx-auto" /> : <Clock size={14} className="text-text-muted mx-auto" />}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {row.logic ? <CheckCircle2 size={14} className="text-green-400 mx-auto" /> : <Clock size={14} className="text-yellow-400 mx-auto" />}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {row.backend ? <CheckCircle2 size={14} className="text-green-400 mx-auto" /> : <Clock size={14} className="text-text-muted mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>

              <div className="flex gap-6 text-xs text-text-muted">
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Implementado</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-yellow-400" /> Mock / Simulado</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-text-muted" /> Não Iniciado</div>
              </div>
            </div>
          )}

          {activeSection === 'roadmap' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Milestone size={12} /> Roadmap do Produto
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Roadmap de Desenvolvimento</h1>
              </div>

              {[
                { 
                  phase: 'Sprint 1 — Fundação', 
                  timeline: 'Semana 1 (Atual)', 
                  status: 'Em Progresso',
                  color: 'text-green-400',
                  bgColor: 'bg-green-500/10',
                  items: [
                    { name: 'UI completa para todos os 11 módulos core', done: true },
                    { name: 'CRUD de perfis de Expert com configuração completa', done: true },
                    { name: 'Gerenciamento de estado Zustand para experts & agentes', done: true },
                    { name: 'Estúdio de Conteúdo com editor de carrossel', done: true },
                    { name: 'Estúdio de Vídeo com timeline multi-clip', done: true },
                    { name: 'Dados mock para todos os módulos', done: true },
                    { name: 'Páginas de Documentação, Playbook e PRD', done: true },
                  ]
                },
                { 
                  phase: 'Sprint 2 — Inteligência', 
                  timeline: 'Semana 2–3', 
                  status: 'Planejado',
                  color: 'text-yellow-400',
                  bgColor: 'bg-yellow-500/10',
                  items: [
                    { name: 'Integração da API Gemini para chat e geração de conteúdo com IA', done: false },
                    { name: 'Motor real de Clonar e Adaptar com processamento LLM', done: false },
                    { name: 'Verificação real de QA por IA no workflow Kanban', done: false },
                    { name: 'Base de Conhecimento: upload de arquivos para vector store', done: false },
                    { name: 'Setup Supabase: autenticação e banco de dados', done: false },
                  ]
                },
                { 
                  phase: 'Sprint 3 — Produção de Mídia', 
                  timeline: 'Semana 3–4', 
                  status: 'Planejado',
                  color: 'text-yellow-400',
                  bgColor: 'bg-yellow-500/10',
                  items: [
                    { name: 'API HeyGen: geração de vídeo com avatar de IA', done: false },
                    { name: 'API ElevenLabs: integração de clonagem de voz', done: false },
                    { name: 'Exportação de carrossel como imagens (html2canvas)', done: false },
                    { name: 'Geração real de imagens de avatar (Flux/SDXL)', done: false },
                    { name: 'Integração de biblioteca de B-roll', done: false },
                  ]
                },
                { 
                  phase: 'Sprint 4 — Publicação & Escala', 
                  timeline: 'Semana 4–5', 
                  status: 'Planejado',
                  color: 'text-text-muted',
                  bgColor: 'bg-white/5',
                  items: [
                    { name: 'Deploy do portal público (landing pages de Expert)', done: false },
                    { name: 'Publicação de blog com SEO real e schema markup', done: false },
                    { name: 'Integração com APIs de redes sociais (agendamento e publicação)', done: false },
                    { name: 'Integração do calendário com agendamento real', done: false },
                    { name: 'Autenticação de usuários e gestão de equipe', done: false },
                  ]
                },
                { 
                  phase: 'Sprint 5 — Polimento & Lançamento', 
                  timeline: 'Semana 5–6', 
                  status: 'Planejado',
                  color: 'text-text-muted',
                  bgColor: 'bg-white/5',
                  items: [
                    { name: 'Otimização de performance e code splitting', done: false },
                    { name: 'Layout responsivo para mobile', done: false },
                    { name: 'Fluxo de onboarding e setup guiado', done: false },
                    { name: 'Dashboard de analytics', done: false },
                    { name: 'Preparação para lançamento beta', done: false },
                  ]
                },
              ].map((phase) => (
                <div key={phase.phase} className="bg-surface border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold">{phase.phase}</h3>
                      <p className="text-xs text-text-muted">{phase.timeline}</p>
                    </div>
                    <span className={`text-[11px] md:text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded ${phase.bgColor} ${phase.color}`}>
                      {phase.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {phase.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-text-muted">
                        {item.done ? (
                          <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-border shrink-0"></div>
                        )}
                        <span className={item.done ? 'line-through opacity-60' : ''}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'metrics' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <BarChart2 size={12} /> KPIs
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Métricas de Sucesso</h1>
                <p className="text-text-muted">Indicadores-chave de performance para rastrear product-market fit e crescimento.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { category: 'Ativação', metrics: [
                    { name: 'Taxa de Completude de Perfil de Expert', target: '> 80%', desc: '% de usuários que configuram completamente pelo menos 1 Expert (identidade + marca + voz + ICP).' },
                    { name: 'Tempo até Primeiro Conteúdo', target: '< 30 min', desc: 'Tempo do cadastro até publicar a primeira peça de conteúdo.' },
                  ]},
                  { category: 'Engajamento', metrics: [
                    { name: 'Usuários Ativos Diários (DAU)', target: '> 40% do MAU', desc: 'Usuários produzindo conteúdo ativamente ou usando a plataforma diariamente.' },
                    { name: 'Peças de Conteúdo por Expert/Semana', target: '> 10', desc: 'Produção média de conteúdo por perfil de Expert por semana.' },
                  ]},
                  { category: 'Qualidade', metrics: [
                    { name: 'Taxa de Aprovação no QA', target: '> 85%', desc: '% de conteúdo que passa no QA de Marca por IA na primeira tentativa.' },
                    { name: 'Score Médio de SEO', target: '> 85/100', desc: 'Média do score de SEO de posts de blog gerados por IA.' },
                  ]},
                  { category: 'Negócio', metrics: [
                    { name: 'Receita Mensal Recorrente (MRR)', target: 'R$50K no Mês 3', desc: 'Receita total de assinaturas recorrentes.' },
                    { name: 'Retenção Líquida de Receita (NRR)', target: '> 120%', desc: 'Retenção de receita incluindo expansão (upgrades).' },
                  ]},
                ].map((cat) => (
                  <div key={cat.category} className="bg-surface border border-border rounded-2xl p-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: brandColor }}>{cat.category}</h3>
                    <div className="space-y-4">
                      {cat.metrics.map((m) => (
                        <div key={m.name} className="bg-bg border border-border rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-bold">{m.name}</h4>
                            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>{m.target}</span>
                          </div>
                          <p className="text-xs text-text-muted">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'risks' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}>
                  <Shield size={12} /> Avaliação de Riscos
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Riscos & Mitigações</h1>
              </div>

              <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-text-muted uppercase bg-bg/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Risco</th>
                      <th className="px-4 py-3 text-center font-medium">Impacto</th>
                      <th className="px-4 py-3 text-center font-medium">Probabilidade</th>
                      <th className="px-4 py-3 text-left font-medium">Mitigação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { risk: 'IA gera conteúdo genérico apesar do contexto do Expert', impact: 'Alto', likelihood: 'Médio', mitigation: 'Implementar loops iterativos de QA com revisão humana. Refinar prompts por Expert. Usar RAG com docs da Base de Conhecimento.' },
                      { risk: 'Limites de rate / custos das APIs Gemini, HeyGen, ElevenLabs', impact: 'Alto', likelihood: 'Alto', mitigation: 'Implementar cache, batching e quotas de uso por plano. Usar modelo Flash para tarefas simples, Pro para complexas.' },
                      { risk: 'Usuários não completam a configuração do perfil do Expert', impact: 'Alto', likelihood: 'Médio', mitigation: 'Wizard de onboarding guiado com indicadores de progresso. Mostrar score de "prontidão do contexto". Demonstrar valor com Expert demo pré-preenchido.' },
                      { risk: 'Qualidade de exportação do Estúdio não corresponde ao preview', impact: 'Médio', likelihood: 'Médio', mitigation: 'Usar html2canvas com configurações de alto DPI. Oferecer preview antes da exportação. Disponibilizar múltiplos formatos (PNG, PDF).' },
                      { risk: 'Pressão competitiva de ferramentas genéricas de IA (ChatGPT, Canva AI)', impact: 'Médio', likelihood: 'Alto', mitigation: 'Diferenciar no princípio de Bloqueio de Identidade. Ferramentas genéricas não conseguem impor branding específico do Expert. Focar na gestão multi-expert.' },
                      { risk: 'Preocupações de privacidade com dados pessoais do Expert', impact: 'Alto', likelihood: 'Baixo', mitigation: 'Implementar criptografia de dados em repouso/trânsito. Conformidade com LGPD. Permitir exportação/exclusão de dados. Roadmap SOC 2.' },
                      { risk: 'Latência de geração de vídeo (HeyGen) frustra usuários', impact: 'Médio', likelihood: 'Médio', mitigation: 'Geração assíncrona com sistema de notificação. Mostrar tempo estimado. Permitir geração em lote durante a noite.' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-xs font-medium max-w-[200px]">{row.risk}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${row.impact === 'Alto' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {row.impact}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${row.likelihood === 'Alto' ? 'bg-red-500/10 text-red-400' : row.likelihood === 'Médio' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                            {row.likelihood}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-text-muted max-w-[300px]">{row.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
