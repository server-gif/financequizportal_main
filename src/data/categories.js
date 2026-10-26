/** Top-level sections used by navigation, category pages and the footer. */
export const CATEGORIES = [
  {
    slug: 'finance',
    name: 'Personal Finance',
    title: 'Personal Finance',
    description: 'Budgeting, taxes and long-term planning — the everyday building blocks of a healthy financial life.',
  },
  {
    slug: 'investing',
    name: 'Investing',
    title: 'Investing',
    description: 'How markets, mutual funds and compounding work, explained for people starting out.',
  },
  {
    slug: 'saving',
    name: 'Saving',
    title: 'Saving Money',
    description: 'Practical ways to build savings, cut costs and prepare for the unexpected.',
  },
  {
    slug: 'banking',
    name: 'Banking & Credit',
    title: 'Banking, Credit & Borrowing',
    description: 'Accounts, credit scores, credit cards and borrowing — understand the rules before you sign.',
  },
  {
    slug: 'business',
    name: 'Business & Economy',
    title: 'Business & Economy',
    description: 'Inflation, interest rates and small-business finance, and what they mean for your money.',
  },
];

export const getCategoryBySlug = (slug) => CATEGORIES.find((category) => category.slug === slug);
