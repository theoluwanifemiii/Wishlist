// ─────────────────────────────────────────────────────────────
//  ORE'S CONFIG  —  rename this to config.js on the ore branch
// ─────────────────────────────────────────────────────────────

export const CONFIG = {

  // ── Person ─────────────────────────────────────────────────
  person: {
    name:      'Oreoluwa',
    shortName: 'Ore',
    age:       20,
  },

  // ── Hero ───────────────────────────────────────────────────
  hero: {
    subtitle: 'Chapter 20 ✨',
    lines: [
      { text: 'Hellooooo! 🥳',                                                                                                       cls: 'quote',  delay: 0.7  },
      { text: 'Yes, you\'re here because you love me 😌❤️',                                                                          cls: 'quote',  delay: 0.9  },
      { cls: 'gap', delay: 0 },
      { text: 'This year is so, so special to me. It marks the end of one incredible decade and the beautiful beginning of another!', cls: 'answer', delay: 1.1  },
      { cls: 'gap', delay: 0 },
      { text: 'This year is officially the year of "You make this birthday special for me."',                                         cls: 'answer', delay: 1.3  },
      { text: 'If you\'ve ever wondered, "What does Ore even like?" or "What can I get her?"...',                                     cls: 'answer', delay: 1.5  },
      { cls: 'gap', delay: 0 },
      { text: 'Relaxxxx, you\'re in the right place. 😌💋',                                                                          cls: 'quote',  delay: 1.7  },
      { text: 'I\'ve carefully curated a wishlist — take a look around, find something you\'d love to bless me with, and thank you for being a part of my story! 🎁💃🏽', cls: 'answer', delay: 1.9 },
    ],
  },

  // ── Fund ───────────────────────────────────────────────────
  fund: {
    itemKey:           'iphone',
    emoji:             '📱',
    title:             'Help Me Get An iPhone! 📱✨',
    description:       "Honestly, let's be serious for a second: I need an iPhone. It's a critical working tool for my career growth — and also highly essential for my baby girl lifestyle and aesthetic. 😌💅🏽 How can I be entering my twenties without premium camera quality? I've already bagged ₦120,000 of my own money! 🥳 I'm aiming for ₦550,000, so I just need ₦430,000 more. Every single contribution counts — come and co-sponsor my baby girl era! 🌚",
    goal:              550_000,
    seedAmount:        120_000,  // Ore already saved this herself
    contributionLabel: 'iPhone Fund Contribution',
    modalTitle:        'Contribute to the iPhone Fund 📱',
    modalSub:          'Any amount helps! Ore has already put in ₦120k herself — help her close the gap 💛 Your contribution will be noted.',
  },

  // ── Bank details ───────────────────────────────────────────
  bank: {
    accountNumber: '9015338676',
    bankName:      'OPay',
    accountName:   'Samagbeyi Dorcas Oluwadarasimi',
  },

  // ── Money section copy ─────────────────────────────────────
  money: {
    title: 'Cold, Hard Cash 💸✨',
    sub:   "The Ultimate Best Friend! Nothing funds the 'baby girl lifestyle,' pays for professional certifications, or secures the vision quite like raw cash. Contribution to the Oreoluwa Future Billionaire Fund is always the perfect size and color. 🤭🌚 Multi-claim wide open — no amount is too small! 💃🏾",
  },

  // ── Gift sections ──────────────────────────────────────────
  giftSections: [
    {
      id: 'corporate',
      tag: 'Corporate Baddie Era',
      title: 'Corporate Baddie Era 👗',
      sub: 'Now that we are securing paid internships, the wardrobe must reflect the vision! 😌🔥',
      bg: 'bg-cream',
      gifts: [
        { item: 'corporate-wear', emoji: '👔', name: 'Corporate Outfits',       link: '', note: 'Chic corporate gowns, sharp tailored pants, effortless two-piece sets — sleek, modern, and youthful. Size UK8 / Medium. Sponsor an outfit to help me stand out in the boardroom! 🤭🎁', btn: "🎁 I'll gift this" },
        { item: 'cute-dress',     emoji: '👗', name: 'Cute Dresses',            link: '', note: 'Super cute, aesthetic dresses for dinners and casual hangouts. I am fully in my burgundy era 🍷 A gorgeous burgundy outfit would absolutely make my year! Size UK8 / Small.', btn: "🎁 I'll gift this" },
        { item: 'crochet',        emoji: '🧶', name: 'Oversized Crochet Sweater', link: '', note: 'Chunky, oversized — the perfect piece for chilly lecture halls and rainy days ❤️ Vibe: Oversized, comfy, soft-girl aesthetic. Keep your favourite girl warm 😘', btn: "🎁 I'll gift this" },
        { item: 'custom-shirt',   emoji: '🖤', name: 'Custom Black Shirt',      link: '', note: '"ABBA\'S BELOVED" — a meaningful, stylish statement piece. Classic, high-quality black shirt with this inscription. Size Medium (slightly oversized is a win!). Gift me this deeply personal reminder for my 20s! 🤭', btn: "🎁 I'll gift this" },
        { item: 'hair-acc',       emoji: '🎀', name: 'Hair Accessories',        link: '', note: 'Cute scrunchies, aesthetic claw clips, and stylish hairpins to keep my hair flawless 🌸 A super sweet, low-stress option to add sparkle to my day!', btn: "🎁 I'll gift this" },
      ],
    },
    {
      id: 'footwear',
      tag: 'Step Into My 20s',
      title: 'Stepping Into My 20s 👟👠',
      sub: 'Comfy, cute, and always on point.',
      bg: 'bg-white',
      gifts: [
        { item: 'sneakers',  emoji: '👟', name: 'Sneakers',         link: '', note: 'A fly pair of kicks — comfy and cute for campus, casual days, or dressing down a corporate look. Size 42. Help me put my best foot forward! 😂🎁', btn: "🎁 I'll gift this" },
        { item: 'footwear',  emoji: '👡', name: 'Cute Footwear',    link: '', note: 'Cute, super comfortable slippers for lounging or staying cozy on the move. Size 42. Vibe: Soft, aesthetic, and cozy. Keep me comfortable while I conquer my goals! 😂🎁', btn: "🎁 I'll gift this" },
        { item: 'bags',      emoji: '👜', name: 'Bags & Tote Bags', link: '', note: 'From lectures to corporate offices — a spacious tote that fits my laptop and essentials, plus chic handbags to elevate my outfits. Vibe: Professional, modern, and aesthetic 😘✨', btn: "🎁 I'll gift this" },
      ],
    },
    {
      id: 'accessories',
      tag: 'The Details',
      title: 'Timepieces & Treasures ⌚✨',
      sub: "They say details make the outfit — we are not doing sloppy details in my twenties! 😌💎",
      bg: 'bg-cream',
      gifts: [
        { item: 'watch',    emoji: '⌚', name: 'Wristwatch',         link: '', note: 'Sleek, classic, professional. A gorgeous watch that says "I manage finances and I\'m never late." 💼🕰️ Gift me a timeless piece!', btn: "🎁 I'll gift this" },
        { item: 'jewelry',  emoji: '💍', name: 'Jewellery',          link: '', note: 'Dainty, aesthetic necklaces or bracelets — tarnish-free gold or silver preferred! Something I\'ll wear every single day 💃🏾', btn: "🎁 I'll gift this" },
        { item: 'perfume',  emoji: '🌸', name: 'Perfumes & Deodorants', link: '', note: 'Smelling expensive is a top priority for my twenties! Warm vanillas, soft florals, or fresh clean scents 🍦 Multi-claim open — you can never have too many scents! 🎁', btn: "🎁 I'll gift this" },
      ],
    },
    {
      id: 'tech',
      tag: 'Content Creator',
      title: 'Influencer Starter Pack 🎬🎙️',
      sub: "The vision is incomplete without the gear! 😌✨",
      bg: 'bg-white',
      gifts: [
        { item: 'tripod', emoji: '📷', name: 'Tripod',           link: '', note: 'A handy tripod for steady angles — whether I\'m vlogging my twenties or documenting my premium vibes, the setup must be right! 🔥 Shoutout guaranteed 😉', btn: "🎁 I'll gift this" },
        { item: 'mic',    emoji: '🎙️', name: 'Content Mic',       link: '', note: 'A crisp content mic so my voice is crystal clear. Help me unlock my full viral potential! 🎁', btn: "🎁 I'll gift this" },
      ],
    },
    {
      id: 'experiences',
      tag: 'Things I\'d Love to Experience',
      title: 'Things I\'d Love to Experience & Learn 🎉',
      sub: 'Because some gifts are memories, and some are investments.',
      bg: 'bg-blush',
      gifts: [
        { item: 'cinema',     emoji: '🍿', name: 'Cinema Date',         note: 'Popcorn, big screens, good vibes! Gift me a classic movie night out — complete with a great film, cozy seats, and the biggest bucket of sweet popcorn! ✨', btn: "🎁 I'll make this happen" },
        { item: 'ice-cream',  emoji: '🍦', name: 'Ice Cream Date',      note: 'My favourite activity is sitting down, eating something sweet, and chatting about everything and nothing 😂❤️ Treat your favourite girl!', btn: "🎁 I'll make this happen" },
        { item: 'buffet',     emoji: '🍽️', name: 'Buffet Lunch Date',   note: 'All-you-can-eat and endless chats! I love good food and even better company. A buffet where I can try a bit of everything while we talk for hours 😂❤️', btn: "🎁 I'll make this happen" },
        { item: 'driving',    emoji: '🚗', name: 'Driving Classes',     note: "It's officially time for me to get behind the wheel. Gift me a session (or full course) at a driving school — make I no go jam person pikin 😭😂", btn: "🎁 I'll sponsor this" },
        { item: 'baking',     emoji: '🍰', name: 'Pastry & Baking Classes', note: 'One of my major goals for this year — learning how to bake and make delicious pastries from scratch 🌚 Help me unlock my inner pastry chef! 🤭💃🏾', btn: "🎁 I'll sponsor this" },
        { item: 'investment', emoji: '📈', name: 'Investment Course',   note: "Officially kickstarting my investment journey 💫 Gift me a top-tier, practical investment course so I can learn to grow my money and build real wealth! Invest in my future 🎁", btn: "🎁 I'll sponsor this" },
        { item: 'spa',        emoji: '💆🏽‍♀️', name: 'Spa Session',     note: "Balancing the books, exams, and the corporate baddie lifestyle is a lot of work! I'm wishing for a luxurious spa session — deep tissue massage and ultimate pampering 🌸 Sponsor a soft-girl self-care day!", btn: "🎁 I'll make this happen" },
        { item: 'internship', emoji: '💼', name: 'A Paid Internship',   note: "Okay, hear me out — this isn't something you can buy in a store, but it's at the very top of my wishlist 🥺 If you have connections or openings in finance, accounting, or corporate banking, please slide into my DMs! Your network is my best birthday gift 😌💅🏽", btn: "🎁 I have a connection!" },
      ],
    },
  ],
};
