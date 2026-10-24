import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { SITE } from '../config/site';
import './Legal.css';

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description={`The terms that apply when you read and use ${SITE.name}.`}
        path="/terms"
      />

      <section className="legal page-section">
        <Container size="narrow">
          <span className="eyebrow">Legal</span>
          <h1 className="legal__title">Terms &amp; Conditions</h1>
          <p className="legal__updated">Last updated: October 2026</p>

          <div className="legal__body">
            <p>
              These terms govern your use of {SITE.name} (“we”, “us”, “the site”). By browsing the site you
              agree to them. If you do not agree, please do not use the site.
            </p>

            <h2 id="educational-use">Educational use only</h2>
            <p>
              All articles, guides and tools on the site are published for general information and education.
              Nothing on the site is financial, investment, tax or legal advice, an offer, a solicitation, or
              a recommendation to buy or sell any product. Nothing here is a promise or guarantee of any
              investment return or financial outcome. Financial products carry risk, rules vary by country and
              change over time, and past performance does not predict future results. Always consider your own
              circumstances and, where appropriate, consult a qualified professional before acting.
            </p>

            <h2 id="copyright">Copyright and content ownership</h2>
            <p>
              Every article, guide, headline, summary and original illustration published on {SITE.name} is
              work we created for this site and is owned by {SITE.name}. It is protected by copyright, and
              © {new Date().getFullYear()} {SITE.name}. No content may be republished, mirrored, translated for
              publication or reproduced in full on another website, in print, or on a social channel without
              our prior written permission.
            </p>

            <h2 id="third-party-material">Third-party material we do not own</h2>
            <p>
              Some article photographs are licensed from third-party stock libraries. Those images remain the
              copyright of their respective photographers and are <strong>not</strong> our work: they are not
              covered by the permission below, and re-uploading or reusing them elsewhere is not authorised by
              us. Company, product, exchange and institution names mentioned in articles remain trademarks of
              their owners — mentioning them is descriptive only and does not imply endorsement or affiliation.
            </p>

            <h2 id="permitted-use">What you are welcome to do</h2>
            <ul>
              <li>Read every article for free, and share or link to it from anywhere.</li>
              <li>
                Quote a brief passage — a few lines — in conversation, study notes, coursework or on social
                media, provided you credit {SITE.name} and link back to the original article.
              </li>
              <li>
                Use the ideas and general facts we explain as the basis for your own writing, in your own
                words.
              </li>
            </ul>

            <h2 id="not-permitted">What is not permitted</h2>
            <ul>
              <li>Republishing an entire article, or a substantial part of one, without written permission.</li>
              <li>
                Scraping, mirroring or bulk-copying the site, including feeding our content into AI training or
                automated content-generation systems.
              </li>
              <li>Passing our articles or illustrations off as someone else’s work.</li>
              <li>Redistributing the licensed photographs that appear on article pages.</li>
            </ul>
            <p>
              Need a guide reproduced, translated or adapted at scale? Ask us first through the contact below
              — we answer permission requests for genuine educational use.
            </p>

            <h2 id="no-warranty">No warranty</h2>
            <p>
              We work to keep content accurate and current, and we write it ourselves rather than rewriting
              material from other publishers. Even so, we make no promise that it is complete, up to date or
              error-free, and we are not liable for any loss or damage arising from its use. The site is
              provided “as is”, without warranties of any kind.
            </p>

            <h2 id="advertising">Advertising</h2>
            <p>
              The site displays advertising served by Google Ad Manager. Ads are clearly labelled, are kept
              separate from editorial content, and advertisers have no influence over what we publish. We
              are not responsible for ads, the products or services they promote, or any transactions you
              enter into with advertisers.
            </p>

            <h2 id="acceptable-use">Acceptable site use</h2>
            <ul>
              <li>You may not use the site in any way that damages, overloads or impairs it.</li>
              <li>You may not interfere with ad delivery, or probe the site for weaknesses without consent.</li>
            </ul>

            <h2 id="external-links">External links</h2>
            <p>
              Articles may link to third-party websites for reference. We do not control them, are not
              responsible for their content or practices, and linking does not mean we endorse them.
            </p>

            <h2 id="changes">Changes to these terms</h2>
            <p>
              We may update these terms as the site or the law changes. The “last updated” date above shows
              when the page last changed; continued use of the site means you accept the current version.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              Questions about these terms? Reach us through the details on our <a href="/about">About</a>{' '}
              page.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
