/**
 * Converts a given date to a human-readable "time ago" format (e.g., "5 minutes ago").
 *
 * @param date - The date to compare to the current time.
 * @returns A string representing the relative time (e.g., "3 days ago").
 */
export function naturalTime(date: Date): string {
  const now = new Date();

  // Calculate the difference in seconds between the current time and the provided date
  const delta = Math.round((now.getTime() - date.getTime()) / 1000);

  // Constants for time units in seconds
  const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = day * 30,
    year = day * 365;

  let fuzzy: string; // The relative time string

  // Determine the relative time string based on the calculated delta
  if (delta < 30) {
    fuzzy = 'just now'; // Less than 30 seconds
  } else if (delta < minute) {
    fuzzy = delta + ' seconds ago'; // Less than a minute
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute ago'; // Less than 2 minutes
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + ' minutes ago'; // Less than an hour
  } else if (Math.floor(delta / hour) === 1) {
    fuzzy = '1 hour ago'; // Exactly 1 hour
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + ' hours ago'; // Less than a day
  } else if (delta < day * 2) {
    fuzzy = 'yesterday'; // Less than 2 days (yesterday)
  } else if (delta < week) {
    fuzzy = Math.floor(delta / day) + ' days ago'; // Less than a week
  } else if (delta < month) {
    fuzzy = Math.floor(delta / week) + ' weeks ago'; // Less than a month
  } else if (delta < year) {
    fuzzy = Math.floor(delta / month) + ' months ago'; // Less than a year
  } else {
    fuzzy = Math.floor(delta / year) + ' years ago'; // Over a year
  }

  return fuzzy;
}
