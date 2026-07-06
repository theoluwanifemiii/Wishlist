import { useState } from 'react';
import { CONFIG } from '../config';

const { bank, money } = CONFIG;

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
          <h2 className="money-title">{money.title}</h2>
          <p className="money-sub">{money.sub}</p>

          {!revealed ? (
            <button className="btn-red" onClick={() => setRevealed(true)}>
              🔓 Show Account Details
            </button>
          ) : (
            <div className="account-box">
              <div className="acct-row">
                <div className="acct-label">Account Name</div>
                <div className="acct-value">{bank.accountName}</div>
                <button className="copy-btn" onClick={() => copy(bank.accountName, 'name')}>
                  {copied === 'name' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div className="acct-row">
                <div className="acct-label">Account Number</div>
                <div className="acct-value">{bank.accountNumber}</div>
                <div className="acct-bank">{bank.bankName}</div>
                <button className="copy-btn" onClick={() => copy(bank.accountNumber, 'number')}>
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
