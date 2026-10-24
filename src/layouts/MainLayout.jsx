import { Outlet, useLocation } from 'react-router-dom';
import AdSlot from '../components/AdSlot/AdSlot';
import Container from '../components/Container/Container';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

/** Shared page frame: header, top ad, page content, footer. */
export default function MainLayout() {
  // Persistent layout ads request a fresh creative on every page view.
  const { pathname } = useLocation();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />

      <div className="ad-band">
        <Container>
          <AdSlot placement="top" refreshKey={pathname} />
        </Container>
      </div>

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
