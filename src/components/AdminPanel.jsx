import { useState } from 'react';

const ADMIN_PASSWORD = 'temmy21';

export default function AdminPanel({ open, onClose, claims }) {
  const [authed, setAuthed] = useState(false);
  const [pass,   setPass]   = useState('');
  const [err,    setErr]    = useState('');

  const handleLogin = () => {
    if (pass === ADMIN_PASSWORD) {
      setAuthed(true);
      setErr('');
      setPass('');
    } else {
      setErr('Wrong password. Try again 🙈');
    }
  };

  const handleClose = () => {
    setAuthed(false);
    setPass('');
    setErr('');
    onClose();
  };

  // Separate laptop contributions from gift claims
  const laptopClaims = claims.filter(c => c.item === 'laptop');
  const giftClaims   = claims.filter(c => c.item !== 'laptop');
  const anonCount    = claims.filter(c => c.anon).length;

  return (
    <div className={`admin-overlay${open ? ' open' : ''}`}>
      <div className="admin-inner">
        <div className="admin-header">
          <div className="admin-title">✦ Temmy's Dashboard</div>
          <button className="admin-close" onClick={handleClose}>✕</button>
        </div>

        {!authed ? (
          <div className="admin-login">
            <h2 className="admin-login-title">Welcome back, birthday girl 👑</h2>
            <p className="admin-login-sub">Enter the password to see who loves you</p>
            <input
              className="admin-pass-input"
              type="password"
              placeholder="Enter password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            {err && <p className="admin-pass-err">{err}</p>}
            <button className="btn-admin-login" onClick={handleLogin}>
              Unlock 🔓
            </button>
          </div>
        ) : (
          <div>
            {/* Stats */}
            <div className="admin-stats">
              <div className="admin-stat">
                <span className="stat-num">{giftClaims.length}</span>
                <div className="stat-label">Gifts Claimed</div>
              </div>
              <div className="admin-stat">
                <span className="stat-num">{laptopClaims.length}</span>
                <div className="stat-label">Fund Contributions</div>
              </div>
              <div className="admin-stat">
                <span className="stat-num">{anonCount}</span>
                <div className="stat-label">Anonymous 🤍</div>
              </div>
            </div>

            {/* Gift claims */}
            <div className="admin-section-title">🎁 Gift Claims</div>
            {giftClaims.length === 0 ? (
              <div className="empty-state">No gifts claimed yet — share the link! 🌸</div>
            ) : (
              giftClaims.map((c) => (
                <div key={c._id} className="claim-row">
                  <div className="claim-emoji-wrap">{c.emoji}</div>
                  <div className="claim-info">
                    <div className="claim-gift-name">{c.gift}</div>
                    <div className="claim-by">
                      by {c.anon ? 'Someone 🤍' : c.name}
                    </div>
                  </div>
                  {c.anon && <span className="anon-chip">anon</span>}
                  <div className="claim-time">{c.timestamp}</div>
                </div>
              ))
            )}

            {/* Laptop contributions */}
            <div className="admin-section-title">💻 Laptop Fund</div>
            {laptopClaims.length === 0 ? (
              <div className="empty-state">No contributions yet — spread the word! 💛</div>
            ) : (
              laptopClaims.map((c) => (
                <div key={c._id} className="claim-row">
                  <div className="claim-emoji-wrap">💻</div>
                  <div className="claim-info">
                    <div className="claim-gift-name">
                      {c.amount ? c.amount : 'Contribution'} — Laptop Fund
                    </div>
                    <div className="claim-by">
                      from {c.anon ? 'Someone 🤍' : c.name}
                    </div>
                  </div>
                  {c.anon && <span className="anon-chip">anon</span>}
                  <div className="claim-time">{c.timestamp}</div>
                </div>
              ))
            )}

            <div className="admin-note">
              <strong>🟢 Live · Convex</strong> — This dashboard updates in real time.
              Share the wishlist link and watch the love roll in 💛
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
