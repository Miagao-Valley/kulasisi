'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Definition } from '@/types/dictionary';
import { DeleteDefinitionModal } from './DeleteDefinitionModal';
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
  setIsEditing: (isEditing: boolean) => void;
}

export function DefinitionDropdownMenu({ definition, setIsEditing }: Props) {
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
            <DefinitionRevisionsModal definition={definition} />
          </DropdownMenuItem>

          {auth.user?.username === definition.contributor && (
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
