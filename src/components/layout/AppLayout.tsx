import { ReactNode, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Search, 
  PenTool, 
  Calendar, 
  KanbanSquare, 
  Bot,
  Globe,
  Camera,
  ChevronDown,
  Video,
  TrendingUp,
  Compass,
  FileText,
  BookMarked,
  FileBarChart2,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useExpertStore } from '@/store/expertStore';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Scale Hub', path: '/scale-hub', icon: TrendingUp },
  { name: 'Expert Playbook', path: '/playbook', icon: Compass },
  { name: 'Expert Profile', path: '/experts', icon: Users },
  { name: 'AI Avatars', path: '/avatars', icon: Camera },
  { name: 'Knowledge Base', path: '/knowledge', icon: BookOpen },
  { name: 'Market Research', path: '/research', icon: Search },
  { name: 'Content Studio', path: '/studio', icon: PenTool },
  { name: 'Video & Reels AI', path: '/video-studio', icon: Video },
  { name: 'Editorial Calendar', path: '/calendar', icon: Calendar },
  { name: 'Kanban Flow', path: '/kanban', icon: KanbanSquare },
  { name: 'Agentes de IA', path: '/agents', icon: Bot },
  { name: 'SEO & Blog', path: '/blog', icon: Globe },
  { name: 'Documentation', path: '/docs', icon: FileText },
  { name: 'PRD', path: '/prd', icon: FileBarChart2 },
];

export function AppLayout({ children }: AppLayoutProps) {
  const { activeExpert, experts, setActiveExpert } = useExpertStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const brandColor = activeExpert?.brandColor || '#6366f1';

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="flex h-screen w-full bg-bg text-text-main font-sans">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex w-[240px] border-r border-border flex-col p-6 bg-surface shrink-0">
        <div className="font-serif italic text-xl font-bold mb-10 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
          Expert OS
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-white/5 text-text-main border-l-4 pl-[9px]" 
                        : "text-text-muted hover:bg-white/5 hover:text-text-main"
                    )
                  }
                  style={({ isActive }) => isActive ? { borderColor: brandColor } : {}}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto p-4 bg-white/5 rounded-xl">
          <p className="text-[11px] text-text-muted uppercase tracking-wider">Status do Sistema</p>
          <p className="text-[13px] mt-1 font-medium text-green-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Todos os Sistemas OK
          </p>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 w-[280px] bg-surface border-r border-border flex flex-col p-5 z-50 lg:hidden transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="font-serif italic text-xl font-bold flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColor }}></div>
            Expert OS
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-white/5 rounded-lg text-text-muted"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-white/5 text-text-main border-l-4 pl-[9px]" 
                        : "text-text-muted hover:bg-white/5 hover:text-text-main"
                    )
                  }
                  style={({ isActive }) => isActive ? { borderColor: brandColor } : {}}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto p-4 bg-white/5 rounded-xl">
          <p className="text-[11px] text-text-muted uppercase tracking-wider">Status do Sistema</p>
          <p className="text-[13px] mt-1 font-medium text-green-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            Todos os Sistemas OK
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-[72px] border-b border-border flex items-center justify-between px-4 md:px-8 bg-bg/80 backdrop-blur-sm shrink-0 z-30 relative">
          
          {/* Mobile Menu Button + Expert Switcher */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-text-muted transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Expert Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 md:gap-3 bg-surface border border-border px-3 md:px-4 py-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors max-w-[200px] md:max-w-none"
              >
                {activeExpert && (
                  <>
                    <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br shrink-0", activeExpert.avatarGradient)}></div>
                    <span className="text-sm font-semibold truncate hidden sm:inline">{activeExpert.name} &middot; {activeExpert.niche}</span>
                    <span className="text-sm font-semibold truncate sm:hidden">{activeExpert.name.split(' ')[0]}</span>
                  </>
                )}
                <ChevronDown size={14} className="text-text-muted ml-1 shrink-0" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-2 text-xs font-semibold text-text-muted uppercase tracking-wider border-b border-border">
                    Trocar Expert
                  </div>
                  <div className="p-1">
                    {experts.map(expert => (
                      <button
                        key={expert.id}
                        onClick={() => {
                          setActiveExpert(expert.id);
                          setIsDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left hover:bg-white/5 transition-colors",
                          activeExpert?.id === expert.id ? "bg-white/5" : ""
                        )}
                      >
                        <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br shrink-0", expert.avatarGradient)}></div>
                        <div className="flex-1 truncate">
                          <div className="font-medium">{expert.name}</div>
                          <div className="text-[10px] text-text-muted truncate">{expert.niche}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3 md:gap-5 items-center">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold">Vitor Silva</p>
              <p className="text-[10px] text-text-muted">Head de Estratégia</p>
            </div>
            <div className="w-8 h-8 bg-border rounded-lg overflow-hidden shrink-0">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vitor" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
