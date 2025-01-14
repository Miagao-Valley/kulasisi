import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegisterInputs } from '../RegisterForm';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { PasswordInput } from '@/components/ui/password-input';

interface Props {
  form: UseFormReturn<RegisterInputs, any, undefined>;
  className?: string;
}

export default function GetStarted({ form, className }: Props) {
  return (
    <div className={cn(className, 'flex flex-col gap-3')}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput label="Username" autoFocus {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <PasswordInput label="Password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
