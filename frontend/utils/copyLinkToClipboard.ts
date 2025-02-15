import copyToClipboard from './copyToClipboard';

/**
 * Copies a generated URL to the clipboard and shows a success message.
 *
 * @param url - The URL or path to append to the base URL.
 * @param base - The base URL (defaults to the current window's origin).
 */
export default function copyLinkToClipboard(
  url: string,
  base: string = window.location.origin
) {
  const link = `${base}/${url}`;

  copyToClipboard(link, 'Link copied to clipboard.');
}
