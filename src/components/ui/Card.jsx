import { forwardRef } from 'react';
import { cn } from './Button';

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "glass-panel rounded-xl overflow-hidden transition-all duration-400 group",
        "hover:-translate-y-2 hover:border-gold-muted hover:shadow-[0_0_20px_rgba(0,245,212,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };
