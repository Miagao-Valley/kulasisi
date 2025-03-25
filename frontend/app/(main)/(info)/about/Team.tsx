import { H2 } from '@/components/ui/heading-with-anchor';
import { Card } from '@/components/ui/card';
import { ExternalLinkIcon } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';

const temContent = {
  title: 'Meet the crew',
  description: 'The team behind Kulasisi',
  members: [
    {
      name: 'Andrian Maagma',
      role: 'Founder',
      socials: [
        {
          name: 'github',
          url: 'https://github.com/andrianllmm',
          icon: SiGithub,
        },
      ],
    },
  ],
};

const contribPage =
  'https://github.com/Miagao-Valley/kulasisi/blob/main/CONTRIBUTING.md';

export function Team() {
  return (
    <div className="my-8">
      <div className="mb-4 motion-preset-slide-down">
        <H2 className="text-center mb-1">{temContent.title}</H2>
        <p className="text-center text-muted-foreground">
          {temContent.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 motion-preset-slide-up">
        {temContent.members.map((member) => (
          <Card key={member.name}>
            <div className="flex flex-col mb-3">
              <h3 className="text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>

            <div className="flex flex-col gap-1 text-muted-foreground">
              {member?.socials?.map((social) => (
                <a key={social.name} href={social.url} target="_blank">
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </Card>
        ))}

        <Card className="border-primary border-2">
          <div className="flex flex-col mb-3">
            <h3 className="text-lg">
              <a
                href={contribPage}
                target="_blank"
                className="flex items-center gap-1 underline underline-offset-4"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                Could be you?
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">Your role</p>
          </div>

          <div className="flex flex-col gap-1 text-muted-foreground">
            <a href={contribPage} target="_blank">
              <SiGithub className="w-4 h-4" />
              <span className="sr-only">github</span>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
