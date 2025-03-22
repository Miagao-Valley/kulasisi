'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Translation } from '@/types/phrases';
import { TranslationRevisionsModal } from './TranslationRevisions';
import DeleteTranslationModal from './DeleteTranslationModal';
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
  translation: Translation;
  setIsEditing: (isEditing: boolean) => void;
}

export default function TranslationDropdownMenu({
  translation,
  setIsEditing,
}: Props) {
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
            <TranslationRevisionsModal translation={translation} />
          </DropdownMenuItem>

          {auth.user?.username === translation.contributor && (
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
                  <DeleteTranslationModal
                    phraseId={translation.phrase}
                    id={translation.id}
                  />
                </AlertDialog>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
