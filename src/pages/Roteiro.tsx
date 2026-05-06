import { useState } from 'react';
import { useExpertStore } from '../store/expertStore';
import { useScriptStore, type Script, type ScriptVariant, type ScriptSection } from '../store/scriptStore';
import {
  FileText, Plus, Search, Clock, Play, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, Copy, Sparkles, Trash2, Filter,
  Instagram, Linkedin, Twitter, Youtube, ArrowRight, X
} from 'lucide-react';

const platforms = [
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'twitter', label: 'Twitter/X', icon: Twitter },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
];

const formats = ['reels', 'carousel', 'story', 'long-form', 'thread'] as const;

const hookTypes = [
  { id: 'curiosity', label: 'Curiosidade', desc: 'Provoca interesse com algo inesperado' },
  { id: 'controversy', label: 'Controvérsia', desc: 'Desafia uma crença popular' },
  { id: 'transformation', label: 'Transformação', desc: 'Mostra antes/depois ou evolução' },
  { id: 'authority', label: 'Autoridade', desc: 'Baseado em dados e experiência' },
  { id: 'story', label: 'Storytelling', desc: 'Começa com uma história pessoal' },
];

export default function Roteiro() {
  const { activeExpert } = useExpertStore();
  const { scripts, addScript, updateScript, deleteScript } = useScriptStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const expertScripts = scripts.filter(s => s.expertId === activeExpert?.id);
  const filteredScripts = expertScripts.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateScript = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newScript: Script = {
      id: `script-${Date.now()}`,
      expertId: activeExpert!.id,
      title: formData.get('title') as string,
      topic: formData.get('topic') as string,
      format: formData.get('format') as Script['format'],
      platform: formData.get('platform') as string,
      duration: parseInt(formData.get('duration') as string) || 60,
      status: 'draft',
      variants: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addScript(newScript);
    setShowCreateModal(false);
  };

  const handleGenerateVariants = (scriptId: string) => {
    updateScript(scriptId, { status: 'generating' });
    setTimeout(() => {
      const script = scripts.find(s => s.id === scriptId);
      if (!script) return;
      const baseSections: ScriptSection[] = [
        { id: `s-${Date.now()}-1`, timestamp: '0:00-0:05', type: 'hook', content: 'Hook gerado automaticamente com base no perfil do expert.' },
        { id: `s-${Date.now()}-2`, timestamp: '0:05-0:30', type: 'storytelling', content: 'Sequência de storytelling personalizada para o nicho do expert.' },
        { id: `s-${Date.now()}-3`, timestamp: '0:30-0:50', type: 'educational', content: 'Conteúdo educacional estruturado para máxima retenção.' },
        { id: `s-${Date.now()}-4`, timestamp: '0:50-0:60', type: 'cta', content: 'Call-to-action otimizado para conversão na plataforma.' },
      ];
      const variants: ScriptVariant[] = hookTypes.slice(0, 3).map((ht, i) => ({
        id: `v-${Date.now()}-${i}`,
        hookType: ht.id as ScriptVariant['hookType'],
        hook: `${ht.label}: Hook ${i + 1} gerado para "${script.topic}"`,
        sections: baseSections.map(s => ({
          ...s,
          id: `${s.id}-${i}`,
          content: s.content.replace('automaticamente', `via ${ht.label}`),
        })),
        duration: script.duration,
        platform: script.platform,
      }));
      updateScript(scriptId, { status: 'review', variants });
    }, 2000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const statusConfig = {
    draft: { icon: FileText, color: 'text-text-muted', bg: 'bg-surface', label: 'Rascunho' },
    generating: { icon: Sparkles, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Gerando...' },
    review: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-400/10', label: 'Revisão' },
    approved: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Aprovado' },
    published: { icon: Play, color: 'text-primary', bg: 'bg-primary/10', label: 'Publicado' },
  };

  if (!activeExpert) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-text-muted">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Selecione um Expert para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-text-main">Gerador de Roteiro</h1>
          <p className="text-text-muted mt-1">Crie roteiros com 3 hooks variantes para qualquer formato</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Novo Roteiro
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar roteiros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-muted" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-surface border border-border rounded-lg text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
          >
            <option value="all">Todos os status</option>
            <option value="draft">Rascunho</option>
            <option value="generating">Gerando</option>
            <option value="review">Revisão</option>
            <option value="approved">Aprovado</option>
            <option value="published">Publicado</option>
          </select>
        </div>
      </div>

      {filteredScripts.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 mx-auto mb-4 text-text-muted opacity-50" />
          <p className="text-text-muted text-lg">Nenhum roteiro encontrado</p>
          <p className="text-text-muted/60 text-sm mt-1">Crie seu primeiro roteiro para começar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredScripts.map((script) => {
            const status = statusConfig[script.status];
            const StatusIcon = status.icon;
            const isExpanded = expandedScript === script.id;

            return (
              <div key={script.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                <div
                  className="p-4 md:p-5 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedScript(isExpanded ? null : script.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-base md:text-lg font-semibold text-text-main truncate">{script.title}</h3>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-text-muted flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {script.duration}s
                        </span>
                        <span className="capitalize">{script.format}</span>
                        <span>{script.platform}</span>
                        <span>{script.variants.length} variante{script.variants.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {script.status === 'draft' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleGenerateVariants(script.id); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors min-h-[36px]"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Gerar
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteScript(script.id); }}
                        className="p-2 text-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border px-4 md:px-5 pb-4 md:pb-5">
                    <div className="pt-4">
                      <p className="text-sm text-text-muted mb-4">
                        <span className="font-medium text-text-main">Tópico:</span> {script.topic}
                      </p>

                      {script.variants.length === 0 ? (
                        <div className="text-center py-8 bg-bg rounded-lg border border-dashed border-border">
                          <Sparkles className="w-8 h-8 mx-auto mb-3 text-text-muted opacity-50" />
                          <p className="text-text-muted text-sm">Nenhuma variante gerada ainda</p>
                          <button
                            onClick={() => handleGenerateVariants(script.id)}
                            className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            Gerar 3 Variantes
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-text-main mb-2">Variantes de Hook:</p>
                          {script.variants.map((variant, vIdx) => {
                            const isVarExpanded = expandedVariant === variant.id;
                            return (
                              <div key={variant.id} className="bg-bg rounded-lg border border-border overflow-hidden">
                                <button
                                  onClick={() => setExpandedVariant(isVarExpanded ? null : variant.id)}
                                  className="w-full flex items-center justify-between p-3 md:p-4 text-left hover:bg-white/5 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                      {vIdx + 1}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-text-main">
                                        {hookTypes.find(h => h.id === variant.hookType)?.label || variant.hookType}
                                      </p>
                                      <p className="text-xs text-text-muted mt-0.5 truncate max-w-[200px] md:max-w-md">
                                        {variant.hook}
                                      </p>
                                    </div>
                                  </div>
                                  {isVarExpanded ? <ChevronUp className="w-4 h-4 text-text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />}
                                </button>

                                {isVarExpanded && (
                                  <div className="border-t border-border px-3 md:px-4 pb-3 md:pb-4">
                                    <div className="pt-3 space-y-2">
                                      <div className="flex items-start gap-3 p-3 bg-surface rounded-lg">
                                        <p className="text-sm text-text-main flex-1">{variant.hook}</p>
                                        <button
                                          onClick={() => copyToClipboard(variant.hook, `hook-${variant.id}`)}
                                          className="shrink-0 p-1.5 text-text-muted hover:text-primary transition-colors"
                                        >
                                          {copiedId === `hook-${variant.id}` ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                      </div>
                                      {variant.sections.map((section) => (
                                        <div key={section.id} className="flex items-start gap-3 p-3 bg-surface rounded-lg">
                                          <span className="shrink-0 text-xs text-text-muted font-mono mt-0.5">{section.timestamp}</span>
                                          <div className="flex-1 min-w-0">
                                            <span className="text-xs font-medium text-primary uppercase tracking-wider">{section.type}</span>
                                            <p className="text-sm text-text-main mt-1">{section.content}</p>
                                          </div>
                                          <button
                                            onClick={() => copyToClipboard(`${section.timestamp} — ${section.content}`, section.id)}
                                            className="shrink-0 p-1.5 text-text-muted hover:text-primary transition-colors"
                                          >
                                            {copiedId === section.id ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-text-main">Novo Roteiro</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <form onSubmit={handleCreateScript} className="p-4 md:p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Título</label>
                <input
                  name="title"
                  required
                  placeholder="Ex: 5 Erros que Destroem seu Crescimento"
                  className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Tópico / Tema</label>
                <input
                  name="topic"
                  required
                  placeholder="Ex: Estratégias de Growth para SaaS"
                  className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Formato</label>
                  <select
                    name="format"
                    required
                    className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm min-h-[44px]"
                  >
                    {formats.map(f => <option key={f} value={f}>{f === 'reels' ? 'Reels' : f === 'long-form' ? 'Long-form' : f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Plataforma</label>
                  <select
                    name="platform"
                    required
                    className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm min-h-[44px]"
                  >
                    {platforms.map(p => <option key={p.id} value={p.label}>{p.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Duração (segundos)</label>
                <input
                  name="duration"
                  type="number"
                  min={15}
                  max={600}
                  defaultValue={60}
                  className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
                />
              </div>
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 border border-border text-text-main rounded-lg font-medium hover:bg-white/5 transition-colors min-h-[44px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
                >
                  Criar Roteiro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
