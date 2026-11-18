import {
  InstallationType,
  WorkstationCount,
  GarageClassification,
} from '@/types/installation';

export const INSTALLATION_TYPE_LABELS: Record<InstallationType, string> = {
  new: 'התקנה חדשה',
  upgrade: 'שדרוג התקנה קיימת',
};

export const WORKSTATION_COUNT_LABELS: Record<WorkstationCount, string> = {
  single: 'תחנת עבודה בודדת',
  multiple: 'מספר תחנות עבודה',
};

export const GARAGE_CLASSIFICATION_LABELS: Record<GarageClassification, string> = {
  regular: 'מוסך רגיל',
  authorized: 'מוסך מורשה',
  importer: 'מוסך יבואן',
};

export const INSTALLATION_STATUS_LABELS: Record<string, string> = {
  in_progress: 'בתהליך',
  completed: 'הושלם',
};

export const COMPLETION_STATE_LABELS = {
  pending: 'ממתין לביצוע',
  completed: 'הושלם',
  requiresAttention: 'דורש טיפול',
};
