import { useEffect, useRef } from 'react';
import { CONFIG } from '../config';

const { person, hero } = CONFIG;
const PETALS = ['🌸', '🌺', '✿', '❀', '🌷'];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    for (let i = 0; i < 18; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent = PETALS[i % PETALS.length];
      petal.style.cssText = `
        left: ${Math.random() * 100}%;
        font-size: ${0.8 + Math.random() * 1.4}rem;
        animation-duration: ${6 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: 0;
      `;
      el.appendChild(petal);
    }
    return () => el.querySelectorAll('.petal').forEach(p => p.remove());
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-badge">✦ &nbsp; Birthday Wishlist &nbsp; ✦</div>
        <h1 className="hero-name"><span>{person.name[0]}</span>{person.name.slice(1)}</h1>
        <p className="hero-subtitle">{hero.subtitle}</p>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <span className="hero-divider-dot">✦ ✦ ✦</span>
          <div className="hero-divider-line" />
        </div>

        <div className="hero-lines">
          {hero.lines.map((line, i) =>
            line.cls === 'gap' ? (
              <div key={i} className="hero-line gap" />
            ) : (
              <p key={i} className={`hero-line${line.cls ? ` ${line.cls}` : ''}`} style={{ animationDelay: `${line.delay}s` }}>
                {line.text}
              </p>
            )
          )}
        </div>
      </div>
      <div className="scroll-hint">scroll to explore ↓</div>
    </section>
  );
}
