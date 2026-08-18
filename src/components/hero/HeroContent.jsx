import { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Button } from '../ui/Button';
import { HeroPortrait } from './HeroPortrait';

export function HeroContent({ introComplete }) {
  const wrapRef = useRef(null);
  const containerRef = useRef(null);
  
  // Refs for all text targets
  const metaRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const tamRef = useRef(null);
  const engRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);
  const statusRef = useRef(null);

  // Deterministic hidden state BEFORE intro completes (prevents ghosting)
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const targets = [
        metaRef.current, title1Ref.current, title2Ref.current,
        tamRef.current, engRef.current, descRef.current,
      ];
      const buttons = Array.from(btnsRef.current?.children || []);
      const statusBadge = statusRef.current;

      gsap.set(targets, { clipPath: 'inset(0% 100% 0% 0%)', y: 20, opacity: 0 });
      gsap.set([...buttons, statusBadge], { opacity: 0, y: 20 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!introComplete || !containerRef.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const targets = [
        metaRef.current, title1Ref.current, title2Ref.current,
        tamRef.current, engRef.current, descRef.current,
      ];
      const buttons = Array.from(btnsRef.current?.children || []);
      const statusBadge = statusRef.current;

      if (reduced) {
        gsap.to([...targets, ...buttons, statusBadge], { 
          opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 
        });
        return;
      }

      // ONE Single Timeline
      const tl = gsap.timeline();

      // Premium Editorial Reveal (Left-to-Right Mask + Upward Drift)
      targets.forEach((target, index) => {
        // Fade in quickly so the wipe is actually visible
        tl.to(target, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        }, index * 0.2); // Stagger offset

        // The actual left-to-right wipe mask
        tl.to(target, {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          clearProps: 'clipPath'
        }, index * 0.2);
      });

      tl.to(buttons, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }, "-=0.6")
      .to(statusBadge, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, [introComplete]);

  useEffect(() => {
    // Scroll parallax removed to prevent overlapping header area
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative z-20 section-padding mx-auto flex flex-col min-h-[100svh] h-auto lg:h-[100svh]"
      style={{ width: 'min(94vw, 1600px)', paddingTop: 'calc(72px + 4vh)', paddingBottom: '3vh' }}
    >
      {/* ── Two-column hero grid ──────────────────────────── */}
      <div
        className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch gap-10 lg:gap-0"
      >

        {/* ── LEFT COLUMN — text content ───────────────────── */}
        <div data-cinematic-layer="content">
          <div ref={containerRef} className="w-full flex flex-col justify-start lg:pt-4">

            {/* ── Meta label ──────────────────────────────────── */}
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span ref={metaRef} className="text-[0.75rem] font-sans font-medium tracking-[0.25em] uppercase text-ink-muted inline-block">
                Full Stack Developer &bull; Open to Opportunities
              </span>
            </div>

            {/* ── Headline ─────────────────────────────────────── */}
            <div className="perspective-1000 overflow-hidden">
              <h1 className="font-cinematic text-hero tracking-[-0.02em] text-ink-primary mb-6 flex flex-col">
                <span ref={title1Ref} className="block whitespace-nowrap !text-[#4A4742]">Design,</span>
                <span ref={title2Ref} className="block whitespace-nowrap text-accent">Engineered.</span>
              </h1>
            </div>

            {/* ── Name Identity Block ───────────────────────────── */}
            <div className="name-identity-block overflow-hidden" style={{ marginBottom: '20px' }}>
              <div className="text-tamil-name overflow-hidden" style={{ marginBottom: '8px' }}>
                <span ref={tamRef} className="inline-block !text-[#4A4742]">தமிழ்செல்வன்</span>
              </div>
              <div className="text-eng-name overflow-hidden" aria-label="Tamilselvan">
                <span ref={engRef} className="inline-block !text-[#4A4742]">Tamilselvan</span>
              </div>
            </div>

            {/* ── Description ───────────────────────────────────── */}
            <p
              ref={descRef}
              className="text-p font-sans font-light text-ink-secondary max-w-[28rem] leading-[1.8]"
              style={{ marginBottom: '28px' }}
            >
              I build premium full-stack web applications with a strong focus on performance, user experience, clean architecture, and modern design.
            </p>

            {/* ── Buttons ──────────────────────────────────────── */}
            <div ref={btnsRef} className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire Me
              </Button>
              <Button variant="ghost" onClick={() => window.open('https://www.linkedin.com/in/tamilselvan-e-69040b2a2/', '_blank', 'noopener,noreferrer')}>
                Let&apos;s Connect
              </Button>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — portrait ──────────────────────── */}
        <div className="w-full h-[480px] md:h-[580px] lg:h-full relative">
          <HeroPortrait introComplete={introComplete} />
        </div>

      </div>

      {/* ── Status badge ─────────────────────────────────── */}
      <div
        ref={statusRef}
        className="hero-status absolute bottom-8 right-14 hidden lg:flex flex-col items-end gap-1"
      >
        <span className="text-[0.6875rem] font-sans tracking-[0.2em] uppercase text-ink-muted">Status</span>
        <span className="text-[0.8125rem] font-sans font-medium text-ink-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-accent-glow" />
          Open to Work
        </span>
      </div>
    </div>
  );
}

