import type {
  InstallationType,
  WorkstationMode,
  GarageClassification,
} from './installation';

export interface ChecklistTask {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  technicalInstructions?: string;
  warning?: string;
  order: number;

  // Visibility rules
  showForInstallationType?: InstallationType[];
  showForWorkstationCount?: WorkstationMode[];
  showForGarageClassification?: GarageClassification[];
  hideForInstallationType?: InstallationType[];
  hideForWorkstationCount?: WorkstationMode[];
  hideForGarageClassification?: GarageClassification[];

  // Dependencies
  dependsOn?: string[];
  requiredFor?: string[];

  // Default state
  defaultCompleted?: boolean;
}

export interface ChecklistSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  taskIds: string[];
}

export interface ChecklistData {
  sections: ChecklistSection[];
  tasks: Record<string, ChecklistTask>;
}

export type { InstallationType, WorkstationMode, GarageClassification };

export interface SectionProgress {
  sectionId: string;
  totalTasks: number;
  completedTasks: number;
  percentage: number;
}

export interface InstallationProgress {
  installationId: string;
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  sections: SectionProgress[];
}
