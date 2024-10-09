import React from 'react';

interface Props {
  className?: string;
}

export default async function TextEntriesListSkeleton({
  className = '',
}: Props) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: 10 }, (_, i) => i).map((i) => {
        return <li className="skeleton rounded-lg w-full h-24" key={i}></li>;
      })}
    </ul>
  );
}
