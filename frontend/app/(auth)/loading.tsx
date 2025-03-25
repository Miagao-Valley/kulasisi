import { AppSpinner } from '@/components/brand/app-spinner';

export default function Loading() {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2 justify-center items-center text-muted-foreground">
      <AppSpinner />
    </div>
  );
}
