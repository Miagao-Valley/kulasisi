import fetcher, { FetchError } from '@/utils/fetcher';

export default async function googleTranslate(
  text: string,
  source: string,
  target: string,
) {
  let res = null;
  try {
    const body = JSON.stringify({
      text,
      source,
      target,
    });

    res = await fetcher('/phrases/google-translate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  return res;
}
