import {
  GarageClassification,
  InstallationType,
} from '@/types/installation';

const INSTALLATION_TYPES: InstallationType[] = [
  'new',
  'server_replacement',
  'lite_upgrade',
  'add_cp',
  'upgrade',
  'manufacturer_settings',
];

const GARAGE_CLASSIFICATIONS: GarageClassification[] = [
  'regular',
  'authorized',
  'importer',
];

export const normalizeWorkstationCount = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 1) {
    return Math.floor(value);
  }
  if (value === 'multiple') return 2;
  return 1;
};

export const normalizeInstallation = (
  installation: Record<string, unknown>,
): Record<string, unknown> => {
  const installationType = INSTALLATION_TYPES.includes(
    installation.installationType as InstallationType,
  )
    ? (installation.installationType as InstallationType)
    : 'new';

  const garageClassification = GARAGE_CLASSIFICATIONS.includes(
    installation.garageClassification as GarageClassification,
  )
    ? (installation.garageClassification as GarageClassification)
    : 'regular';

  return {
    ...installation,
    installationType,
    garageClassification,
    workstationCount: normalizeWorkstationCount(installation.workstationCount),
    manufacturer:
      typeof installation.manufacturer === 'string'
        ? installation.manufacturer
        : '',
  };
};
