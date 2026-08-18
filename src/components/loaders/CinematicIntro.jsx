import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Sparkles, Icosahedron, Edges } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Sweeping golden light across the 3D geometry
 */
function SweepingLight() {
  const lightRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 1.5) * 4;
      lightRef.current.position.z = Math.cos(t * 1.5) * 4;
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      color="#F8F2E8"
      intensity={2.5}
      position={[-5, 5, 5]}
    />
  );
}

/**
 * 3D Geometry that fades in and rotates slowly
 */
function AbstractGeometry({ isVisible, isDissolving }) {
  const groupRef = useRef(null);
  const materialRef = useRef(null);
  const edgesRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
      // Very subtle continuous scale expansion for cinematic feel
      groupRef.current.scale.x += delta * 0.015;
      groupRef.current.scale.y += delta * 0.015;
      groupRef.current.scale.z += delta * 0.015;
    }
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    if (materialRef.current) {
      materialRef.current.opacity = 0;
      materialRef.current.transparent = true;
    }
    if (edgesRef.current) {
      edgesRef.current.opacity = 0;
      edgesRef.current.transparent = true;
    }

    // Fade in when SVG finishes (at 1.4s)
    if (isVisible && !isDissolving) {
      tl.to([materialRef.current, edgesRef.current], {
        opacity: 0.8,
        duration: 0.95,
        ease: 'power2.inOut'
      });
    }

    // Dissolve when sequence ends (at 2.4s)
    if (isDissolving) {
      tl.to([materialRef.current, edgesRef.current], {
        opacity: 0,
        duration: 0.75,
        ease: 'power2.inOut'
      });
    }

    return () => tl.kill();
  }, [isVisible, isDissolving]);

  return (
    // Scaled up from 1.2 to 2.6 to match the larger SVG visual diameter
    <group ref={groupRef} scale={[2.6, 2.6, 2.6]}>
      <Icosahedron args={[1, 0]}>
        <meshPhysicalMaterial 
          ref={materialRef}
          color="#E8DCC5"
          metalness={0.5}
          roughness={0.2}
          transmission={0.5}
          thickness={1}
        />
        <Edges 
          ref={edgesRef} 
          scale={1.0} 
          threshold={15} 
          color="#B08A4A" 
        />
      </Icosahedron>
    </group>
  );
}

/**
 * Cinematic camera push
 */
function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 6);
    // Slow push forward
    gsap.to(camera.position, {
      z: 4,
      duration: 3.6,
      ease: 'none'
    });
  }, [camera]);

  return null;
}

/**
 * Blueprint to 3D Narrative Intro Loader.
 */
export function CinematicIntro({ onComplete }) {
  const loaderRef = useRef(null);
  const svgWrapperRef = useRef(null);
  const svgLinesRef = useRef([]);
  const [show3D, setShow3D] = useState(false);
  const [dissolve, setDissolve] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Total duration: 3.6s (approx 20% slower)
    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new Event('intro-complete'));
        if (onComplete) onComplete();
      }
    });

    // Setup SVG lines
    gsap.set(svgLinesRef.current, { 
      strokeDasharray: 1000, 
      strokeDashoffset: 1000,
      opacity: 1
    });

    // Setup initial scale of the SVG wrapper
    if (!reducedMotion) {
      gsap.set(svgWrapperRef.current, { scale: 0.55 });
    }

    // 0.25s: Draw blueprint lines
    tl.to(svgLinesRef.current, {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.12,
      ease: 'power3.inOut'
    }, 0.25);

    // 0.6s: Scale up the shape smoothly
    if (!reducedMotion) {
      tl.to(svgWrapperRef.current, {
        scale: 1,
        duration: 1.45,
        ease: 'power3.out'
      }, 0.6);
    }

    // 1.45s: SVG fades out, 3D geometry fades in
    tl.add(() => setShow3D(true), 1.45);
    tl.to(svgLinesRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.45);

    // 2.4s: Dissolve geometry
    tl.add(() => setDissolve(true), 2.4);

    // 3.1s: Trigger hero sequence
    tl.add(() => {
      window.dispatchEvent(new Event('intro-start-reveal'));
    }, 3.1);

    // 3.4s -> 5.2s: Intro overlay fades out slowly (1.8s) to reveal hero background
    tl.to(loader, {
      opacity: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.pointerEvents = 'none';
        loader.style.display = 'none';
      }
    }, 3.4);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      id="intro-loader"
      className="fixed inset-0 z-[9999] bg-ivory film-grain soft-vignette flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* 2D Overlay - SVG Blueprint */}
      <div 
        ref={svgWrapperRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.06))' }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="opacity-80"
          style={{ width: 'clamp(150px, 22vw, 320px)', height: 'clamp(150px, 22vw, 320px)', overflow: 'visible' }}
        >
          {/* Abstract architectural lines - vectorEffect prevents scaling the line thickness */}
          <path ref={el => svgLinesRef.current[0] = el} className="blueprint-line" vectorEffect="non-scaling-stroke" strokeWidth="1.2" d="M50 10 L90 50 L50 90 L10 50 Z" />
          <path ref={el => svgLinesRef.current[1] = el} className="blueprint-line" vectorEffect="non-scaling-stroke" strokeWidth="1.2" d="M50 10 L50 90" />
          <path ref={el => svgLinesRef.current[2] = el} className="blueprint-line" vectorEffect="non-scaling-stroke" strokeWidth="1.2" d="M10 50 L90 50" />
          <circle ref={el => svgLinesRef.current[3] = el} className="blueprint-line" vectorEffect="non-scaling-stroke" strokeWidth="1.2" cx="50" cy="50" r="28" />
        </svg>
      </div>

      {/* 3D Background - Geometry and Atmosphere */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <CameraRig />
          <ambientLight intensity={0.5} color="#FAFAF8" />
          <SweepingLight />
          
          <AbstractGeometry isVisible={show3D} isDissolving={dissolve} />
          
          <Sparkles 
            count={150} 
            scale={15} 
            size={1.5} 
            speed={0.2} 
            opacity={0.05} 
            color="#E8DCC5" 
          />
        </Canvas>
      </div>
    </div>
  );
}
