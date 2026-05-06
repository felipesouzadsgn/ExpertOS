import { useState } from 'react';
import { useExpertStore } from '../store/expertStore';
import { useTranscriptionStore } from '../store/transcriptionStore';
import {
  Mic, Upload, Search, Play, Clock, Scissors, Copy, CheckCircle,
  Sparkles, FileText, Youtube, Podcast, Video, ChevronDown, ChevronUp,
  ArrowRight, Hash, X, BarChart3
} from 'lucide-react';

const statusConfig = {
  uploading: { label: 'Enviando...', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  processing: { label: 'Processando...', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  transcribing: { label: 'Transcrevendo...', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  done: { label: 'Concluído', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  error: { label: 'Erro', color: 'text-red-400', bg: 'bg-red-400/10' },
};

const sourceIcons = {
  upload: Upload,
  youtube: Youtube,
  podcast: Podcast,
  live: Video,
};

const cutTypeConfig = {
  hook: { label: 'Hook', color: 'text-pink-400', bg: 'bg-pink-400/10' },
  viral_moment: { label: 'Momento Viral', color: 'text-red-400', bg: 'bg-red-400/10' },
  insight: { label: 'Insight', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  quote: { label: 'Citação', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  cta: { label: 'CTA', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatTimestamp(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Transcricao() {
  const { activeExpert } = useExpertStore();
  const { transcriptions, addTranscription, updateTranscription, deleteTranscription } = useTranscriptionStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTranscription, setExpandedTranscription] = useState<string | null>(null);
  const [expandedCut, setExpandedCut] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState('');

  const expertTranscriptions = transcriptions.filter(t => t.expertId === activeExpert?.id);
  const filteredTranscriptions = expertTranscriptions.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl.trim()) return;

    const newTranscription = {
      id: `trans-${Date.now()}`,
      expertId: activeExpert!.id,
      title: 'Nova Transcrição',
      sourceUrl: uploadUrl,
      sourceType: uploadUrl.includes('youtube') || uploadUrl.includes('youtu.be') ? 'youtube' as const : 'upload' as const,
      status: 'uploading' as const,
      progress: 0,
      language: 'pt-BR',
      duration: 0,
      segments: [],
      suggestedCuts: [],
      createdAt: new Date().toISOString(),
    };

    addTranscription(newTranscription);
    setShowUploadModal(false);
    setUploadUrl('');

    // Simulate processing
    setTimeout(() => {
      updateTranscription(newTranscription.id, { status: 'processing', progress: 30 });
      setTimeout(() => {
        updateTranscription(newTranscription.id, { status: 'transcribing', progress: 60 });
        setTimeout(() => {
          updateTranscription(newTranscription.id, {
            status: 'done',
            progress: 100,
            title: `Transcrição: ${uploadUrl.includes('youtube') ? 'YouTube' : 'Upload'} - ${new Date().toLocaleDateString()}`,
            duration: 1847,
            segments: [
              { id: 's1', start: 0, end: 45, text: 'Olá a todos! Hoje vamos falar sobre um tema muito importante para o crescimento do seu negócio.', speaker: activeExpert?.name },
              { id: 's2', start: 45, end: 120, text: 'Muitas pessoas cometem o erro de focar apenas em aquisição, mas esquecem da retenção.', speaker: activeExpert?.name },
              { id: 's3', start: 120, end: 210, text: 'A verdade é que reter um cliente custa 5x menos do que adquirir um novo.', speaker: activeExpert?.name },
            ],
            suggestedCuts: [
              {
                id: 'c1',
                start: 45,
                end: 120,
                type: 'hook' as const,
                title: 'O erro mais comum em negócios',
                description: 'Momento impactante que desafia a crença comum sobre crescimento.',
                engagementScore: 91,
                platform: 'Instagram Reels',
                duration: 75,
                transcript: 'Muitas pessoas cometem o erro de focar apenas em aquisição, mas esquecem da retenção.',
              },
              {
                id: 'c2',
                start: 120,
                end: 210,
                type: 'insight' as const,
                title: 'Custo de retenção vs aquisição',
                description: 'Dado impressionante sobre custos de retenção. Altamente compartilhável.',
                engagementScore: 88,
                platform: 'LinkedIn / TikTok',
                duration: 90,
                transcript: 'A verdade é que reter um cliente custa 5x menos do que adquirir um novo.',
              },
            ],
            summary: 'Discussão sobre a importância da retenção de clientes e como ela é mais eficiente que aquisição.',
            keyTopics: ['retenção', 'aquisição', 'custo', 'crescimento'],
          });
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!activeExpert) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-text-muted">
          <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Selecione um Expert para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-text-main">Transcrição + Cortes</h1>
          <p className="text-text-muted mt-1">Transcreva vídeos e receba sugestões de cortes virais</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm min-h-[44px]"
        >
          <Upload className="w-4 h-4" />
          Novo Vídeo
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Buscar transcrições..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
        />
      </div>

      {filteredTranscriptions.length === 0 ? (
        <div className="text-center py-16">
          <Mic className="w-12 h-12 mx-auto mb-4 text-text-muted opacity-50" />
          <p className="text-text-muted text-lg">Nenhuma transcrição encontrada</p>
          <p className="text-text-muted/60 text-sm mt-1">Envie um vídeo ou link do YouTube para começar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTranscriptions.map((trans) => {
            const status = statusConfig[trans.status];
            const SourceIcon = sourceIcons[trans.sourceType];
            const isExpanded = expandedTranscription === trans.id;

            return (
              <div key={trans.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                <div
                  className="p-4 md:p-5 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedTranscription(isExpanded ? null : trans.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-base md:text-lg font-semibold text-text-main truncate">{trans.title}</h3>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                          {trans.status === 'uploading' || trans.status === 'processing' || trans.status === 'transcribing' ? (
                            <Sparkles className="w-3 h-3 animate-spin" />
                          ) : (
                            <SourceIcon className="w-3 h-3" />
                          )}
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-text-muted flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDuration(trans.duration)}
                        </span>
                        <span className="capitalize">{trans.sourceType === 'upload' ? 'Upload' : trans.sourceType}</span>
                        <span>{trans.language}</span>
                        {trans.segments.length > 0 && (
                          <span>{trans.segments.length} segmentos</span>
                        )}
                        {trans.suggestedCuts.length > 0 && (
                          <span className="flex items-center gap-1 text-primary">
                            <Scissors className="w-3.5 h-3.5" />
                            {trans.suggestedCuts.length} cortes
                          </span>
                        )}
                      </div>

                      {(trans.status === 'uploading' || trans.status === 'processing' || trans.status === 'transcribing') && (
                        <div className="mt-3">
                          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${trans.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-text-muted mt-1">{trans.progress}% concluído</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteTranscription(trans.id); }}
                        className="p-2 text-text-muted hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                    </div>
                  </div>
                </div>

                {isExpanded && trans.status === 'done' && (
                  <div className="border-t border-border px-4 md:px-5 pb-4 md:pb-5">
                    {trans.summary && (
                      <div className="pt-4 mb-4">
                        <h4 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          Resumo
                        </h4>
                        <p className="text-sm text-text-muted bg-bg rounded-lg border border-border p-3">{trans.summary}</p>
                      </div>
                    )}

                    {trans.keyTopics && trans.keyTopics.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-primary" />
                          Tópicos Principais
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {trans.keyTopics.map((topic, i) => (
                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
                        <Mic className="w-4 h-4 text-primary" />
                        Transcrição Completa
                      </h4>
                      <div className="bg-bg rounded-lg border border-border overflow-hidden max-h-80 overflow-y-auto custom-scrollbar">
                        {trans.segments.map((segment) => (
                          <div key={segment.id} className="flex items-start gap-3 p-3 border-b border-border last:border-0 hover:bg-white/5 transition-colors">
                            <span className="shrink-0 text-xs text-text-muted font-mono mt-0.5">
                              {formatTimestamp(segment.start)}
                            </span>
                            <div className="flex-1">
                              {segment.speaker && (
                                <span className="text-xs font-medium text-primary">{segment.speaker}</span>
                              )}
                              <p className="text-sm text-text-main">{segment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {trans.suggestedCuts.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                          <Scissors className="w-4 h-4 text-primary" />
                          Cortes Sugeridos
                        </h4>
                        <div className="space-y-3">
                          {trans.suggestedCuts.map((cut) => {
                            const cutType = cutTypeConfig[cut.type];
                            const isCutExpanded = expandedCut === cut.id;

                            return (
                              <div key={cut.id} className="bg-bg rounded-lg border border-border overflow-hidden">
                                <button
                                  onClick={() => setExpandedCut(isCutExpanded ? null : cut.id)}
                                  className="w-full flex items-center justify-between p-3 md:p-4 text-left hover:bg-white/5 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${cutType.color} ${cutType.bg}`}>
                                      {cutType.label}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-text-main">{cut.title}</p>
                                      <p className="text-xs text-text-muted mt-0.5">{cut.platform} · {formatDuration(cut.duration)}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                      <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-sm font-medium text-emerald-400">{cut.engagementScore}</span>
                                    </div>
                                    {isCutExpanded ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                                  </div>
                                </button>

                                {isCutExpanded && (
                                  <div className="border-t border-border px-3 md:px-4 pb-3 md:pb-4">
                                    <div className="pt-3 space-y-3">
                                      <p className="text-sm text-text-muted">{cut.description}</p>
                                      <div className="flex items-center gap-2 text-sm text-text-muted">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{formatTimestamp(cut.start)} — {formatTimestamp(cut.end)}</span>
                                      </div>
                                      <div className="p-3 bg-surface rounded-lg border border-border">
                                        <p className="text-sm text-text-main italic">"{cut.transcript}"</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => handleCopy(cut.transcript, `cut-${cut.id}`)}
                                          className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors"
                                        >
                                          {copiedId === `cut-${cut.id}` ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                          {copiedId === `cut-${cut.id}` ? 'Copiado!' : 'Copiar Transcrição'}
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 border border-border text-text-main rounded-lg text-xs font-medium hover:bg-white/5 transition-colors">
                                          <Play className="w-3.5 h-3.5" />
                                          Preview
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-text-main">Nova Transcrição</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-4 md:p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">URL do Vídeo</label>
                <input
                  type="url"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... ou link do vídeo"
                  required
                  className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
                />
                <p className="text-xs text-text-muted mt-1.5">Suporta YouTube, podcasts e upload direto</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-text-muted" />
                <p className="text-sm text-text-muted">Ou arraste um arquivo de vídeo aqui</p>
                <p className="text-xs text-text-muted/60 mt-1">MP4, MOV, MP3, WAV (máx. 2GB)</p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2.5 border border-border text-text-main rounded-lg font-medium hover:bg-white/5 transition-colors min-h-[44px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
                >
                  Iniciar Transcrição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
