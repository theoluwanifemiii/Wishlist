export default function MailSection() {
  return (
    <section className="section bg-cream">
      <div className="section-inner">
        <div className="special-card mail-card reveal">
          <span className="special-icon">💌</span>
          <h2 className="special-title">Sweet Mails Go a Long Way</h2>
          <p className="special-body">
            Can't make it? Or just want to say something beautiful?
            A heartfelt birthday message from you would genuinely make her day.
            She's the kind of person who saves every kind word. 🤍
          </p>
          <a
            href="mailto:temilolapriscilla@gmail.com?subject=Happy%2021st%20Birthday%2C%20Temmy!%20🎉&body=Hey%20Temmy!%0A%0A"
            className="btn-red"
          >
            ✉️ Send her a birthday message
          </a>
          <p className="email-label">Opens your email · temilolapriscilla@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
