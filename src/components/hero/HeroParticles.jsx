import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HeroParticles({ count = 150 }) {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  }, [count]);

  const colors = useMemo(() => {
    const colorArray = new Float32Array(count * 3);
    const gold = new THREE.Color('#FFD166');
    const teal = new THREE.Color('#00F5D4');
    
    for (let i = 0; i < count; i++) {
      const mixedColor = Math.random() > 0.5 ? gold : teal;
      // Slight brightness variation
      mixedColor.multiplyScalar(Math.random() * 0.5 + 0.5);
      
      colorArray[i * 3] = mixedColor.r;
      colorArray[i * 3 + 1] = mixedColor.g;
      colorArray[i * 3 + 2] = mixedColor.b;
    }
    return colorArray;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.05;
    points.current.rotation.x += delta * 0.02;
    // Breathing scale effect
    points.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
