import { toast } from 'sonner';

export default function copyLinkToClipboard(url: string, base: string = window.location.origin) {
  const link = `${base}/${url}`;
  navigator.clipboard.writeText(link);
  toast.success('Link copied to clipboard');
};