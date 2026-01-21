import React, { useState } from 'react';
import './carCard.css';

const CarCard = ({ car }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="car-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec overlay au survol */}
      <div className="car-card__image">
        <img src={car.image} alt={car.name} />
        <div className={`image__overlay ${isHovered ? 'image__overlay--visible' : ''}`}>
          <div className="overlay__content">
            <button className="overlay__btn overlay__btn--view">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Voir Détails
            </button>
            <button className="overlay__btn overlay__btn--compare">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Comparer
            </button>
          </div>
        </div>
        
        {/* Badges */}
        <div className="car-card__badges">
          {car.isFeatured && <span className="badge badge--featured">⭐ Featured</span>}
          {car.discount > 0 && <span className="badge badge--discount">-{car.discount}%</span>}
        </div>
      </div>

      {/* Contenu */}
      <div className="car-card__content">
        <div className="car-card__header">
          <h3 className="car-card__title">{car.title || car.name}</h3>
          {/* Le prix est disponible dans l'objet car, mais n'est pas affiché. Utilisé uniquement pour le filtrage. */}
        </div>

        <div className="car-card__specs">
          <div className="spec__item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="5" width="20" height="15" rx="2"/>
              <path d="M2 10h20"/>
            </svg>
            <span>{car.year}</span>
          </div>
          <div className="spec__item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{car.mileage} km</span>
          </div>
          <div className="spec__item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14z"/>
            </svg>
            <span>{car.fuelType}</span>
          </div>
          <div className="spec__item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            <span>{car.transmission}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="car-card__footer">
          <button className="btn btn--primary btn--full">Détails du Véhicule</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;