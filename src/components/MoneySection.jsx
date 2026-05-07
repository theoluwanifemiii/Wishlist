import { useState } from 'react';

export default function MoneySection() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="section bg-white">
      <div className="section-inner">
        <div className="money-card reveal">
          <h2 className="money-title">Send Her Some Love 💛</h2>
          <p className="money-sub">
            Cash gifts are always welcome and deeply appreciated.
            Tap below to see her account details 🏦
          </p>

          {!revealed ? (
            <button className="btn-red" onClick={() => setRevealed(true)}>
              🔓 Show Account Details
            </button>
          ) : (
            <div className="account-box">
              <div className="acct-row">
                <div className="acct-label">Account Name</div>
                <div className="acct-value">Temilola Priscilla</div>
              </div>
              <div className="acct-row">
                <div className="acct-label">Account Number</div>
                <div className="acct-value">8069703723</div>
                <div className="acct-bank">OPay</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
