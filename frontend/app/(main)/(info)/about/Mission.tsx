const missionContent = [
  {
    title: 'Kulasisi knows...',
    description:
      'that language data can be scarce, especially for Philippines languages.',
  },
  {
    title: 'Kulasisi believes...',
    description: 'that every language has a voice that deserves to be heard.',
  },
  {
    title: 'Kulasisi helps...',
    description:
      'by providing a place where everyone can grow along with their languages.',
  },
];

const delayClasses = [
  'motion-delay-100',
  'motion-delay-200',
  'motion-delay-300',
];

export function Mission() {
  return (
    <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {missionContent.map((content, idx) => (
        <div
          key={content.title}
          className={`flex flex-col gap-1 motion-preset-slide-up ${delayClasses[idx]}`}
        >
          <h2 className="text-xl font-bold">{content.title}</h2>
          <p>{content.description}</p>
        </div>
      ))}
    </div>
  );
}
