import React from 'react';
import { useExpertStore } from '@/store/expertStore';
import { 
  Compass, 
  TrendingUp, 
  Bot, 
  PenTool, 
  LayoutDashboard, 
  Workflow, 
  ChevronRight,
  Target,
  Zap,
  ShieldCheck
} from 'lucide-react';

export function Playbook() {
  const { activeExpert } = useExpertStore();
  const brandColor = activeExpert?.brandColor || '#6366f1';

  return (
    <div className="h-full overflow-y-auto bg-bg text-text-main p-8 custom-scrollbar">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-border p-12">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 pointer-events-none">
            <Compass size={300} style={{ color: brandColor }} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest mb-6" style={{ color: brandColor }}>
              <Compass size={14} /> Official Documentation
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Expert OS Playbook</h1>
            <p className="text-text-muted text-lg leading-relaxed">
              O manual definitivo de operação do ecossistema. Descubra como cada módulo do {activeExpert?.name ? <span className="text-white font-semibold">{activeExpert.name} OS</span> : 'Expert OS'} interage para gerar crescimento orgânico, escala previsível e automação de ponta a ponta.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4" style={{ color: brandColor }}>
              <Target size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Centralização</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              O expert deixa de ser o gargalo da operação. Dados, pesquisas corporativas e manuais de marca (Tone of Voice) estão centralizados no Knowledge Base.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4" style={{ color: brandColor }}>
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Automação IA</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Multiplicadores de esforço através da rede de agentes especializados e criação de clones visuais (Avatars) para gerar conteúdos ilimitados com velocidade.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4" style={{ color: brandColor }}>
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Previsibilidade</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              O módulo Scale Hub e os Analytics do Dashboard criam uma máquina orgânica escalável com monitoramento exato do que converte e engaja.
            </p>
          </div>
        </div>

        {/* Deep Dive Modules */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 text-white flex items-center gap-3">
            <Workflow style={{ color: brandColor }} />
            Arquitetura dos Módulos
          </h2>
          
          <div className="space-y-6">
            
            {/* Scale Hub */}
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 text-green-500 border border-green-500/30">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Scale Hub</h3>
                <p className="text-sm text-text-muted">A torre de controle de tração. O cérebro do crescimento orgânico da empresa.</p>
              </div>
              <div className="md:w-2/3 space-y-4">
                <p className="text-sm text-text-muted leading-relaxed">
                  O <strong>Scale Hub</strong> é o sistema que organiza tudo do expert para gerar <strong>crescimento previsível</strong>. Ele permite enxergar em tempo real as visualizações de cada pilar de engajamento corporativo e orgânico, garantindo a escala do que já funciona e matando o que drena recursos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-text-muted"><ChevronRight size={14} style={{ color: brandColor }} /> Trackeamento de funil orgânico e tráfego.</li>
                  <li className="flex items-center gap-2 text-sm text-text-muted"><ChevronRight size={14} style={{ color: brandColor }} /> Redução do trabalho manual da equipe de growth.</li>
                </ul>
              </div>
            </div>

            {/* AI Agents & Avatars */}
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-br from-purple-500/20 to-fuchsia-600/20 text-purple-400 border border-purple-500/30">
                  <Bot size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Engines de IA</h3>
                <p className="text-sm text-text-muted">Multiplicação de inteligência e capacidade através de Agents e Avatars.</p>
              </div>
              <div className="md:w-2/3 space-y-4">
                <p className="text-sm text-text-muted leading-relaxed">
                  Os <strong>AI Agents</strong> funcionam como colaboradores que atuam em background lendo pesquisas e automatizando estratégias. A área de <strong>AI Avatars</strong> viabiliza que seu expert tenha sua imagem e fala replicadas de maneira realista para gerar treinamentos e comunicados B2B ou B2C instantâneos.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-bg border border-border/50 rounded-lg p-3">
                    <span className="text-xs font-bold text-white uppercase block mb-1">Knowledge Base</span>
                    <span className="text-xs text-text-muted">A fonte de verdade (memória) de onde os agentes extraem conhecimento para agir.</span>
                  </div>
                  <div className="bg-bg border border-border/50 rounded-lg p-3">
                    <span className="text-xs font-bold text-white uppercase block mb-1">Market Research</span>
                    <span className="text-xs text-text-muted">Analisador interativo da web para embasar os dados dos agentes ao mercado atual.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Studios */}
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 text-blue-400 border border-blue-500/30">
                  <PenTool size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Content & Video Studio</h3>
                <p className="text-sm text-text-muted">A linha de montagem e estúdio visual de alta performance para a operação.</p>
              </div>
              <div className="md:w-2/3 space-y-4">
                <p className="text-sm text-text-muted leading-relaxed">
                  Sem gargalo na produção gráfica ou de edição. O <strong>Content Studio (Carrosséis)</strong> permite o design rápido de mídias alimentadas por CSV, operando numa tela fluida aberta (Canvas Mode). E o <strong>Video Studio</strong> centraliza cortes pontuais de masterclasses, legendagem e transições rápidas na nuvem.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-text-muted"><ChevronRight size={14} style={{ color: brandColor }} /> Operação Drag & Drop fluida para peças em lote.</li>
                  <li className="flex items-center gap-2 text-sm text-text-muted"><ChevronRight size={14} style={{ color: brandColor }} /> Renderização em nuvem e exportação nativa em MP4.</li>
                </ul>
              </div>
            </div>

            {/* Operacional */}
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 text-amber-500 border border-amber-500/30">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Flow & Operação</h3>
                <p className="text-sm text-text-muted">Como manter o time e a máquina nos trilhos.</p>
              </div>
              <div className="md:w-2/3 space-y-4">
                <p className="text-sm text-text-muted leading-relaxed">
                  Usando o <strong>Kanban Flow</strong> aliado ao <strong>Editorial Calendar</strong>, os gestores do expert traçam os checkpoints exatos. A equipe inteira entende de onde as demandas vêm (Research), quem os processa (AI Agents) e para onde vão (Studios e Dashboard).
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
