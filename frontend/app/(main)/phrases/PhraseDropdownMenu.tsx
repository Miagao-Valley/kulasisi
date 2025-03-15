'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Phrase } from '@/types/phrases';
import copyLinkToClipboard from '@/utils/copyLinkToClipboard';
import { PhraseRevisionsModal } from './PhraseRevisions';
import DeletePhraseModal from './DeletePhraseModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Ellipsis } from 'lucide-react';

interface Props {
  phrase: Phrase;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PhraseDropdownMenu({ phrase, setIsEditing }: Props) {
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
            <PhraseRevisionsModal phrase={phrase} />
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
