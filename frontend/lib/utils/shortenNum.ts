/**
 * Shortens a large number into a more readable format (e.g., 1.5k, 2.3M).
 *
 * @param num - The number to shorten.
 * @returns A string representing the shortened version of the number with an appropriate unit (k, m, b, t).
 */
export default function shortenNum(num: number): string {
  // Return numbers less than 1k as is
  if (num < 1000) {
    return num.toString();
  }

  // Define the units for thousands, millions, billions, etc.
  const units = ['k', 'm', 'b', 't'];
  let unitIndex = -1;
  let shortenedNum = num;

  // Keep dividing the number by 1k and increment the unit index
  while (shortenedNum >= 1000 && unitIndex < units.length - 1) {
    shortenedNum /= 1000;
    unitIndex++;
  }

  // Return the shortened number with one decimal point and the appropriate unit
  return `${shortenedNum.toFixed(1)}${units[unitIndex]}`;
}
