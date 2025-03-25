import Link from 'next/link';
import { AppLogo } from '@/components/brand/app-logo';

const heroContent = {
  title: 'Kula—what?',
  description:
    'Kulasisi is a collaborative community for Philippine languages.',
};

export function Hero() {
  return (
    <div className="my-8 flex flex-col justify-center items-center">
      <div className="motion-preset-bounce motion-duration-300 motion-delay-75 motion-ease-bounce flex flex-col justify-center items-center">
        <Link href="/">
          <AppLogo className="w-12 m-2 motion-preset-seesaw-lg" />
          <span className="sr-only">kulasisi</span>
        </Link>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-3">
          {heroContent.title}
        </h1>
      </div>

      <div className="motion-preset-slide-up text-md md:text-lg lg:text-xl text-center">
        <p>{heroContent.description}</p>
      </div>
    </div>
  );
}
