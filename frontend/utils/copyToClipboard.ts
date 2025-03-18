import { toast } from 'sonner';

/**
 * Copy text to the clipboard and shows a success message.
 *
 * @param text - The text to be copied.
 * @param message - Message to display after text is copied.
 */
export default function copyToClipboard(
  text: string,
  message: string = 'Text copied to clipboard.'
) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (message) {
        toast.success(message);
      }
    })
    .catch((err) => {
      console.error('Error copying text: ', err);
      toast.error('Failed to copy text.');
    });
}
