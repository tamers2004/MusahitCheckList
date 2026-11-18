import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import {
  installationFormSchema,
  InstallationFormValues,
} from '@/utils/validation';
import { useInstallationStore } from '@/store/installationStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, TextArea } from '@/components/ui/Input';
import { Select, SelectOption } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const Field = ({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium">{label}</label>
    {children}
    {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export const NewInstallation = () => {
  const navigate = useNavigate();
  const { createInstallation, isLoading, settings, loadSettings } =
    useInstallationStore();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InstallationFormValues>({
    resolver: zodResolver(installationFormSchema),
    defaultValues: {
      garageName: '',
      garageNumber: '',
      technician: settings?.defaultTechnician ?? '',
      installationType: 'new',
      workstationCount: 'single',
      garageClassification: 'regular',
      installationDate: new Date().toISOString().slice(0, 10),
      notes: '',
    },
  });

  const onSubmit = async (values: InstallationFormValues) => {
    const id = await createInstallation({
      ...values,
      notes: values.notes ?? '',
    });
    navigate(`/installation/${id}`);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">התקנה חדשה</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          מלא את פרטי המוסך והגדרות ההתקנה. רשימת המשימות תיווצר אוטומטית לפי
          הבחירות שלך.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">פרטי המוסך והטכנאי</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="שם המוסך" error={errors.garageName?.message}>
              <Input placeholder="לדוגמה: מוסך המרכז" {...register('garageName')} />
            </Field>
            <Field label="מספר מוסך" error={errors.garageNumber?.message}>
              <Input placeholder="לדוגמה: 1234" {...register('garageNumber')} />
            </Field>
            <Field label="טכנאי" error={errors.technician?.message}>
              <Input placeholder="שם הטכנאי" {...register('technician')} />
            </Field>
            <Field label="תאריך התקנה" error={errors.installationDate?.message}>
              <Input type="date" {...register('installationDate')} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">הגדרות התקנה</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="סוג התקנה" error={errors.installationType?.message}>
              <Select {...register('installationType')}>
                <SelectOption value="new">התקנה חדשה</SelectOption>
                <SelectOption value="upgrade">שדרוג התקנה קיימת</SelectOption>
              </Select>
            </Field>
            <Field label="מספר עמדות" error={errors.workstationCount?.message}>
              <Select {...register('workstationCount')}>
                <SelectOption value="single">תחנת עבודה בודדת</SelectOption>
                <SelectOption value="multiple">מספר תחנות עבודה</SelectOption>
              </Select>
            </Field>
            <Field
              label="סיווג מוסך"
              error={errors.garageClassification?.message}
              hint="מוסך יבואן כולל גם את הגדרות המוסך המורשה"
            >
              <Select {...register('garageClassification')}>
                <SelectOption value="regular">מוסך רגיל</SelectOption>
                <SelectOption value="authorized">מוסך מורשה</SelectOption>
                <SelectOption value="importer">מוסך יבואן</SelectOption>
              </Select>
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">הערות</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="הערות (אופציונלי)" error={errors.notes?.message}>
              <TextArea
                rows={3}
                placeholder="הערות נוספות על ההתקנה..."
                {...register('notes')}
              />
            </Field>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            ביטול
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                התחל התקנה
                <ArrowRight className="h-4 w-4 rotate-180" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
