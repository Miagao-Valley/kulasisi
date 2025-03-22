/**
 * Custom error class to handle fetch errors.
 */
export class FetchError extends Error {
  public status: number;
  public details: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 0;
    this.details = details || null;
    Error.captureStackTrace(this, this.constructor);
  }
}
