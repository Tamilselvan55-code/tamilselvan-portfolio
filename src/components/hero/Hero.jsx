import { Suspense, lazy } from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroScrollIndicator } from './HeroScrollIndicator';

export function Hero({ introComplete }) {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full bg-canvas-base flex flex-col justify-center"
      aria-label="Hero"
    >
      {/* Soft background gradients + glass planes */}
      <HeroBackground />

      {/* Cinematic hero text + buttons */}
      <HeroContent introComplete={introComplete} />

      {/* Scroll indicator */}
      <HeroScrollIndicator />
    </section>
  );
}
