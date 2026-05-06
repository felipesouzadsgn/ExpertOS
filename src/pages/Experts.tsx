import { useExpertStore } from '@/store/expertStore';
import { Plus, Settings2, Users as UsersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Experts() {
  const { experts, activeExpert, setActiveExpert } = useExpertStore();
  const navigate = useNavigate();

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-2xl mb-1">Perfis de Expert</h1>
          <p className="text-text-muted text-sm">Gerencie suas personas de Expert com IA e contexto.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus size={16} />
          Novo Expert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div 
            key={expert.id}
            onClick={() => setActiveExpert(expert.id)}
            className={`bg-surface border rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:border-primary/50 relative overflow-hidden ${
              activeExpert?.id === expert.id ? 'border-primary shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'border-border'
            }`}
          >
            {activeExpert?.id === expert.id && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
            )}
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${expert.avatarGradient}`}></div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/experts/${expert.id}`);
                }}
                className="text-text-muted hover:text-text-main transition-colors"
              >
                <Settings2 size={18} />
              </button>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-lg font-semibold">{expert.name}</h3>
              <p className="text-primary text-xs font-medium uppercase tracking-wider mt-1 mb-4">{expert.niche}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <span className="text-lg font-bold block">{expert.tokens}</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">Tokens Indexados</span>
                </div>
                <div>
                  <span className="text-lg font-bold block">{expert.archetypes}</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">Arquétipos</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Placeholder */}
        <div className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-text-muted hover:text-text-main hover:border-text-muted transition-colors cursor-pointer min-h-[220px]">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Plus size={24} />
          </div>
          <h3 className="font-medium">Criar Novo Expert</h3>
          <p className="text-xs text-center mt-2 max-w-[200px]">Configure uma nova persona com branding personalizado e base de conhecimento.</p>
        </div>
      </div>
    </div>
  );
}
