import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css';

const NAV_ITEMS = [
  {
    to: '/admin',
    label: 'Tableau de bord',
    end: true,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    to: '/admin/vehicles',
    label: 'Véhicules',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/><circle cx="9" cy="21" r="2"/><circle cx="19" cy="21" r="2"/></svg>,
  },
  {
    to: '/admin/brands',
    label: 'Marques',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    to: '/admin/leads',
    label: 'Leads & RDV',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    to: '/admin/settings',
    label: 'Paramètres',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  },
  {
    to: '/admin/users',
    label: 'Utilisateurs',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="tcm-admin">
      {/* Sidebar */}
      <aside className={`tcm-admin__sidebar${sidebarOpen ? ' tcm-admin__sidebar--open' : ''}`}>
        <div className="tcm-admin__sidebar-logo">
          <div className="tcm-admin__logo-mark">TM</div>
          <div>
            <div className="tcm-admin__logo-name">TERACAR</div>
            <div className="tcm-admin__logo-role">Administration</div>
          </div>
        </div>

        <nav className="tcm-admin__nav">
          {NAV_ITEMS.map(({ to, label, end, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `tcm-admin__nav-item${isActive ? ' tcm-admin__nav-item--active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="tcm-admin__nav-icon">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/" className="tcm-admin__sidebar-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 5L8 12L15 19"/>
          </svg>
          Site public
        </NavLink>
      </aside>

      {/* Main content */}
      <div className="tcm-admin__main">
        {/* Mobile topbar */}
        <div className="tcm-admin__topbar">
          <button
            className="tcm-admin__burger"
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Menu admin"
          >
            <span /><span /><span />
          </button>
          <span className="tcm-admin__topbar-title">Administration</span>
        </div>

        <div className="tcm-admin__content">
          <Outlet />
        </div>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="tcm-admin__overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default AdminLayout;
