import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { SITE } from '../config/site';
import './Legal.css';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`How ${SITE.name} collects, uses and protects your information.`}
        path="/privacy"
      />

      <section className="legal page-section">
        <Container size="narrow">
          <span className="eyebrow">Legal</span>
          <h1 className="legal__title">Privacy Policy</h1>
          <p className="legal__updated">Last updated: October 2026</p>

          <div className="legal__body">
            <p>
              This policy explains how {SITE.name} (“we”, “us”, “the site”) handles information when you
              visit. Short version: we don’t ask you for personal accounts, we don’t sell data, and the only
              tracking comes from advertising and basic analytics providers.
            </p>

            <h2 id="information-we-collect">What is collected</h2>
            <ul>
              <li>
                <strong>Automatically:</strong> technical details like browser type, device, approximate
                region and pages visited, used to understand how the site performs.
              </li>
              <li>
                <strong>Through cookies:</strong> advertising and preference cookies set by us or by our
                ad partners (see the cookies section below).
              </li>
              <li>
                <strong>From you directly:</strong> we do not require registration and we do not ask you to
                submit name, email or payment details to read the site.
              </li>
            </ul>

            <h2 id="how-we-use-it">How we use it</h2>
            <p>
              Collected information is used only to operate and improve the site: keeping it secure,
              measuring which articles are read, and serving ads that pay for the free content. We do not
              sell your personal information, and we do not share it except with the service providers
              described here or when the law requires it.
            </p>

            <h2 id="advertising">Advertising and Google</h2>
            <p>
              The site displays ads served by Google Ad Manager. Google and its partners may use cookies to
              show ads based on your prior visits to this or other websites. Google’s use of advertising
              cookies enables it and its partners to serve ads to you. You can opt out of personalised
              advertising at Google’s Ads Settings (google.com/ads/settings) and via the aboutads.info
              choices page. Google’s own privacy practices are described at google.com/policies/privacy.
            </p>

            <h2 id="cookies">Cookies</h2>
            <p>
              Cookies are small files stored by your browser. We use them for ad delivery, frequency
              limiting (so you don’t see the same message repeatedly) and remembering preferences such as
              dark mode. You can delete or block cookies in your browser settings; the site still works,
              though some preferences will reset.
            </p>

            <h2 id="data-retention">How long we keep it</h2>
            <p>
              Aggregate analytics data is retained for as long as needed to improve the site. Cookie-based
              data follows the expiry periods set by the providers above. We do not maintain databases of
              reader identities.
            </p>

            <h2 id="children">Children’s privacy</h2>
            <p>
              The site is a general-audience financial education resource and is not directed at children.
              We do not knowingly collect personal information from anyone under 16.
            </p>

            <h2 id="changes">Changes to this policy</h2>
            <p>
              We may update this policy as the site or applicable law changes. The “last updated” date above
              shows when the page last changed; the current version always applies to continued use of the
              site.
            </p>

            <h2 id="contact">Contact</h2>
            <p>
              Questions about privacy? Reach us through the details on our <a href="/about">About</a> page.
            </p>

          
          </div>
        </Container>
      </section>
    </>
  );
}
