import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle2, FileDown, Loader2, Pencil } from 'lucide-react';
import {
  installationFormSchema,
  InstallationFormValues,
} from '@/utils/validation';
import { useInstallationStore } from '@/store/installationStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, TextArea } from '@/components/ui/Input';
import { Select, SelectOption } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  GARAGE_CLASSIFICATION_LABELS,
  INSTALLATION_TYPE_LABELS,
  MANUFACTURER_SUGGESTIONS,
} from '@/data/installationTemplates';
import { getApplicableTasks } from '@/data/checklist';
import { formatDate } from '@/utils/progress';
import { downloadInstallationSummary } from '@/utils/export';

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

const StepIndicator = ({ step }: { step: 0 | 1 }) => (
  <ol className="flex flex-wrap items-center gap-2 text-sm">
    <li
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
        step === 0
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-muted-foreground'
      }`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-xs font-bold">
        1
      </span>
      פרטי ההתקנה
    </li>
    <li className="text-muted-foreground">←</li>
    <li
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
        step === 1
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-muted-foreground'
      }`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-xs font-bold">
        2
      </span>
      סיכום וייצוא
    </li>
  </ol>
);

export const NewInstallation = () => {
  const navigate = useNavigate();
  const { createInstallation, isLoading, settings, loadSettings } =
    useInstallationStore();
  const [step, setStep] = useState<0 | 1>(0);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm<InstallationFormValues>({
    resolver: zodResolver(installationFormSchema) as unknown as Resolver<InstallationFormValues>,
    defaultValues: {
      garageName: '',
      garageNumber: '',
      technician: settings?.defaultTechnician ?? '',
      installationType: 'new',
      workstationCount: 1,
      garageClassification: 'regular',
      manufacturer: '',
      installationDate: new Date().toISOString().slice(0, 10),
      notes: '',
    },
  });

  const values = useWatch({ control }) as InstallationFormValues;
  const workstationCount = Number(values.workstationCount) || 1;
  const relevantTaskCount = getApplicableTasks(
    values.installationType,
    workstationCount,
    values.garageClassification,
  ).length;

  const goToSummary = async () => {
    const isValid = await trigger();
    if (isValid) setStep(1);
  };

  const onSubmit = async (formValues: InstallationFormValues) => {
    const id = await createInstallation({
      ...formValues,
      manufacturer: formValues.manufacturer ?? '',
      notes: formValues.notes ?? '',
    });
    navigate(`/installation/${id}`);
  };

  const summaryRows = [
    { label: 'שם המוסך', value: values.garageName || '—' },
    { label: 'מספר מוסך', value: values.garageNumber || '—' },
    { label: 'טכנאי', value: values.technician || '—' },
    {
      label: 'תאריך התקנה',
      value: values.installationDate ? formatDate(values.installationDate) : '—',
    },
    {
      label: 'סוג התקנה',
      value: INSTALLATION_TYPE_LABELS[values.installationType],
    },
    {
      label: 'סיווג מוסך',
      value: GARAGE_CLASSIFICATION_LABELS[values.garageClassification],
    },
    { label: 'הגדרת יצרן', value: values.manufacturer || '—' },
    {
      label: 'מספר עמדות',
      value: String(workstationCount),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">התקנה חדשה</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          מלא את פרטי המוסך והגדרות ההתקנה. רשימת המשימות תיווצר אוטומטית לפי
          הבחירות שלך.
        </p>
      </div>

      <StepIndicator step={step} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={step === 0 ? 'space-y-6' : 'hidden'} aria-hidden={step === 1}>
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
                  <SelectOption value="server_replacement">החלפת שרת</SelectOption>
                  <SelectOption value="lite_upgrade">שדרוג מלייט</SelectOption>
                  <SelectOption value="add_cp">הוספת ח"פ</SelectOption>
                  <SelectOption value="upgrade">שדרוג התקנה קיימת</SelectOption>
                  <SelectOption value="manufacturer_settings">הגדרות יצרן</SelectOption>
                </Select>
              </Field>
              <Field
                label="מספר עמדות"
                error={errors.workstationCount?.message}
              >
                <Input
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  {...register('workstationCount', { valueAsNumber: true })}
                />
              </Field>
              <Field
                label="סיווג מוסך"
                error={errors.garageClassification?.message}
              >
                <Select {...register('garageClassification')}>
                  <SelectOption value="regular">מוסך רגיל</SelectOption>
                  <SelectOption value="authorized">מוסך מורשה</SelectOption>
                </Select>
              </Field>
              <Field
                label="הגדרת יצרן"
                error={errors.manufacturer?.message}
                hint="ניתן להקליד שם יצרן או לבחור מההצעות"
              >
                <Input
                  list="manufacturer-suggestions"
                  placeholder="לדוגמה: טויוטה"
                  autoComplete="off"
                  {...register('manufacturer')}
                />
                <datalist id="manufacturer-suggestions">
                  {MANUFACTURER_SUGGESTIONS.map((manufacturer) => (
                    <option key={manufacturer} value={manufacturer} />
                  ))}
                </datalist>
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
            <Button type="button" onClick={goToSummary} disabled={isLoading}>
              המשך לסיכום
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-lg">סיכום ההתקנה</CardTitle>
                  <Badge variant="secondary">
                    {relevantTaskCount} משימות רלוונטיות
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {summaryRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 text-sm"
                    >
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd className="font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                {values.notes && (
                  <div className="rounded-lg border border-border bg-background/40 p-4 text-sm">
                    <p className="mb-1 font-medium">הערות כלליות</p>
                    <p className="whitespace-pre-wrap text-muted-foreground">
                      {values.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-wrap justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(0)}
                disabled={isLoading}
              >
                <Pencil className="h-4 w-4" />
                חזרה לעריכה
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => downloadInstallationSummary(getValues())}
                disabled={isLoading}
              >
                <FileDown className="h-4 w-4" />
                ייצוא JSON
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    התחל התקנה
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
