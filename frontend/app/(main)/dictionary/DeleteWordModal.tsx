'use client';

import { useState } from 'react';
import { deleteWord } from '@/lib/words/deleteWord';
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
  lang: string;
  word: string;
}

export function DeleteWordModal({ lang, word }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this word.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
              await deleteWord(lang, word);
              toast.success('Word deleted');
            } catch (error) {
              console.error(error);
              toast.error('Failed to delete the word');
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
