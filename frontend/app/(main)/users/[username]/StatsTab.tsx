'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { LangProficiencyLevel } from '@/types/languages';
import { User } from '@/types/users';
import updateUser from '@/lib/users/updateUser';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import LangProficienciesForm from '@/components/forms/LangProficienciesForm';
import { LoadingButton } from '@/components/ui/loading-button';
import setFormErrors from '@/utils/setFormErrors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { H3 } from '@/components/ui/heading-with-anchor';

interface LangProficienciesInputs {
  language_proficiencies: { lang: string; level: LangProficiencyLevel }[];
}
interface Props {
  user: User;
}

export default function StatsTab({ user }: Props) {
  const auth = useAuth();

  const form = useForm<LangProficienciesInputs>();
  const onSubmit: SubmitHandler<LangProficienciesInputs> = async (
    data: LangProficienciesInputs,
  ) => {
    const res = await updateUser(user.username, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    }
    return res;
  };

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
              defaultValue={user.language_proficiencies}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LangProficienciesForm
                      selectedLangProficiencies={field.value}
                      setSelectedLangProficiencies={(value) =>
                        form.setValue('language_proficiencies', value)
                      }
                      disabled={
                        !auth.isAuthenticated || auth.username !== user.username
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {auth.isAuthenticated && auth.username === user.username && (
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
