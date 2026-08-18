/**
 * Reusable decorative visual language components.
 * Editorial, premium, minimal. Not particles — intentional accents.
 *
 * Usage:
 *   <DecorativeStar size={14} delay={1.5} top="10%" left="80%" />
 *   <DecorativeGlow color="gold" top="20%" right="5%" />
 *   <DecorativeDot top="50%" left="5%" />
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * 4-point star — editorial accent, subtle rotation + scale breathing.
 */
export function DecorativeStar({
  size = 12,
  color = '#B08A4A',
  opacity = 0.55,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 18,
  rotateDuration = 30,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Scale breathing
      gsap.to(el, {
        scale: 1.18,
        opacity: opacity * 1.5,
        duration: duration / 2,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      // Slow rotation
      gsap.to(el, {
        rotation: 45,
        duration: rotateDuration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, opacity, rotateDuration]);

  const style = { top, left, right, bottom, opacity };

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * Small glowing dot — can be gold, purple, white. Gentle pulse only.
 */
export function DecorativeDot({
  size = 5,
  color = '#9B7ED9',
  opacity = 0.5,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 12,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: opacity * 0.3,
        scale: 0.7,
        duration: duration / 2,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, opacity]);

  const glowColor = color + '66'; // 40% alpha for glow
  const style = { top, left, right, bottom, opacity };

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none select-none rounded-full ${className}`}
      style={{
        ...style,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2.5}px ${glowColor}`,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Tiny elongated spark — horizontal or vertical line, subtle opacity variation.
 */
export function DecorativeSpark({
  width = 24,
  height = 1,
  color = '#B08A4A',
  opacity = 0.4,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  delay = 0,
  duration = 14,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 0.5,
        opacity: opacity * 0.4,
        duration: duration / 2,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, opacity]);

  const style = { top, left, right, bottom, opacity, rotate: `${rotate}deg` };

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none select-none origin-left ${className}`}
      style={{
        ...style,
        width,
        height,
        background: `linear-gradient(to right, transparent, ${color}, transparent)`,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Soft ambient glow — large, blurred, static radial gradient.
 * No animation; used purely for depth/atmosphere.
 */
export function DecorativeGlow({
  size = 300,
  color = 'rgba(176,138,74,0.06)',
  top,
  left,
  right,
  bottom,
  className = '',
}) {
  const style = { top, left, right, bottom };

  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        ...style,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    />
  );
}
