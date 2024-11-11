'use client';

import React, { useEffect, useState } from 'react';
import { Lang, LangProficiencyLevel, User } from '@/types';
import LanguageProficienciesForm from '@/app/auth/register/steps/LanguageProficienciesForm';
import getLangs from '@/lib/langs/getLangs';
import { useAuth } from '@/app/components/AuthProvider';
import { useFormState, useFormStatus } from 'react-dom';
import updateUser from '@/lib/users/updateUser';

interface Props {
  user: User;
}

export default function LanguagesTab({ user }: Props) {
  const auth = useAuth();

  const [langs, setLangs] = useState<Lang[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<
    { lang: string; level: LangProficiencyLevel }[]
  >(user.language_proficiencies || []);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results);
    };

    fetchLangs();
  }, []);

  const handleLanguageSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    lang: string,
  ) => {
    if (event.target.checked) {
      setSelectedLanguages((prev) => [
        ...prev,
        { lang, level: 1 as LangProficiencyLevel },
      ]);
    } else {
      setSelectedLanguages((prev) => prev.filter((item) => item.lang !== lang));
    }
  };

  const handleSubmit = async () => {
    const dataToSend = { language_proficiencies: selectedLanguages };

    const res = await updateUser(user.username, dataToSend);

    return res;
  };

  const [, formAction] = useFormState(handleSubmit, null);

  const handleRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    lang: string,
  ) => {
    const level = parseInt(event.target.value) as LangProficiencyLevel;
    setSelectedLanguages((prev) =>
      prev.map((item) => (item.lang === lang ? { ...item, level } : item)),
    );
  };

  return (
    <>
      <form action={formAction} className="flex flex-col gap-5">
        <LanguageProficienciesForm
          langs={langs}
          selectedLanguages={selectedLanguages}
          handleLanguageSelection={handleLanguageSelection}
          handleRangeChange={handleRangeChange}
          disabled={!(auth.isAuthenticated && auth.username === user.username)}
        />
        {auth.isAuthenticated && auth.username === user.username && (
          <div className="flex">
            <SubmitButton className="ms-auto" />
          </div>
        )}
      </form>
    </>
  );
}

interface SubmitButtonProps {
  disabled?: boolean;
  className?: string;
}

function SubmitButton({ disabled = false, className = '' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}
