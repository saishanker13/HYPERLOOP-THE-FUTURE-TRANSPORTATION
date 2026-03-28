import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ConclusionSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-black z-30 overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-background to-background"></div>

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-4xl space-y-12">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter">
          The Future Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Now</span>
        </h2>
        
        <p className="text-xl md:text-3xl font-light text-textMuted">
          Welcome Home.
        </p>

        <button
  onClick={() => {
    document.getElementById("intro").scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="mt-8 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
>
  ENTER THE CITY
</button>
      </div>
      
    </section>
  );
}
