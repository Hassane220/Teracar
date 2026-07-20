import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';

const STATUS_CONFIG = {
  'Disponible': { color: 'var(--status-available)', label: 'Disponible' },
  'Réservé':    { color: 'var(--status-reserved)',  label: 'Réservé' },
  'Vendu':      { color: 'var(--status-sold)',       label: 'Vendu' },
};

const CarCard = ({ car, showPrices = false }) => {
  const status = STATUS_CONFIG[car.status] || STATUS_CONFIG['Disponible'];
  const firstFeature = car.features?.[0];
  const fuelFeature  = car.features?.find(f => f.toLowerCase().includes('essence') || f.toLowerCase().includes('diesel') || f.toLowerCase().includes('hybride'));

  return (
    <Link to={`/cars/${car.id}`} className="tcm-card" aria-label={`Voir ${car.title}`}>
      {/* Image area */}
      <div className="tcm-card__img-wrap">
        <img
          src={car.image}
          alt={car.title}
          className="tcm-card__img"
          loading="lazy"
        />
        {/* Status badge */}
        {car.mileage === 0 && (
          <span className="tcm-card__badge">NEUF</span>
        )}
      </div>

      {/* Body */}
      <div className="tcm-card__body">
        <div className="tcm-card__meta">{car.brand} · {car.category}</div>
        <h3 className="tcm-card__title">{car.title}</h3>

        {/* Feature tags */}
        {car.features && car.features.length > 0 && (
          <div className="tcm-card__features">
            {car.features.slice(0, 3).map((f, i) => (
              <span key={i} className="tcm-card__feature">{f}</span>
            ))}
          </div>
        )}

        {/* Status indicator */}
        <div className="tcm-card__status" style={{ color: status.color }}>
          <span className="tcm-card__status-dot" style={{ background: status.color }} />
          {status.label}
        </div>

        {/* Footer */}
        <div className="tcm-card__footer">
          <span className="tcm-card__price" style={{ color: status.color }}>
            {showPrices && car.price
              ? `${(car.price / 1000000).toFixed(0)} M FCFA`
              : 'Prix sur demande'
            }
          </span>
          <span className="tcm-card__cta">Voir →</span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
