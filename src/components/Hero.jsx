import { useEffect, useRef } from 'react';

const HERO_LINES = [
  { text: 'Twenty-one. Unbothered. Deserving everything.', cls: 'quote', delay: 0.7 },
  { cls: 'gap', delay: 0 },
  { text: "Here's how you can be part of it.", cls: 'answer', delay: 1.15 },
];

const PETALS = ['🌸', '🌺', '✿', '❀', '🌷'];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const count = 18;
    const timers = [];

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent = PETALS[i % PETALS.length];
      const size = 0.8 + Math.random() * 1.4;
      const left = Math.random() * 100;
      const duration = 6 + Math.random() * 10;
      const delay = Math.random() * 8;
      petal.style.cssText = `
        left: ${left}%;
        font-size: ${size}rem;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: 0;
      `;
      hero.appendChild(petal);
    }

    return () => {
      timers.forEach(clearTimeout);
      hero.querySelectorAll('.petal').forEach(p => p.remove());
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-badge">✦ &nbsp; Birthday Wishlist &nbsp; ✦</div>
        <h1 className="hero-name"><span>T</span>emilola</h1>
        <p className="hero-subtitle">turns twenty-one ✦ 2026</p>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <span className="hero-divider-dot">✦ ✦ ✦</span>
          <div className="hero-divider-line" />
        </div>

        <div className="hero-lines">
          {HERO_LINES.map((line, i) =>
            line.cls === 'gap' ? (
              <div key={i} className="hero-line gap" />
            ) : (
              <p
                key={i}
                className={`hero-line${line.cls ? ` ${line.cls}` : ''}`}
                style={{ animationDelay: `${line.delay}s` }}
              >
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
