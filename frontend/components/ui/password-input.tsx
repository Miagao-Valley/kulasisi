'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  FloatingLabelInput,
  type FloatingLabelInputProps,
} from '@/components/ui/floating-label-input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const PasswordInput = ({ className, ...props }: FloatingLabelInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const disabledToggle =
    props.value === '' || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <FloatingLabelInput
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle pe-10', className)}
        {...props}
      />

      {/* Toggle password visibility */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabledToggle}
      >
        {showPassword && !disabledToggle ? (
          <EyeIcon className="size-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="size-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? 'Hide password' : 'Show password'}
        </span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
    </div>
  );
};
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
