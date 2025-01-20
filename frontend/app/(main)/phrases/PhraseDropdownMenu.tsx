'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Phrase, PhraseRevision } from '@/types/phrases';
import copyLinkToClipboard from '@/utils/copyLinkToClipboard';
import PhraseRevisionsList from './PhraseRevisionsList';
import DeletePhraseModal from './DeletePhraseModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Ellipsis } from 'lucide-react';

interface Props {
  phrase: Phrase;
  revisions: PhraseRevision[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PhraseDropdownMenu({
  phrase,
  revisions,
  setIsEditing,
}: Props) {
  const auth = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => copyLinkToClipboard(`/phrases/${phrase.id}/`)}
          >
            Copy link
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog>
              <DialogTrigger className="w-full text-left">Edits</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edits</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-96 pe-4">
                  <PhraseRevisionsList revisions={revisions} />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>

          {auth.username === phrase.contributor && (
            <>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialog>
                  <AlertDialogTrigger className="w-full text-left">
                    Delete
                  </AlertDialogTrigger>
                  <DeletePhraseModal id={phrase.id} />
                </AlertDialog>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
