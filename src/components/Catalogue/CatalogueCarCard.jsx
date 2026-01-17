import React from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogueImageSlider from './CatalogueImageSlider';

const CatalogueCarCard = ({ car }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/cars/${car.id}`);
  };
  return (
    <div className="catalogue-car-card" onClick={handleClick}>
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
