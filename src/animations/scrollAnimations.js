import { gsap, ScrollTrigger } from './gsap.config';

export const sectionReveal = (trigger, elements, options = {}) => {
  const { start = 'top 85%', stagger = 0.1, y = 50, duration = 1 } = options;
  
  return gsap.fromTo(elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none reverse',
      }
    }
  );
};

export const initScrollParallax = (element, strength = 50) => {
  return gsap.to(element, {
    y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed') || '1')) * strength,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });
};

export const drawLine = (element, options = {}) => {
  const { start = 'top 80%', color = 'currentColor' } = options;
  
  // Assuming element is a div acting as a line
  return gsap.fromTo(element,
    { scaleY: 0, transformOrigin: 'top center' },
    {
      scaleY: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: element,
        start,
        scrub: 1,
      }
    }
  );
};
