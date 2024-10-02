export default function naturalTime(date: Date): string {
  const now = new Date();
  const delta = Math.round((now.getTime() - date.getTime()) / 1000);

  const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = day * 30,
    year = day * 365;

  let fuzzy: string;

  if (delta < 30) {
    fuzzy = 'just now';
  } else if (delta < minute) {
    fuzzy = delta + ' seconds ago';
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute ago';
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + ' minutes ago';
  } else if (Math.floor(delta / hour) === 1) {
    fuzzy = '1 hour ago';
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + ' hours ago';
  } else if (delta < day * 2) {
    fuzzy = 'yesterday';
  } else if (delta < week) {
    fuzzy = Math.floor(delta / day) + ' days ago';
  } else if (delta < month) {
    fuzzy = Math.floor(delta / week) + ' weeks ago';
  } else if (delta < year) {
    fuzzy = Math.floor(delta / month) + ' months ago';
  } else {
    fuzzy = Math.floor(delta / year) + ' years ago';
  }

  return fuzzy;
}
