import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current.children, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 3 }
    )
    .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
    .fromTo(indicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.2");

    gsap.to(containerRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <div ref={containerRef} className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background z-10"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">
          <span className="block overflow-hidden"><span className="block drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Welcome to</span></span>
          <span className="block overflow-hidden"><span className="block text-primary drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]">2050</span></span>
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-textMuted max-w-2xl font-light">
          A cinematic journey into the metropolis of tomorrow. 
        </p>
      </div>

      <div ref={indicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-primary animate-bounce opacity-0">
        <span className="text-sm tracking-widest uppercase mb-2">Scroll</span>
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
