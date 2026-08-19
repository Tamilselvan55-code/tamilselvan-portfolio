import { forwardRef, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';

export const Button = forwardRef(({
  children,
  variant = 'primary',
  className,
  icon: Icon,
  onClick,
  as: Component = 'button',
  ...props
}, ref) => {
  const btnRef = useRef(null);
  const resolvedRef = ref || btnRef;
  const contentRef = useRef(null);

  useEffect(() => {
    const btn = resolvedRef.current;
    const content = contentRef.current;
    if (!btn || !content) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const isMobile = window.innerWidth < 768;
    
    if (isReducedMotion || isTouchDevice || isMobile) return;

    const xTo = gsap.quickTo(btn, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    
    const xToContent = gsap.quickTo(content, 'x', { duration: 1, ease: 'power3.out' });
    const yToContent = gsap.quickTo(content, 'y', { duration: 1, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.3);
      yTo(y * 0.3);
      xToContent(x * 0.1);
      yToContent(y * 0.1);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      xToContent(0);
      yToContent(0);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [resolvedRef]);

  const baseStyles = [
    'group relative inline-flex items-center justify-center gap-2',
    'px-9 py-[14px]',
    'min-h-[44px] min-w-[44px]',
    'font-sans font-medium text-[0.8125rem] uppercase tracking-[0.12em]',
    'border overflow-hidden',
    'transition-colors duration-500 ease-luxury',
  ].join(' ');

  const variants = {
    primary: [
      'bg-ink-primary text-canvas-white border-ink-primary',
      'hover:bg-transparent hover:text-accent hover:border-accent',
    ].join(' '),
    ghost: [
      'bg-transparent text-ink-primary border-border',
      'hover:border-accent hover:text-accent',
    ].join(' '),
    outline: [
      'bg-transparent text-accent border-accent',
      'hover:bg-accent hover:text-canvas-white',
    ].join(' '),
  };

  return (
    <Component
      ref={resolvedRef}
      onClick={onClick}
      className={twMerge(clsx(baseStyles, variants[variant]), className)}
      {...props}
    >
      {/* Shimmer sweep on hover */}
      <span
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent pointer-events-none skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden="true"
      />
      <span ref={contentRef} className="relative z-10 flex items-center gap-2 pointer-events-none">
        {Icon && <Icon size={16} />}
        {children}
      </span>
    </Component>
  );
});

Button.displayName = 'Button';
