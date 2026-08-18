import { gsap } from './gsap.config';
import { revealMask, fadeUp } from './textAnimations';

export const runHeroSequence = (refs, onComplete) => {
  const { metaWords, titleLines, nameLines, descWords, buttons, statusBadge, scrollIndicator } = refs;
  
  const tl = gsap.timeline({
    onComplete: () => {
      if (onComplete) onComplete();
    }
  });

  // 1. Meta Words
  if (metaWords && metaWords.length > 0) {
    tl.add(revealMask(metaWords, { stagger: 0.04, duration: 1, y: 20 }), 0);
  }

  // 2. Title
  if (titleLines && titleLines.length > 0) {
    tl.add(revealMask(titleLines, { stagger: 0.05, duration: 1.2, y: 40 }), 0.2);
  }

  // 3. Name
  if (nameLines && nameLines.length > 0) {
    tl.add(revealMask(nameLines, { stagger: 0.05, duration: 1.2, y: 30 }), 0.6);
  }

  // 4. Description Words
  if (descWords && descWords.length > 0) {
    tl.add(revealMask(descWords, { stagger: 0.02, duration: 1, y: 15 }), 1.0);
  }
  
  // 5. Buttons (fade up)
  if (buttons && buttons.length > 0) {
    const btnsArray = Array.isArray(buttons) ? buttons : Array.from(buttons.children || [buttons]);
    tl.add(fadeUp(btnsArray, { stagger: 0.1, duration: 0.8, y: 15 }), 1.5);
  }
  
  // 6. Status and scroll indicators
  if (statusBadge) {
    tl.add(fadeUp(statusBadge, { duration: 0.8, y: 10 }), 1.7);
  }
  
  if (scrollIndicator) {
    tl.add(fadeUp(scrollIndicator, { duration: 0.8, y: 10 }), 1.8);
  }
  
  return tl;
};
