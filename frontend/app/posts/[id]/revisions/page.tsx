import React from 'react';
import Link from 'next/link';
import getTextEntryRevisions from '@/lib/textEntries/getTextEntryRevisions';
import TextEntryRevisionsList from './TextEntryRevisionsList';
import { MdArrowBack } from 'react-icons/md';

interface Props {
  params: {
    id: string;
  };
}

export default async function PostRevisionsPage({ params }: Props) {
  const id = Number(params.id);
  const { results } = await getTextEntryRevisions(id);

  return (
    <>
      <Link href={`/posts/${id}`} className="btn btn-ghost mb-3">
        <MdArrowBack /> Back to Post
      </Link>
      <TextEntryRevisionsList revisions={results} />
    </>
  );
}
