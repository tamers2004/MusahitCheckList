import {
  ChecklistSection,
  ChecklistTask,
} from '@/types/checklist';
import {
  InstallationType,
  WorkstationMode,
  GarageClassification,
} from '@/types/installation';

export const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    id: 'section-1',
    title: 'הכנות והגדרות SQL',
    description: 'הכנת המחשב והתקנת SQL Server Express',
    order: 1,
    taskIds: [
      'task-1-1', 'task-1-2', 'task-1-3', 'task-1-4', 'task-1-5',
      'task-1-6', 'task-1-7', 'task-1-8', 'task-1-9', 'task-1-10',
    ],
  },
  {
    id: 'section-2',
    title: 'הגדרות SQL ו-SSMS',
    description: 'הגדרת פרוטוקולים, חיבור וניהול שרת SQL',
    order: 2,
    taskIds: [
      'task-2-1', 'task-2-2', 'task-2-3', 'task-2-4', 'task-2-5',
      'task-2-6', 'task-2-7', 'task-2-8', 'task-2-9', 'task-2-10',
    ],
  },
  {
    id: 'section-3',
    title: 'בסיס נתונים',
    description: 'שחזור מסד נתונים, יצירת משתמש והרשאות',
    order: 3,
    taskIds: [
      'task-3-1', 'task-3-2', 'task-3-3', 'task-3-4', 'task-3-5',
    ],
  },
  {
    id: 'section-4',
    title: 'הכנת תיקיות והתקנת מוסכית',
    description: 'יצירת ספריות, התקנת התוכנה והגדרת חיבור',
    order: 4,
    taskIds: [
      'task-4-1', 'task-4-2', 'task-4-3', 'task-4-4', 'task-4-5',
      'task-4-6', 'task-4-7', 'task-4-8', 'task-4-9', 'task-4-10',
      'task-4-11', 'task-4-12', 'task-4-13', 'task-4-14', 'task-4-15',
      'task-4-16', 'task-4-17',
    ],
  },
  {
    id: 'section-5',
    title: 'הגדרות ראשוניות במוסכית',
    description: 'קובץ בקרה, פרטי מוסך, הגדרות מיחשוב ראשוניות',
    order: 5,
    taskIds: [
      'task-5-1', 'task-5-2', 'task-5-3', 'task-5-4', 'task-5-5',
      'task-5-6', 'task-5-7',
    ],
  },
  {
    id: 'section-6',
    title: 'עדכון גרסה וטבלאות',
    description: 'הורדת גרסה עדכנית, עדכון טבלאות וקבצי יצרן',
    order: 6,
    taskIds: [
      'task-6-1', 'task-6-2', 'task-6-3', 'task-6-4', 'task-6-5',
      'task-6-6', 'task-6-7', 'task-6-8',
    ],
  },
  {
    id: 'section-7',
    title: 'הגדרות מוסך יבואן',
    description: 'הגדרת תמונת יצרן, סוג רכב, טופס תביעה ושידור יצרן',
    order: 7,
    taskIds: [
      'task-7-1', 'task-7-2', 'task-7-3', 'task-7-4', 'task-7-5',
      'task-7-6', 'task-7-7', 'task-7-8', 'task-7-9', 'task-7-10',
      'task-7-11', 'task-7-12',
    ],
  },
  {
    id: 'section-8',
    title: 'הגדרות Firewall בשרת',
    description: 'כללי חומת אש ל-SQL Server לתחנות מרובות',
    order: 8,
    taskIds: [
      'task-8-1', 'task-8-2', 'task-8-3', 'task-8-4', 'task-8-5',
      'task-8-6',
    ],
  },
  {
    id: 'section-9',
    title: 'שיתוף והוספת עמדות',
    description: 'שיתוף כונן, הרשאות גישה וחיבור תחנות נוספות',
    order: 9,
    taskIds: [
      'task-9-1', 'task-9-2', 'task-9-3', 'task-9-4', 'task-9-5',
      'task-9-6', 'task-9-7', 'task-9-8', 'task-9-9', 'task-9-10',
    ],
  },
  {
    id: 'section-10',
    title: 'בדיקות סיום',
    description: 'אימות תקינות התוכנה, בסיס הנתונים והחיבור ברשת',
    order: 10,
    taskIds: [
      'task-10-1', 'task-10-2', 'task-10-3', 'task-10-4', 'task-10-5',
      'task-10-6', 'task-10-7', 'task-10-8', 'task-10-9', 'task-10-10',
      'task-10-11', 'task-10-12',
    ],
  },
];

export const CHECKLIST_TASKS: Record<string, ChecklistTask> = {
  // Section 1 — הכנות והגדרות SQL
  'task-1-1': {
    id: 'task-1-1',
    sectionId: 'section-1',
    title: 'התחבר למחשב הלקוח באמצעות AnyDesk כמנהל מערכת',
    description: 'התחברות מרחוק למחשב הלקוח עם הרשאות מנהל',
    order: 1,
  },
  'task-1-2': {
    id: 'task-1-2',
    sectionId: 'section-1',
    title: 'הורד SQL Express 2022',
    description: 'הורדת קובץ ההתקנה של SQL Server Express 2022',
    order: 2,
  },
  'task-1-3': {
    id: 'task-1-3',
    sectionId: 'section-1',
    title: 'אמת כי שפת האזור המנהלית של Windows היא עברית (ישראל)',
    description: 'בדיקת הגדרות שפה ואזור במערכת ההפעלה Windows',
    order: 3,
  },
  'task-1-4': {
    id: 'task-1-4',
    sectionId: 'section-1',
    title: 'התקן SQL Express במצב Basic',
    description: 'התקנה מהירה של SQL Server Express במצב בסיסי',
    order: 4,
  },
  'task-1-5': {
    id: 'task-1-5',
    sectionId: 'section-1',
    title: 'הורד SSMS וקבצי ההתקנה הנדרשים',
    description: 'הורדת SQL Server Management Studio וקבצי נלווים',
    order: 5,
  },
  'task-1-6': {
    id: 'task-1-6',
    sectionId: 'section-1',
    title: 'הרץ התקנה מותאמת אישית של SQL Express (Custom)',
    description: 'הרצת התקנה מותאמת אישית של SQL Server Express',
    order: 6,
  },
  'task-1-7': {
    id: 'task-1-7',
    sectionId: 'section-1',
    title: 'בחר Add Features',
    description: 'הוספת רכיבים נוספים בהתקנה',
    order: 7,
  },
  'task-1-8': {
    id: 'task-1-8',
    sectionId: 'section-1',
    title: 'הגדר את הרכיבים הנדרשים',
    description: 'הגדרת רכיבי SQL Server הנדרשים להתקנה',
    order: 8,
  },
  'task-1-9': {
    id: 'task-1-9',
    sectionId: 'section-1',
    title: 'השבת התקנת Azure Server',
    description: 'ביטול התקנת Azure Server שאינה נדרשת',
    order: 9,
  },
  'task-1-10': {
    id: 'task-1-10',
    sectionId: 'section-1',
    title: 'השלם את ההתקנה',
    description: 'סיום תהליך ההתקנה של SQL Server Express',
    order: 10,
  },

  // Section 2 — הגדרות SQL ו-SSMS
  'task-2-1': {
    id: 'task-2-1',
    sectionId: 'section-2',
    title: 'אפשר פרוטוקולי רשת של SQL במידת הצורך',
    description: 'הפעלת פרוטוקולי רשת ב-SQL Server לתקשורת בין תחנות',
    showForWorkstationCount: ['multiple'],
    order: 1,
  },
  'task-2-2': {
    id: 'task-2-2',
    sectionId: 'section-2',
    title: 'הפעל מחדש את שירות SQL Server',
    order: 2,
  },
  'task-2-3': {
    id: 'task-2-3',
    sectionId: 'section-2',
    title: 'הגדר מצב הפעלה אוטומטי ל-SQL Browser',
    order: 3,
  },
  'task-2-4': {
    id: 'task-2-4',
    sectionId: 'section-2',
    title: 'הפעל את SQL Browser',
    order: 4,
  },
  'task-2-5': {
    id: 'task-2-5',
    sectionId: 'section-2',
    title: 'התקן SSMS',
    order: 5,
  },
  'task-2-6': {
    id: 'task-2-6',
    sectionId: 'section-2',
    title: 'התחבר למופע SQL Server המקומי',
    order: 6,
  },
  'task-2-7': {
    id: 'task-2-7',
    sectionId: 'section-2',
    title: 'הגדר הצפנה ותעודת אמון לשרת (Trust Server Certificate)',
    order: 7,
  },
  'task-2-8': {
    id: 'task-2-8',
    sectionId: 'section-2',
    title: 'אפשר אימות SQL ואימות Windows',
    order: 8,
  },
  'task-2-9': {
    id: 'task-2-9',
    sectionId: 'section-2',
    title: 'הגדר הגדרות חיבור לפי המדריך הפנימי',
    order: 9,
  },
  'task-2-10': {
    id: 'task-2-10',
    sectionId: 'section-2',
    title: 'הגדר זיכרון SQL ל-4096 מגה-בתים',
    order: 10,
  },

  // Section 3 — בסיס נתונים
  'task-3-1': {
    id: 'task-3-1',
    sectionId: 'section-3',
    title: 'אמת את סוג ההתקנה',
    order: 1,
  },
  'task-3-2': {
    id: 'task-3-2',
    sectionId: 'section-3',
    title: 'התקנה חדשה בלבד: שחזר בסיס נתונים ריק מ-F:\\EXE\\BLANCKDB',
    description: 'שחזור מסד נתונים ריק מהנתיב F:\\EXE\\BLANCKDB',
    showForInstallationType: ['new'],
    hideForInstallationType: [
      'upgrade',
      'server_replacement',
      'lite_upgrade',
      'add_cp',
      'manufacturer_settings',
    ],
    order: 2,
    warning: 'יש לבצע משימה זו רק בהתקנה חדשה, לא בשדרוג.',
  },
  'task-3-3': {
    id: 'task-3-3',
    sectionId: 'section-3',
    title: 'אמת את שם בסיס הנתונים',
    order: 3,
  },
  'task-3-4': {
    id: 'task-3-4',
    sectionId: 'section-3',
    title: 'צור את משתמש הכניסה musahit',
    order: 4,
  },
  'task-3-5': {
    id: 'task-3-5',
    sectionId: 'section-3',
    title: 'הגדר הגדרות מדיניות סיסמה נדרשות',
    order: 5,
  },
  'task-3-6': {
    id: 'task-3-6',
    sectionId: 'section-3',
    title: 'הקצה תפקיד sysadmin למשתמש',
    order: 6,
  },

  // Section 4 — הכנת תיקיות והתקנת מוסכית
  'task-4-1': {
    id: 'task-4-1',
    sectionId: 'section-4',
    title: 'צור ספריית MG7.0',
    order: 1,
  },
  'task-4-2': {
    id: 'task-4-2',
    sectionId: 'section-4',
    title: 'ב-Windows 11, צור ספריית DATA והגדר שיתוף במידת הצורך',
    showForWorkstationCount: ['multiple'],
    order: 2,
  },
  'task-4-3': {
    id: 'task-4-3',
    sectionId: 'section-4',
    title: 'מפה את DATA לכונן M במידת הצורך',
    showForWorkstationCount: ['multiple'],
    order: 3,
  },
  'task-4-4': {
    id: 'task-4-4',
    sectionId: 'section-4',
    title: 'העתק את MUSAHITINSTALLER',
    order: 4,
  },
  'task-4-5': {
    id: 'task-4-5',
    sectionId: 'section-4',
    title: 'העתק את MAGIC',
    order: 5,
  },
  'task-4-6': {
    id: 'task-4-6',
    sectionId: 'section-4',
    title: 'הרץ את MUSAHITINSTALLER והתקן',
    order: 6,
  },
  'task-4-7': {
    id: 'task-4-7',
    sectionId: 'section-4',
    title: 'הרץ את MUSAHITINSTALLER שוב וצור קיצור דרך',
    order: 7,
  },
  'task-4-8': {
    id: 'task-4-8',
    sectionId: 'section-4',
    title: 'הגדר כתובת שרת SQL',
    order: 8,
  },
  'task-4-9': {
    id: 'task-4-9',
    sectionId: 'section-4',
    title: 'אמת את שם השרת והמופע',
    order: 9,
  },
  'task-4-10': {
    id: 'task-4-10',
    sectionId: 'section-4',
    title: 'התקן את הגופן הנדרש',
    order: 10,
  },
  'task-4-11': {
    id: 'task-4-11',
    sectionId: 'section-4',
    title: 'פתח את מוסכית',
    order: 11,
  },
  'task-4-12': {
    id: 'task-4-12',
    sectionId: 'section-4',
    title: 'בצע התחברות ראשונית',
    order: 12,
  },
  'task-4-13': {
    id: 'task-4-13',
    sectionId: 'section-4',
    title: 'אמת כי התוכנה נפתחת כראוי',
    order: 13,
  },

  // Section 5 — הגדרות ראשוניות במוסכית
  'task-5-1': {
    id: 'task-5-1',
    sectionId: 'section-5',
    title: 'צור את קובץ הבקרה',
    order: 1,
  },
  'task-5-2': {
    id: 'task-5-2',
    sectionId: 'section-5',
    title: 'הזן את פרטי המוסך ממערכת השירות',
    order: 2,
  },
  'task-5-3': {
    id: 'task-5-3',
    sectionId: 'section-5',
    title: 'אמת שדות 3, 5 ו-6 לפי המדריך',
    order: 3,
  },
  'task-5-4': {
    id: 'task-5-4',
    sectionId: 'section-5',
    title: 'בצע את הגדרת ההרשאות הנדרשת',
    order: 4,
  },
  'task-5-5': {
    id: 'task-5-5',
    sectionId: 'section-5',
    title: 'הגדר מיספור מאוחד',
    order: 5,
  },
  'task-5-6': {
    id: 'task-5-6',
    sectionId: 'section-5',
    title: 'הגדר מיספור מונה מאוחד ל-כן (YES)',
    order: 6,
  },
  'task-5-7': {
    id: 'task-5-7',
    sectionId: 'section-5',
    title: 'שמור ואמת את ההגדרות',
    order: 7,
  },

  // Section 6 — עדכון גרסה וטבלאות
  'task-6-1': {
    id: 'task-6-1',
    sectionId: 'section-6',
    title: 'הורד את הגרסה העדכנית ממערכת השירות',
    order: 1,
  },
  'task-6-2': {
    id: 'task-6-2',
    sectionId: 'section-6',
    title: 'בצע את העדכון באמצעות מקש F6',
    order: 2,
  },
  'task-6-3': {
    id: 'task-6-3',
    sectionId: 'section-6',
    title: 'אמת את הגרסה המותקנת',
    order: 3,
  },
  'task-6-4': {
    id: 'task-6-4',
    sectionId: 'section-6',
    title: 'מוסך רגיל: העתק את MOFIL012 ו-MOFIL053',
    showForGarageClassification: ['regular'],
    order: 4,
  },
  'task-6-5': {
    id: 'task-6-5',
    sectionId: 'section-6',
    title: 'מוסך מורשה: העתק את קבצי מחירון היצרן',
    showForGarageClassification: ['authorized', 'importer'],
    order: 5,
  },
  'task-6-6': {
    id: 'task-6-6',
    sectionId: 'section-6',
    title: 'מוסך מורשה: העתק את MOFIL349',
    showForGarageClassification: ['authorized', 'importer'],
    order: 6,
  },
  'task-6-7': {
    id: 'task-6-7',
    sectionId: 'section-6',
    title: 'מוסך מורשה: העתק את קובץ היצרן MOFIL170 הרלוונטי',
    showForGarageClassification: ['authorized'],
    order: 7,
  },
  'task-6-8': {
    id: 'task-6-8',
    sectionId: 'section-6',
    title: 'אמת את שמות הקבצים ונתיבי היעד',
    order: 8,
  },

  // Section 7 — הגדרות מוסך יבואן
  'task-7-1': {
    id: 'task-7-1',
    sectionId: 'section-7',
    title: 'הוסף את תמונת היצרן',
    showForGarageClassification: ['importer'],
    order: 1,
  },
  'task-7-2': {
    id: 'task-7-2',
    sectionId: 'section-7',
    title: 'הגדר את יצרן הרכב הנכון',
    showForGarageClassification: ['importer'],
    order: 2,
  },
  'task-7-3': {
    id: 'task-7-3',
    sectionId: 'section-7',
    title: 'הגדר את סוג הרכב',
    showForGarageClassification: ['importer'],
    order: 3,
  },
  'task-7-4': {
    id: 'task-7-4',
    sectionId: 'section-7',
    title: 'הזן את מספר המוסך',
    showForGarageClassification: ['importer'],
    order: 4,
  },
  'task-7-5': {
    id: 'task-7-5',
    sectionId: 'section-7',
    title: 'הזן את מספר הלקוח לתביעות',
    showForGarageClassification: ['importer'],
    order: 5,
  },
  'task-7-6': {
    id: 'task-7-6',
    sectionId: 'section-7',
    title: 'הגדר את טופס התביעה הנכון',
    showForGarageClassification: ['importer'],
    order: 6,
  },
  'task-7-7': {
    id: 'task-7-7',
    sectionId: 'section-7',
    title: 'שמור באמצעות Ctrl+S',
    showForGarageClassification: ['importer'],
    order: 7,
  },
  'task-7-8': {
    id: 'task-7-8',
    sectionId: 'section-7',
    title: 'צור קיצור דרך לשידור היצרן',
    showForGarageClassification: ['importer'],
    order: 8,
  },
  'task-7-9': {
    id: 'task-7-9',
    sectionId: 'section-7',
    title: 'הגדר את מסוף 50',
    showForGarageClassification: ['importer'],
    order: 9,
  },
  'task-7-10': {
    id: 'task-7-10',
    sectionId: 'section-7',
    title: 'הגדר את ערך StartProgram המתאים',
    showForGarageClassification: ['importer'],
    order: 10,
  },
  'task-7-11': {
    id: 'task-7-11',
    sectionId: 'section-7',
    title: 'אמת את סביבת שידור היצרן',
    showForGarageClassification: ['importer'],
    order: 11,
  },
  'task-7-12': {
    id: 'task-7-12',
    sectionId: 'section-7',
    title: 'הגדר קיצור דרך לשידור יצרן לאחר עדכון גרסה נדרש',
    dependsOn: ['task-6-2'],
    showForGarageClassification: ['importer'],
    warning: 'יש לבצע את עדכון הגרסה לפני הגדרת שידור היצרן.',
    order: 12,
  },

  // Section 8 — הגדרות Firewall בשרת
  'task-8-1': {
    id: 'task-8-1',
    sectionId: 'section-8',
    title: 'צור כלל כניסה נכנסת ל-SQL Server בחומת האש',
    showForWorkstationCount: ['multiple'],
    order: 1,
  },
  'task-8-2': {
    id: 'task-8-2',
    sectionId: 'section-8',
    title: 'הגדר את נתיב התוכנית הנדרש של SQL Server',
    showForWorkstationCount: ['multiple'],
    order: 2,
  },
  'task-8-3': {
    id: 'task-8-3',
    sectionId: 'section-8',
    title: 'הגדר את ההרשאות הנדרשות',
    showForWorkstationCount: ['multiple'],
    order: 3,
  },
  'task-8-4': {
    id: 'task-8-4',
    sectionId: 'section-8',
    title: 'אפשר Allow Edge Traversal לפי המדריך',
    showForWorkstationCount: ['multiple'],
    order: 4,
  },
  'task-8-5': {
    id: 'task-8-5',
    sectionId: 'section-8',
    title: 'צור כלל נוסף עבור Program Files (x86)',
    showForWorkstationCount: ['multiple'],
    order: 5,
  },
  'task-8-6': {
    id: 'task-8-6',
    sectionId: 'section-8',
    title: 'אמת את הגדרת חומת האש',
    showForWorkstationCount: ['multiple'],
    order: 6,
  },

  // Section 9 — שיתוף והוספת עמדות
  'task-9-1': {
    id: 'task-9-1',
    sectionId: 'section-9',
    title: 'שתף את כונן ההתקנה הרלוונטי',
    showForWorkstationCount: ['multiple'],
    order: 1,
  },
  'task-9-2': {
    id: 'task-9-2',
    sectionId: 'section-9',
    title: 'הפעל Share This Folder',
    showForWorkstationCount: ['multiple'],
    order: 2,
  },
  'task-9-3': {
    id: 'task-9-3',
    sectionId: 'section-9',
    title: 'הגדר הרשאות שליטה מלאה בשיתוף',
    showForWorkstationCount: ['multiple'],
    order: 3,
  },
  'task-9-4': {
    id: 'task-9-4',
    sectionId: 'section-9',
    title: 'הגדר הרשאות אבטחה נדרשות (Security)',
    showForWorkstationCount: ['multiple'],
    order: 4,
  },
  'task-9-5': {
    id: 'task-9-5',
    sectionId: 'section-9',
    title: 'אמת גישה ברשת מהמחשב המשני',
    showForWorkstationCount: ['multiple'],
    order: 5,
  },
  'task-9-6': {
    id: 'task-9-6',
    sectionId: 'section-9',
    title: 'גש למחשב הראשי באמצעות שמו ברשת',
    showForWorkstationCount: ['multiple'],
    order: 6,
  },
  'task-9-7': {
    id: 'task-9-7',
    sectionId: 'section-9',
    title: 'מפה את הכונן המשותף',
    showForWorkstationCount: ['multiple'],
    order: 7,
  },
  'task-9-8': {
    id: 'task-9-8',
    sectionId: 'section-9',
    title: 'צור קיצור דרך למוסכית',
    showForWorkstationCount: ['multiple'],
    order: 8,
  },
  'task-9-9': {
    id: 'task-9-9',
    sectionId: 'section-9',
    title: 'אמת גישה ליישום מכל תחנת עבודה',
    showForWorkstationCount: ['multiple'],
    order: 9,
  },

  // Section 10 — בדיקות סיום
  'task-10-1': {
    id: 'task-10-1',
    sectionId: 'section-10',
    title: 'אמת כי מוסכית נפתחת במחשב הראשי',
    order: 1,
  },
  'task-10-2': {
    id: 'task-10-2',
    sectionId: 'section-10',
    title: 'אמת כי מוסכית נפתחת בכל תחנות העבודה',
    showForWorkstationCount: ['multiple'],
    order: 2,
  },
  'task-10-3': {
    id: 'task-10-3',
    sectionId: 'section-10',
    title: 'אמת חיבור בסיס הנתונים של SQL',
    order: 3,
  },
  'task-10-4': {
    id: 'task-10-4',
    sectionId: 'section-10',
    title: 'אמת את קובץ הבקרה',
    order: 4,
  },
  'task-10-5': {
    id: 'task-10-5',
    sectionId: 'section-10',
    title: 'אמת את המיספור המאוחד',
    order: 5,
  },
  'task-10-6': {
    id: 'task-10-6',
    sectionId: 'section-10',
    title: 'אמת את גרסת התוכנה',
    order: 6,
  },
  'task-10-7': {
    id: 'task-10-7',
    sectionId: 'section-10',
    title: 'אמת את הטבלאות הנדרשות',
    order: 7,
  },
  'task-10-8': {
    id: 'task-10-8',
    sectionId: 'section-10',
    title: 'אמת את הקישוריות ברשת',
    order: 8,
  },
  'task-10-9': {
    id: 'task-10-9',
    sectionId: 'section-10',
    title: 'אמת את הגדרת היבואן במידה ורלוונטי',
    showForGarageClassification: ['importer'],
    order: 9,
  },
  'task-10-10': {
    id: 'task-10-10',
    sectionId: 'section-10',
    title: 'אמת את סביבת שידור היצרן במידה ורלוונטי',
    showForGarageClassification: ['importer'],
    order: 10,
  },
  'task-10-11': {
    id: 'task-10-11',
    sectionId: 'section-10',
    title: 'אמת כי הלקוח יכול לעבוד עם המערכת',
    order: 11,
  },
  'task-10-12': {
    id: 'task-10-12',
    sectionId: 'section-10',
    title: 'רשום את סיום ההתקנה',
    order: 12,
  },
};

export const getApplicableTasks = (
  installationType: InstallationType,
  workstationCount: number,
  garageClassification: GarageClassification,
): string[] => {
  const workstationMode: WorkstationMode =
    workstationCount > 1 ? 'multiple' : 'single';
  const applicableTaskIds: string[] = [];

  for (const section of CHECKLIST_SECTIONS) {
    for (const taskId of section.taskIds) {
      const task = CHECKLIST_TASKS[taskId];
      if (!task) continue;

      let show = true;

      // Installation type rules
      if (task.hideForInstallationType?.includes(installationType)) {
        show = false;
      }
      if (
        task.showForInstallationType &&
        !task.showForInstallationType.includes(installationType)
      ) {
        show = false;
      }

      // Workstation count rules
      if (task.hideForWorkstationCount?.includes(workstationMode)) {
        show = false;
      }
      if (
        task.showForWorkstationCount &&
        !task.showForWorkstationCount.includes(workstationMode)
      ) {
        show = false;
      }

      // Garage classification rules
      if (task.hideForGarageClassification?.includes(garageClassification)) {
        show = false;
      }
      if (
        task.showForGarageClassification &&
        !task.showForGarageClassification.includes(garageClassification)
      ) {
        show = false;
      }

      if (show) {
        applicableTaskIds.push(taskId);
      }
    }
  }

  return applicableTaskIds.sort(
    (a, b) =>
      CHECKLIST_TASKS[a].order - CHECKLIST_TASKS[b].order ||
      a.localeCompare(b, 'he'),
  );
};
