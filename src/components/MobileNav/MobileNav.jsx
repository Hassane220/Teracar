import React from 'react';
import { NavLink } from 'react-router-dom';
import './MobileNav.css';

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Accueil',
    end: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    to: '/catalogue',
    label: 'Catalogue',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    to: '/search',
    label: 'Recherche',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
      </svg>
    ),
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
];

const MobileNav = () => (
  <nav className="tcm-mobile-nav" aria-label="Navigation mobile">
    {NAV_ITEMS.map(({ to, label, end, icon }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        className={({ isActive }) =>
          `tcm-mobile-nav__item${isActive ? ' tcm-mobile-nav__item--active' : ''}`
        }
        aria-label={label}
      >
        <span className="tcm-mobile-nav__icon">{icon}</span>
        <span className="tcm-mobile-nav__label">{label}</span>
      </NavLink>
    ))}
  </nav>
);

export default MobileNav;
