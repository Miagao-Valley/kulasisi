import { getLangs } from '@/lib/langs/getLangs';
import { getPhrases } from '@/lib/phrases/getPhrases';
import { getWords } from '@/lib/words/getWords';
import { H2 } from '@/components/ui/heading-with-anchor';

const delayClasses = [
  'motion-delay-100',
  'motion-delay-200',
  'motion-delay-300',
];

export async function Stats() {
  const { results: langs } = await getLangs();
  const { results: phrases } = await getPhrases();
  const { results: words } = await getWords();

  const items = [
    { title: 'Languages', value: langs.length || 0 },
    { title: 'Phrases', value: phrases.length || 0 },
    { title: 'Words', value: words.length || 0 },
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
            <div className="text-4xl lg:text-5xl font-extrabold">
              {item.value}
            </div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
