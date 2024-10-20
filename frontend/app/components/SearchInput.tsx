import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export default function SearchInput({
  searchTerm,
  setSearchTerm,
  className,
}: Props) {
  return (
    <label
      className={`input input-bordered input-sm max-w-80 flex items-center gap-3 ${className}`}
    >
      <FaSearch />
      <input
        className="grow w-full"
        type="text"
        value={searchTerm}
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </label>
  );
}
