import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef.current.children, 
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section id="intro" ref={sectionRef} className="relative w-full min-h-screen py-32 px-6 md:px-12 flex items-center bg-background z-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div ref={textRef} className="space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-tight">
            The Concept <br/>
            <span className="text-primary italic">Redefined.</span>
          </h2>
          <p className="text-lg md:text-xl text-textMuted font-light leading-relaxed">
            By 2050, the very fabric of our cities has transformed. We evolved from concrete jungles to sentient ecosystems. Here, sustainable energy grids pulse like neural networks, and AI harmonizes with human creativity.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
        </div>

        <div className="relative h-[60vh] w-full rounded-3xl overflow-hidden border border-white/10 group">
          <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition duration-700 z-10"></div>
          <div ref={imageRef} className="absolute -top-[20%] -bottom-[20%] left-0 right-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)' }}></div>
        </div>

      </div>
    </section>
  );
}
