import { useState } from 'react';

export default function GiftCard({ gift, claimFor, onClaim }) {
  const hasImages = Boolean(gift.images?.length);  // multi-image picker
  const hasSingle = Boolean(gift.image);
  const hasAnyImage = hasImages || hasSingle;

  const [activeIdx, setActiveIdx] = useState(0);

  const itemKey      = (i) => hasImages ? `${gift.item}-${i}` : gift.item;
  const variantClaims = hasImages
    ? gift.images.map((_, i) => claimFor(itemKey(i)))
    : [claimFor(gift.item)];

  const allClaimed    = variantClaims.every(Boolean);
  const activeClaimed = Boolean(variantClaims[activeIdx]);
  const isClaimed     = hasImages ? allClaimed : activeClaimed;
  const currentImage  = hasImages ? gift.images[activeIdx] : gift.image;
  const total         = hasImages ? gift.images.length : 1;

  function prev() {
    setActiveIdx((i) => (i - 1 + total) % total);
  }
  function next() {
    setActiveIdx((i) => (i + 1) % total);
  }

  function handleClaim() {
    const key   = hasImages ? itemKey(activeIdx) : gift.item;
    const label = hasImages ? `${gift.name} (option ${activeIdx + 1})` : gift.name;
    onClaim(key, label, gift.emoji);
  }

  return (
    <div className={`gift-card${isClaimed ? ' is-claimed' : ''}${hasAnyImage ? ' has-image' : ''}`}>

      {hasAnyImage ? (
        <div className="gift-image-wrap">
          <img
            src={currentImage}
            alt={`${gift.name} option ${activeIdx + 1}`}
            className="gift-image"
            loading="lazy"
          />

          {isClaimed && <div className="gift-image-overlay">🎀 Claimed</div>}

          {hasImages && !isClaimed && (
            <>
              {/* Arrow buttons */}
              <button className="img-arrow img-arrow-left"  onClick={prev}  aria-label="Previous option">‹</button>
              <button className="img-arrow img-arrow-right" onClick={next}  aria-label="Next option">›</button>

              {/* Numbered option buttons */}
              <div className="image-picker-bar">
                {gift.images.map((_, i) => (
                  <button
                    key={i}
                    className={`picker-num${i === activeIdx ? ' active' : ''}${variantClaims[i] ? ' claimed' : ''}`}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Option ${i + 1}${variantClaims[i] ? ' (taken)' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <span className="gift-emoji">{gift.emoji}</span>
      )}

      <div className="gift-card-body">
        <div className="gift-name">{gift.name}</div>
        <p className="gift-note">
          {hasImages && !allClaimed
            ? `${variantClaims.filter(Boolean).length} of ${total} options taken — use the arrows to browse`
            : gift.note}
        </p>

        {hasImages && !isClaimed && (
          <p className="option-selected-label">
            {activeClaimed
              ? `Option ${activeIdx + 1} is taken — pick another`
              : `Option ${activeIdx + 1} selected`}
          </p>
        )}

        {isClaimed ? (
          !hasAnyImage && <div className="claimed-badge">🎀 Claimed</div>
        ) : activeClaimed ? null : (
          <button className="btn-claim" onClick={handleClaim}>
            {gift.btn}
          </button>
        )}
      </div>
    </div>
  );
}
