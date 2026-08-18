import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useCinematic3D(introComplete) {
  const isEnabled = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !introComplete) return;

    isEnabled.current = true;

    const globalWrapper = document.querySelector('[data-cinematic-layer="global"]');
    const sectionLayers = document.querySelectorAll('[data-cinematic-layer="section"]');
    
    // Set static 3D depth for internal layers to create a physical hierarchy
    gsap.set('[data-cinematic-layer="bg"]', { z: -20, force3D: true, transformStyle: 'preserve-3d' });
    gsap.set('[data-cinematic-layer="decorative"]', { z: -5, force3D: true, transformStyle: 'preserve-3d' });
    gsap.set('[data-cinematic-layer="content"]', { z: 0, force3D: true, transformStyle: 'preserve-3d' });
    gsap.set('[data-cinematic-layer="orbits"]', { z: 10, force3D: true, transformStyle: 'preserve-3d' });
    gsap.set('[data-cinematic-layer="portrait"]', { z: 15, force3D: true, transformStyle: 'preserve-3d' });

    let sectionBounds = [];
    const updateBounds = () => {
      sectionBounds = Array.from(sectionLayers).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          absoluteY: rect.top + window.scrollY,
          height: rect.height
        };
      });
    };
    
    // Initial cache of layout metrics
    updateBounds();
    window.addEventListener('resize', updateBounds, { passive: true });

    const update = (time) => {
      if (!isEnabled.current) return;

      const isMobile = window.innerWidth < 768;

      if (globalWrapper) {
        const mult = isMobile ? 0.2 : 1;
        // Automatic Cinematic Floating (duration ~18-24s)
        const floatY = Math.sin(time * 0.3) * (1.5 * mult); // ±1.5px
        const floatRx = Math.sin(time * 0.25) * (0.1 * mult); // ±0.1deg
        const floatRy = Math.cos(time * 0.35) * (0.15 * mult); // ±0.15deg

        gsap.set(globalWrapper, {
          y: floatY,
          rotationX: floatRx,
          rotationY: floatRy,
          force3D: true
        });
      }

      // Disable expensive scroll-depth per-section on mobile
      if (isMobile) return;

      // Section Scroll Cinematic Depth
      const centerY = window.innerHeight / 2;
      const currentScrollY = window.scrollY;
      
      sectionBounds.forEach(({ el, absoluteY, height }) => {
        const elCenterY = (absoluteY - currentScrollY) + (height / 2);
        const distFromCenter = elCenterY - centerY;
        
        // Normalize distance (0 when at center, 1 when at edge of screen)
        const normalizedDist = distFromCenter / window.innerHeight;
        const distRatio = Math.min(Math.abs(normalizedDist), 1);
        
        // Depth logic: push back and scale down as it leaves focus
        const zOffset = -distRatio * 5; // 0px to -5px
        const scaleOffset = 1 - (distRatio * 0.005); // 1 to 0.995
        const rxOffset = (normalizedDist > 0 ? distRatio * 0.15 : -distRatio * 0.15); // 0 to ±0.15deg

        gsap.set(el, {
          z: zOffset,
          scale: scaleOffset,
          rotationX: rxOffset,
          transformPerspective: 1800,
          transformStyle: 'preserve-3d',
          force3D: true
        });
      });
    };

    gsap.ticker.add(update);

    return () => {
      isEnabled.current = false;
      gsap.ticker.remove(update);
      window.removeEventListener('resize', updateBounds);
      
      if (globalWrapper) gsap.set(globalWrapper, { clearProps: 'transform' });
      sectionLayers.forEach(el => gsap.set(el, { clearProps: 'transform' }));
      
      ['bg', 'decorative', 'content', 'orbits', 'portrait'].forEach(layer => {
        gsap.set(`[data-cinematic-layer="${layer}"]`, { clearProps: 'transform' });
      });
    };
  }, [introComplete]);
}
