import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroScene } from './scenes/HeroScene';

export function EclipseWorld({ introComplete }) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,           // transparent canvas background
          powerPreference: 'high-performance',
          toneMapping: 2,        // ACESFilmicToneMapping
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.5]}           // cap pixel ratio for performance
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <HeroScene introComplete={introComplete} />
        </Suspense>
      </Canvas>
    </div>
  );
}
