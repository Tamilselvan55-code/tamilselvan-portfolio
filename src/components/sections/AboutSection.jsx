import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SKILLS = [
  { label: 'React / Next.js', value: 95 },
  { label: 'Node.js / Express', value: 85 },
  { label: 'PostgreSQL / MongoDB', value: 80 },
  { label: 'UI/UX Design', value: 85 },
  { label: 'Tailwind / GSAP', value: 90 },
];

const QUALITIES = [
  { num: '4+',  label: 'Projects Built' },
  { num: '16+', label: 'Core Skills'    },
  { num: 'Final', label: 'Year B.Tech'    },
];

export function AboutSection() {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const titleRef   = useRef(null);
  const bodyRef    = useRef(null);
  const statsRef   = useRef(null);
  const skillsRef  = useRef(null);
  const barsRef    = useRef([]);
  const qualRef    = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set([labelRef.current, titleRef.current, bodyRef.current, statsRef.current, qualRef.current], {
        opacity: 1, y: 0, clipPath: 'none',
      });
      barsRef.current.forEach(b => b && (b.style.width = b.dataset.value + '%'));
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
        { y: 50, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)',
          duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
        }
      );

      gsap.fromTo([bodyRef.current, qualRef.current, statsRef.current],
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: bar.dataset.value + '%',
            duration: 1.6, ease: 'power3.out',
            scrollTrigger: { trigger: skillsRef.current, start: 'top 85%' },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-py bg-canvas-secondary overflow-hidden"
      aria-labelledby="about-title"
    >
      {/* Soft gold glow — no movement, pure atmosphere */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: '5%', right: '0',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="w-full section-padding mx-auto max-w-[1500px]">

        <div ref={labelRef} className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
          <span className="h-px w-10 bg-accent/60" />
          <span className="text-[0.6875rem] font-sans font-medium tracking-[0.3em] uppercase text-accent">
            About
          </span>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-16 lg:gap-16"
        >

          {/* Left */}
          <div>
            <h2
              ref={titleRef}
              id="about-title"
              className="font-cinematic text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-ink-primary mb-6 md:mb-8"
              style={{ opacity: 0 }}
            >
              Full Stack Developer
              <br />
              <span className="italic text-accent">& B.Tech IT Final Year Student.</span>
            </h2>

            <p
              ref={bodyRef}
              className="text-p font-sans font-light text-ink-secondary mb-8 max-w-[38rem] leading-[1.9]"
              style={{ opacity: 0 }}
            >
              I'm a passionate developer building modern web applications with React, Node.js, PostgreSQL, and AI-assisted workflows. My focus is on clean architecture, performance, and premium user experiences.
            </p>

            {/* Qualities */}
            <div ref={qualRef} className="grid grid-cols-3 gap-4 mb-12 pt-8 border-t border-border" style={{ opacity: 0 }}>
              {QUALITIES.map(({ num, label }) => (
                <div key={label}>
                  <div className="font-cinematic text-[2rem] leading-none text-ink-primary mb-1">{num}</div>
                  <div className="text-[0.6875rem] font-sans tracking-[0.12em] uppercase text-ink-muted">{label}</div>
                </div>
              ))}
            </div>

            {/* Education & Experience Container */}
            <div ref={statsRef} style={{ opacity: 0 }}>
              
              {/* Education */}
              <div className="mb-10">
                <h3 className="text-[0.6875rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-5">
                  Education
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-px h-full min-h-[3rem] bg-accent/30 mt-1 shrink-0" />
                  <div>
                    <div className="font-cinematic text-[1.5rem] leading-[1.2] text-ink-primary">
                      B.Tech Information Technology
                    </div>
                    <div className="text-[0.9375rem] font-sans text-ink-primary mt-2">
                      Rajalakshmi Engineering College, Chennai
                    </div>
                    <div className="text-[0.875rem] font-sans font-light text-ink-secondary mt-1">
                      2023 – 2027 &nbsp;&bull;&nbsp; Currently in Final Year
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-[0.6875rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-5">
                  Experience
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-px h-full min-h-[3rem] bg-accent/30 mt-1 shrink-0" />
                  <div>
                    <div className="font-cinematic text-[1.5rem] leading-[1.2] text-ink-primary">
                      Full Stack Development Intern
                    </div>
                    <div className="text-[0.9375rem] font-sans text-ink-primary mt-2">
                      Innovaskill Technologies Private Limited, Chennai
                    </div>
                    <div className="text-[0.875rem] font-sans font-light text-accent mt-1 mb-4">
                      June 2025
                    </div>
                    <ul className="text-[0.875rem] font-sans font-light text-ink-secondary list-disc list-outside ml-4 space-y-2 max-w-[34rem]">
                      <li>Developed responsive web applications using HTML5, CSS3, JavaScript, Node.js, Express.js, and MongoDB.</li>
                      <li>Worked on frontend and backend integration for full-stack web applications.</li>
                      <li>Gained hands-on experience in the Software Development Life Cycle (SDLC), including development, testing, debugging, and deployment.</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right — Skills */}
          <div id="skills" ref={skillsRef} className="flex flex-col justify-center gap-7">
            <h3 className="text-[0.6875rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-2">
              Technical Proficiency
            </h3>
            {SKILLS.map(({ label, value }, i) => (
              <div key={label}>
                <div className="flex justify-between mb-2.5">
                  <span className="text-[0.8125rem] font-sans font-medium text-ink-primary">{label}</span>
                  <span className="text-[0.75rem] font-sans tabular-nums text-ink-muted">{value}%</span>
                </div>
                <div className="h-px bg-border-medium w-full relative overflow-hidden">
                  <div
                    ref={el => barsRef.current[i] = el}
                    data-value={value}
                    className="absolute left-0 top-0 h-full bg-accent"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
