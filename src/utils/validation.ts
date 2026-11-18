import { z } from 'zod';

export const installationFormSchema = z.object({
  garageName: z.string().min(2, 'שם המוסך חייב להכיל לפחות 2 תווים'),
  garageNumber: z.string().min(1, 'מספר המוסך הוא שדה חובה'),
  technician: z.string().min(2, 'שם הטכנאי חייב להכיל לפחות 2 תווים'),
  installationType: z.enum(['new', 'upgrade']),
  workstationCount: z.enum(['single', 'multiple']),
  garageClassification: z.enum(['regular', 'authorized', 'importer']),
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
