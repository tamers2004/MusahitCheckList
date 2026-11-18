export type InstallationType = 'new' | 'upgrade';
export type WorkstationCount = 'single' | 'multiple';
export type GarageClassification = 'regular' | 'authorized' | 'importer';
export type InstallationStatus = 'in_progress' | 'completed';

export interface Installation {
  id: string;
  garageName: string;
  garageNumber: string;
  technician: string;
  installationType: InstallationType;
  workstationCount: WorkstationCount;
  garageClassification: GarageClassification;
  installationDate: string;
  notes: string;
  status: InstallationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InstallationFormData {
  garageName: string;
  garageNumber: string;
  technician: string;
  installationType: InstallationType;
  workstationCount: WorkstationCount;
  garageClassification: GarageClassification;
  installationDate: string;
  notes: string;
}

export interface TaskProgress {
  id: string;
  installationId: string;
  taskId: string;
  completed: boolean;
  completedAt: string | null;
  notes: string;
}

export interface ApplicationSettings {
  id: string;
  theme: 'dark' | 'light';
  defaultTechnician: string;
  preferences: Record<string, unknown>;
}

export interface ExportData {
  installations: Installation[];
  taskProgress: TaskProgress[];
  settings: ApplicationSettings;
  exportedAt: string;
  version: string;
}
