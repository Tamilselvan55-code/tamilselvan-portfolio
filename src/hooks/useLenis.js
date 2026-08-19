import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Robust mobile/touch detection
    const isMobile = window.innerWidth < 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    
    // Completely disable Lenis on mobile/touch to preserve native scrolling
    if (prefersReducedMotion || isMobile) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ticker for ScrollTrigger sync
    lenis.on('scroll', ScrollTrigger.update);
    
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);
}
