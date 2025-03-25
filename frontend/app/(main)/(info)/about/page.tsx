import React from 'react';
import { Metadata } from 'next';
import { Hero } from './Hero';
import { Mission } from './Mission';
import { Stats } from './Stats';
import { Team } from './Team';
import { CallToAction } from './CallToAction';

export const metadata: Metadata = {
  title: 'About Kulasisi',
  description: 'Learn about Kulasisi, our mission, and the team behind it.',
};

export default function AboutPage() {
  return (
    <div className="mx-0 md:mx-16 lg:mx-32 flex flex-col gap-8">
      <Hero />
      <Mission />
      <Stats />
      <Team />
      <CallToAction />
    </div>
  );
}
