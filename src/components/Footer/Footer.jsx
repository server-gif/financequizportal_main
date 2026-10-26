import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { SITE } from '../../config/site';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <Logo className="footer__logo-mark" />
              <span className="footer__logo-name">
                Finance<span>QuizPortal</span>
              </span>
            </Link>
            <p>{SITE.description}</p>
          </div>

          <nav aria-label="Topics">
            <h2 className="footer__heading">Topics</h2>
            <ul className="footer__list">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="footer__heading">FinanceQuizPortal</h2>
            <ul className="footer__list">
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/blog">All articles</Link></li>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            ©{year} financequizportal.com · Articles and original illustrations are {SITE.name} work.
          </p>
        </div>
      </Container>
    </footer>
  );
}
