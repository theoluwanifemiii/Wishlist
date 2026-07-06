import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import useScrollReveal from './hooks/useScrollReveal';
import { CONFIG } from './config';

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

const { person, fund, giftSections } = CONFIG;

// ── App ────────────────────────────────────────────────────────────
export default function App() {
  const claims       = useQuery(api.claims.list) ?? [];
  const createClaim  = useMutation(api.claims.create);

  const [ready,       setReady]       = useState(false);
  const [modal,       setModal]       = useState(null);
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

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3400);
  }, []);

  const claimFor = useCallback(
    (item) => claims.filter((c) => c.item === item).length,
    [claims]
  );

  const openModal = useCallback((item, giftName, emoji) => {
    setModal({ item, giftName, emoji });
  }, []);

  const handleClaim = useCallback(async (item, name, giftName, emoji, anon, claimerEmail) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
    await createClaim({ item, name, gift: giftName, emoji, anon, timestamp, claimerEmail });
    showToast(anon ? 'Claimed anonymously 🤍' : `Claimed! 🎉`);
  }, [createClaim, showToast]);

  const handleLaptop = useCallback(async (name, amount, anon, claimerEmail) => {
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
    const displayName = anon ? 'Someone 🤍' : name;
    await createClaim({
      item: fund.itemKey, name: displayName,
      gift: fund.contributionLabel, emoji: fund.emoji,
      anon, timestamp, amount: amount || undefined, claimerEmail,
    });
    showToast(anon ? 'Thank you 💛 Contribution noted!' : `Thank you, ${name}! 💛`);
  }, [createClaim, showToast]);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Hero />

      <LaptopFund
        laptopClaim={claimFor(fund.itemKey)}
        onContribute={() => setLaptopModal(true)}
      />

      {giftSections.map((section) => (
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
        Made with 🤍 for <em>{person.name}'s {person.age}{person.age === 21 ? 'st' : person.age === 22 ? 'nd' : person.age === 23 ? 'rd' : 'th'} Birthday</em> &nbsp;✦&nbsp; Thank you for loving {person.shortName === person.name ? 'her' : person.shortName}
      </footer>

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
