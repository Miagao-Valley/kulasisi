import { Entry } from '@/types/core';
import { entryToPath } from '@/lib/utils/entryToPath';
import { copyToClipboard } from '@/lib/utils/copyToClipboard';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Share2Icon } from 'lucide-react';

interface Props {
  entry: Entry;
}

export function ShareButton({ entry }: Props) {
  const url = new URL(entryToPath(entry), process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-fit h-fit p-1 px-2 bg-transparent"
            >
              <Share2Icon className="size-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Share</TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Input
            type="text"
            value={url.href}
            readOnly
            className="w-full flex-1 px-2 py-1 border rounded-md text-sm"
          />
          <Button
            onClick={() =>
              copyToClipboard(url.href, 'Link copied to clipboard.')
            }
            className="w-full sm:w-fit"
          >
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
