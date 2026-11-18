import { Installation } from '@/types/installation';

export const generateReportData = (
  installation: Installation,
  completedTaskIds: string[],
  pendingTaskIds: string[],
) => {
  return {
    garageName: installation.garageName,
    garageNumber: installation.garageNumber,
    technician: installation.technician,
    installationType: installation.installationType === 'new' ? 'התקנה חדשה' : 'שדרוג התקנה קיימת',
    workstationCount: installation.workstationCount === 'single' ? 'תחנת עבודה בודדת' : 'מספר תחנות עבודה',
    garageClassification: installation.garageClassification === 'regular' ? 'מוסך רגיל' : installation.garageClassification === 'authorized' ? 'מוסך מורשה' : 'מוסך יבואן',
    completionPercentage: completedTaskIds.length / (completedTaskIds.length + pendingTaskIds.length) * 100,
    completedTasks: completedTaskIds.length,
    pendingTasks: pendingTaskIds.length,
    technicianNotes: installation.notes,
    installationDate: installation.installationDate,
    status: installation.status,
  };
};
