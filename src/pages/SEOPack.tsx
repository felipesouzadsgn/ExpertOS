import { useState } from 'react';
import { useExpertStore } from '../store/expertStore';
import { useSEOStore, type SEOPackItem } from '../store/seoStore';
import {
  Search, Copy, CheckCircle, Tag, Hash, FileText, Image, Code, HelpCircle,
  Sparkles, Filter, Globe, AlertTriangle, CheckSquare, X
} from 'lucide-react';

const itemTypeConfig: Record<string, { icon: typeof FileText; label: string; color: string }> = {
  title: { icon: FileText, label: 'Título', color: 'text-blue-400' },
  description: { icon: FileText, label: 'Descrição', color: 'text-purple-400' },
  hashtag: { icon: Hash, label: 'Hashtags', color: 'text-pink-400' },
  keyword: { icon: Tag, label: 'Keywords', color: 'text-emerald-400' },
  caption: { icon: FileText, label: 'Legenda', color: 'text-amber-400' },
  alt_text: { icon: Image, label: 'Alt Text', color: 'text-cyan-400' },
  schema_markup: { icon: Code, label: 'Schema Markup', color: 'text-orange-400' },
  faq: { icon: HelpCircle, label: 'FAQ', color: 'text-rose-400' },
};

const platforms = ['Todas', 'Instagram', 'LinkedIn', 'Twitter/X', 'YouTube', 'TikTok', 'Blog'];

export default function SEOPack() {
  const { activeExpert } = useExpertStore();
  const { seoPacks, updatePack } = useSEOStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('Todas');
  const [expandedPack, setExpandedPack] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const expertPacks = seoPacks.filter(p => p.expertId === activeExpert?.id);
  const filteredPacks = expertPacks.filter(p => {
    const matchesSearch = p.scriptTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'Todas' || p.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerate = (packId: string) => {
    setGeneratingId(packId);
    setTimeout(() => {
      updatePack(packId, { status: 'generated' });
      setGeneratingId(null);
    }, 1500);
  };

  const handleApprove = (packId: string) => {
    updatePack(packId, { status: 'approved' });
  };

  if (!activeExpert) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-text-muted">
          <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Selecione um Expert para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-text-main">Pack SEO / GEO</h1>
        <p className="text-text-muted mt-1">Otimize cada conteúdo para descoberta orgânica em todas as plataformas</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar SEO packs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base md:text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-muted" />
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-3 py-2.5 bg-surface border border-border rounded-lg text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
          >
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {filteredPacks.length === 0 ? (
        <div className="text-center py-16">
          <Globe className="w-12 h-12 mx-auto mb-4 text-text-muted opacity-50" />
          <p className="text-text-muted text-lg">Nenhum SEO pack encontrado</p>
          <p className="text-text-muted/60 text-sm mt-1">Gere um pack SEO a partir de um roteiro existente</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPacks.map((pack) => {
            const isExpanded = expandedPack === pack.id;
            const isGenerating = generatingId === pack.id;

            return (
              <div key={pack.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                <div
                  className="p-4 md:p-5 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedPack(isExpanded ? null : pack.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-base md:text-lg font-semibold text-text-main truncate">{pack.scriptTitle}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          pack.status === 'approved' ? 'bg-emerald-400/10 text-emerald-400' :
                          pack.status === 'generated' ? 'bg-primary/10 text-primary' :
                          'bg-text-muted/10 text-text-muted'
                        }`}>
                          {pack.status === 'approved' ? 'Aprovado' : pack.status === 'generated' ? 'Gerado' : 'Rascunho'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
                        <span>{pack.platform}</span>
                        <span className="w-1 h-1 rounded-full bg-text-muted/50" />
                        <span>{pack.items.length} itens</span>
                        {pack.geoOptimized && (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Globe className="w-3.5 h-3.5" /> GEO
                          </span>
                        )}
                        {pack.aeoOptimized && (
                          <span className="flex items-center gap-1 text-blue-400">
                            <Sparkles className="w-3.5 h-3.5" /> AEO
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {pack.status !== 'approved' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleApprove(pack.id); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400/10 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-400/20 transition-colors"
                        >
                          <CheckSquare className="w-3.5 h-3.5" />
                          Aprovar
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border px-4 md:px-5 pb-4 md:pb-5">
                    <div className="pt-4 space-y-3">
                      {pack.items.map((item: SEOPackItem) => {
                        const config = itemTypeConfig[item.type] || itemTypeConfig.title;
                        const Icon = config.icon;
                        return (
                          <div key={item.id} className="flex items-start gap-3 p-3 md:p-4 bg-bg rounded-lg border border-border">
                            <div className={`shrink-0 mt-0.5 ${config.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{config.label}</span>
                                {item.platform && (
                                  <span className="text-xs text-text-muted/60">{item.platform}</span>
                                )}
                              </div>
                              <p className="text-sm text-text-main whitespace-pre-wrap">{item.content}</p>
                            </div>
                            <button
                              onClick={() => handleCopy(item.content, `${pack.id}-${item.id}`)}
                              className="shrink-0 p-1.5 text-text-muted hover:text-primary transition-colors"
                            >
                              {copiedId === `${pack.id}-${item.id}` ? (
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        );
                      })}

                      {pack.status !== 'approved' && (
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => handleGenerate(pack.id)}
                            disabled={isGenerating}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 min-h-[44px]"
                          >
                            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                            {isGenerating ? 'Gerando...' : 'Regenerar SEO'}
                          </button>
                          {pack.status === 'generated' && (
                            <button
                              onClick={() => handleApprove(pack.id)}
                              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-400/10 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-400/20 transition-colors min-h-[44px]"
                            >
                              <CheckSquare className="w-4 h-4" />
                              Aprovar Pack
                            </button>
                          )}
                        </div>
                      )}

                      {pack.status === 'approved' && (
                        <div className="flex items-center gap-2 text-emerald-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Este pack SEO foi aprovado e está pronto para uso</span>
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
    </div>
  );
}
