import { Menu, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/60 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
          aria-label="פתח תפריט"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="text-base font-semibold lg:text-lg">
          מרכז שליטה בהתקנות
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative rounded-md p-2 text-muted-foreground hover:bg-accent"
          aria-label="התראות"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
            ט
          </span>
          <span className="hidden sm:inline">טכנאי</span>
        </div>
      </div>
    </header>
  );
};
