import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { NAV_LINKS, SITE } from '../../config/site';
import useTheme from '../../hooks/useTheme';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  // Hide the header while scrolling down; slide it back in on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      // Ignore tiny scrolls so the header does not flicker.
      if (Math.abs(delta) < 6) return;
      setHidden(delta > 0 && y > 90);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape and when resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 960px)');
    const onChange = (event) => event.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  // Logo click: already home → glide back to the top; elsewhere → normal navigation.
  const onLogoClick = (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (pathname !== '/') return;
    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <header className={`header ${menuOpen ? 'header--open' : ''} ${hidden && !menuOpen ? 'header--hidden' : ''}`}>
      <Container className="header__inner">
        <Link to="/" className="header__logo" aria-label={`${SITE.name} home`} onClick={onLogoClick}>
          <Logo className="header__mark" />
          <span className="header__name">
            Finzoria<span>Finance</span>
          </span>
        </Link>

        <nav id="primary-nav" className="header__nav" aria-label="Primary">
          <ul className="header__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__controls">
          <button
            type="button"
            className="header__theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>

          <button
            type="button"
            className="header__toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </Container>
    </header>
  );
}
