/**
 * HeroSparkles — replaced with intentional large purple star decorators.
 *
 * 3 scroll-driven stars positioned to anchor the hero section visually.
 * No particle field. No dozens of tiny dots.
 * Stars fade in after the cinematic intro (delay: 5.5s).
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Inline SVG 5-point star — always a clean vector
function Star5({ size, color, opacity }) {
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

// A single hero star that fades in after intro and has a gentle idle float
function HeroStar({ size, color, opacity, top, left, right, bottom, delay, floatAmp = 18, floatDur = 14 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vw = window.innerWidth;
    const sizeScale = vw < 480 ? 0.45 : vw < 768 ? 0.65 : 1;
    const amp = reduced ? 0 : floatAmp * sizeScale;

    const ctx = gsap.context(() => {
      // Reveal after intro
      gsap.fromTo(el,
        { opacity: 0, scale: 0.7, rotation: -8 },
        { opacity: opacity * sizeScale, scale: 1, rotation: 0, duration: 1.6, delay, ease: 'expo.out' }
      );

      if (!reduced) {
        // Gentle infinite float — NOT scroll-linked — purely ambient breathing
        gsap.to(el, {
          y: -amp,
          rotation: 6,
          duration: floatDur / 2,
          delay: delay + 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, el);

    return () => ctx.revert();
  }, [delay, floatAmp, floatDur, opacity]);

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const sizeScale = vw < 480 ? 0.45 : vw < 768 ? 0.65 : 1;
  const actualSize = Math.round(size * sizeScale);

  const style = {
    position: 'absolute',
    top, left, right, bottom,
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform, opacity',
    zIndex: 1,
  };

  return (
    <div ref={ref} style={{ ...style, opacity: 0 }} aria-hidden="true">
      <Star5 size={actualSize} color={color} opacity={1} />
    </div>
  );
}

export function HeroSparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Star 1 — large, top-right, main anchor */}
      <HeroStar
        size={72}
        color="#7C3AED"
        opacity={0.7}
        top="18%"
        right="8%"
        delay={5.8}
        floatAmp={22}
        floatDur={16}
      />

      {/* Star 2 — medium, lower-left quadrant */}
      <HeroStar
        size={44}
        color="#6D28D9"
        opacity={0.55}
        top="62%"
        left="6%"
        delay={6.2}
        floatAmp={14}
        floatDur={20}
      />

      {/* Star 3 — small, mid-right, offset from orbital */}
      <HeroStar
        size={28}
        color="#8B5CF6"
        opacity={0.6}
        top="78%"
        right="22%"
        delay={6.6}
        floatAmp={10}
        floatDur={18}
      />
    </div>
  );
}
