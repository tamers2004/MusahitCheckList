import { create } from 'zustand';
import {
  Installation,
  InstallationFormData,
  TaskProgress,
  ApplicationSettings,
} from '@/types/installation';
import { installationRepository } from '@/db/installationRepository';

interface InstallationStore {
  // State
  installations: Installation[];
  currentInstallation: Installation | null;
  taskProgress: TaskProgress[];
  settings: ApplicationSettings | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setInstallations: (installations: Installation[]) => void;
  setCurrentInstallation: (installation: Installation | null) => void;
  setTaskProgress: (progress: TaskProgress[]) => void;
  setSettings: (settings: ApplicationSettings | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Installation actions
  createInstallation: (data: InstallationFormData) => Promise<string>;
  updateInstallation: (
    id: string,
    data: Partial<Omit<Installation, 'id' | 'createdAt'>>,
  ) => Promise<void>;
  deleteInstallation: (id: string) => Promise<void>;
  loadInstallations: () => Promise<void>;
  loadInstallationById: (id: string) => Promise<void>;

  // Task progress actions
  loadTaskProgress: (installationId: string) => Promise<void>;
  saveTaskProgress: (
    installationId: string,
    taskId: string,
    completed: boolean,
    notes?: string,
  ) => Promise<void>;
  saveTaskNotes: (installationId: string, taskId: string, notes: string) => Promise<void>;

  // Settings actions
  loadSettings: () => Promise<void>;
  saveSettings: (settings: Partial<ApplicationSettings>) => Promise<void>;

  // Export/Import
  exportData: () => Promise<string>;
  importData: (json: string) => Promise<void>;
}

export const useInstallationStore = create<InstallationStore>((set, get) => ({
  installations: [],
  currentInstallation: null,
  taskProgress: [],
  settings: null,
  isLoading: false,
  error: null,

  setInstallations: (installations) => set({ installations }),
  setCurrentInstallation: (installation) => set({ currentInstallation: installation }),
  setTaskProgress: (progress) => set({ taskProgress: progress }),
  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  loadInstallations: async () => {
    set({ isLoading: true, error: null });
    try {
      const installations = await installationRepository.getAll();
      set({ installations, isLoading: false });
    } catch (err) {
      set({ error: 'שגיאה בטעינת ההתקנות', isLoading: false });
    }
  },

  loadInstallationById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const installation = await installationRepository.getById(id);
      set({ currentInstallation: installation ?? null, isLoading: false });
      if (installation) {
        await get().loadTaskProgress(id);
      }
    } catch (err) {
      set({ error: 'שגיאה בטעינת פרטי ההתקנה', isLoading: false });
    }
  },

  createInstallation: async (data: InstallationFormData) => {
    set({ isLoading: true, error: null });
    try {
      const id = await installationRepository.create({
        ...data,
        status: 'in_progress',
      });
      await get().loadInstallations();
      await get().loadInstallationById(id);
      set({ isLoading: false });
      return id;
    } catch (err) {
      set({ error: 'שגיאה ביצירת התקנה חדשה', isLoading: false });
      throw err;
    }
  },

  updateInstallation: async (id, data) => {
    try {
      await installationRepository.update(id, data);
      await get().loadInstallations();
      if (get().currentInstallation?.id === id) {
        await get().loadInstallationById(id);
      }
    } catch (err) {
      set({ error: 'שגיאה בעדכון ההתקנה' });
    }
  },

  deleteInstallation: async (id) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את ההתקנה? פעולה זו לא ניתנת לביטול.')) {
      return;
    }
    set({ isLoading: true, error: null });
    try {
      await installationRepository.delete(id);
      await get().loadInstallations();
      if (get().currentInstallation?.id === id) {
        set({ currentInstallation: null });
      }
      set({ isLoading: false });
    } catch (err) {
      set({ error: 'שגיאה במחיקת ההתקנה', isLoading: false });
    }
  },

  loadTaskProgress: async (installationId: string) => {
    try {
      const progress = await installationRepository.getProgress(installationId);
      set({ taskProgress: progress });
    } catch (err) {
      set({ error: 'שגיאה בטעינת התקדמות המשימות' });
    }
  },

  saveTaskProgress: async (installationId, taskId, completed, notes) => {
    try {
      await installationRepository.saveTaskProgress(
        installationId,
        taskId,
        completed,
        notes,
      );
      await get().loadTaskProgress(installationId);
    } catch (err) {
      set({ error: 'שגיאה בשמירת התקדמות המשימה' });
    }
  },

  saveTaskNotes: async (installationId, taskId, notes) => {
    try {
      await installationRepository.saveTaskNotes(
        installationId,
        taskId,
        notes,
      );
    } catch (err) {
      set({ error: 'שגיאה בשמירת ההערות' });
    }
  },

  loadSettings: async () => {
    try {
      const settings = await installationRepository.getSettings();
      set({ settings });
    } catch (err) {
      set({ error: 'שגיאה בטעינת ההגדרות' });
    }
  },

  saveSettings: async (settings) => {
    try {
      await installationRepository.saveSettings(settings);
      await get().loadSettings();
    } catch (err) {
      set({ error: 'שגיאה בשמירת ההגדרות' });
    }
  },

  exportData: async () => {
    try {
      const data = await installationRepository.exportAll();
      return JSON.stringify(data, null, 2);
    } catch (err) {
      set({ error: 'שגיאה ביצוא הנתונים' });
      throw err;
    }
  },

  importData: async (json) => {
    set({ isLoading: true, error: null });
    try {
      const data = JSON.parse(json);
      await installationRepository.importAll(data);
      await get().loadInstallations();
      await get().loadSettings();
      set({ isLoading: false });
    } catch (err) {
      set({ error: 'שגיאה בייבוא הנתונים', isLoading: false });
      throw err;
    }
  },
}));
