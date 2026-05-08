import { useState } from 'react';

export default function MoneySection() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState('');

  function copy(value, field) {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  return (
    <section className="section bg-white">
      <div className="section-inner">
        <div className="money-card reveal">
          <h2 className="money-title">Money. Yes. Money. 💸</h2>
          <p className="money-sub">
            Any amount, no amount is too small in Tinubu's regime.
            Your girl will appreciate it deeply 🏦
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
                <button
                  className="copy-btn"
                  onClick={() => copy('Temilola Priscilla', 'name')}
                >
                  {copied === 'name' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div className="acct-row">
                <div className="acct-label">Account Number</div>
                <div className="acct-value">8069703723</div>
                <div className="acct-bank">OPay</div>
                <button
                  className="copy-btn"
                  onClick={() => copy('8069703723', 'number')}
                >
                  {copied === 'number' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
