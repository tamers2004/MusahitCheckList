import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ChecklistSection as ChecklistSectionType, ChecklistTask } from '@/types/checklist';
import { TaskProgress } from '@/types/installation';
import { ChecklistItem } from './ChecklistItem';
import { ProgressBar } from './ProgressBar';
import { cn } from '@/components/ui/cn';

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  tasks: ChecklistTask[];
  progressMap: Map<string, TaskProgress>;
  warningsMap: Map<string, string[]>;
  onToggleTask: (taskId: string, completed: boolean) => void;
  onSaveNotes: (taskId: string, notes: string) => void;
  defaultOpen?: boolean;
}

export const ChecklistSection = ({
  section,
  tasks,
  progressMap,
  warningsMap,
  onToggleTask,
  onSaveNotes,
  defaultOpen = true,
}: ChecklistSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const completedCount = tasks.filter(
    (task) => progressMap.get(task.id)?.completed,
  ).length;
  const percentage =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);
  const isComplete = tasks.length > 0 && completedCount === tasks.length;

  return (
    <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-4 p-4 text-right hover:bg-accent/20 transition-colors"
      >
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
            isComplete
              ? 'bg-success/15 text-success'
              : 'bg-primary/10 text-primary',
          )}
        >
          {section.order}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-right">{section.title}</h3>
          {section.description && (
            <p className="text-xs text-muted-foreground text-right mt-0.5">
              {section.description}
            </p>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-3 w-40">
          <ProgressBar value={percentage} size="sm" className="flex-1" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {completedCount}/{tasks.length}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div className="space-y-2 border-t border-border p-4">
          <div className="sm:hidden mb-3">
            <ProgressBar value={percentage} size="sm" showLabel />
          </div>
          {tasks.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              אין משימות רלוונטיות בסעיף זה עבור הגדרות התקנה אלו
            </p>
          ) : (
            tasks.map((task) => (
              <ChecklistItem
                key={task.id}
                task={task}
                progress={progressMap.get(task.id)}
                warnings={warningsMap.get(task.id) ?? []}
                onToggle={onToggleTask}
                onSaveNotes={onSaveNotes}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
