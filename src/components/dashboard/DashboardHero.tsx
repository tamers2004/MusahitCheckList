import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const InstallationScene = lazy(() => import('@/components/three/InstallationScene'));

const SceneFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative h-48 w-48">
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute inset-8 rounded-full bg-accent/20 blur-2xl" />
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 rounded bg-primary/60 animate-pulse"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const DashboardHero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-background to-card">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.12),transparent_55%)]" />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
        <div className="z-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            מרכז שליטה בהתקנות מוסכית
          </div>
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            ניהול התקנות מוסכית
            <br />
            <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
              בצורה חכמה ומדויקת
            </span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            עקוב אחר כל שלב בהתקנה, שמור התקדמות אוטומטית וקבל סקירה מלאה של כל
            מוסך — הכל מקומי ומאובטח במחשב שלך.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/new-installation"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90"
            >
              התחל התקנה
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium transition hover:bg-accent/50"
            >
              היסטוריית התקנות
            </Link>
          </div>
        </div>

        <div className="relative h-64 sm:h-72 lg:h-80">
          {show3D && !reduceMotion ? (
            <Suspense fallback={<SceneFallback />}>
              <InstallationScene />
            </Suspense>
          ) : (
            <SceneFallback />
          )}
          <button
            onClick={() => setShow3D((v) => !v)}
            className="absolute bottom-2 left-2 rounded-md border border-border bg-background/70 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur hover:text-foreground"
          >
            {show3D ? 'השבת תלת-ממד' : 'הפעל תלת-ממד'}
          </button>
        </div>
      </div>
    </section>
  );
};
