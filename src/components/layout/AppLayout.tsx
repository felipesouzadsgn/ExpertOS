import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useExpertStore } from '@/store/expertStore';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Expert Profile', path: '/experts', icon: Users },
  { name: 'Knowledge Base', path: '/knowledge', icon: BookOpen },
  { name: 'Market Research', path: '/research', icon: Search },
  { name: 'Content Studio', path: '/studio', icon: PenTool },
  { name: 'Editorial Calendar', path: '/calendar', icon: Calendar },
  { name: 'Kanban Flow', path: '/kanban', icon: KanbanSquare },
  { name: 'AI Agents', path: '/agents', icon: Bot },
  { name: 'SEO & Blog', path: '/blog', icon: Globe },
];

export function AppLayout({ children }: AppLayoutProps) {
  const { activeExpert, experts, setActiveExpert } = useExpertStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const brandColor = activeExpert?.brandColor || '#6366f1';

  return (
    <div className="flex h-screen w-full bg-bg text-text-main font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-[240px] border-r border-border flex flex-col p-6 bg-surface shrink-0">
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
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto p-4 bg-white/5 rounded-xl">
          <p className="text-[11px] text-text-muted uppercase tracking-wider">System Health</p>
          <p className="text-[13px] mt-1 font-medium text-green-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            All Systems Nominal
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-[72px] border-b border-border flex items-center justify-between px-8 bg-bg/80 backdrop-blur-sm shrink-0 z-50 relative">
          
          {/* Expert Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors"
            >
              {activeExpert && (
                <>
                  <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br", activeExpert.avatarGradient)}></div>
                  <span className="text-sm font-semibold">{activeExpert.name} &middot; {activeExpert.niche}</span>
                </>
              )}
              <ChevronDown size={14} className="text-text-muted ml-1" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 text-xs font-semibold text-text-muted uppercase tracking-wider border-b border-border">
                  Switch Expert
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
                      <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br", expert.avatarGradient)}></div>
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
          
          <div className="flex gap-5 items-center">
            <div className="text-right">
              <p className="text-xs font-semibold">Vitor Silva</p>
              <p className="text-[10px] text-text-muted">Head of Strategy</p>
            </div>
            <div className="w-8 h-8 bg-border rounded-lg overflow-hidden">
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
