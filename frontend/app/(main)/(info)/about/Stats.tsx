import { getLangs } from '@/lib/langs/getLangs';
import { getPhrases } from '@/lib/phrases/getPhrases';
import { getWords } from '@/lib/words/getWords';
import { H2 } from '@/components/ui/heading-with-anchor';
import { Suspense } from 'react';

const delayClasses = [
  'motion-delay-100',
  'motion-delay-200',
  'motion-delay-300',
];

export async function Stats() {
  const items = [
    { title: 'Languages' },
    { title: 'Phrases' },
    { title: 'Words' },
  ];

  return (
    <div className="my-8">
      <H2 className="text-center mb-4 motion-preset-slide-down">Our numbers</H2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div
            key={item.title}
            className={`flex flex-col items-center justify-center gap-1 motion-preset-slide-up ${delayClasses[idx]}`}
          >
            <div>{item.title}</div>
            <div className="text-4xl lg:text-5xl font-extrabold">
              <Suspense fallback={<span>0</span>}>
                <ItemValue title={item.title} />
              </Suspense>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function ItemValue({ title }: { title: string }) {
  let value = 0;
  switch (title) {
    case 'Languages':
      const { results: langs } = await getLangs();
      value = langs.length;
      break;
    case 'Phrases':
      const { results: phrases } = await getPhrases();
      value = phrases.length;
      break;
    case 'Words':
      const { results: words } = await getWords();
      value = words.length;
      break;
  }

  return <span>{value}</span>;
}
