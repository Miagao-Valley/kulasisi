'use client';

import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { Lang, LangProficiencyLevel } from '@/types';
import register from '@/lib/auth/register';
import getLangs from '@/lib/langs/getLangs';
import GetStarted from './steps/GetStarted';
import Contact from './steps/Contact';
import Personal from './steps/Personal';
import Experience from './steps/Experience';
import NavButtons from './NavButtons';

export default function RegisterForm() {
  const auth = useAuth();

  const steps = ['Get Started', 'Contact', 'Personal', 'Experience'];
  const [step, setStep] = useState(0);

  const [langs, setLangs] = useState<Lang[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<
    { lang: string; level: LangProficiencyLevel }[]
  >([{ lang: 'tgl', level: 3 }]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    location: '',
    gender: '',
  });

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results);
    };

    fetchLangs();
  }, []);

  const handleSubmit = async () => {
    const dataToSend = {
      ...formData,
      language_proficiencies: selectedLanguages,
    };

    const res = await register(dataToSend);
    auth.updateAuth();

    return res;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLanguageSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    lang: string
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

  const handleRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    lang: string
  ) => {
    const level = parseInt(event.target.value) as LangProficiencyLevel;
    setSelectedLanguages((prev) =>
      prev.map((item) => (item.lang === lang ? { ...item, level } : item))
    );
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  useEffect(() => {
    if (formState?.error) {
      const errorKeys = Object.keys(formState.error);
      for (const key of errorKeys) {
        switch (true) {
          case ['username', 'password'].includes(key):
            setStep(0);
            break;
          case ['email', 'phone_number'].includes(key):
            setStep(1);
            break;
          case [
            'first_name',
            'last_name',
            'date_of_birth',
            'location',
            'gender',
          ].includes(key):
            setStep(2);
            break;
          case key === 'language_proficiencies':
            setStep(3);
            break;
          default:
            break;
        }
      }
    }
  }, [formState?.error]);

  return (
    <div className="flex flex-col align-middle">
      <ul className="steps mb-8">
        {steps.map((step_name, index) => (
          <li
            className={`hover:cursor-pointer step ${
              index <= step ? 'step-primary' : ''
            }`}
            key={index}
            onClick={() => setStep(index)}
          >
            {step_name}
          </li>
        ))}
      </ul>
      <form className="flex flex-col gap-3" action={formAction}>
        {formState?.error?.detail && (
          <div role="alert" className="text-sm text-error">
            {formState.error.detail}
          </div>
        )}
        {formState?.error?.non_field_errors && (
          <div role="alert" className="text-sm text-error">
            {formState.error.non_field_errors[0]}
          </div>
        )}
        {step === 0 && (
          <GetStarted
            formData={formData}
            formState={formState}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 1 && (
          <Contact
            formData={formData}
            formState={formState}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 2 && (
          <Personal
            formData={formData}
            formState={formState}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 3 && (
          <Experience
            langs={langs}
            selectedLanguages={selectedLanguages}
            handleLanguageSelection={handleLanguageSelection}
            handleRangeChange={handleRangeChange}
          />
        )}
        <NavButtons
          step={step}
          steps={steps}
          setStep={setStep}
          formData={formData}
        />
        <p className="flex gap-1">
          Already have an account?
          <Link className="link text-primary link-hover" href={`login`}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
