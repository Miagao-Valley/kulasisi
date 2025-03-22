'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import {
  langProficienciesSchema,
  LangProficienciesSchema,
} from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import updateLangProficiencies from '@/lib/users/updateLangProficiencies';
import { User } from '@/types/users';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import LangProficienciesForm from '@/components/forms/LangProficienciesForm';
import { H3 } from '@/components/ui/heading-with-anchor';
import { LoadingButton } from '@/components/ui/loading-button';

interface Props {
  user: User;
}

export default function StatsTab({ user }: Props) {
  const auth = useAuth();

  const form = useForm<LangProficienciesSchema>({
    resolver: zodResolver(langProficienciesSchema),
    defaultValues: {
      language_proficiencies: user.language_proficiencies,
    },
  });

  async function onSubmit(formData: LangProficienciesSchema) {
    const { data, error } = await updateLangProficiencies(
      user.username,
      formData
    );
    if (error) {
      setFormErrors(error, form.setError);
    }
    auth.updateUser();
    return { data, error };
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <H3 className="!text-lg" anchor="language-proficiency">
          Language Proficiency
        </H3>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormMessage>
              {form.formState.errors.root?.serverError.message}
            </FormMessage>
            <FormField
              control={form.control}
              name="language_proficiencies"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LangProficienciesForm
                      selectedLangProficiencies={field.value}
                      setSelectedLangProficiencies={(value) =>
                        form.setValue('language_proficiencies', value)
                      }
                      disabled={
                        !auth.isAuthenticated ||
                        auth.user?.username !== user.username
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {auth.isAuthenticated && auth.user?.username === user.username && (
              <div className="flex">
                <LoadingButton
                  type="submit"
                  className="ms-auto"
                  loading={form.formState.isSubmitting}
                >
                  Save
                </LoadingButton>
              </div>
            )}
          </form>
        </Form>
      </div>

      <div>
        <H3 className="!text-lg" anchor="contribution">
          Contribution
        </H3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-semibold">{user.reputation}</span>
            <span>Reputation</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user.vote_count}</span>
            <span>Votes</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user.phrase_count}</span>
            <span>Phrases</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user.translation_count}</span>
            <span>Translations</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user.word_count}</span>
            <span>Words</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user.definition_count}</span>
            <span>Definitions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
