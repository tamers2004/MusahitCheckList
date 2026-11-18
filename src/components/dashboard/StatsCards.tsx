import { ClipboardList, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { Installation } from '@/types/installation';
import { cn } from '@/components/ui/cn';

interface StatsCardsProps {
  installations: Installation[];
}

export const StatsCards = ({ installations }: StatsCardsProps) => {
  const total = installations.length;
  const inProgress = installations.filter((i) => i.status === 'in_progress').length;
  const completed = installations.filter((i) => i.status === 'completed').length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    {
      label: 'סה"כ התקנות',
      value: total,
      icon: ClipboardList,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'בתהליך',
      value: inProgress,
      icon: Clock,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      label: 'הושלמו',
      value: completed,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'אחוז השלמה',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">{stat.value}</p>
              </div>
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-lg',
                  stat.bg,
                )}
              >
                <Icon className={cn('h-5 w-5', stat.color)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
