import React from 'react';
import { AddPhraseForm } from '../phrases/AddPhraseForm';
import { AddWordForm } from '../dictionary/AddWordForm';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';
import { H1 } from '@/components/ui/heading-with-anchor';

export default function AddPhrasePage() {
  return (
    <>
      <H1>Contribute</H1>

      <Tabs defaultValue={'phrase'}>
        <TabsList>
          <TabsTrigger value="phrase">Phrase</TabsTrigger>
          <TabsTrigger value="word">Word</TabsTrigger>
        </TabsList>

        <TabsContent value="phrase">
          <AddPhraseForm className="mb-4 py-2 border-t border-b" />
        </TabsContent>
        <TabsContent value="word">
          <AddWordForm className="mb-4 py-2 border-t border-b" />
        </TabsContent>
      </Tabs>
    </>
  );
}
