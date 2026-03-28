import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Wind, Shield, Clock, Globe, TrendingUp, X, Rocket, Settings } from 'lucide-react';
import './hyperloop.css';

gsap.registerPlugin(ScrollTrigger);

const subsystemData = {
  tube: {
    title: "Low Pressure Tube",
    icon: <Wind className="card-icon" />,
    shortDesc: "Removing most of the air tightly seals the environment, reducing aerodynamic drag to virtually nothing.",
    details: "The hyperloop tube environment is maintained at a near-vacuum pressure, similar to the atmosphere at 200,000 feet above sea level. This virtually eliminates aerodynamic drag, allowing the pod to reach airline speeds with entirely frictionless movement while using a fraction of the energy.",
    animationClass: "anim-tube"
  },
  motor: {
    title: "Linear Motor",
    icon: <Zap className="card-icon" />,
    shortDesc: "An advanced electric propulsion system powers the pod, pushing it efficiently across vast distances.",
    details: "Instead of an internal engine, the hyperloop uses an external linear induction motor. Stators mounted along the track interact with a magnetic rotor on the pod, creating an electromagnetic wave that powerfully propels the pod forward and can also seamlessly brake it, recovering energy.",
    animationClass: "anim-motor"
  },
  levitation: {
    title: "Magnetic Levitation",
    icon: <Shield className="card-icon" />,
    shortDesc: "Passively levitating over an array of magnets eliminates friction, creating a smooth and silent ride.",
    details: "Hyperloop utilizes passive magnetic levitation. Arrays of permanent magnets on the pod interact with the track design. As the pod accelerates, a magnetic field is generated that naturally lifts the pod away from the track, eliminating physical friction resulting in an ultra-smooth, silent ride.",
    animationClass: "anim-levitation"
  },
  propulsion: {
    title: "Propulsion System",
    icon: <Rocket className="card-icon" />,
    shortDesc: "Advanced aerodynamic thrust augments magnetic acceleration for peak efficiency.",
    details: "Beyond the initial linear induction acceleration, an advanced low-pressure compressor can actively channel any remaining air towards the rear, eliminating pressure buildup in front of the capsule and converting it into additional forward thrust.",
    animationClass: "anim-propulsion"
  },
  braking: {
    title: "Braking & Suspension",
    icon: <Settings className="card-icon" />,
    shortDesc: "Regenerative braking systems safely decelerate the pod while capturing energy.",
    details: "When it's time to slow down, the linear motors reverse polarity to act as generators, creating massive regenerative braking force. A hyper-responsive dynamic suspension system also coordinates with the magnetic levitation to ensure pitch-perfect stability during both high-speed turning and deceleration.",
    animationClass: "anim-braking"
  }
};

const HyperloopStory = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [showJourney, setShowJourney] = useState(false);

  useEffect(() => {
    if (selectedSystem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedSystem]);

  const mainRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalPanelsRef = useRef([]);

  // Preloader Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          gsap.to('.preloader-pod', {
            left: '150vw',
            duration: 0.6,
            ease: 'power3.in',
          });
          
          gsap.to('.preloader', {
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            onComplete: () => {
              setLoading(false);
              document.body.classList.remove('loading');
              initScrollAnimations();
            }
          });
        }
      });

      tl.to('.preloader-trail', { width: '100%', duration: 2.5, ease: 'power2.inOut' }, 0);
      tl.to('.preloader-pod', { left: '100%', duration: 2.5, ease: 'power2.inOut' }, 0);
    });

    document.body.classList.add('loading');

    return () => ctx.revert();
  }, []);

  const initScrollAnimations = () => {
    let ctx = gsap.context(() => {
      // Hero Pod Pulling Title Animation
      gsap.set('.hero-title-text', { visibility: 'visible', clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.hero-giant-pod', { visibility: 'visible', left: '0%', xPercent: -100 });
      
      const heroTl = gsap.timeline();
      heroTl.to('.hero-giant-pod', {
        left: '100%',
        xPercent: 0,
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0)
      .to('.hero-title-text', {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0)
      .to('.hero-giant-pod', {
        left: '150vw',
        opacity: 0,
        duration: 1.2,
        ease: 'power2.in'
      }, 1.2);

      // Fade in sections
      const sections = gsap.utils.toArray('.js-fade-in');
      sections.forEach(sec => {
        gsap.fromTo(sec, 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
            }
          }
        );
      });

      // Parallax effect
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Horizontal Scroll
      if (horizontalRef.current) {
        let panels = gsap.utils.toArray('.horizontal-panel');
        
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + horizontalRef.current.offsetWidth * panels.length
          }
        });
      }
    }, mainRef);

    return () => ctx.revert();
  };

  return (
    <div ref={mainRef} className="app-container">
      {/* Continuous Boundary Track */}
      <div className="continuous-margin-track">
        <div className="continuous-pod">
          <div className="continuous-flame"></div>
        </div>
      </div>

      {/* Preloader */}
      {loading && (
        <div className="preloader">
          <div className="speed-lines-container">
            {[...Array(20)].map((_, i) => (
               <div key={i} className="speed-line" style={{
                 top: Math.random() * 100 + '%',
                 left: Math.random() * 100 + '%',
                 width: (50 + Math.random() * 150) + 'px',
                 animationDelay: (Math.random() * 1) + 's',
                 animationDuration: (0.2 + Math.random() * 0.4) + 's'
               }}></div>
            ))}
          </div>
          <div className="preloader-counter" style={{zIndex: 10}}>{progress}%</div>
          <div className="preloader-tube">
            <div className="preloader-trail"></div>
            <div className="preloader-pod"></div>
          </div>
          <div className="preloader-text">
            Accelerating Pod...
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="section-full hero-section">
        <div className="container" style={{ position: 'relative' }}>
          <div className="hero-title-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <h1 className="hero-title text-gradient hero-title-text" style={{ visibility: 'hidden' }}>HYPERLOOP<br/><span className="text-highlight">THE FUTURE</span></h1>
            
            <div className="hero-giant-pod" style={{
              position: 'absolute', top: '50%', left: '0%', 
              transform: 'translateY(-50%)', 
              width: '180px', height: '36px', 
              background: '#fff', borderRadius: '18px', 
              boxShadow: '0 0 30px var(--color-highlight), 0 0 80px rgba(0,240,255,0.6)', 
              zIndex: 10, visibility: 'hidden'
            }}>
              <div style={{ position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)', width: '60px', height: '18px', background: 'linear-gradient(90deg, transparent, var(--color-highlight), #ffffff)', borderRadius: '50px 0 0 50px', opacity: 0.9 }}></div>
            </div>
          </div>
          <p className="hero-subtitle js-fade-in">Experience the next generation of high-speed transportation. Traveling at airline speeds on the ground.</p>
        </div>
        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="section-full" style={{ padding: '6rem 0' }}>
        <div className="container js-fade-in">
          <span className="section-subtitle" style={{ display: 'block', margin: '0 auto 2rem', textAlign: 'center' }}>The Challenge</span>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Surviving The Gridlock</h2>
          
          <div className="problem-grid" style={{ alignItems: 'flex-start' }}>
            <div className="videos-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="problem-video-container" style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/K-3qSmt8Qgg?autoplay=1&mute=1&loop=1&playlist=K-3qSmt8Qgg&controls=0" 
                  title="Congested Traffic in India" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="solution-video-container" style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-highlight)', boxShadow: '0 10px 30px rgba(0,240,255,0.2)' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/_w2lo5h3D5E?autoplay=1&mute=1&loop=1&playlist=_w2lo5h3D5E&controls=0" 
                  title="Original Hyperloop Demonstration" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="problem-text">
              <h3 style={{ fontSize: '2rem', color: '#ff4757', marginBottom: '1rem', fontFamily: 'var(--font-secondary)' }}>The Collapse of Surface Transit</h3>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                In major Indian metropolitan areas like Bengaluru, Mumbai, and Delhi, commuters lose hundreds of hours annually to extreme traffic congestion. Traditional infrastructure expansion simply cannot keep pace with population density.
              </p>
              
              <div className="stat-box" style={{ marginBottom: '2rem', background: 'rgba(255,71,87,0.05)', borderColor: 'rgba(255,71,87,0.2)' }}>
                <span className="stat-number" style={{ color: '#ff4757', fontSize: '3rem' }}>3.0+</span>
                <span className="stat-label">Hours spent in daily gridlock average</span>
              </div>
              
              <h3 style={{ fontSize: '1.8rem', color: 'var(--color-highlight)', margin: '2rem 0 1rem', fontFamily: 'var(--font-secondary)' }}>The Hyperloop Solution</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ddd' }}>
                Hyperloop moves transit into an entirely new dimension. By utilizing a dedicated, weather-proof tube network, it <strong>completely bypasses surface traffic</strong>. Journeys like Mumbai to Pune are reduced from 3 hours of grueling traffic to a phenomenal <strong>25 minutes</strong>. It permanently removes vehicles from the road and eliminates the bottleneck without disrupting urban life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What is Hyperloop (Parallax) */}
      <section className="parallax-section">
        <div 
          className="parallax-bg" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541888035742-8800ba8cb9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)' }}
        ></div>
        <div className="parallax-content js-fade-in">
          <span className="section-subtitle" style={{color: '#fff'}}>The Solution</span>
          <h2 className="text-highlight">Hyperloop</h2>
          <p style={{fontSize: '1.2rem', lineHeight: 1.6}}>
            Hyperloop is a new mode of passenger and freight transportation. Passengers or cargo are loaded into the hyperloop vehicle and accelerate gradually via electric propulsion through a low-pressure tube. The vehicle floats above the track using magnetic levitation and glides at airline speeds for long distances due to ultra-low aerodynamic drag.
          </p>
        </div>
      </section>

      {/* 4. How it Works */}
      <section className="section-full" style={{minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
        <div className="container">
          <div className="js-fade-in" style={{textAlign: 'center', marginBottom: '4rem'}}>
            <span className="section-subtitle">Engineering</span>
            <h2 className="section-title">How it Works</h2>
          </div>
          
          <div className="cards-grid js-fade-in">
            {Object.keys(subsystemData).map(key => (
              <div 
                className="interactive-card" 
                key={key} 
                onClick={() => setSelectedSystem(key)}
              >
                {subsystemData[key].icon}
                <h3>{subsystemData[key].title}</h3>
                <p>{subsystemData[key].shortDesc}</p>
                <div className="card-cta">Explore System →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Technology */}
      <section className="section-full pt-0" style={{minHeight: '80vh'}}>
        <div className="container split-layout js-fade-in">
          <div>
            <span className="section-subtitle">Sustainability</span>
            <h2 className="section-title">Zero Emissions Framework</h2>
            <p style={{fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2rem'}}>
              Built from the ground up to be fully electric and zero direct emissions. 
              The infrastructure itself acts as a massive solar farm, generating more 
              energy than it consumes.
            </p>
            <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <li style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{width: 8, height: 8, background: 'var(--color-highlight)', borderRadius: '50%'}}></div>
                100% Electric Powered
              </li>
              <li style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{width: 8, height: 8, background: 'var(--color-highlight)', borderRadius: '50%'}}></div>
                Weather Independent
              </li>
              <li style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{width: 8, height: 8, background: 'var(--color-highlight)', borderRadius: '50%'}}></div>
                Silent Operations
              </li>
            </ul>
          </div>
          <div style={{position: 'relative', height: '400px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/* Abstract Tech Graphic */}
            <div style={{width: '200px', height: '200px', borderRadius: '50%', border: '2px dashed var(--color-highlight)', animation: 'spin-slow 20s linear infinite'}}></div>
            <div style={{position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', border: '1px solid rgba(0,240,255,0.3)', animation: 'spin-reverse 15s linear infinite'}}></div>
            <Zap style={{position: 'absolute', color: 'var(--color-highlight)', width: 48, height: 48}} />
            <style>{`
              @keyframes spin-slow { 100% { transform: rotate(360deg); } }
              @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
            `}</style>
          </div>
        </div>
      </section>

      {/* 6. Future Impact (Horizontal Scroll) */}
      <section className="horizontal-scroll-container" ref={horizontalRef}>
        <div className="horizontal-panel">
          <div className="panel-content">
            <Clock style={{width: 64, height: 64, color: 'var(--color-highlight)', marginBottom: '2rem'}} />
            <h2>Shrinking the Map</h2>
            <p>Journeys that took hours by car or train will take mere minutes. Commuters can live further away while enjoying a faster, stress-free transit.</p>
          </div>
        </div>
        <div className="horizontal-panel">
          <div className="panel-content">
            <Globe style={{width: 64, height: 64, color: 'var(--color-highlight)', marginBottom: '2rem'}} />
            <h2>Connecting Mega-Regions</h2>
            <p>Cities will fuse into mega-regions. Connecting Los Angeles and San Francisco, or London and Paris, allowing them to act as unified economic hubs.</p>
          </div>
        </div>
        <div className="horizontal-panel">
          <div className="panel-content">
            <TrendingUp style={{width: 64, height: 64, color: 'var(--color-highlight)', marginBottom: '2rem'}} />
            <h2>Economic Catalyst</h2>
            <p>Unlock new opportunities by giving people and goods the power of unrestricted, instantaneous movement across states and countries.</p>
          </div>
        </div>
      </section>

      {/* Research Teams */}
      <section className="section-full teams-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="js-fade-in" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle">Innovation</span>
            <h2 className="section-title">Pioneering Teams</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              The hyperloop vision is being brought to life by brilliant engineering minds across the globe. From commercial giants to elite university prototypes, research is rapidly accelerating.
            </p>
          </div>
          
          <div className="teams-grid js-fade-in">
            <div className="team-card highlight-team">
              <div className="team-logo">TH</div>
              <h3>Team Hyperion</h3>
              <p>Leading student-run engineering team developing cutting-edge pod prototypes with advanced magnetic levitation systems and revolutionary aerodynamic designs.</p>
            </div>
            <div className="team-card">
              <div className="team-logo">VH</div>
              <h3>Virgin Hyperloop</h3>
              <p>One of the few companies to have successfully conducted passenger testing, actively working with governments to establish legal frameworks and commercial routes.</p>
            </div>
            <div className="team-card">
              <div className="team-logo">HH</div>
              <h3>Hardt Hyperloop</h3>
              <p>A leading European hyperloop tech company focused on developing a standard, interoperable network across the entire continent.</p>
            </div>
            <div className="team-card">
              <div className="team-logo">TUM</div>
              <h3>TUM Hyperloop</h3>
              <p>Record-breaking university team from Munich, Germany, focusing on executing full-scale infrastructure demonstrations and sustainable passenger transport.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Conclusion */}
      <section className="section-full conclusion-section">
        <div className="container js-fade-in">
          <h2>The future is arriving.</h2>
          <p style={{fontSize: '1.5rem', color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem'}}>
            Be part of the revolution in human mobility. Faster, safer, cleaner, and more connected.
          </p>
          <button className="btn-primary" onClick={() => setShowJourney(true)}>Join the Journey</button>
        </div>
      </section>

      {/* 8. Thank You */}
      <section className="thank-you-section" style={{ padding: '6rem 0', minHeight: '40vh', display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'radial-gradient(ellipse at bottom, rgba(0, 240, 255, 0.05) 0%, transparent 70%)' }}>
        <div className="container js-fade-in" style={{ textAlign: 'center', width: '100%', overflow: 'visible' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '3rem', letterSpacing: '4px', textShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}>THANK YOU</h2>
          <div style={{ position: 'relative', width: '100%', height: '60px' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div className="thank-you-pod">
              <div className="continuous-flame" style={{right: '100%', top: '50%', transform: 'translateY(-50%)', width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-highlight), #ffffff)', borderRadius: '10px 0 0 10px', opacity: 0.9, position: 'absolute'}}></div>
            </div>
          </div>
        </div>
      </section>

      {showJourney && <JourneyExperience onClose={() => setShowJourney(false)} />}

      {/* Subsystem Modal */}
      {selectedSystem && (
        <div className="system-modal-overlay">
          <div className="system-modal-content">
            <button className="modal-close" onClick={() => setSelectedSystem(null)}>
              <X size={32} />
            </button>
            <div className="modal-grid">
              <div className="modal-info">
                <span className="section-subtitle">System Overview</span>
                <h2>{subsystemData[selectedSystem].title}</h2>
                <p>{subsystemData[selectedSystem].details}</p>
              </div>
              <div className="modal-animation-container">
                <div className={`animation-wrapper ${subsystemData[selectedSystem].animationClass}`}>
                  <div className="track"></div>
                  <div className="pod">
                    {selectedSystem === 'propulsion' && (
                      <div className="propulsion-thrust">
                        <div className="thrust-flame"></div>
                        <div className="thrust-flame small"></div>
                        <div className="thrust-flame tiny"></div>
                      </div>
                    )}
                    {selectedSystem === 'braking' && (
                      <div className="braking-calipers">
                        <div className="caliper top"></div>
                        <div className="caliper bottom"></div>
                      </div>
                    )}
                  </div>
                  {selectedSystem === 'motor' && (
                    <div className="coils">
                      {[1,2,3,4,5].map(i => <div key={i} className="coil"></div>)}
                    </div>
                  )}
                  {selectedSystem === 'tube' && (
                    <div className="particles">
                      {[1,2,3,4,5].map(i => <div key={i} className="particle"></div>)}
                    </div>
                  )}
                  {selectedSystem === 'levitation' && (
                    <div className="mag-field"></div>
                  )}
                  {selectedSystem === 'braking' && (
                    <div className="energy-waves">
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const JourneyExperience = ({ onClose }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Intro
      tl.fromTo('.journey-intro', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to('.journey-intro', { opacity: 0, duration: 0.5, delay: 1.5 })

      // Phase 1: Map
      tl.fromTo('.journey-phase-1', { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo('.map-point.la', { scale: 0 }, { scale: 1, duration: 0.4 })
        .fromTo('.map-point.sf', { scale: 0 }, { scale: 1, duration: 0.4 }, "+=0.2")
        .fromTo('.pod-marker', { top: '100%' }, { top: '0%', duration: 3, ease: 'power1.inOut' })
        .fromTo('.journey-map-line', { bottom: 0, height: 0, top: 'auto' }, { height: '100%', duration: 3, ease: 'power1.inOut' }, "<")
        .fromTo('.journey-map-text', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=2")
        .to('.journey-phase-1', { opacity: 0, scale: 1.1, duration: 0.8, delay: 1 })

      // Phase 2: Interior
      tl.fromTo('.journey-phase-2', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8 })
        .fromTo('.scrolling-landscape', { backgroundPosition: "0px 0px" }, { backgroundPosition: "-2000px 0px", duration: 4, ease: "none" })
        .to('.journey-phase-2', { opacity: 0, duration: 0.8 })

      // Phase 3: Systems
      tl.fromTo('.journey-phase-3', { opacity: 0 }, { opacity: 1, duration: 0.8 })
        .fromTo('.j-sys-item', { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.6, duration: 0.6 })
        .fromTo('.journey-replay', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="journey-modal-overlay" style={{zIndex: 999999}}>
      <div className="journey-modal-content" ref={containerRef} style={{maxWidth: '1000px', padding: '2rem'}}>
        <button className="modal-close" onClick={onClose} style={{zIndex: 50}}>
          <X size={32} />
        </button>
        
        <div className="journey-viewport">
          {/* Intro */}
          <div className="journey-layer journey-intro">
            <h2>Initializing Journey</h2>
            <p>Los Angeles to San Francisco</p>
          </div>

          {/* Phase 1: Map */}
          <div className="journey-layer journey-phase-1">
            <div className="map-container">
              <div className="map-point sf">
                <span className="point-dot"></span>
                <span className="point-label">San Francisco</span>
              </div>
              <div className="map-track">
                <div className="journey-map-line"></div>
                <div className="pod-marker"></div>
              </div>
              <div className="map-point la">
                <span className="point-dot"></span>
                <span className="point-label">Los Angeles</span>
              </div>
            </div>
            <div className="journey-map-text">
              <div className="data-box">DISTANCE: <span>380 MILES</span></div>
              <div className="data-box">EST. TIME: <span>35 MINS</span></div>
              <div className="data-box">SPEED: <span>760 MPH</span></div>
            </div>
          </div>

          {/* Phase 2: Interior */}
          <div className="journey-layer journey-phase-2">
            <h2>Cabin Experience</h2>
            <div className="interior-view">
              <div className="window-frame">
                <div className="scrolling-landscape"></div>
              </div>
              <div className="seats-container">
                 <div className="seat">
                   <div className="passenger-head"></div>
                   <div className="passenger-body"></div>
                 </div>
                 <div className="seat">
                   <div className="passenger-head"></div>
                   <div className="passenger-body"></div>
                 </div>
                 <div className="seat">
                   <div className="passenger-head"></div>
                   <div className="passenger-body"></div>
                 </div>
              </div>
            </div>
            <p className="interior-desc">G-forces are mitigated by banked turns and smooth acceleration. Passengers relax completely.</p>
          </div>

          {/* Phase 3: Systems */}
          <div className="journey-layer journey-phase-3">
            <h2>Active Systems Overview</h2>
            <div className="systems-active-grid">
              <div className="j-sys-item">
                <div className="sys-icon anim-motor">
                  <div className="track"></div>
                  <div className="coils" style={{justifyContent: 'space-around', left: '10%', transform: 'none', position: 'absolute', top: '70%', width: '80%'}}>{[1,2,3].map(i => <div key={i} className="coil"></div>)}</div>
                  <div className="pod"></div>
                </div>
                <h3>Propulsion</h3>
                <p>Linear stators actively accelerating pod.</p>
              </div>
              <div className="j-sys-item">
                <div className="sys-icon anim-levitation">
                  <div className="track"></div>
                  <div className="mag-field" style={{opacity:1, animation:'none', transform: 'translateX(-50%) translateY(-50%) scale(0.6)'}}></div>
                  <div className="pod"></div>
                </div>
                <h3>Levitation</h3>
                <p>Magnetic fields stable. Zero physical friction.</p>
              </div>
              <div className="j-sys-item">
                <div className="sys-icon anim-tube">
                  <div className="particles">{[1,2,3].map(i => <div key={i} className="particle"></div>)}</div>
                  <div className="pod"></div>
                </div>
                <h3>Environment</h3>
                <p>Tube pressure at 100 Pascals. Aerodynamic drag eliminated.</p>
              </div>
            </div>
            <button className="btn-primary journey-replay" style={{marginTop: '2rem'}} onClick={onClose}>Finish Journey</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyperloopStory;
