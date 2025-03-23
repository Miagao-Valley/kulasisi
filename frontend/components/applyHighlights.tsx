import React from 'react';

export function applyHighlights(
  text: string,
  highlight?: string | RegExp,
  highlightClass: string = 'bg-yellow-100'
): React.ReactNode[] {
  if (!highlight) return [text];

  const regex = new RegExp(highlight as string, 'gi');
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  text.replace(regex, (match, offset) => {
    if (lastIndex < offset) {
      parts.push(text.slice(lastIndex, offset));
    }

    parts.push(
      <span className={highlightClass} key={offset}>
        {match}
      </span>
    );
    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
