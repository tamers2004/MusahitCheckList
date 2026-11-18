export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'musahit-theme';

const isTheme = (value: string | null): value is Theme =>
  value === 'dark' || value === 'light';

export const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : 'dark';
  } catch {
    return 'dark';
  }
};

export const applyTheme = (theme: Theme, persist = true): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      return;
    }
  }
};

export const initializeTheme = (): void => {
  applyTheme(getStoredTheme(), false);
};
