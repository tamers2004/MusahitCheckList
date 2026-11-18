import { Installation } from '@/types/installation';
import { InstallationFormValues } from './validation';
import {
  GARAGE_CLASSIFICATION_LABELS,
  INSTALLATION_TYPE_LABELS,
  formatWorkstationCount,
} from '@/data/installationTemplates';

const getGarageTypeLabel = (classification: Installation['garageClassification']) =>
  GARAGE_CLASSIFICATION_LABELS[classification];

export const buildInstallationSummary = (values: InstallationFormValues) => {
  const workstationCount = Number(values.workstationCount);

  return {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    installation: {
      garageName: values.garageName,
      garageNumber: values.garageNumber,
      technician: values.technician,
      installationDate: values.installationDate,
      installationType: values.installationType,
      installationTypeLabel: INSTALLATION_TYPE_LABELS[values.installationType],
      garageType: values.garageClassification,
      garageTypeLabel: getGarageTypeLabel(values.garageClassification),
      manufacturer: values.manufacturer ?? '',
      workstationCount,
      workstationCountLabel: formatWorkstationCount(workstationCount),
      notes: values.notes ?? '',
    },
  };
};

export const downloadInstallationSummary = (values: InstallationFormValues) => {
  const data = buildInstallationSummary(values);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `musahit-installation-${values.garageNumber || 'new'}-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const generateReportData = (
  installation: Installation,
  completedTaskIds: string[],
  pendingTaskIds: string[],
) => {
  return {
    garageName: installation.garageName,
    garageNumber: installation.garageNumber,
    technician: installation.technician,
    installationType: INSTALLATION_TYPE_LABELS[installation.installationType],
    workstationCount: installation.workstationCount,
    workstationCountLabel: formatWorkstationCount(installation.workstationCount),
    garageClassification: GARAGE_CLASSIFICATION_LABELS[installation.garageClassification],
    manufacturer: installation.manufacturer,
    completionPercentage:
      completedTaskIds.length + pendingTaskIds.length === 0
        ? 0
        : (completedTaskIds.length /
            (completedTaskIds.length + pendingTaskIds.length)) *
          100,
    completedTasks: completedTaskIds.length,
    pendingTasks: pendingTaskIds.length,
    technicianNotes: installation.notes,
    installationDate: installation.installationDate,
    status: installation.status,
  };
};
