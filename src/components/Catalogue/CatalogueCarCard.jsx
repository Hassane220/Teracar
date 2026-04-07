import React from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogueImageSlider from './CatalogueImageSlider';

const CatalogueCarCard = ({ car, onClick }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      navigate(`/cars/${car.id}`);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  };
  return (
    <div
      className="catalogue-car-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Voir détails de ${car.title || car.name}`}
    >
      <div className="catalogue-car-card__slider">
        <CatalogueImageSlider images={car.images} />
      </div>
      <div className="catalogue-car-card__info">
        <h3>{car.title || car.name}</h3>
        <p>{car.brand}</p>
      </div>
    </div>
  );
};

export default CatalogueCarCard;
