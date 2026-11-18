import { db } from './database';
import {
  Installation,
  TaskProgress,
  ApplicationSettings,
  ExportData,
} from '@/types/installation';

const now = () => new Date().toISOString();

export const installationRepository = {
  async getAll(): Promise<Installation[]> {
    return db.installations.orderBy('createdAt').reverse().toArray();
  },

  async getById(id: string): Promise<Installation | undefined> {
    return db.installations.get(id);
  },

  async create(data: Omit<Installation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = crypto.randomUUID();
    const installation: Installation = {
      ...data,
      id,
      createdAt: now(),
      updatedAt: now(),
    };
    await db.installations.add(installation);
    return id;
  },

  async update(
    id: string,
    data: Partial<Omit<Installation, 'id' | 'createdAt'>>,
  ): Promise<void> {
    await db.installations.update(id, { ...data, updatedAt: now() });
  },

  async delete(id: string): Promise<void> {
    await db.installations.delete(id);
    await db.taskProgress.where('installationId').equals(id).delete();
  },

  async getProgress(installationId: string): Promise<TaskProgress[]> {
    return db.taskProgress.where('installationId').equals(installationId).toArray();
  },

  async saveTaskProgress(
    installationId: string,
    taskId: string,
    completed: boolean,
    notes?: string,
  ): Promise<void> {
    const existing = await db.taskProgress
      .where('installationId')
      .equals(installationId)
      .and((tp) => tp.taskId === taskId)
      .first();

    if (existing) {
      await db.taskProgress.update(existing.id, {
        completed,
        completedAt: completed ? now() : null,
        notes: notes ?? existing.notes,
      });
    } else {
      await db.taskProgress.add({
        id: crypto.randomUUID(),
        installationId,
        taskId,
        completed,
        completedAt: completed ? now() : null,
        notes: notes ?? '',
      });
    }
  },

  async saveTaskNotes(
    installationId: string,
    taskId: string,
    notes: string,
  ): Promise<void> {
    const existing = await db.taskProgress
      .where('installationId')
      .equals(installationId)
      .and((tp) => tp.taskId === taskId)
      .first();

    if (existing) {
      await db.taskProgress.update(existing.id, { notes });
    } else {
      await db.taskProgress.add({
        id: crypto.randomUUID(),
        installationId,
        taskId,
        completed: false,
        completedAt: null,
        notes,
      });
    }
  },

  async getSettings(): Promise<ApplicationSettings | undefined> {
    return db.settings.get('default');
  },

  async saveSettings(settings: Partial<ApplicationSettings>): Promise<void> {
    const existing = await db.settings.get('default');
    if (existing) {
      await db.settings.update('default', settings);
    } else {
      await db.settings.add({
        id: 'default',
        theme: 'dark',
        defaultTechnician: '',
        preferences: {},
        ...settings,
      } as ApplicationSettings);
    }
  },

  async exportAll(): Promise<ExportData> {
    const installations = await this.getAll();
    const taskProgress = await db.taskProgress.toArray();
    const settings = await this.getSettings();

    return {
      installations,
      taskProgress,
      settings: settings!,
      exportedAt: now(),
      version: '1.0.0',
    };
  },

  async importAll(data: ExportData): Promise<void> {
    await db.installations.clear();
    await db.taskProgress.clear();

    if (data.installations.length > 0) {
      await db.installations.bulkAdd(data.installations);
    }

    if (data.taskProgress.length > 0) {
      await db.taskProgress.bulkAdd(data.taskProgress);
    }

    if (data.settings) {
      await this.saveSettings(data.settings);
    }
  },
};
