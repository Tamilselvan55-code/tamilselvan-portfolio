import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { PROJECTS } from '../data/projects';
import { ArrowLeft } from 'lucide-react';

export function ComingSoon() {
  const { projectId } = useParams();
  const project = PROJECTS.find(p => p.id === projectId);
  const navigate = useNavigate();
  
  const containerRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !containerRef.current) return;
    
    // Set static depths for layers
    gsap.set('.cs-bg', { z: -20, force3D: true, transformStyle: 'preserve-3d' });
    gsap.set('.cs-decorative', { z: -5, force3D: true, transformStyle: 'preserve-3d' });
    gsap.set('.cs-text', { z: 0, force3D: true, transformStyle: 'preserve-3d' });
    gsap.set('.cs-accent', { z: 10, force3D: true, transformStyle: 'preserve-3d' });

    const update = (time) => {
      if (containerRef.current) {
        const isMobile = window.innerWidth < 768;
        const mult = isMobile ? 0.2 : 1;
        // Subtle floating (Duration ~20s)
        const floatY = Math.sin(time * 0.3) * (1.5 * mult); // ±1.5px
        const floatRx = Math.sin(time * 0.25) * (0.15 * mult); // ±0.15deg
        const floatRy = Math.cos(time * 0.35) * (0.2 * mult); // ±0.2deg

        gsap.set(containerRef.current, {
          y: floatY,
          rotationX: floatRx,
          rotationY: floatRy,
          force3D: true
        });
      }
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      if (containerRef.current) gsap.set(containerRef.current, { clearProps: 'all' });
    };
  }, []);

  const handleBack = () => {
    const historyIndex = window.history.state?.idx;

    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <main className="min-h-[100svh] w-full bg-canvas-base flex flex-col items-center justify-center relative overflow-hidden" style={{ perspective: '1200px' }}>
      
      {/* Back Navigation (Outside 3D) */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-auto flex items-center gap-2">
        <button 
          onClick={handleBack}
          aria-label="Back to portfolio"
          className="relative flex items-center justify-center text-ink-primary hover:text-accent transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm after:absolute after:-inset-3 after:content-['']"
        >
          <ArrowLeft size={16} />
        </button>
        <button 
          onClick={handleBack}
          className="relative font-sans text-sm tracking-widest uppercase text-ink-primary hover:text-accent transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm after:absolute after:-inset-y-3 after:-inset-x-2 after:content-['']"
        >
          Back to Portfolio
        </button>
      </div>

      {/* 3D Composition Container */}
      <div ref={containerRef} className="relative w-full max-w-4xl flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Decorative Background Elements */}
        <div className="cs-bg absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[120%] h-[120%] bg-gradient-radial from-accent/[0.03] to-transparent opacity-60 mix-blend-multiply" />
        </div>
        
        <div className="cs-decorative absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          {/* Subtle geometric ring */}
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-border/40" />
          {/* Thin orbital ellipse */}
          <div className="absolute w-[400px] h-[200px] md:w-[700px] md:h-[350px] rounded-[100%] border border-accent/20 rotate-[-15deg]" />
        </div>

        {/* Text Layer */}
        <div className="cs-text relative z-10 flex flex-col items-center text-center p-8">
          <h1 className="font-cinematic text-[clamp(3rem,8vw,7rem)] leading-none text-ink-primary tracking-tight mb-6">
            COMING <span className="text-accent italic">SOON</span>
          </h1>
          
          <div className="w-16 h-px bg-border-medium mb-8" />
          
          {project && (
            <h2 className="font-sans text-lg md:text-xl font-medium text-ink-primary tracking-wide mb-4">
              {project.title}
            </h2>
          )}
          
          <p className="font-sans font-light text-ink-secondary text-sm md:text-base max-w-md mx-auto leading-relaxed">
            This project is currently under development. The live version will be available soon.
          </p>
        </div>
        
        {/* Accent Elements */}
        <div className="cs-accent absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-accent rotate-45" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-accent/70 rotate-45" />
          <div className="absolute top-1/2 right-1/3 w-2 h-2 border border-accent rotate-12" />
        </div>
        
      </div>
    </main>
  );
}
