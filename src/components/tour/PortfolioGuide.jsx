import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const BEE_SVG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent drop-shadow-sm">
    {/* Wings */}
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
    <path d="M14 8c-2-2-5-2-7 0 0 0-1 4 0 7 1 3 4.5 4 6 1s2-6 1-8z" fill="currentColor" opacity="0.15" />
    <path d="M14 8c-2-2-5-2-7 0 0 0-1 4 0 7 1 3 4.5 4 6 1s2-6 1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Body / Stripes */}
    <path d="M10 10l3 1M9.5 13l3.5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 8c1.5-2 4-3 6-2 1.5 1 1 3 0 4-1.5 1.5-4 1-6 0M10 8c-1.5-2-4-3-6-2-1.5 1-1 3 0 4 1.5 1.5 4 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TOUR_MESSAGES = {
  'hero': { title: "Welcome", text: "I'm Tamil Selvan, a Full Stack Developer." },
  'about': { title: "About Me", text: "My background and development journey." },
  'skills': { title: "Skills", text: "Technologies I use to build modern applications." },
  'work': { title: "Selected Work", text: "Explore my real-world projects." },
  'project-card-01': { title: "Grocery Store", text: "A full-stack e-commerce and delivery platform." },
  'project-card-02': { title: "Smart Parking", text: "Find and manage parking efficiently." },
  'project-card-03': { title: "Healthcare", text: "Smart appointment and hospital management." },
  'project-card-04': { title: "Healthcare AI", text: "Privacy-preserving healthcare analytics." },
  'contact': { title: "Let's Connect", text: "Get in touch for opportunities and collaboration." },
  'case-study': { title: "Explore the Project", text: "Understand features, architecture, and implementation." }
};

function getAbsoluteLayoutRect(element) {
  let top = 0;
  let left = 0;
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  let current = element;
  
  while (current) {
    top += current.offsetTop || 0;
    left += current.offsetLeft || 0;
    current = current.offsetParent;
  }
  
  return {
    top,
    left,
    right: left + width,
    bottom: top + height,
    width,
    height
  };
}

const SECTION_STRATEGIES = {
  'hero': { anchor: 'top', startOffset: 24, step: 24 },
  'about': { anchor: 'bottom', startOffset: 32, step: -24 },
  'skills': { anchor: 'bottom', startOffset: 32, step: -24 },
  'work': { anchor: 'top', startOffset: 32, step: 24 },
  'project-card-01': { anchor: 'bottom', startOffset: 32, step: -24 },
  'project-card-02': { anchor: 'bottom', startOffset: 32, step: -24 },
  'project-card-03': { anchor: 'bottom', startOffset: 32, step: -24 },
  'project-card-04': { anchor: 'bottom', startOffset: 32, step: -24 },
  'contact': { anchor: 'bottom', startOffset: 32, step: -24 },
  'case-study': { anchor: 'bottom', startOffset: 32, step: -24 }
};

export function PortfolioGuide() {
  const location = useLocation();
  const [activeMessage, setActiveMessage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [positionTop, setPositionTop] = useState(0);
  const hideTimer = useRef(null);
  
  const showMessage = useCallback((sectionId) => {
    const message = TOUR_MESSAGES[sectionId];
    if (!message) return;

    const el = document.getElementById(sectionId);
    if (!el) return;

    if (hideTimer.current) clearTimeout(hideTimer.current);

    const sectionRect = getAbsoluteLayoutRect(el);
    const absoluteTop = sectionRect.top;
    
    // Find all important elements in this section
    const avoidElements = el.querySelectorAll('h1, h2, h3, h4, h5, p, img, button, a, [role="button"], span, .text-accent');
    const avoidRects = Array.from(avoidElements).map(node => getAbsoluteLayoutRect(node));
    
    const guideWidth = 320; 
    const guideHeight = 120; // Includes some visual padding
    const guideLeft = 16; 
    const guideRight = guideLeft + guideWidth;
    
    const strategy = SECTION_STRATEGIES[sectionId] || { anchor: 'top', startOffset: 24, step: 24 };
    let safeOffset = strategy.startOffset;
    let foundSafe = false;

    if (strategy.anchor === 'top') {
      const maxOffset = Math.max(strategy.startOffset, sectionRect.height - guideHeight - 24);
      for (let offset = strategy.startOffset; offset <= maxOffset; offset += strategy.step) {
        const testTop = absoluteTop + offset;
        const testBottom = testTop + guideHeight;
        
        let collision = false;
        for (const avoidRect of avoidRects) {
          if (avoidRect.width === 0 || avoidRect.height === 0) continue;
          const overlapX = guideLeft < (avoidRect.right + 20) && guideRight > (avoidRect.left - 20);
          const overlapY = testTop < (avoidRect.bottom + 20) && testBottom > (avoidRect.top - 20);
          
          if (overlapX && overlapY) {
            collision = true;
            break; 
          }
        }
        
        if (!collision) {
          safeOffset = offset;
          foundSafe = true;
          break; 
        }
      }
      if (!foundSafe) safeOffset = strategy.startOffset;
      
    } else {
      // anchor: 'bottom'
      // Start in the lower whitespace and scan upward
      const startBottomOffset = Math.max(24, sectionRect.height - guideHeight - strategy.startOffset);
      const minOffset = 24;
      
      for (let offset = startBottomOffset; offset >= minOffset; offset += strategy.step) {
        const testTop = absoluteTop + offset;
        const testBottom = testTop + guideHeight;
        
        let collision = false;
        for (const avoidRect of avoidRects) {
          if (avoidRect.width === 0 || avoidRect.height === 0) continue;
          const overlapX = guideLeft < (avoidRect.right + 20) && guideRight > (avoidRect.left - 20);
          const overlapY = testTop < (avoidRect.bottom + 20) && testBottom > (avoidRect.top - 20);
          
          if (overlapX && overlapY) {
            collision = true;
            break; 
          }
        }
        
        if (!collision) {
          safeOffset = offset;
          foundSafe = true;
          break; 
        }
      }
      if (!foundSafe) safeOffset = startBottomOffset;
    }
    
    setPositionTop(absoluteTop + safeOffset);

    setIsVisible(false);
    
    setTimeout(() => {
      setActiveMessage(message);
      setIsVisible(true);
      
      // Auto-hide after 4.5 seconds
      hideTimer.current = setTimeout(() => {
        setIsVisible(false);
      }, 4500);
      
    }, 400); // 400ms delay to allow previous to fade out
  }, []);

  useEffect(() => {
    // Observer with threshold to trigger when meaningfully entered
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showMessage(entry.target.id);
        }
      });
    }, { threshold: 0.35 });

    Object.keys(TOUR_MESSAGES).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showMessage, location.pathname]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div 
      className="absolute z-[9999] left-4 md:left-8 lg:left-12 flex flex-col items-start pointer-events-none"
      style={{
        top: `${positionTop}px`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          {BEE_SVG}
        </div>
        <div className="flex flex-col pointer-events-auto">
          <span className="text-accent font-sans font-medium text-[0.875rem] md:text-[0.9375rem] tracking-wide mb-0.5 block">
            {activeMessage?.title}
          </span>
          <span className="text-ink-primary font-sans font-light text-[0.8125rem] md:text-[0.875rem] leading-[1.5] m-0 max-w-[220px] md:max-w-[280px] break-words block drop-shadow-sm">
            {activeMessage?.text}
          </span>
        </div>
      </div>
    </div>
  );
}
