import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileCheck, History, Settings, LogOut, X } from 'lucide-react';
import { cn } from '@/components/ui/cn';

const navigation = [
  { name: 'לוח בקרה', href: '/', icon: LayoutDashboard },
  { name: 'התקנה חדשה', href: '/new-installation', icon: FileCheck },
  { name: 'היסטוריית התקנות', href: '/history', icon: History },
  { name: 'הגדרות', href: '/settings', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-64 shrink-0 flex-col border-l border-border bg-card transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-bold text-white">מ</span>
            </div>
            <span className="text-lg font-bold tracking-tight">מוסכית</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
            aria-label="סגור תפריט"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-l-2 border-primary bg-primary/10 text-primary'
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

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted-foreground">
            <LogOut className="h-5 w-5" />
            <span>נתונים מקומיים בלבד</span>
          </div>
        </div>
      </aside>
    </>
  );
};
