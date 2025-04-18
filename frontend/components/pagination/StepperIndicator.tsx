import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

interface Props {
  numSteps: number;
  step: number;
  setStep: (step: number) => void;
  className?: string;
}

export function StepperIndicator({
  numSteps,
  step,
  setStep,
  className = '',
}: Props) {
  return (
    <div className={cn(className, 'flex justify-between items-center')}>
      {Array.from(Array(numSteps).keys()).map((idx) => (
        <div
          key={idx}
          className={idx !== numSteps - 1 ? 'w-full flex items-center' : ''}
        >
          <Button
            variant={idx <= step ? 'default' : 'outline'}
            size="icon"
            className={cn('rounded-full', idx <= step && 'hover:bg-primary')}
            onClick={() => setStep(idx)}
          >
            {idx < step ? <Check /> : idx + 1}
          </Button>
          {idx !== numSteps - 1 && (
            <Separator
              orientation="horizontal"
              className={cn(
                `w-3/4 h-0.5 border-2 transition-all`,
                idx < step && 'border-primary'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
