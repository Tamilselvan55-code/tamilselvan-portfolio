import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { PROJECTS } from '../data/projects';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

export function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(null);

  const handleBack = () => {
    if (location.state?.fromPortfolio) {
      navigate(-1);
      return;
    }
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  const projectIndex = PROJECTS.findIndex(p => p.id === projectId);
  const project = PROJECTS[projectIndex];

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    if (!project) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) {
      gsap.set(pageRef.current, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [project, projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center section-padding">
        <div className="text-center">
          <h1 className="font-cinematic text-5xl mb-6">Project not found</h1>
          <Link to="/" className="btn-luxury">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div id="case-study" ref={pageRef} className="min-h-screen pt-32 pb-24 section-padding max-w-[1400px] mx-auto opacity-0">
      
      {/* Back Navigation */}
      <div className="flex items-center gap-3 mb-16">
        <button 
          onClick={handleBack}
          aria-label="Back to portfolio"
          className="relative flex items-center justify-center text-ink-muted hover:text-accent transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm after:absolute after:-inset-3 after:content-['']"
        >
          <ArrowLeft size={16} />
        </button>
        <button 
          onClick={handleBack}
          className="relative text-sm font-sans tracking-[0.15em] uppercase text-ink-muted hover:text-accent transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm after:absolute after:-inset-y-3 after:-inset-x-2 after:content-['']"
        >
          Back to Portfolio
        </button>
      </div>

      {/* Header */}
      <header className="mb-20">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="text-[0.6875rem] font-sans tracking-[0.2em] uppercase text-ink-muted">
            {project.id}
          </span>
          <span className="h-px w-6 bg-border" />
          <span className="text-[0.75rem] font-sans tracking-[0.12em] uppercase text-accent border border-accent/30 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <span className="text-[0.75rem] font-sans tracking-[0.1em] text-ink-muted">
            {project.timeline}
          </span>
        </div>
        
        <h1 className="font-cinematic text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-ink-primary mb-8 max-w-4xl">
          {project.title}
        </h1>
        
        <p className="text-xl md:text-2xl font-sans font-light text-ink-secondary leading-relaxed max-w-3xl mb-12">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {project.isLive ? (
            <>
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink-primary text-canvas-base text-sm font-sans tracking-[0.1em] uppercase hover:bg-accent hover:text-white transition-colors duration-300"
              >
                <ExternalLink size={16} />
                <span>Live Website</span>
              </a>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-ink-primary text-sm font-sans tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                <span>GitHub Repo</span>
              </a>
            </>
          ) : (
            <>
              <Link 
                to={`/coming-soon/${project.id}`}
                state={{ fromPortfolio: true }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink-primary text-canvas-base text-sm font-sans tracking-[0.1em] uppercase hover:bg-accent hover:text-white transition-colors duration-300"
              >
                <ExternalLink size={16} />
                <span>Live Website</span>
              </Link>
              <Link 
                to={`/coming-soon/${project.id}`}
                state={{ fromPortfolio: true }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-ink-primary text-sm font-sans tracking-[0.1em] uppercase hover:border-accent hover:text-accent transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                <span>GitHub Repo</span>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="divider-luxury my-16" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-7 space-y-16">
          
          <section>
            <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">Overview</h3>
            <p className="text-lg font-sans font-light text-ink-secondary leading-relaxed">
              {project.description}
            </p>
          </section>

          <section>
            <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">Problem Statement</h3>
            <p className="text-lg font-sans font-light text-ink-secondary leading-relaxed">
              {project.problemStatement}
            </p>
          </section>

          <section>
            <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">Solution</h3>
            <p className="text-lg font-sans font-light text-ink-secondary leading-relaxed">
              {project.solution}
            </p>
          </section>

          <section>
            <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">Architecture & Deployment</h3>
            <p className="text-lg font-sans font-light text-ink-secondary leading-relaxed mb-4">
              {project.architecture}
            </p>
            <p className="text-lg font-sans font-light text-ink-secondary leading-relaxed">
              <strong>Deployment:</strong> {project.deployment}
            </p>
          </section>

          <section>
            <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">Challenges & Future Scope</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-sans font-medium text-ink-primary mb-2">Technical Challenges</h4>
                <p className="text-base font-sans font-light text-ink-secondary leading-relaxed">
                  {project.challenges}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-sans font-medium text-ink-primary mb-2">Future Scope</h4>
                <p className="text-base font-sans font-light text-ink-secondary leading-relaxed">
                  {project.futureScope}
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column - Meta */}
        <div className="lg:col-span-4 lg:col-start-9 space-y-12">
          
          <div className="p-8 border border-border bg-white/[0.02]">
            <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">Tech Stack</h3>
            <div className="space-y-6">
              {project.techStack.map((stack, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-sans font-medium uppercase tracking-wider text-ink-primary mb-3">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map(tech => (
                      <span key={tech} className="text-xs font-sans px-3 py-1 bg-canvas-secondary border border-border text-ink-secondary rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border border-border bg-white/[0.02]">
            <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">Key Features</h3>
            <ul className="space-y-4">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-accent mt-2.5 shrink-0" />
                  <span className="text-sm font-sans font-light text-ink-secondary leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-24">
        <h3 className="text-[0.75rem] font-sans font-medium tracking-[0.2em] uppercase text-ink-muted mb-8 text-center">Project Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(project.images || project.projectImages || []).map((img, i) => (
            <div key={i} className="aspect-[16/10] bg-ink-primary/5 border border-border rounded-sm flex items-center justify-center overflow-hidden">
               <img src={img} alt={`${project.title} - Gallery Image ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}

        </div>
      </div>

      {/* Divider */}
      <div className="divider-luxury my-24" />

      {/* Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-border pt-12">
        {prevProject ? (
          <Link 
            to={`/project/${prevProject.id}`}
            className="group flex flex-col items-start w-full md:w-1/2 text-left hover:-translate-x-2 transition-transform duration-300"
          >
            <span className="flex items-center gap-2 text-[0.6875rem] font-sans tracking-[0.2em] uppercase text-ink-muted mb-3">
              <ChevronLeft size={14} /> Previous Project
            </span>
            <span className="font-cinematic text-2xl md:text-3xl text-ink-primary group-hover:text-accent transition-colors">
              {prevProject.title}
            </span>
          </Link>
        ) : <div className="w-full md:w-1/2" />}

        {nextProject && (
          <Link 
            to={`/project/${nextProject.id}`}
            className="group flex flex-col items-end w-full md:w-1/2 text-right hover:translate-x-2 transition-transform duration-300"
          >
            <span className="flex items-center gap-2 text-[0.6875rem] font-sans tracking-[0.2em] uppercase text-ink-muted mb-3">
              Next Project <ChevronRight size={14} />
            </span>
            <span className="font-cinematic text-2xl md:text-3xl text-ink-primary group-hover:text-accent transition-colors">
              {nextProject.title}
            </span>
          </Link>
        )}
      </div>

    </div>
  );
}
