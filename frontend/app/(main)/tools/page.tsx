import React from 'react';
import { ToolCard } from './ToolCard';
import { H1 } from '@/components/ui/heading-with-anchor';
import { SpellCheckIcon } from 'lucide-react';

const tools = [
  {
    name: 'Proofreader',
    description: 'Check your writing for errors and improvements.',
    icon: <SpellCheckIcon className="w-8 h-8" />,
    url: '/tools/proofreader/',
  },
];

export default function ToolsPage() {
  return (
    <>
      <H1 className="text-center w-full">Tools</H1>

      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <li key={tool.name}>
            <ToolCard {...tool} />
          </li>
        ))}
      </ul>
    </>
  );
}
