import * as React from 'react';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative w-full max-w-lg bg-card rounded-xl border border-border shadow-lg p-6 animate-in fade-in slide-in-from-top-4 duration-200">
        {title && (
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
        )}
        {description && (
          <p className="text-muted-foreground text-sm mb-6">{description}</p>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            ביטול
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export interface ToastProps {
  title: string;
  description?: string;
  onDismiss: () => void;
}

export const Toast = ({ title, description, onDismiss }: ToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div className="bg-card border border-border rounded-xl shadow-lg p-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <button
            onClick={onDismiss}
            className="ml-2 hover:text-destructive"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
