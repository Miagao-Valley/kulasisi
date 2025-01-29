import { API_BASE_URL } from '@/constants';

/**
 * Custom error class to handle fetch errors with status and response body.
 */
export class FetchError extends Error {
  public status: number;
  public resBody: any;

  /**
   * Creates a new FetchError instance.
   *
   * @param message - The error message.
   * @param status - The HTTP status code of the error.
   * @param resBody - The response body associated with the error.
   */
  constructor(message: string, status: number, resBody: any) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.resBody = resBody;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * A utility function to make HTTP requests with error handling and response parsing.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @param options - Optional request options such as headers, method, etc.
 * @param token - Optional bearer token for authentication.
 * @param baseUrl - The base URL of the API (defaults to `API_BASE_URL`).
 * @returns The parsed response data (if JSON), or the raw response.
 * @throws FetchError - If the request fails with a non-2xx status.
 */
export default async function fetcher(
  endpoint: string,
  options: RequestInit = {},
  token: string = '',
  baseUrl: string = API_BASE_URL,
): Promise<any> {
  const url = new URL(endpoint, baseUrl); // Construct the full URL

  // Add Authorization header when token is provided
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const res = await fetch(url.toString(), options);

  // If the response is not OK, throw a FetchError
  if (!res.ok) {
    let resBody;
    try {
      resBody = await res.json();
    } catch {
      resBody = 'Unable to parse response';
    }
    throw new FetchError(
      `${res.status} error while fetching ${url}: ${resBody}`,
      res.status,
      resBody,
    );
  }

  // Check if the response is JSON and parse it accordingly
  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return await res.json();
  }

  return res; // Return the raw response if not JSON
}
