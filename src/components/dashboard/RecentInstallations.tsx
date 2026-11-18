import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { Installation } from '@/types/installation';
import {
  GARAGE_CLASSIFICATION_LABELS,
  INSTALLATION_TYPE_LABELS,
} from '@/data/installationTemplates';
import { formatDate } from '@/utils/progress';
import { Badge } from '@/components/ui/Badge';

interface RecentInstallationsProps {
  installations: Installation[];
}

export const RecentInstallations = ({ installations }: RecentInstallationsProps) => {
  if (installations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
        <p className="text-sm text-muted-foreground">
          עדיין אין התקנות פתוחות. התחל התקנה חדשה כדי להתחיל לעבוד.
        </p>
        <Link
          to="/new-installation"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          התקנה חדשה
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {installations.map((installation) => {
        const isCompleted = installation.status === 'completed';
        return (
          <Link
            key={installation.id}
            to={`/installation/${installation.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-accent/20"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isCompleted ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium">{installation.garageName}</p>
                <p className="text-xs text-muted-foreground">
                  מוסך {installation.garageNumber} · {installation.technician} ·{' '}
                  {formatDate(installation.installationDate)}
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Badge variant="secondary">
                {INSTALLATION_TYPE_LABELS[installation.installationType]}
              </Badge>
              <Badge variant="outline">
                {GARAGE_CLASSIFICATION_LABELS[installation.garageClassification]}
              </Badge>
            </div>
            <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        );
      })}
    </div>
  );
};
