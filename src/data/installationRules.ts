import {
  InstallationType,
  GarageClassification,
} from '@/types/installation';

export const installationRules = {
  canRestoreEmptyDatabase: (installationType: InstallationType) =>
    installationType === 'new',

  canConfigureNetworkSharing: (workstationCount: number) =>
    workstationCount > 1,

  canConfigureSQLNetworkProtocol: (workstationCount: number) =>
    workstationCount > 1,

  canConfigureFirewall: (workstationCount: number) =>
    workstationCount > 1,

  canConfigureMultiWorkstationMapping: (workstationCount: number) =>
    workstationCount > 1,

  isAuthorizedGarage: (classification: GarageClassification) =>
    classification === 'authorized' || classification === 'importer',

  isImporterGarage: (classification: GarageClassification) =>
    classification === 'importer',

  needsImporterConfigAfterVersionUpdate: true,

  needsTransmissionShortcutAfterImporterSettings: true,

  finalVerificationAfterInstallationTasks: true,
};
