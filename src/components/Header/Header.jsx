import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const NAV_LINKS = [
  { to: '/',         label: 'Accueil',  end: true },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/marques',  label: 'Marques' },
  { to: '/services', label: 'Services' },
  { to: '/contact',  label: 'Contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header className={`tcm-header${scrolled ? ' tcm-header--scrolled' : ''}`}>
        <div className="tcm-header__inner">

          {/* Logo */}
          <Link to="/" className="tcm-header__logo" aria-label="Teracar Motors — Accueil">
            <div className="tcm-header__logo-mark">TM</div>
            <div className="tcm-header__logo-text">
              <span className="tcm-header__logo-name">TERACAR MOTORS</span>
              <span className="tcm-header__logo-tagline">L'automobile à votre image</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="tcm-header__nav" aria-label="Navigation principale">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `tcm-header__link${isActive ? ' tcm-header__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Theme toggle */}
          <button
            className="tcm-header__theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Phone CTA */}
          <a href="tel:0770770770" className="tcm-header__phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#d21f28" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .5 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.5 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"/>
            </svg>
            07 70 77 07 70
          </a>

          {/* Hamburger */}
          <button
            className={`tcm-header__burger${menuOpen ? ' tcm-header__burger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`tcm-mobile-overlay${menuOpen ? ' tcm-mobile-overlay--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="tcm-mobile-overlay__nav" aria-label="Menu mobile">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `tcm-mobile-overlay__link${isActive ? ' tcm-mobile-overlay__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <a href="tel:0770770770" className="tcm-mobile-overlay__phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .5 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.5 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"/>
            </svg>
            07 70 77 07 70
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;
