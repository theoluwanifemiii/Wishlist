import { useState } from 'react';

export default function GiftCard({ gift, claimFor, onClaim }) {
  const hasImages = Boolean(gift.images?.length);
  const hasSingle = Boolean(gift.image);
  const hasAnyImage = hasImages || hasSingle;

  const [activeIdx, setActiveIdx] = useState(0);

  // Resolve shop/whatsapp link for current option
  const activeLink = hasImages
    ? (gift.links?.[activeIdx] || '')
    : (gift.link || '');

  const itemKey = (i) => hasImages ? `${gift.item}-${i}` : gift.item;

  // Count claims per variant (or single item)
  const variantCounts = hasImages
    ? gift.images.map((_, i) => claimFor(itemKey(i)))
    : [claimFor(gift.item)];

  const totalCount  = variantCounts.reduce((a, b) => a + b, 0);
  const activeCount = variantCounts[activeIdx];
  const total       = hasImages ? gift.images.length : 1;
  const currentImage = hasImages ? gift.images[activeIdx] : gift.image;

  function prev() { setActiveIdx((i) => (i - 1 + total) % total); }
  function next() { setActiveIdx((i) => (i + 1) % total); }

  function handleClaim() {
    const key   = hasImages ? itemKey(activeIdx) : gift.item;
    const label = hasImages ? `${gift.name} (option ${activeIdx + 1})` : gift.name;
    onClaim(key, label, gift.emoji);
  }

  return (
    <div className={`gift-card${hasAnyImage ? ' has-image' : ''}`}>

      {hasAnyImage ? (
        <div className="gift-image-wrap">
          <img
            src={currentImage}
            alt={`${gift.name}${hasImages ? ` option ${activeIdx + 1}` : ''}`}
            className="gift-image"
            loading="lazy"
          />

          {hasImages && (
            <>
              <button className="img-arrow img-arrow-left"  onClick={prev} aria-label="Previous option">‹</button>
              <button className="img-arrow img-arrow-right" onClick={next} aria-label="Next option">›</button>

              <div className="image-picker-bar">
                {gift.images.map((_, i) => (
                  <button
                    key={i}
                    className={`picker-num${i === activeIdx ? ' active' : ''}${variantCounts[i] > 0 ? ' has-claims' : ''}`}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Option ${i + 1}`}
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
        <p className="gift-note">{gift.note}</p>

        {hasImages && (
          <p className="option-selected-label">Option {activeIdx + 1} selected</p>
        )}

        <button className="btn-claim" onClick={handleClaim}>
          {gift.btn}
        </button>

        {activeLink && (
          <a href={activeLink} target="_blank" rel="noopener noreferrer" className="gift-shop-link">
            Shop this →
          </a>
        )}

        {gift.whatsapp && (
          <a href={gift.whatsapp} target="_blank" rel="noopener noreferrer" className="gift-whatsapp-link">
            💬 Reach out to my plug
          </a>
        )}
      </div>
    </div>
  );
}
