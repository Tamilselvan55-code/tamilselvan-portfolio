import { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

/**
 * HeroPortrait - Premium 3D orbital system around AI cutout portrait.
 *
 * Layout hierarchy (3D isolation):
 *
 *   rootRef (absolute inset-0, plain 2D flex container)
 *   │
 *   ├── orbits-container (absolute inset-0, OWN perspective+preserve-3d context)
 *   │     └── 4 tilted ring divs with GSAP rotationZ
 *   │
 *   ├── 4 SVG orbital-direction arrows (absolute, rAF-positioned in screen space)
 *   │
 *   └── portraitWrapRef (explicit width+height, overflow:hidden, isolation:isolate)
 *         │  Clips the 3D perspective ink-overflow; keeps portrait inside orbit area.
 *         │  React owns this layer; GSAP never touches it.
 *         │
 *         └── rotationWrapRef — GSAP's exclusive target for rotationY+transformPerspective
 *               └── full-body portrait <img>
 *
 * The orbit context and portrait context are fully independent — no shared 3D space.
 */
export function HeroPortrait({ introComplete }) {
  const frontImgRef = useRef(null);
  const backImgRef = useRef(null);
  const portraitWrapRef = useRef(null); // Outer layout/clip wrapper — React only
  const rotationWrapRef = useRef(null); // Inner rotation target — GSAP only
  const rootRef = useRef(null); // Root — screen-space origin for rAF arrow overlay

  // Orbit ring refs
  const orbit1 = useRef(null);
  const orbit2 = useRef(null);
  const orbit3 = useRef(null);
  const orbit4 = useRef(null);

  const marker1 = useRef(null);
  const marker2 = useRef(null);
  const marker3 = useRef(null);
  const marker4 = useRef(null);

  // 2D overlay orbital-direction arrow refs — positioned in screen space by rAF
  const arrow1 = useRef(null);
  const arrow2 = useRef(null);
  const arrow3 = useRef(null);
  const arrow4 = useRef(null);





  // ── Entrance — set initial opacity (no blur/scale/y → no white flash) ────
  useLayoutEffect(() => {
    if (!frontImgRef.current || !backImgRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const allOrbits = [orbit1.current, orbit2.current, orbit3.current, orbit4.current];
    const allOrbitArrows = [arrow1.current, arrow2.current, arrow3.current, arrow4.current];
    if (reduced) {
      gsap.set([frontImgRef.current, backImgRef.current], { opacity: 1 });
      gsap.set(allOrbits, { opacity: 1 });
      gsap.set(allOrbitArrows, { opacity: 1 });
      return;
    }
    gsap.set([frontImgRef.current, backImgRef.current], { opacity: 0 });
    gsap.set(allOrbits, { opacity: 0 });
    gsap.set(allOrbitArrows, { opacity: 0 });
  }, []);

  // ── Fade portrait, orbits, and nav arrows in after intro ─────────────────
  useEffect(() => {
    if (!introComplete || !frontImgRef.current || !backImgRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.to([frontImgRef.current, backImgRef.current], { opacity: 1, duration: 1.4, ease: 'power2.out', delay: 0.3 });

    const allOrbits = [orbit1.current, orbit2.current, orbit3.current, orbit4.current];
    const allOrbitArrows = [arrow1.current, arrow2.current, arrow3.current, arrow4.current];
    gsap.to([...allOrbits, ...allOrbitArrows], { opacity: 1, duration: 1.4, ease: 'power2.out', delay: 0.3 });

    return () => { };
  }, [introComplete]);

  // ── Portrait 360° Spin Cycle ─────────────────────────────────────────────
  //
  // Targets rotationWrapRef ONLY — pure GSAP domain, React never writes here.
  // Sequence (repeats forever):
  //   2.5 s still (Real Photo) → 1.2 s 180° spin → 2.5 s still (Cartoon) → 1.2 s 180° spin → repeat
  useEffect(() => {
    if (!introComplete || !rotationWrapRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(rotationWrapRef.current, { rotationY: 0 });
      return;
    }

    gsap.set(rotationWrapRef.current, { rotationY: 0 });

    const tl = gsap.timeline({ delay: 2.5, repeat: -1, repeatDelay: 2.5 });
    
    // Flip to Cartoon Photo
    tl.to(rotationWrapRef.current, { rotationY: 180, duration: 1.2, ease: 'power2.inOut' })
      // Flip back to Real Photo
      .to(rotationWrapRef.current, { rotationY: 360, duration: 1.2, ease: 'power2.inOut', delay: 2.5 });

    return () => { tl.kill(); };
  }, [introComplete]);

  // ── Orbit spin animations ─────────────────────────────────────────────────
  useEffect(() => {
    if (!introComplete) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(orbit1.current, { rotationZ: 360, duration: 28, ease: 'none', repeat: -1 });
      gsap.to(orbit2.current, { rotationZ: -360, duration: 34, ease: 'none', repeat: -1 });
      gsap.to(orbit3.current, { rotationZ: 360, duration: 40, ease: 'none', repeat: -1 });
      gsap.to(orbit4.current, { rotationZ: -360, duration: 46, ease: 'none', repeat: -1 });
    });

    return () => ctx.revert();
  }, [introComplete]);

  // ── Orbit configurations ──────────────────────────────────────────────────
  const orbits = [
    { id: 1, size: 'clamp(454px, 36vw, 598px)',   transform: 'rotateX(72deg) rotateY(-12deg)', borderColor: 'rgba(74, 48, 32, 0.95)', dir: 1,  ref: orbit1, arrow: arrow1 },
    { id: 2, size: 'clamp(418px, 32.7vw, 554px)', transform: 'rotateX(62deg) rotateY(28deg)',  borderColor: 'rgba(74, 48, 32, 0.95)', dir: -1, ref: orbit2, arrow: arrow2 },
    { id: 3, size: 'clamp(381px, 29.1vw, 509px)', transform: 'rotateX(42deg) rotateY(-25deg)', borderColor: 'rgba(74, 48, 32, 0.95)', dir: 1,  ref: orbit3, arrow: arrow3 },
    { id: 4, size: 'clamp(345px, 25.4vw, 463px)', transform: 'rotateX(82deg) rotateY(8deg)',   borderColor: 'rgba(74, 48, 32, 0.95)', dir: -1, ref: orbit4, arrow: arrow4 },
  ];



  return (
    <div
      ref={rootRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      data-portrait-root
    >
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1200 }}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ── 3D ORBITS ───────────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
            data-cinematic-layer="orbits"
          >
            {orbits.map((orbit) => (
              <div
                key={orbit.id}
                className="absolute flex items-center justify-center"
                style={{ width: orbit.size, height: orbit.size, transform: orbit.transform, transformStyle: 'preserve-3d' }}
              >
                <div
                  ref={orbit.ref}
                  className="w-full h-full rounded-full relative"
                  style={{ border: `1.5px solid ${orbit.borderColor}`, willChange: 'transform', transformStyle: 'preserve-3d' }}
                >
                  {/* Arrowhead embedded in the orbit path in 3D */}
                  <svg
                    ref={orbit.arrow}
                    width="12" height="12" viewBox="0 0 10 10"
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      left: '50%',
                      transform: `translateX(-50%) rotate(${orbit.dir === 1 ? 90 : -90}deg)`,
                      opacity: 0,
                      overflow: 'visible'
                    }}
                  >
                    <path d="M 5 0.5 L 10 9.5 L 5 7 L 0 9.5 Z" fill="#4A3020" stroke="none" style={{ opacity: 0.95 }} />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* ── PORTRAIT VIEWPORT ───────────────────────────────────────────── */}
          <div
            ref={portraitWrapRef}
            className="absolute flex justify-center items-center"
            style={{
              width: 'clamp(220px, 22vw, 360px)',
              height: 'clamp(470px, 70vh, 760px)',
              minHeight: '300px',
              transformStyle: 'preserve-3d',
            }}
            data-cinematic-layer="portrait"
          >
            <div
              ref={rotationWrapRef}
              style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
            >
              {/* Front face (Real Photo) */}
              <div 
                style={{ 
                  position: 'absolute', inset: 0, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backfaceVisibility: 'hidden',
                  isolation: 'isolate'
                }}
              >
                <img
                  ref={frontImgRef}
                  src="/images/tamilselvan-cutout-new.png"
                  alt="Tamilselvan - Full Stack Developer"
                  draggable={false}
                  loading="eager"
                  className="h-full w-auto object-contain"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.85) 88%, rgba(0,0,0,0.35) 95%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.85) 88%, rgba(0,0,0,0.35) 95%, transparent 100%)',
                  }}
                />
                
                {/* Localized Face Brightness Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay"
                  style={{
                    background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 15%, transparent 35%)',
                    WebkitMaskImage: 'url(/images/tamilselvan-cutout-new.png)',
                    maskImage: 'url(/images/tamilselvan-cutout-new.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                  }}
                />
              </div>

              {/* Back face (Cartoon Photo) */}
              <div 
                style={{ 
                  position: 'absolute', inset: 0, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <img
                  ref={backImgRef}
                  src="/images/cartoon-portrait-transparent.png"
                  alt="Cartoon Avatar"
                  draggable={false}
                  loading="lazy"
                  className="h-full w-auto object-contain"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.85) 88%, rgba(0,0,0,0.35) 95%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 0%, black 82%, rgba(0,0,0,0.85) 88%, rgba(0,0,0,0.35) 95%, transparent 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

