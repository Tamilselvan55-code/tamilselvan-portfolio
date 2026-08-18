import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { HeroParticles } from './HeroParticles';
import * as THREE from 'three';

// Component to handle camera drift
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector2());

  useFrame((state) => {
    // Read global mouse
    target.current.x = (state.pointer.x * 0.5);
    target.current.y = (state.pointer.y * 0.5);

    // Lerp camera position for smooth cinematic drift
    camera.position.x += (target.current.x - camera.position.x) * 0.02;
    camera.position.y += (target.current.y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroCanvas() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <CameraController />
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <fog attach="fog" args={['#05050A', 3, 10]} />
            <HeroParticles count={window.innerWidth < 768 ? 100 : 300} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
