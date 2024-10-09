import React from 'react';

interface Props {
  className?: string;
}

export default async function LangsListSkeleton({ className = '' }: Props) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {Array.from({ length: 40 }, (_, i) => i).map((i) => {
        return <li key={i} className="skeleton w-full h-8"></li>;
      })}
    </ul>
  );
}
