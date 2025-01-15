'use client';

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Definition, DefinitionRevision } from '@/types/dictionary';
import copyLinkToClipboard from '@/utils/copyLinkToClipboard';
import DefinitionRevisionsList from './DefinitionRevisionsList';
import DeleteDefinitionModal from './DeleteDefinitionModal';
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Ellipsis } from 'lucide-react';

interface Props {
  definition: Definition;
  revisions: DefinitionRevision[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DefinitionDropdownMenu({
  definition,
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
            onClick={() =>
              copyLinkToClipboard(
                `/dictionary/${definition.word}?tab=definitions#${definition.id}`,
              )
            }
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
                  <DefinitionRevisionsList revisions={revisions} />
                </ScrollArea>
              </DialogContent>
            </Dialog>
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
                    wordId={definition.word}
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
