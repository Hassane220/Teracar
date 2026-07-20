import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cars as allCars } from '../../data/cars';
import './CarDetails.css';

const STATUS_CONFIG = {
  'Disponible': { color: 'var(--status-available)', label: 'Disponible' },
  'Réservé':    { color: 'var(--status-reserved)',  label: 'Réservé' },
  'Vendu':      { color: 'var(--status-sold)',       label: 'Vendu' },
};

const SPECS_MAP = [
  { key: 'fuel',         label: 'Carburant' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'color',        label: 'Couleur' },
  { key: 'year',         label: 'Année' },
  { key: 'mileage',      label: 'Kilométrage', format: v => `${v.toLocaleString('fr-FR')} km` },
];

const CarDetails = ({ car, onClose, showPrices = false }) => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(0);

  if (!car) return null;

  const status = STATUS_CONFIG[car.status] || STATUS_CONFIG['Disponible'];
  const images = car.images && car.images.length > 0 ? car.images : [car.image];

  // Similar vehicles: same category, exclude current
  const similar = allCars
    .filter(c => c.id !== car.id && c.category === car.category)
    .slice(0, 3);

  const waText = encodeURIComponent(
    `Bonjour, je suis intéressé par le ${car.title}`
  );
  const waLink = `https://wa.me/2250770770770?text=${waText}`;

  return (
    <article className="tcm-details">

      {/* Breadcrumb */}
      <nav className="tcm-details__breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <span>/</span>
        <Link to="/catalogue">Catalogue</Link>
        <span>/</span>
        <span>{car.title}</span>
      </nav>

      <div className="tcm-details__layout">

        {/* ---- Gallery + Description ---- */}
        <div className="tcm-details__gallery-col">
          {/* Main image */}
          <div className="tcm-details__main-img">
            <span
              className="tcm-details__status-badge"
              style={{ background: car.mileage === 0 ? 'var(--accent)' : 'rgba(26,26,26,0.9)' }}
            >
              {car.mileage === 0 ? 'NEUF' : 'OCCASION'}
            </span>
            <img
              src={images[selectedImg]}
              alt={`${car.brand} ${car.model}`}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="tcm-details__thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`tcm-details__thumb${selectedImg === i ? ' tcm-details__thumb--active' : ''}`}
                  onClick={() => setSelectedImg(i)}
                  aria-label={`Image ${i + 1}`}
                >
                  <img src={img} alt={`Vue ${i + 1}`} />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          {car.description && (
            <div className="tcm-details__description">
              <div className="tcm-details__desc-title">Description</div>
              <p>{car.description}</p>

              {/* Specs grid */}
              <div className="tcm-details__specs-grid">
                {SPECS_MAP.map(({ key, label, format }) => {
                  const val = car[key];
                  if (val == null || val === '') return null;
                  return (
                    <div key={key} className="tcm-details__spec-item">
                      <span className="tcm-details__spec-label">{label}</span>
                      <span className="tcm-details__spec-value">
                        {format ? format(val) : val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ---- Side Panel ---- */}
        <div className="tcm-details__side">
          <div className="tcm-details__side-meta">
            {car.brand} · {car.category} · {car.year}
          </div>
          <h1 className="tcm-details__side-title">{car.title}</h1>

          <div className="tcm-details__price" style={{ color: status.color }}>
            {showPrices && car.price
              ? `${(car.price / 1000000).toFixed(0)} 000 000 FCFA`
              : 'Prix sur demande'
            }
          </div>
          <p className="tcm-details__price-note">
            Contactez-nous pour connaître le tarif et les options de financement
          </p>

          {/* Status */}
          <div className="tcm-details__status-row" style={{ color: status.color }}>
            <span className="tcm-details__status-dot" style={{ background: status.color }} />
            {status.label}
          </div>

          {/* CTAs */}
          <div className="tcm-details__ctas">
            <Link to="/contact" className="tcm-details__cta tcm-details__cta--rdv">
              Prendre rendez-vous
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="tcm-details__cta tcm-details__cta--wa">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 11.5a8.4 8.4 0 01-12.2 7.4L3 20l1.1-5.6A8.4 8.4 0 1121 11.5z"/>
              </svg>
              Discuter sur WhatsApp
            </a>
            <a href="tel:0770770770" className="tcm-details__cta tcm-details__cta--call">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .5 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.5 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"/>
              </svg>
              Appeler le concessionnaire
            </a>
          </div>

          {/* Features / Included */}
          {car.features && car.features.length > 0 && (
            <div className="tcm-details__included">
              <div className="tcm-details__included-title">Ce qui est inclus</div>
              <div className="tcm-details__included-list">
                {car.features.map((f, i) => (
                  <div key={i} className="tcm-details__included-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--status-available)" strokeWidth="2.4" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agency info */}
          <div className="tcm-details__agency">
            <div className="tcm-details__included-title">Agence</div>
            <div className="tcm-details__agency-info">
              Immeuble Le Walebo<br />
              Cocody Bonoumin, Abidjan<br />
              07 70 77 07 70
            </div>
          </div>
        </div>
      </div>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <div className="tcm-details__similar">
          <h2 className="tcm-details__similar-title">Véhicules similaires</h2>
          <div className="tcm-details__similar-grid">
            {similar.map(c => (
              <Link key={c.id} to={`/cars/${c.id}`} className="tcm-details__similar-card">
                <div className="tcm-details__similar-img">
                  <img src={c.image} alt={c.title} loading="lazy" />
                </div>
                <div className="tcm-details__similar-info">
                  <div className="tcm-details__similar-name">{c.title}</div>
                  <div className="tcm-details__similar-price">Prix sur demande</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default CarDetails;
