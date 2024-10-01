import { API_BASE_URL } from '@/constants';

export default async function fetcher(
  endpoint: string,
  options: RequestInit = {},
  baseUrl: string = API_BASE_URL
): Promise<any> {
  const url = new URL(endpoint, baseUrl);

  try {
    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`${response.status}: ${errorBody}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    return response;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
}
