import fetcher, { FetchError } from '@/utils/fetcher';

export default async function googleTranslate(
  text: string, source: string, target: string
) {
  let res = null;
  try {
    const query = new URLSearchParams({
      text,
      sl: source,
      tl: target,
    });


    res = await fetcher(`/phrases/google-translate?${query.toString()}`,);
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  return res;
}
