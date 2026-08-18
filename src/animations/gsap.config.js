import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Try requiring ScrollToPlugin (if installed, though I don't see it in package.json)
// Using standard GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Default configuration
gsap.defaults({
  ease: 'power3.out',
});

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  markers: false,
});

export { gsap, ScrollTrigger };
