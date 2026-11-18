import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Printer,
  FileDown,
  StickyNote,
} from 'lucide-react';
import { useInstallationStore } from '@/store/installationStore';
import { CHECKLIST_SECTIONS, CHECKLIST_TASKS, getApplicableTasks } from '@/data/checklist';
import { calculateProgress, getTaskWarnings, formatDate } from '@/utils/progress';
import {
  GARAGE_CLASSIFICATION_LABELS,
  INSTALLATION_TYPE_LABELS,
  WORKSTATION_COUNT_LABELS,
} from '@/data/installationTemplates';
import { ChecklistSection } from '@/components/checklist/ChecklistSection';
import { ProgressBar } from '@/components/checklist/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
  printInstallationReport,
  downloadJsonReport,
} from '@/utils/report';

export const InstallationWorkspace = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentInstallation,
    taskProgress,
    loadInstallationById,
    saveTaskProgress,
    saveTaskNotes,
    updateInstallation,
    isLoading,
  } = useInstallationStore();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    if (id) loadInstallationById(id);
  }, [id, loadInstallationById]);

  const progressMap = useMemo(() => {
    const map = new Map<string, (typeof taskProgress)[number]>();
    taskProgress.forEach((tp) => map.set(tp.taskId, tp));
    return map;
  }, [taskProgress]);

  const completedTaskIds = useMemo(() => {
    return new Set(
      taskProgress.filter((tp) => tp.completed).map((tp) => tp.taskId),
    );
  }, [taskProgress]);

  const applicableTaskIds = useMemo(() => {
    if (!currentInstallation) return [];
    return getApplicableTasks(
      currentInstallation.installationType,
      currentInstallation.workstationCount,
      currentInstallation.garageClassification,
    );
  }, [currentInstallation]);

  const progress = useMemo(() => {
    if (!currentInstallation) {
      return { totalTasks: 0, completedTasks: 0, percentage: 0, sections: [] };
    }
    return calculateProgress(
      currentInstallation.installationType,
      currentInstallation.workstationCount,
      currentInstallation.garageClassification,
      completedTaskIds,
    );
  }, [currentInstallation, completedTaskIds]);

  const warningsMap = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!currentInstallation) return map;
    applicableTaskIds.forEach((taskId) => {
      const warnings = getTaskWarnings(
        taskId,
        completedTaskIds,
        currentInstallation.installationType,
        currentInstallation.workstationCount,
        currentInstallation.garageClassification,
      );
      if (warnings.length) map.set(taskId, warnings);
    });
    return map;
  }, [applicableTaskIds, completedTaskIds, currentInstallation]);

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    if (!id) return;
    await saveTaskProgress(id, taskId, completed);
    if (currentInstallation) {
      const newCompleted = new Set(completedTaskIds);
      if (completed) newCompleted.add(taskId);
      else newCompleted.delete(taskId);
      const isAllDone =
        applicableTaskIds.length > 0 &&
        applicableTaskIds.every((tid) => newCompleted.has(tid));
      const newStatus = isAllDone ? 'completed' : 'in_progress';
      if (newStatus !== currentInstallation.status) {
        await updateInstallation(id, { status: newStatus });
      }
    }
  };

  const handleSaveNotes = async (taskId: string, notes: string) => {
    if (!id) return;
    await saveTaskNotes(id, taskId, notes);
  };

  if (isLoading && !currentInstallation) {
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="h-28 animate-pulse rounded-xl bg-muted/20" />
        <div className="h-64 animate-pulse rounded-xl bg-muted/20" />
      </div>
    );
  }

  if (!currentInstallation) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">ההתקנה לא נמצאה.</p>
        <Link to="/history" className="mt-4 inline-block text-primary hover:underline">
          חזרה להיסטוריית התקנות
        </Link>
      </div>
    );
  }

  const visibleSections = CHECKLIST_SECTIONS.map((section) => {
    const tasks = section.taskIds
      .filter((tid) => applicableTaskIds.includes(tid))
      .map((tid) => CHECKLIST_TASKS[tid])
      .filter(Boolean)
      .filter((task) => {
        const done = progressMap.get(task.id)?.completed ?? false;
        if (activeFilter === 'completed') return done;
        if (activeFilter === 'pending') return !done;
        return true;
      });
    return { section, tasks };
  }).filter(({ tasks }) => tasks.length > 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/history" className="hover:text-foreground">
          היסטוריית התקנות
        </Link>
        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        <span className="text-foreground">{currentInstallation.garageName}</span>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {currentInstallation.garageName}
                </h1>
                <Badge
                  variant={currentInstallation.status === 'completed' ? 'success' : 'warning'}
                >
                  {currentInstallation.status === 'completed' ? 'הושלם' : 'בתהליך'}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                מוסך {currentInstallation.garageNumber} · {currentInstallation.technician} ·{' '}
                {formatDate(currentInstallation.installationDate)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {INSTALLATION_TYPE_LABELS[currentInstallation.installationType]}
                </Badge>
                <Badge variant="secondary">
                  {WORKSTATION_COUNT_LABELS[currentInstallation.workstationCount]}
                </Badge>
                <Badge variant="outline">
                  {GARAGE_CLASSIFICATION_LABELS[currentInstallation.garageClassification]}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  printInstallationReport(
                    currentInstallation,
                    progressMap,
                    applicableTaskIds,
                  )
                }
              >
                <Printer className="h-4 w-4" />
                הדפסה
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadJsonReport(
                    currentInstallation,
                    progressMap,
                    applicableTaskIds,
                  )
                }
              >
                <FileDown className="h-4 w-4" />
                ייצוא דוח
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">התקדמות כללית</span>
              <span className="font-semibold">{progress.percentage}%</span>
            </div>
            <ProgressBar value={progress.percentage} size="lg" />
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                {progress.completedTasks} משימות שהושלמו
              </span>
              <span className="flex items-center gap-1.5">
                <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                {progress.totalTasks - progress.completedTasks} משימות שנותרו
              </span>
              <span className="flex items-center gap-1.5">
                <StickyNote className="h-3.5 w-3.5 text-accent" />
                סה"כ {progress.totalTasks} משימות רלוונטיות
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {currentInstallation.notes && (
        <div className="rounded-xl border border-border bg-card/50 p-4 text-sm">
          <p className="mb-1 font-medium">הערות כלליות</p>
          <p className="text-muted-foreground">{currentInstallation.notes}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            { key: 'all', label: 'הכל' },
            { key: 'pending', label: 'ממתין לביצוע' },
            { key: 'completed', label: 'הושלם' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition ${
              activeFilter === tab.key
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-accent/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visibleSections.map(({ section, tasks }) => (
          <ChecklistSection
            key={section.id}
            section={section}
            tasks={tasks}
            progressMap={progressMap}
            warningsMap={warningsMap}
            onToggleTask={handleToggleTask}
            onSaveNotes={handleSaveNotes}
            defaultOpen={activeFilter !== 'all' || progress.percentage < 100}
          />
        ))}
      </div>
    </div>
  );
};
