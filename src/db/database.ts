import Dexie, { Table } from 'dexie';
import {
  Installation,
  TaskProgress,
  ApplicationSettings,
} from '@/types/installation';
import { normalizeInstallation } from './normalize';

export class MusahitDatabase extends Dexie {
  installations!: Table<Installation, string>;
  taskProgress!: Table<TaskProgress, string>;
  settings!: Table<ApplicationSettings, string>;

  constructor() {
    super('MusahitCheckListDB');
    this.version(1).stores({
      installations: 'id, createdAt, updatedAt, status, garageName, garageNumber',
      taskProgress: 'id, installationId, taskId, completed',
      settings: 'id',
    });
    this.version(2)
      .stores({
        installations: 'id, createdAt, updatedAt, status, garageName, garageNumber',
        taskProgress: 'id, installationId, taskId, completed',
        settings: 'id',
      })
      .upgrade((transaction) =>
        transaction
          .table('installations')
          .toCollection()
          .modify((installation) => {
            const record = installation as unknown as Record<string, unknown>;
            Object.assign(record, normalizeInstallation(record));
          }),
      );
  }
}

export const db = new MusahitDatabase();
