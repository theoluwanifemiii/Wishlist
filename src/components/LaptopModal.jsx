import { useState, useEffect } from 'react';

export default function LaptopModal({ open, onClose, onConfirm }) {
  const [name,   setName]   = useState('');
  const [email,  setEmail]  = useState('');
  const [amount, setAmount] = useState('');
  const [anon,   setAnon]   = useState(false);
  const [busy,   setBusy]   = useState(false);

  useEffect(() => {
    if (open) { setName(''); setEmail(''); setAmount(''); setAnon(false); setBusy(false); }
  }, [open]);

  const handleConfirm = async () => {
    if (!anon && !name.trim()) return;
    setBusy(true);
    try {
      await onConfirm(name.trim() || 'Someone 🤍', amount.trim(), anon, email.trim() || undefined);
      onClose();
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
        <h3 className="modal-title">Contribute to the Laptop Fund 💻</h3>
        <p className="modal-sub">
          Any amount helps! Your name and contribution will be noted here so Temmy can see everyone
          who showed up for her 💛
        </p>

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
            Stay <strong>anonymous</strong> — Temmy won't know it's you 🤫
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
      </div>
    </div>
  );
}
