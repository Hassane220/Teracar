import React, { useState } from 'react';
import { cars } from '../../data/cars';
import CatalogueList from './CatalogueList';
import CatalogueCarCard from './CatalogueCarCard';
import CatalogueDetails from './CatalogueDetails';

// Récupère toutes les marques distinctes
const brands = Array.from(new Set(cars.map(car => car.brand)));

const getSeriesByBrand = (brand) => {
  return Array.from(new Set(cars.filter(car => car.brand === brand).map(car => car.model)));
};

const getCarsByBrandAndModel = (brand, model) => {
  return cars.filter(car => car.brand === brand && car.model === model);
};

const CatalogueModel = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  // Affichage des détails d'une voiture
  if (selectedCar) {
    return (
      <div className="catalogue-main-container">
        <button className="catalogue-back-btn" onClick={() => setSelectedCar(null)}>&larr; Retour</button>
        <CatalogueDetails car={selectedCar} />
      </div>
    );
  }

  // Affichage des modèles pour une marque
  if (selectedBrand && !selectedModel) {
    const series = getSeriesByBrand(selectedBrand);
    return (
      <div className="catalogue-main-container">
        <button className="catalogue-back-btn" onClick={() => setSelectedBrand(null)}>&larr; Retour</button>
        <h2>Séries {selectedBrand}</h2>
        <div className="catalogue-list">
          {series.map(model => (
            <button key={model} className="vehicle-type-btn" onClick={() => setSelectedModel(model)}>
              {model}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Affichage des voitures pour une série
  if (selectedBrand && selectedModel) {
    const carsList = getCarsByBrandAndModel(selectedBrand, selectedModel);
    return (
      <div className="catalogue-main-container">
        <button className="catalogue-back-btn" onClick={() => setSelectedModel(null)}>&larr; Retour</button>
        <h2>{selectedBrand} - {selectedModel}</h2>
        <CatalogueList>
          {carsList.map(car => (
            <CatalogueCarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
          ))}
        </CatalogueList>
      </div>
    );
  }

  // Affichage des marques
  return (
    <div className="catalogue-main-container">
      <h2>Catalogue par marque</h2>
      <div className="catalogue-list">
        {brands.map(brand => (
          <button key={brand} className="vehicle-type-btn" onClick={() => setSelectedBrand(brand)}>
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CatalogueModel;
