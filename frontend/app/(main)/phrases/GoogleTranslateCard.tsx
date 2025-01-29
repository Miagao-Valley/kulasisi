import React from 'react';
import googleTranslate from '@/lib/phrases/googleTranslate';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { SiGoogletranslate } from 'react-icons/si';

interface Props {
  text: string;
  source: string;
  target: string;
  className?: string;
}

export default async function GoogleTranslateCard({
  text,
  source,
  target,
  className = '',
}: Props) {
  const data = await googleTranslate(text, source, target);

  if (data.error) {
    return;
  }

  return (
    <Card className={cn(className, `shadow-none'}`)}>
      <CardContent>
        <p className="text-base mb-2 whitespace-pre-line">
          <a
            href={data.google_translate_url || 'https://translate.google.com/'}
            target="_blank"
            className="hover:text-primary"
          >
            {data.translated || 'No translation from Google Translate.'}
          </a>
        </p>
        <div className="flex gap-2 items-center">
          <SiGoogletranslate className="text-muted-foreground" />
          <span className="flex gap-1 text-xs text-muted-foreground">
            Translation from
            <a
              href="https://translate.google.com/"
              target="_blank"
              className="font-bold hover:underline underline-offset-4"
            >
              Google Translate
            </a>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
