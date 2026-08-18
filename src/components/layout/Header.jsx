import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MobileMenu } from './MobileMenu';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'About',   href: '#about'   },
  { label: 'Contact', href: '#contact' },
];

export function Header({ introComplete = false }) {
  const headerRef  = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animate in after intro completes
  useEffect(() => {
    if (!introComplete) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [introComplete]);

  // Scroll state for glass effect
  const scrolledRef = useRef(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 60;
          if (isScrolled !== scrolledRef.current) {
            scrolledRef.current = isScrolled;
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Init state
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      style={{ opacity: 0 }}
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'h-16 md:h-[72px]',
        'transition-all duration-500 ease-out',
        scrolled
          ? 'bg-canvas-base/90 backdrop-blur-xl border-b border-border shadow-[0_1px_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between h-full px-6 md:px-10 lg:px-16">
      {/* Brand mark */}
      <Link
        to="/"
        className="flex items-center gap-3 group"
        aria-label="Tamil Selvan — Home"
      >
        {/* Uploaded Logo */}
        <div className="w-[42px] h-[42px] md:w-[52px] md:h-[52px] rounded-full overflow-hidden flex items-center justify-center shrink-0 relative border border-ink-primary/10 group-hover:border-accent/40 transition-colors duration-300 bg-[#E8E3D9]">
          <img 
            src="/logo/tamilselvan-logo.png" 
            alt="Tamilselvan" 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: 'center' }}
          />
        </div>
        {/* Full name — hidden on smallest screens */}
        <span className="hidden sm:block text-[0.75rem] font-sans font-medium tracking-[0.12em] text-ink-secondary group-hover:text-ink-primary transition-colors duration-300">
          Tamilselvan
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex items-center gap-9"
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="relative text-[0.8125rem] font-sans font-medium tracking-wide text-ink-secondary hover:text-ink-primary transition-colors duration-300 group py-1"
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-[width] duration-400 ease-out" />
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-6">
        {/* Available status */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-accent-glow" aria-hidden="true" />
          <span className="text-[0.6875rem] font-sans tracking-[0.12em] uppercase text-ink-muted">
            Available
          </span>
        </div>

        {/* CTA link */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="text-[0.75rem] font-sans font-medium tracking-[0.12em] uppercase text-ink-primary border border-ink-primary/25 px-5 py-2.5 hover:border-accent hover:text-accent transition-all duration-300"
        >
          Hire Me
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden relative z-50 flex flex-col justify-center items-center w-11 h-11 gap-[6px]"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={`block h-px w-6 bg-ink-primary transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8.5px]' : ''}`} />
        <span className={`block h-px bg-ink-primary transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}`} />
        <span className={`block h-px w-6 bg-ink-primary transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8.5px]' : ''}`} />
      </button>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </header>
  );
}
