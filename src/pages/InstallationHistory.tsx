import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2, Copy, ArrowLeft, Filter } from 'lucide-react';
import { useInstallationStore } from '@/store/installationStore';
import {
  GARAGE_CLASSIFICATION_LABELS,
  INSTALLATION_TYPE_LABELS,
} from '@/data/installationTemplates';
import { formatDate } from '@/utils/progress';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select, SelectOption } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export const InstallationHistory = () => {
  const {
    installations,
    deleteInstallation,
    createInstallation,
    loadInstallations,
  } = useInstallationStore();

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filtered = useMemo(() => {
    let list = [...installations];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.garageName.toLowerCase().includes(q) ||
          i.garageNumber.toLowerCase().includes(q),
      );
    }
    if (typeFilter !== 'all') {
      list = list.filter((i) => i.installationType === typeFilter);
    }
    if (statusFilter !== 'all') {
      list = list.filter((i) => i.status === statusFilter);
    }
    list.sort((a, b) => {
      const diff =
        new Date(b.installationDate).getTime() - new Date(a.installationDate).getTime();
      return sortOrder === 'newest' ? diff : -diff;
    });
    return list;
  }, [installations, query, typeFilter, statusFilter, sortOrder]);

  const handleDuplicate = async (id: string) => {
    const source = installations.find((i) => i.id === id);
    if (!source) return;
    const newId = await createInstallation({
      garageName: `${source.garageName} (העתקה)`,
      garageNumber: source.garageNumber,
      technician: source.technician,
      installationType: source.installationType,
      workstationCount: source.workstationCount,
      garageClassification: source.garageClassification,
      manufacturer: source.manufacturer,
      installationDate: new Date().toISOString().slice(0, 10),
      notes: source.notes,
    });
    loadInstallations();
    void newId;
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">היסטוריית התקנות</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            כל ההתקנות השמורות במחשב זה ({installations.length})
          </p>
        </div>
        <Link
          to="/new-installation"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          התקנה חדשה
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש לפי שם מוסך או מספר מוסך..."
            className="pr-9"
          />
        </div>
        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <SelectOption value="all">כל סוגי ההתקנה</SelectOption>
          <SelectOption value="new">התקנה חדשה</SelectOption>
          <SelectOption value="server_replacement">החלפת שרת</SelectOption>
          <SelectOption value="lite_upgrade">שדרוג מלייט</SelectOption>
          <SelectOption value="add_cp">הוספת ח"פ</SelectOption>
          <SelectOption value="upgrade">שדרוג התקנה קיימת</SelectOption>
          <SelectOption value="manufacturer_settings">הגדרות יצרן</SelectOption>
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <SelectOption value="all">כל הסטטוסים</SelectOption>
          <SelectOption value="in_progress">בתהליך</SelectOption>
          <SelectOption value="completed">הושלם</SelectOption>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          מציג {filtered.length} מתוך {installations.length} התקנות
        </p>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          className="w-auto"
        >
          <SelectOption value="newest">החדשות ביותר</SelectOption>
          <SelectOption value="oldest">הוותיקות ביותר</SelectOption>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center">
          <Filter className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            לא נמצאו התקנות המתאימות לחיפוש או לסינון.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((installation) => (
            <div
              key={installation.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <Link
                to={`/installation/${installation.id}`}
                className="flex flex-1 items-center gap-3 min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{installation.garageName}</p>
                    <Badge
                      variant={
                        installation.status === 'completed' ? 'success' : 'warning'
                      }
                    >
                      {installation.status === 'completed' ? 'הושלם' : 'בתהליך'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    מוסך {installation.garageNumber} · {installation.technician} ·{' '}
                    {formatDate(installation.installationDate)}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <Badge variant="secondary">
                      {INSTALLATION_TYPE_LABELS[installation.installationType]}
                    </Badge>
                    <Badge variant="outline">
                      {GARAGE_CLASSIFICATION_LABELS[installation.garageClassification]}
                    </Badge>
                    {installation.manufacturer && (
                      <Badge variant="outline">{installation.manufacturer}</Badge>
                    )}
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-1.5">
                <Link
                  to={`/installation/${installation.id}`}
                  className="rounded-md p-2 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  title="פתח"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDuplicate(installation.id)}
                  title="שכפל"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteInstallation(installation.id)}
                  title="מחק"
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
