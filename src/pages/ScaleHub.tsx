import React, { useState } from 'react';
import { useExpertStore } from '@/store/expertStore';
import { 
  TrendingUp, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Music, 
  Video, 
  Play, 
  Clock, 
  Users, 
  BarChart3, 
  Sparkles,
  Bot
} from 'lucide-react';

export function ScaleHub() {
  const { activeExpert } = useExpertStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'automation'>('automation');

  if (!activeExpert) {
    return <div className="p-8 text-text-main">Please select an expert first.</div>;
  }

  const platforms = [
    {
      name: 'Instagram (Principal)',
      icon: <Instagram size={20} className="text-pink-500" />,
      frequency: '1–2 Reels/dia | 2–3 carrosséis/semana | 8–15 stories/dia',
      hours: '12:00 / 18:00 / 21:00',
      format: 'Reels 20–45s | Carrossel 6–10 slides',
      copy: 'Gancho + Valor + CTA + Palavras-chave',
      views: '1.2M',
      growth: '+15%'
    },
    {
      name: 'Instagram (10 Páginas de Cortes)',
      icon: <Instagram size={20} className="text-pink-400" />,
      frequency: '3–5 posts/dia (por página)',
      hours: '12:00 / 18:00 / 21:00 (Posts: 10/14/18/21h)',
      format: 'Cortes 20–45s',
      copy: 'Frases diretas + Impacto + CTA',
      views: '3.4M',
      growth: '+42%'
    },
    {
      name: 'TikTok',
      icon: <Music size={20} className="text-black dark:text-white" />,
      frequency: '2–4/dia',
      hours: '12:00 / 18:00 / 21:00',
      format: 'Espontâneo 20–45s',
      copy: 'Simples + Palavras-chave',
      views: '890K',
      growth: '+28%'
    },
    {
      name: 'YouTube (Vídeo Longo)',
      icon: <Youtube size={20} className="text-red-500" />,
      frequency: '2–3/semana',
      hours: '19:00 / 20:00 / 21:00',
      format: '10–25min estruturado',
      copy: 'SEO + Resumo + CTA',
      views: '450K',
      growth: '+12%'
    },
    {
      name: 'YouTube Shorts',
      icon: <Video size={20} className="text-red-400" />,
      frequency: '2–4/dia',
      hours: '12:00 / 18:00 / 21:00',
      format: 'Cortes 20–45s',
      copy: 'Direto + Simples',
      views: '2.1M',
      growth: '+35%'
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter size={20} className="text-blue-400" />,
      frequency: '2–5/dia',
      hours: '08:00 / 12:00 / 15:00 / 18:00 / 21:00',
      format: 'Threads e Insights',
      copy: 'Direto + Opinião',
      views: '120K',
      growth: '+8%'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} className="text-blue-700" />,
      frequency: '3–5/semana',
      hours: '08:00 / 09:00 / 10:00',
      format: 'Texto + Valor (Artigos e Posts)',
      copy: 'Storytelling',
      views: '85K',
      growth: '+22%'
    },
    {
      name: 'Pinterest',
      icon: <Play size={20} className="text-red-600" />,
      frequency: '5–10/dia',
      hours: '08:00 / 12:00 / 18:00 / 21:00',
      format: 'Imagem + Infográfico',
      copy: 'SEO + Palavras-chave',
      views: '540K',
      growth: '+19%'
    },
    {
      name: 'Spotify',
      icon: <Music size={20} className="text-green-500" />,
      frequency: '1/semana',
      hours: '07:00',
      format: 'Áudio / Podcast 15–60min',
      copy: 'Resumo + CTA',
      views: '45K',
      growth: '+5%'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-bg overflow-hidden text-text-main">
      <div className="p-8 border-b border-border bg-surface shrink-0">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
              <TrendingUp className="text-primary" size={28} /> Scale Hub
            </h1>
            <p className="text-text-muted max-w-2xl">
              Sistema de Crescimento Previsível para {activeExpert.name}. Estrutura multicanal organizada,
              com IA executando as estratégias para reduzir trabalho manual e manter consistência rumo ao topo.
            </p>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-bg border border-border p-4 rounded-xl">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Visualizações Mês</div>
              <div className="text-2xl font-bold text-green-400">8.8M</div>
            </div>
            <div className="bg-bg border border-border p-4 rounded-xl">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Crescimento Global</div>
              <div className="text-2xl font-bold text-primary">+24.5%</div>
            </div>
          </div>
        </div>

        <div className="flex gap-1 border-b border-border">
          <button
            onClick={() => setActiveTab('automation')}
            className={`px-6 py-3 font-semibold text-sm relative transition-colors ${
              activeTab === 'automation' ? 'text-primary' : 'text-text-muted hover:text-text-main'
            }`}
          >
            Automação Estratégica & IAs
            {activeTab === 'automation' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold text-sm relative transition-colors ${
              activeTab === 'overview' ? 'text-primary' : 'text-text-muted hover:text-text-main'
            }`}
          >
            Visão Geral de Tráfego Orgânico
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {activeTab === 'automation' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif">Estrutura Multicanal & Prompts de IA</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                <Bot size={16} /> Executar Ciclo Completo (IA)
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform, idx) => (
                <div key={idx} className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      {platform.icon}
                      {platform.name}
                    </h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-text-muted mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Frequência e Horários</div>
                        <div className="text-xs text-text-main font-medium">{platform.frequency}</div>
                        <div className="text-[10px] text-text-muted">{platform.hours}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Video size={14} className="text-text-muted mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Formato</div>
                        <div className="text-xs text-text-main font-medium">{platform.format}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <BarChart3 size={14} className="text-text-muted mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Atenção & Copy</div>
                        <div className="text-xs text-text-main font-medium">{platform.copy}</div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-primary/20 transition-colors">
                    <Sparkles size={14} /> Rodar Agente IA
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-xl font-bold font-serif mb-6">Performance por Canal em Tempo Real</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Fake Traffic Chart Area */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="font-bold text-sm mb-6 uppercase tracking-wider text-text-muted">Origem de Audiência (Mês 1)</h3>
                <div className="space-y-4">
                  {platforms.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-32 text-xs font-medium flex items-center gap-2 truncate">
                        {p.icon} {p.name.split(' (')[0]}
                      </div>
                      <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.max(10, Math.random() * 100)}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-right text-xs font-bold">{p.views}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Action Panel */}
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-text-muted">Status do Sistema</h3>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between bg-bg p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-sm font-semibold">Geração de Vídeo / HeyGen</span>
                        </div>
                        <span className="text-xs text-text-muted">Ativo (API Conectada)</span>
                     </div>
                     <div className="flex items-center justify-between bg-bg p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-sm font-semibold">Agentes Copywriters</span>
                        </div>
                        <span className="text-xs text-text-muted">Ativo (27 prompts pendentes)</span>
                     </div>
                     <div className="flex items-center justify-between bg-bg p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-sm font-semibold">Postagem Automática / Webhooks</span>
                        </div>
                        <span className="text-xs text-text-muted">Ativo</span>
                     </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <TrendingUp size={18} /> Resumo Estratégico
                  </h3>
                  <p className="text-sm text-text-main leading-relaxed mb-4">
                    As maiores alavancas deste mês estão sendo <strong>Instagram (Cortes)</strong> e <strong>YouTube Shorts</strong>. O tráfego orgânico gerado pelos vídeos curtos de 20-45s está tracionando seguidores para o YouTube longo (Crescimento de +12%). A estratégia de X (Twitter) com Threads está funcionando para nutrir o público mais técnico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
