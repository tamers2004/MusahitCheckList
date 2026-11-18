export type InstallationType =
  | 'new'
  | 'server_replacement'
  | 'lite_upgrade'
  | 'add_cp'
  | 'upgrade'
  | 'manufacturer_settings';

export type WorkstationCount = number;
export type WorkstationMode = 'single' | 'multiple';
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
  manufacturer: string;
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
  manufacturer: string;
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
