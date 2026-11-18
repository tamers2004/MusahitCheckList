import { z } from 'zod';

export const installationFormSchema = z.object({
  garageName: z.string().min(2, 'שם המוסך חייב להכיל לפחות 2 תווים'),
  garageNumber: z.string().min(1, 'מספר המוסך הוא שדה חובה'),
  technician: z.string().min(2, 'שם הטכנאי חייב להכיל לפחות 2 תווים'),
  installationType: z.enum([
    'new',
    'server_replacement',
    'lite_upgrade',
    'add_cp',
    'upgrade',
    'manufacturer_settings',
  ]),
  workstationCount: z.coerce
    .number({ error: 'מספר העמדות חייב להיות מספר שלם' })
    .int('מספר העמדות חייב להיות מספר שלם')
    .min(1, 'מספר העמדות חייב להיות לפחות 1'),
  garageClassification: z.enum(['regular', 'authorized']),
  manufacturer: z.string().max(100, 'שם היצרן ארוך מדי').optional(),
  installationDate: z.string().min(1, 'תאריך התקנה הוא שדה חובה'),
  notes: z.string().optional(),
});

export type InstallationFormValues = z.infer<typeof installationFormSchema>;

export const validateExportData = (data: unknown): boolean => {
  try {
    const parsed = JSON.parse(JSON.stringify(data));
    return Boolean(
      parsed &&
        Array.isArray(parsed.installations) &&
        Array.isArray(parsed.taskProgress),
    );
  } catch {
    return false;
  }
};
