import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="p-3 flex justify-center items-center">
      <Spinner size="large" />
    </div>
  );
}
