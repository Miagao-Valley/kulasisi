'use client';

import React, { useState } from 'react';
import deleteDefinition from '@/lib/definitions/deleteDefinition';
import { LoadingButton } from '@/components/ui/loading-button';
import { toast } from 'sonner';
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

interface Props {
  wordLang: string;
  word: string;
  id: number;
}

export default function DeleteDefinitionModal({ wordLang, word, id }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          definition.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
              await deleteDefinition(wordLang, word, id);
              toast.success('Definition deleted');
            } catch (error) {
              console.error(error);
              toast.error('Failed to delete the definition');
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <LoadingButton
            variant="destructive"
            type="submit"
            className="w-full"
            loading={isLoading}
          >
            Delete
          </LoadingButton>
        </form>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
