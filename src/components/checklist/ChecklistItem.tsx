import { useState } from 'react';
import { ChevronDown, AlertTriangle, Info, Check } from 'lucide-react';
import { ChecklistTask } from '@/types/checklist';
import { TaskProgress } from '@/types/installation';
import { cn } from '@/components/ui/cn';

interface ChecklistItemProps {
  task: ChecklistTask;
  progress?: TaskProgress;
  warnings: string[];
  onToggle: (taskId: string, completed: boolean) => void;
  onSaveNotes: (taskId: string, notes: string) => void;
  disabled?: boolean;
}

export const ChecklistItem = ({
  task,
  progress,
  warnings,
  onToggle,
  onSaveNotes,
  disabled = false,
}: ChecklistItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteValue, setNoteValue] = useState(progress?.notes ?? '');
  const [noteSaved, setNoteSaved] = useState(false);

  const completed = progress?.completed ?? false;
  const requiresAttention = warnings.length > 0 && !completed;

  const handleNoteChange = (value: string) => {
    setNoteValue(value);
    setNoteSaved(false);
  };

  const handleNoteSave = () => {
    onSaveNotes(task.id, noteValue);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div
      className={cn(
        'group rounded-xl border transition-all',
        completed
          ? 'border-success/30 bg-success/5'
          : requiresAttention
            ? 'border-warning/40 bg-warning/5'
            : 'border-border bg-card hover:border-primary/40',
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          type="button"
          onClick={() => onToggle(task.id, !completed)}
          disabled={disabled}
          aria-label={completed ? 'בטל סימון משימה' : 'סמן משימה כהושלמה'}
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
            completed
              ? 'border-success bg-success text-white'
              : 'border-muted-foreground/40 hover:border-primary',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {completed && <Check className="h-4 w-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="flex-1 text-right"
            >
              <h4
                className={cn(
                  'text-sm font-medium leading-snug',
                  completed && 'text-muted-foreground line-through',
                )}
              >
                {task.title}
              </h4>
              {task.description && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {task.description}
                </p>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="shrink-0 p-1 text-muted-foreground hover:text-foreground"
              aria-label={isExpanded ? 'סגור פרטים' : 'פתח פרטים'}
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded && 'rotate-180',
                )}
              />
            </button>
          </div>

          {requiresAttention && (
            <div className="mt-2 flex items-start gap-1.5 text-xs text-warning">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{warnings[0]}</span>
            </div>
          )}

          {isExpanded && (
            <div className="mt-3 space-y-3 border-t border-border/50 pt-3">
              {task.technicalInstructions && (
                <div className="flex items-start gap-2 rounded-lg bg-background/60 p-3 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{task.technicalInstructions}</span>
                </div>
              )}

              {warnings.length > 0 && (
                <div className="space-y-1">
                  {warnings.map((warning, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 rounded-lg bg-warning/10 p-2.5 text-xs text-warning"
                    >
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  הערות למשימה
                </label>
                <textarea
                  value={noteValue}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  placeholder="הוסף הערה..."
                  rows={2}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNoteSave}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    שמור הערה
                  </button>
                  {noteSaved && (
                    <span className="text-xs text-success">נשמר בהצלחה</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
