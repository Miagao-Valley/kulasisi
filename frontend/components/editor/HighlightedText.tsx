import { Fragment } from 'react';
import { useEditorContext } from './EditorContext';
import { HighlightedToken } from './HighlightedToken';

export function HighlightedText() {
  const { text, flaggedTokens } = useEditorContext();

  if (!flaggedTokens || flaggedTokens.length === 0) {
    return <span>{text}</span>;
  }

  let lastIndex = 0;

  return (
    <span>
      {flaggedTokens.map((token, idx) => {
        const tokenStart = token.offset;
        const tokenEnd = token.offset + token.token.length;

        // Skip overlapping tokens
        if (tokenStart < lastIndex) return null;

        // Add the text before the token
        const beforeToken = text.slice(lastIndex, tokenStart);

        // Update the last index to the end of the current token
        lastIndex = tokenEnd;

        return (
          <Fragment key={idx}>
            {beforeToken.length != 0 && (
              <span className="whitespace-pre-wrap break-words">
                {beforeToken}
              </span>
            )}
            <HighlightedToken token={token} />
          </Fragment>
        );
      })}
      {text.slice(lastIndex)} {/* Add remaining text after the last token */}
    </span>
  );
}
