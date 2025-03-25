'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';

export function CallToAction() {
  return (
    <div className="my-8 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-3xl md:text-4xl font-bold text-center md:text-left motion-preset-slide-up">
        Join now and <br /> help us grow!
      </div>

      <div className="flex gap-1 items-center motion-preset-slide-up motion-delay-200">
        <Button className="w-full" size="lg" asChild>
          <Link
            href="/register/"
            className="flex items-center text-xl font-bold"
          >
            <SendIcon />
            Sign up
          </Link>
        </Button>
      </div>
    </div>
  );
}
