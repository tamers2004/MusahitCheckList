import {
  InstallationType,
  WorkstationCount,
  GarageClassification,
} from '@/types/installation';

export const installationRules = {
  canRestoreEmptyDatabase: (installationType: InstallationType) =>
    installationType === 'new',

  canConfigureNetworkSharing: (workstationCount: WorkstationCount) =>
    workstationCount === 'multiple',

  canConfigureSQLNetworkProtocol: (workstationCount: WorkstationCount) =>
    workstationCount === 'multiple',

  canConfigureFirewall: (workstationCount: WorkstationCount) =>
    workstationCount === 'multiple',

  canConfigureMultiWorkstationMapping: (workstationCount: WorkstationCount) =>
    workstationCount === 'multiple',

  isAuthorizedGarage: (classification: GarageClassification) =>
    classification === 'authorized' || classification === 'importer',

  isImporterGarage: (classification: GarageClassification) =>
    classification === 'importer',

  needsImporterConfigAfterVersionUpdate: true,

  needsTransmissionShortcutAfterImporterSettings: true,

  finalVerificationAfterInstallationTasks: true,
};
