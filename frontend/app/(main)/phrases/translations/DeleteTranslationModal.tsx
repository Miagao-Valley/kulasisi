'use client';

import { useState } from 'react';
import deleteTranslation from '@/lib/translations/deleteTranslation';
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
  phraseId: number;
  id: number;
}

export default function DeleteTranslationModal({ phraseId, id }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          translation.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
              await deleteTranslation(phraseId, id);
              toast.success('Translation deleted');
            } catch (error) {
              console.error(error);
              toast.error('Failed to delete the translation');
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
