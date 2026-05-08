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
    tag: 'Vanities of Life',
    title: 'Vanities of Life 🛍️',
    sub: 'A few stylish things that would make my heart very happy.',
    bg: 'bg-cream',
    gifts: [
      { item: 'bag',      emoji: '👜', name: 'A Cute Bag',        image: '/gifts/bag.jpg',  link: '', note: "Something stylish and chic 👀 Doesn't have to be this exact one — I trust your taste completely!", btn: "🎁 I'll gift this" },
      { item: 'heels',    emoji: '👠', name: 'Heels',             images: ['/gifts/heels-1.jpg', '/gifts/heels-2.jpg'],  links: ['', ''],  note: "Size 39 — I don't have 'oke ese' please 😌 Beautiful and ideally walkable!", btn: "🎁 I'll gift this" },
      { item: 'sneakers', emoji: '👟', name: 'Sneakers',          images: ['/gifts/sneakers-1.jpg', '/gifts/sneakers-2.jpg'],  links: ['', ''],  note: "Size 38 — I don't have oke-ese please 🙏 Please specify to your vendor, or reach out to my plug!", btn: "🎁 I'll gift this" },
      { item: 'slippers', emoji: '🩴', name: 'Slippers',          images: ['/gifts/slippers-1.jpg', '/gifts/slippers-2.jpg', '/gifts/slippers-3.jpg', '/gifts/slippers-4.jpg'],  links: ['', '', '', ''],  whatsapp: 'https://wa.me/2348110420820',  note: 'Size 38 — browse the options and pick your favourite 🩴', btn: "🎁 I'll gift this" },
      { item: 'dress',    emoji: '👗', name: 'A Beautiful Dress', image: '/gifts/dress.jpg', link: '', note: "A beautiful body hug dress — size 8, specifically burgundy ❤️ Doesn't have to be this exact design.", btn: "🎁 I'll gift this" },
      { item: 'jewelry',  emoji: '💍', name: 'Jewelleries',       image: '/gifts/Jewelleries.png', link: '', note: 'Necklaces, earrings, bracelets — anything dainty and feminine ✨ Gold tones preferred!', btn: "🎁 I'll gift this" },
    ],
  },
  {
    id: 'luxuries',
    tag: 'Little Luxuries',
    title: 'Little Luxuries I\'d Love ✨',
    sub: 'Small indulgences that would mean a lot.',
    bg: 'bg-white',
    gifts: [
      { item: 'perfume',    emoji: '🌹', name: 'Perfumes',                    image: '/gifts/Perfumes.png', link: '', note: "Very feminine ones — I'm not a flowery girl. Just buy me something that smells really great. Body oils, mist, the whole perfume collection!", btn: "🎁 I'll gift this" },
      { item: 'glasses',    emoji: '👓', name: 'Cute Glass Frames',           image: '/gifts/GlassFrames.png', link: '', note: "I'm open to nice, stylish frames 👓 Surprise me with something that'd look amazing!", btn: "🎁 I'll gift this" },
      { item: 'sweatshirt', emoji: '👕', name: 'Sweatshirts & Customized Tees', image: '/gifts/Sweatshirts.png', link: '', note: "Cozy sweatshirts or customized tees — I'd genuinely wear these all the time 🤍", btn: "🎁 I'll gift this" },
      { item: 'mic',        emoji: '🎤', name: 'A Good Microphone',           image: '/gifts/mic.jpg', link: '', note: "If I blow tomorrow through this content thing, you'd be part of my 'success story' — invest in me now while you still can 🎤", btn: "🎁 I'll gift this" },
    ],
  },
  {
    id: 'experiences',
    tag: 'Experiences',
    title: 'Things I\'d Love to Experience 🎉',
    sub: 'Because some memories are more precious than any gift.',
    bg: 'bg-blush',
    gifts: [
      { item: 'karaoke', emoji: '🎶', name: 'A Karaoke Session',     image: '/gifts/Karaoke.png',    note: "I want to sing my heart out! This would genuinely make me so happy 😭🎵", btn: "🎁 I'll make this happen" },
      { item: 'gallery', emoji: '🖼️', name: 'An Art Gallery',        image: '/gifts/ArtGallery.png', note: "Somewhere beautiful. Take 'ART' to see art! ✨", btn: "🎁 I'll make this happen" },
      { item: 'beach',   emoji: '🏖️', name: 'The Beach',             image: '/gifts/Beach.png',      note: "Beach — no be river ooo 😅🌊", btn: "🎁 I'll make this happen" },
      { item: 'wedding', emoji: '💒', name: 'Invite Me to a Wedding', image: '/gifts/Wedding.png',    note: "A proper owambe party, with plenty souvenirs. I don't want to fight for food, please 😭🎉", btn: "🎁 I'll make this happen" },
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

  // Return how many people have claimed a given item key
  const claimFor = useCallback(
    (item) => claims.filter((c) => c.item === item).length,
    [claims]
  );

  // Open gift claim modal
  const openModal = useCallback((item, giftName, emoji) => {
    setModal({ item, giftName, emoji });
  }, []);

  // Submit a gift claim
  const handleClaim = useCallback(async (item, name, giftName, emoji, anon, claimerEmail) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
    await createClaim({ item, name, gift: giftName, emoji, anon, timestamp, claimerEmail });
    showToast(anon ? 'Claimed anonymously 🤍 I\'ll be so surprised!' : `Claimed! 🎉 I'm going to love this.`);
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
    showToast(anon ? 'Thank you 💛 Contribution noted!' : `Thank you, ${name}! 💛 I'm so grateful.`);
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

      <MoneySection />
      <MailSection />
      <HeartSection />

      <footer className="footer">
        Made with 🤍 for <em>Temilola's 21st Birthday</em> &nbsp;✦&nbsp; Thank you for loving me
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
