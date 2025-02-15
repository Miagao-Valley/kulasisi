/**
 * Paste text from the clipboard and trigger a callback with the text.
 *
 * @param onPaste - The callback function that will be called with the clipboard text.
 */
export default async function pasteFromClipboard(
  onPaste: (clipboardText: string) => void
) {
  try {
    const clipboardText = await navigator.clipboard.readText();
    onPaste(clipboardText);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
