'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Word } from '@/types/dictionary';
import { WordRevisionsModal } from './WordRevisions';
import DeleteWordModal from './DeleteWordModal';
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
  word: Word;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WordDropdownMenu({ word, setIsEditing }: Props) {
  const auth = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-fit h-fit p-1">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <WordRevisionsModal word={word} />
          </DropdownMenuItem>

          {auth.username === word.contributor && (
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
                  <DeleteWordModal lang={word.lang} word={word.word} />
                </AlertDialog>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
