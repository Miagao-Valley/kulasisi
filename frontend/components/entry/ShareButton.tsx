import React from 'react';
import path from 'path';
import { BASE_URL } from '@/constants';
import { Entry } from '@/types/core';
import entryToUrl from '@/utils/entryToUrl';
import copyToClipboard from '@/utils/copyToClipboard';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '../ui/tooltip';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Share2Icon } from 'lucide-react';

interface Props {
  entry: Entry;
}

export default function ShareButton({ entry }: Props) {
  const url = path.join(BASE_URL, entryToUrl(entry));

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-fit h-fit p-1 px-2 bg-transparent"
              >
                <Share2Icon className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Share</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Input
            type="text"
            value={url}
            readOnly
            className="w-full flex-1 px-2 py-1 border rounded-md text-sm"
          />
          <Button
            onClick={() => copyToClipboard(url, 'Link copied to clipboard.')}
            className="w-full sm:w-fit"
          >
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
