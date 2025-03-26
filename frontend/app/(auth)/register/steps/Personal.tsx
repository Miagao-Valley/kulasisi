import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Gender } from '@/types/users';
import { displayGender } from '@/lib/utils/displayGender';
import { RegisterSchema } from '@/lib/schemas/auth';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateTimePicker } from '@/components/ui/datetime-picker';

interface Props {
  form: UseFormReturn<RegisterSchema>;
  className?: string;
}

export function Personal({ form, className }: Props) {
  return (
    <div className={cn(className, 'flex flex-col gap-3')}>
      <div className="flex flex-col sm:flex-row gap-2">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FloatingLabelInput label="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="date_of_birth"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <DateTimePicker
                value={field.value}
                onChange={field.onChange}
                granularity="day"
                placeholder="What's your birthday?"
                displayFormat={{ hour24: 'PPP', hour12: 'PP' }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput label="Location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(Gender).map((value) => (
                  <SelectItem key={value} value={value}>
                    {displayGender(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
