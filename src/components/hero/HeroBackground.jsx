/**
 * Premium light hero background.
 * Features:
 *  - Warm radial gradient base
 *  - Floating translucent geometric planes (CSS animated)
 *  - Blurred soft shapes
 *  - Noise grain overlay
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" data-cinematic-layer="bg">

      {/* ── Layer 0: Base canvas gradient ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(170deg, #FAFAF8 0%, #F6F4EF 50%, #F0EDE6 100%)',
        }}
      />

      {/* ── Layer 1: Warm accent radial (top-left) ────────── */}
      <div
        className="absolute"
        style={{
          width: '70vmax', height: '70vmax',
          top: '-20%', left: '-15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Layer 2: Purple atmospheric radial (bottom-right) ──────────── */}
      <div
        className="absolute"
        style={{
          width: '60vmax', height: '60vmax',
          bottom: '-15%', right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Layer 2.5: Subtle blue accent (center-left) ──────────── */}
      <div
        className="absolute"
        style={{
          width: '40vmax', height: '40vmax',
          top: '30%', left: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Layer 2.6: Subtle coral accent (top-right) ──────────── */}
      <div
        className="absolute"
        style={{
          width: '50vmax', height: '50vmax',
          top: '-10%', right: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,68,68,0.03) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ── Layer 3: Floating glass plane — large rectangle ── */}
      <div
        className="absolute animate-slow-drift"
        style={{
          width: '55vw', height: '55vw',
          top: '5%', right: '-10%',
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(1px)',
          border: '1px solid rgba(255,255,255,0.8)',
          borderRadius: '2px',
          transform: 'rotate(-8deg)',
        }}
      />

      {/* ── Layer 4: Smaller glass plane — warm tint ─────── */}
      <div
        className="absolute animate-slow-drift"
        style={{
          width: '30vw', height: '40vw',
          bottom: '10%', left: '-5%',
          background: 'rgba(212,175,55,0.04)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: '2px',
          transform: 'rotate(6deg)',
          animationDelay: '3s',
          animationDuration: '18s'
        }}
      />

      {/* ── Layer 5: Blurred accent blob — center-right ───── */}
      <div
        className="absolute"
        style={{
          width: '40vw', height: '40vw',
          top: '30%', right: '5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,234,220,0.8) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Layer 6: Thin horizontal accent line ──────────── */}
      <div
        className="absolute origin-left opacity-30"
        style={{
          width: '60vw', height: '1px',
          top: '50%', left: '20%',
          background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)',
          animation: 'sweep 12s ease-in-out infinite alternate'
        }}
      />

      {/* ── Layer 7: Noise grain (SVG) ────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* ── Layer 8: Bottom gradient fade ────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to top, #FAFAF8, transparent)' }}
      />
    </div>
  );
}
