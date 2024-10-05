import { API_BASE_URL } from '@/constants';
import { FetchError } from '@/types';

export default async function fetcher(
  endpoint: string,
  options: RequestInit = {},
  baseUrl: string = API_BASE_URL
): Promise<any> {
  const url = new URL(endpoint, baseUrl);

  try {
    const res = await fetch(url.toString(), options);

    if (!res.ok) {
      const resBody = await res.json();
      const error: FetchError = new Error(
        `Fetching ${url}: ${res.status}: ${JSON.stringify(resBody)}`
      );
      error.info = resBody;
      error.status = res.status;
      throw error;
    }

    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await res.json();
    }

    return res;
  } catch (error) {
    throw new Error(`Fetching ${url}: ${(error as Error).message}`);
  }
}
