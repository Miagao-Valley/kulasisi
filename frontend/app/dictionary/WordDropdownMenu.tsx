'use client'

import React from 'react'
import { useAuth } from '@/components/AuthProvider';
import { Word, WordRevision } from '@/types/dictionary';
import copyLinkToClipboard from '@/utils/copyLinkToClipboard';
import WordRevisionsList from './WordRevisionsList';
import DeleteWordModal from './DeleteWordModal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Ellipsis } from 'lucide-react';

interface Props {
  word: Word,
  revisions: WordRevision[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function WordDropdownMenu({ word, revisions, setIsEditing }: Props) {
  const auth = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon"><Ellipsis /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" onClick={() => copyLinkToClipboard(`/dictionary/${word.id}/`)}>
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
                    <WordRevisionsList revisions={revisions} />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
          </DropdownMenuItem>
          {auth.username === word.contributor && (
            <>
              <DropdownMenuItem className="hover:cursor-pointer" onClick={() => setIsEditing(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialog>
                  <AlertDialogTrigger className="w-full text-left">Delete</AlertDialogTrigger>
                  <DeleteWordModal id={word.id} />
                </AlertDialog>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
