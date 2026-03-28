import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power3.inOut'
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, "-=0.5")
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.2
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-primary">
      <div className="overflow-hidden mb-4">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-black tracking-[0.2em] uppercase opacity-0 translate-y-8">
          Initializing
        </h1>
      </div>
      <div className="w-64 md:w-96 h-1 bg-surface rounded-full overflow-hidden">
        <div ref={barRef} className="h-full bg-primary w-0 rounded-full shadow-[0_0_15px_#00f0ff]"></div>
      </div>
    </div>
  );
}
