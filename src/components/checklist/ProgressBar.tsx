import { cn } from '@/components/ui/cn';

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning';
}

export const ProgressBar = ({
  value,
  className,
  showLabel = false,
  size = 'md',
  variant = 'default',
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variants = {
    default: 'bg-gradient-to-l from-primary to-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  };

  const color =
    variant === 'default'
      ? clamped === 100
        ? variants.success
        : variants.default
      : variants[variant];

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn('w-full overflow-hidden rounded-full bg-secondary', sizes[size])}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', color)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{clamped}%</span>
        </div>
      )}
    </div>
  );
};
