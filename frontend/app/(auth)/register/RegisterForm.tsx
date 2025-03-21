'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { LangProficiencyLevel } from '@/types/languages';
import { Gender } from '@/types/users';
import register from '@/lib/auth/register';
import GetStarted from './steps/GetStarted';
import Contact from './steps/Contact';
import Personal from './steps/Personal';
import Experience from './steps/Experience';
import NavButtons from './NavButtons';
import StepperIndicator from '@/components/pagination/StepperIndicator';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormMessage } from '@/components/ui/form';
import { H1 } from '@/components/ui/heading-with-anchor';
import Logo from '@/components/brand/logo';

const FORM_DATA_KEY = 'register-form';

const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(150, 'Username must be 150 characters or fewer')
    .regex(
      /^[\w.@+-]+$/,
      'Username can only contain letters, digits, and @/./+/-/_'
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128, 'Password must be 128 characters or fewer'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone_number: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits')
    .optional(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.date(),
  location: z.string().min(1, 'Location is required'),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: 'Invalid gender selection' }),
  }),
  language_proficiencies: z.array(
    z.object({
      lang: z.string(),
      level: z.nativeEnum(LangProficiencyLevel, {
        errorMap: () => ({ message: 'Invalid level' }),
      }),
    })
  ),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

const steps = [
  { name: 'Get Started', fields: ['username'] },
  { name: 'Contact', fields: ['email', 'phone_number'] },
  {
    name: 'Personal',
    fields: ['first_name', 'last_name', 'date_of_birth', 'location', 'gender'],
  },
  { name: 'Experience', fields: ['language_proficiencies'] },
];

export default function RegisterForm() {
  const router = useRouter();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialStep = Math.max(Number(searchParams.get('step')) || 1, 1) - 1;
  const [step, setStep] = useState(initialStep);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    if (step >= steps.length - 1) setReachedEnd(true);
  }, [step]);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      language_proficiencies: [
        { lang: 'tgl', level: LangProficiencyLevel.LimitedWorking },
      ],
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      delete parsedData.password;
      if (parsedData.date_of_birth) {
        parsedData.date_of_birth = new Date(parsedData.date_of_birth);
      }
      form.reset(parsedData);
    }
  }, [form]);

  async function onSubmit(data: RegisterSchema) {
    const res = await register(data);

    if (res?.error) {
      setFormErrors(res.error, form.setError);
      const errorKeys = Object.keys(res.error);

      errorKeys.reverse().forEach((key) => {
        steps.forEach((step, idx) => {
          if (step.fields.includes(key)) {
            setStep(idx);
            router.push(`${pathname}?step=${idx + 1}`, { scroll: false });
          }
        });
      });
    } else {
      auth.updateAuth();
      auth.updateUser();
      router.push('/');
      localStorage.removeItem(FORM_DATA_KEY);
    }
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      const data = { ...value };
      delete data.password;
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    router.push(`${pathname}?step=${step + 1}`, { scroll: false });
  }, [step, pathname, router]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
        <Link href="/" className="flex flex-col items-center">
          <Logo className="w-12 mb-4" />
          <span className="sr-only">kulasisi</span>
        </Link>
        <h1 className="text-xl font-bold">Welcome to kulasisi</h1>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login/" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>

      <StepperIndicator numSteps={steps.length} step={step} setStep={setStep} />
      <H1 className="m-0">{steps[step].name}</H1>

      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormMessage>
            {form.formState.errors.root?.serverError?.message}
          </FormMessage>

          <GetStarted form={form} className={step !== 0 ? '!hidden' : ''} />
          <Contact form={form} className={step !== 1 ? '!hidden' : ''} />
          <Personal form={form} className={step !== 2 ? '!hidden' : ''} />
          <Experience form={form} className={step !== 3 ? '!hidden' : ''} />

          <NavButtons
            step={step}
            numSteps={steps.length}
            setStep={setStep}
            reachedEnd={reachedEnd}
            form={form}
          />
        </form>
      </Form>
    </div>
  );
}
