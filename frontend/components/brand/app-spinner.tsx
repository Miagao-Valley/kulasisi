import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { BaybayinWa } from './baybayin-wa';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva(
  'motion-preset-spin motion-duration-1000 motion-ease-in-out',
  {
    variants: {
      size: {
        small: 'size-6',
        medium: 'size-8',
        large: 'size-12',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function AppSpinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <BaybayinWa className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
