export default function GiftCard({ gift, claim, onClaim }) {
  const isClaimed = Boolean(claim);
  const claimerName = claim
    ? (claim.anon ? 'Someone 🤍' : claim.name)
    : null;

  return (
    <div className={`gift-card${isClaimed ? ' is-claimed' : ''}`}>
      <span className="gift-emoji">{gift.emoji}</span>
      <div className="gift-name">{gift.name}</div>
      <p className="gift-note">{gift.note}</p>

      {isClaimed ? (
        <div className="claimed-badge">
          🎀 Claimed by {claimerName}
        </div>
      ) : (
        <button
          className="btn-claim"
          onClick={() => onClaim(gift.item, gift.name, gift.emoji)}
        >
          {gift.btn}
        </button>
      )}
    </div>
  );
}
