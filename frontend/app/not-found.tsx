import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center text-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
