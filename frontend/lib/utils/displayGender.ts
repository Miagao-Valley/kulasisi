import { Gender } from '@/types/users';

/**
 * Returns a human-readable gender based on the provided gender code.
 *
 * @param gender - The gender code (M, F, O, N) to convert to a readable string.
 * @returns The human-readable gender string, or 'Unknown' if the code is not recognized.
 */
export function displayGender(gender: Gender): string {
  const genderLookup = {
    [Gender.Male]: 'Male',
    [Gender.Female]: 'Female',
    [Gender.Other]: 'Other',
    [Gender.NotSpecified]: 'Prefer not to say',
  };

  return genderLookup[gender] ?? 'Unknown';
}
