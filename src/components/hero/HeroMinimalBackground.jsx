import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export function HeroMinimalBackground() {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // 2.5s GSAP minimal loader: Logo fade in, scale, fade out
    const tl = gsap.timeline();
    
    tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power4.out" })
      .to(logoRef.current, { opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.inOut", delay: 0.5 })
      .to(loaderRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" })
      .add(() => {
        window.dispatchEvent(new Event('intro-complete'));
      });
      
    return () => tl.kill();
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none flex items-center justify-center">
      {/* GSAP Loader Overlay */}
      <div ref={loaderRef} className="absolute inset-0 z-50 bg-[#050505] flex items-center justify-center">
        <div 
          ref={logoRef} 
          className="text-gold-bright opacity-0 scale-95 font-body tracking-[0.3em] text-sm uppercase"
        >
          E C L I P S E
        </div>
      </div>
      {/* Subtle animated grain (SVG Noise) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      {/* Tiny Stars / Fog layer could be added here */}
    </div>
  );
}
