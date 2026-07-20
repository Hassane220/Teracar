import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './BrandsPage.css';

import logoToyota   from '../assets/images/partners/Toyota.png';
import logoFord     from '../assets/images/partners/Ford.png';
import logoVW       from '../assets/images/partners/Volkswagen.png';
import logoHonda    from '../assets/images/partners/Honda.png';
import logoAudi     from '../assets/images/partners/Audi.png';
import logoBMW      from '../assets/images/partners/BMW.svg';
import logoMercedes from '../assets/images/partners/Mercedes.svg';

const LOGO_MAP = {
  Toyota:     logoToyota,
  Ford:       logoFord,
  Volkswagen: logoVW,
  Honda:      logoHonda,
  Audi:       logoAudi,
  BMW:        logoBMW,
  Mercedes:   logoMercedes,
};

export default function BrandsPage() {
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    api.getBrands().then(data => setBrandData([...data].sort((a, b) => a.brand.localeCompare(b.brand)))).catch(() => {});
  }, []);

  return (
    <main className="tcm-brands">
      <div className="tcm-brands__header">
        <nav className="tcm-brands__breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <span>Marques</span>
        </nav>
        <h1 className="tcm-brands__title">Toutes les marques</h1>
        <p className="tcm-brands__sub">
          Retrouvez l'ensemble de notre sélection triée par marque.
        </p>
      </div>

      <div className="tcm-brands__grid">
        {brandData.map(({ brand, count }) => (
          <Link
            key={brand}
            to={`/catalogue?brand=${encodeURIComponent(brand)}`}
            className="tcm-brands__card"
            aria-label={`${brand} — ${count} véhicule${count > 1 ? 's' : ''}`}
          >
            <div className="tcm-brands__card-logo">
              {LOGO_MAP[brand] ? (
                <img src={LOGO_MAP[brand]} alt={brand} loading="lazy" />
              ) : (
                <span className="tcm-brands__card-initial">{brand[0]}</span>
              )}
            </div>
            <div className="tcm-brands__card-info">
              <div className="tcm-brands__card-name">{brand}</div>
              <div className="tcm-brands__card-count">
                {count} modèle{count > 1 ? 's' : ''}
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" className="tcm-brands__card-arrow" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        ))}
      </div>
      <ScrollToTop />
    </main>
  );
}
