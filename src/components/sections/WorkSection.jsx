import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/projects';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectIntroAnimation } from './ProjectIntroAnimation';

function ProjectVisual({ project, index }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isGrocery = project.id === '01' || (project.title && project.title.includes('Grocery'));
  const isHealthcare = project.id === '03' || (project.title && project.title.includes('Smart Healthcare Appointment'));
  const isParking = project.id === '02' || (project.title && project.title.includes('Smart Parking Management'));
  const useStandardCarousel = isGrocery || isHealthcare || isParking;
  const isCarousel = project.id === '04' || useStandardCarousel;
  const images = project.projectImages || project.images || [project.image];

  // Lightweight preloading of project images to prevent flicker
  useEffect(() => {
    images.forEach(src => {
      if (src) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [images]);

  const handleDragStart = (e) => {
    if (!isCarousel) return;
    setDragStart(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging || dragStart === null || !isCarousel) return;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    setDragOffset(currentX - dragStart);
  };

  const handleDragEnd = () => {
    if (!isDragging || !isCarousel) return;
    setIsDragging(false);
    
    if (dragOffset < -50 && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (dragOffset > 50 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
    setDragOffset(0);
  };

  const preventDragHandler = (e) => e.preventDefault();

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(prev => prev + 1);
  };

  if (project.id === '04') {
    return (
      <div 
        className="w-full h-full relative overflow-hidden flex flex-col justify-center py-4 lg:py-0 cursor-grab active:cursor-grabbing group/carousel"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div 
          className="flex h-full w-full"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {images.map((img, i) => (
            <div key={i} className="w-full h-full flex-shrink-0 flex items-center justify-center">
              <img
                src={img}
                alt={`${project.title} - ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[60vh] object-contain select-none z-0"
                onDragStart={preventDragHandler}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ink-primary/10 backdrop-blur-md flex items-center justify-center text-ink-primary hover:bg-ink-primary/20 transition-all opacity-0 group-hover/carousel:opacity-100 z-20 md:w-10 md:h-10 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
            )}
            
            {currentIndex < images.length - 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ink-primary/10 backdrop-blur-md flex items-center justify-center text-ink-primary hover:bg-ink-primary/20 transition-all opacity-0 group-hover/carousel:opacity-100 z-20 md:w-10 md:h-10 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            )}
          </>
        )}
        
        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto ${
                  i === currentIndex ? 'bg-accent/80 scale-110' : 'bg-ink-muted/30'
                }`}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`project-visual w-full h-full overflow-hidden relative group/visual group/carousel ${
        useStandardCarousel ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      onMouseDown={useStandardCarousel ? handleDragStart : undefined}
      onMouseMove={useStandardCarousel ? handleDragMove : undefined}
      onMouseUp={useStandardCarousel ? handleDragEnd : undefined}
      onMouseLeave={useStandardCarousel ? handleDragEnd : undefined}
      onTouchStart={useStandardCarousel ? handleDragStart : undefined}
      onTouchMove={useStandardCarousel ? handleDragMove : undefined}
      onTouchEnd={useStandardCarousel ? handleDragEnd : undefined}
    >
      {/* Project Image */}
      {useStandardCarousel ? (
        <>
          <div 
            className="flex h-full w-full absolute inset-0 z-0"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {images.map((img, i) => (
              <div key={i} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover z-0 select-none"
                  onDragStart={preventDragHandler}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              {currentIndex > 0 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ink-primary/10 backdrop-blur-md flex items-center justify-center text-ink-primary hover:bg-ink-primary/20 transition-all opacity-0 group-hover/carousel:opacity-100 z-20 md:w-10 md:h-10 cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </button>
              )}
              
              {currentIndex < images.length - 1 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ink-primary/10 backdrop-blur-md flex items-center justify-center text-ink-primary hover:bg-ink-primary/20 transition-all opacity-0 group-hover/carousel:opacity-100 z-20 md:w-10 md:h-10 cursor-pointer"
                  aria-label="Next Image"
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              )}
            </>
          )}
          
          {/* Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, i) => (
                <div 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto ${
                    i === currentIndex ? 'bg-accent/80 scale-110' : 'bg-ink-muted/30'
                  }`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        project.image && (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover/visual:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )
      )}
      <div className="project-visual-inner flex-col gap-6 p-8 relative z-10 pointer-events-none">
        {/* Project number watermark */}
        <div
          className="font-cinematic text-[6rem] leading-none font-bold text-ink-primary select-none"
          style={{ opacity: 0.04 }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        {/* Category pill */}
        <div className="flex items-center gap-3">
          <span className="text-[0.6875rem] font-sans font-medium tracking-[0.2em] uppercase border border-accent/40 text-accent px-3 py-1.5">
            {project.category}
          </span>
        </div>
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="text-[0.625rem] font-sans tracking-[0.1em] uppercase px-2.5 py-1 bg-ink-primary/[0.05] border border-ink-primary/10 text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Hover sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent opacity-0 group-hover/visual:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef    = useRef(null);
  const lineRef    = useRef(null);
  const visualRef  = useRef(null);
  const metaRef    = useRef(null);
  const titleRef   = useRef(null);
  const bodyRef    = useRef(null);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const line = lineRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set([card, metaRef.current, titleRef.current, bodyRef.current, ctaRef.current, visualRef.current], {
        opacity: 1, x: 0, y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(card,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(metaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        '-=0.55'
      )
      .fromTo([bodyRef.current, ctaRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(visualRef.current,
        { opacity: 0, scale: 0.96, x: 30 },
        { opacity: 1, scale: 1, x: 0, duration: 1.1, ease: 'expo.out' },
        '-=0.9'
      );

      const expandLine  = () => gsap.to(line, { scaleX: 1, duration: 0.5, ease: 'power3.out' });
      const contractLine = () => gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power2.in' });
      card.addEventListener('mouseenter', expandLine);
      card.addEventListener('mouseleave', contractLine);

      return () => {
        card.removeEventListener('mouseenter', expandLine);
        card.removeEventListener('mouseleave', contractLine);
      };
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <article
      id={`project-card-${project.id}`}
      ref={cardRef}
      className="group relative border-t border-border/70 pt-5 md:pt-6 pb-10"
      style={{ opacity: 0 }}
    >
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
          <div ref={metaRef} className="flex flex-wrap items-center gap-3 mb-6" style={{ opacity: 0 }}>
            <span className="text-[0.6rem] font-sans tracking-[0.25em] uppercase text-ink-muted/60 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-3 h-px bg-border-medium" aria-hidden="true" />
            <span className="text-[0.6875rem] font-sans tracking-[0.14em] uppercase text-accent font-medium">
              {project.category}
            </span>
          </div>

          <h3
            ref={titleRef}
            className="font-cinematic text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-ink-primary mb-5 group-hover:text-accent transition-colors duration-400"
            style={{ opacity: 0 }}
          >
            {project.title}
          </h3>

          <p
            ref={bodyRef}
            className="font-sans font-light text-ink-secondary leading-[1.85] max-w-[36rem] mb-8 text-[0.9375rem]"
            style={{ opacity: 0 }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.slice(0, 5).map(tag => (
              <span
                key={tag}
                className="text-[0.625rem] font-sans tracking-[0.12em] uppercase px-2.5 py-1 border border-border text-ink-muted hover:border-accent hover:text-accent transition-all duration-250"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* FL Mobile Image (Between Tags and CTA) */}
          {project.id === '04' && (
            <div className="block lg:hidden w-full h-auto mb-8 relative">
              <ProjectVisual project={project} index={index} />
            </div>
          )}

          <div className="flex items-center justify-between mt-auto relative">
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 relative z-30 pointer-events-auto" style={{ opacity: 0 }}>
              <Link
                to={project.status === 'In Progress' ? `/coming-soon/${project.id}` : `/project/${project.id}`}
                state={{ fromPortfolio: true }}
                onClick={(e) => e.stopPropagation()}
                className="group/link relative inline-flex items-center gap-2 text-[0.8125rem] font-sans font-medium tracking-[0.08em] uppercase text-ink-primary hover:text-accent transition-all duration-300 active:translate-y-[1px] active:opacity-80 p-3 -ml-3 -mr-1 -my-3 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                Case Study
                <ArrowUpRight size={14} className="transition-transform duration-300 ease-out group-hover/link:translate-x-[3px] group-hover/link:-translate-y-[3px]" />
                <span className="absolute bottom-[10px] left-3 w-[calc(100%-24px)] h-[1px] bg-ink-primary group-hover/link:w-[calc(100%-16px)] group-hover/link:bg-accent transition-all duration-300 ease-out" />
              </Link>
              
              {project.isLive ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/btn relative inline-flex items-center gap-1.5 text-[0.8125rem] font-sans text-ink-muted hover:text-accent transition-all duration-300 active:translate-y-[1px] active:opacity-80 p-3 -m-3 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                  Live <ArrowUpRight size={12} className="transition-transform duration-300 ease-out group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-[3px]" />
                </a>
              ) : (
                <Link to={`/coming-soon/${project.id}`}
                  state={{ fromPortfolio: true }}
                  onClick={(e) => e.stopPropagation()}
                  className="group/btn relative inline-flex items-center gap-1.5 text-[0.8125rem] font-sans text-ink-muted hover:text-accent transition-all duration-300 active:translate-y-[1px] active:opacity-80 p-3 -m-3 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                  Live <ArrowUpRight size={12} className="transition-transform duration-300 ease-out group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-[3px]" />
                </Link>
              )}

              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/btn relative inline-flex items-center gap-1.5 text-[0.8125rem] font-sans text-ink-muted hover:text-accent transition-all duration-300 active:translate-y-[1px] active:opacity-80 p-3 -m-3 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                Source <ArrowUpRight size={12} className="transition-transform duration-300 ease-out group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-[3px]" />
              </a>
            </div>
            {/* Target destination for flying icon - safely in document flow on LEFT side */}
            <div id={`project-dest-${project.id}`} className="w-12 h-12 md:w-14 md:h-14 shrink-0 relative z-10 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {/* Visual (Right) */}
        <div
          ref={visualRef}
          className={`w-full lg:w-[42%] shrink-0 group/visual ${
            project.id === '04' ? 'hidden lg:block h-auto relative' : 'aspect-[4/3] overflow-hidden relative'
          }`}
          style={{ opacity: 0 }}
        >
          {/* Corner marks */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/30 z-10" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/30 z-10" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/30 z-10" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/30 z-10" aria-hidden="true" />
          <ProjectVisual project={project} index={index} />
        </div>
      </div>

      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px bg-accent origin-left"
        style={{ width: '100%', transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
    </article>
  );
}

export function WorkSection() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const labelRef   = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set([labelRef.current, titleRef.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -16 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Icon Travel Logic
      if (!reduced) {
        PROJECTS.forEach(project => {
          const iconEl = document.getElementById(`project-icon-${project.id}`);
          const wrapperEl = document.getElementById(`project-icon-wrapper-${project.id}`);
          const destEl = document.getElementById(`project-dest-${project.id}`);
          const cardEl = document.getElementById(`project-card-${project.id}`);

          if (iconEl && wrapperEl && destEl && cardEl) {
            gsap.to(iconEl, {
              x: () => {
                const wrapperRect = wrapperEl.getBoundingClientRect();
                const destRect = destEl.getBoundingClientRect();
                return destRect.left - wrapperRect.left;
              },
              y: () => {
                const wrapperRect = wrapperEl.getBoundingClientRect();
                const destRect = destEl.getBoundingClientRect();
                return destRect.top - wrapperRect.top;
              },
              scale: 1.15,
              ease: 'none',
              scrollTrigger: {
                trigger: cardEl,
                start: 'top 90%', // Start flying as soon as card enters
                end: 'top 30%',   // Land when card reaches optimal viewing position
                scrub: true,
                invalidateOnRefresh: true,
              }
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative section-py section-padding max-w-[1500px] mx-auto w-full overflow-visible"
      aria-labelledby="work-title"
    >
      <div ref={labelRef} className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
        <span className="h-px w-10 bg-accent/60" />
        <span className="text-[0.6875rem] font-sans font-medium tracking-[0.3em] uppercase text-accent">
          Selected Work
        </span>
      </div>

      {/* Section title */}
      <h2
        ref={titleRef}
        id="work-title"
        className="font-cinematic text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.04] tracking-[-0.02em] text-ink-primary mb-6 md:mb-8"
        style={{ opacity: 0 }}
      >
        Real-world
        <br />
        <span className="italic text-accent">production applications.</span>
      </h2>

      <ProjectIntroAnimation projects={PROJECTS} />

      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
