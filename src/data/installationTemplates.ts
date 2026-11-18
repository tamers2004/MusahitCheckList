import {
  InstallationType,
  GarageClassification,
} from '@/types/installation';

export const INSTALLATION_TYPE_LABELS: Record<InstallationType, string> = {
  new: 'התקנה חדשה',
  server_replacement: 'החלפת שרת',
  lite_upgrade: 'שדרוג מלייט',
  add_cp: 'הוספת ח"פ',
  upgrade: 'שדרוג התקנה קיימת',
  manufacturer_settings: 'הגדרות יצרן',
};

export const GARAGE_CLASSIFICATION_LABELS: Record<GarageClassification, string> = {
  regular: 'מוסך רגיל',
  authorized: 'מוסך מורשה',
  importer: 'מוסך יבואן',
};

export const MANUFACTURER_SUGGESTIONS = [
  'טויוטה',
  'יונדאי',
  'קיה',
  'מאזדה',
  'מיצובישי',
  'ניסאן',
  'סוזוקי',
  'הונדה',
  'סובארו',
  'לקסוס',
  'רנו',
  'פיג\'ו',
  'סיטרואן',
  'דאצ\'יה',
  'סקודה',
  'פולקסווגן',
  'אאודי',
  'BMW',
  'מרצדס',
  'וולוו',
  'פורד',
  'שברולט',
  'אופל',
  'פיאט',
  'ג\'יפ',
  'לנד רובר',
  'טסלה',
  'איסוזו',
  'קאדילק',
  'אינפיניטי',
];

export const formatWorkstationCount = (count: number): string =>
  count === 1 ? 'עמדה אחת' : `${count} עמדות`;

export const INSTALLATION_STATUS_LABELS: Record<string, string> = {
  in_progress: 'בתהליך',
  completed: 'הושלם',
};

export const COMPLETION_STATE_LABELS = {
  pending: 'ממתין לביצוע',
  completed: 'הושלם',
  requiresAttention: 'דורש טיפול',
};
