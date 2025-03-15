'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Definition } from '@/types/dictionary';
import copyLinkToClipboard from '@/utils/copyLinkToClipboard';
import DeleteDefinitionModal from './DeleteDefinitionModal';
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
import { DefinitionRevisionsModal } from './DefinitionRevisions';

interface Props {
  definition: Definition;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DefinitionDropdownMenu({
  definition,
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
            onClick={() =>
              copyLinkToClipboard(
                `/dictionary/${definition.word.lang}/${definition.word.word}?tab=definitions#${definition.id}`
              )
            }
          >
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DefinitionRevisionsModal definition={definition} />
          </DropdownMenuItem>
          {auth.username === definition.contributor && (
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
                  <DeleteDefinitionModal
                    word={definition.word.word}
                    wordLang={definition.word.lang}
                    id={definition.id}
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
