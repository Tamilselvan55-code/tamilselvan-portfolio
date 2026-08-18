import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBasket, MapPin, Stethoscope, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  '01': ShoppingBasket,
  '02': MapPin,
  '03': Stethoscope,
  '04': Network,
};

const PROJECT_THEMES = {
  '01': { // E-Commerce - Rich warm gold/yellow
    color: '#B45309', // Darker for crisp visibility
    lineColor: '#F59E0B',
    defaultShadow: '0 0 16px rgba(245,158,11,0.15)',
    activeShadow: '0 0 28px rgba(245,158,11,0.45)',
    hoverShadow: '0 0 32px rgba(245,158,11,0.6)',
    bg: 'rgba(245,158,11,0.04)',
    activeBg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    activeBorder: 'rgba(245,158,11,0.7)',
    hoverBorder: 'rgba(245,158,11,0.9)',
  },
  '02': { // Marketplace - Strong clear blue
    color: '#1D4ED8',
    lineColor: '#3B82F6',
    defaultShadow: '0 0 16px rgba(59,130,246,0.15)',
    activeShadow: '0 0 28px rgba(59,130,246,0.45)',
    hoverShadow: '0 0 32px rgba(59,130,246,0.6)',
    bg: 'rgba(59,130,246,0.04)',
    activeBg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.3)',
    activeBorder: 'rgba(59,130,246,0.7)',
    hoverBorder: 'rgba(59,130,246,0.9)',
  },
  '03': { // Healthcare - Strong coral/red
    color: '#BE123C',
    lineColor: '#E11D48',
    defaultShadow: '0 0 16px rgba(225,29,72,0.15)',
    activeShadow: '0 0 28px rgba(225,29,72,0.45)',
    hoverShadow: '0 0 32px rgba(225,29,72,0.6)',
    bg: 'rgba(225,29,72,0.04)',
    activeBg: 'rgba(225,29,72,0.12)',
    border: 'rgba(225,29,72,0.3)',
    activeBorder: 'rgba(225,29,72,0.7)',
    hoverBorder: 'rgba(225,29,72,0.9)',
  },
  '04': { // Network - Strong purple
    color: '#6D28D9',
    lineColor: '#7C3AED',
    defaultShadow: '0 0 16px rgba(124,58,237,0.15)',
    activeShadow: '0 0 28px rgba(124,58,237,0.45)',
    hoverShadow: '0 0 32px rgba(124,58,237,0.6)',
    bg: 'rgba(124,58,237,0.04)',
    activeBg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.3)',
    activeBorder: 'rgba(124,58,237,0.7)',
    hoverBorder: 'rgba(124,58,237,0.9)',
  },
};

export function ProjectIntroAnimation({ projects }) {
  const containerRef = useRef(null);
  const baseLineRef = useRef(null);
  const activeLineRef = useRef(null);
  const nodesRef = useRef([]);
  const iconCirclesRef = useRef([]);
  
  // High-performance caching
  const svgsRef = useRef([]);

  useEffect(() => {
    iconCirclesRef.current.forEach((iconEl, idx) => {
      if (iconEl) {
        svgsRef.current[idx] = iconEl.querySelector('svg');

        const wrapper = iconEl.parentElement;
        const theme = PROJECT_THEMES[projects[idx].id];
        
        const onMouseEnter = () => {
          const isColored = iconEl.dataset.colored === 'true';
          const svgEl = svgsRef.current[idx];
          gsap.to(iconEl, {
            y: -2,
            backgroundColor: isColored ? theme.activeBg : theme.bg,
            borderColor: isColored ? theme.hoverBorder : theme.border,
            boxShadow: isColored ? theme.hoverShadow : theme.defaultShadow,
            duration: 0.3,
            ease: 'power2.out'
          });
          if (svgEl) gsap.to(svgEl, { filter: 'brightness(1.2)', duration: 0.3 });
        };
        
        const onMouseLeave = () => {
          const isColored = iconEl.dataset.colored === 'true';
          const svgEl = svgsRef.current[idx];
          gsap.to(iconEl, {
            y: 0,
            backgroundColor: isColored ? theme.activeBg : theme.bg,
            borderColor: isColored ? theme.activeBorder : theme.border,
            boxShadow: isColored ? theme.activeShadow : theme.defaultShadow,
            duration: 0.3,
            ease: 'power2.out'
          });
          if (svgEl) gsap.to(svgEl, { filter: isColored ? 'brightness(1.15)' : 'brightness(1)', duration: 0.3 });
        };

        const onMouseDown = () => {
          gsap.to(iconEl, { y: 1, duration: 0.1 });
        };
        
        const onMouseUp = () => {
          gsap.to(iconEl, { y: -2, duration: 0.2 });
        };

        wrapper.addEventListener('mouseenter', onMouseEnter);
        wrapper.addEventListener('mouseleave', onMouseLeave);
        wrapper.addEventListener('mousedown', onMouseDown);
        wrapper.addEventListener('mouseup', onMouseUp);
        
        iconEl._cleanupHover = () => {
          wrapper.removeEventListener('mouseenter', onMouseEnter);
          wrapper.removeEventListener('mouseleave', onMouseLeave);
          wrapper.removeEventListener('mousedown', onMouseDown);
          wrapper.removeEventListener('mouseup', onMouseUp);
        };
      }
    });

    const ctx = gsap.context(() => {
      // 1. Initial GSAP Entrance Animation (Runs ONLY ONCE)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true // Ensures it never replays on scroll
        }
      });

      const isMobile = window.innerWidth < 768;
      
      // Reset active line to 0
      gsap.set(activeLineRef.current, { 
        width: isMobile ? '1px' : '0%', 
        height: isMobile ? '0%' : '1px',
        backgroundColor: PROJECT_THEMES[projects[0]?.id || '01'].lineColor,
        transformOrigin: isMobile ? 'top center' : 'left center' 
      });

      if (isMobile) {
        gsap.set(baseLineRef.current, { height: '0%', width: '1px', transformOrigin: 'top center' });
        tl.to(baseLineRef.current, { height: '100%', duration: 1, ease: 'power3.out' });
      } else {
        gsap.set(baseLineRef.current, { width: '0%', height: '1px', transformOrigin: 'left center' });
        tl.to(baseLineRef.current, { width: '100%', duration: 1, ease: 'power3.out' });
      }

      // Entrance animation with opacity, blur, scale
      tl.fromTo(nodesRef.current, 
        { opacity: 0, filter: 'blur(6px)', scale: 0.9 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.8'
      );

      // 2. Continuous Scroll-Based Progression
      ScrollTrigger.create({
        trigger: '#work',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // Progress line continuously scrubs with scroll
          gsap.set(activeLineRef.current, {
            [isMobile ? 'height' : 'width']: `${self.progress * 100}%`
          });

          // Check if progress line physically reached icons
          for (let idx = 0; idx < iconCirclesRef.current.length; idx++) {
            const iconEl = iconCirclesRef.current[idx];
            if (!iconEl) continue;
            
            // Calculate physical position percentage of the icon along the line
            // Buffer of 0.05 to trigger slightly before/as the line touches it
            const threshold = idx === 0 ? 0 : (idx / (projects.length - 1)) - 0.05;
            const isColored = self.progress >= threshold;
            
            if (isColored) {
              // Once activated, never return to grey
              if (iconEl.dataset.colored !== 'true') {
                iconEl.dataset.colored = 'true';
                
                const projColors = PROJECT_THEMES[projects[idx].id];
                const svgEl = svgsRef.current[idx];

                // Dynamically color the active line itself as it progresses
                gsap.to(activeLineRef.current, {
                  backgroundColor: projColors.lineColor,
                  duration: 0.5,
                  ease: 'power2.out'
                });

                // Use GSAP for smooth interpolation of colors and glow
                gsap.to(iconEl, {
                  backgroundColor: projColors.activeBg,
                  borderColor: projColors.activeBorder,
                  boxShadow: projColors.activeShadow,
                  scale: 1,
                  duration: 0.5,
                  ease: 'power2.out'
                });
                
                if (svgEl) {
                  gsap.to(svgEl, {
                    filter: 'brightness(1.15)',
                    duration: 0.5,
                    ease: 'power2.out'
                  });
                }
              }
            }
          }
        }
      });

    }, containerRef);

    return () => {
      iconCirclesRef.current.forEach(iconEl => {
        if (iconEl && iconEl._cleanupHover) iconEl._cleanupHover();
      });
      ctx.revert();
    };
  }, [projects]);

  return (
    <>
      <div 
        className="z-40 w-full max-w-4xl mx-auto px-4 py-6 rounded-2xl relative" 
        ref={containerRef}
      >
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[23px] md:left-0 md:right-0 md:top-1/2 md:-translate-y-1/2 z-0 flex items-center justify-center">
            <div ref={baseLineRef} className="absolute left-0 top-0 w-[1px] h-[1px] md:w-full md:h-[1px] bg-border/30" />
            <div ref={activeLineRef} className="absolute left-0 top-0 z-10" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 md:gap-4">
            {projects.map((project, idx) => {
              const IconComponent = ICON_MAP[project.id] || Network;
              const theme = PROJECT_THEMES[project.id];
              
              return (
                <div 
                  key={project.id} 
                  ref={el => nodesRef.current[idx] = el}
                  id={`project-icon-wrapper-${project.id}`}
                  className="group flex flex-row md:flex-col items-center gap-6 md:gap-4 text-center cursor-pointer z-10 relative"
                  onClick={() => {
                    document.getElementById(`project-card-${project.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                    <div 
                      ref={el => iconCirclesRef.current[idx] = el}
                      id={`project-icon-${project.id}`}
                      className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full border flex items-center justify-center relative z-50 pointer-events-none"
                      style={{ 
                        transform: 'none', 
                        willChange: 'transform, opacity, box-shadow, background-color, border-color',
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        boxShadow: theme.defaultShadow
                      }}
                    >
                    <IconComponent 
                      size={20} 
                      strokeWidth={2} 
                      style={{ color: theme.color }}
                      className="transition-colors duration-300" 
                    />
                  </div>
                  
                  <div className="flex flex-col items-start md:items-center text-left md:text-center">
                    <span
                      className="text-xs font-sans tracking-wide leading-tight drop-shadow-sm text-ink-primary"
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

