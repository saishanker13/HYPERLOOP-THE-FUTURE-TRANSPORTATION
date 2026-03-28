import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(any-pointer: coarse)").matches;
    if (isMobile) return;

    const onMouseMove = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
      gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power3.out' });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary pointer-events-none z-[1000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[1000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
    </>
  );
}
