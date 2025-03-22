import { fetchAPI } from '@/utils/fetchAPI';
import { Result } from '@/utils/try-catch';

export default async function googleTranslate(
  text: string,
  source: string,
  target: string
): Promise<
  Result<
    {
      text: string;
      original: string;
      translated: string;
      google_translate_url: string;
    },
    any
  >
> {
  return await fetchAPI(`/phrases/google-translate/`, {
    method: 'POST',
    body: JSON.stringify({
      text,
      source,
      target,
    }),
  });
}
