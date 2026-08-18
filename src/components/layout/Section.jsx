import { forwardRef } from 'react';
import { cn } from '../ui/Button';

const Section = forwardRef(({ id, className, children, ...props }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative py-24 md:py-32 w-full", className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export { Section };
