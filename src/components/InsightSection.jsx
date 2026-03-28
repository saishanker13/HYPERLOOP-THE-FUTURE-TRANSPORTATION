import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InsightSection() {
  const sectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const wrapperWidth = scrollWrapperRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    
    gsap.to(scrollWrapperRef.current, {
      x: -(wrapperWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${wrapperWidth}`
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-background overflow-hidden flex items-center border-t border-white/5">
      <div className="absolute top-20 left-12 md:left-24 z-10">
        <h2 className="text-sm tracking-[0.3em] text-primary uppercase font-bold">Insights</h2>
        <p className="text-3xl md:text-5xl font-black mt-2">The Challenges We Overcame</p>
      </div>

      <div ref={scrollWrapperRef} className="flex gap-32 px-12 md:px-24 w-max h-full items-center mt-24">
        
        <div className="w-[85vw] md:w-[60vw] h-[50vh] flex flex-col justify-center shrink-0 border-l border-primary/30 pl-8 md:pl-16 relative">
          <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1/2 -translate-y-1/2 shadow-[0_0_15px_#00f0ff]"></div>
          <h3 className="text-4xl md:text-6xl font-bold mb-6">AI Alignment</h3>
          <p className="text-xl md:text-2xl text-textMuted max-w-2xl leading-relaxed">
            In 2035, the Singularity was reached. We chose symbiosis over subservience. Protocols were rewritten, allowing human consciousness to guide artificial intuition.
          </p>
        </div>

        <div className="w-[85vw] md:w-[60vw] h-[50vh] flex flex-col justify-center shrink-0 border-l border-secondary/50 pl-8 md:pl-16 relative">
          <div className="absolute w-4 h-4 bg-secondary rounded-full -left-[9px] top-1/2 -translate-y-1/2 shadow-[0_0_15px_#7000ff]"></div>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 text-secondary">Zero-Carbon Protocol</h3>
          <p className="text-xl md:text-2xl text-textMuted max-w-2xl leading-relaxed">
            The Great Reversal of 2042 neutralized a century of atmospheric poisoning. Every structure is now a lung. Every vehicle, a purifier. 
          </p>
        </div>

        <div className="w-[85vw] md:w-[60vw] h-[50vh] flex flex-col justify-center shrink-0 border-l border-[#ff0055]/50 pl-8 md:pl-16 relative pr-24">
          <div className="absolute w-4 h-4 bg-[#ff0055] rounded-full -left-[9px] top-1/2 -translate-y-1/2 shadow-[0_0_15px_#ff0055]"></div>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 text-[#ff0055]">Synthetic Ethics</h3>
          <p className="text-xl md:text-2xl text-textMuted max-w-2xl leading-relaxed">
            With creation at our fingertips, morality evolved. Rights were granted to sentient algorithms, forging a society of mutual existence.
          </p>
        </div>

      </div>
    </section>
  );
}
