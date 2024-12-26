import React from 'react';
import Link from 'next/link';
import { diffWords } from 'diff';
import naturalTime from '@/utils/naturalTime';
import { PhraseRevision } from '@/types';

interface Props {
  revisions: PhraseRevision[];
}

export default function PhraseRevisionsList({ revisions }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {revisions && revisions.length > 0 ? (
        revisions.map((revision, index) => {
          const content = revision.content;
          const previousContent =
            index < revisions.length - 1 ? revisions[index + 1].content : '';

          const diff = diffWords(previousContent, content);
          const isChecked = index === 0;

          return (
            <div
              className="collapse collapse-plus bg-base-200"
              key={revision.history_id}
            >
              <input type="checkbox" defaultChecked={isChecked} />
              <div className="collapse-title flex gap-3">
                <span className="font-medium me-auto">
                  #{revisions.length - index}
                </span>
                <span className="text-sm">
                  {naturalTime(new Date(revision.history_date))}
                </span>
              </div>
              <div className="collapse-content">
                <div className="mb-3">
                  {diff.map((part, i) => (
                    <span
                      key={i}
                      className={`${
                        part.added
                          ? 'bg-green-200'
                          : part.removed
                            ? 'line-through bg-red-200'
                            : ''
                      }`}
                    >
                      {part.value}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <span className="ms-auto text-sm">
                    edited by{' '}
                    <Link
                      className="font-bold hover:text-primary"
                      href={`/users/${revision.history_user}/`}
                    >
                      {revision.history_user}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No revisions</div>
      )}
    </div>
  );
}
