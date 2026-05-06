import { useState } from 'react';
import { useExpertStore } from '../store/expertStore';
import { useBriefingStore } from '../store/briefingStore';
import {
  ClipboardList, Search, Filter, Clock, AlertCircle, CheckCircle, Circle,
  ChevronDown, ChevronUp, Paperclip, ExternalLink, MessageSquare,
  Plus, X, Trash2, Calendar, ArrowRight
} from 'lucide-react';

const statusConfig = {
  draft: { icon: Circle, color: 'text-text-muted', bg: 'bg-text-muted/10', label: 'Rascunho' },
  ready: { icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Pronto' },
  in_progress: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Em Andamento' },
  review: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-400/10', label: 'Revisão' },
  done: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Concluído' },
};

const priorityConfig = {
  low: { label: 'Baixa', color: 'text-text-muted' },
  medium: { label: 'Média', color: 'text-blue-400' },
  high: { label: 'Alta', color: 'text-orange-400' },
  urgent: { label: 'Urgente', color: 'text-red-400' },
};

export default function Briefing() {
  const { activeExpert } = useExpertStore();
  const { briefings, updateBriefing, deleteBriefing } = useBriefingStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedBriefing, setExpandedBriefing] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const expertBriefings = briefings.filter(b => b.expertId === activeExpert?.id);
  const filteredBriefings = expertBriefings.filter(b => {
    const matchesSearch = b.scriptTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.editorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: string) => {
    updateBriefing(id, { status: status as Briefing['status'] });
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (!activeExpert) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-text-muted">
          <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Selecione um Expert para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-text-main">Briefing do Editor</h1>
          <p className="text-text-muted mt-1">Instruções detalhadas para produção de conteúdo</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Novo Briefing
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar briefings..."
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
            <option value="all">Todos</option>
            <option value="draft">Rascunho</option>
            <option value="ready">Pronto</option>
            <option value="in_progress">Em Andamento</option>
            <option value="review">Revisão</option>
            <option value="done">Concluído</option>
          </select>
        </div>
      </div>

      {filteredBriefings.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList className="w-12 h-12 mx-auto mb-4 text-text-muted opacity-50" />
          <p className="text-text-muted text-lg">Nenhum briefing encontrado</p>
          <p className="text-text-muted/60 text-sm mt-1">Crie um briefing para seu editor</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBriefings.map((briefing) => {
            const status = statusConfig[briefing.status];
            const StatusIcon = status.icon;
            const priority = priorityConfig[briefing.priority];
            const isExpanded = expandedBriefing === briefing.id;
            const overdue = isOverdue(briefing.deadline);

            return (
              <div key={briefing.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                <div
                  className="p-4 md:p-5 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedBriefing(isExpanded ? null : briefing.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-base md:text-lg font-semibold text-text-main truncate">{briefing.scriptTitle}</h3>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                        <span className={`text-xs font-medium ${priority.color}`}>
                          {priority.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-text-muted flex-wrap">
                        <span className="flex items-center gap-1">
                          <ClipboardList className="w-3.5 h-3.5" />
                          {briefing.editorName}
                        </span>
                        <span className="capitalize">{briefing.format}</span>
                        <span>{briefing.platform}</span>
                        {briefing.deadline && (
                          <span className={`flex items-center gap-1 ${overdue ? 'text-red-400' : ''}`}>
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(briefing.deadline)}
                            {overdue && <span className="text-xs">(Atrasado)</span>}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border px-4 md:px-5 pb-4 md:pb-5">
                    <div className="pt-4 space-y-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-text-muted">Status:</span>
                        {(['draft', 'ready', 'in_progress', 'review', 'done'] as const).map(s => {
                          const sConfig = statusConfig[s];
                          const SIcon = sConfig.icon;
                          return (
                            <button
                              key={s}
                              onClick={() => handleStatusChange(briefing.id, s)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                briefing.status === s ? `${sConfig.color} ${sConfig.bg} ring-1 ring-current` : 'text-text-muted hover:text-text-main hover:bg-white/5'
                              }`}
                            >
                              <SIcon className="w-3 h-3" />
                              {sConfig.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-text-main flex items-center gap-2">
                            <ClipboardList className="w-4 h-4 text-primary" />
                            Seções do Conteúdo
                          </h4>
                          {briefing.sections.map((section) => (
                            <div key={section.id} className="p-3 bg-bg rounded-lg border border-border">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-primary">{section.title}</span>
                                {section.required && (
                                  <span className="text-[10px] px-1.5 py-0.5 bg-red-400/10 text-red-400 rounded-full">Obrigatório</span>
                                )}
                              </div>
                              <p className="text-sm text-text-muted">{section.content}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-primary" />
                              Diretrizes da Marca
                            </h4>
                            <div className="p-3 bg-bg rounded-lg border border-border">
                              <p className="text-sm text-text-muted whitespace-pre-wrap">{briefing.brandGuidelines}</p>
                            </div>
                          </div>

                          {briefing.assets.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
                                <Paperclip className="w-4 h-4 text-primary" />
                                Assets ({briefing.assets.length})
                              </h4>
                              <div className="space-y-2">
                                {briefing.assets.map((asset) => (
                                  <div key={asset.id} className="flex items-center gap-3 p-2 bg-bg rounded-lg border border-border">
                                    <Paperclip className="w-4 h-4 text-text-muted" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-text-main truncate">{asset.name}</p>
                                      {asset.description && <p className="text-xs text-text-muted">{asset.description}</p>}
                                    </div>
                                    <span className="text-xs text-text-muted uppercase">{asset.type}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {briefing.referenceLinks.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
                                <ExternalLink className="w-4 h-4 text-primary" />
                                Referências
                              </h4>
                              <div className="space-y-1">
                                {briefing.referenceLinks.map((link, i) => (
                                  <a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span className="truncate">{link}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {briefing.notes && (
                            <div>
                              <h4 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                Observações
                              </h4>
                              <div className="p-3 bg-bg rounded-lg border border-border">
                                <p className="text-sm text-text-muted">{briefing.notes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => deleteBriefing(briefing.id)}
                          className="flex items-center gap-2 px-4 py-2.5 border border-red-400/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-400/10 transition-colors min-h-[44px]"
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
