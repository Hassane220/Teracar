import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cars } from '../../data/cars';
import './CatalogueShowcase.css';

const CatalogueShowcase = () => {
  const navigate = useNavigate();
  return (
    <div className="catalogue-showcase">
      <h1 className="catalogue-title">Catalogue de véhicules</h1>
      <div className="catalogue-grid">
        {cars.map(car => (
          <div className="catalogue-card" key={car.id}>
            <div className="catalogue-image-box">
              <img src={car.image} alt={car.model} className="catalogue-image" />
            </div>
            <div className="catalogue-card-content">
              <h2>{car.brand} {car.model}</h2>
              <button className="catalogue-details-btn" onClick={() => navigate(`/cars/${car.id}`)}>
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogueShowcase;
