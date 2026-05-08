import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import useScrollReveal from './hooks/useScrollReveal';

import Hero from './components/Hero';
import LaptopFund from './components/LaptopFund';
import GiftSection from './components/GiftSection';
import MailSection from './components/MailSection';
import MoneySection from './components/MoneySection';
import HeartSection from './components/HeartSection';
import ClaimModal from './components/ClaimModal';
import LaptopModal from './components/LaptopModal';
import AdminPanel from './components/AdminPanel';
import Preloader from './components/Preloader';
import Toast from './components/Toast';

// ── Gift catalogue ─────────────────────────────────────────────────
export const GIFT_SECTIONS = [
  {
    id: 'style',
    tag: 'Style & Soft Life',
    title: 'Fashion Pieces I\'d Love 🎀',
    sub: 'A few stylish things that would make my heart very happy.',
    bg: 'bg-cream',
    gifts: [
      { item: 'bag',       emoji: '👜', name: 'A Cute Bag',         image: '/gifts/bag.jpg',       note: 'Something stylish and chic 👀 Surprise me — I trust your taste completely!', btn: "🎁 I'll gift this" },
      { item: 'heels',     emoji: '👠', name: 'Heels',              images: ['/gifts/heels-1.jpg', '/gifts/heels-2.jpg'],  note: 'Size 38 (sometimes 39, but let\'s be safe 😌). Beautiful and ideally walkable please!', btn: "🎁 I'll gift this" },
      { item: 'sneakers',  emoji: '👟', name: 'Sneakers',           image: '/gifts/sneakers.jpg',  note: 'Size 38 please 🙏 Something clean and cute!', btn: "🎁 I'll gift this" },
      { item: 'slippers',  emoji: '🩴', name: 'Slippers',           images: ['/gifts/slippers-1.jpg', '/gifts/slippers-2.jpg', '/gifts/slippers-3.jpg', '/gifts/slippers-4.jpg'],  note: 'Size 38 — browse the options and pick your favourite 🩴', btn: "🎁 I'll gift this" },
      { item: 'dress',     emoji: '👗', name: 'A Beautiful Dress',  image: '/gifts/dress.jpg',     note: 'Size 8, preferably burgundy ❤️ A beautiful body hug dress would be dreamy.', btn: "🎁 I'll gift this" },
    ],
  },
  {
    id: 'luxuries',
    tag: 'Little Luxuries',
    title: 'Things That Make Life Beautiful ✨',
    sub: 'Small indulgences that would mean a lot.',
    bg: 'bg-white',
    gifts: [
      { item: 'perfume', emoji: '🌹', name: 'Perfumes',          note: 'Very feminine — NOT flowery though. Something that smells truly great. Body oils, mist, the whole collection!', btn: "🎁 I'll gift this" },
      { item: 'glasses', emoji: '👓', name: 'Cute Glass Frames', note: 'I\'m open to nice, stylish frames 👓 Surprise me with something that\'d look amazing!', btn: "🎁 I'll gift this" },
      { item: 'mic',     emoji: '🎤', name: 'A Good Microphone', image: '/gifts/mic.jpg',       note: 'Content creator things 🎤 A quality mic for recording and content creation.', btn: "🎁 I'll gift this" },
    ],
  },
  {
    id: 'experiences',
    tag: 'Experiences',
    title: 'Experiences > Things 🎉',
    sub: 'Because some memories are more precious than any gift.',
    bg: 'bg-blush',
    single: true,
    gifts: [
      { item: 'karaoke', emoji: '🎶', name: 'Karaoke Session', note: "Let's sing our lungs out together 😭🎵 This would genuinely make me so happy!", btn: "🎁 I'll make this happen" },
    ],
  },
];

// ── App ────────────────────────────────────────────────────────────
export default function App() {
  const claims       = useQuery(api.claims.list) ?? [];
  const createClaim  = useMutation(api.claims.create);

  const [ready,       setReady]       = useState(false);  // preloader done
  const [modal,       setModal]       = useState(null);   // { item, giftName, emoji }
  const [laptopModal, setLaptopModal] = useState(false);
  const [adminOpen,   setAdminOpen]   = useState(false);
  const [toast,       setToast]       = useState('');

  useScrollReveal();

  // Handle #admin hash
  useEffect(() => {
    const check = () => {
      if (window.location.hash === '#admin') setAdminOpen(true);
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  // Toast helper
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3400);
  }, []);

  // Look up claim for an item
  const claimFor = useCallback(
    (item) => claims.find((c) => c.item === item),
    [claims]
  );

  // Open gift claim modal (guard if already claimed)
  const openModal = useCallback((item, giftName, emoji) => {
    if (claims.find((c) => c.item === item)) return;
    setModal({ item, giftName, emoji });
  }, [claims]);

  // Submit a gift claim
  const handleClaim = useCallback(async (item, name, giftName, emoji, anon, claimerEmail) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
    await createClaim({ item, name, gift: giftName, emoji, anon, timestamp, claimerEmail });
    showToast(anon ? 'Claimed anonymously 🤍 Temmy will be surprised!' : `Claimed! 🎉 Temmy is going to love this.`);
  }, [createClaim, showToast]);

  // Submit a laptop contribution
  const handleLaptop = useCallback(async (name, amount, anon, claimerEmail) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
    const displayName = anon ? 'Someone 🤍' : name;
    await createClaim({
      item: 'laptop', name: displayName,
      gift: 'Laptop Fund Contribution', emoji: '💻',
      anon, timestamp, amount: amount || undefined, claimerEmail,
    });
    showToast(anon ? 'Thank you 💛 Contribution noted!' : `Thank you, ${name}! 💛 Temmy will be so grateful.`);
  }, [createClaim, showToast]);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Hero />

      <LaptopFund
        laptopClaim={claimFor('laptop')}
        onContribute={() => setLaptopModal(true)}
      />

      {GIFT_SECTIONS.map((section) => (
        <GiftSection
          key={section.id}
          section={section}
          claimFor={claimFor}
          onClaim={openModal}
        />
      ))}

      <MailSection />
      <MoneySection />
      <HeartSection />

      <footer className="footer">
        Made with 🤍 for <em>Temilola's 21st Birthday</em> &nbsp;✦&nbsp; Thank you for loving her
      </footer>

      {/* Modals */}
      <ClaimModal
        data={modal}
        onClose={() => setModal(null)}
        onConfirm={handleClaim}
      />
      <LaptopModal
        open={laptopModal}
        onClose={() => setLaptopModal(false)}
        onConfirm={handleLaptop}
      />

      {/* Admin */}
      <AdminPanel
        open={adminOpen}
        onClose={() => {
          setAdminOpen(false);
          history.replaceState(null, '', window.location.pathname);
        }}
        claims={claims}
      />

      <Toast message={toast} />
    </>
  );
}
