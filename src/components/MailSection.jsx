export default function MailSection() {
  return (
    <section className="section bg-cream">
      <div className="section-inner">
        <div className="special-card mail-card reveal">
          <span className="special-icon">💌</span>
          <h2 className="special-title">Scratch this whole wishlist.</h2>
          <p className="special-body">
            Gift me something from your heart that you genuinely think I'd love 🥹✨
            That means just as much (if not more).
          </p>
          <a
            href="mailto:temilolapriscilla@gmail.com?subject=Happy%2021st%20Birthday%2C%20Temmy!%20🎉&body=Hey%20Temmy!%0A%0A"
            className="btn-red"
          >
            ✉️ Send me a message 😉
          </a>
          <p className="email-label">Opens your email · temilolapriscilla@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
