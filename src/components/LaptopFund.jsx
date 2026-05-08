import { useEffect, useRef, useState } from 'react';

const GOAL = 400_000;
const BASE_SAVINGS = 200_000;

function formatNGN(n) {
  return '₦' + Number(n).toLocaleString('en-NG');
}

export default function LaptopFund({ laptopClaim, onContribute }) {
  const fillRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  // Build list of contributions from the single laptop claim record
  // (In a richer schema each contribution would be its own record — for now we show one)
  const contributions = laptopClaim ? [laptopClaim] : [];
  const contributionsTotal = contributions.reduce((sum, c) => {
    const amt = parseInt((c.amount || '').replace(/[^\d]/g, '')) || 0;
    return sum + amt;
  }, 0);
  const totalRaised = BASE_SAVINGS + contributionsTotal;
  const pct = Math.min((totalRaised / GOAL) * 100, 100);

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
        <span className="laptop-icon">💻</span>
        <h2 className="laptop-title">Help me get my laptop.</h2>
        <p className="laptop-sub">
          I currently have ₦200,000 saved. I need ₦200,000 more to get the laptop I need for school, work and upskilling.
          No amount is too small, every contribution counts and gets noted here 💛
        </p>

        <div className="progress-meta">
          <span>Contributions so far</span>
          <span>Goal: {formatNGN(GOAL)}</span>
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
          <span className="amount-goal-text">raised toward {formatNGN(GOAL)} goal</span>
          {contributions.length > 0 && (
            <span className="amount-tag">
              {contributions.length} {contributions.length === 1 ? 'contribution' : 'contributions'} 🤍
            </span>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn-gold" onClick={onContribute}>
            💛 Contribute to the Fund
          </button>
        </div>
      </div>
    </section>
  );
}
