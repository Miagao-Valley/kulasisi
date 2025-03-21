import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegisterSchema } from '../RegisterForm';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';

interface Props {
  form: UseFormReturn<RegisterSchema, any, undefined>;
  className?: string;
}

export default function Contact({ form, className }: Props) {
  return (
    <div className={cn(className, 'flex flex-col gap-3')}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput label="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput label="Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
