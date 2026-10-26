export const SITE = {
  name: 'FinanceQuizPortal',
  tagline: 'Clear, practical money education',
  description:
    'FinanceQuizPortal explains personal finance, saving, investing, banking and the economy in plain language — educational guides for everyday financial decisions.',
  /** Used to build canonical and Open Graph URLs. Set VITE_SITE_URL in production. */
  url: (import.meta.env.VITE_SITE_URL || 'https://financequizportal.com').replace(/\/$/, ''),
  defaultImage: '/images/og/og-default.png',
  locale: 'en_US',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Finance', to: '/category/finance' },
  { label: 'Investing', to: '/category/investing' },
  { label: 'Saving', to: '/category/saving' },
  { label: 'Banking', to: '/category/banking' },
  { label: 'Business', to: '/category/business' },
  { label: 'About', to: '/about' },
];
