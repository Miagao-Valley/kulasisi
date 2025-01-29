import React from 'react';
import AddWordForm from './AddWordForm';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';
import { H1 } from '@/components/ui/heading-with-anchor';

export default function AddWordPage() {
  return (
    <>
      <H1>Add Word</H1>

      <Tabs defaultValue={'text'}>
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <AddWordForm className="mb-4 py-2 border-t border-b" />
        </TabsContent>
      </Tabs>
    </>
  );
}
