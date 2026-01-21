import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CatalogueShowcase.css';
import { cars } from '../../data/cars';

// Récupère toutes les marques distinctes
const brands = Array.from(new Set(cars.map(car => car.brand)));

const getFirstImageByBrand = (brand) => {
  const car = cars.find(car => car.brand === brand && car.images && car.images.length > 0);
  return car ? car.images[0] : '';
};

const getSeriesByBrand = (brand) => {
  return Array.from(new Set(cars.filter(car => car.brand === brand).map(car => car.model)));
};

const getFirstImageBySeries = (brand, model) => {
  const car = cars.find(car => car.brand === brand && car.model === model && car.images && car.images.length > 0);
  return car ? car.images[0] : '';
};

const CatalogueShowcase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Ouvre automatiquement la grille des séries si brand est passé dans le state
  useEffect(() => {
    if (location.state && location.state.brand) {
      setSelectedBrand(location.state.brand);
    }
  }, [location.state]);

  if (selectedBrand) {
    const series = getSeriesByBrand(selectedBrand);
    // Trouver l'id de la première voiture de la série pour la redirection
    const getFirstCarIdBySeries = (brand, model) => {
      const car = cars.find(car => car.brand === brand && car.model === model);
      return car ? car.id : null;
    };
    return (
      <div className="catalogue-showcase-container">
        <button className="catalogue-back-btn" style={{marginTop: '3rem'}} onClick={() => setSelectedBrand(null)}>&larr; Retour au catalogue</button>
        <h2 className="catalogue-showcase-title">Séries {selectedBrand}</h2>
        <div className="catalogue-showcase-grid">
          {series.map(model => {
            const carId = getFirstCarIdBySeries(selectedBrand, model);
            return (
              <div
                className="catalogue-showcase-card"
                key={model}
                onClick={() => carId && navigate(`/cars/${carId}`, { state: { brand: selectedBrand, model } })}
                style={{ cursor: carId ? 'pointer' : 'default' }}
              >
                <div className="catalogue-showcase-image-wrapper">
                  <img src={getFirstImageBySeries(selectedBrand, model)} alt={model} className="catalogue-showcase-image" />
                  <div className="catalogue-showcase-overlay">
                    <span className="catalogue-showcase-brand">{model}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="catalogue-showcase-container">
      <div className="catalogue-showcase-header-row">
        <button className="catalogue-back-btn" onClick={() => navigate('/', { replace: true })}>&larr; Retour</button>
        <h2 className="catalogue-showcase-title" style={{flex:1, marginBottom:'40px'}}>Catalogue par marque</h2>
      </div>
      <div className="catalogue-showcase-grid">
        {brands.map(brand => (
          <div className="catalogue-showcase-card" key={brand} onClick={() => setSelectedBrand(brand)}>
            <div className="catalogue-showcase-image-wrapper">
              <img src={getFirstImageByBrand(brand)} alt={brand} className="catalogue-showcase-image" />
              <div className="catalogue-showcase-overlay">
                <span className="catalogue-showcase-brand">{brand}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogueShowcase;
