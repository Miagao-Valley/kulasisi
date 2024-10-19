import { API_BASE_URL } from '@/constants';

export class FetchError extends Error {
  public status: number;
  public resBody: any;

  constructor(message: string, status: number, resBody: any) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.resBody = resBody;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default async function fetcher(
  endpoint: string,
  options: RequestInit = {},
  token: string = '',
  baseUrl: string = API_BASE_URL
): Promise<any> {
  const url = new URL(endpoint, baseUrl);

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const res = await fetch(url.toString(), options);

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
      resBody
    );
  }

  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return await res.json();
  }

  return res;
}
