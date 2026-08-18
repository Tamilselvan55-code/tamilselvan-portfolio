import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Premium light-theme 3D scene.
 *  - Thin floating rings (TorusGeometry) — very slow rotation
 *  - Glass/transmission sphere — reflective, minimal
 *  - Soft warm ambient + directional light
 *  - Mouse influence: camera ±2–4° only
 */
export function HeroScene({ introComplete }) {
  const ring1Ref  = useRef();
  const ring2Ref  = useRef();
  const ring3Ref  = useRef();
  const groupRef  = useRef();
  const speedRef  = useRef(1.65); // Increased speed by ~37.5% from 1.2

  const { camera } = useThree();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  
  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    gsap.set(groupRef.current, { visible: false });

    if (introComplete) {
      gsap.set(groupRef.current, { visible: true });
      // Removed group rotation/scale entrance animations for perfect stability
    }
  }, [camera, introComplete]);

  useFrame((state) => {
    const delta = state.clock.getDelta();
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Rings — perfect circular orbits via respective axes
    const spd = speedRef.current;
    
    // Convert duration to angular velocity (radians per second)
    const v1 = (Math.PI * 2) / 18; 
    const v2 = (Math.PI * 2) / 24; 
    const v3 = (Math.PI * 2) / 30; 

    if (ring1Ref.current) ring1Ref.current.rotation.x += v1 * spd * delta;
    if (ring2Ref.current) ring2Ref.current.rotation.y += v2 * spd * delta;
    if (ring3Ref.current) ring3Ref.current.rotation.z += v3 * spd * delta;
    
    // Mouse Parallax - very subtle
    if (!isReducedMotion && !isMobile && groupRef.current) {
      mouse.current.lerp(state.pointer, 0.05);
      
      // Calculate target rotation based on mouse (max 4 degrees)
      targetRotation.current.x = (mouse.current.y * Math.PI) / 45; // ~4 deg max
      targetRotation.current.y = (mouse.current.x * Math.PI) / 45; 
      
      // Lerp group rotation towards target
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* ── Lighting ──────────────────────────────────────── */}
      <ambientLight intensity={1.2} color="#F8F2E8" />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" castShadow />
      <pointLight position={[-4, 3, 4]} intensity={0.6} color="#E8D8C0" />
      <pointLight position={[4, -2, 3]} intensity={0.3} color="#B08A4A" />

      {/* ── Orbital Rings ─────────────────────────────────── */}
      
      {/* Ring 1: Thickest, X 25°, Y 0° */}
      <group rotation={[25 * (Math.PI / 180), 0, 0]}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.4, 0.015, 32, 128]} />
          <meshStandardMaterial color="#B8975B" metalness={0.9} roughness={0.1} transparent opacity={0.75} />
        </mesh>
      </group>

      {/* Ring 2: Medium, X 70°, Y 20° */}
      <group rotation={[70 * (Math.PI / 180), 20 * (Math.PI / 180), 0]}>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.6, 0.010, 32, 128]} />
          <meshStandardMaterial color="#B8975B" metalness={0.9} roughness={0.15} transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Ring 3: Thin, X -40°, Y 45° */}
      <group rotation={[-40 * (Math.PI / 180), 45 * (Math.PI / 180), 0]}>
        <mesh ref={ring3Ref}>
          <torusGeometry args={[1.8, 0.006, 32, 128]} />
          <meshStandardMaterial color="#B8975B" metalness={0.8} roughness={0.2} transparent opacity={0.55} />
        </mesh>
      </group>

      {/* Dark central sphere REMOVED — person is the visual center */}
    </group>
  );
}
