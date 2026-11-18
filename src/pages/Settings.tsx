import { useEffect, useRef, useState } from 'react';
import { Download, Upload, Trash2, Save, Moon, Sun } from 'lucide-react';
import { useInstallationStore } from '@/store/installationStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { db } from '@/db/database';
import { applyTheme, getStoredTheme, type Theme } from '@/utils/theme';

export const Settings = () => {
  const { settings, loadSettings, saveSettings, exportData, importData, isLoading } =
    useInstallationStore();

  const [technician, setTechnician] = useState('');
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (settings) {
      setTechnician(settings.defaultTechnician ?? '');
    }
  }, [settings]);

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleSave = async () => {
    await saveSettings({ defaultTechnician: technician, theme });
    setMessage('ההגדרות נשמרו בהצלחה');
    setTimeout(() => setMessage(null), 2500);
  };

  const handleExport = async () => {
    const json = await exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `musahit-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('הנתונים יוצאו בהצלחה');
    setTimeout(() => setMessage(null), 2500);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      await importData(text);
      setMessage('הנתונים יובאו בהצלחה');
    } catch {
      setMessage('שגיאה בייבוא הקובץ. ודא שהקובץ תקין.');
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        'האם אתה בטוח שברצונך לאפס את כל הנתונים? כל ההתקנות וההערות יימחקו לצמיתות.',
      )
    ) {
      return;
    }
    await db.installations.clear();
    await db.taskProgress.clear();
    await db.settings.clear();
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">הגדרות</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          העדפות האפליקציה וניהול נתונים מקומיים
        </p>
      </div>

      {message && (
        <div className="rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">העדפות כלליות</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">שם טכנאי ברירת מחדל</label>
            <Input
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              placeholder="השם ימולא אוטומטית בהתקנה חדשה"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium">ערכת נושא</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleThemeChange('dark')}
                aria-pressed={theme === 'dark'}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
                  theme === 'dark'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-accent/40'
                }`}
              >
                <Moon className="h-4 w-4" />
                כהה
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange('light')}
                aria-pressed={theme === 'light'}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
                  theme === 'light'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-accent/40'
                }`}
              >
                <Sun className="h-4 w-4" />
                בהיר
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              הבחירה מוחלת מיד ונשמרת אוטומטית במחשב זה.
            </p>
          </div>

          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4" />
            שמור הגדרות
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ניהול נתונים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" />
              ייצוא נתונים (JSON)
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4" />
              ייבוא נתונים
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImport(file);
                e.target.value = '';
              }}
            />
          </div>

          <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
            <p className="text-sm font-medium text-warning">אזור מסוכן</p>
            <p className="mt-1 text-xs text-muted-foreground">
              איפוס ימחק את כל ההתקנות, המשימות וההערות השמורות במחשב זה.
            </p>
            <Button
              variant="destructive"
              className="mt-3"
              onClick={handleReset}
            >
              <Trash2 className="h-4 w-4" />
              איפוס כל הנתונים
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            הנתונים נשמרים מקומית בדפדפן (IndexedDB) ואינם מסונכרנים בין מחשבים
            שונים.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
