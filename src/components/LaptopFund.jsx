import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '../config';

const { fund } = CONFIG;

function formatNGN(n) {
  return '₦' + Number(n).toLocaleString('en-NG');
}

export default function LaptopFund({ laptopClaim, onContribute }) {
  const fillRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  const contributionsTotal = typeof laptopClaim === 'number' ? 0 : 0; // count only, amount tracked separately
  // laptopClaim is now a count (number) from claimFor()
  const totalRaised = fund.seedAmount; // seed = what person already raised themselves
  const pct = Math.min((totalRaised / fund.goal) * 100, 100);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated) {
        setAnimated(true);
        el.style.width = `${pct}%`;
      }
    }, { threshold: 0.4 });
    obs.observe(el.parentElement);
    return () => obs.disconnect();
  }, [pct, animated]);

  return (
    <section className="laptop-section">
      <div className="laptop-card reveal visible">
        <span className="laptop-icon">{fund.emoji}</span>
        <h2 className="laptop-title">{fund.title}</h2>
        <p className="laptop-sub">{fund.description}</p>

        <div className="progress-meta">
          <span>Contributions so far</span>
          <span>Goal: {formatNGN(fund.goal)}</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            ref={fillRef}
            style={{ width: animated ? `${pct}%` : '0%' }}
          />
        </div>

        <div className="progress-summary">
          <span className="amount-big">{formatNGN(totalRaised)}</span>
          <span className="amount-goal-text">raised toward {formatNGN(fund.goal)} goal</span>
          {laptopClaim > 0 && (
            <span className="amount-tag">
              {laptopClaim} {laptopClaim === 1 ? 'contribution' : 'contributions'} 🤍
            </span>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn-gold" onClick={onContribute}>
            {fund.emoji} Contribute to the Fund
          </button>
        </div>
      </div>
    </section>
  );
}
