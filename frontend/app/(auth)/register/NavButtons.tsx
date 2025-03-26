'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegisterSchema } from '@/lib/schemas/auth';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface Props {
  numSteps: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  reachedEnd: boolean;
  form: UseFormReturn<RegisterSchema>;
}

export function NavButtons({
  step,
  numSteps,
  setStep,
  reachedEnd,
  form,
}: Props) {
  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      <Button
        variant="ghost"
        type="button"
        onClick={() => setStep(step - 1)}
        disabled={step === 0}
      >
        <ChevronLeftIcon />
      </Button>

      {reachedEnd && (
        <LoadingButton
          className="flex-1"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Sign up
        </LoadingButton>
      )}

      <Button
        variant="outline"
        type="button"
        onClick={() => setStep(step + 1)}
        disabled={step === numSteps - 1}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
