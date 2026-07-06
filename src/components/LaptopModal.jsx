import { useState, useEffect } from 'react';
import { CONFIG } from '../config';
const { fund, bank } = CONFIG;

export default function LaptopModal({ open, onClose, onConfirm }) {
  const [name,   setName]   = useState('');
  const [email,  setEmail]  = useState('');
  const [amount, setAmount] = useState('');
  const [anon,   setAnon]   = useState(false);
  const [busy,   setBusy]   = useState(false);
  const [done,   setDone]   = useState(false); // step 2: bank details

  useEffect(() => {
    if (open) { setName(''); setEmail(''); setAmount(''); setAnon(false); setBusy(false); setDone(false); }
  }, [open]);

  const handleConfirm = async () => {
    if (!anon && !name.trim()) return;
    setBusy(true);
    try {
      await onConfirm(name.trim() || 'Someone 🤍', amount.trim(), anon, email.trim() || undefined);
      setDone(true); // show bank details step
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">

        {done ? (
          /* ── Step 2: Send the money ─────────────────── */
          <>
            <div className="laptop-done-icon">💛</div>
            <h3 className="modal-title">Now send your contribution!</h3>
            <p className="modal-sub">
              Your name has been noted. To complete your contribution, please transfer to the account below:
            </p>

            <div className="bank-details-card">
              <div className="bank-detail-row">
                <span className="bank-label">Bank</span>
                <span className="bank-value">{bank.bankName}</span>
              </div>
              <div className="bank-detail-row">
                <span className="bank-label">Account No.</span>
                <span className="bank-value account-num">{bank.accountNumber}</span>
              </div>
              <div className="bank-detail-row">
                <span className="bank-label">Name</span>
                <span className="bank-value">{bank.accountName}</span>
              </div>
            </div>

            <p className="bank-note">
              Use your name as the transfer description so she knows it's from you 🤍
            </p>

            <button className="btn-confirm" style={{ width: '100%', marginTop: '1rem' }} onClick={onClose}>
              Done ✓
            </button>
          </>
        ) : (
          /* ── Step 1: Fill details ───────────────────── */
          <>
            <h3 className="modal-title">{fund.modalTitle}</h3>
            <p className="modal-sub">{fund.modalSub}</p>

            <input
              className="modal-input"
              type="text"
              placeholder={anon ? 'Staying anonymous 🤍' : 'Your name…'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={anon}
              style={{ marginBottom: '0.75rem' }}
            />
            <input
              className="modal-input"
              type="email"
              placeholder="Your email (optional — for confirmation + reminder)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={anon}
              style={{ marginTop: 0, marginBottom: '0.75rem' }}
            />
            <input
              className="modal-input"
              type="text"
              placeholder="Amount (optional, e.g. ₦5,000)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ marginTop: '0' }}
            />

            <label className={`anon-toggle${anon ? ' on' : ''}`}>
              <input
                type="checkbox"
                checked={anon}
                onChange={(e) => setAnon(e.target.checked)}
              />
              <div className="anon-track" />
              <span className="anon-label">
                Stay <strong>anonymous</strong> — I won't know it's you 🤫
              </span>
            </label>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose} disabled={busy}>
                Cancel
              </button>
              <button
                className="btn-confirm"
                onClick={handleConfirm}
                disabled={busy || (!anon && !name.trim())}
              >
                {busy ? 'Saving…' : '💛 Confirm Contribution'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
