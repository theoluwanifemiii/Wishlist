import { CONFIG } from '../config';

const { person, bank } = CONFIG;

// Build mailto link dynamically
const subject = encodeURIComponent(`Happy ${person.age}th Birthday, ${person.shortName}! 🎉`);
const body = encodeURIComponent(`Hey ${person.shortName}!\n\n`);
const mailtoHref = `mailto:${bank.accountName.split(' ')[0].toLowerCase()}@gmail.com?subject=${subject}&body=${body}`;

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
            href={`mailto:oluwadarasimi919@gmail.com?subject=${subject}&body=${body}`}
            className="btn-red"
          >
            ✉️ Send me a message 😉
          </a>
          <p className="email-label">Opens your email · oluwadarasimi919@gmail.com</p>
        </div>
      </div>
    </section>
  );
}
