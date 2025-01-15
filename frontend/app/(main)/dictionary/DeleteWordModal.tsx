'use client';

import React, { useState } from 'react';
import deleteWord from '@/lib/words/deleteWord';
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
  id: number;
}

export default function DeleteWordModal({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this entry.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
              await deleteWord(id);
              toast.success('Entry deleted');
            } catch (error) {
              console.error(error);
              toast.error('Failed to delete the entry');
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <LoadingButton
            variant="destructive"
            type="submit"
            loading={isLoading}
          >
            Delete
          </LoadingButton>
        </form>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
