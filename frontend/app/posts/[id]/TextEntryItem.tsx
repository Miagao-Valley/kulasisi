import React from 'react';
import { TextEntry } from '@/types';
import TextEntryFooter from '../TextEntryFooter';
import TextEntryContent from './TextEntryContent';

interface Props {
  textEntry: TextEntry;
  className?: string;
}

export default function TextEntryItem({ textEntry, className = '' }: Props) {
  return (
    <div className={`${className}`}>
      <div className="mb-3">
        <TextEntryContent textEntry={textEntry} />
        <TextEntryFooter textEntry={textEntry} />
      </div>
    </div>
  );
}
