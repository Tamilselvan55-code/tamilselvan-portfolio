export function HeroScrollIndicator() {
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <button
      id="hero-scroll-indicator" // Add ID to allow GSAP to target it easily
      onClick={handleScroll}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 group"
      aria-label="Scroll to explore"
      style={{ opacity: 0 }} // Start hidden, GSAP will fade it in
    >
      {/* Animated scroll line */}
      <div className="relative w-px h-14 bg-ink-faint overflow-hidden">
        {/* We can use CSS animation for the infinite moving line */}
        <div
          className="absolute inset-x-0 h-1/2 bg-accent"
          style={{ animation: 'scroll-line 1.6s linear infinite' }}
        />
        <style>{`
          @keyframes scroll-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </div>
      <span className="text-[0.625rem] font-sans font-medium tracking-[0.25em] uppercase text-ink-muted group-hover:text-accent transition-colors duration-300">
        Scroll
      </span>
    </button>
  );
}
