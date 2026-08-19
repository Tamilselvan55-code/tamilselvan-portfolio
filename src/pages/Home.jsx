import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/hero/Hero';
import { WorkSection } from '../components/sections/WorkSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';

export function Home({ introComplete }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Use requestAnimationFrame once to ensure DOM is ready without an artificial 100ms delay
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location]);

  return (
    <main id="main-content">
      {/* Hero — rings + statement + glass bg */}
      <Hero introComplete={introComplete} />

      {/* Section divider */}
      <div className="divider-luxury max-w-[1500px] mx-auto" aria-hidden="true" />

      {/* About */}
      <div data-cinematic-layer="section">
        <AboutSection />
      </div>

      {/* Section divider */}
      <div className="divider-luxury" aria-hidden="true" />

      {/* Work */}
      <div data-cinematic-layer="section">
        <WorkSection />
      </div>

      {/* Section divider */}
      <div className="divider-luxury" aria-hidden="true" />

      {/* Contact + Footer */}
      <div data-cinematic-layer="section">
        <ContactSection />
      </div>
    </main>
  );
}
