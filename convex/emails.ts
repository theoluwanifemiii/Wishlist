import { internalAction } from "./_generated/server";
import { v } from "convex/values";

const FROM   = "gifts@mail.usemomentos.xyz";
const TEMMY  = "temilolapriscilla@gmail.com";
const LAPTOP_GOAL = "₦150,000";

// ── Resend helper ────────────────────────────────────────────────────
async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.warn("RESEND_API_KEY not set — email skipped"); return; }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Olu (for Temmy) <${FROM}>`,
      to: params.to,
      reply_to: params.replyTo ?? FROM,
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });
  if (!res.ok) console.error("Resend error:", await res.text());
}

// ── Email shell ───────────────────────────────────────────────────────
// Minimal, personal — branding through typography + accent colour,
// not a big gradient header (which triggers Gmail Promotions tab).
function emailShell(body: string, footer: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body  { margin:0; padding:0; background:#ffffff; font-family:'Helvetica Neue',Arial,sans-serif; color:#1a1a1a; }
    .wrap { max-width:560px; margin:0 auto; padding:40px 24px; }

    /* Wordmark — branding, not a banner */
    .wordmark { border-left:3px solid #8B0000; padding-left:12px; margin-bottom:32px; }
    .wordmark-title { margin:0; font-size:15px; font-weight:600; color:#8B0000; letter-spacing:0.04em; }
    .wordmark-sub   { margin:3px 0 0; font-size:11px; color:#C8A96E; letter-spacing:0.2em; text-transform:uppercase; }

    /* Body */
    p { margin:0 0 18px; font-size:15px; line-height:1.75; color:#333; }
    .name { color:#8B0000; font-weight:600; }

    /* Gift pill — one subtle branded accent */
    .gift-pill {
      display:inline-block; margin:8px 0 24px;
      border:1px solid #F2DADA; border-radius:50px;
      padding:10px 22px; background:#FFF9F5;
      font-size:15px; color:#8B0000; font-weight:500;
    }
    .gift-emoji { margin-right:6px; }

    /* Divider */
    .divider { border:none; border-top:1px solid #F2DADA; margin:28px 0; }

    /* Footer */
    .footer { font-size:12px; color:#bbb; line-height:1.7; }
    .footer a { color:#C8A96E; text-decoration:none; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="wordmark">
      <p class="wordmark-title">Temilola's 21st</p>
      <p class="wordmark-sub">✦ Birthday Wishlist</p>
    </div>

    ${body}

    <hr class="divider">
    <p class="footer">${footer}</p>
  </div>
</body>
</html>`;
}

// ── 1. Confirmation + Temmy notification — fires on claim ─────────────
export const sendClaimEmails = internalAction({
  args: {
    claimerEmail: v.optional(v.string()),
    claimerName:  v.string(),
    gift:         v.string(),
    emoji:        v.string(),
    anon:         v.boolean(),
    isLaptop:     v.boolean(),
  },
  handler: async (_ctx, args) => {
    const { claimerEmail, claimerName, gift, emoji, anon, isLaptop } = args;

    // ── Email to claimer ──────────────────────────────────────────────
    if (claimerEmail) {
      const subject = isLaptop
        ? `You're in — Temmy's laptop fund 💛`
        : `You're claiming ${gift} for Temmy 🎀`;

      const giftPill = isLaptop
        ? `<span class="gift-pill"><span class="gift-emoji">💻</span>Laptop Fund Contribution</span>`
        : `<span class="gift-pill"><span class="gift-emoji">${emoji}</span>${gift}</span>`;

      const bodyHtml = isLaptop
        ? `<p>Hey <span class="name">${claimerName}</span>,</p>
           <p>Your contribution to Temmy's laptop fund has been noted. She's going to be so grateful when she sees this — you have no idea 💛</p>
           ${giftPill}
           <p>Her birthday is <strong>May 14th</strong>. You'll get a reminder a couple days before so it doesn't sneak up on you.</p>
           <p>Thank you for showing up for her 🤍</p>`
        : `<p>Hey <span class="name">${claimerName}</span>,</p>
           <p>You just claimed a gift for Temmy's 21st birthday — she's going to absolutely love this.</p>
           ${giftPill}
           <p>Her birthday is <strong>May 14th</strong>. You'll get a reminder a couple days before so it doesn't sneak up on you.</p>
           <p>Thank you for showing up for her 🤍</p>`;

      const bodyText = isLaptop
        ? `Hey ${claimerName},\n\nYour contribution to Temmy's laptop fund has been noted. She's going to be so grateful.\n\nHer birthday is May 14th — you'll get a reminder before the date.\n\nThank you for showing up for her 🤍`
        : `Hey ${claimerName},\n\nYou just claimed "${gift}" for Temmy's 21st birthday — she's going to love it.\n\nHer birthday is May 14th — you'll get a reminder before the date.\n\nThank you for showing up for her 🤍`;

      await sendEmail({
        to: claimerEmail,
        subject,
        html: emailShell(bodyHtml, `You're receiving this because you claimed a gift on Temmy's birthday wishlist. Questions? Reply to this email.`),
        text: bodyText,
      });
    }

    // ── Email to Temmy ────────────────────────────────────────────────
    const claimerDisplay = anon
      ? "Someone who loves you (staying anonymous 🤍)"
      : `<span class="name">${claimerName}</span>`;

    const temmySubject = isLaptop
      ? `Someone just contributed to your laptop fund 💻`
      : `${anon ? "Someone" : claimerName} just picked a gift for you 🎀`;

    const temmyGiftPill = isLaptop
      ? `<span class="gift-pill"><span class="gift-emoji">💻</span>Laptop Fund</span>`
      : `<span class="gift-pill"><span class="gift-emoji">${emoji}</span>${gift}</span>`;

    const temmyHtml = isLaptop
      ? `<p>Hey Temmy,</p>
         <p>${claimerDisplay} just contributed to your laptop fund. Things are actually coming together 💻</p>
         ${temmyGiftPill}
         <p>Head to your wishlist dashboard to see everyone who's shown up for you so far 👑</p>`
      : `<p>Hey Temmy,</p>
         <p>${claimerDisplay} just picked something from your birthday wishlist.</p>
         ${temmyGiftPill}
         <p>Head to your wishlist dashboard to see everything that's been claimed for you so far 👑</p>`;

    const temmyText = isLaptop
      ? `Hey Temmy,\n\n${anon ? "Someone who loves you (staying anonymous)" : claimerName} just contributed to your laptop fund.\n\nCheck your wishlist dashboard to see who's showing up for you.`
      : `Hey Temmy,\n\n${anon ? "Someone who loves you (staying anonymous)" : claimerName} just claimed "${gift}" from your birthday wishlist.\n\nCheck your wishlist dashboard to see everything claimed so far.`;

    await sendEmail({
      to: TEMMY,
      subject: temmySubject,
      html: emailShell(temmyHtml, `This is your private wishlist notification. Only you receive these.`),
      text: temmyText,
      replyTo: FROM,
    });
  },
});

// ── 2. Reminder — fires May 12th, 2 days before the birthday ─────────
export const sendReminder = internalAction({
  args: {
    claimerEmail: v.string(),
    claimerName:  v.string(),
    gift:         v.string(),
    emoji:        v.string(),
    isLaptop:     v.boolean(),
  },
  handler: async (_ctx, args) => {
    const { claimerEmail, claimerName, gift, emoji, isLaptop } = args;

    const subject = `Temmy's birthday is in 2 days — just a heads up 🎂`;

    const giftPill = isLaptop
      ? `<span class="gift-pill"><span class="gift-emoji">💻</span>Laptop Fund</span>`
      : `<span class="gift-pill"><span class="gift-emoji">${emoji}</span>${gift}</span>`;

    const bodyHtml = isLaptop
      ? `<p>Hey <span class="name">${claimerName}</span>,</p>
         <p>Quick reminder — <strong>Temilola's 21st birthday is on May 14th</strong>, which is in 2 days.</p>
         <p>You contributed to her laptop fund:</p>
         ${giftPill}
         <p>She's going to be so grateful. Thank you for being part of making this special for her 💛</p>`
      : `<p>Hey <span class="name">${claimerName}</span>,</p>
         <p>Quick reminder — <strong>Temilola's 21st birthday is on May 14th</strong>, which is in 2 days.</p>
         <p>You claimed this for her:</p>
         ${giftPill}
         <p>She's going to absolutely love it. Make sure you're ready 🎀</p>`;

    const bodyText = isLaptop
      ? `Hey ${claimerName},\n\nQuick reminder — Temilola's 21st birthday is on May 14th, which is in 2 days.\n\nYou contributed to her laptop fund. She's going to be so grateful 💛`
      : `Hey ${claimerName},\n\nQuick reminder — Temilola's 21st birthday is on May 14th, which is in 2 days.\n\nYou claimed "${gift}" for her. She's going to love it 🎀`;

    await sendEmail({
      to: claimerEmail,
      subject,
      html: emailShell(bodyHtml, `You're receiving this because you claimed a gift on Temmy's birthday wishlist. Questions? Reply to this email.`),
      text: bodyText,
    });
  },
});
