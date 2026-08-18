import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Loader2 } from 'lucide-react';

const CONTACT_ITEMS = [
  { label: 'Email',    value: 'tamilselvane748@gmail.com',    href: 'mailto:tamilselvane748@gmail.com' },
  { label: 'Mobile',   value: '+91 80567 05541',              href: 'tel:+918056705541' },
  { label: 'LinkedIn', value: 'linkedin.com/in/tamilselvan-e-69040b2a2', href: 'https://www.linkedin.com/in/tamilselvan-e-69040b2a2/'         },
  { label: 'GitHub',   value: 'github.com/Tamilselvan55-code',      href: 'https://github.com/Tamilselvan55-code'           },
];

export function ContactSection() {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const bodyRef     = useRef(null);
  const listRef     = useRef(null);
  const formRef     = useRef(null);

  const [formStatus, setFormStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const SHOW_CONTACT_SECTION = false;

  useEffect(() => {
    if (!SHOW_CONTACT_SECTION) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(
        [labelRef.current, titleRef.current, subtitleRef.current, bodyRef.current, listRef.current, formRef.current],
        { opacity: 1, y: 0, x: 0, clipPath: 'none' }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(labelRef.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'expo.out' },
        '-=0.4'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo([bodyRef.current, listRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(formRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: 'expo.out' },
        '-=0.8'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = (form) => {
    const newErrors = {};
    const name = form['contact-name'].value.trim();
    const email = form['contact-email'].value.trim();
    const mobile = form['contact-mobile'].value.trim();
    const message = form['contact-message'].value.trim();

    if (!name) newErrors.name = 'Name is required.';
    
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!message) newErrors.message = 'Message is required.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    setErrors({});
    const newErrors = validateForm(form);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstInvalidId = Object.keys(newErrors)[0];
      const fieldIdMap = {
        name: 'contact-name',
        mobile: 'contact-mobile',
        email: 'contact-email',
        message: 'contact-message'
      };
      form[fieldIdMap[firstInvalidId]]?.focus();
      return;
    }

    setFormStatus('submitting');
    
    // Real backend submission
    fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form['contact-name'].value.trim(),
        mobile: form['contact-mobile'].value.trim(),
        email: form['contact-email'].value.trim(),
        message: form['contact-message'].value.trim(),
      }),
    })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    })
    .catch(() => {
      setFormStatus('error');
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-canvas-base overflow-hidden ${SHOW_CONTACT_SECTION ? 'section-py' : 'py-12'}`}
      aria-labelledby={SHOW_CONTACT_SECTION ? "contact-title" : undefined}
    >
      {SHOW_CONTACT_SECTION && (
        <>
          {/* Top hairline */}
          <div className="divider-luxury w-full mb-0" />

          <div className="w-full mx-auto section-padding max-w-[1500px]">

        <div ref={labelRef} className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
          <span className="h-px w-10 bg-accent/60" />
          <span className="text-[0.6875rem] font-sans font-medium tracking-[0.3em] uppercase text-accent">
            Get in Touch
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-20">

          {/* Left */}
          <div>
            <h2
              ref={titleRef}
              id="contact-title"
              className="font-cinematic text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.03em] text-ink-primary mb-4"
              style={{ opacity: 0 }}
            >
              Let's build
            </h2>
            <div
              ref={subtitleRef}
              className="font-cinematic text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.03em] italic text-accent mb-12"
              style={{ opacity: 0 }}
            >
              something great.
            </div>

            <p
              ref={bodyRef}
              className="font-sans font-light text-ink-secondary leading-[1.9] max-w-[30rem] text-[0.9375rem] mb-14"
              style={{ opacity: 0 }}
            >
              Whether you need a modern web app, an AI-powered solution, or a premium digital experience — I'm excited to collaborate on meaningful projects.
            </p>

            <ul ref={listRef} className="space-y-0" style={{ opacity: 0 }}>
              {CONTACT_ITEMS.map(({ label, value, href }) => (
                <li key={label} className="flex items-start gap-8 py-5 border-t border-border/60">
                  <span className="text-[0.625rem] font-sans tracking-[0.25em] uppercase text-ink-muted/70 w-16 shrink-0 pt-0.5">
                    {label}
                  </span>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[0.9375rem] font-sans font-medium text-ink-primary hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div ref={formRef} className="relative" style={{ opacity: 0 }}>
            {formStatus === 'success' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas-base/95 z-20">
                <CheckCircle2 className="w-12 h-12 text-accent mb-5" />
                <h3 className="font-cinematic text-2xl text-ink-primary mb-2">Message Sent</h3>
                <p className="text-ink-secondary font-sans font-light text-center text-sm max-w-xs">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas-base/95 z-20">
                <div className="w-12 h-12 text-red-500/80 mb-5 flex items-center justify-center border-2 border-red-500/80 rounded-full">
                  <span className="text-2xl font-bold mb-0.5">!</span>
                </div>
                <h3 className="font-cinematic text-2xl text-ink-primary mb-2">Message Not Sent</h3>
                <p className="text-ink-secondary font-sans font-light text-center text-sm max-w-xs mb-6">
                  Something went wrong. Please try again.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="text-[0.75rem] font-sans font-medium tracking-[0.12em] uppercase text-ink-primary border border-ink-primary/30 px-6 py-3 hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            )}

            <form
              noValidate
              onSubmit={handleSubmit}
              className={`flex flex-col gap-8 transition-opacity duration-300 ${(formStatus === 'success' || formStatus === 'error') ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              aria-label="Contact form"
            >
              {[
                { id: 'contact-name',   key: 'name',   label: 'Your Name',     type: 'text',  placeholder: 'John Doe',         autocomplete: 'name' },
                { id: 'contact-mobile', key: 'mobile', label: 'Mobile Number', type: 'tel',   placeholder: 'Mobile number',    autocomplete: 'tel' },
                { id: 'contact-email',  key: 'email',  label: 'Email Address', type: 'email', placeholder: 'john@example.com', autocomplete: 'email' },
              ].map(({ id, key, label, type, placeholder, autocomplete }) => (
                <div key={id} className="flex flex-col gap-2 relative">
                  <label htmlFor={id} className="text-[0.6875rem] font-sans tracking-[0.2em] uppercase text-ink-muted">
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autocomplete}
                    disabled={formStatus === 'submitting'}
                    className={`w-full bg-transparent border-b py-3 text-[0.9375rem] font-sans text-ink-primary placeholder:text-ink-faint/70 focus:outline-none transition-colors duration-300 disabled:opacity-40 ${errors[key] ? 'border-red-500/50 focus:border-red-500/80' : 'border-border/80 focus:border-accent'}`}
                  />
                  {errors[key] && (
                    <span className="text-red-500/80 text-[0.6875rem] font-sans mt-1 absolute -bottom-5 left-0">{errors[key]}</span>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-2 relative mt-2">
                <label htmlFor="contact-message" className="text-[0.6875rem] font-sans tracking-[0.2em] uppercase text-ink-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="contact-message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  disabled={formStatus === 'submitting'}
                  className={`w-full bg-transparent border-b py-3 text-[0.9375rem] font-sans text-ink-primary placeholder:text-ink-faint/70 focus:outline-none transition-colors duration-300 resize-none disabled:opacity-40 ${errors.message ? 'border-red-500/50 focus:border-red-500/80' : 'border-border/80 focus:border-accent'}`}
                />
                {errors.message && (
                  <span className="text-red-500/80 text-[0.6875rem] font-sans mt-1 absolute -bottom-5 left-0">{errors.message}</span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="group inline-flex items-center gap-3 text-[0.8125rem] font-sans font-medium tracking-[0.12em] uppercase text-ink-primary border border-ink-primary/30 px-8 py-4 hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className={`w-full mx-auto section-padding max-w-[1500px] flex flex-col sm:flex-row items-center justify-between gap-4 ${SHOW_CONTACT_SECTION ? 'mt-20 pt-8 border-t border-border/60' : ''}`}>
        <span className="text-[0.6875rem] font-sans tracking-[0.2em] text-ink-muted/60 uppercase">
          © {new Date().getFullYear()} Tamil Selvan — All rights reserved
        </span>
        <span className="text-[0.6875rem] font-sans tracking-[0.2em] text-ink-muted/60 uppercase">
          Crafted with precision
        </span>
      </div>
    </section>
  );
}
