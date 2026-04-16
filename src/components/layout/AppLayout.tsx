import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Search, 
  PenTool, 
  Calendar, 
  KanbanSquare, 
  Bot 
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
];

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-bg text-text-main font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-[240px] border-r border-border flex flex-col p-6 bg-surface shrink-0">
        <div className="font-serif italic text-xl font-bold mb-10 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
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
                        ? "bg-white/5 text-text-main border-l-4 border-primary pl-[9px]" 
                        : "text-text-muted hover:bg-white/5 hover:text-text-main"
                    )
                  }
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
        <header className="h-[72px] border-b border-border flex items-center justify-between px-8 bg-bg/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-500"></div>
            <span className="text-sm font-semibold">Aria Sterling &middot; Luxury Real Estate</span>
            <span className="opacity-30 text-xs ml-1">▼</span>
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
