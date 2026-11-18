import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, LayoutDashboard, FileCheck, History, Settings, LogOut } from 'lucide-react';
import { cn } from '@/components/ui/cn';

const navigation = [
  { name: 'לוח בקרה', href: '/', icon: LayoutDashboard },
  { name: 'התקנה חדשה', href: '/new-installation', icon: FileCheck },
  { name: 'היסטוריית התקנות', href: '/history', icon: History },
  { name: 'הגדרות', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-64 bg-card border-l border-border transition-all duration-300 transform translate-x-full lg:translate-x-0">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">מ</span>
            </div>
            <span className="font-bold text-lg tracking-tight">מוסהיט</span>
          </div>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="lg:hidden p-2 text-muted-foreground hover:bg-accent rounded-md"
            aria-label="פתח תפריט"
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive: active }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                  )
                }
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground w-full">
            <LogOut className="h-5 w-5" />
            התנתקות
          </button>
        </div>
      </div>
    </aside>
  );
};
