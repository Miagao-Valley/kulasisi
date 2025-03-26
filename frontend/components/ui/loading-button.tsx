import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { buttonVariants } from './button';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const LoadingButton = ({
  ref,
  className,
  loading = false,
  children,
  disabled,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>;
}) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'flex items-center justify-center gap-1',
        buttonVariants({ variant, size, className })
      )}
      ref={ref}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      <Slottable>{children}</Slottable>
    </Comp>
  );
};
LoadingButton.displayName = 'LoadingButton';

export { LoadingButton };
