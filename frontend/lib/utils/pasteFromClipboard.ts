import { toast } from 'sonner';

/**
 * Paste text from the clipboard and trigger a callback with the text.
 *
 * @param onPaste - The callback function that will be called with the clipboard text.
 * @param message - Message to display after text is pasted.
 */
export default async function pasteFromClipboard(
  onPaste: (clipboardText: string) => void,
  message: string = 'Text pasted from clipboard.'
) {
  try {
    const clipboardText = await navigator.clipboard.readText();
    onPaste(clipboardText);
    if (message) toast.success(message);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
    toast.error('Failed to paste text.');
  }
}
