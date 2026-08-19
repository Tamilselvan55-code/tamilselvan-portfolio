import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';

export function MobileMenu({ isOpen, onClose, links }) {
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  const linksRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tl = gsap.timeline();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      gsap.set(overlayRef.current, { display: 'flex' });
      
      tl.to(bgRef.current, {
        opacity: 1,
        backdropFilter: 'blur(20px)',
        duration: 0.6,
        ease: 'power3.out'
      })
      .fromTo(linksRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      
      tl.to(linksRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.05
      })
      .to(bgRef.current, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.1')
      .set(overlayRef.current, { display: 'none' });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      tl.kill();
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onClose();
    // Restore scroll immediately — don't wait for useEffect (which runs after re-render)
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    
    if (href.startsWith('#') && location.pathname !== '/') {
      navigate('/' + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 hidden flex-col items-center justify-center"
      aria-hidden={!isOpen}
    >
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-canvas-base/90 opacity-0 pointer-events-none"
      />
      
      {/* Links */}
      <nav className="relative z-50 flex flex-col items-center gap-8">
        {links.map((link, i) => (
          <a
            key={link.label}
            ref={el => linksRef.current[i] = el}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="text-[2.25rem] font-cinematic text-ink-primary hover:text-accent transition-colors duration-300 min-h-[48px] flex items-center justify-center px-4"
          >
            {link.label}
          </a>
        ))}
        <a
          ref={el => linksRef.current[links.length] = el}
          href="#contact"
          onClick={(e) => handleLinkClick(e, '#contact')}
          className="mt-8 text-[0.875rem] font-sans font-medium tracking-[0.1em] uppercase text-ink-primary border border-border px-8 py-4 hover:border-accent hover:text-accent transition-all duration-400 min-h-[48px] flex items-center justify-center"
        >
          Available <span className="ml-2 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </a>
      </nav>
    </div>
  );
}
