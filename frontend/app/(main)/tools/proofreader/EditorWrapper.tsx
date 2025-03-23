'use client';

import { EditorProvider } from '@/components/editor/EditorContext';
import { Editor } from '@/components/editor/Editor';

export function EditorWrapper({ lang }: { lang: string }) {
  return (
    <EditorProvider lang={lang} showProofreader>
      <Editor placeholder="Start by writing or pasting text." autoFocus />
    </EditorProvider>
  );
}
