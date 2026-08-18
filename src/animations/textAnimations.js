import { gsap } from './gsap.config';

/**
 * Utility to split text for animations without needing external libraries like SplitText
 */
export const splitText = (element, type = 'lines') => {
  if (!element) return [];
  
  // Basic implementation - in a real production environment, you might use GSAP's SplitText
  // For this project, we'll implement a lightweight DOM-based splitter
  
  const text = element.innerText;
  element.innerHTML = '';
  
  if (type === 'chars') {
    const chars = text.split('');
    return chars.map((char) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.innerText = char;
      }
      element.appendChild(span);
      return span;
    });
  } else if (type === 'words') {
    const words = text.split(' ');
    return words.map((word, i) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.innerText = word;
      element.appendChild(span);
      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
      return span;
    });
  }
  
  // Fallback for simple elements
  const span = document.createElement('span');
  span.style.display = 'inline-block';
  span.innerText = text;
  element.appendChild(span);
  return [span];
};

export const revealMask = (element, options = {}) => {
  const { delay = 0, duration = 1.2, stagger = 0.1, y = 100 } = options;
  
  // If element is an array or NodeList, animate them all
  const targets = Array.isArray(element) || element instanceof NodeList ? element : [element];
  
  // Setup the CSS mask/clip-path technique
  targets.forEach(target => {
    // We assume the target's parent has overflow: hidden
    gsap.set(target, { yPercent: y, opacity: 0 });
  });
  
  return gsap.to(targets, {
    yPercent: 0,
    opacity: 1,
    duration,
    stagger,
    delay,
    ease: 'power4.out',
    clearProps: 'all' // Clean up after animation
  });
};

export const fadeUp = (element, options = {}) => {
  const { delay = 0, duration = 1, stagger = 0.1, y = 30 } = options;
  
  return gsap.fromTo(element, 
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, delay, ease: 'power3.out', clearProps: 'all' }
  );
};
