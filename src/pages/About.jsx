import { Link } from 'react-router-dom';
import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { SITE } from '../config/site';
import './About.css';

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description={`${SITE.name} publishes clear, independent financial education for everyday readers.`}
        path="/about"
      />

      <section className="about page-section">
        <Container size="narrow">
          <span className="eyebrow">About</span>
          <h1 className="about__title">Financial education, without the jargon.</h1>
          <p className="about__lede">
            {SITE.name} helps readers understand money — how to budget, save, borrow and invest — through
            practical guides written in plain language.
          </p>

          <div className="about__body">
            <h2>What we cover</h2>
            <p>
              Our guides span personal finance, saving, investing, mutual funds, banking, credit, loans,
              taxes and the wider economy. Each article explains the core ideas, the trade-offs involved and
              the questions worth asking before you act.
            </p>

            <h2 id="editorial-standards">Editorial standards</h2>
            <ul>
              <li>
                Every article is written from scratch for this site. We do not copy, scrape or lightly rewrite
                material from other publishers.
              </li>
              <li>We explain concepts and options; we do not tell individual readers what to buy or sell.</li>
              <li>Examples use round, illustrative numbers and are not predictions of future returns.</li>
              <li>Numbers in our examples are worked calculations, not quoted research or official statistics.</li>
              <li>Advertising is clearly labelled and kept separate from editorial content.</li>
              <li>Articles are reviewed and updated when rules or common practices change.</li>
            </ul>

            <h2 id="disclaimer">Disclaimer</h2>
            <p>
              All content is for general educational purposes only and is not financial, investment, tax or
              legal advice. Financial products carry risk, and rules differ between countries. Please consider
              your own circumstances and consult a qualified professional before making decisions.
            </p>

            <h2 id="who-writes-here">Who writes here</h2>
            <p>
              Articles are published under desk names — Markets, Banking, Finance and Economy — rather than
              under invented individual bylines or claimed professional credentials. Guidance on reusing our
              content is in our{' '}
              <Link to="/terms#copyright">Terms &amp; Conditions</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
