import GiftCard from './GiftCard';

export default function GiftSection({ section, claimFor, onClaim }) {
  return (
    <section className={`section ${section.bg}`}>
      <div className="section-inner">
        <div className="section-header reveal">
          <span className="section-tag">{section.tag}</span>
          <h2 className="section-title">{section.title}</h2>
          <p className="section-sub">{section.sub}</p>
        </div>

        <div className={section.single ? 'reveal' : 'gifts-grid reveal'}>
          {section.gifts.map((gift) => (
            <GiftCard
              key={gift.item}
              gift={gift}
              claimFor={claimFor}
              onClaim={onClaim}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
