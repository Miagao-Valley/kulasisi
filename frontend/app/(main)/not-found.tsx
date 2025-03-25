import Link from 'next/link';
import { Metadata } from 'next';
import { AppLogo } from '@/components/brand/app-logo';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center text-center">
      <Link href="/" className="flex flex-col items-center">
        <AppLogo className="w-10 mb-4 motion-preset-seesaw-lg" />
        <span className="sr-only">kulasisi</span>
      </Link>

      <h2 className="text-4xl font-bold mb-0">Page Not Found</h2>

      <p>uh-oh! Nothing Here...</p>

      <Button className="my-4" asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
