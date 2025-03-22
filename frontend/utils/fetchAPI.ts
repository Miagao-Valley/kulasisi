import { FetchError } from './fetchError';
import getToken from '@/lib/tokens/getToken';
import { tryCatch, Result } from '@/utils/try-catch';

interface FetchAPIOptions extends RequestInit {
  authorized?: boolean;
  params?: Record<string, any>;
}

/**
 * Performs an HTTP request to the specified path in the API.
 *
 * This function wraps the underlying {@link baseFetchAPI} call with a try-catch utility.
 *
 * @param path - The path to fetch.
 * @param [options={}] - Additional settings for the request.
 *   @param [options.authorized] - If true, includes an Authorization header with a bearer token.
 *   @param [options.params] - An object containing query parameters to be appended to the URL.
 * @returns A promise that resolves to a result object:
 *   - On success: `{ data: any, error: null }`
 *   - On failure: `{ data: null, error: any }`
 */
export async function fetchAPI(
  path: string,
  options: FetchAPIOptions = {}
): Promise<Result<any, any>> {
  const { data, error } = await tryCatch(baseFetchAPI(path, options));
  if (error) console.error(error);
  return {
    data,
    error: error instanceof FetchError ? error.details : error,
  };
}

export async function baseFetchAPI(
  path: string,
  options: FetchAPIOptions = {}
): Promise<any> {
  // Construct the URL with the base path and query parameters
  const url = new URL(path, process.env.NEXT_PUBLIC_API_BASE_URL);

  if (options.params && typeof options.params === 'object') {
    // Filter out null and empty values
    const filteredParams = Object.fromEntries(
      Object.entries(options.params).flatMap(([key, value]) =>
        value == null || value === ''
          ? []
          : Array.isArray(value)
          ? value.map((v) => [key, v])
          : [[key, value]]
      )
    );

    url.search = new URLSearchParams(filteredParams).toString();
  }

  // Set the appropriate headers
  const headers = new Headers(options.headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (
    !headers.has('Content-Type') &&
    options.body &&
    options.method &&
    options.method !== 'GET'
  ) {
    headers.set('Content-Type', 'application/json');
  }

  // Add the authorization header if necessary
  if (options.authorized) {
    const token = await getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  options.headers = headers;
  delete options.authorized;

  // Make the request
  const response = await fetch(url.href, options);

  // Handle errors
  if (!response.ok) {
    let errorDetails;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = await response.text();
    }
    throw new FetchError(
      `${response.status} error while fetching ${path}: ${errorDetails}`,
      response.status,
      errorDetails
    );
  }

  // Parse and return the response body
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return await response.json();
  }
  return await response.text();
}
