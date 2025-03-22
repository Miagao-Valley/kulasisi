import React from 'react';
import { cn } from '@/lib/utils';
import Wordmark from '@/components/brand/wordmark';
import { H1, H2, H3, H4, H5, H6 } from '@/components/ui/heading-with-anchor';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUpIcon } from 'lucide-react';

interface ColorCardProps {
  name: string;
  className?: string;
}

function ColorCard({ name, className = '' }: ColorCardProps) {
  return (
    <div className={cn('w-full p-3', className)}>
      <span className="text-sm">{name}</span>
    </div>
  );
}

export default function DesignPage() {
  return (
    <div className="space-y-6">
      <H1>Kulasisi Design</H1>

      <H2 anchor="logo">Logo</H2>
      <div className="w-full flex items-center justify-center">
        <Wordmark className="w-full md:w-1/3 sm:w-1/2" />
      </div>

      <H2 anchor="colors">Colors</H2>

      <H3>Base</H3>
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <ColorCard name="Background" className="bg-background" />
        <ColorCard
          name="Foreground"
          className="bg-foreground text-background"
        />
        <ColorCard
          name="Primary"
          className="bg-primary text-primary-foreground"
        />
        <ColorCard
          name="Secondary"
          className="bg-secondary text-secondary-foreground"
        />
        <ColorCard name="Muted" className="bg-muted text-muted-foreground" />
        <ColorCard name="Accent" className="bg-accent text-accent-foreground" />
      </div>

      <H3>State</H3>
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <ColorCard
          name="Success"
          className="bg-success text-success-foreground"
        />
        <ColorCard
          name="Warning"
          className="bg-warning text-warning-foreground"
        />
        <ColorCard
          name="Destructive"
          className="bg-destructive text-destructive-foreground"
        />
        <ColorCard name="Info" className="bg-info text-info-foreground" />
      </div>

      <H2 anchor="typography">Typography</H2>
      <H3>Headings</H3>
      <div className="mb-3 p-3 rounded-lg border flex flex-col gap-3">
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>
      </div>
      <H3>Body</H3>
      <div className="mb-3 p-3 rounded-lg border flex flex-col gap-3">
        <p className="text-xl">
          TextXL - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-lg">
          TextLG - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-base">
          TextBase - Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-sm">
          TextSM - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <H2 anchor="buttons">Buttons</H2>
      <div className="mb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="mb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="default">
          Default
        </Button>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="icon">
          <ThumbsUpIcon />
        </Button>
      </div>

      <H2 anchor="badges">Badges</H2>
      <div className="mb-3 flex flex-wrap gap-3">
        <Badge variant="default">default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge variant="outline">outline</Badge>
      </div>

      <H3 anchor="cards">Cards</H3>
      <div className="mb-3">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>

      <H3 anchor="inputs">Inputs</H3>
      <div className="mb-3 flex flex-col gap-3">
        <Input placeholder="Text input" />
        <FloatingLabelInput label="Floating label input" />
        <Textarea placeholder="Text area" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Apple</SelectItem>
            <SelectItem value="b">Banana</SelectItem>
            <SelectItem value="c">Coconut</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
