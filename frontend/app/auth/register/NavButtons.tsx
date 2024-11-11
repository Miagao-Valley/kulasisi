import React from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  step: number;
  steps: string[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: any;
}

export default function NavButtons({ step, steps, setStep, formData }: Props) {
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        type="button"
        className="btn"
        onClick={handleBack}
        disabled={step === 0}
      >
        Back
      </button>
      {step === steps.length - 1 ? (
        <SubmitButton />
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNext}
          disabled={
            step === 0
              ? !(formData.username && formData.password)
              : step === 1
                ? !formData.email
                : step === 2
                  ? !(
                      formData.first_name &&
                      formData.last_name &&
                      formData.date_of_birth
                    )
                  : false
          }
        >
          Next
        </button>
      )}
    </div>
  );
}

interface SubmitButtonProps {
  disabled?: boolean;
}

function SubmitButton({ disabled = false }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-primary"
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? 'Signing up...' : 'Sign up'}
    </button>
  );
}
