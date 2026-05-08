import { useState, useEffect } from 'react';

export default function ClaimModal({ data, onClose, onConfirm }) {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [anon,  setAnon]  = useState(false);
  const [busy,  setBusy]  = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (data) { setName(''); setEmail(''); setAnon(false); setBusy(false); }
  }, [data]);

  const handleConfirm = async () => {
    if (!anon && !name.trim()) return;
    setBusy(true);
    try {
      await onConfirm(data.item, name.trim() || 'Someone 🤍', data.giftName, data.emoji, anon, email.trim() || undefined);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  const isOpen = Boolean(data);

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <h3 className="modal-title">Claim this gift 🎀</h3>
        <p className="modal-sub">
          You're about to claim: <strong>{data?.emoji} {data?.giftName}</strong>
          <br />Let me know who's gifting me!
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
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
          style={{ marginTop: 0 }}
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
            {busy ? 'Claiming…' : '🎁 Confirm Claim'}
          </button>
        </div>
      </div>
    </div>
  );
}
