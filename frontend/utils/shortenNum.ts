export default function shortenNum(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  const units = ['k', 'm', 'b', 't'];
  let unitIndex = -1;
  let shortenedNum = num;

  while (shortenedNum >= 1000 && unitIndex < units.length - 1) {
    shortenedNum /= 1000;
    unitIndex++;
  }

  return `${shortenedNum.toFixed(1)}${units[unitIndex]}`;
}