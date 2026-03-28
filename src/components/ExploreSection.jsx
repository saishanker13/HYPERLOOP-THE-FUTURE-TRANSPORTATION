import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Activity, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 1, title: 'Smart Energy Grid', icon: Zap, color: '#00f0ff', desc: 'Infinite renewable sources managed by quantum algorithms.' },
  { id: 2, title: 'Hyperloop Transit', icon: Activity, color: '#7000ff', desc: 'Frictionless travel at mach speeds between megalopolises.' },
  { id: 3, title: 'Sentient Homes', icon: Cpu, color: '#ff0055', desc: 'Architecture that breathes, adapting to your biological needs.' }
];

export default function ExploreSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-32 bg-surface text-center z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold uppercase mb-20 text-white">
          Explore The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Infrastructure</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id}
                ref={el => cardsRef.current[i] = el}
                className="group relative p-8 rounded-2xl bg-background border border-white/10 overflow-hidden cursor-pointer hover:-translate-y-4 hover:border-white/30 transition-all duration-500 min-h-[400px] flex flex-col items-center justify-center transform-gpu"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl pointer-events-none"
                  style={{ backgroundColor: card.color }}
                />
                <Icon size={64} style={{ color: card.color }} className="mb-8 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-textMuted group-hover:text-white transition-colors duration-300">
                  {card.desc}
                </p>
                <div className="absolute left-0 bottom-0 w-full h-1" style={{ backgroundColor: card.color }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
