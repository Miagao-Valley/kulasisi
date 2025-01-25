import React from 'react';
import AddPhraseForm from './AddPhraseForm';
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
       <H1>Add Phrase</H1>

      <Tabs defaultValue={'text'}>
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <AddPhraseForm className="mb-4 py-2 border-t border-b" />
        </TabsContent>
      </Tabs>
    </>
  )
}
