/**
 * Article data. UI components receive these objects through props —
 * add, remove or edit articles here without touching any component.
 *
 * Content blocks: { type: 'p'|'h2'|'h3', text } | { type: 'ul'|'ol', items } | { type: 'callout', title, text }
 * All content is general and educational; it is not personalised financial advice.
 */

const p = (text) => ({ type: 'p', text });
const h2 = (text) => ({ type: 'h2', text });
const h3 = (text) => ({ type: 'h3', text });
const ul = (...items) => ({ type: 'ul', items });
const ol = (...items) => ({ type: 'ol', items });
const callout = (title, text) => ({ type: 'callout', title, text });

const RAW_BLOGS = [
  {
    id: 1,
    slug: 'how-compound-interest-works',
    title: 'How Compound Interest Works',
    category: 'Investing',
    section: 'investing',
    excerpt:
      'Compounding means earning returns on your past returns. See why time is the most powerful ingredient in growing money.',
    isoDate: '2026-10-03',
    author: 'Markets Team',
    imageAlt: 'Two stacks of coins on a dark table with a young green plant sprouting between them, a bright window behind',
    content: [
      p('Compound interest is interest earned not only on your original money, but also on the interest it has already earned. Over long periods, this snowball effect can make a dramatic difference — which is why it is often called the most important concept in personal finance.'),
      h2('Simple vs. Compound Interest'),
      p('With simple interest, you earn a return only on the original amount. With compound interest, each period’s earnings are added to the balance, so the next period’s return is calculated on a larger number.'),
      callout('Example', '10,000 earning 8% a year grows to about 21,600 after 10 years, 46,600 after 20 years and 100,600 after 30 years. The money roughly doubles every nine years — and most of the growth comes in the later years.'),
      h2('The Three Levers'),
      ul(
        'Time: the longer money compounds, the stronger the effect.',
        'Rate of return: small differences in yearly returns create large differences over decades.',
        'Contributions: adding money regularly gives compounding more to work with.',
      ),
      h3('The Rule of 72'),
      p('To estimate how long it takes money to double, divide 72 by the annual rate of return. At 6%, money doubles in about 12 years; at 9%, about 8 years. It is a rough shortcut, but useful for quick comparisons.'),
      h2('Compounding Works Against You, Too'),
      p('The same maths applies to debt. Credit card balances that carry high interest grow quickly when unpaid, because interest is charged on previous interest. Paying down high-interest debt is effectively a guaranteed return.'),
      h2('Key Takeaways'),
      ol(
        'Start early — time matters more than the amount you begin with.',
        'Reinvest earnings rather than withdrawing them.',
        'Keep fees low, since costs compound as well.',
        'Avoid carrying high-interest debt.',
      ),
    ],
  },

  {
    id: 2,
    slug: 'beginners-guide-to-investing',
    title: "Beginner's Guide to Investing",
    category: 'Investing',
    section: 'investing',
    excerpt:
      'Investing is how savings grow faster than inflation over time. Here are the core concepts every beginner should understand first.',
    isoDate: '2026-10-06',
    author: 'Markets Team',
    imageAlt: 'An investor seen from behind studying a price chart on a laptop, printed financial reports spread across the desk',
    content: [
      p('Investing means putting money into assets — such as shares, bonds or funds — with the expectation that they will grow in value or produce income over time. Unlike a savings account, investments can fall in value, which is why understanding the basics matters before you begin.'),
      h2('Saving vs. Investing'),
      p('Saving is for short-term goals and emergencies, where stability matters most. Investing is generally for goals several years away, where you have time to ride out market ups and downs in exchange for potentially higher long-term returns.'),
      h2('The Main Asset Types'),
      ul(
        'Stocks (equities): part-ownership of a company; higher growth potential with higher volatility.',
        'Bonds (fixed income): loans to governments or companies that pay interest; usually steadier than stocks.',
        'Funds: pooled investments, such as mutual funds or ETFs, that spread money across many holdings.',
        'Cash equivalents: very low risk, but returns may not keep pace with inflation.',
      ),
      h2('Risk and Return'),
      p('Higher potential returns come with higher risk. Your appropriate mix depends on your time horizon, your goals and how comfortably you can tolerate seeing your portfolio fall temporarily.'),
      callout('Key idea', 'Diversification — spreading money across many investments — reduces the impact of any single one performing badly. It does not eliminate risk, but it makes outcomes less dependent on luck.'),
      h2('Getting Started'),
      ol(
        'Build an emergency fund and pay down high-interest debt first.',
        'Define your goal and when you will need the money.',
        'Understand the costs: fees and expense ratios compound too.',
        'Consider diversified, low-cost funds as a simple starting point.',
        'Invest regularly and review periodically rather than reacting to daily news.',
      ),
      p('Investing is a long-term discipline. Consistency, patience and low costs usually matter more than finding the perfect moment to start.'),
    ],
  },
  {
    id: 3,
    slug: 'how-to-build-an-emergency-fund',
    title: 'How to Build an Emergency Fund',
    category: 'Saving',
    section: 'saving',
    excerpt:
      'An emergency fund turns a crisis into an inconvenience. Learn how much to aim for, where to keep it and how to build it step by step.',
    isoDate: '2026-10-08',
    author: 'Finance Desk',
    featured: true,
    imageAlt: 'A hand holding a glass jar filled with folded banknotes against a pink wall, a handwritten note stuck on the front',
    content: [
      p('An emergency fund is one of the foundations of personal financial planning. It is money set aside specifically for unexpected events — a job loss, a medical bill, an urgent car or home repair — so you are not forced to borrow at high interest or sell long-term investments at a bad time.'),
      h2('Why an Emergency Fund Matters'),
      p('Without a cash buffer, a single surprise expense can spiral into credit card debt. With one, the same event becomes a manageable inconvenience. An emergency fund also gives you options: time to look for the right job rather than the first one, or room to make decisions calmly.'),
      ul(
        'Protects you from high-interest borrowing',
        'Keeps long-term investments untouched during short-term crises',
        'Reduces financial stress and improves decision-making',
      ),
      h2('How Much Should You Save?'),
      p('A common guideline is three to six months of essential living expenses — rent or mortgage, utilities, groceries, insurance, transport and minimum debt payments. People with irregular income, dependants or a single household income often aim for the higher end.'),
      callout('Example', 'If your essential monthly expenses are 40,000, a three-month fund would be 120,000 and a six-month fund 240,000. Start with a smaller first milestone, such as one month, so progress feels achievable.'),
      h2('Simple Steps to Start'),
      ol(
        'Set a target based on your essential monthly costs.',
        'Open a separate savings account so the money is not mixed with daily spending.',
        'Automate a fixed transfer on payday, even if it is small.',
        'Direct windfalls — bonuses, tax refunds, gifts — towards the fund.',
        'Keep the money accessible, but not so convenient that it gets spent casually.',
      ),
      h2('Where to Keep It'),
      p('The priority for emergency money is safety and access, not maximum return. High-yield savings accounts, money market accounts or short-term deposits that allow early withdrawal are common choices. Volatile investments such as stocks are generally unsuitable, because their value may fall exactly when you need the cash.'),
      h3('When to Use It — and Refill It'),
      p('Use the fund only for genuine emergencies, not planned purchases. After you draw on it, make rebuilding it your next savings priority before resuming other goals.'),
    ],
  },
  {
    id: 4,
    slug: 'smart-ways-to-save-money',
    title: 'Smart Ways to Save Money Every Month',
    category: 'Saving',
    section: 'saving',
    excerpt:
      'Saving more rarely means giving up everything you enjoy. These practical habits free up cash without feeling like deprivation.',
    isoDate: '2026-09-30',
    author: 'Finance Desk',
    imageAlt: 'A hand dropping a coin into the slot of a blue ceramic piggy bank',
    content: [
      p('Saving money consistently has less to do with willpower and more to do with systems. Small, repeatable changes to how money flows through your month usually beat dramatic short-lived cutbacks.'),
      h2('Pay Yourself First'),
      p('Treat savings like a bill. Schedule an automatic transfer to a savings account on payday, so the money is set aside before you have a chance to spend it. Even a modest percentage adds up over a year.'),
      h2('Review Recurring Costs'),
      ul(
        'Cancel subscriptions and memberships you rarely use.',
        'Compare insurance, mobile and internet plans once a year.',
        'Ask providers about loyalty discounts or cheaper tiers.',
      ),
      h2('Spend More Intentionally'),
      p('Many unplanned purchases are impulse decisions. A simple rule — waiting 48 hours before buying any non-essential item above a set amount — filters out purchases you would later regret.'),
      callout('Tip', 'Track your spending for one month without changing anything. Seeing where money actually goes often reveals easy savings that budgeting alone misses.'),
      h2('Everyday Habits That Add Up'),
      ol(
        'Plan meals and shop with a list to reduce food waste.',
        'Use cash-back or price-comparison tools for planned purchases.',
        'Buy quality items that last instead of replacing cheap ones repeatedly.',
        'Set savings goals with names and dates — they are easier to stick to.',
      ),
      p('The goal is not to eliminate all spending, but to make sure your money goes towards the things you value most.'),
    ],
  },
  {
    id: 5,
    slug: 'understanding-mutual-funds',
    title: 'Understanding Mutual Funds',
    category: 'Mutual Funds',
    section: 'investing',
    excerpt:
      'Mutual funds pool money from many investors into a professionally managed portfolio. Learn the types, costs and terms that matter.',
    isoDate: '2026-09-27',
    author: 'Markets Team',
    imageAlt: 'Gold and silver cryptocurrency tokens resting on a spread of hundred-dollar bills',
    content: [
      p('A mutual fund pools money from many investors and invests it in a portfolio of stocks, bonds or other assets. Each investor owns units of the fund, and the value of those units rises or falls with the underlying investments.'),
      h2('Why People Use Mutual Funds'),
      ul(
        'Instant diversification across many securities with a single investment.',
        'Professional management and research.',
        'Low minimum investment amounts in many cases.',
        'The option to invest a fixed amount regularly, often called a systematic investment plan (SIP).',
      ),
      h2('Common Types of Funds'),
      h3('Equity funds'),
      p('Invest mainly in company shares. They have higher growth potential and higher short-term volatility, and are typically used for long-term goals.'),
      h3('Debt funds'),
      p('Invest in bonds and other fixed-income instruments. They tend to be less volatile than equity funds, though they still carry interest-rate and credit risk.'),
      h3('Hybrid and index funds'),
      p('Hybrid funds mix equity and debt. Index funds aim to match a market index rather than beat it, usually at a lower cost.'),
      h2('Understanding Costs'),
      p('Every fund charges an annual fee, known as the expense ratio, deducted from the fund’s assets. Some funds also have exit loads for early withdrawals. Because fees reduce returns every year, small differences matter over long periods.'),
      callout('NAV explained', 'Net Asset Value (NAV) is the per-unit value of the fund, calculated daily. A low NAV does not make a fund “cheap” — what matters is how the underlying portfolio performs.'),
      h2('Questions to Ask Before Investing'),
      ol(
        'What is the fund’s objective, and does it match my goal and time horizon?',
        'What is the expense ratio compared to similar funds?',
        'How has it performed across different market conditions, not just recently?',
        'What are the risks described in the official fund documents?',
      ),
    ],
  },
  {
    id: 6,
    slug: 'what-is-a-credit-score',
    title: 'What Is a Credit Score?',
    category: 'Credit',
    section: 'banking',
    excerpt:
      'Your credit score influences loan approvals and interest rates. Here is what shapes it and how healthy habits improve it over time.',
    isoDate: '2026-09-24',
    author: 'Banking Desk',
    imageAlt: 'Wooden letter tiles arranged to spell the word CREDIT on a rustic timber surface',
    content: [
      p('A credit score is a number that summarises how reliably you have handled borrowed money. Lenders use it to judge the risk of lending to you, and it can affect whether you are approved and the interest rate you are offered.'),
      h2('What Affects Your Score'),
      p('Exact formulas differ between credit bureaus and countries, but most models weigh similar factors:'),
      ul(
        'Payment history: paying on time is usually the single biggest factor.',
        'Credit utilisation: how much of your available credit you are using.',
        'Length of credit history: older, well-managed accounts help.',
        'Credit mix: a combination of different credit types.',
        'New credit: many applications in a short time can lower your score.',
      ),
      callout('Utilisation example', 'If your total credit limit is 100,000 and you owe 60,000, your utilisation is 60%. Many lenders view utilisation below about 30% more favourably.'),
      h2('Why It Matters'),
      p('A stronger score can mean easier approvals and lower interest rates on loans and credit cards. Over the life of a home or car loan, a lower rate can save a substantial amount of money.'),
      h2('Habits That Build Good Credit'),
      ol(
        'Pay every bill on time — set up automatic minimum payments as a safety net.',
        'Keep balances low relative to your limits.',
        'Avoid opening many new accounts at once.',
        'Check your credit report regularly and dispute any errors.',
      ),
      h3('How Long Does It Take?'),
      p('Credit improves gradually. Negative events fade in impact over time, and consistent positive behaviour is what steadily lifts a score.'),
    ],
  },
  {
    id: 7,
    slug: 'how-to-create-a-monthly-budget',
    title: 'How to Create a Monthly Budget',
    category: 'Personal Finance',
    section: 'finance',
    excerpt:
      'A budget is simply a plan for your money. Follow these steps to build one that is realistic, flexible and easy to maintain.',
    isoDate: '2026-09-21',
    author: 'Finance Desk',
    imageAlt: 'A hand writing figures in a notebook beside a calculator and a stack of fifty-dollar notes',
    content: [
      p('A budget is a plan that tells your money where to go before the month begins. It is not about restriction — it is about making sure your spending reflects your priorities and that you are making progress towards your goals.'),
      h2('Step 1: Know Your Income'),
      p('Start with your take-home pay after taxes and deductions. If your income varies, base your budget on a conservative estimate, such as your lowest month in the past year.'),
      h2('Step 2: List Your Expenses'),
      ul(
        'Fixed costs: rent, loan repayments, insurance, subscriptions.',
        'Variable essentials: groceries, utilities, transport.',
        'Discretionary spending: dining out, entertainment, shopping.',
        'Savings and debt repayment goals.',
      ),
      h2('Step 3: Choose a Method'),
      h3('The 50/30/20 approach'),
      p('Allocate roughly 50% of take-home pay to needs, 30% to wants and 20% to savings and extra debt repayment. It is a simple starting framework you can adjust.'),
      h3('Zero-based budgeting'),
      p('Every unit of income is assigned a job — spending, saving or repayment — until the remainder is zero. It takes more effort but gives precise control.'),
      callout('Example', 'With a take-home income of 60,000, the 50/30/20 approach suggests about 30,000 for needs, 18,000 for wants and 12,000 for savings and debt repayment.'),
      h2('Step 4: Track and Adjust'),
      ol(
        'Record spending weekly using an app, spreadsheet or notebook.',
        'Compare actual spending with your plan at month-end.',
        'Adjust categories that were unrealistic rather than abandoning the budget.',
        'Include a small buffer for irregular costs.',
      ),
      p('The best budget is one you will actually follow. Start simple, review regularly and refine it as your life changes.'),
    ],
  },
  {
    id: 8,
    slug: 'stock-market-basics-for-beginners',
    title: 'Stock Market Basics for Beginners',
    category: 'Stock Market',
    section: 'investing',
    excerpt:
      'What actually happens when you buy a share? A clear introduction to exchanges, indices, prices and the risks involved.',
    isoDate: '2026-09-18',
    author: 'Markets Team',
    imageAlt: 'Green and red candlestick bars on a dark trading screen, photographed at an angle',
    content: [
      p('The stock market is a network of exchanges where shares of public companies are bought and sold. When you buy a share, you own a small piece of that company and participate in its potential growth — and its risks.'),
      h2('How Share Prices Move'),
      p('Prices change based on supply and demand. Company earnings, economic data, interest rates and investor sentiment all influence how much buyers are willing to pay. In the short term prices can be very volatile; over longer periods they tend to reflect business performance more closely.'),
      h2('Key Terms'),
      ul(
        'Exchange: the marketplace where shares trade.',
        'Index: a basket of shares that tracks a segment of the market.',
        'Dividend: a portion of company profits paid to shareholders.',
        'Market capitalisation: share price multiplied by the number of shares.',
        'Bull and bear markets: periods of sustained rising or falling prices.',
      ),
      h2('Ways to Invest in Stocks'),
      h3('Individual shares'),
      p('Buying specific companies gives you control but requires research and concentrates risk in fewer holdings.'),
      h3('Index funds and ETFs'),
      p('These hold many companies at once, offering broad diversification at relatively low cost.'),
      callout('Important', 'Stocks can lose value, and past performance does not guarantee future results. Money you may need within the next few years is generally better kept in lower-risk options.'),
      h2('Common Beginner Mistakes'),
      ol(
        'Trying to time the market based on headlines.',
        'Putting too much money into a single company.',
        'Ignoring fees and taxes.',
        'Selling in panic during temporary downturns.',
      ),
    ],
  },
  {
    id: 9,
    slug: 'how-inflation-affects-your-money',
    title: 'How Inflation Affects Your Money',
    category: 'Economy',
    section: 'business',
    excerpt:
      'Inflation quietly reduces what your money can buy. Understand how it works and how it affects savings, debt and investments.',
    isoDate: '2026-09-15',
    author: 'Economy Desk',
    imageAlt: 'A woman with a shopping trolley reaching up for a shelf of groceries in a supermarket aisle',
    content: [
      p('Inflation is the general rise in prices over time. As prices increase, each unit of currency buys a little less than before. Moderate inflation is normal in a growing economy, but it has real consequences for how you save and plan.'),
      h2('What Causes Inflation?'),
      ul(
        'Demand-pull: demand for goods and services outpaces supply.',
        'Cost-push: rising production costs, such as energy or wages, are passed on to consumers.',
        'Monetary factors: rapid growth in the money supply can push prices higher.',
      ),
      h2('Real vs. Nominal Returns'),
      p('A nominal return is the headline figure. A real return subtracts inflation. If your savings earn 4% while inflation is 5%, your purchasing power is actually shrinking by about 1% a year.'),
      callout('Example', 'At 6% annual inflation, something that costs 1,000 today would cost about 1,790 in ten years. Cash kept idle for that decade would buy noticeably less.'),
      h2('Who Is Affected Most'),
      p('Inflation tends to hurt people holding large cash balances or living on fixed incomes. Borrowers with fixed-rate loans may benefit somewhat, because they repay with money that is worth less in real terms.'),
      h2('How People Commonly Respond'),
      ol(
        'Keep emergency funds in accounts that pay competitive interest.',
        'Invest long-term money in assets that have historically outpaced inflation, accepting their risks.',
        'Review budgets regularly as everyday costs change.',
        'Factor inflation into long-term goals such as retirement or education.',
      ),
      h3('The Role of Central Banks'),
      p('Central banks typically raise interest rates to cool inflation and lower them to support growth. These decisions ripple through loan rates, savings rates and markets.'),
    ],
  },
  {
    id: 10,
    slug: 'financial-planning-for-young-adults',
    title: 'Financial Planning for Young Adults',
    category: 'Financial Planning',
    section: 'finance',
    excerpt:
      'The habits you form in your twenties shape decades of financial outcomes. A practical roadmap for getting the fundamentals right.',
    isoDate: '2026-09-12',
    author: 'Finance Desk',
    imageAlt: 'A couple at a kitchen table with a calculator, paperwork and a laptop, reviewing household finances together',
    content: [
      p('Your early working years are a powerful time to build financial habits. You may not earn the most yet, but you have the greatest asset of all for compounding: time.'),
      h2('Start With the Foundations'),
      ol(
        'Understand your take-home income and create a simple budget.',
        'Build a starter emergency fund.',
        'Pay off high-interest debt as a priority.',
        'Get adequate insurance coverage, such as health insurance.',
      ),
      h2('Set Clear Goals'),
      p('Divide goals into short term (under two years), medium term (two to seven years) and long term (retirement and beyond). Each time frame typically suits a different approach to saving and investing.'),
      h2('Begin Investing Early'),
      p('Even small, regular investments made in your twenties can grow significantly by retirement. Starting five or ten years earlier often matters more than investing larger amounts later.'),
      callout('Perspective', 'Lifestyle inflation — spending more every time income rises — is one of the most common reasons people struggle to save. Saving a portion of every pay rise keeps progress steady.'),
      h2('Build Credit Responsibly'),
      p('A good credit history makes future borrowing, such as a home loan, easier and cheaper. Use credit lightly, pay balances in full where possible and never miss due dates.'),
      h2('Keep Learning'),
      ul(
        'Read about personal finance from reputable, unbiased sources.',
        'Understand any product fully before you commit money.',
        'Review your plan at least once a year or after major life events.',
      ),
    ],
  },
  {
    id: 11,
    slug: 'how-to-use-credit-cards-responsibly',
    title: 'How to Use Credit Cards Responsibly',
    category: 'Credit Cards',
    section: 'banking',
    excerpt:
      'Used well, a credit card offers convenience and protection. Used carelessly, it becomes expensive debt. Here is how to stay on the right side.',
    isoDate: '2026-09-09',
    author: 'Banking Desk',
    imageAlt: 'A customer tapping a contactless bank card against a card terminal at a shop counter',
    content: [
      p('A credit card lets you borrow up to a set limit and repay later. If you pay the full statement balance by the due date, many cards charge no interest at all. Problems usually begin when balances are carried from month to month.'),
      h2('How Credit Card Interest Works'),
      p('If you pay less than the full statement balance, interest is typically charged on the remaining amount, often at a high annual rate. Paying only the minimum can keep you in debt for years.'),
      callout('Example', 'A balance of 50,000 at an annual interest rate of 36% accrues roughly 1,500 in interest in a single month if left unpaid — before any new purchases.'),
      h2('Good Habits'),
      ol(
        'Pay the full statement balance every month whenever possible.',
        'Set up automatic payments to avoid late fees.',
        'Keep utilisation low compared to your limit.',
        'Review statements for errors or unauthorised charges.',
      ),
      h2('Features Worth Understanding'),
      ul(
        'Grace period: the interest-free time between purchase and due date.',
        'Annual fee: weigh it against the benefits you actually use.',
        'Rewards: cash back or points are only valuable if you are not paying interest.',
        'Cash advances: usually carry fees and immediate interest — best avoided.',
      ),
      h2('If You Already Have Card Debt'),
      p('List balances and interest rates, stop adding new charges, and focus extra payments on the highest-rate balance first while paying minimums on the rest. Contacting your card issuer about hardship options can also help.'),
    ],
  },
  {
    id: 12,
    slug: 'understanding-loans-and-interest-rates',
    title: 'Understanding Loans and Interest Rates',
    category: 'Loans',
    section: 'banking',
    excerpt:
      'Before you borrow, understand how interest rates, tenure and EMIs determine the true cost of a loan.',
    isoDate: '2026-09-06',
    author: 'Banking Desk',
    imageAlt: 'A calculator and a house-shaped key fob resting on a spread of mortgage brochures',
    content: [
      p('A loan lets you spread the cost of a large expense over time, but you pay for that convenience through interest. Understanding how loans are priced helps you compare offers and borrow only what you can comfortably repay.'),
      h2('Key Loan Terms'),
      ul(
        'Principal: the amount you borrow.',
        'Interest rate: the yearly cost of borrowing, expressed as a percentage.',
        'Tenure: how long you have to repay.',
        'Instalment (EMI): the fixed periodic payment covering principal and interest.',
        'Processing fees and prepayment charges: extra costs that affect the total price.',
      ),
      h2('Fixed vs. Floating Rates'),
      p('A fixed rate stays the same for an agreed period, which makes payments predictable. A floating rate moves with a benchmark rate, so payments can rise or fall over time.'),
      h2('Why Tenure Matters'),
      p('A longer tenure lowers each instalment but increases the total interest you pay. A shorter tenure means higher instalments but a lower overall cost.'),
      callout('Comparison', 'Borrowing 500,000 at 10% interest costs roughly 137,000 in total interest over five years, but around 293,000 over ten years — even though the ten-year instalment is smaller.'),
      h2('Secured and Unsecured Loans'),
      p('Secured loans, such as home or vehicle loans, are backed by an asset and usually carry lower rates. Unsecured loans, such as personal loans, rely on your creditworthiness and tend to be more expensive.'),
      h2('Before You Sign'),
      ol(
        'Compare the total cost, not just the headline rate.',
        'Check all fees and prepayment rules.',
        'Make sure the instalment fits comfortably within your budget.',
        'Read the loan agreement carefully and ask questions about anything unclear.',
      ),
    ],
  },
  {
    id: 13,
    slug: 'tax-basics-everyone-should-know',
    title: 'Tax Basics Everyone Should Know',
    category: 'Tax & Finance Basics',
    section: 'finance',
    excerpt:
      'Taxes affect every paycheck and investment. These core concepts make tax season less confusing, wherever you live.',
    isoDate: '2026-09-03',
    author: 'Finance Desk',
    imageAlt: 'An overhead view of a hand completing a printed income tax return form with a pen, a small calculator and a TAX label card beside it',
    content: [
      p('Tax rules vary by country and change frequently, but several concepts apply almost everywhere. Understanding them helps you read your payslip, keep better records and have more productive conversations with a tax professional.'),
      h2('Gross vs. Taxable Income'),
      p('Gross income is everything you earn. Taxable income is what remains after allowable deductions and exemptions. Your tax is calculated on taxable income, not gross income.'),
      h2('How Tax Brackets Work'),
      p('Many systems use progressive brackets, where higher portions of income are taxed at higher rates. Moving into a higher bracket only affects the income above that threshold — not your entire income.'),
      callout('Marginal vs. effective rate', 'Your marginal rate is the rate on your last unit of income. Your effective rate is your total tax divided by your total income, which is usually much lower.'),
      h2('Deductions and Credits'),
      ul(
        'Deductions reduce your taxable income.',
        'Credits reduce the tax you owe directly, which is often more valuable.',
        'Eligibility depends on local rules and your circumstances.',
      ),
      h2('Taxes on Investments'),
      p('Interest, dividends and capital gains may be taxed differently from salary, and holding periods can change the rate. Knowing this helps you understand the after-tax return of an investment.'),
      h2('Good Record-Keeping Habits'),
      ol(
        'Keep payslips, investment statements and receipts in one place.',
        'Note important filing deadlines in your calendar.',
        'Review your tax position before the financial year ends, not after.',
        'Consult a qualified tax professional for situations specific to you.',
      ),
    ],
  },
  {
    id: 14,
    slug: 'how-small-businesses-manage-cash-flow',
    title: 'How Small Businesses Manage Cash Flow',
    category: 'Business',
    section: 'business',
    excerpt:
      'Profitable businesses can still fail if cash runs short. Learn the fundamentals of tracking, forecasting and protecting cash flow.',
    isoDate: '2026-08-31',
    author: 'Economy Desk',
    imageAlt: 'A cafe owner handing change to a customer across the counter, a menu board on the wall behind',
    content: [
      p('Cash flow is the movement of money into and out of a business. A company can be profitable on paper and still struggle if customers pay late while bills are due now. Managing cash flow is one of the most important skills for any business owner.'),
      h2('Profit Is Not the Same as Cash'),
      p('Profit measures income minus expenses over a period. Cash flow measures when money actually arrives and leaves. A large sale on 60-day payment terms adds to profit immediately, but the cash does not arrive for two months.'),
      h2('The Three Types of Cash Flow'),
      ul(
        'Operating: cash from day-to-day sales and expenses.',
        'Investing: buying or selling equipment and other long-term assets.',
        'Financing: loans, repayments and owner investment.',
      ),
      h2('Practical Cash Flow Habits'),
      ol(
        'Forecast cash weekly or monthly for the next few months.',
        'Invoice promptly and follow up on overdue payments.',
        'Negotiate supplier terms that match customer payment cycles.',
        'Keep a cash reserve for slow months and unexpected costs.',
        'Separate business and personal finances completely.',
      ),
      callout('Warning sign', 'Regularly relying on short-term credit to cover routine expenses is often a sign that cash flow needs attention, even if sales are growing.'),
      h2('Tools That Help'),
      p('Accounting software, simple cash flow spreadsheets and regular reviews with an accountant make it easier to spot problems early and plan for growth with confidence.'),
    ],
  },
];

const wordCount = (blocks) =>
  blocks
    .flatMap((block) => (block.items ? block.items : [block.title, block.text]))
    .filter(Boolean)
    .join(' ')
    .split(/\s+/).length;

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

/**
 * Article photographs live in public/images/photos/ and are served from our own
 * origin — the site makes no third-party image request. They were fetched once by
 * scripts/fetch-photos.ps1 and are used under the Pexels Licence (free for
 * commercial use, no attribution required). Copyright stays with each
 * photographer, so the Terms page never describes photographs as our own work.
 *
 * imageAlt below describes what each photograph actually shows.
 */
const IMAGES = {
  'how-to-build-an-emergency-fund': '/images/photos/how-to-build-an-emergency-fund.jpg',
  'beginners-guide-to-investing': '/images/photos/beginners-guide-to-investing.jpg',
  'how-compound-interest-works': '/images/photos/how-compound-interest-works.jpg',
  'smart-ways-to-save-money': '/images/photos/smart-ways-to-save-money.jpg',
  'understanding-mutual-funds': '/images/photos/understanding-mutual-funds.jpg',
  'what-is-a-credit-score': '/images/photos/what-is-a-credit-score.jpg',
  'how-to-create-a-monthly-budget': '/images/photos/how-to-create-a-monthly-budget.jpg',
  'stock-market-basics-for-beginners': '/images/photos/stock-market-basics-for-beginners.jpg',
  'how-inflation-affects-your-money': '/images/photos/how-inflation-affects-your-money.jpg',
  'financial-planning-for-young-adults': '/images/photos/financial-planning-for-young-adults.jpg',
  'how-to-use-credit-cards-responsibly': '/images/photos/how-to-use-credit-cards-responsibly.jpg',
  'understanding-loans-and-interest-rates': '/images/photos/understanding-loans-and-interest-rates.jpg',
  'tax-basics-everyone-should-know': '/images/photos/tax-basics-everyone-should-know.jpg',
  'how-small-businesses-manage-cash-flow': '/images/photos/how-small-businesses-manage-cash-flow.jpg',
};

/** Final article objects: derived fields (image paths, date, read time) are computed once. */
export const BLOGS = RAW_BLOGS.map((blog) => ({
  ...blog,
  image: IMAGES[blog.slug],
  ogImage: `/images/og/${blog.slug}.png`, // our own illustration, used for social previews only
  date: formatDate(blog.isoDate),
  readTime: Math.max(1, Math.round(wordCount(blog.content) / 160)),
})).sort((a, b) => b.isoDate.localeCompare(a.isoDate));

export const getBlogBySlug = (slug) => BLOGS.find((blog) => blog.slug === slug);

export const getBlogsBySection = (section) => BLOGS.filter((blog) => blog.section === section);

export const getFeaturedBlog = () => BLOGS.find((blog) => blog.featured) ?? BLOGS[0];

/** Same-section articles first, then the most recent others. */
export const getRelatedBlogs = (blog, limit = 3) => {
  const others = BLOGS.filter((item) => item.id !== blog.id);
  const sameSection = others.filter((item) => item.section === blog.section);
  const rest = others.filter((item) => item.section !== blog.section);
  return [...sameSection, ...rest].slice(0, limit);
};
