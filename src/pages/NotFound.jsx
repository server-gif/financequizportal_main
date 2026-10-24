import { Link } from 'react-router-dom';
import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="The page you were looking for could not be found." noindex />
      <section className="page-section">
        <Container size="narrow" style={{ textAlign: 'center', paddingBlock: '48px' }}>
          <span className="eyebrow">Error 404</span>
          <h1 style={{ margin: '10px 0 14px', fontSize: 'clamp(2rem, 1.5rem + 2vw, 2.75rem)' }}>
            We couldn’t find that page
          </h1>
          <p style={{ marginBottom: 28 }}>
            The article may have moved, or the link may be incorrect. Try one of our latest guides instead.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn--primary">Back to home</Link>
            <Link to="/blog" className="btn btn--ghost">Browse all articles</Link>
          </div>
        </Container>
      </section>
    </>
  );
}
