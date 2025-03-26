import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FloatingInput = ({
  ref,
  className,
  ...props
}: InputProps & {
  ref?: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <Input
      placeholder=" "
      className={cn('peer', className)}
      ref={ref}
      {...props}
    />
  );
};
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Label> & {
  ref?: React.RefObject<React.ElementRef<typeof Label>>;
}) => {
  return (
    <Label
      className={cn(
        'peer-focus:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-muted-foreground font-normal duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text',
        className
      )}
      {...props}
    />
  );
};
FloatingLabel.displayName = 'FloatingLabel';

export type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = ({
  id,
  label,
  ...props
}: React.PropsWithoutRef<FloatingLabelInputProps>) => {
  return (
    <div className="relative">
      <FloatingInput id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  );
};
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingInput, FloatingLabel, FloatingLabelInput };
