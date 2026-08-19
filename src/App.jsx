import { useState, useCallback, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { PortfolioGuide } from './components/tour/PortfolioGuide';
import { useLenis } from './hooks/useLenis';
import { useCinematic3D } from './hooks/useCinematic3D';

// Lazy load heavy components for performance
const CinematicIntro = lazy(() => import('./components/loaders/CinematicIntro').then(module => ({ default: module.CinematicIntro })));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails').then(module => ({ default: module.ProjectDetails })));
const ComingSoon = lazy(() => import('./pages/ComingSoon').then(module => ({ default: module.ComingSoon })));

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // Initialise Lenis smooth scroll
  useLenis();
  
  // Initialise Cinematic 3D Depth system globally, active only after intro
  useCinematic3D(introComplete);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <Router>
      <div className="min-h-[100svh] w-full max-w-[100vw] overflow-x-hidden bg-canvas-base text-ink-primary font-sans antialiased selection:bg-accent selection:text-white">
        
        {/* EXACT ORIGINAL INTRO - LEFT COMPLETELY OUTSIDE CINEMATIC WRAPPER */}
        <Suspense fallback={<div className="fixed inset-0 z-[9999] bg-ivory film-grain soft-vignette flex items-center justify-center overflow-hidden" aria-hidden="true"></div>}>
          <CinematicIntro onComplete={handleIntroComplete} />
        </Suspense>

        {/* Interactive Portfolio Guide - Temporarily disabled, keep for future development */}
        {/* <PortfolioGuide /> */}

        {/* FULL WEBSITE CINEMATIC 3D WRAPPER */}
        <div className="cinematic-scene" style={{ width: '100%', minHeight: '100svh' }}>
          <div className="cinematic-layer-global" data-cinematic-layer="global" style={{ width: '100%', minHeight: '100svh' }}>
            {/* Site chrome — appears after intro */}
            <Header introComplete={introComplete} />

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home introComplete={introComplete} />} />
              <Route path="/project/:projectId" element={
                <Suspense fallback={<div className="min-h-[100svh] w-full bg-canvas-base" aria-hidden="true" />}>
                  <ProjectDetails />
                </Suspense>
              } />
              <Route path="/coming-soon/:projectId" element={
                <Suspense fallback={<div className="min-h-[100svh] w-full bg-canvas-base" aria-hidden="true" />}>
                  <ComingSoon />
                </Suspense>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
