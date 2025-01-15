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
import LanguageProficienciesForm from '@/components/LangProficienciesForm';
import { H3 } from '@/components/ui/heading-with-anchor';

interface Props {
  form: UseFormReturn<RegisterInputs, any, undefined>;
  className?: string;
}

export default function Experience({ form, className }: Props) {
  return (
    <div className={cn(className, 'flex flex-col gap-3')}>
      <H3 className="!text-base m-0">
        Language Proficiency
      </H3>
      <FormField
        control={form.control}
        name="language_proficiencies"
        defaultValue={[{ lang: 'tgl', level: 2 }]}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <LanguageProficienciesForm
                selectedLangProficiencies={field.value}
                setSelectedLangProficiencies={(value) =>
                  form.setValue('language_proficiencies', value)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
