import Dexie, { Table } from 'dexie';
import {
  Installation,
  TaskProgress,
  ApplicationSettings,
} from '@/types/installation';

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
  }
}

export const db = new MusahitDatabase();
