import { useState } from 'react';
import { Search, Bell, User, Moon, Sun } from 'lucide-react';

export const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/50 backdrop-blur px-6">
      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:bg-accent rounded-md lg:hidden">
          <Search className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">מרכז שליטה בהתקנות</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-muted-foreground hover:bg-accent rounded-md">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <button
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-sm hover:bg-accent/50"
        >
          <User className="h-4 w-4" />
          <span>טכנאי</span>
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg p-2 animate-in fade-in slide-in-from-right-2 duration-200">
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent/50">
              <Sun className="h-4 w-4" />
              מצב בהיר
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent/50">
              <Moon className="h-4 w-4" />
              מצב כהה
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent/50 text-destructive">
              הגדרות
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
