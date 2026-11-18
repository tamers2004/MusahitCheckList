import { Installation, TaskProgress } from '@/types/installation';
import { CHECKLIST_SECTIONS, CHECKLIST_TASKS } from '@/data/checklist';
import {
  GARAGE_CLASSIFICATION_LABELS,
  INSTALLATION_TYPE_LABELS,
  WORKSTATION_COUNT_LABELS,
} from '@/data/installationTemplates';
import { formatDate } from './progress';

export const printInstallationReport = (
  installation: Installation,
  progressMap: Map<string, TaskProgress>,
  applicableTaskIds: string[],
) => {
  const completed = applicableTaskIds.filter(
    (id) => progressMap.get(id)?.completed,
  );
  const pending = applicableTaskIds.filter(
    (id) => !progressMap.get(id)?.completed,
  );
  const percentage =
    applicableTaskIds.length === 0
      ? 0
      : Math.round((completed.length / applicableTaskIds.length) * 100);

  const sectionsHtml = CHECKLIST_SECTIONS.map((section) => {
    const tasks = section.taskIds
      .filter((id) => applicableTaskIds.includes(id))
      .map((id) => CHECKLIST_TASKS[id])
      .filter(Boolean);
    if (tasks.length === 0) return '';
    const rows = tasks
      .map((task) => {
        const done = progressMap.get(task.id)?.completed;
        const notes = progressMap.get(task.id)?.notes;
        return `<tr>
          <td class="status">${done ? '✓' : '○'}</td>
          <td>${task.title}${notes ? `<div class="note">הערה: ${notes}</div>` : ''}</td>
        </tr>`;
      })
      .join('');
    return `<section>
      <h2>${section.order}. ${section.title}</h2>
      <table>${rows}</table>
    </section>`;
  }).join('');

  const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8" />
<title>דוח התקנה - ${installation.garageName}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Heebo', Arial, sans-serif; margin: 0; padding: 32px; color: #0f172a; direction: rtl; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  h2 { font-size: 16px; margin: 24px 0 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
  .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; margin: 16px 0; font-size: 13px; }
  .meta div { display: flex; justify-content: space-between; border-bottom: 1px dotted #e2e8f0; padding: 4px 0; }
  .meta span:first-child { color: #64748b; }
  .overall { margin: 16px 0; padding: 12px 16px; background: #f1f5f9; border-radius: 8px; font-size: 14px; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  td { padding: 6px 8px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
  td.status { width: 28px; text-align: center; font-weight: bold; color: #059669; }
  .note { font-size: 11px; color: #64748b; margin-top: 2px; }
  .ltr { direction: ltr; unicode-bidi: embed; display: inline-block; }
  @media print { body { padding: 16px; } }
</style>
</head>
<body>
  <h1>דוח התקנה - ${installation.garageName}</h1>
  <div class="meta">
    <div><span>מספר מוסך</span><span>${installation.garageNumber}</span></div>
    <div><span>טכנאי</span><span>${installation.technician}</span></div>
    <div><span>תאריך התקנה</span><span>${formatDate(installation.installationDate)}</span></div>
    <div><span>סוג התקנה</span><span>${INSTALLATION_TYPE_LABELS[installation.installationType]}</span></div>
    <div><span>מספר עמדות</span><span>${WORKSTATION_COUNT_LABELS[installation.workstationCount]}</span></div>
    <div><span>סיווג מוסך</span><span>${GARAGE_CLASSIFICATION_LABELS[installation.garageClassification]}</span></div>
    <div><span>אחוז השלמה</span><span>${percentage}%</span></div>
    <div><span>משימות שהושלמו</span><span>${completed.length} מתוך ${applicableTaskIds.length}</span></div>
  </div>
  <div class="overall">התקדמות כללית: ${percentage}% · ${completed.length} הושלמו · ${pending.length} נותרו</div>
  ${installation.notes ? `<p><strong>הערות כלליות:</strong> ${installation.notes}</p>` : ''}
  ${sectionsHtml}
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 400);
};

export const downloadJsonReport = (
  installation: Installation,
  progressMap: Map<string, TaskProgress>,
  applicableTaskIds: string[],
) => {
  const completed = applicableTaskIds.filter(
    (id) => progressMap.get(id)?.completed,
  );
  const pending = applicableTaskIds.filter(
    (id) => !progressMap.get(id)?.completed,
  );
  const data = {
    installation,
    summary: {
      total: applicableTaskIds.length,
      completed: completed.length,
      pending: pending.length,
      percentage:
        applicableTaskIds.length === 0
          ? 0
          : Math.round((completed.length / applicableTaskIds.length) * 100),
    },
    completedTasks: completed.map((id) => ({
      id,
      title: CHECKLIST_TASKS[id]?.title,
      notes: progressMap.get(id)?.notes ?? '',
    })),
    pendingTasks: pending.map((id) => ({
      id,
      title: CHECKLIST_TASKS[id]?.title,
    })),
    generatedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `musahit-report-${installation.garageNumber || installation.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
