'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { LangProficiencyLevel } from '@/types/languages';
import register from '@/lib/auth/register';
import GetStarted from './steps/GetStarted';
import Contact from './steps/Contact';
import Personal from './steps/Personal';
import Experience from './steps/Experience';
import NavButtons from './NavButtons';
import StepperIndicator from '@/components/StepperIndicator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormMessage } from '@/components/ui/form';
import setFormErrors from '@/utils/setFormErrors';

export interface RegisterInputs {
  username: string;
  password: string;
  email: string;
  phone_number: number;
  first_name: string,
  last_name: string,
  date_of_birth: Date,
  location: string,
  gender: string,
  language_proficiencies: { lang: string; level: LangProficiencyLevel }[],
}

const steps = [
  {
    name: 'Get Started',
    fields: ['username', 'password'],
  },
  {
    name: 'Contact',
    fields: ['email', 'phone_number'],
  },
  {
    name: 'Personal',
    fields: [
      'first_name',
      'last_name',
      'date_of_birth',
      'location',
      'gender',
    ]
  },
  {
    name: 'Experience',
    fields: ['language_proficiencies'],
  }
];

export default function RegisterForm() {
  const auth = useAuth();

  const [step, setStep] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    if (step >= steps.length - 1) {
      setReachedEnd(true);
    }
  }, [step]);

  const form = useForm<RegisterInputs>()
  const onSubmit: SubmitHandler<RegisterInputs> = async (data: RegisterInputs) => {
    const res = await register(data);
    if (res?.error) {
      setFormErrors(res.error, form.setError)

      // Goto step with error
      const errorKeys = Object.keys(res?.error)
      errorKeys.reverse().map(key => {
        steps.map((step, idx) => {
          if (step.fields.includes(key)) {
            setStep(idx)
          }
        })
      })
    } else {
      auth.updateAuth();
    }
    return res;
  };

  return (
    <div className="flex flex-col align-middle">
      <StepperIndicator className="mb-6" numSteps={steps.length} step={step} setStep={setStep} />

      <Form {...form}>
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
          <h1>{steps[step].name}</h1>

          <FormMessage>
            {form.formState.errors.root?.serverError.message}
          </FormMessage>

          <GetStarted form={form} className={step !== 0 ? '!hidden' : ''} />
          <Contact form={form} className={step !== 1 ? '!hidden' : ''} />
          <Personal form={form} className={step !== 2 ? '!hidden' : ''} />
          <Experience form={form} className={step !== 3 ? '!hidden' : ''} />

          <NavButtons step={step} numSteps={steps.length} setStep={setStep} reachedEnd={reachedEnd} form={form} />
        </form>
      </Form>
    </div>
  );
}