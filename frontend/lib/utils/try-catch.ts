export type Success<T> = {
  data: T;
  error: null;
};

export type Failure<E> = {
  data: null;
  error: E;
};

/**
 * A type representing the result of a promise.
 *
 * @typeParam T - The type of the resolved value.
 * @typeParam E - The type of the rejected value.
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * A utility function that wraps a promise in a try-catch block.
 *
 * @param promise - The promise to wrap.
 * @returns A promise that resolves to a result object:
 *   - On success: `{ data: T, error: null }`
 *   - On failure: `{ data: null, error: E }`
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
