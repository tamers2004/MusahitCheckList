import {
  InstallationType,
  GarageClassification,
} from '@/types/installation';
import { CHECKLIST_SECTIONS, CHECKLIST_TASKS, getApplicableTasks } from '@/data/checklist';

export const calculateProgress = (
  installationType: InstallationType,
  workstationCount: number,
  garageClassification: GarageClassification,
  completedTaskIds: Set<string>,
): {
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  sections: { sectionId: string; total: number; completed: number; percentage: number }[];
} => {
  const applicableTaskIds = getApplicableTasks(
    installationType,
    workstationCount,
    garageClassification,
  );

  const totalTasks = applicableTaskIds.length;
  const completedTasks = applicableTaskIds.filter((id) =>
    completedTaskIds.has(id),
  ).length;

  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const sections = CHECKLIST_SECTIONS.map((section) => {
    const sectionApplicableTasks = section.taskIds.filter((id) =>
      applicableTaskIds.includes(id),
    );
    const sectionCompleted = sectionApplicableTasks.filter((id) =>
      completedTaskIds.has(id),
    ).length;

    return {
      sectionId: section.id,
      total: sectionApplicableTasks.length,
      completed: sectionCompleted,
      percentage: sectionApplicableTasks.length === 0 ? 0 : Math.round((sectionCompleted / sectionApplicableTasks.length) * 100),
    };
  });

  return {
    totalTasks,
    completedTasks,
    percentage,
    sections,
  };
};

export const getTaskTitle = (taskId: string): string => {
  const task = CHECKLIST_TASKS[taskId];
  return task ? task.title : taskId;
};

export const getSectionTitle = (sectionId: string): string => {
  const section = CHECKLIST_SECTIONS.find((s) => s.id === sectionId);
  return section ? section.title : sectionId;
};

export const getTaskWarnings = (
  taskId: string,
  completedTaskIds: Set<string>,
  _installationType: InstallationType,
  _workstationCount: number,
  _garageClassification: GarageClassification,
): string[] => {
  const task = CHECKLIST_TASKS[taskId];
  if (!task) return [];

  const warnings: string[] = [];

  if (task.warning) {
    warnings.push(task.warning);
  }

  if (task.dependsOn) {
    for (const depId of task.dependsOn) {
      if (!completedTaskIds.has(depId)) {
        const depTask = CHECKLIST_TASKS[depId];
        warnings.push(
          `משימה זו תלויה בהשלמת: ${depTask ? depTask.title : depId}`,
        );
      }
    }
  }

  return warnings;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
