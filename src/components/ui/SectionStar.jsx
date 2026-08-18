/**
 * SectionStar — premium scroll-driven 5-point purple star.
 *
 * Behavior:
 *  - Solid filled SVG 5-point star
 *  - Scroll-linked position: x, y, rotation, scale via GSAP ScrollTrigger scrub
 *  - Each instance has unique from/to values for varied choreography
 *  - prefers-reduced-motion: stars remain visible but static
 *  - pointer-events: none at all times
 *  - Responsive: size and movement scale down on tablet/mobile
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Canonical SVG 5-point star path, perfectly centered
function StarSVG({ size, color, opacity = 1 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* 5-point star path, centered at 50,50 */}
      <path
        d="M50 5
           L61.8 38.2 L97.6 38.2
           L68.1 59.8 L79.4 93
           L50 72.3 L20.6 93
           L31.9 59.8 L2.4 38.2
           L38.2 38.2 Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
}

/**
 * @param {object} props
 * @param {number}  props.size         Base size in px at desktop (default: 64)
 * @param {string}  props.color        Fill color (default: '#7C3AED')
 * @param {number}  props.baseOpacity  Resting opacity (default: 0.85)
 * @param {string}  props.trigger      CSS selector for the ScrollTrigger trigger element
 * @param {string}  props.start        ScrollTrigger start (default: 'top 80%')
 * @param {string}  props.end          ScrollTrigger end   (default: 'bottom 20%')
 * @param {number}  props.scrub        Scrub amount in seconds (default: 1.5)
 *
 * Movement from → to (all optional, default 0):
 * @param {number}  props.fromX
 * @param {number}  props.fromY
 * @param {number}  props.fromRotation
 * @param {number}  props.fromScale
 * @param {number}  props.toX
 * @param {number}  props.toY
 * @param {number}  props.toRotation
 * @param {number}  props.toScale
 *
 * Positioning (pass any valid CSS value):
 * @param {string}  props.top
 * @param {string}  props.left
 * @param {string}  props.right
 * @param {string}  props.bottom
 * @param {number}  props.zIndex
 * @param {string}  props.className    Extra wrapper classes
 */
export function SectionStar({
  size = 64,
  color = '#7C3AED',
  baseOpacity = 0.82,

  trigger,
  start = 'top 80%',
  end   = 'bottom 20%',
  scrub = 1.5,

  fromX        = 0,
  fromY        = 0,
  fromRotation = 0,
  fromScale    = 1,

  toX        = 0,
  toY        = 0,
  toRotation = 0,
  toScale    = 1,

  top, left, right, bottom,
  zIndex = 0,
  className = '',
}) {
  const starRef = useRef(null);

  useEffect(() => {
    const el = starRef.current;
    if (!el) return;

    // Detect reduced motion — keep star visible but static
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(el, { x: 0, y: 0, rotation: 0, scale: 1, opacity: baseOpacity });
      return;
    }

    // Detect screen size for responsive movement scaling
    const vw = window.innerWidth;
    let movScale = 1;
    if (vw < 480)       movScale = 0.2;   // mobile — very short movement
    else if (vw < 768)  movScale = 0.35;  // large mobile
    else if (vw < 1024) movScale = 0.55;  // tablet

    const ctx = gsap.context(() => {
      // Set initial "from" state immediately
      gsap.set(el, {
        x:        fromX        * movScale,
        y:        fromY        * movScale,
        rotation: fromRotation,
        scale:    fromScale,
        opacity:  0,           // start invisible, intro will reveal
      });

      // Reveal on first enter (not scrubbed — just a one-shot fade-in)
      gsap.to(el, {
        opacity: baseOpacity,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger || el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      // Scroll-scrubbed motion
      gsap.fromTo(el,
        {
          x:        fromX        * movScale,
          y:        fromY        * movScale,
          rotation: fromRotation,
          scale:    fromScale,
        },
        {
          x:        toX        * movScale,
          y:        toY        * movScale,
          rotation: toRotation,
          scale:    toScale,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger || el,
            start,
            end,
            scrub,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [
    trigger, start, end, scrub,
    fromX, fromY, fromRotation, fromScale,
    toX, toY, toRotation, toScale,
    baseOpacity,
  ]);

  // Responsive size
  const style = {
    position:      'absolute',
    top, left, right, bottom,
    zIndex,
    pointerEvents: 'none',
    userSelect:    'none',
    willChange:    'transform, opacity',
  };

  return (
    <div ref={starRef} className={className} style={style}>
      <StarSVG size={size} color={color} opacity={1} />
    </div>
  );
}

/**
 * Small variant — identical logic, just a convenience wrapper with smaller defaults.
 */
export function SectionStarSm(props) {
  return <SectionStar size={32} baseOpacity={0.65} {...props} />;
}

/**
 * Tiny sparkle variant — 4-point cross/plus star.
 */
export function SectionSparkle({
  size = 20,
  color = '#7C3AED',
  baseOpacity = 0.7,
  top, left, right, bottom,
  zIndex = 0,
  trigger,
  start = 'top 85%',
  end   = 'bottom 15%',
  scrub = 2,
  fromY = 12,
  toY   = -12,
  fromRotation = -10,
  toRotation   = 10,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(el, { opacity: baseOpacity });
      return;
    }

    const vw = window.innerWidth;
    const movScale = vw < 480 ? 0.3 : vw < 768 ? 0.5 : 1;

    const ctx = gsap.context(() => {
      gsap.set(el, { y: fromY * movScale, rotation: fromRotation, opacity: 0 });

      gsap.to(el, {
        opacity: baseOpacity,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger || el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.fromTo(el,
        { y: fromY * movScale, rotation: fromRotation },
        {
          y: toY * movScale,
          rotation: toRotation,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger || el,
            start, end, scrub,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [trigger, start, end, scrub, fromY, toY, fromRotation, toRotation, baseOpacity]);

  const style = {
    position: 'absolute',
    top, left, right, bottom,
    zIndex,
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform',
  };

  return (
    <div ref={ref} style={style} className={className} aria-hidden="true">
      {/* 4-point sparkle using SVG cross pattern */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          d="M50 5 L54 46 L95 50 L54 54 L50 95 L46 54 L5 50 L46 46 Z"
          fill={color}
          fillOpacity={1}
        />
      </svg>
    </div>
  );
}
